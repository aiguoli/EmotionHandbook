<template>
  <div class="main">
    <div class="page-header-wrapper">
      <page-header :title="this.title"></page-header>
    </div>
    <div class="main-content">
      <div class="search-wrapper">
        <div class="search-title">
          <p>Please specify
            the time span</p>
        </div>
        <div class="date-picker">
          <el-date-picker
            @keydown.enter.native="search"
            v-model="duration"
            type="daterange"
            unlink-panels
            range-separator="to"
            start-placeholder="start date"
            end-placeholder="end date"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div class="btn-search">
          <el-button @click.native="search">Search</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/public/PageHeader'
export default {
  name: 'SearchByTime',
  components: {PageHeader},
  data () {
    return {
      title: 'Search entry by time',
      duration: '',
      pickerOptions: {
        shortcuts: [
          {
            text: 'today',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime())
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'last week',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'last month',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: 'last there months',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
      }
    }
  },
  methods: {
    search () {
      if (this.duration.length === 0) {
        this.$notify.warning({
          title: 'WARNING',
          message: 'Please select the <strong><i>time</i><strong> !',
          dangerouslyUseHTMLString: true
        })
        return
      }
      const start = this.duration[0]
      const end = this.duration[1]
      this.$router.push('/search-result-by-period?start=' + start + '&&end=' + end)
        .then(() => {})
    }
  }
}
</script>

<style scoped>

</style>
