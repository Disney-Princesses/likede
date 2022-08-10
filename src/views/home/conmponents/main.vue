<template>
  <!-- 头部 -->
  <el-row class="el-row">
    <div class="title">
      <div>
        工单统计<span>{{ startDate }}~{{ endDate }}</span>
      </div>
      <div class="changeBtn">
        <div
          :class="{ change: flag === index }"
          @click="clickFn(index)"
          v-for="(item, index) in textList"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <el-row class="presentation" :span="24">
      <el-col :span="12">
        <div
          id="chart"
          style="width: 90%; height: 280px"
          ref="firstchart"
        ></div>
      </el-col>
      <el-col :span="12">
        <div id="chart" style="width: 90%; height: 280px" ref="nextchart"></div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getAmountCollect, getSalesCollect } from '@/api'
import dayjs from 'dayjs'
// import { isoWeek } from 'dayjs/plugin/isoWeek'
export default {
  data() {
    return {
      // 统计时间类型，1:按日统计，2:按月统计
      collectType: 1,
      chart: null,
      // 本周数据
      weekData: [],
      start: dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
      end: dayjs().endOf('D').format('YYYY-MM-DD'),
      textList: ['周', '月', '年'],
      flag: 0,
    }
  },
  created() {
    // this.getAmountCollect()
  },
  mounted() {
    // this.firstchart()
    this.weekchart()
    this.nextchart()
  },

  methods: {
    getAmountCollect() {},
    async firstchart() {
      let weekData
      try {
        // const startDate = dayjs()
        //   .startOf('week')
        //   .add(1, 'day')
        //   .format('YYYY-MM-DD')
        // const endDate = dayjs().endOf('D').format('YYYY-MM-DD')
        const res = await getAmountCollect(
          this.collectType,
          this.start,
          this.end,
        )
        weekData = res.data
      } catch (error) {}
      // this.weekData = res.data
      //2.初始化
      this.chart = this.$Echarts.init(this.$refs.firstchart)
      // let week = [
      //   '星期一',
      //   '星期二',
      //   '星期三',
      //   '星期四',
      //   '星期五',
      //   '星期六',
      //   '星期日',
      // ]
      // const index = weekData.xAxis.length
      // console.log(weekData)
      // week = week.splice(0, index)
      // console.log(week)
      console.log(weekData)
      //3.配置数据
      let option = {
        title: [
          {
            left: 'center',
            text: '销售额趋势图',
          },
        ],
        grid: {
          // 距离 上右下左 的距离
          left: '16%',
          // 是否包含文本
          // containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: weekData.xAxis,
          // 靠边显示
          boundaryGap: false,
          axisTick: {
            // 不显示刻度
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          name: '单位:元',
          nameTextStyle: {
            textBorderColor: 'pink',
          },
        },
        color: '#ff5757',
        series: [
          {
            data: weekData.series,
            type: 'line',
            // 折线修饰为圆滑
            smooth: true,
            areaStyle: {
              color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#fdd1d1',
                },
                {
                  offset: 1,
                  color: '#fffefe',
                },
              ]),
            },
          },
        ],
      }
      // 4.传入数据
      this.chart.setOption(option)
    },
    async nextchart() {
      const res = await getSalesCollect(this.start, this.end)
      console.log(res)
      let data = res.data
      //2.初始化
      this.chart = this.$Echarts.init(this.$refs.nextchart)
      //3.配置数据
      let option = {
        title: [
          {
            left: 'center',
            text: '销售额分布',
          },
        ],
        grid: {
          // 距离 上右下左 的距离
          left: '16%',
          // right: '4%',
          // 是否包含文本
          // containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
        },
        xAxis: {
          type: 'category',
          data: data.xAxis,
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          name: '单位:元',
        },
        color: '#91b0ff',
        series: [
          {
            data: data.series,
            type: 'bar',
            barWidth: '20',
          },
        ],
      }
      // 4.传入数据
      this.chart.setOption(option)
    },
    clickFn(index) {
      this.flag = index
      if (index === 0) {
        // 周
        this.collectType = 1
        this.start = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
        this.weekchart()
        this.nextchart()
      } else if (index === 1) {
        // 月份
        this.collectType = 1
        this.start = dayjs().startOf('month').format('YYYY-MM-DD')
        this.firstchart()
        this.nextchart()
      } else if (index === 2) {
        // 年
        this.collectType = 2
        this.start = dayjs().startOf('year').format('YYYY-MM-DD')
        this.firstchart()
        this.nextchart()
      }
    },
    // 星期
    async weekchart() {
      let weekData
      try {
        const res = await getAmountCollect(
          this.collectType,
          this.start,
          this.end,
        )
        weekData = res.data
      } catch (error) {}
      //2.初始化
      this.chart = this.$Echarts.init(this.$refs.firstchart)
      let week = [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日',
      ]
      const index = weekData.xAxis.length
      week = week.splice(0, index)
      //3.配置数据
      let option = {
        title: [
          {
            left: 'center',
            text: '销售额趋势图',
          },
        ],
        grid: {
          // 距离 上右下左 的距离
          left: '16%',
          // 是否包含文本
          // containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: week,
          // 靠边显示
          boundaryGap: false,
          axisTick: {
            // 不显示刻度
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          name: '单位:元',
          nameTextStyle: {
            textBorderColor: 'pink',
          },
        },
        color: '#ff5757',
        series: [
          {
            data: weekData.series,
            type: 'line',
            // 折线修饰为圆滑
            smooth: true,
            areaStyle: {
              color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#fdd1d1',
                },
                {
                  offset: 1,
                  color: '#fffefe',
                },
              ]),
            },
          },
        ],
      }
      // 4.传入数据
      this.chart.setOption(option)
    },
  },
  computed: {
    startDate() {
      return dayjs().startOf('M').format('YYYY.MM.DD')
    },
    endDate() {
      return dayjs().startOf('D').format('YYYY.MM.DD')
    },
  },
}
</script>

<style scoped lang="less">
.el-row {
  // padding: 20px;
  padding: 19px 0 0 19px;
  padding-bottom: 0;
  box-sizing: border-box;
  margin-top: 20px;
  margin-right: -10px;
  line-height: 1.15;
  // height: calc(66vw - 7px);
  min-height: 280px;
  background: #fff;
  width: calc(67vw - 12px);
  // min-width: 1200px;
  border-radius: 10px;
}
.title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  .changeBtn {
    display: flex;
    justify-content: space-evenly;
    width: 150px;
    background-color: #f7fbff;
    border-radius: 20px;
    overflow: hidden;
    padding: 5px;
    cursor: pointer;
    div {
      padding: 4px 10px;
      font-size: 14px;
      color: #9ca3b4;
      cursor: pointer;
      // &:nth-child(1) {
      //   background-color: #ffffff;
      //   box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
      //   border-radius: 7px;
      //   font-weight: 600;
      //   color: #333;
      // }
    }
  }
  span {
    margin-left: 10px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999;
  }
}
.change {
  font-weight: 700 !important;
  color: #333 !important;
  background-color: #ffffff;
  box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
  border-radius: 7px;
}
.presentation {
  padding: 0;
  height: 100%;
  width: 100%;
  // background: pink;
  // padding: 0 !important;
  .el-col {
    height: 100%;
  }
}
</style>
