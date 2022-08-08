<template>
  <el-dialog
    :title="detail.id ? '修改区域' : '新增区域'"
    :visible="dialogVisible"
    width="35%"
    :close-on-click-modal="false"
    @close="closeDialog"
    @closed="closed"
    @open="openDialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
      <el-form-item label="区域名称:" prop="name">
        <el-input
          maxlength="15"
          show-word-limit
          v-model="form.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注说明:" prop="desc">
        <el-input
          maxlength="40"
          show-word-limit
          type="textarea"
          rows="4"
          v-model="form.desc"
          placeholder="请输入备注（不超过40字）"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="cancel-btn" @click="closeDialog">取 消</el-button>
      <el-button type="primary" class="qd-btn" @click="confirm"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addAreaApi, editAreaApi } from '@/api/point'
export default {
  data() {
    return {
      form: {
        name: '',
        desc: '',
      },
      formRules: {
        name: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
      detail: {},
    }
  },
  created() {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    },
    // 关闭动画结束时触发
    closed() {
      // 重置表单
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        desc: '',
      }
      this.detail = {}
    },
    // 点击确定
    async confirm() {
      // 提交前表单校验
      try {
        await this.$refs.form.validate()
        // 非空判断
        if (this.form.name.trim() === '' || this.form.desc.trim() === '') {
          this.form = {
            name: '',
            desc: '',
          }
          return this.$message.error('请输入内容')
        }
        if (this.detail.id) {
          //修改确定
          console.log('编辑');
          await editAreaApi(this.detail.id, this.form.name, this.form.desc)
          this.closeDialog()
          this.$emit('getRefresh')
        } else {
          // 新增确定
          await addAreaApi(this.form.name, this.form.desc)
          this.closeDialog()
          this.$emit('getRefresh')
        }
      } catch (error) {
      } finally {
      }
    },
    openDialog() {
      if (this.detail.id) {
        this.form.name = this.detail.name
        this.form.desc = this.detail.remark
      }
    },
  },
}
</script>

<style scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}

::v-deep .el-dialog__footer {
  display: flex;
  justify-content: center;
}

.cancel-btn {
  background-color: #fbf4f0;
  border-color: #fbf4f0;
  margin-right: 20px;
}

.qd-btn {
  background-color: #ff722c;
  border-color: #ff722c;
  margin-left: 20px;
}
</style>
