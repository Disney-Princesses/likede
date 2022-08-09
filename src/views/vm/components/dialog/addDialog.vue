<template>
  <el-dialog
    title="新增设备"
    @close="onClose"
    :visible="isShowDialog"
    width="35%"
  >
    <el-form :model="form" center :rules="onrules" ref="form">
      <el-form-item label="设备编号:" prop="name" class="paddingLabel">
        <div>系统自动生成</div>
      </el-form-item>
      <el-form-item label="选择型号:" width="500" prop="vmType">
        <el-select v-model="form.vmType" placeholder="请选择">
          <el-option
            :label="item.name"
            :value="item.typeId"
            v-for="item in ServiceList"
            :key="item.typeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择点位:" prop="nodeId">
        <el-select v-model="form.nodeId" placeholder="请选择">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in nodeList"
            :key="item.id"
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
import { addServiceData, getNodeList, getServiceListVmType } from '@/api'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        vmType: '',
        nodeId: '',
        createUserId: '',
      },
      onrules: {
        vmType: [
          { required: true, message: '请选择设备型号', trigger: 'blur' },
        ],
        nodeId: [{ required: true, message: '请选择点位', trigger: 'blur' }],
      },
      // 售货机类型
      ServiceList: [],
      //点位数据
      nodeList: [],
    }
  },

  created() {
    // 获取售货机类型
    this.getServiceListVmType()
    // 获取点位数据
    this.getNodeList()
  },

  methods: {
    // 关闭弹框
    onClose() {
      this.$emit('update:isShowDialog', false)
      this.$refs.form.clearValidate()
      this.$refs.form.resetFields()
    },
    // 点击新增
    async submit() {
      try {
        await this.$refs.form.validate()
        // 获取vuex中的用户id
        this.form.createUserId = this.$store.state.user.userInfo.userId
        // 新增售货机
        const res = await addServiceData(this.form)
        if (res.data) {
          // 提示信息
          this.$message.success('添加成功')
          // 获取售货机类型
          this.$emit('getServiceData')
          // 关闭弹框
          this.onClose()
        }
      } catch (error) {
        this.$message.error('操作失败')
      }
    },
    // 获取售货机类型
    async getServiceListVmType() {
      const { data } = await getServiceListVmType()
      this.ServiceList = data.currentPageRecords
    },
    // 获取点位数据
    async getNodeList() {
      const { data } = await getNodeList()
      this.nodeList = data.currentPageRecords
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
