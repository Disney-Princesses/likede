<template>
  <el-dialog title="工单配置" :visible="visible" @close="onClose">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="补货警戒线" prop="name">
        <el-input-number
          v-model="ruleForm.supply"
          controls-position="right"
          :min="1"
          :max="100"
        ></el-input-number>
      </el-form-item>
      <el-form-item class="btn-part">
        <el-button @click="onConcel" class="concel-btn">取消</el-button>
        <el-button @click="onFirm" class="onfirm-btn">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { setAutoSupply } from '@/api'
export default {
  data() {
    return {
      ruleForm: {
        supply: '',
      },
      rules: { name: [] },
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
    onConcel() {
      this.$emit('update:visible', false)
      this.ruleForm.supply = ''
    },
    onClose() {
      this.$emit('update:visible', false)
      this.ruleForm.supply = ''
    },
    // 点击确认
    async onFirm() {
      await setAutoSupply(this.ruleForm.supply)
      this.onClose()
      this.$emit("reGetTask")
    },
  },
}
</script>

<style scoped lang="less">
.el-input-number {
  width: 100%;
}
::v-deep .el-form-item__label {
  font-weight: normal;
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
.btn-part {
  text-align: center;
  ::v-deep .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>
