<template>
  <el-dialog :width="'600px'" title="Please choose your emotion(s)" :visible.sync="visible" :before-close="handleClose">
    <el-dialog :visible.sync="visibleLevel"
    append-to-body
    :width="'300px'">
      <div class="level-picker">
        <span>I felt</span>
        <label>
          <select v-model="level.picked">
            <option v-for="(item, index) of level.name" :value="item" :key="index">{{ item }}</option>
          </select>
        </label>
        <span>{{ emoji === '' ? '' : emoji.desc.toLowerCase() }}.</span>
      </div>
      <div class="btn-done">
        <el-button @click.native="submitEmoji" size="mini">Done</el-button>
      </div>
    </el-dialog>
    <div class="dialog-body-wrapper">
      <el-radio-group class="positive-negative" v-model="selection" @change="handleChange">
        <el-radio-button label="positive"></el-radio-button>
        <el-radio-button label="negative"></el-radio-button>
      </el-radio-group>
      <div class="emoji-list">
        <div @click="selectEmoji(item)" class="emoji-list-item" v-show="selection === 'positive'" v-for="(item) of emojis.positive" :key="item.desc">
          <img class="emoji-list-item-img" :src="item.url" alt="emoji" :title="item.desc">
          <span>{{ item.desc }}</span>
        </div>
        <div @click="selectEmoji(item)" class="emoji-list-item" v-show="selection === 'negative'" v-for="(item) of emojis.negative" :key="item.desc">
          <img class="emoji-list-item-img" :src="item.url" alt="emoji" :title="item.desc">
          <span>{{ item.desc }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {positive, negative} from '../../emojiList'
export default {
  name: 'EmojiDialog',
  props: ['visible', 'noInner'],
  data () {
    return {
      emojis: '',
      imgSrc: '',
      selection: 'positive',
      visibleLevel: false,
      emoji: '',
      level: {
        name: ['somewhat', 'very', 'strongly'],
        picked: 'somewhat'
      }
    }
  },
  mounted () {
    this.emojis = {
      positive: positive,
      negative: negative
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    },
    handleChange (val) {
      console.log(val)
    },
    selectEmoji (val) {
      if (!this.noInner) {
        this.emoji = val
        this.visibleLevel = true
      } else {
        this.emoji = val
        this.submitEmoji()
      }
    },
    submitEmoji () {
      let body = {
        emoji: this.emoji,
        level: this.level.picked
      }
      this.$emit('emojiPicked', body)
      this.visibleLevel = false
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>

</style>
