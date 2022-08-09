<template>
  <el-dialog
    title="智能排货"
    :visible="childvisible"
    width="45%"
    @close="onClose"
  >
    <div>该区域属于{{ businessType }}商圈适合销售一下商品：</div>
    <el-row type="flex" class="goodsModule">
      <el-col v-for="item in firstPageList" :key="item.channelId" :span="4">
        <div class="grid-content bg-purple">
          <div class="pic">
            <img :src="item && item.image" alt="" />
          </div>
          <div class="title">
            <div>
              {{ (item && item.skuName) || '暂无商品' }}
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <newDataBtn type="primary" @click="onClose" :pic="false">
        采纳建议
      </newDataBtn>
    </span>
  </el-dialog>
</template>

<script>
import newDataBtn from '../btn/newDataBtn.vue'
import { getbusinessList, getbusiness } from '@/api'
export default {
  props: {
    childvisible: {
      type: Boolean,
      required: true,
    },
    dialogData: {
      type: Object,
    },
  },
  data() {
    return {
      form: {},
      nodeID: '',
      firstPageList: [],
      // 商圈
      businessType: '',
    }
  },

  created() {
    this.getbusiness()
    this.getbusinessList()
  },

  methods: {
    onClose() {
      this.$emit('update:childvisible', false)
    },
    async getbusiness() {
      this.nodeID = this.dialogData.node.businessType.id
      const { data } = await getbusiness(this.nodeID)
      this.businessType = data
    },
    async getbusinessList() {
      const { data } = await getbusinessList(this.nodeID)
      this.firstPageList = data
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
  height: 100%;

  .el-col {
    margin: 10px;
    height: 144px;
    background-color: #f3f6fb;
    box-shadow: 0 4px 4px 0 rgb(0 0 0 / 6%);
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
