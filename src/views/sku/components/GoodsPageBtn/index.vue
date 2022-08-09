<template>
  <div class="appBtn">
    <el-button type="primary" class="newBtn" @click="visible = true">
      <i class="el-icon-circle-plus-outline"></i>
      新建</el-button
    >
    <el-button class="inBtn" @click="inData"> 导入数据</el-button>
    <!-- 商品管理模块弹窗 -->
    <GoodsDialog :dialogVisible.sync="visible"></GoodsDialog>

    <!-- 数据导入模块 -->
    <el-dialog title="数据导入" :visible.sync="visible2" width="45%">
      <el-upload
        class="upload-demo"
        action=""
        multiple
        :file-list="fileList"
        :show-file-list="true"
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :http-request="httprequest"
      >
        <el-form>
          <span style="fontsize: 14px">标题：</span>
          <el-button class="uploadbtn"
            ><i class="el-icon-upload"></i>上传文件</el-button
          >
        </el-form>
        <div slot="tip" class="el-upload__tip">
          支持扩展名：xls、xlsx,文件不得大于1M
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button style="background: #faf4f0" @click="visible2 = false"
          >取 消</el-button
        >
        <el-button style="background: #ed763f; color: #fff" @click="visible2 = false"
          >确 认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsDialog from '../GoodsDialog'
import { importGoodData } from '@/api/goods'
export default {
  props: {},
  data() {
    return {
      visible: false,
      visible2: false,
      fileList: [],
      fileName: '',
    }
  },
  components: {
    GoodsDialog,
  },
  created() {},

  methods: {
    async httprequest(file) {
      console.log(file)
      const is1M = file.file.size / 1024 / 1024 < 1 // 上传文件大小不能超过 1M
      if (!is1M) {
        this.$message.error('上传文件失败，文件大小不能超过1M,请重新选择!')
      }
      let mf = new FormData()
      mf.append('fileName', file.file)
      await importGoodData(mf)
    },
    inData() {
      this.visible2 = true
    }
  },
}
</script>

<style scoped lang="scss">
.appBtn {
  // margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  .el-button {
    padding: 0;
    width: 80px;
    height: 36px;
    border: 0;
  }
  .newBtn {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;

    &:hover {
      background: linear-gradient(135deg, #ff7d43, #db3602) !important;
    }
  }
  .inBtn {
    color: #333;
    background-color: #fbf4f0 !important;
    &:hover {
      background: #fbf4f0 !important;
    }
  }
}
.upload-demo {
  text-align: center;
  .uploadbtn {
    width: 221px;
    height: 36px;
    color: #fff;
    background-color: #6783f7;
  }
  .el-upload__tip {
    font-size: 14px;
    color: #bbc0cc;
    padding: 10px 0 20px 70px;
  }
  .dialog-footer {
    text-align: center;
  }
}
::v-deep .el-dialog__footer {
  text-align: center;
  // margin-top: -30px;
  .el-button {
    width: 80px;
    height: 36px;
    margin: 0 20px;
    border: 0;
  }
}
</style>
