<template>
  <el-table
    ref="singleTable"
    :data="WorkOrderDate"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
    :header-cell-style="{ background: '#f3f6fb' }"
    empty-text="暂时没有数据了"
  >
    <el-table-column type="index" width="100" label="序号"> </el-table-column>
    <el-table-column property="className" label="商品类型名称" >
    </el-table-column>
    <el-table-column label="操作" >
      <slot></slot>
      <template slot-scope="scope">
        <el-button
          type="text"
          size="medium "
          @click="$emit('editType', scope.row)"
          >修改</el-button
        >
        <el-button type="text" size="medium " @click="$emit('del',scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  data() {
    return {
      currentRow: null,
      visible: false,
    }
  },
  props: {
    WorkOrderDate: {
      type: Array,
      required: true,
    },
    currentTypeName: {
      type: String,
      default: '',
    },
  },
  created() {},
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep.el-table--enable-row-transition .el-table__body td {
  border: 0;
  // padding: 20px;
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
