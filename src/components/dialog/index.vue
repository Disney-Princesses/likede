<template>
  <el-dialog
    title="工单详情"
    @close="onClose"
    width="30%"
    :visible="dialogVisible"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:dialogVisible', false)
    },
  },
}
</script>

<style scoped lang="less"></style>
