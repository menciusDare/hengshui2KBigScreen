<template>
  <div class="main alginCenter">
    <div class="logo"></div>
    <div class="text">咸宁环境质量监管及决策平台</div>
  </div>
</template>

<script>
export default {
  name: 'LogoMain'
}
</script>

<style scoped>
.main{
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 28px;
  box-sizing: border-box;
}
.text{
  font-size: 21px;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: #FFFFFF;
  line-height: 32px;
  text-shadow: 0px 2px 4px rgba(47, 141, 218, 0.74);
  padding-left: 14px;
  box-sizing: border-box;
  margin-left: 14px;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}
.logo{
  width: 102px;
  height: 32px;
  background: url("../../assets/img/waterIcon/logo.png") no-repeat center;
  background-size: 100%;
}
</style>
