<template>
  <el-dialog
    title="策略管理"
    @close="onClose"
    :visible="isPolicyDialog"
    width="30%"
  >
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          机器编号: <span>{{ dialogData.innerCode }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          策略名称: <span>{{ dialogData.policyName }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          策略方案: <span>{{ dialogData.discount + '%' }}</span>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <operateBtn @click="abolish">取消策略</operateBtn>
    </div>
  </el-dialog>
</template>

<script>
import operateBtn from '../btn/operateBtn.vue'
import newDataBtn from '../btn/newDataBtn.vue'
import { CancellationPolicy } from '@/api'

export default {
  props: {
    isPolicyDialog: {
      type: Boolean,
      required: true,
    },
    dialogData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    // 关闭弹框
    onClose() {
      this.$emit('update:isPolicyDialog', false)
    },
    // 取消策略
    async abolish() {
      try {
        await CancellationPolicy(
          this.dialogData.innerCode,
          this.dialogData.policyId,
        )
        this.$message.success('取消策略成功')
        this.onClose()
      } catch (error) {}
    },
  },
  components: {
    operateBtn,
    newDataBtn,
  },
}
</script>

<style scoped lang="less">
::v-deep .el-dialog {
  border-radius: 20px;
}
::v-deep .el-dialog__body {
  padding: 40px 80px 0;
}
::v-deep .el-input__inner {
  width: 424px;
}
::v-deep .el-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
::v-deep .dialog-footer {
  display: flex;
  .appBtn {
    margin-right: 30px;
  }
}
::v-deep .el-form-item__label {
  font-weight: 400;
}
::v-deep.paddingLabel {
  .el-form-item__label {
    padding-left: 9px;
  }
}
::v-deep .el-col-12 {
  height: 40px;
}

::v-deep .grid-content {
  font-size: 14px;
  span {
    margin-left: 15px;
  }
}
</style>
