<template>
  <div class="companion-wrapper">
    <div class="companion-header">
      <span>Please enter any key words
        related to place for searching</span>
    </div>
    <div class="multiple-input">
      <div class="label">
        <i class="icon-location icon-s"></i><span>Location:</span>
      </div>
      <div class="input">
        <el-input @keydown.enter.native="search" v-model="keyword" placeholder="Enter something here"></el-input>
      </div>
    </div>
    <div class="btn-search">
      <el-button @click.native="search">Search</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchByPlace',
  data () {
    return {
      title: 'Search entry by companion',
      keyword: ''
    }
  },
  methods: {
    search () {
      if (!this.keyword) {
        this.$notify({
          title: 'WARNING',
          message: 'Please input <strong><em>names</em></strong>',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
      } else {
        this.$router.push('/result-by-location?keyword=' + this.keyword)
          .then(() => {})
      }
    }
  }
}
</script>

<style scoped>

</style>
