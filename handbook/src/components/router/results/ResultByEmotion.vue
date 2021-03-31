<template>
  <div class="main">
    <div class="page-header-wrapper">
      <page-header :title="title"></page-header>
    </div>
    <div class="main-content">
      <result-header :title="headTitle"></result-header>
      <div class="result-s-wrapper">
        <list-by-day :mood-day="this.moodList.data"></list-by-day>
      </div>
      <div class="pagination-bottom">
        <el-pagination
          layout="total, prev, pager, next"
          :total="moodList.count"
          :page-size="9"
          @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ResultHeader from '@/components/public/ResultHeader'
import ListByDay from '@/components/public/resultList/ListByDay'
import loadingOptions from '@/config/loadingOptions'
import PageHeader from '@/components/public/PageHeader'
import errorHandler from '@/mixins/errorHandler'
export default {
  name: 'ResultByEmotion',
  mixins: [errorHandler],
  components: {PageHeader, ListByDay, ResultHeader},
  data () {
    return {
      title: 'Result by emotion',
      emotion: '',
      moodList: {},
      headTitle: ''
    }
  },
  mounted () {
    this.getResult(this.$route.query.keyword, 1)
    this.emotion = this.$route.query.keyword
    this.headTitle = 'Your entries with ' + this.emotion
  },
  methods: {
    getResult (keyword, page) {
      let body = {
        method: 'emotion',
        content: keyword
      }
      this.loadingInstance = this.$load.service(loadingOptions.getOptions())
      this.axios.post('/search?page=' + page, body)
        .then((res) => {
          if (res.data.code === 200) {
            this.moodList = res.data
            this.$nextTick(() => {
              this.loadingInstance.close()
            })
          } else if (res.data.code === 401) {
            this.unauthorized()
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.unauthorized()
          } else if (err.response.status === 500) {
            this.internalError()
          }
          this.$nextTick(() => {
            this.loadingInstance.close()
          })
        })
    },
    handleCurrentChange (page) {
      this.getResult(this.emotion, page)
    }
  }
}
</script>

<style scoped>

</style>
