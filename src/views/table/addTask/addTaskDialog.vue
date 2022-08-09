<template>
  <el-dialog title="新增工单" :visible="visible" @close="onClose">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="设备编号" prop="innerCode">
        <el-input v-model="ruleForm.innerCode" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="工单类型" prop="productType">
        <el-select v-model="ruleForm.productType" placeholder="请选择">
          <el-option label="补货工单" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补货数量">
        <span href="#" style="color: #5f84ff">补货清单</span>
      </el-form-item>
      <el-form-item label="运营人员" prop="userId">
        <el-select v-model="ruleForm.userId" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input
          type="textarea"
          v-model="ruleForm.desc"
          placeholder="请输入备注(不超过40字)"
        ></el-input>
      </el-form-item>
      <el-form-item class="btn-part">
        <el-button @click="submitForm('ruleForm')" class="concel-btn"
          >取消</el-button
        >
        <el-button @click="resetForm('ruleForm')" class="onfirm-btn"
          >确认</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        innerCode: '',
        productType: '',
        expectCapacity: '',
        userId: '',
        desc: '',
      },
      rules: {
        innerCode: [
          { required: true, message: '请输入设备编号', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符',
            trigger: 'blur',
          },
        ],
        productType: [
          { required: true, message: '请选择工单类型', trigger: 'change' },
        ],
        userId: [
          { required: true, message: '请选择运营人员', trigger: 'change' },
        ],
        desc: [{ required: true, message: '请填写备注信息', trigger: 'blur' }],
      },
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
    onClose() {
      this.$emit('update:visible', false)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped lang="less">
::v-deep .el-dialog {
  width: 630px;
  border-radius: 10px;
}
::v-deep .el-dialog__title {
  line-height: 22px;
  font-size: 16px;
  font-weight: 600;
}
.el-select {
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
