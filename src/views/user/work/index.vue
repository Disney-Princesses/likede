<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <headSearch
      :formInline="formInline"
      :dropDown="true"
      stateLabel="角色"
      orderLabel="人员搜索"
      :dropDownList="rolesList"
      @searchClick="searchClick"
      :pageIndex="data.pageIndex"
    ></headSearch>

    <!-- 表单部分 -->
    <el-card class="form-card">
      <tableModule
        :userTitleList="userTitleList"
        :userKeyList="userKeyList"
        :userDate="userDate"
        :pageIndex="data.pageIndex"
      >
        <template v-slot:custom="scoped">
          <el-button @click="detailClick(scoped)" type="text" size="small"
            >查看详情</el-button
          >
        </template>
      </tableModule>
    </el-card>

    <!-- 分页组件 -->
    <layPage
      :data="data"
      :nextDisplay="nextDisplay"
      :preDisplay="preDisplay"
      @prevClick="prevClick"
      @nextClick="nextClick"
    ></layPage>

    <!-- 弹窗组件 -->
    <Peopledetail
      :DetailVisible.sync="DetailVisible"
      ref="peopledetail"
    ></Peopledetail>
  </div>
</template>

<script>
// 引入组件
import headSearch from './components/headSearch'
import tableModule from './components/tableModule'
import layPage from './components/layPage'
import Peopledetail from './components/Peopledetail'
// 引入api
import { getRolesList, getWorkList } from '@/api'

export default {
  data() {
    return {
      // 下拉搜素框的 渲染数据
      rolesList: [],
      // 头部搜索框的值
      formInline: {
        userName: '',
        roleId: '',
      },
      // 标头数数组
      userTitleList: [
        '人员名称',
        '角色',
        '联系电话',
        '完成工单(本月)',
        '进行中工单',
        '拒绝工单(本月)',
      ],
      // 要渲染的属性字段
      userKeyList: [
        'userName',
        'roleName',
        'mobile',
        'workCount',
        'progressTotal',
        'cancelCount',
      ],
      // 渲染的数据
      userDate: [],
      // 分页数据
      data: {},
      nextDisplay: false,
      preDisplay: true,
      // 弹窗显隐
      DetailVisible: false,
    }
  },

  created() {
    // 获取角色列表
    this.getRolesList()
    // 获取人员工作量列表
    this.getWorkList()
  },

  methods: {
    // 头部搜索按钮
    async searchClick() {
      console.log(this.formInline)
      await this.getWorkList(this.formInline)
    },
    // 获取角色列表
    async getRolesList() {
      const res = await getRolesList()
      // console.log(res)
      this.rolesList = res.data
    },
    // 获取人员工作量列表
    async getWorkList(val) {
      const res = await getWorkList(val)
      console.log(res)
      this.data = res.data
      this.userDate = res.data.currentPageRecords
    },
    // 上一页按钮
    async prevClick() {
      this.nextDisplay = false
      const page = parseInt(this.data.pageIndex) - 1
      this.formInline.roleId
        ? await this.getWorkList({ ...this.formInline, pageIndex: page })
        : await this.getWorkList({ pageIndex: page })
      if (this.data.pageIndex == 1) {
        return (this.preDisplay = true)
      }
    },
    // 下一页按钮
    async nextClick() {
      try {
        this.preDisplay = false
        const page = parseInt(this.data.pageIndex) + 1
        this.formInline.roleId
          ? await this.getWorkList({ ...this.formInline, pageIndex: page })
          : await this.getWorkList({ pageIndex: page })
        if (this.data.pageIndex === this.data.totalPage) {
          return (this.nextDisplay = true)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 点击详情
    detailClick(scoped) {

      this.DetailVisible = true
      console.log(scoped.data.userId)
      this.$refs.peopledetail.workerData = JSON.parse(
        JSON.stringify(scoped.data),
      )
      this.$refs.peopledetail.getPeopleWorkDetail(scoped.data.userId)
    },
  },

  components: {
    headSearch,
    tableModule,
    layPage,
    Peopledetail,
  },
}
</script>

<style scoped lang="less"></style>
