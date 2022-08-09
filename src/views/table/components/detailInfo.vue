<template>
  <div>
    <el-form ref="form" :model="detailInfo" label-width="80px">
      <!-- 状态显示图片 -->
      <div class="taskStatus">
        <i class="el-icon-warning" v-if="detailInfo.taskStatus === '取消'"></i>
        <i class="el-icon-bank-card" v-if="detailInfo.status === '未支付'"></i>
        <i
          class="el-icon-success"
          v-if="
            detailInfo.taskStatus === '完成' || detailInfo.status === '出货成功'
          "
        ></i>
        <i class="el-icon-question" v-if="detailInfo.taskStatus === '待办'"></i>
        <span>{{ detailInfo.taskStatus || detailInfo.status }}</span>
        <img
          v-if="detailInfo.taskStatus === '取消'"
          src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png"
          alt=""
        />
        <img
          v-if="detailInfo.status === '未支付'"
          src="http://likede2-admin.itheima.net/img/pic_0.979e683d.png"
          alt=""
        />
        <img
          v-if="
            detailInfo.taskStatus === '完成' || detailInfo.status === '出货成功'
          "
          src="http://likede2-admin.itheima.net/img/pic_4.3b5af41c.png"
          alt=""
        />
        <img
          v-if="detailInfo.taskStatus === '待办'"
          src="http://likede2-admin.itheima.net/img/pic_1.834b274c.png"
          alt=""
        />
      </div>
      <el-row>
        <el-col :span="12" v-if="detailInfo.orderNo" class="OrderNo">
          <div class="grid-content">
            <el-form-item label="订单编号:">
              {{ detailInfo.orderNo }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="商品名称:">
              {{ detailInfo.skuName }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="订单金额:">
              {{ detailInfo.amount }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="设备编号:">
              {{ detailInfo.innerCode }}
            </el-form-item>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="创建日期:">
              {{ detailInfo.createTime }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="detailInfo.taskStatus !== '待办'">
          <div class="grid-content">
            <el-form-item label="完成日期:">
              {{ detailInfo.updateTime }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="支付方式:">
              {{ detailInfo.payType === 1 ? '支付宝支付' : '微信支付' }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="!detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="运营人员:" v-if="!isRepair">
              {{ detailInfo.userName }}
            </el-form-item>
            <el-form-item label="运维人员:" v-if="isRepair">
              {{ detailInfo.userName }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="!detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="工单类型:">
              {{ detailInfo.taskType && detailInfo.taskType['typeName'] }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="!isRepair && !detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="补货数量:">
              <span
                href=""
                style="color: #4368e1; cursor: pointer"
                @click="addGoodsDetail(detailInfo.taskId)"
                >补货详情</span
              >
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="!detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="工单方式:">
              {{ detailInfo.createType }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12" v-if="detailInfo.orderNo">
          <div class="grid-content">
            <el-form-item label="设备地址:">
              {{ detailInfo.addr }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item
              label="取消原因:"
              v-if="detailInfo.taskStatus === '取消'"
            >
              {{ detailInfo.desc }}
            </el-form-item>
            <el-form-item
              label="备注:"
              v-if="
                detailInfo.taskStatus === '完成' ||
                detailInfo.taskStatus === '待办'
              "
            >
              {{ detailInfo.desc }}
            </el-form-item>
          </div>
        </el-col>
        <el-col
          :span="12"
          v-if="isRepair && detailInfo.taskStatus === '完成'"
          class="address"
        >
          <div class="grid-content">
            <el-form-item label="定位:">
              <span> {{ detailInfo.addr }}</span>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- 补货详情对话框 -->
    <addGoodsDialog :visible.sync="visible" ref="taskDetail"></addGoodsDialog>
  </div>
</template>

<script>
import addGoodsDialog from './taskDetail.vue'
export default {
  data() {
    return {
      visible: false,
    }
  },
  props: {
    detailInfo: {
      type: Object,
      required: true,
    },
    isRepair: {
      type: Boolean,
    },
  },
  components: {
    addGoodsDialog,
  },
  computed: {},
  created() {},

  methods: {
    addGoodsDetail(id) {
      this.visible = true
      this.$refs.taskDetail.getAddGoodsDetail(id)
    },
  },
}
</script>

<style scoped lang="less">
.el-col-12 {
  height: 36px;
  ::v-deep .el-form-item__label {
    width: 108px !important;
    color: #606266;
    font-weight: normal;
  }
}
.taskStatus {
  display: flex;
  align-items: center;
  height: 54px;
  margin-bottom: 25px;
  background-color: #f8f8f8;
  i {
    margin-left: 22px;
    font-size: 26px;
  }
  .el-icon-warning {
    color: #393939;
  }
  .el-icon-success {
    color: #79e192;
  }
  .el-icon-question {
    color: #ff665f;
  }

  span {
    flex: 1;
    margin-left: 16px;
  }
  img {
    margin-right: 76px;
    margin-bottom: 7px;
  }
}
.address {
  ::v-deep .el-form-item__content {
    line-height: 20px;
    margin-left: 108px !important;
    margin-top: 10px;
  }
}
.OrderNo {
  ::v-deep .el-form-item__content {
    width: 105%;
  }
}
</style>
