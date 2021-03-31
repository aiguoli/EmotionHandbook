<template>
  <div class="main">
    <div class="page-header-wrapper">
      <page-header :title="this.title"></page-header>
    </div>
    <div class="main-content">
      <result-header :title="this.resultHeader"></result-header>
      <div class="mood-detail-wrapper">
        <mood-form :config="this.config" @updateData="getMoodDetail" @checkEmpty="checkEmpty"></mood-form>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/public/PageHeader'
import loadingOptions from '@/config/loadingOptions'
import ResultHeader from '@/components/public/ResultHeader'
import MoodForm from '@/components/public/MoodForm'
import errorHandler from '@/mixins/errorHandler'
export default {
  name: 'MoodDetail',
  components: {MoodForm, ResultHeader, PageHeader},
  mixins: [errorHandler],
  data () {
    return {
      title: 'Mood Detail',
      resultHeader: '',
      config: '',
      allEmpty: true,
      submitted: false
    }
  },
  beforeRouteLeave (to, from, next) {
    if (from.path === '/detail' && !this.allEmpty && !this.submitted) {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if (answer) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  },
  mounted () {
    this.getMoodDetail(this.$route.query.moodId)
  },
  methods: {
    checkEmpty (payload) {
      this.allEmpty = payload.empty
      this.submitted = payload.submitted
    },
    getMoodDetail (moodId) {
      let loadingInstance = this.$load.service(loadingOptions.getOptions())
      this.axios.get('/item?moodId=' + moodId)
        .then((res) => {
          if (res.data.code === 200) {
            let details = {...res.data}
            this.config = {
              editable: false,
              method: 'edit',
              details: {...res.data}
            }
            this.resultHeader = details.timestamp.slice(0, details.timestamp.indexOf(details.timestamp.slice(-7)))
            this.$nextTick(() => {
              loadingInstance.close()
            })
          } else if (res.data.code === 401) {
            this.unauthorized()
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.unauthorized()
          } else {
            this.$router.replace('/notfound')
              .then(() => {})
          }
          this.$nextTick(() => {
            loadingInstance.close()
          })
        })
    }
  }
}
</script>

<style scoped>

</style>
