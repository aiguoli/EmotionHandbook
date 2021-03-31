<template>
  <div class="result-header">
    <i @click="goBack" class="icon-back"></i>
    <div class="result-text"><span>{{ title }}</span></div>
  </div>
</template>

<script>
export default {
  name: 'ResultHeader',
  props: ['title'],
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
