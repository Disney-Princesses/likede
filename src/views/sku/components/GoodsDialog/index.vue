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
      <el-form-item label="商品名称:" prop="skuName">
        <el-input
          v-model="form.skuName"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌:" prop="brandName">
        <el-input
          v-model="form.brandName"
          placeholder
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格(元):" prop="price">
        <el-input-number
          v-model="form.price"
          controls-position="right"
          placeholder="请输入"
          style="width: 100%"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品类型" prop="className">
        <el-select
          v-model="form.className"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            ref="select"
            :label="item.className"
            :value="item.className"
            v-for="item in goodsTypeList"
            :key="item.classId"
            @click.native="change(item)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格:" prop="unit">
        <el-input
          v-model="form.unit"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="商品图片：" prop="skuImage">
        <el-upload
          class="avatar-uploader"
          ref="imgBroadcastUpload"
          :auto-upload="false"
          multiple
          :show-file-list="false"
          list-type="picture-card"
          :on-change="imgBroadcastChange"
          accept="image/jpg,image/png"
          action="#"
        >
          <img v-if="form.skuImage" :src="form.skuImage" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div class="el-upload__tip" slot="tip">
            支持扩展名：jpg、png文件，文件不得大于100kb
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="clickFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  addNewGood,
  editGoodApi,
  uploadImg,
  getGoodsTypeApi,
} from '@/api/goods'
export default {
  data() {
    return {
      form: {
        skuName: '',
        skuImage: '',
        price: '',
        classId: '',
        unit: '',
        brandName: '',
        className: '',
      },
      goodsTypeList: [],
      inputRules: {
        skuName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        brandName: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        className: [
          { required: true, message: '请输入商品类型', trigger: 'blur' },
        ],
        unit: [{ required: true, message: '请输入规格', trigger: 'blur' }],
        skuImage: [{ required: true, message: '请上传图片', trigger: 'blur' }],
      },
    }
  },
  computed: {
    titleName() {
      return this.currentGood.skuId ? '修改商品' : '新增商品'
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    currentGood: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    this.getGoodsType()
    this.toEdit()
  },

  methods: {
    // 获取数据类型
    async getGoodsType() {
      const res = await getGoodsTypeApi()
      this.goodsTypeList = res.data.currentPageRecords
    },
    // 图片选择后 保存在 diaLogForm.imgBroadcastList 对象中
    async imgBroadcastChange(file) {
      console.log(file)
      const isLt100kb = file.size / 1024 / 1024 < 100 / 1024 // 上传头像图片大小不能超过 100kb
      if (!isLt100kb) {
        this.$message.error(
          '图片选择失败，每张图片大小不能超过 100kbB,请重新选择!',
        )
      } else {
        const obj = new FormData()
        obj.append('fileName', file.raw)
        const { data } = await uploadImg(obj)
        this.form.skuImage = data
      }
      console.log(this.form.skuImage)
    },
    // 获取选中值classId
    change(val) {
      this.form.classId = val.classId
    },
    // 点击修改以后,弹窗刚打开,数据就渲染上去
    toEdit() {
      if (this.currentGood.skuId) {
        // 赋值
        this.form.skuName = this.currentGood.skuName
        this.form.skuImage = this.currentGood.skuImage
        this.form.price = this.currentGood.price
        this.form.classId = this.currentGood.skuClass.classId
        this.form.unit = this.currentGood.unit
        this.form.brandName = this.currentGood.brandName
        this.form.className = this.currentGood.skuClass.className
      }
    },
    // 新建商品数据 提交 编辑
    async clickFn() {
      this.$refs.form.validate()
      if (this.currentGood.skuId) {
        // 编辑
        await editGoodApi(this.currentGood.skuId, this.form)
        this.$message.success('修改成功')
      } else {
        // 添加
        // 发送请求
        await addNewGood(this.form)
        this.$message.success('添加成功')
        this.$refs.form.resetFields()
      }
      this.$emit('update:dialogVisible', false)
      this.$parent.$options.parent.getGoodsList()
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
