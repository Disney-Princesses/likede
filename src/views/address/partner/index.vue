<template>
  <div class="app-container">
    <el-card class="head-card">
      <MyInput title="合作商搜索：" @enter="input" class="search-inp"></MyInput>
      <MyButton class="search-btn" @click.native="search"
        ><span class="el-icon-search" style="margin-right: 5px"></span
        >查询</MyButton
      >
    </el-card>

    <el-card class="main-card">
      <MyButton
        bgcolor="#ff7830"
        class="new-btn"
        @click.native="dialogVisible = true"
        ><span
          class="el-icon-circle-plus-outline"
          style="margin-right: 5px"
        ></span
        >新建</MyButton
      >
      <MyTable
        operateWidth="300"
        :tableList="partnersList"
        :propertyList="propArr"
        :headList="headArr"
        :loading="loading"
        :pageIndex="pageIndex"
      >
        <template v-slot:manipulate="scoped">
          <MySpan color="#5f84ff" @click.native="reset(scoped)"
            >重置密码</MySpan
          >
          <MySpan
            color="#5f84ff"
            class="detail-btn"
            @click.native="detail(scoped)"
            >查看详情</MySpan
          >
          <MySpan color="#5f84ff" class="edit-btn" @click.native="edit(scoped)"
            >修改</MySpan
          >
          <MySpan color="#fe5a7e" @click.native="del(scoped)">删除</MySpan>
        </template>
      </MyTable>
      <MyPagination
        :totalCount="totalCount"
        :totalPage="totalPage"
        :pageIndex="pageIndex"
        @next="nextPage"
        @prev="prevPage"
      ></MyPagination>
    </el-card>
    <AddPartner
      ref="add"
      @getRefresh="partnerSearch"
      :dialogVisible.sync="dialogVisible"
    ></AddPartner>
    <detaiDialog
      ref="detaiDialog"
      :partnerDetailVisible.sync="partnerDetailVisible"
    ></detaiDialog>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import MyTable from '@/components/MyTable'
import MySpan from '../components/MySpan'
import MyPagination from '@/components/MyPagination'
import AddPartner from './components/add-partner.vue'
import detaiDialog from './components/detailDialog.vue'
import {
  delPartnerApi,
  partnerSearchApi,
  resetPartnerPwdApi,
} from '@/api/point'
export default {
  data() {
    return {
      searchKeyword: '',
      pageIndex: 1,
      partnersList: [],
      loading: false,
      headArr: [
        '合作商名称',
        '账号',
        '设备数量',
        '分成比例',
        '联系人',
        '联系电话',
      ],
      propArr: ['name', 'account', 'vmCount', 'ratio', 'contact', 'mobile'],
      dialogVisible: false,
      totalCount: '', //总记录数量
      totalPage: '', //总页数
      btnLoading: false, // 按钮加载状态
      partnerDetailVisible: false, // 详情弹框是否显示
    }
  },
  components: {
    MyInput,
    MyButton,
    MyTable,
    MySpan,
    MyPagination,
    detaiDialog,
    AddPartner,
  },
  created() {
    this.partnerSearch()
  },

  methods: {
    // 获取字组件输入框的值
    input(val) {
      this.searchKeyword = val
    },
    // 搜索功能
    async search() {
      this.partnerSearch()
    },
    // 获取合作商列表
    async partnerSearch() {
      try {
        this.loading = true
        this.btnLoading = true
        const { data } = await partnerSearchApi({
          pageIndex: this.pageIndex,
          pageSize: 10,
          name: this.searchKeyword,
        })
        // console.log(data)
        this.pageIndex = data.pageIndex
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        data.currentPageRecords.forEach((item) => {
          item.ratio += '%'
        })
        this.partnersList = data.currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
        this.btnLoading = false
      }
    },
    // 下一页
    nextPage() {
      this.pageIndex++
      this.partnerSearch()
    },
    // 上一页
    prevPage() {
      this.pageIndex--
      this.partnerSearch()
    },
    // 修改
    edit(val) {
      console.log(val)
      val.data.ratio = val.data.ratio.replace('%', '')
      // this.$refs.add.form = val.data
      this.$refs.add.form = JSON.parse(JSON.stringify(val.data))
      // this.$refs.add.form.name = val.data.name
      // this.$refs.add.form.id = val.data.id
      // this.$refs.add.form.contact = val.data.contact
      // this.$refs.add.form.mobile = val.data.mobile
      // this.$refs.add.form.ratio = val.data.ratio
      // this.$refs.add.form.account = val.data.account
      // this.$refs.add.form.password = val.data.password

      this.dialogVisible = true
      // this.$nextTick(()=> {
      //   this.$refs.add.form = val
      // })
    },
    // 删除
    del(val) {
      this.$confirm('此操作将永久删除该合作商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await delPartnerApi(val.data.id)
          this.partnerSearch()
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 重置密码
    reset(val) {
      this.$confirm('确定要重置合作商密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await resetPartnerPwdApi(val.data.id)
          this.partnerSearch()
          this.$message({
            type: 'success',
            message: '重置成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置',
          })
        })
    },
    detail(val) {
      this.partnerDetailVisible = true
      this.$refs.detaiDialog.name = val.data.name
      this.$refs.detaiDialog.contact = val.data.contact
      this.$refs.detaiDialog.mobile = val.data.mobile
      this.$refs.detaiDialog.ratio = val.data.ratio
    },
  },
}
</script>

<style scoped lang="less">
.app-container {
  padding: 20px;
}

.head-card {
  margin-bottom: 20px;
  ::v-deep .el-card__body {
    display: flex;
    align-items: center;
  }
  .search-btn {
    margin-left: 10px;
  }
  .search-inp {
    width: 335px;
  }
}

.main-card {
  .new-btn {
    margin-bottom: 20px;
  }
  .edit-btn {
    margin: 0 10px;
  }
  .detail-btn {
    margin-left: 10px;
  }
}
</style>
