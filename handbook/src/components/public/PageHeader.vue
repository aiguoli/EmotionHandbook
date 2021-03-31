<template>
  <div class="page-header">
    <div class="page-back-home">
      <router-link class="link" :to="{path: '/home'}"><div class="icon-home"></div></router-link>
    </div>
    <div class="page-title">
      <span>{{ title }}</span>
    </div>
      <el-dropdown class="icon-setting">
        <div class="icon-setting"></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logOut">log out</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: ['title'],
  methods: {
    logOut () {
      localStorage.removeItem('token')
      setTimeout(() => {
        this.$router.push('/login')
          .then(() => {})
      }, 500)
    }
  }
}
</script>

<style scoped>

</style>
