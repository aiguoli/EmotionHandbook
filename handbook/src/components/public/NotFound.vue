<template>
  <div class="not-found-wrapper">
    <h1>The page you are looking is not found😥</h1>
    <div class="back-link">
      <router-link :to="{path: '/home'}" class="link block-link">back to home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

</style>
