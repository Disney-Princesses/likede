<template>
  <el-table
    ref="singleTable"
    :data="GoodsListData"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%"
    :header-cell-style="{ background: '#f3f6fb' }"
    empty-text="暂时没有数据了"
  >
    <el-table-column type="index" width="100" label="序号"> </el-table-column>
    <el-table-column property="skuName" label="商品名称" />
    <el-table-column  label="商品图片" >
      <template slot-scope="scope">
        <img :src='scope.row.skuImage' style="width:24px;height:24px">
      </template>
    </el-table-column>
    <el-table-column property="brandName" label="品牌" />
    <el-table-column property="unit" label="规格" />
    <el-table-column property="price" label="商品价格" />
    <el-table-column property="skuClass.className" label="商品类型" />
    <el-table-column property="updateTime" :formatter="dateFormat" label="创建日期"> 
    </el-table-column>
    <el-table-column label="操作">
      <slot></slot>
      <template slot-scope="scope">
        <el-button
          type="text"
          size="medium "
          @click="$emit('editType', scope.row)"
          >修改</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      currentRow: null,
      visible: false,
    }
  },
  props: {
    GoodsListData: {
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
    dateFormat(row,column) {
      let date = row[column.property]
      return moment(date).format('YYYY-MM-DD HH-mm-ss')
    }
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
