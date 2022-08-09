<template>
  <el-dialog
    title="批量策略管理"
    @close="onClose"
    :visible="isModifyDialog"
    width="40%"
  >
    <el-form :model="form" center :rules="onrules" ref="form">
      <el-form-item label="选择策略:" prop="vmType" class="paddingLabel">
        <el-select v-model="form.vmType" placeholder="请选择">
          <el-option
            :label="item.policyName"
            :value="item.policyId"
            v-for="item in PolicyData"
            :key="item.policyId"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <operateBtn @click="onClose">取 消</operateBtn>
      <newDataBtn type="primary" @click="submit" :pic="false">确 定</newDataBtn>
    </div>
  </el-dialog>
</template>

<script>
import operateBtn from '../btn/operateBtn.vue'
import newDataBtn from '../btn/newDataBtn.vue'
import { applyPolicy } from '@/api'

export default {
  props: {
    isModifyDialog: {
      type: Boolean,
      required: true,
    },
    PolicyData: {
      type: Array,
      required: true,
    },
    BatchOperate: {
      type: Array,
    },
  },
  data() {
    return {
      form: {
        vmType: '',
      },
      onrules: {
        vmType: [
          { required: true, message: '请选择设备型号', trigger: 'blur' },
        ],
      },
    }
  },

  created() {},

  methods: {
    // 关闭弹框
    onClose() {
      this.$emit('update:isModifyDialog', false)
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
    },
    // 点击新增
    async submit() {
      try {
        await this.$refs.form.validate()
        const innerArr = []
        this.BatchOperate.forEach((item) => {
          innerArr.push(item.innerCode)
        })
        const res = await applyPolicy({
          innerCodeList: innerArr,
          policyId: this.form.vmType,
        })
        
        // 提示信息
        this.$message.success('添加成功')
        // 获取售货机类型
        this.$emit('getServiceData')
        // 关闭弹框
        this.onClose()
        // 清空数据
        this.$emit('update:BatchOperate', [])
      } catch (error) {
        this.$message.error('操作失败')
      }
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
  padding: 20px 80px;
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
</style>
