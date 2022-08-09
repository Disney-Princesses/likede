<template>
  <el-dialog
    :title="formData.id ? '修改点位':'新增点位'"
    :visible="dialogVisible"
    width="35%"
    :close-on-click-modal="false"
    @close="closeDialog"
    @closed="closed"
    @open="openDialog"
  >
    <el-form ref="form" :model="formData" label-width="120px" :rules="formRules">
      <el-form-item label="点位名称：" prop="name">
        <el-input
          maxlength="15"
          show-word-limit
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="所在区域：" prop="regionId">
        <el-select
          v-model="formData.regionId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in areaSearchList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属商圈：" prop="businessId">
        <el-select
          v-model="formData.businessId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in businessAreaList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属合作商：" prop="ownerId">
        <el-select
          v-model="formData.ownerId"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in partnerList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：" prop="selections">
        <el-cascader
          size="large"
          :options="options"
          v-model="formData.selections"
          placeholder="请输入"
          clearable
          @change="handleChange"
        >
        </el-cascader>
        </el-form-item>
        <el-form-item prop="addr2">
        <el-input
          placeholder="请输入详细地址"
          type="textarea"
          maxlength="60"
          show-word-limit
          v-model="formData.addr2"
        ></el-input>
        </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="cancel-btn" @click="closeDialog">取 消</el-button>
      <el-button type="primary" class="qd-btn" @click="confirm"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { addNewPoint, businessArea, editPointApi, partnerSearchApi } from '@/api/point'
export default {
  data() {
    return {
      formData: {
        name: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        addr: '',
        addr2: '',
        selections: []
      },
      formRules: {
        name: [{required: true, message: '请输入', trigger: 'blur'}],
        regionId: [{required: true, message: '请输入', trigger: 'change'}],
        businessId: [{required: true, message: '请输入', trigger: 'change'}],
        ownerId: [{required: true, message: '请输入', trigger: 'change'}],
        addr2: [{required: true, message: '请输入', trigger: 'blur'}],
        selections: [{required: true, message: '请输入', trigger: 'change'}],
      },
      businessAreaList: [],
      partnerList: [],
      options: regionData,
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    areaSearchList: {
      type: Array,
      default: () => [],
    },
  },
  created() {},

  methods: {
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    },
    closed(){
        this.$refs.form.resetFields()
        this.formData= {
        name: '',
        regionId: '',
        businessId: '',
        ownerId: '',
        addr: '',
        addr2: '',
        selections: []
      }
    },
    async openDialog() {
      const { data } = await businessArea()
      this.businessAreaList = data
      const res = await partnerSearchApi({
        pageSize: 10000,
      })
      // console.log(res.data.currentPageRecords);
      this.partnerList = res.data.currentPageRecords
    },
    handleChange(value) {
      console.log(value)
      let arr = []
      value.forEach((item) => {
        arr.push(CodeToText[item])
      })
    //   console.log(arr.join('-'));
      this.formData.addr = arr.join('-')
    },
    async confirm(){
        if(this.formData.id){
            this.formData.addr += '-' + this.formData.addr2
            let ownerName = ''
            this.partnerList.forEach((item) => {
                if (item.id === this.formData.ownerId){
                    ownerName = item.name
                }
            })
            await editPointApi(this.formData.id, {
                ...this.formData,
                ...this.formData,
                areaCode: this.formData.selections[this.formData.selections.length - 1],
                createUserId: this.formData.createUserId,
                ownerName,
            })
            this.closeDialog()
            this.$emit('getRefresh')
        }else {
          try {
            await this.$refs.form.validate()
            this.formData.addr += '-' + this.formData.addr2
            let ownerName = ''
            this.partnerList.forEach((item) => {
                if (item.id === this.formData.ownerId){
                    ownerName = item.name
                }
            })
            // console.log(ownerName);

            await addNewPoint({
                ...this.formData,
                areaCode: this.formData.selections[this.formData.selections.length - 1],
                createUserId: 1,
                ownerName,
            })
            this.closeDialog()
            this.$emit('getRefresh')

        } catch (error) {
            console.log(error);
        }  
        }
        
    }
  },
}
</script>

<style scoped>
::v-deep .el-dialog {
  border-radius: 10px;
}

::v-deep .el-dialog__footer {
  display: flex;
  justify-content: center;
}

.cancel-btn {
  background-color: #fbf4f0;
  border-color: #fbf4f0;
  margin-right: 20px;
}

.qd-btn {
  background-color: #ff722c;
  border-color: #ff722c;
  margin-left: 20px;
}
</style>
