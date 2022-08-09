<template>
  <div class="charts-m" ref="chart"></div>
</template>

<script>
export default {
  data() {
    return {
      chart: null,
    }
  },
  props: {
    finshData: {
      type: Array,
      requrie: true,
    },
    cancelData: {
      type: Array,
      requrie: true,
    },
    days: {
      type: Array,
      requrie: true,
    },
  },

  created() {},
  mounted() {
    // 初始化
    this.init()
  },

  methods: {
    init() {
      const chart = this.$refs.chart
      if (chart) {
        //2.初始化
        const myChart = this.$Echarts.init(chart)
        const option = {
          color: ['blue', 'red'],
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: ['完成工单', '取消工单'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: this.days,
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '完成工单',
              type: 'bar',
              barWidth: '10%',
              data: this.finshData,
            },
            {
              name: '取消工单',
              type: 'bar',
              barWidth: '10%',
              data: this.cancelData,
            },
          ],
        }
        // 4.传入数据
        myChart.setOption(option)
        // 窗口自适应
        window.addEventListener('resize', function () {
          myChart.resize()
        })
      }
    },
  },
}
</script>

<style scoped>
.charts-m {
  width: 825px;
  height: 468px;
}
</style>
