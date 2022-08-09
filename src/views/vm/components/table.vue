<template>
  <el-table
    ref="singleTable"
    :data="WorkOrderDate"
    highlight-current-row
    @current-change="handleCurrentChange"
    @select="select"
    @select-all="selectAll"
    style="width: 100%"
    :header-cell-style="{ background: '#f3f6fb' }"
    empty-text="暂时没有数据了"
  >
    <el-table-column type="selection" width="50"> </el-table-column>
    <el-table-column type="index" width="100" label="序号" :index="number">
    </el-table-column>

    <el-table-column property="innerCode" label="设备编号" width="250">
    </el-table-column>
    <el-table-column property="type.name" label="设备型号" width="250">
    </el-table-column>
    <el-table-column property="node.addr" label="详细地址"> </el-table-column>
    <el-table-column property="ownerName" label="合作商"> </el-table-column>
    <el-table-column property="vmStatus" label="设备状态" width="180">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <!-- <slot></slot> -->
        <el-button
          @click="$emit('aisleClick', scope.row)"
          type="text"
          size="small"
        >
          货道
        </el-button>
        <el-button
          @click="$emit('policyClick', scope.row)"
          type="text"
          size="small"
        >
          策略
        </el-button>
        <el-button
          @click="$emit('modifyClick', scope.row)"
          type="text"
          size="small"
        >
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    WorkOrderDate: {
      type: Array,
      required: true,
    },
    pageIndex: {
      type: String,
    },
    BatchOperate: {
      type: Array,
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
    // 勾选checkout框
    select(selection, row) {
      this.$emit('update:BatchOperate', selection)
    },
    // 勾选全选框
    selectAll(selection) {
      this.$emit('update:BatchOperate', selection)
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
::v-deep .el-table-column--selection > .cell {
  padding-left: 14px !important;
}
</style>
