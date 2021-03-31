<template>
  <el-dialog :visible="visible" :before-close="handleClose">
    <div class="mood-picker">
      <div class="mood-ul">
        <div class="mood-selected">
          <div class="mood-img-good"></div>
          <div class="mood-text">
            <span>Good</span>
          </div>
        </div>
        <div class="mood-selected">
          <div class="mood-img-bad"></div>
          <div class="mood-text">
            <span>Bad</span>
          </div>
        </div>
        <div class="mood-selected">
          <div class="mood-img-neutral"></div>
          <div class="mood-text">
            <span>Neutral</span>
          </div>
        </div>
        <div class="mood-selected">
          <div class="mood-img-terrible"></div>
          <div class="mood-text">
            <span>Terrible</span>
          </div>
        </div>
        <div class="mood-selected">
          <div class="mood-img-terrific"></div>
          <div class="mood-text">
            <span>Terrific</span>
          </div>
        </div>
      </div>
      <el-radio-group @change="handleChange" v-model="options" class="option-ul">
        <el-radio :label="'good'" class="option-ul-item">{{ '' }}</el-radio>
        <el-radio :label="'bad'" class="option-ul-item">{{ '' }}</el-radio>
        <el-radio :label="'neutral'" class="option-ul-item">{{ '' }}</el-radio>
        <el-radio :label="'terrible'" class="option-ul-item">{{ '' }}</el-radio>
        <el-radio :label="'terrific'" class="option-ul-item">{{ '' }}</el-radio>
      </el-radio-group>
      <div class="mood-lead">
        <div class="lead-1">Choose the mood you are feeling

          right now</div>

        <div class="lead-2">It's ok, just follow your heart</div></div>
      <div class="btn-ok"><el-button type="info" @click.native="submitMood">OK</el-button></div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'MoodSelect',
  props: ['visible'],
  data () {
    return {
      options: 'good',
      selected: 'good'
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    },
    handleChange (selected) {
      this.selected = selected
    },
    submitMood () {
      let body = {
        imgClass: 'mood-img-' + this.selected,
        desc: this.selected
      }
      this.$emit('getMood', body)
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>

</style>
