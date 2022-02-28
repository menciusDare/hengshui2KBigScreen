<template>
  <div class="airQuality rowFlex">
    <LeftPanel type="air"></LeftPanel>
    <MapMain type="air"></MapMain>
    <RightPanel type="xietong"></RightPanel>
  </div>
</template>

<script>
import LeftPanel from '@/components/Common/pegeCommon/leftPanel.vue'
import MapMain from '@/components/Common/pegeCommon/MapMain.vue'
import RightPanel from '@/components/CooperativeScheduling/RightPanel.vue'

export default {
  name: 'CooperativeScheduling',
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
