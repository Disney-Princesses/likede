<template>
  <div class="app-container">
    <!-- 头部 -->
    <el-row class="el-row">
      <el-col :span="12">
        <div class="head">
          <div class="title">日销售统计</div>
          <div class="body">
            <div class="child">
              <div class="text1">{{ dayTheNumber}}</div>
              <div class="text2">当日销售量（个）</div>
            </div>
            <div class="child">
              <div class="text1">{{ dayIncome }}</div>
              <div class="text2">当日销售额（元）</div>
            </div>
            <div class="child">
              <div class="text1">{{ daySeparate }}</div>
              <div class="text2">当日分成（元）</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="head h-right">
          <div class="title">月销售统计</div>
          <div class="body">
            <div class="child">
              <div class="text1 red">{{ monthTheNumber }}</div>
              <div class="text2 pink">当月销售量（个）</div>
            </div>
            <div class="child">
              <div class="text1 red">{{ monthIncome }}</div>
              <div class="text2 pink">当月销售额（万元）</div>
            </div>
            <div class="child">
              <div class="text1 red">{{ monthSeparate }}</div>
              <div class="text2 pink">当月分成（元）</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-card class="main-card">
      <div class="main-header">
        <span>合作商：</span>
        <el-select clearable v-model="partnersInp" placeholder="请选择">
          <el-option
            v-for="item in partnersList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            
          >
          </el-option>
        </el-select>
        <span class="date-span">日期：</span>
        <el-date-picker
          v-model="dateVal"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <MyButton class="search-btn" @click.native="search"
          ><span class="el-icon-search" style="margin-right: 5px"></span
          >查询</MyButton
        >
      </div>
      <div style="margin-bottom: 20px">
        <span
          >笔数统计：<span class="high-t">{{ theNumber }}</span
          >个</span
        >
        <span style="margin: 0 60px"
          >收入统计：<span class="high-t">{{ income }}</span
          >元</span
        >
        <span
          >分成统计：<span class="high-t">{{ separate }}</span
          >元</span
        >
      </div>
      <MyTable
        :tableList="tableList"
        :propertyList="propArr"
        :headList="headArr"
        :loading="loading"
      ></MyTable>
      <MyPagination
        v-if="totalPage !== '1'"
        :btnLoading="btnLoading"
        :totalCount="totalCount"
        :totalPage="totalPage"
        :pageIndex="pageIndex"
        @prev="prevClick"
        @next="nextClick"
      ></MyPagination>
    </el-card>
  </div>
</template>

