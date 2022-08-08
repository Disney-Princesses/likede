<template>
  <div class="foot" v-if="isFootShow">
    <p>共{{ totalCount }}条记录，第{{ pageIndex }}/{{ totalPage }}页</p>
    <div>
      <el-button class="btn" :disabled="first">上一页</el-button>
      <el-button class="btn" :disabled="last">下一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['totalCount', 'pageIndex', 'totalPage'],
  computed: {
    isFootShow() {
      return this.pageIndex < this.totalPage
    },
    first() {
      return this.pageIndex === 1
    },
    last() {
      return this.pageIndex === this.totalPage
    },
  },

  created() {},

  methods: {},
}
</script>
<style scoped lang="scss">
.foot {
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: #fff;
  padding: 32px 16px;
  p {
    color: #e3dfe4;
    font-size: 18px;
  }
  .btn {
    width: 70px;
    height: 32px;
    text-align: center;
    padding: 0 10px;
    margin-top: 10px;
    background-color: #d6ddf6;
  }
}
</style>
