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
    <el-table-column property="orderNo" label="订单编号" width="200">
    </el-table-column>
    <el-table-column property="skuName" label="商品名称" width="200">
    </el-table-column>
    <el-table-column property="amount" label="订单金额(元)"> </el-table-column>
    <el-table-column property="innerCode" label="设备编号"> </el-table-column>
    <el-table-column property="status" label="订单状态"> </el-table-column>
    <el-table-column property="createTime" label="订单日期"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <slot :taskId="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      currentRow: null,
    }
  },
  props: {
    WorkOrderDate: {
      type: Array,
      required: true,
    },
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
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
