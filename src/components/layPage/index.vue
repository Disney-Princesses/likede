<template>
  <div class="block">
    <!-- 分页 -->

    <div class="left">
      <span>共{{ data.totalCount }}条记录</span>
      <span>第{{ data.pageIndex }}/{{ data.totalPage }}页</span>
    </div>

    <div class="right">
      <el-button
        type="info"
        plain
        size="small"
        @click="$emit('prevClick', data.pageIndex)"
        :disabled="preDisplay"
        >上一页</el-button
      >
      <el-button
        type="info"
        plain
        size="small"
        @click="$emit('nextClick', data.pageIndex)"
        :disabled="nextDisplay"
        >下一页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    //   下一页禁用
    nextDisplay: {
      type: Boolean,
      default: false,
    },
    //   上一页禁用
    preDisplay: {
      type: Boolean,
      default: true,
    },
  },

  created() {},

  methods: {
    // // 上一页
    // prevClick() {},
    // // 下一页
    // nextClick() {},
  },
}
</script>

<style scoped lang="scss">
.block {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  span {
    margin: 20px;
    color: #dbdfe5;
  }
}
</style>
