<template>
  <div class="airQuality rowFlex">
    <LeftPanel type="air"></LeftPanel>
    <MapMain type="air"></MapMain>
    <RightPanel></RightPanel>
  </div>
</template>

<script>
import LeftPanel from '@/components/Common/pegeCommon/leftPanel.vue'
import MapMain from '@/components/Common/pegeCommon/MapMain.vue'
import RightPanel from '@/components/AirQuality/RightPandel'

export default {
  name: 'AirQuality',
  components: {
    RightPanel,
    LeftPanel,
    MapMain
  }
}
</script>

<style scoped>
.airQuality{
  width: 100%;
  height: 100%;
  color: #fff;
}
</style>
