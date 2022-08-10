<template>
  <el-row class="el-row">
    <el-col :span="13">
      <div class="head">
        <div class="title">
          合作商点位数Top5
          <span class="el-icon-more"></span>
        </div>
        <div id="chart" style="width: 80%; height: 280px" ref="nextchart"></div>
      </div>
      <div class="data">
        <div class="item">
          <h4>{{ nodeCount }}</h4>
          <span>
            <i class="icon-dot" style="color: #ed3f35"></i>
            点位数
          </span>
        </div>
        <div class="item">
          <h4>{{ PartnerCount }}</h4>
          <span>
            <i class="icon-dot" style="color: #eacf19"></i>
            合作商数
          </span>
        </div>
      </div>
    </el-col>
    <el-col :span="11">
      <div class="head h-right">
        <div class="title">异常设备监控 <span class="el-icon-more"></span></div>
        <div class="abnormaldata" v-if="AbnormalTop">
          <img
            src="http://likede2-admin.itheima.net/img/empty.87c4f71b.png"
            alt=""
          />
          <div class="text">暂无数据</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  getAbnormalTop,
  getNodeCollect,
  getNodeCount,
  getPartnerCount,
} from '@/api'
export default {
  data() {
    return {
      ticketsList: {},
      nodeCount: '',
      PartnerCount: '',
      AbnormalTop: false,
    }
  },

  created() {
    this.getNodeCount()
    this.getPartnerCount()
    this.getAbnormalTop()
  },
  mounted() {
    this.nextchart()
  },
  methods: {
    async getNodeCount() {
      const res = await getNodeCount()
      this.nodeCount = res.data
    },

    async getPartnerCount() {
      const res = await getPartnerCount()
      this.PartnerCount = res.data
    },
    async getAbnormalTop() {
      const res = await getAbnormalTop()
      console.log(res)
      if (res.data.length <= 0) {
        this.AbnormalTop = true
      }
    },
    async nextchart() {
      const res = await getNodeCollect()
      let data = res.data
      //2.初始化
      this.chart = this.$Echarts.init(this.$refs.nextchart)
      //3.配置数据
      let option = {
        color: ['#92b7ff', '#a8ffcf', '#ffc298', '#d9ffff', '#d1e0fd'],
        tooltip: {
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: [30, 100],
            center: ['50%', '60%'],
            roseType: 'radius',
            data: data,
            label: {
              edgeDistance: 1,
            },
          },
        ],
      }
      // 4.传入数据
      this.chart.setOption(option)
    },
  },
}
</script>

<style scoped lang="less">
.el-row {
  display: flex;
  //   justify-content: space-evenly;
  //   background-color: #fff;
  height: 353px;
  margin-bottom: 50px;
  .el-col {
    position: relative;
    margin-top: 20px;
    padding: 20px;
    height: 100%;
    background-color: #fff;
    border-radius: 20px;
    &:nth-child(1) {
      margin-right: 20px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      color: #333;
      font-weight: bold;
      span {
        position: relative;
        padding: 10px;
        width: 16px;
        height: 16px;
        color: #5f84ff;
        text-align: center;
        line-height: 0px;
        cursor: pointer;
        border: 1px solid #5f84ff;
        border-radius: 50%;
        &::before {
          position: absolute;
          top: 10px;
          left: 2px;
        }
      }
    }
  }
}
/* 点位分布统计模块制作 */

.chart {
  display: flex;
  margin-top: 0.3rem;
  justify-content: space-between;
}
.pie {
  width: 3.9rem;
  height: 3rem;
  margin-left: -0.125rem;
}
.data {
  width: 180px;
  height: 248px;
  position: absolute;
  top: 90px;
  right: -16px;
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
  padding: 0.45rem 0.375rem;
  box-sizing: border-box;
  background: url('../../../assets/image/rect.png') no-repeat;
  background-size: 129px 243px;
  //   background-size: cover;
  .item {
    padding-left: 20px;
    h4 {
      margin-bottom: 20px;
      font-size: 24px;
      color: #072074;
    }
    span {
      display: block;
      font-size: 0.2rem;
      color: #000412;
    }
  }
}
.abnormaldata {
  margin: 70px auto;
  text-align: center;
}
</style>
