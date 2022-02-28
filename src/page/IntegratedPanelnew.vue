<template>
  <div class="airQuality rowFlex">
    <!-- <LeftPanel :type="typeId"></LeftPanel>
    <div class="mainTab rowFlex">
      <div
        class="mainTabLi"
        :class="typeId === item.id ? 'isActive': ''"
        @click="changeMapType(item.id)"
        v-for="(item, index) in mainTab"
        :key="index">
        {{item.name}}
      </div>
    </div>
    <MapMain v-if="isShow" :type="typeId"></MapMain>
    <RightPanel></RightPanel> -->
    <RightPanel></RightPanel>
  </div>
</template>
<script>
import LeftPanel from '@/components/Common/pegeCommon/leftPanel.vue'
import MapMain from '@/components/Common/pegeCommon/MapMain.vue'
import RightPanel from '@/components/IntegratedPanel/RightPanel.vue'

export default {
  name: 'CooperativeScheduling',
  components: {
    RightPanel
    // LeftPanel,
    // MapMain
  },
  data () {
    return {
      typeId: 'air',
      mainTab: [
        {name: '大气质量', id: 'air'},
        {name: '水环境', id: 'water'}
      ],
      isShow: true
    }
  },
  methods: {
    changeMapType (id) {
      this.isShow = false
      this.typeId = id
      this.isShow = true
      console.log(this.typeId)
    }
  }
}
</script>

<style scoped>
.airQuality{
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
}
.mainTab{
  position: absolute;
  left: 820px;
  top: 55px;
  color: #fff;
  z-index: 10000;
}
.mainTabLi{
  line-height: 48px;
  padding: 0 10px;
  cursor: pointer;
  background: rgba(0,0,0,.3);
}
.mainTabLi.isActive{
  background: #0da4df;
}
</style>
