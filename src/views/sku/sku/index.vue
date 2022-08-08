<template>
  <div class="app-container">
    <!-- 头部 -->
    <headSearch  orderLabel="商品搜索" :formInline="formInline"></headSearch>
     <!-- 新建按钮 -->
    <CreateButton
      ref="create"
    ></CreateButton>
    <!-- 表格 -->
    <GoodsListTable
      :GoodsListData="goodsList"
    ></GoodsListTable>
    <!-- 底部 -->
    <FootBtn
      :totalCount="totalCount"
      :pageIndex="pageIndex"
      :totalPage="totalPage"
    ></FootBtn>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import GoodsListTable from '../components/GoodsListTable'
import CreateButton from '../components/CreateButton'
import FootBtn from '../components/FootBtn'
import {getGoodsList} from '@/api/goods'
export default {
  data() {
    return {
      formInline: {
        userCode: '',
        region: '',
      },
      goodsList:[],
      totalCount: '',
      pageIndex: '',
      totalPage: '',
    };
  },
components:{
  headSearch,
    CreateButton,
    GoodsListTable,
    FootBtn,
},
  created() {
    this.getGoodsList()
  },

  methods: {
    // 获取商品数据
    async getGoodsList() {
      const {data} = await getGoodsList()
      this.goodsList = data.currentPageRecords
      console.log(this.goodsList);
      this.totalCount = data.totalCount
      this.pageIndex = data.pageIndex
      this.totalPage = data.totalPage
    }
  },
};
</script>

<style scoped lang="less"></style>
