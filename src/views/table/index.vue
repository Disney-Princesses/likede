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
        :isImportBtn="true"
        @addTask="addTask"
        @taskConfig="taskConfig"
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
    <!-- 详情对话框 -->
    <My-dialog
      ref="dialog"
      :dialogVisible.sync="dialogVisible"
      @reCreate="reCreateTask"
      @reGetTask="reGetTask"
      :taskSearchData="taskSearchData"
    ></My-dialog>

    <!-- 新增工单的对话框 -->
    <addDialog
      :visible.sync="addvisible"
      ref="addDialog"
      :isRepair="taskSearchData.isRepair"
      @reGetTaskList="reGetTaskList"
    ></addDialog>

    <!-- 工单配置的对话框 -->
    <ConfigDialog
      :visible.sync="configvisible"
      @reGetTask="reGetTask"
    ></ConfigDialog>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import newImportButton from '@/components/newImportBtn'
import tableModule from '@/components/tableModule'
import { taskSearch, getAddGoodsApi } from '@/api'
import MyDialog from './components/dialog.vue'
import addDialog from './addTask/addTaskDialog.vue'
import ConfigDialog from './config/taskConfig.vue'
// import addGoodsDialog from './components/taskDetail.vue'
export default {
  data() {
    return {
      formInline: {
        userCode: '',
        region: '',
      },
      // 下拉数据
      dropDownList: ['待办', '进行', '取消', '完成'],
      // 表单数据
      WorkOrderDate: {},
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
        isRepair: false,
      },
      // 按钮禁用
      nextDisable: false,
      // 控制对话框显隐
      dialogVisible: false,
      // id: '',
      visible: false,
      addvisible: false,
      configvisible: false,
      reCreateInfo: {},
      regetUserList: [],
    }
  },
  created() {
    // 获取工单数据
    this.taskSearch(this.taskSearchData)
  },

  methods: {
    // 获取工单数据
    async taskSearch(taskData) {
      try {
        const { data } = await taskSearch(taskData)
        data?.currentPageRecords?.forEach((item) => {
          item.createType = item.createType === 0 ? '自动' : '手动'
          item.createTime = item.createTime
            .replace('T', ' ')
            .replace('-', '.')
            .replace('-', '.')
        })
        this.WorkOrderDate = data
        if (data.currentPageRecords.length < 10) {
          this.nextDisable = true
        }
      } catch (error) {}
    },
    // 重新获取工单数据
    reGetTaskList() {
      this.taskSearchData = {
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
        isRepair: false,
      }
      this.taskSearch(this.taskSearchData)
    },
    reGetTask() {
      this.reGetTaskList()
    },
    // 点击获取工单详情
    handleClick(id) {
      //  显示对话框
      this.dialogVisible = true
      this.$refs.dialog.getTaskInfo(id)
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
      this.taskSearchData.pageIndex++
      // 获取工单数据
      this.taskSearch(this.taskSearchData)
    },
    // 上一页
    previousPage(e) {
      this.taskSearchData.pageIndex--
      // 获取工单数据
      this.taskSearch(this.taskSearchData)
    },
    // 点击搜索
    submit(data) {
      // console.log(data)
      // 编号
      this.taskSearchData.taskCode = data.userCode
      // 工单状态 1:代办,2:进行,3:取消,4:完成
      // 处理数据
      switch (data.region) {
        case '待办':
          this.taskSearchData.status = 1
          break
        case '进行':
          this.taskSearchData.status = 2
          break
        case '取消':
          this.taskSearchData.status = 3
          break
        case '完成':
          this.taskSearchData.status = 4
          break
        default:
          this.taskSearchData.status = ''
          break
      }
      // console.log(data.region)
      // 获取工单数据
      this.taskSearch(this.taskSearchData)
    },
    // 点击新建
    addTask() {
      this.addvisible = true
      this.$refs.addDialog.getTaskStatus()
    },
    // 重新创建工单
    async reCreateTask(data1) {
      // this.reCreateInfo = data1

      // 显示新建对话框
      this.addTask()
      // 触发获取运营人员列表的方法
      await this.$refs.addDialog.getInnerCode(data1.innerCode)
      // 重新获取补货详情信息
      const { data } = await getAddGoodsApi(data1.taskId)
      // console.log(data)
      this.reCreateInfo = { ...data1, details: data }
      // console.log(this.reCreateInfo)

      // 数据回显
      this.$refs.addDialog.reShowInfo(this.reCreateInfo)
    },

    // 点击工单配置
    taskConfig() {
      this.configvisible = true
    },
  },
  components: {
    headSearch,
    newImportButton,
    tableModule,
    MyDialog,
    addDialog,
    ConfigDialog,
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
// 按钮禁用
</style>
