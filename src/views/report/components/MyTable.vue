<template>
  <div>
    <el-table
      v-loading="loading"
      ref="singleTable"
      :data="tableList"
      highlight-current-row
      style="width: 100%"
      :header-cell-style="{ background: '#f3f6fb' }"
    >
      <!-- 自定义列 -->
      <el-table-column
        v-for="(item, index) in propertyList"
        :key="item"
        :property="item"
        :label="headList[index]"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  data() {
    return {}
  },
  props: {
    tableList: {
      type: Array,
      default: () => [],
    },
    //表格加载中
    loading: {
      type: Boolean,
      default: false,
    },
    // 表头属性数组
    headList: {
      type: Array,
      default: () => [],
    },
    // 表中列数据对应的property名
    propertyList: {
      type: Array,
      default: () => [],
    },
  },

  created() {},
  computed: {
    number(){
      return this.pageIndex * 10 - 9
    }
  },
  methods: {},
}
</script>

<style scoped></style>
