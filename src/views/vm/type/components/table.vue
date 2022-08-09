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
    <el-table-column type="index" width="100" label="序号" :index="number">
    </el-table-column>

    <el-table-column property="name" label="型号名称" width="250">
    </el-table-column>
    <el-table-column property="model" label="型号编码" width="250">
    </el-table-column>
    <el-table-column property="image" label="设备图片">
      <template slot-scope="scope">
        <img
          :src="scope.row.image"
          alt=""
          width="24"
          height="24"
          style="border-radius: 50%"
        />
      </template>
    </el-table-column>
    <el-table-column property="vmRow" label="货道行" width="180">
    </el-table-column>
    <el-table-column property="vmCol" label="货道列" width="180">
    </el-table-column>
    <el-table-column property="channelMaxCapacity" label="设备容量" width="180">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          @click="$emit('modifyClick', scope.row)"
          type="text"
          size="small"
        >
          修改
        </el-button>
        <el-button
          @click="$emit('removeClick', scope.row)"
          type="text"
          size="small"
          style="color: red"
        >
          删除
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
.status .cell .el-button {
  color: #fff;
  padding: 8px 15px !important;
  margin: 0 10px;
  border-radius: 14px;
}
.failure {
  color: #fff;
  padding: 8px 15px !important;
  margin: 0 10px;
  border-radius: 14px;
  background-color: #ffbc27 !important;
}
.success {
  color: #fff;
  padding: 8px 15px !important;
  margin: 0 10px;
  border-radius: 14px;
  background-color: #41cd97 !important;
}
</style>
