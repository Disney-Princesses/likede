<template>
  <div class="appBtn">
    <el-button
      type="primary"
      plain
      class="importBtn"
      @click="$emit('click', $event)"
    >
      <slot> 取消</slot></el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="scss">
.appBtn {
  margin-bottom: 20px;
  background-color: #fff;
  .el-button {
    padding: 0;
    width: 80px;
    height: 36px;
    border: 0;
  }

  .importBtn {
    color: #655b56 !important;
    background-color: #fbf4f0 !important;
    &:hover {
      background-color: #f3e7e1 !important;
    }
  }
}
</style>
