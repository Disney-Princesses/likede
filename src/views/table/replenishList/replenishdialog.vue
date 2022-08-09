<template>
  <el-dialog title="补货详情" :visible="visible" @close="onClose">
    <el-table
      :data="tableData"
      height="250"
      border
      style="width: 100%"
      class="replenishList"
    >
      <el-table-column prop="channelCode" label="货道编号" width="92">
      </el-table-column>
      <el-table-column prop="sku.skuName" label="商品名称" width="92">
      </el-table-column>
      <el-table-column prop="currentCapacity" label="当前数量" width="92">
      </el-table-column>
      <el-table-column prop="requireNum" label="还可添加" width="92">
      </el-table-column>
      <el-table-column label="补满数量">
        <template slot-scope="scope">
          <el-input-number
            v-if="!scope.row.isShow"
            v-model="scope.row.addNum"
            controls-position="right"
            @change="handleChange(scope)"
            :min="0"
            :max="scope.row.requireNum"
          ></el-input-number>
          <span v-if="scope.row.isShow">货道暂无商品</span>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose()" class="concel-btn">取 消</el-button>
      <el-button @click="onFirm" class="onfirm-btn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getreplenishListApi } from '@/api'
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
    innerCode: {
      type: String,
      required: true,
    },
  },
  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    // 获取补货清单
    async getreplenishList() {
      const res = await getreplenishListApi(this.innerCode)
      const data = res.data
      data.forEach((item) => {
        item.isShow = false
        if (item.sku === null) {
          item.isShow = true
          item.currentCapacity = '-'
          item.requireNum = '-'
          item.sku = {}
          item.sku.skuName = '-'
        } else {
          item.requireNum = item.maxCapacity - item.currentCapacity
          if (item.requireNum <= 0) {
            item.requireNum = 0
            item.addNum = 0
          } else {
            item.addNum = item.requireNum
          }
        }
      })
      this.tableData = data
    },
    // 补满数量的计数器变化
    handleChange(val) {
      this.tableData.addNum = val
    },
    onFirm() {
      const details = []
      this.tableData.forEach((item) => {
        item.detail = {}
        item.detail.channelCode = item.channelCode
        item.detail.expectCapacity = item.addNum
        item.detail.skuId = item.sku.skuId
        item.detail.skuImage = item.sku.skuImage
        item.detail.skuName = item.sku.skuName
        details.push(item.detail)
      })
      //把整合的数据传给父组件
      this.$emit('getReplenishInfo', details)
      this.$emit('update:visible', false)
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
.replenishList {
  height: 100% !important;
}

button {
  width: 80px;
  height: 36px;
  padding: 0;
}
.concel-btn {
  background-color: #fbf4f0;
  border: none;
  color: #655b56;
}
.onfirm-btn {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
  color: #fff;
}
.dialog-footer {
  text-align: center;
  ::v-deep .el-form-item__content {
    margin-left: 0px !important;
  }
}
::v-deep .el-dialog__footer {
  text-align: center;
}
</style>
