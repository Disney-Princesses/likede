<template>
  <div class="app-container">
    <!-- 头部搜索 -->
    <headSearch orderLabel="商品类型搜索" :formInline="formInline"></headSearch>
    <!-- 新建按钮 -->
    <CreateButton
      @createNewType="createNewType"
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
      :pageIndex="pageIndex"
      :totalPage="totalPage"
    ></FootBtn>
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import TypeTable from '../components/TypeTable'
import CreateButton from '../components/CreateButton'
import FootBtn from '../components/FootBtn'
import {
  getGoodsTypeApi,
  createGoodsTypeApi,
  changeGoodsTypeApi,
  delGoodsTypeApi,
} from '@/api/goods'
export default {
  data() {
    return {
      formInline: {
        userCode: '',
        region: '',
      },
      goodsType: [],
      totalCount: '',
      pageIndex: '',
      totalPage: '',
      currentTypeName: '',
    }
  },
  components: {
    headSearch,
    CreateButton,
    TypeTable,
    FootBtn,
  },
  created() {
    this.getGoodsType()
  },

  methods: {
    // 获取数据
    async getGoodsType() {
      const { data } = await getGoodsTypeApi()
      this.goodsType = data.currentPageRecords
      this.totalCount = data.totalCount
      this.pageIndex = data.pageIndex
      this.totalPage = data.totalPage
      // console.log(data)
    },
    // 创建新类型
    async createNewType(val) {
      try {
        // 发送新增类型名称 请求
        await createGoodsTypeApi(val)
        this.$message.success('添加成功')
        // 重新加载页面
        this.getGoodsType()
        this.$refs.create.visible = false
      } catch (error) {
        this.$message.error('请重新输入')
      }
    },
    // 修改
    async editType(val) {
      this.$refs.create.visible = true
      this.currentTypeName = val.className
      await changeGoodsTypeApi(val.classId, val.className)
    },
    // 删除
    async delClassName(val) {
      try {
        await delGoodsTypeApi(val.classId)
      this.$message.success('删除成功')
       // 重新加载页面
        this.getGoodsType()
      }catch(error) {
        this.$message.error('删除失败')
      }
    },
  },
}
</script>

<style scoped lang="less"></style>
