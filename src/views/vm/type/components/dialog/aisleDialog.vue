<template>
  <div>
    <el-dialog
      :title="text"
      :visible="isShowDialog"
      width="35%"
      @close="onClose"
    >
      <div style="height: 500px; width: 100%" class="cab">
        <!-- 标题 -->
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="型号名称 :" prop="name">
            <el-input
              type="text"
              placeholder="请输入"
              v-model="form.name"
              maxlength="10"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="型号编码 :" prop="model">
            <el-input
              type="text"
              placeholder="请输入 (限制数字、字母、中划线、下划线)"
              v-model="form.model"
              maxlength="15"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item label="货道行数 :" prop="vmRow">
            <el-input-number
              v-model="form.vmRow"
              controls-position="right"
              @change="handleChange"
              placeholder="请输入"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="货道列数 :" prop="vmCol">
            <el-input-number
              v-model="form.vmCol"
              controls-position="right"
              placeholder="请输入"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="货道容量 :" prop="channelMaxCapacity">
            <el-input-number
              v-model="form.channelMaxCapacity"
              controls-position="right"
              placeholder="请输入"
              @change="handleChange"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="设备图片 :" prop="image">
            <el-upload
              v-model="form.image"
              class="avatar-uploader"
              action="#"
              :http-request="imgupdata"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.image" :src="form.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <div style="text-align: center; color: #bac0cd">
            支持扩展名：jpg、png，文件不得大于100kb
          </div>
        </el-form>
        <!-- 销量 -->
      </div>
      <!-- 按钮部分 -->
      <div class="buttonPart">
        <!-- 批量操作 -->
        <operateBtn @click="onClose" />
        <!-- 新建按钮 -->
        <newDataBtn @click="newDataFn" :pic="false" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import operateBtn from '../btn/operateBtn.vue'
import newDataBtn from '../btn/newDataBtn.vue'
import { addVmTypeApi, imgUpdataApi, modifyVmTypeApi } from '@/api'
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
    dialogData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        name: this.dialogData.name,
        model: this.dialogData.model,
        vmRow: this.dialogData.vmRow,
        vmCol: this.dialogData.vmCol,
        image: this.dialogData.image,
        channelMaxCapacity: this.dialogData.channelMaxCapacity,
        typeId: this.dialogData.typeId,
      },
      rules: {
        name: [{ required: true, message: '请输入型号名称', trigger: 'blur' }],
        model: [{ required: true, message: '请输入型号编码', trigger: 'blur' }],
        vmRow: [{ required: true, message: '请输入货道行数', trigger: 'blur' }],
        vmCol: [{ required: true, message: '请输入货道列数', trigger: 'blur' }],
        image: [{ required: true, message: '请输入货道容量', trigger: 'blur' }],
        channelMaxCapacity: [
          { required: true, message: '请选择设备图片', trigger: 'blur' },
        ],
      },
      imgUrl: {
        image: '',
      },
    }
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:isShowDialog', false)
      this.$refs.form.resetFields()
      this.textIsShow = false
      this.$emit('emptyFn')
      console.log(!!this.dialogData.name)
    },
    handleChange() {},
    // 点击确定
    async newDataFn() {
      try {
        // 修改
        if (this.form.typeId) {
          await this.$refs.form.validate()
          await modifyVmTypeApi({ ...this.form, ...this.imgUrl })
          // 关闭弹框
          this.onClose()
          // 提示
          this.$message.success('修改成功')
          // 更新数据
          this.$emit('upData')
        } else {
          // 添加
          await this.$refs.form.validate()
          await addVmTypeApi({ ...this.form, ...this.imgUrl })
          // 关闭弹框
          this.onClose()
          // 提示
          this.$message.success('添加成功')
          // 更新数据
          this.$emit('upData')
        }
      } catch (error) {
        if (error?.response) {
          this.$message.error(error?.response?.data)
        }
      }
    },
    // 图片上传
    async imgupdata(file) {
      const formData = new FormData()
      formData.append('fileName', file.file)
      const res = await imgUpdataApi(formData)
      console.log(res)
      this.imgUrl.image = res.data
    },
    handleAvatarSuccess(res, file) {
      this.form.image = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      try {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 / 1024 < 100
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 100kb!')
        }
        return isJPG && isLt2M
      } catch (error) {
        console.log(123)
      }
    },
  },

  components: {
    operateBtn,
    newDataBtn,
  },
  computed: {
    text() {
      if (!!this.dialogData.name) {
        return '修改设备类型'
      } else {
        return '新增设备类型'
      }
    },
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
.el-input-number {
  width: 100%;
}
.buttonPart {
  display: flex;
  justify-content: space-evenly;
  .appBtn:nth-child(2) {
    margin-left: 10px;
  }
}
// 图片上传
::v-deep .avatar-uploader .el-upload {
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
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
