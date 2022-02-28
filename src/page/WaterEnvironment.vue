<template>
  <div class="mainContainer waterEnvironment rowFlex">
    <LeftPanel type="water"></LeftPanel>
<!--    <SmallMap></SmallMap>-->
    <MapMain type="water"></MapMain>
    <RightPandel></RightPandel>
  </div>
</template>
<script>
import LeftPanel from '@/components/Common/pegeCommon/leftPanel.vue'
import SmallMap from '@/components/WaterEnvironment/SmallMap.vue'// 断面达标率
import MapMain from '@/components/Common/pegeCommon/MapMain.vue'
import RightPandel from '../components/WaterEnvironment/RightPandel'
// 断面达标率

export default{
  components: {
    RightPandel,
    SmallMap,
    MapMain,
    LeftPanel
  },
  data () {
    return {
    }
  },
  methods: {
    changeItem (value) {
      console.log(value)
    }
  }
}
</script>
<style>
.mainContainer{
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>
