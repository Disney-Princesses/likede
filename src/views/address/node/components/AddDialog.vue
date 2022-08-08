<template>
  <el-dialog
    title="新增点位"
    :visible="dialogVisible"
    width="35%"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <el-form ref="form" :model="formData" label-width="120px">
      <el-form-item label="点位名称：">
        <el-input
          maxlength="15"
          show-word-limit
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="所在区域：">
        <el-select v-model="formData.regionId" placeholder="请选择">
          <el-option v-for="item in areaSearchList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属商圈：">
        <el-select v-model="formData.businessId" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属合作商：">
        <el-select v-model="formData.ownerId" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：">
        <el-select v-model="formData.addr" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-input
        placeholder="请输入详细地址"
        style="margin-top: 20px"
          type="textarea"
          maxlength="60"
          show-word-limit
          v-model="formData.addr2"
        ></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
        formData: {
            name: '',
            regionId: '',
            businessId: '',
            ownerId: '',
            addr: '',
            addr2: ''
        }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    areaSearchList: {
        type: Array,
        default: () => ([])
    }
  },
  created() {},

  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    },
  },
}
</script>

<style scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}
</style>
