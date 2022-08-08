<template>
  <el-dialog
    :title="form.id ? '修改合作商' : '新增合作商'"
    :visible="dialogVisible"
    width="35%"
    :close-on-click-modal="false"
    @close="closeDialog"
    @closed="closed"
    @open="openDialog"
  >
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="合作商名称:" prop="name">
        <el-input
          maxlength="10"
          show-word-limit
          v-model="form.name"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="contact">
        <el-input
          maxlength="10"
          show-word-limit
          v-model="form.contact"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话:" prop="mobile">
        <el-input
          maxlength="11"
          show-word-limit
          v-model="form.mobile"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="分成比例(%):" class="ratio-item" prop="ratio">
        <el-input v-model="form.ratio" placeholder="请输入" @blur="ratioBlur">
          <template slot="append">
            <div class="up-down">
              <div
                class="el-icon-caret-top"
                @click="form.ratio < 100 ? form.ratio++ : (form.ratio = 100)"
              ></div>
              <div
                class="el-icon-caret-bottom"
                @click="form.ratio > 0 ? form.ratio-- : (form.ratio = 0)"
              ></div>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <template v-if="!form.id">
        <el-form-item label="账号" prop="account">
          <el-input
            maxlength="18"
            show-word-limit
            v-model="form.account"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            maxlength="20"
            show-word-limit
            v-model="form.password"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
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
import { addPartnerApi, editPartnerApi } from '@/api/point'
export default {
  data() {
    return {
      form: {
        name: '',
        contact: '',
        mobile: '',
        ratio: '',
        account: '',
        password: '',
      },
      number: 0,
      formRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '请输入正确的手机号码',
            trigger: 'change',
          },
        ],
        ratio: [{ required: true, message: '请输入', trigger: 'blur' }],
        account: [{ required: true, message: '请输入', trigger: 'blur' }],
        password: [{ required: true, message: '请输入', trigger: 'blur' }],
      },
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
      this.form = {
        name: '',
        contact: '',
        mobile: '',
        ratio: '',
        account: '',
        password: '',
      }
      this.$refs.form.resetFields()
    },
    // 点击确定
    async confirm() {
      if (this.form.id) {
        const {data} = await editPartnerApi(this.form.id, {
            id: this.form.id,
            name: this.form.name,
            ratio: this.form.ratio,
            contact: this.form.contact,
            mobile: this.form.mobile
        })

        this.closeDialog()
        this.$emit('getRefresh')
      } else {
        // 提交前表单校验
        try {
          await this.$refs.form.validate()
          await addPartnerApi(this.form)
          this.closeDialog()
          this.$emit('getRefresh')
          this.$message.success('添加成功')
        } catch (error) {}
      }
    },
    // 打开时触发回显
    openDialog() {},
    // 当分成比例输入框失去焦点的触底判断
    ratioBlur() {
      if (this.form.ratio < 0) {
        this.form.ratio = 0
        this.number = this.form.ratio
      } else if (this.form.ratio > 100) {
        this.form.ratio = 100
        this.number = this.form.ratio
      } else if (isNaN(this.form.ratio)) {
        this.form.ratio = this.number
      } else {
        this.number = this.form.ratio
      }
    },
  },
}
</script>

<style scoped lang="scss">
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

.ratio-item {
  ::v-deep .el-input__inner {
    text-align: center;
  }
  ::v-deep .el-input-group__append {
    padding: 0;
  }
}

.up-down {
  height: 36px;
  width: 40px;
  display: flex;
  flex-direction: column;
  div {
    text-align: center;
    flex: 1;
    width: 100%;
    height: 18px;
    line-height: 18px;
    &:first-child {
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
