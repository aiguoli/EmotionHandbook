<template>
  <div>
    <mood-select @getMood="getMood" :visible.sync="visibleMood"></mood-select>
    <emoji-dialog :visible.sync="visibleEmoji" @emojiPicked="emojiPicked"></emoji-dialog>
    <div class="mood-form">
      <div class="col-icon">
        <div class="icon-title"></div>
        <div class="icon-people"></div>
        <div class="icon-location"></div>
        <div class="icon-details"></div>
      </div>
      <el-form class="col-form" :label-position="'top'" :model="moodForm" ref="moodForm" :rules="rules">
        <el-form-item label="Title:" prop="title">
          <el-input @input="checkAllEmpty" :readonly="!this.editable" v-model="moodForm.title" maxlength="128" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="Companion:" prop="companion" class="companion-item">
          <el-input @input="checkAllEmpty" :readonly="!this.editable" @keydown.enter.native="separateName" placeholder="eg: Lily, Jack etc" maxlength="64" show-word-limit v-model="moodForm.companion"></el-input>
          <i class="input-notify">Press Enter to separate names</i>
        </el-form-item>
        <el-form-item label="Location:" prop="location">
          <el-input @input="checkAllEmpty" :readonly="!this.editable" v-model="moodForm.location" maxlength="64" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="Details:" prop="details">
          <el-input @input="checkAllEmpty" :readonly="!this.editable" v-model="moodForm.details" type="textarea" :row="2"></el-input>
        </el-form-item>
      </el-form>
      <div class="col-selection">
        <div v-show="imgClass['mood-img-default'] === true" class="mood-selected">
          <div class="mood-img-default" @click="openMoodDialog">
            <span>Choose Mood Here<br></span>
          </div>
        </div>
        <div v-show="imgClass['mood-img-default'] === false" class="mood-selected">
          <div :class="{
              'mood-img-good': imgClass['mood-img-good'],
              'mood-img-bad': imgClass['mood-img-bad'],
              'mood-img-neutral': imgClass['mood-img-neutral'],
              'mood-img-terrible': imgClass['mood-img-terrible'],
              'mood-img-terrific': imgClass['mood-img-terrific'],
              }" @click="openMoodDialog"></div>
          <div class="mood-text">
            <span>{{ mood.desc }}</span>
          </div>
        </div>
        <div class="mood-show">
          <div class="detail-wrapper">
            <div v-if="emotionList.length !== 0" class="mood-detail-show">
              <div class="emotion">
                <div class="icon-emotion"></div>
                <span class="show-text">Emotions:  </span>
              </div>
              <div v-for="(item, index) of emotionList" :key="index" class="emoji-mixed">
                <img alt="emoji-picked" class="img-emoji-small" :src="item.url">
                <span class="total-text">{{ item.level }} {{ item.desc.toLowerCase() }}</span>
                <a v-if="editable" class="link link-s" href="javascript:" @click="removeEmotion(index)">Delete</a>
              </div>
            </div>
            <div v-if="editable" class="emoji-picker" @click="openEmojiDialog">
              <div class="icon-plus"></div>
              <div>What's your emotion?</div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-save">
        <el-button :disabled="!editable" type="info" @click.native="submitMood">save</el-button>
      </div>
      <div v-if="!editable" class="btn-edit">
        <el-button @click.native="edit">edit</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MoodSelect from '@/components/dialog/MoodSelect'
import EmojiDialog from '@/components/dialog/EmojiDialog'
import {getProperty} from '@/emojiList'
import errorHandler from '@/mixins/errorHandler'
import loadingOptions from '@/config/loadingOptions'

