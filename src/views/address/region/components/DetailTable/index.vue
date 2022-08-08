<template>
  <el-dialog
    title="区域详情"
    :visible="areaDetailVisible"
    width="35%"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <el-form ref="form"  label-width="100px">
      <el-form-item label="区域名称:">
        <span>{{areaName}}</span>
      </el-form-item>
      <el-form-item label="包含点位:">
        <MyTable :loading="loading" :tableList="areaNodeList" :headList="headNameArr" :propertyList='propArr'></MyTable>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import MyTable from './Table.vue'
export default {
  data() {
    return {
      areaName: '',
      areaNodeList: [],
      headNameArr: ['点位名称','设备数量'],
      propArr: ['name','vmCount'],
      loading: false,
    }
  },
  components: {
    MyTable
  },
  created() {},
  props: {
    areaDetailVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeDialog() {
      this.$emit('update:areaDetailVisible', false)
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

</style>
