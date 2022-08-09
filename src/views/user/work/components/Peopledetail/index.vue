<template>
  <el-dialog
    title="人员详情"
    :visible="DetailVisible"
    width="50%"
    @close="onClose"
  >
    <div class="userWorkInfo">
      <div class="userInfo">
        <el-row style="margin-bottom: 15px">
          <el-col :span="8">
            <span>人员名称：</span>
            <span>{{ workerData.userName }}</span>
          </el-col>
          <el-col :span="8">
            <span>角色：</span>
            <span>{{ workerData.roleName }}</span>
          </el-col>
          <el-col :span="8">
            <span>联系电话：</span>
            <span>{{ workerData.mobile }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span>负责区域：</span>
            <span>{{ workerData.regionName }}</span>
          </el-col>
        </el-row>
      </div>

      <div class="workTable">
        <el-row type="flex" class="th rowStyle">
          <el-col class="item"></el-col>
          <el-col class="item">总工单数</el-col>
          <el-col class="item">拒绝工单</el-col>
          <el-col class="item">完成工单</el-col>
          <el-col>进行中工单</el-col>
        </el-row>
        <el-row type="flex" class="rowStyle">
          <el-col class="item">本周</el-col>
          <el-col class="item">{{ week.total }}</el-col>
          <el-col class="item">{{ week.cancelCount }}</el-col>
          <el-col class="item">{{ week.workCount }}</el-col>
          <el-col>{{ week.progressTotal }}</el-col>
        </el-row>
        <el-row type="flex" class="rowStyle">
          <el-col class="item">本月</el-col>
          <el-col class="item">{{ month.total }}</el-col>
          <el-col class="item">{{ month.cancelCount }}</el-col>
          <el-col class="item">{{ month.workCount }}</el-col>
          <el-col>{{ month.progressTotal }}</el-col>
        </el-row>
        <el-row
          type="flex"
          class="rowStyle"
          style="border-bottom: 1px solid #d8dde3"
        >
          <el-col class="item">本年</el-col>
          <el-col class="item">{{ year.total }}</el-col>
          <el-col class="item">{{ year.cancelCount }}</el-col>
          <el-col class="item">{{ year.workCount }}</el-col>
          <el-col>{{ year.progressTotal }}</el-col>
        </el-row>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { PeopleDetailW, getUserInfo, PeopleDetailM, PeopleDetailY } from '@/api'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      workerData: {},
      week: {
        workCount: '',
        progressTotal: '',
        cancelCount: '',
        total: '',
      },
      month: {
        workCount: '',
        progressTotal: '',
        cancelCount: '',
        total: '',
      },
      year: {
        workCount: '',
        progressTotal: '',
        cancelCount: '',
        total: '',
      },
    }
  },
  props: {
    DetailVisible: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Object,
      // required: true,
    },
  },
  created() {
    console.log(dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss'))
  },
  methods: {
    // 点击关闭
    onClose() {
      this.$emit('update:DetailVisible', false)
      this.week = {}
      this.month = {}
      this.year = {}
    },
    // 获取员工详细信息
    async getPeopleWorkDetail(id) {
      const res = await getUserInfo(id)
      this.workerData = res.data
    //   console.log(dayjs().startOf('week').format('YYYY-MM-DD HH:mm:ss'))
      try {
        const resW = await PeopleDetailW(id)
        this.week = resW.data
        const resM = await PeopleDetailM(id)
        this.month = resM.data
        const resY = await PeopleDetailY(id)
        this.year = resY.data
        // console.log(week, month, year)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.userWorkInfo {
  width: 579px;
  min-height: 277px;
  margin: 0px auto;

  .userInfo {
    height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
  }
}
.workTable {
  .rowStyle {
    height: 40px;
    border-top: 1px solid #d8dde3;
    border-left: 1px solid #d8dde3;
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    text-align: center;

    .item {
      line-height: 40px;
      border-right: 1px solid #d8dde3;
      text-align: center;
    }
  }
  .th {
    margin-top: 26px;
    background: #f7f8fd;
  }
}
</style>
