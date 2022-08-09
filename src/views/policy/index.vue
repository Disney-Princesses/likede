<template>
  <div class="app-container">
    <!-- 头 -->
    <HeadSearch
      orderLabel="策略搜索"
      :formInline="formInline"
      @click="searchFn"
    ></HeadSearch>
    <!-- 新建按钮 -->
    <Button></Button>
    <!-- 表格 -->
    <MainTable
      :GoodsListData="policyList"
      @detail="detailFn"
      @edit="editFn"
      @del="delFn"
    ></MainTable>
    <!-- 底部 -->
    <Foot
      :totalCount="totalCount"
      :pageIndex.sync="pageIndex"
      :totalPage="totalPage"
      @loadPrePage="loadPrePage"
      @loadNextPage="loadNextPage"
      ref="footTab"
    ></Foot>

    <Dialog
      v-if="visible"
      :currentPolicy="toEdit"
      :dialogVisible.sync="visible"
    ></Dialog>

    <DetailPage
      v-if="visible2"
      :currentData="detailPolicy"
      :dialogVisible.sync="visible2"
    >
    </DetailPage>
  </div>
</template>

<script>
import HeadSearch from '@/views/policy/components/HeadSearch'
import MainTable from '@/views/policy/components/MainTable'
import Button from '@/views/policy/components/Button'
import Foot from '@/views/policy/components/Foot'
import Dialog from '@/views/policy/components/Dialog'
import DetailPage from '@/views/policy/components/DetailPage'
import { getPolicyDataApi, delPolicy } from '@/api/policy'
export default {
  data() {
    return {
      formInline: {
        searchName: '',
        region: '',
      },
      pageIndex: '1',
      pageSize: '10',
      policyName: '',
      totalCount: '',
      totalPage: '',
      policyList: [],
      toEdit: {},
      visible: false,
      visible2: false,
      detailPolicy:{}
    }
  },
  components: {
    HeadSearch,
    MainTable,
    Button,
    Foot,
    Dialog,
    DetailPage,
  },

  created() {
    this.getPolicyList()
  },

  methods: {
    // 获取策略数据
    async getPolicyList() {
      const { data } = await getPolicyDataApi(this.pageIndex, this.pageSize)
      this.policyList = data.currentPageRecords
      this.totalPage = data.totalPage
      this.totalCount = data.totalCount
    },
    // 查询
    async searchFn(val) {
      if (val.userCode.length === 0) {
        this.$refs.footTab.isShow = true
        return this.getPolicyList()
      }
      this.policyList = this.policyList.filter(
        (item) => item.policyName === val.userCode,
      )
      this.$refs.footTab.isShow = false
    },
    // 查看详情
    detailFn(val) {
      this.visible2 = true
      this.detailPolicy=val
    },
    // 修改
    editFn(val) {
      this.toEdit = val
      this.visible = true
    },
    // 删除
    async delFn(val) {
      await delPolicy(
        val.policyId,
        this.pageIndex,
        this.pageSize,
        val.policyName,
      )
      this.$message.success('删除成功')
      // 删除后重新渲染
      this.getPolicyList()
    },
    // 切换上一页
    loadPrePage() {
      this.pageIndex--
      this.getPolicyList()
    },
    // 切换下一页
    async loadNextPage() {
      this.pageIndex++
      this.getPolicyList()
    },
  },
}
</script>

<style scoped lang="less"></style>
