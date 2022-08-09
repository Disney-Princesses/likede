<template>
  <div class="appBtn">
    <el-button type="primary" class="newBtn" @click="$emit('click', $event)">
      <i class="el-icon-circle-plus-outline" v-if="pic"></i>
      <slot> 确认</slot>
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    pic: {
      type: Boolean,
      default: true,
    },
  },
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
  .newBtn {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;

    &:hover {
      background: linear-gradient(135deg, #ff7d43, #db3602) !important;
    }
  }
}
</style>
