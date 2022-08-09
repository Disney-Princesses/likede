<template>
  <div>
    <el-dialog
      title="工单详情"
      :visible="dialogVisible"
      @close="onClose"
      width="30%"
    >
      <DetailInfo
        :detailInfo="detailInfo"
        ref="detail"
        :isRepair="isRepair"
      ></DetailInfo>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reCreate" v-if="detailInfo.taskStatus === '取消'"
          >重新创建</el-button
        >
        <el-button v-if="detailInfo.taskStatus === '待办'" @click="concelTask"
          >取消工单</el-button
        >
      </span>
    </el-dialog>
    <!-- 取消工单的弹窗 -->
    <el-dialog
      :visible.sync="visible"
      width="30%"
      center
      class="concelDialog"
      :show-close="false"
    >
      <i class="el-icon-warning"></i>
      <span class="title">取消工单后，将不能恢复，是否确认取消？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" class="onconcel">取 消</el-button>
        <el-button @click="onFirm" class="onfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { handleTime, handleStatus } from '@/utils/handleTime.vue'
import { getTaskInfoApi, concelTask } from '@/api'
import DetailInfo from './detailInfo.vue'
export default {
  components: {
    DetailInfo,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    isRepair: {
      type: Boolean,
    },
    orderInfo: {
      type: Object,
    },
  },
  data() {
    return {
      detailInfo: {},
      visible: false,
    }
  },
  watch: {
    orderInfo() {
      this.detailInfo = this.orderInfo
    },
  },
  created() {},

  methods: {
    // 获取查看详情页面的信息
    async getTaskInfo(id) {
      try {
        const { data } = await getTaskInfoApi(id)
        if (!isNaN(data.createType)) {
          data.createType = data.createType === 1 ? '手动' : '自动'
        }
        data.createTime = handleTime(data.createTime)
        data.updateTime = handleTime(data.updateTime)
        data.taskStatus = handleStatus(data.taskStatus)
        this.detailInfo = data
      } catch (error) {}
    },
    onClose() {
      this.$emit('update:dialogVisible', false)
    },
    // 取消状态时可以重新创建，即创建新工单
    reCreate() {
      this.$emit('reCreate', this.detailInfo)
      this.onClose()
    },
    // 点击取消工单
    concelTask() {
      this.visible = true
    },
    // 点击确认
    async onFirm() {
      await concelTask(this.detailInfo)
      this.visible = false
      this.$emit('updata:dialogVisible', false)
      this.$emit('reGetTask')
      this.onClose()
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
::v-deep .el-dialog {
  width: 630px !important;
  .el-dialog__footer {
    padding: 0 40px 20px;
    text-align: center;
    .el-button {
      width: 80px;
      height: 36px;
      padding: 0;
      background-color: #f5eae4;
      border: 0;
      color: #655b56;
    }
  }
}
.concelDialog {
  ::v-deep .el-dialog {
    width: 410px !important;
    border-radius: 4px;
    margin-top: 40vh !important;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 30px 18px 42px 17px;
    }
    .el-icon-warning {
      padding-top: 2px;
      padding: 0 17px 0 20px;
      font-size: 20px;
      color: #ff665f;
    }
    span.title {
      font-size: 16px;
      color: #000;
      font-weight: 500;
    }
    button {
      width: 56px !important;
      height: 30px !important;
      font-size: 12px;
    }
    .onconcel {
      background-color: #fff;

      color: #606266;
      border: 1px solid #d8dde3;
    }
    .onfirm {
      color: #fff;
      background-color: #5f84ff;
      border-color: #5f84ff;
    }
  }
}
</style>
