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
import PageHeader from '@/components/public/PageHeader'
import loadingOptions from '@/config/loadingOptions'
import ListByDay from '@/components/public/resultList/ListByDay'
import ResultHeader from '@/components/public/ResultHeader'
import errorHandler from '@/mixins/errorHandler'
export default {
  name: 'ResultByCompanion',
  components: {ResultHeader, ListByDay, PageHeader},
  mixins: [errorHandler],
  data () {
    return {
      title: 'Result by companion',
      companion: '',
      moodList: {},
      headTitle: ''
    }
  },
  mounted () {
    this.getResult(this.$route.query.keyword, 1)
    this.companion = this.$route.query.keyword
    this.headTitle = 'Your entries with ' + this.companion
  },
  methods: {
    handleCurrentChange (page) {
      this.getResult(this.companion, page)
    },
    getResult (keyword, page) {
      let body = {
        method: 'companion',
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
    }
  }
}
</script>

<style scoped>

</style>
