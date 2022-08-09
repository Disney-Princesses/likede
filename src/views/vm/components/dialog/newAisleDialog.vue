<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="isnewAisleDialog"
      width="45%"
      @close="onClose"
    >
      <div style="height: 390px; width: 100%" class="cab">
        <!-- 标题 -->
        <head-search
          :formInline="formInline"
          :orderLabel="orderLabel"
          @searchClick="searchFn"
        ></head-search>
        <el-scrollbar
          v-loading="loading"
          wrap-class="list"
          wrap-style="overflow-x:hidden;"
          view-class="view-box"
          :native="false"
        >
          <el-row type="flex" class="goodsModule">
            <el-col
              :span="4"
              v-for="(item, index) in pageList.currentPageRecords"
              :key="index"
              @click.native="SelectionFn(item)"
            >
              <div class="grid-content bg-purple">
                <div class="tip" v-show="item.skuId === Selected.skuId">
                  <img src="../../../../assets/image/Selected.png" alt="" />
                </div>
                <div class="pic">
                  <img
                    :src="item && item.skuImage"
                    alt=""
                    v-imgError="imgDefault"
                  />
                </div>
                <div class="title">
                  <div>{{ item.skuName }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
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
  </div>
</template>

<script>
import headSearch from '@/components/headSearch'
import newDataBtn from '../btn/newDataBtn.vue'
import imgDefault from '@/assets/image/goods.png'
import nominateDialog from './nominateDialog.vue'
import { searchService } from '@/api'
export default {
  props: {
    isnewAisleDialog: {
      type: Boolean,
      required: true,
    },
    dialogData: {
      type: Object,
    },
  },
  data() {
    return {
      formInline: {
        userCode: '',
      },
      orderLabel: '商品名称',
      // 总数据
      pageList: {},
      loading: false,
      imgDefault,
      // 点击切换
      flag: false,
      disabled: false,
      pageIndex: 1,
      //   选中的数据
      Selected: '',
    }
  },

  created() {
    //   商品搜索
    this.searchService()
  },

  methods: {
    // 搜索
    searchFn() {
      // 获取数据
      this.pageIndex = 1
      this.searchService()
    },
    onClose() {
      this.$emit('update:isnewAisleDialog', false)
    },
    submit() {
      this.$emit('changeGoods', this.Selected)
      this.onClose()
    },

    // 上一页
    pageFn() {
      this.pageIndex--
      if (this.pageIndex <= 0) {
        return (this.pageIndex = 1)
      }
      this.searchService()
    },
    // 下一页
    nextFn() {
      this.pageIndex++
      if (this.pageIndex > this.pageList.totalPage) {
        return (this.pageIndex = this.pageList.totalPage)
      }
      this.searchService()
    },
    // 获取数据
    async searchService() {
      const res = await searchService(this.pageIndex, this.formInline.userCode)
      this.pageList = res.data
    },
    // 点击选中商品
    SelectionFn(data) {
      this.Selected = data
    },
  },
  components: {
    newDataBtn,
    nominateDialog,
    headSearch,
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
  height: 384px;
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
.banclickBtn {
  color: #ffdada !important;
  cursor: not-allowed !important;
}
// 商品部分
.goodsModule {
  height: unset;
  flex-wrap: wrap;
  background-color: #fff;

  .el-col {
    margin: 10px;
    height: 140px;
    background-color: #f3f6fb;
    cursor: pointer;
    box-shadow: 0 3px 4px 0 rgb(0 0 0 / 6%);
    .grid-content {
      position: relative;
      .tip {
        position: absolute;
        top: 0;
        left: 0;
      }
      .pic {
        margin: 0 auto;
        width: 84px;
        height: 78px;
        img {
          margin-top: 10px;
          margin-bottom: 10px;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .title {
        text-align: center;
        div {
          height: 50px;
          line-height: 50px;
          margin-top: 6px;
        }
      }
      .btn {
        background-color: #fff;
        display: flex;
        justify-content: space-evenly;
        button {
          border: 0;
          padding: 20px 1px;
          background: #fff;
          &:hover {
            cursor: pointer;
            color: unset;
            background-color: unset;
          }
        }
        button:nth-child(1) {
          color: #5f84ff;
        }
        button:nth-child(2) {
          color: #ff5a5a;
        }
      }
    }
  }
}
</style>
