<template>
  <div class="dashboard-container">
    <head-edid></head-edid>
    <sku-top></sku-top>
    <My-main></My-main>
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import headEdid from './conmponents/headEdid.vue'
import skuTop from './conmponents/skuTop.vue'
import MyMain from './conmponents/main.vue'
export default {
  data() {
    return {
      name: 'fads',
    }
  },

  created() {},

  methods: {},
  components: {
    headEdid,
    skuTop,
    MyMain,
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: relative;
    padding: 17px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
