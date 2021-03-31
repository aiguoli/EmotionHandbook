<template>
  <div class="nothing" v-if="dayLists.length === 0 && !loading"><span>Oops, nothing here.</span></div>
  <div class="day-card-wrapper" v-else>
    <div @click="gotoMoodDetail(item.id)" v-for="(item, index) of dayLists" :key="index" class="day-card">
      <div class="day-card-title">{{ item.timestamp.slice(-13).slice(0, 6) }}</div>
      <div class="day-card-content">
        <div class="day-card-body">
          <div class="title"><i class="icon-title icon-s"></i>{{ item.title }}</div>
          <div class="location"><i class="icon-location icon-s"></i>{{ item.location }}</div>
          <div class="emotions">
            <i class="icon-emotion icon-s"></i>
            {{ item.emotions.length }}&nbsp;<span v-show="item.emotions.length === 1">emotion</span>
            <span v-show="item.emotions.length > 1">emotions</span>
          </div>
        </div>
        <div class="day-card-mood">
          <div :class="`mood-img-${item.entry}`"></div>
          <div class="mood-text">{{ item.entry }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListByDay',
  props: ['moodDay'],
  data () {
    return {
      dayLists: [],
      loading: true
    }
  },
  watch: {
    moodDay: {
      handler () {
        this.dayLists = this.moodDay
        this.loading = false
      }
    }
  },
  methods: {
    gotoMoodDetail (id) {
      this.$router.push('/detail?moodId=' + id)
        .then(() => {})
    }
  }
}
</script>

<style scoped>

</style>
