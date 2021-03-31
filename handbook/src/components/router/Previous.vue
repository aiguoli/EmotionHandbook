<template>
  <div class="main">
    <div class="page-header-wrapper">
      <page-header :title="this.title"></page-header>
    </div>
    <div class="main-content">
      <div class="previous-wrapper">
        <div class="page">
          <list-by-period :moodList="moodList.data"></list-by-period>
        </div>
      </div>
      <div class="pagination-bottom">
        <el-date-picker
          v-model="nowDate"
          @change="handleChange"
          value-format="yyyy-MM"
          type="month">
        </el-date-picker>
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
import ListByPeriod from '@/components/public/resultList/ListByPeriod'
import dateMethod from '@/config/date'
import loadingOptions from '@/config/loadingOptions'
import errorHandler from '@/mixins/errorHandler'
export default {
  name: 'Previous',
  components: {ListByPeriod, PageHeader},
  mixins: [errorHandler],
  data () {
    return {
      title: 'Your previous entries',
      nowDate: new Date(),
      moodList: {},
      formatDate: ''
    }
  },
  mounted () {
    let date = new Date()
    let monthDigit = date.getMonth()
    let year = date.getFullYear()
    let formatDate = year + '-' + ((monthDigit + 1) < 10 ? '0' + (monthDigit + 1) : (monthDigit + 1))
    let body = {
      startTime: formatDate + '-01',
      endTime: formatDate + '-' + dateMethod.getMonthPeriod(year, monthDigit + 1)
    }
    this.formatDate = body
    this.getData(1, body)
  },
  methods: {
    getData (page = 1, date) {
      if (date.startTime && date.endTime) {
        let loadingInstance = this.$load.service(loadingOptions.getOptions())
        this.axios.post('/items/period?page=' + page, date)
          .then((res) => {
            if (res.data.code === 200) {
              this.moodList = res.data
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
      }
    },
    handleChange (val) {
      if (val) {
        this.formatDate = {
          startTime: val + '-01',
          endTime: val + '-' + dateMethod.getMonthPeriod(val.slice(0, 4), parseInt(val.slice(5, val.length)))
        }
        this.getData(1, this.formatDate)
      }
    },
    handleCurrentChange (page) {
      this.getData(page, this.formatDate)
    }
  }
}
</script>

<style scoped>

</style>
