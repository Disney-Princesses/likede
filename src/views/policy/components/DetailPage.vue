<template>
  <el-dialog
    title="策略详情"
    :visible="dialogVisible"
    @close="$emit('update:dialogVisible', false)"
    width="50%"
  >
    <p style='margin:30px 0;fontSize:16px'>策略名称: {{ currentData.policyName }}</p>
    <span style="float: left;fontSize:16px">策略方案:</span>
    <el-table
      ref="policyTable"
      :data="policyTableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 80%"
      :header-cell-style="{ background: '#f3f6fb' }"
      empty-text="暂时没有数据了"
    >
      <el-table-column type="index" width="100" label="序号"> </el-table-column>
      <el-table-column property="nodeName" label="点位名称" />
      <el-table-column property="innerCode" label="设备编号" />
    </el-table>
    <!-- 尾部 -->
    <Foot
      :totalCount="totalCount"
      :totalPage="totalPage"
      :pageIndex="pageIndex"
      @loadPrePage="loadPrePage"
      @loadNextPage="loadNextPage"
      ref="nextpre"
    ></Foot>
  </el-dialog>
</template>

<script>
import { getDetailApi } from '@/api/policy'
import Foot from '@/views/policy/components/Foot'
export default {
  data() {
    return {
      pageIndex: '1',
      pageSize: '10',
      policyTableData: [],
      totalCount: '',
      totalPage: '',
    }
  },
  props: {
    currentData: {
      type: Object,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Foot,
  },
  created() {
    this.getDetailData()
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val
    },
    dateFormat(row, column) {
      let date = row[column.property]
      return moment(date).format('YYYY-MM-DD HH-mm-ss')
    },
    async getDetailData() {
      const { data } = await getDetailApi(
        this.currentData.policyId,
        this.pageIndex,
        this.pageSize,
      )
      this.policyTableData = data.currentPageRecords
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
    },
    // 切换上一页
    loadPrePage() {
      this.pageIndex--
      this.getDetailData()
    },
    // 切换下一页
    async loadNextPage() {
      this.pageIndex++
      this.getDetailData()
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
::v-deep.el-table {
  margin-left: 80px;
  margin-top: -15px;
}
::v-deep .el-dialog__body {
  padding: 0px 30px 30px 80px !important;
}
</style>
