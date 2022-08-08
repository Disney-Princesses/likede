<template>
  <el-dialog
    title="点位详情"
    :visible="detailVisible"
    width="35%"
    :close-on-click-modal="false"
    @close="closeDialog"
    @open="openDialog"
  >
    <DetailTable
      :propertyList="propArr"
      :tableList="pointDetailList"
      :headList="headArr"
    ></DetailTable>
  </el-dialog>
</template>

<script>
import DetailTable from './DetailTable.vue'
import { pointDetailApi } from '@/api/point'
import dayjs from 'dayjs'
export default {
  data() {
    return {
      pointId: '',
      pointDetailList: [],
      headArr: ['机器编号', '设备状态', '最后一次供货时间'],
      propArr: ['innerCode', 'vmStatus', 'updateTime'],
    }
  },
  props: {
    detailVisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DetailTable,
  },
  created() {},

  methods: {
    closeDialog() {
      this.$emit('update:detailVisible', false)
    },
    async getPointDetail() {
      const { data } = await pointDetailApi(this.pointId)
      console.log(data)
      data.forEach((item) => {
        item.vmStatus = item.vmStatus ? '运营' : '未投放'
        item.updateTime = dayjs(item.updateTime).format('YYYY.MM.DD HH:mm:ss')
      })
      this.pointDetailList = data
    },
    openDialog() {
      this.getPointDetail()
    },
  },
}
</script>

<style scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}
</style>
