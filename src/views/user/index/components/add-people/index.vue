<template>
  <el-dialog
    :title="titleChoose"
    :visible="dialogVisible"
    @close="onClose"
    width="40%"
    class="dialog"
  >
    <!-- 表单区域 -->
    <el-form
      ref="formPeople"
      :model="formPeople"
      label-width="100px"
      :rules="formRules"
    >
      <el-form-item label="人员名称：" prop="userName">
        <el-input
          v-model="formPeople.userName"
          placeholder="请输入"
          style="width: 90%"
          maxlength="5"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="角色：" prop="roleId">
        <el-select
          v-model="formPeople.roleId"
          placeholder="请选择"
          style="width: 90%"
        >
          <el-option
            :label="item.roleName"
            :value="item.roleId"
            v-for="item in rolesList"
            :key="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系电话：" prop="mobile">
        <el-input
          v-model="formPeople.mobile"
          placeholder="请输入"
          style="width: 90%"
          maxlength="11"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="负责区域：" prop="regionId">
        <el-select
          v-model="formPeople.regionId"
          placeholder="请选择"
          style="width: 90%"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in regionsList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="头像：">
        <el-upload
          class="avatar-uploader peopleImg"
          action="#"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :http-request="httpRequest"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="formPeople.image"
            :src="formPeople.image"
            class="avatar Img"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- </el-upload> -->
        <span class="tip">支持扩展名：jpg、png，文件不得大于100kb</span>
      </el-form-item>

      <el-form-item label="状态：">
        <el-checkbox
          label="是否启用"
          name="type"
          v-model="formPeople.status"
        ></el-checkbox>
      </el-form-item>
      <el-form-item class="btn" style="width: 80%">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 引入api
import {
  getRolesList,
  getRegionsList,
  addImg,
  addPeople,
  editPeople,
} from '@/api'
export default {
  data() {
    return {
      formPeople: {
        userName: '',
        roleId: '',
        mobile: '',
        regionId: '',
        regionName: '',
        status: false,
        image: '',
      },

      formRules: {
        userName: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        roleId: [{ required: true, message: '请输入内容', trigger: 'change' }],
        mobile: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '手机号格式不正确',
            trigger: 'blur',
          },
        ],
        regionId: [
          { required: true, message: '请输入内容', trigger: 'change' },
        ],
        //  图片验证
      },
      // 人员角色列表
      rolesList: [],
      // 地区列表
      regionsList: [],
    }
  },

  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    // 获取角色列表
    this.getRolesList()
    // 获取地区列表
    this.getRegionsList()
  },

  methods: {
    // 点击关闭
    onClose() {
      console.log('关闭')
      this.$emit('update:dialogVisible', false)
      // 关闭的时候，校验规则重置，组件自带
      this.$refs.formPeople.resetFields()
      // 关闭清空内容
      this.formPeople = {
        userName: '',
        roleId: '',
        mobile: '',
        regionId: '',
        regionName: '',
        status: false,
        image: '',
      }
    },
    // 关于图片
    // 限制格式、大小
    beforeAvatarUpload(file) {
      // console.log(file)
      try {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt100kb = file.size / 1024 < 100
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或者PNG 格式!')
        }
        if (!isLt100kb) {
          this.$message.error('上传头像图片大小不能超过 100KB!')
        }
        return isJPG && isLt100kb
      } catch (error) {
        console.log(error)
      }
    },
    handleAvatarSuccess(res, file) {
      this.formPeople.image = URL.createObjectURL(file.raw)
    },
    // 获取角色列表
    async getRolesList() {
      const res = await getRolesList()
      // console.log(res)
      this.rolesList = res.data
    },
    // 获取地区列表
    async getRegionsList() {
      const res = await getRegionsList()
      // console.log(res)
      this.regionsList = res.data.currentPageRecords
    },
    // 点击确认按钮
    async submit() {
      try {
        // 编辑
        if (this.formPeople.id) {
          await editPeople(this.formPeople.id, this.formPeople)
          this.$message.success('修改成功')
          this.onClose()
          this.$emit('add-success')
        } else {
          // 添加
          this.regionsList.forEach((item) => {
            if (item.id === this.formPeople.regionId) {
              this.formPeople.regionName = item.name
            }
          })
          // console.log(this.formPeople)
          await addPeople(this.formPeople)
          this.$message.success('添加成功')
          this.onClose()
          this.$emit('add-success')
        }
      } catch (error) {
        console.log(error)
        this.$message.error('添加失败')
      }
    },

    // 发送图片
    async httpRequest(data) {
      // console.log(data.file)
      const formData = new FormData()
      formData.append('fileName', data.file)
      console.log(formData)
      const res = await addImg(formData)
      // console.log(res)
      this.formPeople.image = res.data
    },
  },
  computed: {
    titleChoose() {
      return '新增人员'
    },
  },
}
</script>

<style scoped lang="less">
.dialog {
  .el-dialog {
    border-radius: 5px;
  }

  .el-form-item__content {
    .peopleImg {
      ::v-deep .el-upload {
        width: 84px;
        height: 84px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
      }
      .Img {
        width: 100%;
        height: 100%;
      }
      ::v-deep .el-upload-list__item {
        width: 84px;
        height: 84px;
      }
    }
    .tip {
      font-size: 14px;
      color: #bac0cd;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
