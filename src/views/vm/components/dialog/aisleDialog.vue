<template>
  <div>
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
            ><div class="grid-content bg-purple">
              货道行数: {{ rowData.vmRow }}
            </div></el-col
          >
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              货道列数: {{ rowData.vmCol }}
            </div></el-col
          >
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              货道容量（个）: {{ rowData.channelMaxCapacity }}
            </div></el-col
          >
          <el-col :span="3"
            ><div class="grid-content bg-purple">
              <el-button type="primary" @click="childvisible = true"
                >智能排货</el-button
              >
            </div></el-col
          >
        </el-row>
        <el-scrollbar
          v-loading="loading"
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
                <el-col
                  v-for="item in firstPageList"
                  :key="item.channelId"
                  :span="4"
                >
                  <div class="grid-content bg-purple">
                    <div class="tips">{{ item.channelCode }}</div>
                    <div class="pic">
                      <img
                        :src="item.sku && item.sku.skuImage"
                        alt=""
                        v-imgError="imgDefault"
                      />
                    </div>
                    <div class="title">
                      <div>
                        {{ (item.sku && item.sku.brandName) || '暂无商品' }}
                      </div>
                    </div>
                    <div class="btn">
                      <a href="javascript:;">添加</a>
                      <a href="javascript:;">删除</a>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-carousel-item>
            <el-carousel-item>
              <el-row type="flex" class="goodsModule">
                <el-col
                  v-for="item in nextPageList"
                  :key="item.channelId"
                  :span="4"
                >
                  <div class="grid-content bg-purple">
                    <div class="tips">{{ item.channelCode }}</div>
                    <div class="pic">
                      <img
                        :src="item.sku && item.sku.skuImage"
                        alt=""
                        v-imgError="imgDefault"
                      />
                    </div>
                    <div class="title">
                      <div>
                        {{ (item.sku && item.sku.brandName) || '暂无商品' }}
                      </div>
                    </div>
                    <div class="btn">
                      <a href="javascript:;">添加</a>
                      <a href="javascript:;">删除</a>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-carousel-item>
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
    <!-- 弹框 -->
    <!-- 智能排货 -->
    <nominate-dialog
      :childvisible.sync="childvisible"
      :dialogData="dialogData"
    ></nominate-dialog>
  </div>
</template>

<script>
import { getChannelInfo, getVmTypeInfo } from '@/api'
import newDataBtn from '../btn/newDataBtn.vue'
import imgDefault from '@/assets/image/goods.png'
import nominateDialog from './nominateDialog.vue'
export default {
  props: {
    isAisleDialog: {
      type: Boolean,
      required: true,
    },
    dialogData: {
      type: Object,
    },
  },
  data() {
    return {
      // 货道个数数据
      rowData: {},
      // 货道详情数据
      channelList: [],
      // 展示第一页数据
      firstPageList: [],
      // 展示第二页数据
      nextPageList: [],
      loading: false,
      imgDefault,
      // 点击切换
      flag: false,
      // 控制智能排货弹框
      childvisible: false,
    }
  },

  created() {
    // 获取售货机类型详情
    this.getVmTypeInfo()
    // 获取售货机货道详情
    this.getChannelInfo()
  },

  methods: {
    onClose() {
      this.$emit('update:isAisleDialog', false)
    },
    submit() {
      console.log(12345)
    },
    filterNode() {},
    // 上一页
    pageFn() {
      if (this.flag) {
        this.$refs.carousel.next()
        this.flag = false
      }
    },
    // 下一页
    nextFn() {
      if (!this.flag) {
        this.$refs.carousel.prev()
        this.flag = true
      }
    },
    // 获取售货机类型详情
    async getVmTypeInfo() {
      const typeId = this.dialogData.type.typeId
      const { data } = await getVmTypeInfo(typeId)
      this.rowData = data
    },
    // 获取售货机货道详情
    async getChannelInfo() {
      this.loading = true
      const innerCode = this.dialogData.innerCode
      const { data } = await getChannelInfo(innerCode)
      console.log(data)
      let arr = []
      let newArr = []
      for (let i = 0; i < data.length / 5; i++) {
        if (i % 2 === 0) {
          arr.push(...data.slice(i * 5, (i + 1) * 5))
        } else {
          newArr.push(...data.slice(i * 5, (i + 1) * 5))
        }
      }
      this.firstPageList = arr
      this.nextPageList = newArr
      this.loading = false
    },
  },
  components: {
    newDataBtn,
    nominateDialog,
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

// 商品部分
.goodsModule {
  flex-wrap: wrap;
  background-color: #fff;
  height: 1250px;

  .el-col {
    margin: 10px;
    height: 180px;
    background-color: #f3f6fb;
    box-shadow: 0 12px 4px 0 rgb(0 0 0 / 6%);
    .grid-content {
      position: relative;
      .tips {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 43px;
        height: 23px;
        line-height: 23px;
        text-align: center;
        color: #fff;
        background-color: #829bed;
        border-radius: 0 10px 10px 0;
      }
      .pic {
        margin: 0 auto;
        width: 84px;
        height: 78px;
        img {
          margin-top: 20px;
          margin-bottom: 10px;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .title {
        div {
          text-align: center;
          height: 50px;
          margin-top: 6px;
        }
      }
      .btn {
        background-color: #fff;
        display: flex;
        justify-content: space-evenly;
        a:nth-child(1) {
          color: #5f84ff;
        }
        a:nth-child(2) {
          color: #ff5a5a;
        }
      }
    }
  }
}
</style>
