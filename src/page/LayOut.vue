<template>
  <div class="container rowFlex">
    <!--<navMain></navMain>-->
    <div class="leftContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navMain from '@/components/LayOut/NavMain.vue'

export default {
  name: 'LayOut',
  components: {
    navMain
  }
}
</script>

<style>
@import url(../assets/css/minx.less);
@import url("http://111.207.155.52:18081/arcgis_js_api/library/4.11/esri/themes/light/main.css");
.container{
  width: 2048px;
  height: 1152px;
  background: rgba(0, 0, 0, 1);
}
.navMain{
  width: 200px;
}
.leftContainer{
  flex: 1;
}
</style>
