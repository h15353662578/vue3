<!-- tsx -->
<template>
  <a-button @click="Go" type="primary">测试</a-button>
</template>

<script >
export default {
  mounted() {},
  methods: {
    Go() {
      window.location.href = 'http://localhost:5500/public/test/test.html'
    },
  },
}
</script>

<style lang='scss' scoped>
</style>