<script>
import MyButton from '@/components/MyButton'
import MyTable from './components/MyTable.vue'
import MyPagination from '@/components/MyPagination'
import dayjs from 'dayjs'
import { partnerSearchApi } from '@/api/point'
import {
  partnerCollectApi,
  totalBillApi,
  orderAmountApi,
  orderCountApi,
} from '@/api/checking'
export default {
  data() {
    return {
      partnersList: [],
      partnersInp: '',
      dateVal: [],
      pageIndex: 1,
      tableList: [],
      totalCount: '', //总记录数量
      totalPage: '', //总页数
      btnLoading: false, // 按钮加载状态
      loading: false,
      headArr: [
        '订单日期',
        '合作商',
        '分成比例',
        '收入（元）',
        '笔数',
        '分成金额（元）',
      ],
      propArr: [
        'date',
        'ownerName',
        'ratio',
        'orderTotalMoney',
        'orderCount',
        'totalBill',
      ],
      separate: '', //分成统计
      income: '', //收入统计
      theNumber: '', // 笔数统计
      monthTheNumber: '', // 当月销售量
      monthIncome: '', //当月销售额
      monthSeparate: '', //当月分成
      dayTheNumber: '', // 当日销售量
      dayIncome: '', //当日销售额
      daySeparate: '', //当日分成
    }
  },
  components: {
    MyButton,
    MyTable,
    MyPagination,
  },
  created() {
    this.getPartnerList()
    this.defaultDate()
    this.partnerCollect()
    this.getMonthCount()
    this.getDayCount()
  },

  methods: {
    // 获取合作商列表
    async getPartnerList() {
      const { data } = await partnerSearchApi({
        pageSize: 10000,
      })
      // console.log(data);
      this.partnersList = data.currentPageRecords
    },
    // 查询
    search() {
      this.partnerCollect()
    },
    //设置默认日期
    defaultDate() {
      let end = dayjs().startOf('D').format('YYYY-MM-DD') //当天
      let beg = dayjs().startOf('M').format('YYYY-MM-DD') //当月第一天
      this.dateVal = [beg, end] //将值设置给插件绑定的数据
      // console.log(this.dateVal)
    },
    //获取一定日期范围之内的合作商分成汇总数据
    async partnerCollect() {
      this.loading = true
      this.btnLoading = true
      try {
        const { data } = await partnerCollectApi({
          partnerName: this.partnersInp,
          start: this.dateVal[0],
          end: this.dateVal[1],
          pageIndex: this.pageIndex,
          pageSize: 10,
        })
        // console.log(data)
        data.currentPageRecords.forEach((item) => {
          item.orderTotalMoney = '+' + (item.orderTotalMoney / 100).toFixed(2)
          item.ratio = item.ratio + '%'
          item.totalBill = '+' + (item.totalBill / 100).toFixed(2)
        })
        this.tableList = data.currentPageRecords
        this.pageIndex = data.pageIndex
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage

        let partnerId = ''
        this.partnersList.forEach((item) => {
          if (item.name === this.partnersInp) {
            partnerId = item.id
            return
          }
        })
        // 分成统计
        const res = await totalBillApi({
          partnerId,
          start: this.dateVal[0] + ' 00:00:00',
          end: this.dateVal[1] + ' 23:59:59',
        })
        // console.log(res);
        this.separate = (res.data / 100).toFixed(2)

        // 收入统计
        const res2 = await orderAmountApi({
          partnerId,
          start: this.dateVal[0] + ' 00:00:00',
          end: this.dateVal[1] + ' 23:59:59',
        })
        this.income = (res2.data / 100).toFixed(2)

        // 笔数统计
        const res3 = await orderCountApi({
          partnerId,
          start: this.dateVal[0] + ' 00:00:00',
          end: this.dateVal[1] + ' 23:59:59',
        })
        this.theNumber = res3.data
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
        this.btnLoading = false
      }
    },
    // 月销售统计
    async getMonthCount() {
      // 销售量
      const res = await orderCountApi({
        start: this.dateVal[0] + ' 00:00:00',
        end: this.dateVal[1] + ' 23:59:59',
      })
      this.monthTheNumber = res.data
      // 销售额
      const res2 = await orderAmountApi({
        start: this.dateVal[0] + ' 00:00:00',
        end: this.dateVal[1] + ' 23:59:59',
      })
      this.monthIncome = (res2.data / 100 / 10000).toFixed(2)
      // 分成
      const res3 = await totalBillApi({
        start: this.dateVal[0] + ' 00:00:00',
        end: this.dateVal[1] + ' 23:59:59',
      })
      this.monthSeparate = (res3.data / 100).toFixed(2)
    },
    // 日销售统计
    async getDayCount() {
      // 销售量
      const res = await orderCountApi({
        start: this.dateVal[1] + ' 00:00:00',
        end: this.dateVal[1] + ' 23:59:59',
      })
      this.dayTheNumber = res.data
      // 销售额
      const res2 = await orderAmountApi({
        start: this.dateVal[1] + ' 00:00:00',
        end: this.dateVal[1] + ' 23:59:59',
      })
      this.dayIncome = (res2.data / 100).toFixed(2)
      // 分成
      const res3 = await totalBillApi({
        start: this.dateVal[1] + ' 00:00:00',
        end: this.dateVal[1] + ' 23:59:59',
      })
      this.daySeparate = (res3.data / 100).toFixed(2)
    },
    // 上一页
    prevClick() {
      this.pageIndex--
      this.partnerCollect()
    },
    // 下一页
    nextClick() {
      this.pageIndex++
      this.partnerCollect()
    },
  },
}
</script>

<style scoped lang="less">
.app-container {
  padding: 20px;
}

.red {
  color: #ff5757 !important;
  text-shadow: 2px 4px 7px rgb(255 99 85 / 50%) !important;
}

.pink {
  color: #de9690 !important;
}

.el-row {
  box-sizing: border-box;
  margin-left: -10px;
  margin-right: -10px;
  line-height: 1.15;
  .head {
    margin: 10px;
    box-sizing: border-box;
    background-color: #e9f3ff;

    background-repeat: no-repeat, no-repeat;
    background-position: 0 0, calc(100% - 12px) 100%;
    display: flex;
    flex-direction: column;
    height: calc(25vh - 30px);
    min-height: 166px;
    padding: 20px;
    border-radius: 20px;
    margin-right: 20px;
    .title {
      font-size: 16px;
      font-weight: 600;
      color: #333;
    }
    .body {
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      .child {
        display: flex;
        align-items: left;
        justify-content: center;
        flex: 1;
        flex-direction: column;
        .text1 {
          text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
          color: #072074;
          height: 50px;
          font-size: 36px;
          font-weight: 600;
          line-height: 50px;
          text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
        }
        .text2 {
          color: #91a7dc;
          height: 17px;
          margin-top: 3px;
          font-size: 12px;
          font-weight: 400;
          color: #91a7dc;
          line-height: 17px;
        }
      }
    }
  }
  .h-right {
    background: #fbefe8 calc(100% - 12px) 100%;
  }
}

.main-card {
  margin-top: 10px;
}

.date-span {
  margin-left: 20px;
}

.main-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .search-btn {
    margin-left: 10px;
  }
}

.high-t {
  color: #ff5757;
  font-size: 20px;
}
</style>
