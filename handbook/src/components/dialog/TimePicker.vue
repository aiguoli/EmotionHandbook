<template>
  <el-dialog :width="'400px'" :visible.sync="visible" :before-close="handleClose">
    <div slot="title">
      Choose your time
    </div>
    <div class="datetime-picker">
      <el-date-picker
        v-model="datetime"
        type="datetime"
        :picker-options="pickerOptions"
        :default-value="nowDate"
        value-format="dd-M-yyyy HH-mm-ss"
        placeholder="Click here to select time"
      ></el-date-picker>
      <el-button @click.native="pickTime">Confirm</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'TimePicker',
  props: ['visible'],
  data () {
    return {
      datetime: '',
      nowDate: new Date(),
      pickerOptions: {
        shortcuts: [{
          text: 'now',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: 'last day',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    },
    pickTime () {
      if (this.datetime) {
        this.$emit('getTime', this.datetime)
      }
      this.handleClose()
    }
  }
}
</script>

<style scoped>

</style>
