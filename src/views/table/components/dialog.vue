<template>
  <el-dialog
    title="工单详情"
    :visible="dialogVisible"
    @close="onClose"
    width="30%"
  >
    <DetailInfo :detailInfo="detailInfo" ref="detail"></DetailInfo>
    <span slot="footer" class="dialog-footer">
      <el-button>重新创建</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { handleTime, handleStatus } from '@/utils/handleTime.vue'
import { getTaskInfoApi } from '@/api'
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
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      detailInfo: {},
    }
  },

  created() {},

  methods: {
    async getTaskInfo(id) {
      const { data } = await getTaskInfoApi(id)
      data.createType = data.createType === 0 ? '自动' : '手动'
      data.createTime = handleTime(data.createTime)
      data.updateTime = handleTime(data.updateTime)
      data.taskStatus = handleStatus(data.taskStatus)
      this.detailInfo = data
    },
    onClose() {
      this.$emit('update:dialogVisible', false)
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
</style>
