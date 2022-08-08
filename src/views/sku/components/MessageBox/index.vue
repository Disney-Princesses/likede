<template>
  <el-dialog
    :title="titleName"
    :visible="dialogVisible"
    width="50%"
    @close="$emit('update:dialogVisible', false)"
  >
    <el-form ref="form" :model="form" :rules="inputRule" label-width="120px">
      <el-form-item label="商品类型名称:" prop="className">
        <el-input v-model="form.className" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="clickFn">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    const titleName = async (rule, value, callback) => {
      if (this.currentTypeName === '') {
        //  添加
      } else {
        // 编辑
        this.form.className = this.currentTypeName
      }
    }
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
      return this.currentTypeName === '' ? '添加商品类型' : '编辑商品类型'
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    currentTypeName: {
      type: String,
      default: '',
    },
  },
  created() {
    console.log(this.currentTypeName)
  },
  methods: {
    clickFn() {
      this.$refs.form.validate()
      this.$emit('onsave', this.form.className)
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
