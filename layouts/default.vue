<template>
  <div>
    <Header></Header>
    <Nuxt class="main-content"></Nuxt>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/blocks/Header'
import Footer from '@/components/blocks/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.main-content {
  margin-top: 98px;
}
</style>
