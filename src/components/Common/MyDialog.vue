<!--
 * @功能描述:
 * @版本:
 * @作者: zhangls
 * @Date: 2021-06-15 16:47:12
 * @最新修改内容:
 * @LastEditTime: 2021-06-16 09:15:55
-->
<template>
    <div class="dialog-wrapper" :style="{width:dialogWidth+ 'px',height:dialogHeight+ 'px'}" v-if="isShowDialog">
      <div class="dialog-head">
        <span>{{dialogTitle}}</span>
        <div class="close-btn" @click="hadelClose"></div>
      </div>
      <div class="dialog-body">
        <slot name="body"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    dialogTitle: {
      type: String
    },
    dialogWidth: {
      type: Number,
      default: 800
    },
    dialogHeight: {
      type: Number,
      default: 800
    }
  },
  data () {
    return {
      isShowDialog: false
    }
  },
  methods: {
    open () {
      this.isShowDialog = true
    },
    hadelClose () {
      this.isShowDialog = false
      this.$emit('handelClose')
    }
  }

}
</script>

<style scoped>
.dialog-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 300;
  transform: translate(-50%,-50%);
  border-radius: 10px;
}
.dialog-wrapper .dialog-head {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: rgba(0,0,0,0.8);
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
}
.dialog-wrapper .dialog-head  span {
  color: #ffffff;
  font-size: 25px;
}
.dialog-wrapper .dialog-head .close-btn {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: url('../../assets/img/close.png')no-repeat center center;
  background-size: 25px 25px;
}
.dialog-wrapper .dialog-body {
  padding: 30px 20px 20px;
  background-color: rgba(0,0,0,0.8);
  border-radius: 0 0 10px 10px;
}
</style>
