<template>
  <div class="main">
    <div class="page-header-wrapper">
      <page-header :title="this.title"></page-header>
    </div>
    <div class="main-content">
      <el-tabs class="multiple-wrapper" v-model="searchMethod" type="card">
        <el-tab-pane class="panel" label="Search by companion" name="companion">
          <search-by-companion></search-by-companion>
        </el-tab-pane>
        <el-tab-pane class="panel" label="Search by location" name="location">
          <search-by-place></search-by-place>
        </el-tab-pane>
        <el-tab-pane class="panel" label="Search by emotion" name="emotion">
          <search-by-emotion></search-by-emotion>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/public/PageHeader'
import SearchByCompanion from '@/components/router/SearchByCompanion'
import SearchByPlace from '@/components/router/SearchByPlace'
import SearchByEmotion from '@/components/router/SearchByEmotion'
export default {
  name: 'MultipleSearch',
  components: {SearchByEmotion, SearchByPlace, SearchByCompanion, PageHeader},
  data () {
    return {
      title: 'More entry',
      searchMethod: 'companion'
    }
  }
}
</script>

<style scoped>

</style>
