<template>
  <el-dialog
    title="合作商详情"
    :visible="partnerDetailVisible"
    width="35%"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <div style="margin-bottom: 30px">
        <span>合作商名称：</span>
        <span style="margin-right: 100px">{{name}}</span>
        
        <span>联系人：</span>
        <span>{{contact}}</span>
    </div>
    <div>
        <span>联系电话：</span>
        <span style="margin-right: 100px">{{mobile}}</span>
        
        <span>分成比例：</span>
        <span>{{ratio}}</span>
    </div>
  </el-dialog>
</template>

<script>

export default {
  data() {
    return {
        name: '',
        contact:'',
        mobile:'',
        ratio:''
    }
  },
  props: ['partnerDetailVisible'],
  methods: {
    closeDialog(){
        this.$emit('update:partnerDetailVisible', false)
    }
  }
}
</script>

<style scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}
</style>
