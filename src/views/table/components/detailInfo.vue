<template>
  <div>
    <el-form ref="form" :model="detailInfo" label-width="80px">
      <el-row>
        <el-col :span="12">
          <div class="grid-content">
            <span>设备编号:</span>
            {{ detailInfo.innerCode }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>创建日期:</span>
            {{ detailInfo.createTime }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>取消日期:</span>
            {{ detailInfo.updateTime }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>运营人员:</span>
            {{ detailInfo.userName }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>工单类型:</span>
            {{ detailInfo.taskType && detailInfo.taskType['typeName'] }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>补货数量:</span>
            <a href="#">补货详情</a>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>工单方式:</span>
            {{ detailInfo.createType }}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <span>取消原因:</span>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    detailInfo: {
      type: Object,
      required: true,
    },
  },
  created() {},

  methods: {},
}
</script>

<style scoped></style>
