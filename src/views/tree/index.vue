<template>
  <div class="app-container">
    <!-- 头部 -->
    <headSearch
      :dropDown="true"
      orderLabel="工单编号"
      stateLabel="工单状态"
      :dropDownList="dropDownList"
      :formInline="formInline"
      @searchClick="submit"
    ></headSearch>
    <!-- 内容部分 -->
    <div class="contentMain">
      <!-- 按钮部分 -->
      <newImportButton
        :isImportBtn="false"
        @addTask="addTask"
      ></newImportButton>
      <!-- 表单部分 -->
      <tableModule
        :WorkOrderDate="
          WorkOrderDate.currentPageRecords
            ? WorkOrderDate.currentPageRecords
            : []
        "
        :taskSearchData="taskSearchData"
      >
        <template v-slot="taskId">
          <el-button
            @click="handleClick(taskId.taskId.row.taskId)"
            type="text"
            size="small"
            >查看详情</el-button
          >
        </template>
      </tableModule>
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

    <!--工单详情对话框  -->
    <taskDetailDialog
      :dialogVisible.sync="taskvisible"
      ref="taskdetail"
      :isRepair="taskSearchData.isRepair"
      @reCreate="reCreateRepair"
      @reGetTask="reGetRepairList"
    ></taskDetailDialog>
    <!-- 详情对话框 -->
    <!-- 新增工单的对话框 -->
    <addDialog
      :visible.sync="addvisible"
      ref="addDialog"
      :isRepair="taskSearchData.isRepair"
      @reGetRepairList="reGetRepairList"
    ></addDialog>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import newImportButton from '@/components/newImportBtn'
import tableModule from '@/components/tableModule'
import { TaskOperationApi } from '@/api/operation'
import { handleTime, taskStatus } from '@/utils/handleTime.vue'
import taskDetailDialog from '../table/components/dialog.vue'
// 新增工单对话框
import addDialog from '../table/addTask/addTaskDialog.vue'
export default {
  data() {
    return {
      // 下拉数据
      dropDownList: ['待办', '进行', '取消', '完成'],
      formInline: {
        userCode: '',
        region: '',
      },
      // 表单数据
      WorkOrderDate: [],
      taskSearchData: {
        // 当前页码
        pageIndex: 1,
        // 设备编号
        innerCode: '',
        // 工单所属人ID
        userId: '',
        // 工单编号
        taskCode: '',
        // 工单状态 1:代办,2:进行,3:取消,4:完成
        status: '',
        // 是否是维修工单
        isRepair: true,
      },
      // 按钮禁用
      nextDisable: false,
      // 表单详情对话框的显隐
      taskvisible: false,
      // 新建工单对话框的显隐
      addvisible: false,
      // 回显数据
      reCreateInfo: {},
    }
  },
  components: {
    headSearch,
    newImportButton,
    tableModule,
    addDialog,
    taskDetailDialog,
  },
  created() {
    this.getOperationList(this.taskSearchData)
  },

  methods: {
    // 获取运维工单
    async getOperationList(taskData) {
      try {
        const { data } = await TaskOperationApi(taskData)
        data?.currentPageRecords?.forEach((item) => {
          item.createType = item.createType === 1 ? '手动' : '自动'
          item.createTime = handleTime(item.createTime)
          item.updateTime = handleTime(item.updateTime)
        })
        this.WorkOrderDate = data
      } catch (error) {
        console.log(error)
      }
    },
    //  // 下一页
    getNextPage() {
      //总页数-当前页
      let numIndex =
        parseInt(this.WorkOrderDate.totalPage) -
        parseInt(this.WorkOrderDate.pageIndex)
      // 当数据长度不足10时,禁用点击按钮
      if (numIndex === 1) {
        this.nextDisable = true
      }
      this.taskSearchData.pageIndex++
      // 获取工单数据
      this.getOperationList(this.taskSearchData)
    },
    // 上一页
    previousPage() {
      this.taskSearchData.pageIndex--
      // 获取工单数据
      this.getOperationList(this.taskSearchData)
    },

    // 点击搜索
    submit(data) {
      this.taskSearchData.taskCode = data.userCode
      // 处理数据
      this.taskSearchData.status = taskStatus(
        data.region,
        this.taskSearchData.status,
      )
      // 获取查询数据
      this.getOperationList(this.taskSearchData)
    },
    // 点击新建
    addTask() {
      this.addvisible = true
      this.$refs.addDialog.getTaskStatus()
    },
    // 点击工单详情
    handleClick(id) {
      this.taskvisible = true
      this.$refs.taskdetail.getTaskInfo(id)
    },
    // 重新获取维修工单
    reGetRepairList() {
      const taskSearchData = {
        // 当前页码
        pageIndex: 1,
        // 设备编号
        innerCode: '',
        // 工单所属人ID
        userId: '',
        // 工单编号
        taskCode: '',
        // 工单状态 1:代办,2:进行,3:取消,4:完成
        status: '',
        // 是否是维修工单
        isRepair: true,
      }
      this.getOperationList(taskSearchData)
    },
    // 重新创建运维工单
    async reCreateRepair(data1) {
      this.reCreateInfo = data1
      // console.log(this.reCreateInfo);
      // 触发获取运营人员列表的方法
      await this.$refs.addDialog.getInnerCode(data1.innerCode)
      // // 重新获取补货详情信息
      // const { data } = await getAddGoodsApi(data1.taskId)

      // this.reCreateInfo = { ...data1, details: [] }
      this.addTask()
      // 数据回显
      this.$refs.addDialog.reShowInfo(this.reCreateInfo)
    },
  },
  computed: {
    isdisable() {
      return this.WorkOrderDate?.pageIndex <= 1 ? true : false
    },
  },
}
</script>

<style scoped lang="scss">
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
