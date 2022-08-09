<template>
  <el-dialog
    :title="titleName"
    :visible="dialogVisible"
    width="50%"
    @close="$emit('update:dialogVisible', false)"
    style="fontweight: 700"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="inputRules"
      label-width="120px"
      style="fontweight: 700"
    >
      <el-form-item label="策略名称:" prop="discount">
        <el-input
          v-model.trim="form.policyName"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="策略方案:" prop="discount">
        <el-input-number
          v-model="form.discount"
          controls-position="right"
          placeholder="请输入"
          style="width: 100%"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="clickFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addPolicy, editPolicy } from '@/api/policy'
export default {
  data() {
    return {
      form: {
        policyName: '',
        discount: '',
      },
      goodsTypeList: [],
      inputRules: {
        policyName: [
          { required: true, message: '请输入策略名称', trigger: 'blur' },
        ],
        discount: [
          { required: true, message: '请输入策略方案', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    titleName() {
      return this.currentPolicy.policyId ? '修改策略' : '新增策略'
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    currentPolicy: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this.editEvent()
  },
  methods: {
    editEvent() {
      // 修改情况
      if (this.currentPolicy.policyId) {
        this.form.policyName = this.currentPolicy.policyName
        this.form.discount = this.currentPolicy.discount
      }
    },
    // 新增 修改 确认提交
    async clickFn() {
      // 先校验
      this.$refs.form.validate()
      if (this.currentPolicy.policyId) {
        // 修改
        await editPolicy(this.currentPolicy.policyId, this.form)
        this.$message.success('修改成功')
      } 
        // 新增
        await addPolicy(this.form)
        this.$message.success('添加成功')
        this.form.policyName = ''
        this.form.discount = ''
    
      this.$emit('update:dialogVisible', false)
      this.$parent.$options.parent.getPolicyList()
    },
  },
}
</script>
<style scoped lang="scss">
::v-deep .el-dialog__footer {
  text-align: center;
  margin-top: -30px;
  .el-button {
    width: 80px;
    height: 36px;
    margin: 0 20px;
    border: 0;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  position: relative;
  font-size: 36px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
