<template>
  <div class="main">
    <time-picker :visible.sync="visibleTime" @getTime="getSelectTime"></time-picker>
    <div class="page-header-wrapper">
      <page-header :title="this.title"></page-header>
    </div>
    <div class="main-content">
      <h2>Get started and add a new entry!</h2>
      <div class="mood-wrapper">
          <div class="time" @click="openTimeDialog">
            <div class="time-date"><i class="icon-calendar"></i>{{ date }}&nbsp;&nbsp;<span>|</span>
              <span class="time-detail">&nbsp;&nbsp;{{ time }}</span></div>
          </div>
          <mood-form :config="this.config" @checkEmpty="checkEmpty"></mood-form>
        </div>
      </div>
    </div>
</template>

<script>
import PageHeader from '@/components/public/PageHeader'
import MoodSelect from '@/components/dialog/MoodSelect'
import EmojiDialog from '@/components/dialog/EmojiDialog'
import TimePicker from '@/components/dialog/TimePicker'
import MoodForm from '@/components/public/MoodForm'
export default {
  name: 'HomeCompo',
  components: {MoodForm, TimePicker, EmojiDialog, MoodSelect, PageHeader},
  data () {
    return {
      config: {
        editable: true,
        method: 'new',
        date: '',
        time: '',
        formatDate: '',
        formatTime: ''
      },
      emotionList: [],
      date: '',
      time: '',
      formatDate: '',
      formatTime: '',
      title: 'Personal Mood Diary',
      visibleTime: false,
      submitted: false,
      allEmpty: true
    }
  },
  mounted () {
    this.getCurrentDate()
    this.getCurrentTime()
  },
  beforeRouteLeave (to, from, next) {
    if (from.path === '/home' && !this.allEmpty && !this.submitted) {
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
  methods: {
    checkEmpty (payload) {
      this.allEmpty = payload.empty
      this.submitted = payload.submitted
    },
    openTimeDialog () {
      this.visibleTime = true
    },
    getCurrentDate () {
      const month = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
      let date = new Date()
      let nowDate = date.getDate()
      let monthDigit = date.getMonth()
      let nowMonth = month[monthDigit]
      let year = date.getFullYear()
      nowDate = nowDate.toString().length === 1 ? '0' + nowDate.toString() : nowDate.toString()
      this.date = nowDate + ' ' + nowMonth + ', ' + year
      this.formatDate = year + '-' + ((monthDigit + 1) < 10 ? '0' + (monthDigit + 1) : (monthDigit + 1)) +
                        '-' + ((nowDate + 1) < 10 ? '0' + (nowDate) : (nowDate))
      this.config.formatTime = this.formatTime
      this.config.date = this.date
      this.config.formatDate = this.formatDate
    },
    getCurrentTime () {
      const date = new Date()
      let hour = date.getHours()
      let min = date.getMinutes()
      hour = hour.toString().length === 1 ? '0' + hour.toString() : hour.toString()
      min = min.toString().length === 1 ? '0' + min.toString() : min.toString()
      this.time = hour + ':' + min + ' '
      this.formatTime = hour < 10 && hour > 0 ? '0' + hour : hour
      this.config.time = this.time
      this.config.formatTime = this.formatTime
    },
    getSelectTime (payload) {
      const month = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December']
      let index = payload.indexOf(' ')
      let date = payload.slice(0, index)
      let time = payload.slice(index + 1, payload.length)
      const dateArr = date.split('-')
      const timeArr = time.split('-')
      this.date = dateArr[0] + ' ' + month[dateArr[1] - 1] + ', ' + dateArr[2]
      this.time = timeArr[0] + ':' + timeArr[1] + ' '
      this.formatDate = dateArr[2] + '-' + (dateArr[1].length === 1 ? '0' + dateArr[1] : dateArr[1]) + '-' + dateArr[0]
      this.formatTime = timeArr[0]
      this.config.time = this.time
      this.config.date = this.date
      this.config.formatTime = this.formatTime
      this.config.formatDate = this.formatDate
    }
  }
}
</script>

<style scoped>

</style>
