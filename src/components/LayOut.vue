<template>
  <div class="container">
    <HearderTitle></HearderTitle>
    <JumpMain></JumpMain>
    <router-view></router-view>
  </div>
</template>
<script>
import HearderTitle from '@/components/LayOut/HeaderTitle.vue'
import JumpMain from '@/components/LayOut/JumpMain.vue'
export default{
  components: {
    JumpMain,
    HearderTitle
  }
}
</script>
<style>
  @import url(../assets/css/style.css);
  @import url(../assets/css/minx.less);
  @import url("http://111.207.155.52:18081/arcgis_js_api/library/4.11/esri/themes/light/main.css");
</style>
