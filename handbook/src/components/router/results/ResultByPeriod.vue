<template>
  <div class="main">
    <div class="page-header-wrapper">
      <page-header :title="title"></page-header>
    </div>
    <div class="main-content">
      <result-header :title="headTitle"></result-header>
      <div class="period result-s-wrapper">
        <list-by-period :mood-list="this.moodList.data"></list-by-period>
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
import loadingOptions from '../../../config/loadingOptions'
import ListByPeriod from '@/components/public/resultList/ListByPeriod'
import ResultHeader from '@/components/public/ResultHeader'
import errorHandler from '@/mixins/errorHandler'
export default {
  name: 'ResultByTime',
  components: {ResultHeader, ListByPeriod, PageHeader},
  mixins: [errorHandler],
  mounted () {
    this.start = this.$route.query.start
    this.end = this.$route.query.end
    this.headTitle = `Your entries from ${this.start}, to ${this.end}`
    this.getResults(1)
  },
  data () {
    return {
      start: '',
      end: '',
      title: 'Search entry by time',
      loading: true,
      loadingInstance: '',
      moodList: {},
      headTitle: ''
    }
  },
  methods: {
    getResults (page) {
      let body = {
        startTime: this.start,
        endTime: this.end
      }
      this.loadingInstance = this.$load.service(loadingOptions.getOptions())
      this.axios.post('/items/period?page=' + page, body)
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
      this.getResults(page)
    }
  }
}
</script>

<style scoped>

</style>
