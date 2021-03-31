<template>
  <div class="page-wrapper">
    <div class="content">
      <side-bar></side-bar>
      <div class="col-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/public/SideBar'
export default {
  name: 'HomePage',
  components: {SideBar},
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
