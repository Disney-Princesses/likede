<template>
  <div class="search">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- 搜索输入框 -->
      <el-form-item :label="orderLabel + ':'">
        <el-input
          v-model.trim="formInline.userCode"
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
      <!-- 下拉选项框，可选择是否显示 -->
      <el-form-item :label="stateLabel + ':'" v-if="dropDown">
        <el-select v-model="formInline.region" placeholder="请选择" clearable>
          <el-option
            :label="item"
            :value="item"
            v-for="(item, index) in dropDownList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <slot></slot>
      </el-form-item>
      <el-form-item>
        <!-- 搜索按钮 -->
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="$emit('searchClick', formInline)"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 显示隐藏el-select
    dropDown: {
      type: Boolean,
      default: false,
    },
    // 输入框的名字
    orderLabel: {
      type: String,
      // required: true,
    },
    // 下拉框的名字
    stateLabel: {
      type: String,
      // required: true,
    },
    // 下拉数据
    dropDownList: {
      type: Array,
      // required: true,
    },
    // 表单数据
    formInline: {
      type: Object,
      // required: true,
    },
  },
  data() {
    return {}
  },

  created() {},

  methods: {},
}
</script>

<style scoped lang="scss">
// 头部
::v-deep.search {
  margin-bottom: 20px;
  padding-left: 17px;
  height: 64px;
  line-height: 64px;
  background-color: #fff;
  .el-form-item {
    margin: 0 15px 0 0;
    .el-form-item__label {
      font-weight: 400;
    }
    .el-form-item__content {
      line-height: unset;
    }
    .el-input__inner {
      height: 36px;
    }
  }
  // 按钮
  .el-button--primary {
    padding: 0;
    height: 36px;
    width: 80px;
    background: #5f84ff;
  }
}
</style>
