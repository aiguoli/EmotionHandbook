<template>
  <div class="col-tab">
    <div class="tab-info">
      <div class="info">
        <h2>Hi, {{username}}!</h2>
        <h2 v-if="!getAdd">How are you?</h2>
        <div>
          <el-button type="info" v-if="getAdd" @click="addNew">ADD NEW ENTRY</el-button>
        </div>
      </div>
    </div>
    <div class="tab-nav">
      <el-menu :default-openeds="['3']">
        <el-menu-item class="nav" index="1">
          <router-link class="link block-link" :to="{path: '/previous'}">View previous entry</router-link>
        </el-menu-item>
        <el-menu-item class="nav" index="2">
          <router-link class="link block-link" :to="{path: '/search-by-time'}">Search entry by time</router-link>
        </el-menu-item>
        <el-menu-item class="nav" index="3">
          <router-link class="link block-link" :to="{path: '/multiple-search'}">More entry</router-link>
        </el-menu-item>
        <!--        <el-submenu index="3" class="nav">-->
<!--          <span slot="title">More entry</span>-->
<!--          <el-menu-item class="nav-sub" index="3-1">-->
<!--            <router-link class="link block-link" :to="{path: '/search-by-companion'}">Search entry by companion</router-link>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item class="nav-sub" index="3-2">-->
<!--            <router-link class="link block-link" :to="{path: '/search-by-place'}">Search entry by place</router-link>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item class="nav-sub" index="3-3">-->
<!--            <router-link class="link block-link" :to="{path: '/search-by-emotion'}">Search entry by emotion</router-link>-->
<!--          </el-menu-item>-->
      </el-menu>
    </div>
  </div>
</template>

<script>
import errorHandler from '@/mixins/errorHandler'

export default {
  name: 'SideBar',
  mixins: [errorHandler],
  data () {
    return {
      showAdd: false,
      username: 'user'
    }
  },
  computed: {
    getAdd () {
      return this.$route.meta.showAdd
    }
  },
  mounted () {
    this.axios.get('/user')
      .then((res) => {
        if (res.data.code === 401) {
          this.unauthorized()
        }
        this.username = res.data.username
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.unauthorized()
        } else if (error.response.status === 500) {
          this.internalError()
        }
      })
  },
  methods: {
    addNew () {
      this.$router.push('/home')
        .then(() => {})
    }
  }
}
</script>

<style scoped>

</style>
