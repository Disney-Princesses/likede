<template>
  <div class="app-container">
    <!-- 头部 -->
    <Head
      orderLabel="商品搜索"
      :formInline="formInline"
      @click="searchFn"
    ></Head>
    <!-- 新建按钮 -->
    <GoodsPageBtn ref="create" :currentGood="currentGood"></GoodsPageBtn>
    <!-- 表格 -->
    <GoodsListTable
      :GoodsListData="goodsList"
      @editType="editGood"
    ></GoodsListTable>
    <!-- 底部 -->
    <FootBtn
      :totalCount="totalCount"
      :pageIndex="pageIndex"
      :totalPage="totalPage"
      @loadPrePage="loadPrePage"
      @loadNextPage="loadNextPage"
      ref="foot"
    ></FootBtn>

    <GoodsDialog
      ref="dialog"
      v-if="visible"
      :dialogVisible.sync="visible"
      :currentGood="currentGood"
    ></GoodsDialog>
  </div>
</template>

<script>
import Head from '../components/Head'
import GoodsListTable from '../components/GoodsListTable'
import GoodsPageBtn from '../components/GoodsPageBtn'
import FootBtn from '../components/FootBtn'
import { getGoodsList } from '@/api/goods'
import GoodsDialog from '../components/GoodsDialog'
export default {
  data() {
    return {
      formInline: {
        searchName: '',
        region: '',
      },
      goodsList: [],
      totalCount: '',
      pageIndex: '1',
      totalPage: '',
      currentGood: {},
      visible: false,
    }
  },
  components: {
    Head,
    GoodsPageBtn,
    GoodsListTable,
    FootBtn,
    GoodsDialog,
  },
  created() {
    this.getGoodsList()
  },

  methods: {
    // 获取商品数据
    async getGoodsList() {
      console.log(typeof this.pageIndex)
      const { data } = await getGoodsList(this.pageIndex)
      this.goodsList = data.currentPageRecords
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
    },
    // 切换上一页
    loadPrePage() {
      console.log(this.pageIndex--)
      this.getGoodsList()
    },
    // 切换下一页
    loadNextPage() {
      console.log(this.pageIndex++)
      this.getGoodsList()
    },
    // 查询
    searchFn(val) {
      console.log(val.userCode)
      if (val.userCode.length === 0) {
        this.$refs.foot.isShow = true
        return this.getGoodsList()
      }
      this.goodsList = this.goodsList.filter(
        (item) => item.skuName === val.userCode,
      )
      this.$refs.foot.isShow = false
    },
    // 修改
    async editGood(val) {
      this.visible = true
      this.currentGood = val
    },
  },
}
</script>

<style scoped lang="less"></style>
