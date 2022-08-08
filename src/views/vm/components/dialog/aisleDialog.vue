<template>
  <el-dialog
    title="货道设置"
    :visible="isAisleDialog"
    width="50%"
    @close="onClose"
  >
    <div style="height: 400px; width: 100%" class="cab">
      <!-- 标题 -->
      <el-row :gutter="20">
        <el-col :span="4"
          ><div class="grid-content bg-purple">货道行数:6</div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple">货道列数:10</div></el-col
        >
        <el-col :span="12"
          ><div class="grid-content bg-purple">货道容量（个）:10</div></el-col
        >
        <el-col :span="3"
          ><div class="grid-content bg-purple">
            <el-button type="primary">智能排货</el-button>
          </div></el-col
        >
      </el-row>
      <el-scrollbar
        wrap-class="list"
        wrap-style="overflow-x:hidden;"
        view-class="view-box"
        :native="false"
      >
        <el-carousel
          :interval="5000"
          arrow="always"
          :autoplay="false"
          ref="carousel"
        >
          <el-carousel-item>
            <el-row type="flex" class="goodsModule">
              <el-col><div class="grid-content bg-purple">52</div></el-col>
              <el-col><div class="grid-content bg-purple">52</div></el-col>
              <el-col><div class="grid-content bg-purple">52</div></el-col>
              <el-col><div class="grid-content bg-purple">52</div></el-col>
              <el-col><div class="grid-content bg-purple">52</div></el-col>
            </el-row>
          </el-carousel-item>
          <el-carousel-item></el-carousel-item>
        </el-carousel>
      </el-scrollbar>
      <el-button
        type="primary"
        class="changeBtn pageChangeBtn el-icon-arrow-left"
        @click="pageFn"
      ></el-button>
      <el-button
        type="primary"
        class="changeBtn nextChangeBtn el-icon-arrow-right"
        @click="nextFn"
      ></el-button>
    </div>
    <span slot="footer" class="dialog-footer">
      <newDataBtn type="primary" @click="submit" :pic="false">
        确 定
      </newDataBtn>
    </span>
  </el-dialog>
</template>

<script>
import newDataBtn from '../btn/newDataBtn.vue'
export default {
  props: {
    isAisleDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:isAisleDialog', false)
    },
    submit() {
      console.log(12345)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    filterNode() {},
    // 上一页
    pageFn() {
      console.log('上一页')
      this.$refs.carousel.prev()
    },
    // 下一页
    nextFn() {
      console.log('下一页')
      this.$refs.carousel.next()
    },
  },
  components: {
    newDataBtn,
  },
}
</script>

<style scoped lang="less">
::v-deep .el-dialog {
  border-radius: 20px;
}
::v-deep .el-dialog__body {
  padding: 20px 80px;
}
::v-deep .el-input__inner {
  width: 424px;
}
::v-deep .el-dialog__footer {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
::v-deep .dialog-footer {
  display: flex;
  .appBtn {
    margin-right: 30px;
  }
}
::v-deep .el-form-item__label {
  font-weight: 400;
}
::v-deep.paddingLabel {
  .el-form-item__label {
    padding-left: 9px;
  }
}
.el-scrollbar {
  height: 100%;
}
::v-deep.cab .is-horizontal {
  display: none;
}
.el-scrollbar__wrap {
  //   overflow-x: hidden;
  overflow: scroll;
  width: 110%;
  height: 120%;
}
.el-row {
  margin-bottom: 16px;
  height: 56px;
  line-height: 56px;
  background-color: #f3f6fb;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
// .smartBtn{
//     background-color:
// }

// 走马灯
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
::v-deep .el-carousel__container {
  height: 700px;
  //   height: 384px;
}
::v-deep .is-active {
  height: unset;
}

::v-deep .el-carousel__indicators {
  display: none;
}
::v-deep .el-carousel__arrow {
  display: none;
}
.changeBtn {
  border: 0;
  height: 36px;
  width: 36px;
  cursor: pointer;
  transition: 0.3s;
  color: #000000;
  background-color: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  font-size: 50px;
}
.pageChangeBtn {
  left: 0;
}
.nextChangeBtn {
  right: 50px;
}

// 商品部分
.goodsModule {
  background-color: #fff;
  .el-col {
    margin: 10px;
    height: 180px;
    background-color: #f3f6fb;
  }
}
</style>
