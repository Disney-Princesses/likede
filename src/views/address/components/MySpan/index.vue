<template>
  <span :style="style">
    <slot></slot>
  </span>
</template>

<script>
export default {
  data () {
    return {
        style: {
            color: this.color,
            fontSize: this.fontSize
        }
    }
  },
  props: ['color','fontSize'],

  created () {

  },

  methods: {

  }
}
</script>

<style scoped>
span {
    cursor: pointer;
}
</style>
