<template>
  <div>
    <el-form ref="form" :model="detailInfo" label-width="80px">
      <!-- 状态显示图片 -->
      <div class="taskStatus">
        <i class="el-icon-warning" v-if="detailInfo.taskStatus === '取消'"></i>
        <i class="el-icon-success" v-if="detailInfo.taskStatus === '完成'"></i>
        <i class="el-icon-question" v-if="detailInfo.taskStatus === '待办'"></i>
        <span>{{ detailInfo.taskStatus }}</span>
        <img
          v-if="detailInfo.taskStatus === '取消'"
          src="http://likede2-admin.itheima.net/img/pic_3.e8208e34.png"
          alt=""
        />
        <img
          v-if="detailInfo.taskStatus === '完成'"
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
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="运营人员:">
              {{ detailInfo.userName }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="工单类型:">
              {{ detailInfo.taskType && detailInfo.taskType['typeName'] }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
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
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item label="工单方式:">
              {{ detailInfo.createType }}
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-form-item
              label="取消原因:"
              v-if="detailInfo.taskStatus === '取消'"
            >
            </el-form-item>
            <el-form-item label="备注:" v-if="detailInfo.taskStatus === '完成'">
              自动补货工单
            </el-form-item>
            <el-form-item label="备注:" v-if="detailInfo.taskStatus === '待办'">
              {{ detailInfo.desc }}
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
</style>
