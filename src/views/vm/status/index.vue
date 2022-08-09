<template>
  <div class="app-container">
    <head-search
      :formInline="formInline"
      :orderLabel="orderLabel"
      @searchClick="searchFn"
    ></head-search>
    <div class="contentMain">
      <!-- 表单部分 -->
      <Mytable
        :WorkOrderDate="
          sellData.currentPageRecords ? sellData.currentPageRecords : []
        "
        @modifyClick="modifyClick"
        :pageIndex="pageIndex"
        v-loading="loading"
      >
      </Mytable>
      <!-- 底部部分 -->
      <div class="bottom">
        <div class="info">
          共{{ sellData.totalCount }}条记录 第 {{ sellData.pageIndex }}/{{
            sellData.totalPage
          }}
          页
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
      <!-- 弹框部分 -->
      <aisleDialog
        v-if="isShowDialog"
        :isShowDialog.sync="isShowDialog"
        :dialogData="dialogData || []"
      ></aisleDialog>
    </div>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import Mytable from './components/table.vue'
import aisleDialog from './components/dialog/aisleDialog.vue'
import { getPolicyList, getServiceData } from '@/api'

export default {
  data() {
    return {
      formInline: {
        userCode: '',
      },
      orderLabel: '设备编号',
      // 表单数据
      sellData: [],
      // 按钮禁用
      nextDisable: false,
      // 表单页数
      pageIndex: '',
      // 策略数据
      PolicyData: [],
      taskSearchData: {
        // 当前页码
        pageIndex: 1,
        // 设备编号
        innerCode: '',
        // 工单状态 0:未投放,1:运营,3:撤机
        status: '',
        loading: false,
      },
      isShowDialog: false,
      dialogData: {},
    }
  },

  created() {
    // 获取设备数据
    this.getServiceData()
  },

  methods: {
    handleClick() {},
    // 获取设备数据
    async getServiceData() {
      this.loading = true
      const res = await getServiceData(this.taskSearchData)
      res.data.currentPageRecords.forEach((item) => {
        item.vmStatus ? (item.vmStatus = '运营') : (item.vmStatus = '未投放')
        if (item.vmStatus === '3') {
          item.vmStatus = '撤机'
        }
        item.node.addr = item.node.addr.split('-')
        item.node.addr = item.node.addr[item.node.addr.length - 1]
      })
      this.sellData = res.data
      this.pageIndex = res.data.pageIndex
      this.loading = false
    },
    // 查看详情
    modifyClick(e) {
      this.isShowDialog = true
      this.dialogData = e
    },
    // 搜索
    searchFn() {
      console.log(123456)
      // 非空判断
      if (this.formInline.userCode.length <= 0)
        return this.$message.error('请输入设备编号')
      // 接收输入框的值
      this.taskSearchData.innerCode = this.formInline.userCode
      // 获取数据
      this.getServiceData()
    },
    // 下一页
    getNextPage() {
      //总页数-当前页
      let numIndex =
        parseInt(this.sellData.totalPage) - parseInt(this.sellData.pageIndex)
      // 当数据长度不足10时,禁用点击按钮
      console.log(numIndex)
      if (numIndex === 1) {
        this.nextDisable = true
      }
      this.taskSearchData.pageIndex++
      // 获取工单数据
      this.getServiceData(this.taskSearchData)
    },
    // 上一页
    previousPage(e) {
      this.taskSearchData.pageIndex--
      // 获取工单数据
      this.getServiceData(this.taskSearchData)
    },
    // 点击新建按钮
    newDataFn() {
      this.isShowDialog = true
    },
    // 点击批量操作
    async operateDataFn() {
      if (this.BatchOperate.length === 0) {
        return this.$message.warning('请勾选售货机')
      }
      this.isModifyDialog = true
      const { data } = await getPolicyList()
      this.PolicyData = data
    },
  },
  components: {
    headSearch,
    Mytable,
    aisleDialog,
  },
  computed: {
    isdisable() {
      return this.sellData?.pageIndex <= 1 ? true : false
    },
  },
}
</script>

<style scoped lang="scss">
// 主体内容部分
.contentMain {
  padding: 20px 15px 19px 17px;
  background-color: #fff;
  .buttonPart {
    display: flex;
    .appBtn:nth-child(2) {
      margin-left: 10px;
    }
  }
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
