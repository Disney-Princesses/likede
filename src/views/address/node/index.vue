<template>
  <div class="app-container">
    <el-card class="head-card">
      <MyInput title="点位搜索" @enter="input" class="search-inp"></MyInput>
      <span>区域搜索：</span>
      <el-select clearable v-model="areaName" placeholder="请选择活动区域">
        <el-option
          v-for="(item, index) in areaSearchList"
          :key="index"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
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
        operateWidth="250"
        :tableList="pointList"
        :propertyList="propArr"
        :headList="headArr"
        :loading="loading"
        :pageIndex="pageIndex"
      >
        <template v-slot:manipulate="scoped">
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
    <detailDialog
      ref="pointDetail"
      :detailVisible.sync="detailVisible"
    ></detailDialog>
    <AddDialog
      ref="AddDialog"
      @getRefresh="pointSearch"
      :areaSearchList="areaSearchList"
      :dialogVisible.sync="dialogVisible"
    ></AddDialog>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import MyTable from '@/components/MyTable'
import MySpan from '../components/MySpan'
import MyPagination from '@/components/MyPagination'
import detailDialog from './components/detailDialog.vue'
import AddDialog from './components/AddDialog.vue'
import { delPointApi, getAreaListApi, pointSearchApi } from '@/api/point'
import { TextToCode } from 'element-china-area-data'

export default {
  data() {
    return {
      keywords: '', //搜索关键字
      areaName: '', //区域关键字(ID)
      areaSearchList: [], //下拉区域搜索列表
      dialogVisible: false,
      pointList: [], //点位列表
      totalCount: '', //总记录数量
      totalPage: '', //总页数
      pageIndex: '', //当前页码
      btnLoading: false, // 按钮加载状态
      propArr: [
        'name',
        'region.name',
        'businessType.name',
        'ownerName',
        'detailAddress',
      ],
      headArr: ['点位名称', '所在区域', '商圈类型', '合作商', '详细地址'],
      loading: false,
      detailVisible: false, //详情弹框
    }
  },
  components: {
    MyInput,
    MyButton,
    MyTable,
    MySpan,
    MyPagination,
    detailDialog,
    AddDialog,
  },
  created() {
    this.getAreaSearchInput()
    this.pointSearch()
  },

  methods: {
    // 获取搜索框的值
    input(val) {
      this.keywords = val
    },
    // 搜索按钮
    search() {
      this.pointSearch()
    },
    // 获取区域搜索框内的区域
    async getAreaSearchInput() {
      const { data } = await getAreaListApi({
        pageIndex: 1,
        pageSize: 10000,
      })
      // console.log(data)
      this.areaSearchList = data.currentPageRecords
      console.log(this.areaSearchList)
    },
    // 点位搜索
    async pointSearch() {
      try {
        this.loading = true
        this.btnLoading = true
        const { data } = await pointSearchApi({
          pageIndex: this.pageIndex,
          pageSize: 10,
          name: this.keywords,
          regionId: this.areaName,
        })
        console.log(data)
        this.pageIndex = data.pageIndex
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
        data.currentPageRecords.forEach((item) => {
          let arr = item.addr.split('-')
          let detailAddress = arr[arr.length - 1]
          item.detailAddress = detailAddress
        })
        this.pointList = data.currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
        this.btnLoading = false
      }
    },
    // 查看详情
    detail(val) {
      // console.log(val);
      this.detailVisible = true
      this.$refs.pointDetail.pointId = val.data.id
    },
    // 修改
    edit(val) {
      console.log(val.data)
      this.dialogVisible = true
      this.$refs.AddDialog.formData.id = val.data.id
      this.$refs.AddDialog.formData.name = val.data.name
      this.$refs.AddDialog.formData.regionId = val.data.regionId
      this.$refs.AddDialog.formData.businessId = val.data.businessId
      this.$refs.AddDialog.formData.ownerId = val.data.ownerId
      let arr = val.data.addr.split('-')
      this.$refs.AddDialog.formData.addr2 = arr[arr.length - 1]
      console.log(arr.length)
      let arr2 = []
      if (arr.length === 4) {
        arr2.push(
          TextToCode[arr[0]].code,
          TextToCode[arr[0]][arr[1]].code,
          TextToCode[arr[0]][arr[1]][arr[2]].code,
        )
      } else if (arr.length === 3) {
        arr2.push(TextToCode[arr[0]].code, TextToCode[arr[0]][arr[1]].code)
      }

      this.$refs.AddDialog.formData.selections = arr2
      this.$refs.AddDialog.formData.createUserId = val.data.createUserId
    },
    // 删除
    del(val) {
      this.$confirm('此操作将永久删除该点位, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await delPointApi(val.data.id)
          this.pointSearch()
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
      this.pointSearch()
    },
    // 上一页
    prevPage() {
      this.pageIndex--
      this.pointSearch()
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
    margin-right: 30px;
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
