<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="isShowDialog"
      width="40%"
      @close="onClose"
    >
      <div style="height: 300px; width: 100%" class="cab">
        <!-- 标题 -->
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              销售量: <span> {{ CountDataL }}个</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              销售额: <span> {{ marketData }}元</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              补货次数: <span> {{ Count }}次</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              维修次数: <span> {{ RepairCount }}次</span>
            </div></el-col
          >
        </el-row>
        <!-- 销量 -->
        <div>商品销量（月）</div>
        <el-row class="dataShow" v-loading="loading">
          <el-col :span="6" v-for="(item, index) in SkuCollect" :key="index">
            <div class="grid-content bg-purple product">
              <b> {{ item.skuName }}</b
              >: {{ item.count }}
            </div>
          </el-col>
          <el-col :span="24" v-if="textIsShow">
            <div class="grid-content bg-purple-light">当前设备未销售商品</div>
          </el-col>
          <!-- <el-col :span="6"
            ><div class="grid-content bg-purple-light">123</div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple">123</div></el-col
          >
          <el-col :span="6"
            ><div class="grid-content bg-purple-light">123</div></el-col
          > -->
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import newDataBtn from '../btn/newDataBtn.vue'
import {
  getOrderAmount,
  getOrderCount,
  getSupplyCount,
  getRepairCount,
  getSkuCollect,
} from '@/api'
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
      // 货道个数数据
      rowData: {},
      // 货道详情数据
      channelList: [],
      // 销售额数据
      marketData: '',
      // 订单数据
      CountDataL: '',
      // 补货次数
      Count: '',
      // 维修次数
      RepairCount: '',
      // 商品销量数据
      SkuCollect: [],
      textIsShow: false,
      loading: false,
    }
  },

  created() {
    this.getOrderAmount()
    this.getOrderCount()
    this.getSupplyCount()
    this.getRepairCount()
    this.getSkuCollect()
  },

  methods: {
    onClose() {
      this.$emit('update:isShowDialog', false)
      this.textIsShow = false
    },
    // 获取销售额数据
    async getOrderAmount() {
      const res = await getOrderAmount({
        start: this.startDate,
        end: this.endDate,
        innerCode: this.innerCode,
      })
      this.marketData = res.data
    },
    // 获取订单数量
    async getOrderCount() {
      const res = await getOrderCount({
        start: this.startDate,
        end: this.endDate,
        innerCode: this.innerCode,
      })
      this.CountDataL = res.data
    },
    // 获取补货次数
    async getSupplyCount() {
      const params = {
        vm: this.dialogData.vmType,
        nodeId: this.dialogData.nodeId,
        createUserId: this.$store.state.user.userInfo.userId,
      }
      const startDate = dayjs().startOf('M').format('YYYY-MM-DD')
      const endDate = dayjs().endOf('D').format('YYYY-MM-DD')
      const res = await getSupplyCount(
        this.innerCode,
        startDate,
        endDate,
        params,
      )
      this.Count = res.data
    },
    // 获取售货机维修次数
    async getRepairCount() {
      const params = {
        vm: this.dialogData.vmType,
        nodeId: this.dialogData.nodeId,
        createUserId: this.$store.state.user.userInfo.userId,
      }
      const startDate = dayjs().startOf('M').format('YYYY-MM-DD')
      const endDate = dayjs().endOf('D').format('YYYY-MM-DD')
      const res = await getRepairCount(
        this.innerCode,
        startDate,
        endDate,
        params,
      )
      this.RepairCount = res.data
    },
    // 获取售货机商品销量
    async getSkuCollect() {
      this.loading = true
      const params = {
        vm: this.dialogData.vmType,
        nodeId: this.dialogData.nodeId,
        createUserId: this.$store.state.user.userInfo.userId,
      }
      const startDate = dayjs().startOf('M').format('YYYY-MM-DD')
      const endDate = dayjs().endOf('D').format('YYYY-MM-DD')
      const res = await getSkuCollect(
        this.innerCode,
        startDate,
        endDate,
        params,
      )
      this.SkuCollect = res.data
      if (res.data.length === 0) {
        this.textIsShow = true
      }
      this.loading = false
    },
  },
  components: {
    newDataBtn,
  },
  computed: {
    innerCode() {
      const innerCode = this.dialogData.innerCode
      return innerCode
    },
    startDate() {
      const startDate = dayjs().startOf('M').format('YYYY-MM-DD HH:mm:ss')
      return startDate
    },
    endDate() {
      const endDate = dayjs().endOf('D').format('YYYY-MM-DD HH:mm:ss')
      return endDate
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
::v-deep .el-input__inner {
  width: 424px;
}
::v-deep .el-dialog__footer {
  // margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
::v-deep .dialog-footer {
  display: flex;
  .appBtn {
    margin-right: 30px;
  }
}
::v-deep .el-form-item__label {
  font-weight: 400;
}
::v-deep.paddingLabel {
  .el-form-item__label {
    padding-left: 9px;
  }
}
.el-scrollbar {
  height: 100%;
}
::v-deep.cab .is-horizontal {
  display: none;
}
.el-scrollbar__wrap {
  //   overflow-x: hidden;
  overflow: scroll;
  width: 110%;
  height: 120%;
}
.el-row {
  margin-bottom: 16px;
  height: 56px;
  line-height: 56px;
  background-color: #f3f6fb;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.product {
  display: flex;
  border-radius: 4px;
  min-height: 36px;
  span {
    color: #5f84ff;
  }
  b {
    margin-right: 10px;
    display: inline-block;
    width: 70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
  }
}
.row-bg {
  padding: 10px 0;
}
// .smartBtn{
//     background-color:
// }

// 走马灯
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
::v-deep .el-carousel__container {
  height: 204px;
  //   height: 384px;
}
::v-deep .is-active {
  height: unset;
}

::v-deep .el-carousel__indicators {
  display: none;
}
::v-deep .el-carousel__arrow {
  display: none;
}
.changeBtn {
  border: 0;
  height: 36px;
  width: 36px;
  cursor: pointer;
  transition: 0.3s;
  color: #000000;
  background-color: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 50px;
}
.pageChangeBtn {
  left: 0;
}
.nextChangeBtn {
  right: 50px;
}

.dataShow {
  margin-top: 10px;
  background-color: #fff;
  .el-col-6 {
    padding-left: 10px;
    background-color: #fff;
    border-radius: 0;
    border-collapse: collapse;
    line-height: 40px;
    border: 1px solid #d8dde3;
    margin-top: -1px;
    margin-left: -1px;
  }
  .el-col-24 {
    text-align: center;
  }
}
</style>
