<!--
 * @功能描述:
 * @版本:
 * @作者: zhangls
 * @Date: 2021-10-06 18:04:38
 * @最新修改内容:
 * @LastEditTime: 2021-10-07 04:06:21
-->
<template>
  <div class="airQuality rowFlex">
  <LeftPanel :type="typeId"></LeftPanel>
    <!-- <div class="mainTab rowFlex">
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
     <MapMain v-if="isShow" :type="typeId"></MapMain>
  <rightPanel></rightPanel>
  </div>
</template>
<script>
// import LeftPanel from '@/components/Common/pegeCommon/leftPanel.vue' //旧左侧模块
import LeftPanel from '@/components/Common/pegeCommon/leftPanelNew2.vue' // 新左侧模块
import MapMain from '@/components/Common/pegeCommon/MapMain.vue'
import RightPanel from '@/components/IntegratedPanel/RightPanel.vue'
// import rightPanel from '../../src/components/Common/pegeCommon/rightPanel.vue'
import rightPanel from '@/components/Common/pegeCommon/newRightPanel.vue'
export default {
  name: 'CooperativeScheduling',
  components: {
    LeftPanel,
    rightPanel,
    MapMain
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
  created () {
    this.getHarzardousType()
  },
  methods: {
    getHarzardousType () {
      // 获取危废类型
      let self = this
      let url = '/api/regulatory/hazardousWasteCategory/showDicType '
      self.$axios.post(url).then(function (response) {
        sessionStorage.setItem('harzardousTypeList', JSON.stringify(response.data.data))
        // let test = sessionStorage.getItem('harzardousTypeList')
        //  console.log(JSON.parse(test))
      })
    },
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
