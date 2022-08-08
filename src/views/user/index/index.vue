<template>
  <div class="app-container">
    <!-- 头部 -->
    <headSearch
      orderLabel="人员搜索"
      :formInline="formInline"
      @searchClick="searchClick"
    ></headSearch>

    <!-- 表单部分 -->
    <el-card class="form-card">
      <!-- 新建添加按钮 -->
      <newImportBtn
        :isImportBtn="false"
        @click.native="addPeople"
      ></newImportBtn>
      <!-- 表单 -->
      <tableModule
        :userDate="userDate"
        :userTitleList="userTitleList"
        :userKeyList="userKeyList"
        :pageIndex="data.pageIndex"
      >
        <template v-slot:custom="scoped">
          <el-button @click="editClick(scoped)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="delClick(scoped)"
            >删除</el-button
          >
        </template>
      </tableModule>
      <!-- 分页 -->
      <layPage
        :data="data"
        @prevClick="prevClick"
        @nextClick="nextClick"
        :preDisplay="preDisplay"
        :nextDisplay="nextDisplay"
      ></layPage>
    </el-card>

    <!-- 添加部门弹窗 -->
    <addPeople
      :dialogVisible.sync="isVisible"
      @add-success="getPeopleList"
      ref="addpeople"
    ></addPeople>
  </div>
</template>

<script>
// 引入组件
import headSearch from './components/headSearch'
import newImportBtn from './components/newImportBtn'
import tableModule from './components/tableModule'
import layPage from './components/layPage'
import addPeople from './components/add-people'
// 引入api
import { getPeopleList, delPeople } from '@/api'
export default {
  data() {
    return {
      data: {},
      // 表格渲染数据
      userDate: [],
      // 搜素框数据
      formInline: {
        userCode: '',
      },
      // 表单标头
      userTitleList: ['人员名称', '归属区域', '角色', '联系电话'],
      // 属性字段
      userKeyList: ['userName', 'regionName', 'role.roleName', 'mobile'],
      // 上一页禁用
      preDisplay: true,
      // 下一页禁用
      nextDisplay: false,
      // 新建弹框显示
      isVisible: false,
    }
  },

  created() {
    // 获取所有员工列表
    this.getPeopleList()
  },

  methods: {
    // 获取所有员工列表
    async getPeopleList(params) {
      try {
        const res = await getPeopleList(params)
        console.log(res)
        this.data = res.data
        this.userDate = res.data.currentPageRecords
      } catch (error) {}
    },
    // 上一页按钮
    async prevClick() {
      const page = parseInt(this.data.pageIndex) - 1
      await this.getPeopleList({ pageIndex: page })
      if (this.data.pageIndex == 1) {
        return (this.preDisplay = true)
      }
    },
    // 下一页按钮
    async nextClick() {
      this.preDisplay = false
      const page = parseInt(this.data.pageIndex) + 1
      await this.getPeopleList({ pageIndex: page })
      console.log(this.data.pageIndex)
      if (this.data.pageIndex === this.data.totalPage) {
        return (this.nextDisplay = true)
      }
    },
    // 搜索按钮
    searchClick(form) {
      // console.log(form)
      this.getPeopleList({ userName: form.userCode })
    },
    // 新建按钮
    addPeople() {
      this.isVisible = true
    },
    // 修改按钮
    editClick(val) {
      console.log(val)
      this.isVisible = true
      this.$refs.addpeople.formPeople = val.data
    },
    // 删除按钮
    async delClick(val) {
      try {
        await delPeople(val.data.id)
        this.$message.success('删除成功')
        this.getPeopleList()
      } catch (error) {
        this.$message.error(error.message)
      }
    },
  },

  components: {
    headSearch,
    newImportBtn,
    tableModule,
    layPage,
    addPeople,
  },
}
</script>

<style scoped lang="less"></style>
