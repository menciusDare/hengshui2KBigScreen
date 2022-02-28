<!--
 * @功能描述:
 * @版本:
 * @作者: zhangls
 * @Date: 2021-06-10 10:43:26
 * @最新修改内容:
 * @LastEditTime: 2021-06-10 10:47:01
-->
<template>
    <div class="empty-box" :style="{height:boxHeight+'px'}"></div>
</template>

<script>
export default {
  name: 'EmptyData',
  props: {
    boxHeight: {
      type: Number,
      default: 242
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style scoped>
.empty-box {
  width: 100%;
  background: url('../assets/img/empty-data.png') no-repeat center;
  background-size: 100% 100%;
}
</style>
