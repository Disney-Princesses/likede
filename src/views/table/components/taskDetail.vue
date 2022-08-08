<template>
  <el-dialog
    title="补货详情"
    :visible="visible"
    :modal="false"
    @close="onClose"
  >
    <el-table
      :data="tableData"
      style="width: 100%"
      height="250"
      class="addGoodsDialog"
    >
      <el-table-column prop="channelCode" label="货道编号"> </el-table-column>
      <el-table-column prop="skuName" label="商品"> </el-table-column>
      <el-table-column prop="expectCapacity" label="补货数量">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getAddGoodsApi } from '@/api'
export default {
  data() {
    return {
      tableData: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    async getAddGoodsDetail(id) {
      const res = await getAddGoodsApi(id)
      this.tableData = res.data
    },
  },
}
</script>

<style scoped lang="less">
::v-deep .el-dialog__title {
  line-height: 22px;
  font-size: 16px;
  font-weight: 600;
}
::v-deep .el-dialog__body {
  padding: 20px 20px 30px;
  height: 432px;
}
.addGoodsDialog {
  height: 100% !important;
}
</style>
