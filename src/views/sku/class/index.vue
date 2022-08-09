<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <Head
      orderLabel="商品类型搜索"
      :formInline="formInline"
      @click="searchFn"
    ></Head>
    <!-- 新建按钮 -->
    <CreateButton
      ref="create"
      :currentTypeName="currentTypeName"
    ></CreateButton>
    <!-- 表格 -->
    <TypeTable
      :WorkOrderDate="goodsType"
      @editType="editType"
      @del="delClassName"
    ></TypeTable>
    <!-- 底部 -->
    <FootBtn
      :totalCount="totalCount"
      :pageIndex.sync="pageIndex"
      :totalPage="totalPage"
      @loadPrePage="loadPrePage"
      @loadNextPage="loadNextPage"
      ref="footer"
    ></FootBtn>

    <MessageBox
      v-if="visible"
      :dialogVisible.sync="visible"
      :currentType="currentType"
    ></MessageBox>
  </div>
</template>

<script>
import Head from '../components/Head'
import TypeTable from '../components/TypeTable'
import CreateButton from '../components/CreateButton'
import FootBtn from '../components/FootBtn'
import MessageBox from '../components/MessageBox'
import { getGoodsTypeApi, delGoodsTypeApi } from '@/api/goods'
export default {
  data() {
    return {
      formInline: {
        searchName: '',
        region: '',
      },
      goodsType: [],
      totalCount: '',
      pageIndex: '1',
      totalPage: '',
      currentTypeName: '',
      visible: false,
    }
  },
  components: {
    Head,
    CreateButton,
    TypeTable,
    FootBtn,
    MessageBox,
  },
  created() {
    this.getGoodsType()
  },
  methods: {
    // 获取数据
    async getGoodsType() {
      const { data } = await getGoodsTypeApi(this.pageIndex)
      this.goodsType = data.currentPageRecords
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
    },
    // 切换上一页
    loadPrePage() {
      this.pageIndex--
      this.getGoodsType()
    },
    // 切换下一页
    async loadNextPage() {
      this.pageIndex++
      this.getGoodsType()
    },
    // 查询
    searchFn(val) {
      console.log(val.userCode)
      if (val.userCode.length === 0) {
        this.$refs.footer.isShow = true
        return this.getGoodsType()
      }
      this.goodsType = this.goodsType.filter(
        (item) => item.className === val.userCode,
      )
      // this.$refs.footer.style.display= none
      this.$refs.footer.isShow = false
    },
    // 修改
    async editType(val) {
      this.visible = true
      this.currentType = val
    },
    // 删除
    async delClassName(val) {
      try {
        await delGoodsTypeApi(val.classId)
        this.$message.success('删除成功')
        // 重新加载页面
        this.getGoodsType()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
