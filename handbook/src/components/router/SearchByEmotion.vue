<template>
  <div class="companion-wrapper">
    <emoji-dialog :visible.sync="visibleEmoji" :noInner="noInner" @emojiPicked="emojiPicked"></emoji-dialog>
    <div class="companion-header">
      <span>Please enter any key words
        related to emotion for searching</span>
    </div>
    <div class="multiple-input">
      <div class="emoji-show" v-if="emoji">
        <img class="img-emoji-small" alt="emoji" :src="emoji.emoji.url">
        <span>{{ emoji.emoji.desc.toLowerCase() }}</span>
        <a class="link" href="javascript:" @click="resetEmoji">reset</a>
      </div>
      <div @click="openEmojiDialog" class="emoji-picker">
        <div class="icon-plus"></div>
        <div>What's your emotion?</div>
      </div>
    </div>
    <div class="btn-search">
      <el-button @click.native.native="search">Search</el-button>
    </div>
  </div>
</template>

<script>
import EmojiDialog from '@/components/dialog/EmojiDialog'
export default {
  name: 'SearchByEmotion',
  components: {EmojiDialog},
  data () {
    return {
      keyword: '',
      visibleEmoji: false,
      emoji: '',
      noInner: true
    }
  },
  methods: {
    search () {
      if (!this.keyword) {
        this.$notify({
          title: 'WARNING',
          message: 'Please input <strong><em>emotion</em></strong>',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
      } else {
        this.$router.push('/result-by-emotion?keyword=' + this.keyword)
          .then(() => {})
      }
    },
    resetEmoji () {
      this.emoji = ''
      this.keyword = ''
    },
    openEmojiDialog () {
      this.visibleEmoji = true
    },
    emojiPicked (emoji) {
      this.emoji = emoji
      this.keyword = emoji.emoji.desc
    }
  }
}
</script>

<style scoped>

</style>
