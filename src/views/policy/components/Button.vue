<template>
  <div class="appBtn">
    <el-button type="primary" class="newBtn" @click="visible = true">
      <i class="el-icon-circle-plus-outline"></i>
      新建</el-button
    >
    <Dialog
      :dialogVisible.sync="visible"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from '@/views/policy/components/Dialog'
export default {
  props: {},
  data() {
    return {
      visible: false,
    }
  },
  components: {
    Dialog
  },
  created() {},

  methods: {},
}
</script>

<style scoped lang="scss">
.appBtn {
  background-color: #fff;
  padding: 20px;
  .el-button {
    padding: 0;
    width: 80px;
    height: 36px;
    border: 0;
  }
  .newBtn {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;

    &:hover {
      background: linear-gradient(135deg, #ff7d43, #db3602) !important;
    }
  }
}
</style>
