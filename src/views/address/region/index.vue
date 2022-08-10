<template>
  <div class="app-container">
    <el-card class="head-card">
      <MyInput title="区域搜索：" @enter="input"></MyInput>
      <MyButton class="search-btn" @click.native="search"
        ><span class="el-icon-search" style="margin-right: 5px"></span
        >查询</MyButton
      >
    </el-card>

    <el-card class="main-card">
      <MyButton bgcolor="#ff7830" class="new-btn" @click.native="addArea"
        ><span
          class="el-icon-circle-plus-outline"
          style="margin-right: 5px"
        ></span
        >新建</MyButton
      >
      <MyTable
        :tableList="areaList"
        :headList="headNameArr"
        :propertyList="propArr"
        :loading="loading"
        operateWidth="200"
        :pageIndex="pageIndex"
      >
        <template v-slot:manipulate="scoped">
          <MySpan color="#5f84ff" @click.native="detail(scoped)"
            >查看详情</MySpan
          >
          <MySpan color="#5f84ff" class="edit-btn" @click.native="edit(scoped)"
            >修改</MySpan
          >
          <MySpan color="#fe5a7e" @click.native="delArea(scoped)">删除</MySpan>
        </template>
      </MyTable>
      <MyPagination
        v-if="totalPage !== '1'"
        :totalCount="totalCount"
        :totalPage="totalPage"
        :pageIndex="pageIndex"
        :btnLoading="btnLoading"
        @next="nextPage"
        @prev="prevPage"
      ></MyPagination>
    </el-card>
    <MyAddDialog
      ref="add_edit"
      @getRefresh="changePage"
      :dialogVisible.sync="dialogVisible"
    ></MyAddDialog>
    <DetailTable
      ref="detaiDialog"
      :areaDetailVisible.sync="areaDetailVisible"
    ></DetailTable>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import MyTable from '@/components/MyTable'
import MySpan from '../components/MySpan'
import MyPagination from '@/components/MyPagination'
import MyAddDialog from './components/MyAddDialog'
import DetailTable from './components/DetailTable'
import { delAreaApi, getAreaListApi, pointSearch } from '@/api/point'
export default {
  data() {
    return {
      areaList: [],
      headNameArr: ['区域名称', '点位数', '备注说明'],
      propArr: ['name', 'nodeCount', 'remark'],
      loading: false, // 表格加载状态
      pageIndex: '', //当前页
      totalCount: '', //总记录数量
      totalPage: '', //总页数
      btnLoading: false, // 按钮加载状态
      searchVal: '', //搜索值
      dialogVisible: false, //弹出框的显示控制
      areaDetailVisible: false, //区域详情的显示控制
    }
  },
  components: {
    MyInput,
    MyButton,
    MyTable,
    MySpan,
    MyPagination,
    MyAddDialog,
    DetailTable,
  },
  created() {
    // 获取区域列表数据
    this.getAreaList()
  },

  methods: {
    // 获取区域列表
    async getAreaList() {
      this.loading = true
      try {
        const { data } = await getAreaListApi()
        // console.log(data)
        this.areaList = data.currentPageRecords
        this.pageIndex = data.pageIndex
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
      } catch (error) {
        this.$message.error('获取数据失败')
      } finally {
        this.loading = false
      }
    },
    // 获取搜索框中的输入数据
    input(val) {
      this.searchVal = val
    },
    // 查看详情
    async detail(val) {
      this.$refs.detaiDialog.loading = true
      this.areaDetailVisible = true
      // console.log(val.data)
      this.$refs.detaiDialog.areaName = val.data.name
      const { data } = await pointSearch({ regionId: val.data.id })
      // console.log(data);
      this.$refs.detaiDialog.areaNodeList = data.currentPageRecords
      this.$refs.detaiDialog.loading = false
    },
    // 修改
    edit(val) {
      this.dialogVisible = true
      this.$refs.add_edit.detail = val.data
    },
    // 删除区域
    delArea(val) {
      this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          console.log(val.data.id)
          await delAreaApi(val.data.id)
          this.changePage()
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
    // 下一页
    nextPage() {
      this.pageIndex++
      this.changePage()
    },
    // 上一页
    prevPage() {
      this.pageIndex--
      this.changePage()
    },
    // 翻页方法
    async changePage() {
      this.loading = true
      this.btnLoading = true
      try {
        const { data } = await getAreaListApi({
          pageIndex: this.pageIndex,
          name: this.searchVal,
        })
        // console.log(data)
        this.areaList = data.currentPageRecords
        this.pageIndex = data.pageIndex
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
      } catch (error) {
        this.$message.error('获取数据失败')
      } finally {
        this.loading = false
        this.btnLoading = false
      }
    },
    // 查询
    async search() {
      const { data } = await getAreaListApi({
        name: this.searchVal,
      })
      console.log(data)
      this.areaList = data.currentPageRecords
      this.pageIndex = data.pageIndex
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
    },
    // 新增区域弹出层
    addArea() {
      this.dialogVisible = true
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
}

.main-card {
  .new-btn {
    margin-bottom: 20px;
  }
  .edit-btn {
    margin: 0 10px;
  }
}
</style>
