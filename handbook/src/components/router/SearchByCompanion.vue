<template>
  <div class="companion-wrapper">
    <div class="companion-header">
      <span>Please enter any key words
        related to name for searching</span>
    </div>
    <div class="multiple-input">
      <div class="label">
        <i class="icon-people icon-s"></i>
        <span>Companion: </span>
      </div>
      <div v-for="(item, index) of inputList" :key="index" class="input">
        <el-input @keydown.enter.native="search" v-model="companion[index].content" placeholder="Enter something here"></el-input>
        <a v-if="index !== 0" class="link link-s" href="javascript:" @click="deleteInput(item, index)">Delete</a>
      </div>
      <div class="operation">
        <a @click="addInput" class="link link-s" href="javascript:">Add searching item</a>
      </div>
    </div>
    <div class="btn-search">
      <el-button @click.native="search">Search</el-button>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/public/PageHeader'
export default {
  name: 'SearchByCompanion',
  components: {PageHeader},
  data () {
    return {
      title: 'Search entry by companion',
      companion: [{
        content: ''
      }],
      inputList: [{
        name: 'input'
      }]
    }
  },
  methods: {
    addInput () {
      this.inputList.push({name: 'input'})
      this.companion.push({content: ''})
    },
    deleteInput (item, index) {
      this.inputList.splice(index, 1)
      this.companion.splice(index, 1)
    },
    search () {
      let sum = ''
      this.companion.forEach((item, index) => {
        if (index + 1 === this.companion.length) {
          sum += item.content
        } else {
          sum += item.content + ', '
        }
      })
      if (!sum) {
        this.$notify({
          title: 'WARNING',
          message: 'Please input <strong><em>names</em></strong>',
          type: 'warning',
          dangerouslyUseHTMLString: true
        })
      } else {
        this.$router.push('/result-by-companion?keyword=' + sum)
          .then(() => {})
      }
    }
  }
}
</script>

<style scoped>

</style>
