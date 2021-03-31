<template>
  <div class="form-wrapper">
    <div class="form">
      <div class="header">
        <div class="title"><span>LOG IN TO Mood Diary NOW</span></div>
        <div class="description"><span>Log in to protect your privacy.</span></div>
      </div>
      <el-form @keydown.enter.native="login" class="login-form" :label-position="'top'" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="Email" prop="email">
          <el-input v-model="loginForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" show-password></el-input>
          <a class="link link-s" href="#">Forget your password?</a>
        </el-form-item>
        <el-form-item class="login-form">
          <el-button @click.native="login">Log In</el-button>
          <span>New here? Sign up </span><router-link class="link" :to="{path: '/signup'}">here.</router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'LoginPage',
  data () {
    const emailVali = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Email required'))
      } else {
        callback()
      }
    }
    const passwordVali = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Password required'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [{validator: emailVali, trigger: 'change'}],
        password: [{validator: passwordVali, trigger: 'change'}]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let body = {
            username: this.loginForm.email,
            password: this.loginForm.password,
            grant_type: 'password'
          }
          let path = ''
          if (!this.$route.query.redirect) {
            path = '/home'
          } else {
            for (let key in this.$route.query) {
              if (this.$route.query.hasOwnProperty(key)) {
                if (key === 'redirect') {
                  path = this.$route.query[key]
                } else if (key === '/') {
                  path = '/home'
                } else {
                  path += '&' + key + '=' + this.$route.query[key]
                }
              }
            }
          }
          this.axios.post('oauth/token', qs.stringify(body))
            .then((res) => {
              if (res.data.code === 401) {
                this.$message.error(res.data.message + '😲')
              } else {
                localStorage.setItem('token', res.data.token)
                this.$message.success('Welcome!😁')
                this.$router.push(path)
                  .then(() => {})
              }
            })
            .catch(() => {
              this.$message.error('An internal server error occurred.😭')
            })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