export default {
  name: 'MoodReview',
  mixins: [errorHandler],
  components: {EmojiDialog, MoodSelect},
  props: ['config'],
  data () {
    return {
      editable: '',
      emotionList: [],
      date: '',
      time: '',
      formatDate: '',
      formatTime: '',
      title: 'Personal Mood Diary',
      visibleMood: false,
      visibleEmoji: false,
      visibleTime: false,
      submitted: false,
      loadingInstance: '',
      mood: {
        desc: ''
      },
      imgClass: {
        'mood-img-good': false,
        'mood-img-bad': false,
        'mood-img-neutral': false,
        'mood-img-terrible': false,
        'mood-img-terrific': false,
        'mood-img-default': true
      },
      moodForm: {},
      rules: {
        title: [{'required': true, trigger: 'change'}],
        companion: [{'required': true, trigger: 'change'}],
        location: [{'required': true, trigger: 'change'}],
        details: [{'required': true, trigger: 'change'}]
      }
    }
  },
  watch: {
    config: {
      handler () {
        this.updateDetail()
      },
      deep: true
    }
  },
  methods: {
    updateDetail () {
      if (this.config.method === 'edit') {
        // 解构拷贝
        this.moodForm = {...this.config.details}
        this.editable = this.config.editable
        this.imgClass['mood-img-default'] = false
        this.imgClass['mood-img-' + this.config.details.entry] = true
        this.mood.desc = this.config.details.entry
        this.config.details.emotions.forEach((item) => {
          this.emotionList.push(getProperty(item))
        })
      } else if (this.config.method === 'new') {
        let config = this.config
        this.editable = config.editable
        this.date = config.date
        this.time = config.time
        this.formatDate = config.formatDate
        this.formatTime = config.formatTime
      }
    },
    edit () {
      this.editable = true
    },
    checkAllEmpty () {
      let val = !!(this.moodForm.title || this.moodForm.companion || this.moodForm.location ||
        this.moodForm.details || this.emotionList.length || !this.imgClass['mood-img-default'])
      this.$emit('checkEmpty', {
        empty: !val,
        submitted: this.submitted
      })
    },
    separateName () {
      if (this.moodForm.companion !== '') {
        this.moodForm.companion += ', '
      }
    },
    getMood (payload) {
      this.mood.desc = payload.desc
      for (let key in this.imgClass) {
        if (this.imgClass.hasOwnProperty(key)) {
          this.imgClass[key] = false
        }
      }
      this.imgClass[payload.imgClass] = true
      this.checkAllEmpty()
    },
    openEmojiDialog () {
      this.visibleEmoji = true
    },
    openMoodDialog () {
      if (this.editable) {
        this.visibleMood = true
      }
    },
    checkValue () {
      if (this.imgClass['mood-img-default']) {
        this.$notify({
          title: 'WARNING',
          dangerouslyUseHTMLString: true,
          message: 'Please select your <strong><i>mood</i></strong>.',
          type: 'warning'
        })
      }
      if (!this.emotionList.length) {
        setTimeout(() => {
          this.$notify({
            title: 'WARNING',
            dangerouslyUseHTMLString: true,
            message: 'Please select your <strong><i>emotion</i></strong>.',
            type: 'warning'
          })
        }, 500)
      }
      return (!this.imgClass['mood-img-default'] && this.emotionList.length)
    },
    submitMood () {
      if (!this.checkValue()) {
        return
      }
      this.$refs.moodForm.validate((valid) => {
        if (valid) {
          let emojiText = ''
          let emojiLevel = ''
          this.emotionList.map((item, index) => {
            emojiText += item.desc
            emojiLevel += item.level === 'somewhat' ? '1' : item.level === 'very' ? '2' : item.level === 'strongly' ? '3' : '1'
            if (index !== this.emotionList.length - 1) {
              emojiText += ' '
              emojiLevel += ' '
            }
          })
          this.loadingInstance = this.$load.service(loadingOptions.getOptions())
          if (this.config.method === 'new') {
            let item = {
              item: {
                title: this.moodForm.title,
                companion: this.moodForm.companion,
                location: this.moodForm.location,
                details: this.moodForm.details,
                entry: this.mood.desc,
                emotion: emojiText,
                level: emojiLevel,
                time: this.formatDate + ' ' + this.formatTime
              }
            }
            this.axios.post('/item', item)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$nextTick(() => {
                    this.loadingInstance.close()
                  })
                  this.$message.success('Successfully added')
                  let message = 'Do you want to stay here, or review the latest submission?'
                  let title = 'Wait a moment'
                  this.submitted = true
                  this.checkAllEmpty()
                  this.$confirm(message, title, {
                    cancelButtonText: 'stay',
                    confirmButtonText: 'review',
                    type: 'info'
                  })
                    .then(() => {
                      this.$router.push('/previous')
                        .then(() => {})
                      this.$refs.moodForm.clearValidate()
                      this.$refs.moodForm.resetFields()
                      this.emotionList = []
                      this.imgClass['mood-img-default'] = true
                    })
                    .catch(() => {})
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
              })
          } else if (this.config.method === 'edit') {
            let item = {
              item: {
                title: this.moodForm.title,
                companion: this.moodForm.companion,
                location: this.moodForm.location,
                details: this.moodForm.details,
                entry: this.mood.desc,
                emotion: emojiText,
                level: emojiLevel,
                id: this.config.details.id
              }
            }
            this.axios.put('/item', item)
              .then((res) => {
                this.$nextTick(() => {
                  this.loadingInstance.close()
                })
                this.$message.success('Successfully changed')
                // already commit
                this.submitted = true
                this.checkAllEmpty()
                this.$emit('updateData', item.item.id)
                this.$refs.moodForm.clearValidate()
                this.$refs.moodForm.resetFields()
                this.emotionList = []
                this.imgClass['mood-img-default'] = true
                if (res.data.code === 401) {
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
      })
    },
    emojiPicked (emoji) {
      let exists = false
      this.emotionList.map((item, index) => {
        if (item.desc === emoji.emoji.desc) {
          this.emotionList.splice(index, 1, {
            url: emoji.emoji.url,
            desc: emoji.emoji.desc,
            level: emoji.level
          })
          exists = true
        }
      })
      if (!exists) {
        this.emotionList.push({
          url: emoji.emoji.url,
          desc: emoji.emoji.desc,
          level: emoji.level
        })
      }
      this.checkAllEmpty()
    },
    removeEmotion (index) {
      this.emotionList.splice(index, 1)
      this.checkAllEmpty()
    }
  }
}
</script>

<style scoped>

</style>
