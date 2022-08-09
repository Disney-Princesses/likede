<template>
  <el-table
    ref="singleTable"
    :data="userDate"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
    :header-cell-style="{ background: '#f3f6fb' }"
    empty-text="暂时没有数据了"
  >
    <el-table-column type="index" :index="number" width="100" label="序号">
    </el-table-column>
    <el-table-column
      :property="item"
      :label="userTitleList[index]"
      v-for="(item, index) in userKeyList"
      :key="index"
      width="240"
    >
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <!-- 自定义操作列的具名作用域插槽 -->
        <slot name="custom" :data="scope.row"></slot>
      </template>
      <slot> </slot>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    // 要渲染的属性字段
    userKeyList: {
      type: Array,
      required: true,
    },
    // 标头数数组
    userTitleList: {
      type: Array,
      required: true,
    },
    userDate: {
      type: Array,
      required: true,
    },
    pageIndex: {
      required: true,
    },
  },
  data() {
    return {
      currentRow: null,
    }
  },

  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
  },
  computed: {
    number() {
      return this.pageIndex * 10 - 9
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep.el-table--enable-row-transition .el-table__body td {
  border: 0;
}
::v-deep.el-table::before {
  height: 0 !important;
}
::v-deep.el-table th.is-leaf {
  border: 0 !important;
}
::v-deep .el-table__row .el-table_1_column_9 .cell {
  color: #5f84ff;
  cursor: pointer;
}
</style>
