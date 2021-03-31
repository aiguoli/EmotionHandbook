export default {
  methods: {
    unauthorized () {
      if (!this.$route.query.redirect) {
        this.$message.error('Either the token was expired or invalid, please log in again.🧐')
        localStorage.removeItem('token')
        this.$router.push('/login?redirect=' + this.$route.fullPath)
          .then(() => {})
      }
    },
    internalError () {
      this.$message.error('An internal server error occurred.😭')
    }
  }
}
