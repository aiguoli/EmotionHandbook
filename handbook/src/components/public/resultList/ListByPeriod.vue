<template>
  <div class="nothing" v-if="moodLists.length === 0 && !loading"><span>Oops, nothing here.</span></div>
  <div class="card-wrapper" v-else>
    <div class="previous-card" @click="gotoDetail(item)" v-for="(item) of moodLists" :key="item.id">
      <div class="card-left-content">
        <span>{{ item.time.slice(0, item.time.indexOf(item.time.slice(-13))) }}</span>
        <div class="card-entry"><i class="icon-details icon-s"></i><span>{{ item.count }} Entries</span></div>
      </div>
      <div class="mood-selected mood-selected-small">
        <div :class="`mood-img-small mood-img-${item.entry}`"></div>
        <div class="mood-text">{{ item.entry }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dataMethod from '@/config/date'
export default {
  name: 'ListByPeriod',
  props: ['moodList'],
  data () {
    return {
      moodLists: [],
      emojiList: [],
      loading: true
    }
  },
  watch: {
    moodList: function () {
      if (this.moodList) {
        this.moodLists = this.moodList
        this.loading = false
      }
    }
  },
  methods: {
    gotoDetail (payload) {
      let originTime = payload.time.slice(0, payload.time.indexOf(payload.time.slice(-13)))
      let time = dataMethod.getStandardDatetime(payload)
      this.$router.push('/result-by-day?originTime=' + originTime + '&' + 'time=' + time)
        .then(() => {})
    }
  }
}
</script>

<style scoped>

</style>
