<template>
  <div>
    <el-dialog title="新增工单" :visible="visible" @close="onClose">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="设备编号" prop="innerCode">
          <el-input
            v-model="ruleForm.innerCode"
            placeholder="请输入"
            @change="getInnerCode"
          ></el-input>
        </el-form-item>
        <el-form-item label="工单类型" prop="productType">
          <el-select v-model="ruleForm.productType" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="补货数量" v-if="!isRepair">
          <span
            href="#"
            style="color: #5f84ff; cursor: pointer"
            @click="replenishList"
            >补货清单</span
          >
        </el-form-item>
        <el-form-item label="运营人员" prop="user" v-if="!isRepair">
          <el-select v-model="ruleForm.user" placeholder="请选择">
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运维人员" prop="user" v-if="isRepair">
          <el-select v-model="ruleForm.user" placeholder="请选择">
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc" class="desciption">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            placeholder="请输入备注(不超过40字)"
            maxlength="40"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btn-part">
          <el-button @click="onClose()" class="concel-btn">取消</el-button>
          <el-button @click="onFirm" class="onfirm-btn">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 补货详情对话框 -->
    <ReplenishDialog
      :visible.sync="replenishVisible"
      :innerCode="ruleForm.innerCode"
      ref="replenishList"
      @getReplenishInfo="getReplenishInfo"
    ></ReplenishDialog>
  </div>
</template>

<script>
import ReplenishDialog from '../replenishList/replenishdialog.vue'
import {
  getOperatorUser,
  getTaskStatusList,
  addTaskListApi,
  getRepairUserList,
} from '@/api'
export default {
  data() {
    return {
      ruleForm: {
        innerCode: '',
        productType: '',
        expectCapacity: '',
        user: '',
        desc: '',
      },
      createTaskInfo: {},
      userList: [],
      typeList: [],
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
        user: [
          { required: true, message: '请选择运营人员', trigger: 'change' },
        ],
        desc: [{ required: true, message: '请填写备注信息', trigger: 'blur' }],
      },
      replenishVisible: false,
      reCreateInfo: {},
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    isRepair: {
      type: Boolean,
    },
    // reCreateInfo: {
    //   type: Object,
    // },
    // regetUserList: {
    //   type: Array,
    //   required: true,
    // }
  },
  created() {},
  components: {
    ReplenishDialog,
  },
  methods: {
    onClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit('update:visible', false)
    },
    // 获取所有工单类型
    async getTaskStatus() {
      const res = await getTaskStatusList()
      // 是否是运营工单
      if (!this.isRepair) {
        this.createTaskInfo.productType = 2
        this.typeList = res.data.filter((item) => {
          return item.type === 2
        })
      } else {
        this.typeList = res.data.filter((item) => {
          return item.type === 1
        })
      }
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
    // 数据回显
    reShowInfo(val) {
      this.reCreateInfo = val
      this.ruleForm.innerCode = this.reCreateInfo.innerCode
      this.ruleForm.productType = this.reCreateInfo.taskType.typeName
      this.ruleForm.user = this.reCreateInfo.userName
      this.ruleForm.assignorId = this.reCreateInfo.assignorId
      this.ruleForm.desc = this.reCreateInfo.desc
      this.createTaskInfo.details = this.reCreateInfo.details
    },
    // 点击补货清单
    replenishList() {
      this.$refs.ruleForm.validateField('innerCode', async (flag) => {
        if (flag === '') {
          this.replenishVisible = true
          this.$refs.replenishList.getreplenishList()
        }
      })
    },
    // 监听设备编号的输入，获取设备编号，通过设备编号获取运营人员列表
    async getInnerCode(val) {
      if (val.length !== 0) {
        let res = null
        if (this.isRepair) {
          res = await getRepairUserList(val)
        } else {
          res = await getOperatorUser(val)
        }
        this.userList = res.data
      }
    },
    getReplenishInfo(details) {
      this.createTaskInfo = { ...this.createTaskInfo, details }
    },
    //点击确定
    async onFirm() {
      try {
        await this.$refs.ruleForm.validate()
        if (isNaN(this.ruleForm.user)) {
          this.createTaskInfo.assignorId = this.ruleForm.assignorId
        } else {
          this.createTaskInfo.assignorId = this.ruleForm.user
        }
        if (this.isRepair) {
          let index = null
          if (isNaN(this.ruleForm.productType)) {
            // console.log(this.typeList)
            index = this.typeList.findIndex(
              (item) => item.typeName === this.ruleForm.productType,
            )
            // console.log(index)
            this.createTaskInfo.productType = this.typeList[index].typeId
          } else {
            this.createTaskInfo.productType = this.ruleForm.productType
          }
          this.createTaskInfo.detail = []
        }
        this.createTaskInfo.createType = 1
        this.createTaskInfo.desc = this.ruleForm.desc
        this.createTaskInfo.innerCode = this.ruleForm.innerCode
        this.createTaskInfo.userId = this.$store.state.user.userInfo.userId
        // 发送创建工单的请求
        await addTaskListApi(this.createTaskInfo)
      } catch (error) {
      } finally {
        this.$refs.ruleForm.resetFields()
        this.createTaskInfo = {}
        if (this.isRepair) {
          this.$emit('reGetRepairList')
        } else {
          this.$emit('reGetTaskList')
        }
        this.onClose()
        this.ruleForm = {
          innerCode: '',
          productType: '',
          expectCapacity: '',
          user: '',
          desc: '',
        }
      }
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
.el-textarea {
  position: relative;
  span {
    font-size: 12px;
    bottom: 5px;
    right: 10px;
  }
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
