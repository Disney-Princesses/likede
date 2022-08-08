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
      <MyButton bgcolor="#ff7830" class="new-btn"
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
      >
        <template v-slot:manipulate="scoped">
          <MySpan color="#5f84ff">重置密码</MySpan>
          <MySpan color="#5f84ff" class="detail-btn">查看详情</MySpan>
          <MySpan color="#5f84ff" class="edit-btn">修改</MySpan>
          <MySpan color="#fe5a7e">删除</MySpan>
        </template>
      </MyTable>
    </el-card>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import MyButton from '@/components/MyButton'
import MyTable from '@/components/MyTable'
import MySpan from '../components/MySpan'
import { partnerSearchApi } from '@/api/point'
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
    }
  },
  components: {
    MyInput,
    MyButton,
    MyTable,
    MySpan,
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
    search() {
      console.log('搜索')
    },
    // 获取合作商列表
    async partnerSearch() {
      try {
        this.loading = true
        const { data } = await partnerSearchApi({
          pageIndex: this.pageIndex,
          pageSize: 10,
        })
        console.log(data)
        data.currentPageRecords.forEach((item) => {
          item.ratio += '%'
        })
        this.partnersList = data.currentPageRecords
        this.loading = false
      } catch (error) {
        console.log(error)
      }
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
  .detail-btn{
    margin-left: 10px;
  }
}
</style>
