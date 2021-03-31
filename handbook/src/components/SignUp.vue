<template>
  <div class="form-wrapper">
    <div class="form">
      <div class="header">
        <div class="title"><span>SIGN UP FOR FREE</span></div>
        <div class="description"><span>Create an account to protect your privacy.</span></div>
      </div>
      <el-form @keydown.enter.native="login" class="login-form" :label-position="'top'" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="Email" prop="email">
          <el-input v-model="loginForm.email" maxlength="20" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item class="login-form">
          <el-button @click.native="login">Sign Up</el-button>
          <span>I have an account. Log in </span><router-link :to="{path: '/login'}" class="link">here.</router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    const emailVali = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Email required'))
      } else {
        let reg = new RegExp('\\w[-\\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\\.)+[A-Za-z]{2,14}')
        if (!reg.test(value)) {
          callback(new Error('Incorrect email format'))
        } else {
          callback()
        }
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
            password: this.loginForm.password
          }
          this.axios.post('/user/register', body)
            .then((res) => {
              if (res.data.code === 200) {
                this.$message.success('Congratulations! Please log in.😀')
                this.$router.push('/login')
                  .then(() => {})
              } else if (res.data.code === 400) {
                this.$message.error('This user has been registered!.😓')
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
