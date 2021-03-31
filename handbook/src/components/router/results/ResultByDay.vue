<template>
  <div class="main">
    <div class="page-header-wrapper">
      <page-header :title="this.title"></page-header>
    </div>
    <div class="main-content">
      <result-header :title="this.resultHeader"></result-header>
      <div class="result-s-wrapper">
        <list-by-day :moodDay="dayList.data"></list-by-day>
      </div>
      <div class="pagination-bottom">
        <el-pagination
          layout="total, prev, pager, next"
          :total="dayList.count"
          :page-size="4"
          @current-change="handleCurrentChange"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/public/PageHeader'
import ListByDay from '@/components/public/resultList/ListByDay'
import loadingOptions from '@/config/loadingOptions'
import ResultHeader from '@/components/public/ResultHeader'
import errorHandler from '@/mixins/errorHandler'
export default {
  name: 'ResultByDay',
  components: {ResultHeader, ListByDay, PageHeader},
  mixins: [errorHandler],
  data () {
    return {
      title: 'Results by day',
      dayList: {},
      time: '',
      resultHeader: this.$route.query.originTime
    }
  },
  mounted () {
    this.time = this.$route.query.time
    this.getMoodByDay(1, this.time)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getMoodByDay (page, time) {
      let loadingInstance = this.$load.service(loadingOptions.getOptions())
      this.axios.post('/items/daily?page=' + page, {date: time})
        .then((res) => {
          if (res.data.code === 200) {
            this.dayList = res.data
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
          } else if (err.response.status === 500) {
            this.internalError()
          }
          this.$nextTick(() => {
            loadingInstance.close()
          })
        })
    },
    handleCurrentChange (page) {
      this.getMoodByDay(page, this.time)
    }
  }
}
</script>

<style scoped>

</style>
