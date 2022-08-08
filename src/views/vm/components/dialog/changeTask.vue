<template>
  <el-dialog
    title="修改设备"
    :visible="changeDialog"
    width="35%"
    @close="onClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="机器编号 :"
        ><span>{{ dialogData.innerCode }}</span></el-form-item
      >
      <el-form-item label="供货时间 :"
        ><span>{{ time }}</span></el-form-item
      >
      <el-form-item label="设备类型 :"
        ><span>{{
          dialogData.type && dialogData.type.name
        }}</span></el-form-item
      >
      <el-form-item label="设备容量 :"
        ><span>{{
          dialogData.type && dialogData.type.channelMaxCapacity
        }}</span></el-form-item
      >
      <el-form-item label="设备点位 :">
        <el-select
          v-model="nodeID"
          :placeholder="dialogData.node && dialogData.node.addr"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in currentPageRecords"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="合作商 :"
        ><span>{{ dialogData.ownerName }}</span></el-form-item
      >
      <el-form-item label="所属区域 :"
        ><span>{{
          dialogData.region && dialogData.region.remark
        }}</span></el-form-item
      >
      <el-form-item label="设备地址 :"
        ><span>{{
          dialogData.node && dialogData.node.addr
        }}</span></el-form-item
      >
    </el-form>
    <span slot="footer" class="dialog-footer">
      <operateBtn @click="onClose">取 消</operateBtn>
      <newDataBtn type="primary" @click="submit" :pic="false">
        确 定
      </newDataBtn>
    </span>
  </el-dialog>
</template>

<script>
import operateBtn from '../btn/operateBtn.vue'
import newDataBtn from '../btn/newDataBtn.vue'
import { getNodeList, ModifyVmNode } from '@/api'
export default {
  props: {
    changeDialog: {
      type: Boolean,
      required: true,
    },
    dialogData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {},
      nodeID: '',
      currentPageRecords: [],
    }
  },

  created() {
    this.getNodeList()
  },

  methods: {
    onClose() {
      console.log(132456)
      this.$emit('update:changeDialog', false)
      this.form.nodeID = ''
    },
    // 修改点位
    async submit() {
      // if (this.currentPageRecords.vmStatus)
      if (this.dialogData.vmStatus === '未投放') {
        try {
          await ModifyVmNode(this.dialogData.id, this.nodeID)
          this.$message.success('修改成功')
          this.onClose()
          this.$emit('updata')
        } catch (error) {}
      } else {
        this.$message.error('该设备正在运营')
      }
    },
    async getNodeList() {
      const { data } = await getNodeList()
      console.log(data)
      this.currentPageRecords = data.currentPageRecords
    },
  },
  components: {
    operateBtn,
    newDataBtn,
  },
  computed: {
    time() {
      return (
        this.dialogData?.lastSupplyTime
          ?.replace('-', '.')
          ?.replace('-', '.')
          ?.replace('T', ' ') || ''
      )
    },
  },
  mounted() {
    this.nodeID = this.dialogData.node.id?.toString()
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
</style>
