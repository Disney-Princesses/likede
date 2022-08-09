<template>
  <div class="app-container">
    <!-- 头部 -->
    <headSearch
      :dropDown="false"
      orderLabel="订单编号"
      :formInline="formInline"
      @searchClick="submit"
    >
      <div class="block">
        <span class="demonstration">选择日期：</span>
        <el-date-picker
          v-model="formInline.value"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </headSearch>
    <!-- 内容部分 -->
    <div class="contentMain">
      <!-- 表单部分 -->
      <TablePart
        :WorkOrderDate="
          WorkOrderDate.currentPageRecords
            ? WorkOrderDate.currentPageRecords
            : []
        "
      >
        <template v-slot="taskId">
          <el-button @click="handleClick(taskId)" type="text" size="small"
            >查看详情</el-button
          >
        </template>
      </TablePart>
      <!-- 底部部分 -->
      <div class="bottom">
        <div class="info">
          共{{ WorkOrderDate.totalCount }}条记录 第
          {{ WorkOrderDate.pageIndex }}/{{ WorkOrderDate.totalPage }} 页
        </div>
        <div class="change">
          <el-button @click="previousPage" :disabled="isdisable"
            >上一页</el-button
          >
          <el-button @click="getNextPage" :disabled="nextDisable"
            >下一页</el-button
          >
        </div>
      </div>
    </div>

    <!-- 详情对话框 -->
    <OrderDialog
      :dialogVisible.sync="dialogVisible"
      :orderInfo="orderDetail"
    ></OrderDialog>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import TablePart from './components/table.vue'
import { getOrderSearch } from '@/api'
import { handleOrder, handleTime } from '@/utils/handleTime.vue'
import OrderDialog from '../table/components/dialog.vue'
export default {
  data() {
    return {
      formInline: {
        userCode: '',
        value: '',
      },
      WorkOrderDate: {},
      searchData: {
        pageIndex: 1,
        pageSize: 10,
        orderOn: '',
        startDate: '',
        endDate: '',
      },
      // 上一页按钮的禁用
      visible: false,
      // 下一页按钮禁用
      nextDisable: false,
      // 详情对话框的显隐
      dialogVisible: false,
      // 详情信息
      orderDetail: {},
    }
  },
  components: {
    headSearch,
    TablePart,
    OrderDialog,
  },
  created() {
    this.getOrderList()
  },
  computed: {
    // 上一页按钮的禁用
    isdisable() {
      return this.WorkOrderDate?.pageIndex <= 1 ? true : false
    },
  },
  methods: {
    // 根据条件查询
    submit(data) {
      this.searchData.startDate = data.value ? data.value[0] : ''
      this.searchData.endDate = data.value ? data.value[1] : ''
      this.searchData.orderOn = this.formInline.userCode

      this.getOrderList(this.searchData)
    },
    async getOrderList() {
      try {
        const { data } = await getOrderSearch(this.searchData)
        // console.log(data)
        data.currentPageRecords.forEach((item) => {
          item.amount = item.amount / 100
          item.status = handleOrder(item.status)
          item.createTime = handleTime(item.createTime)
          item.updateTime = handleTime(item.updateTime)
          item.addr = item.addr.split('-')
          item.addr = item.addr[item.addr.length - 1]
        })
        this.WorkOrderDate = data
        if (data.currentPageRecords.length < 10) {
          this.nextDisable = true
        }
      } catch (error) {}
    },
    // 点击获取订单详情
    handleClick(data) {
      //  显示对话框
      this.orderDetail = data.taskId.row
      this.dialogVisible = true
      // this.$refs.dialog.getTaskInfo(id)
    },
    // 上一页
    previousPage() {
      this.searchData.pageIndex--
      // 获取订单数据
      this.getOrderList(this.searchData)
    },
    // 下一页
    getNextPage() {
      //总页数-当前页
      let numIndex =
        parseInt(this.WorkOrderDate.totalPage) -
        parseInt(this.WorkOrderDate.pageIndex)
      // 当数据长度不足10时,禁用点击按钮
      if (numIndex === 1) {
        this.nextDisable = true
      }
      this.searchData.pageIndex++
      // 获取工单数据
      this.getOrderList(this.searchData)
    },
  },
}
</script>

<style scoped lang="less">
// 主体内容部分
.contentMain {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  // 底部功能
  .bottom {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      color: #dbdfe5;
    }
    .change {
      ::v-deep .el-button:nth-child(1) {
        margin-right: 40px;
      }
    }
  }
}
</style>
