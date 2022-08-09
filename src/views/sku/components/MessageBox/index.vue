<template>
  <el-dialog
    :title="titleName"
    :visible="dialogVisible"
    width="50%"
    @close="$emit('update:dialogVisible', false)"
  >
    <el-form ref="form" :model="form" :rules="inputRule" label-width="120px">
      <el-form-item label="商品类型名称:" prop="className">
        <el-input v-model.trim="form.className" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="clickFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { changeGoodsTypeApi, createGoodsTypeApi } from '@/api/goods'
export default {
  data() {
    return {
      form: {
        className: '',
      },
      inputRule: {
        className: [
          { required: true, message: '请输入商品类型名称', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    titleName() {
      return this.currentType? '编辑商品类型' : '添加商品类型'
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    currentType: {
      type: String,
      default: '',
    },
  },
  created() {
    this.editFn()
  },
  methods: {
    // 点击编辑时
    editFn() {
      console.log(this.currentType)
      this.form.className = this.currentType.className
    },
    async clickFn() {
      if (this.form.className.length === 0) {
        return this.$message('请输入商品类型名称')
      }
      if (this.currentType) {
        // 编辑
        this.$refs.form.validate()
        this.currentType.className=this.form.className
        await changeGoodsTypeApi(
          this.currentType.classId,
          this.currentType.className,
        )
        this.$message.success('修改成功')
        this.$emit('update:dialogVisible', false)
        this.$parent.$options.parent.getGoodsType()
      } else {
        // 新增
        this.$refs.form.validate()
        await createGoodsTypeApi(this.form.className)
        this.$message.success('添加成功')
        this.$emit('update:dialogVisible', false)
        this.form.className = ''
        // 重新加载页面
        // console.log(this.$parent.$options.parent);
        this.$parent.$options.parent.getGoodsType()
      }
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
</style>
