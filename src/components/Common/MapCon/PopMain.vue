<template>
  <div class="popMain1" v-if="status">
    <mapDiago :id="myid" ></mapDiago>
  </div>
</template>

<script>

import * as mapCore from './js/mapCore'
import mapDiago from '../pegeCommon/mapDiago.vue'
export default {

  name: 'PopMain',
  components: {mapDiago},
  data () {
    return {
      tabList: [
        {name: '实时数据', id: 'PopRealTime'},
        {name: '历史报警', id: 'PopHistory'},
        {name: '站点信息', id: 'PopStations'}
      ],
      currentComponents: 'PopRealTime',
      defaultData: {},
      status: false,
      myid: ''
    }
  },
  methods: {
    // 关闭弹唱
    // handelClose() {
    //   this.status = false;
    // },
    changeCurrentComponents (id) {
      this.currentComponents = id
    },
    viewClick () {
      var mapView = mapCore.GetView()
      this.status = false
      mapView.on('click', (event) => {
        mapView.hitTest(event).then((response) => {
          console.log(response, event)
          if (response.results.length) {
            this.myid = response.results[0].graphic['attributes'].id
            let layerId = response.results[0].graphic['layer'].id
            console.log('layerId', layerId)
            if (layerId == 'errorWarn' || layerId == 'transferTruck') {
              return
            }
            let graphicData = response.results.filter((item) => item.graphic.layer.type == 'graphics' && item.graphic.attributes != null)[0].graphic
            this.defaultData = graphicData.attributes
            this.currentComponents = 'PopRealTime'
            this.changeCurrentComponents('PopRealTime')
            this.status = true
          }
        })
      })
    }
  },
  props: {
    params: Object,
    type: String
  },
  watch: {
    currentComponents: function () {
      console.log(this.currentComponents)
    }
  }
}
</script>

<style scoped>
.popMain1{
  /* width: 600px; */
  /* min-height: 500px; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  z-index:1000;
}
.popMain1 .el-icon-close{
  font-size: 30px;
}
.popMain1 .popTitleName{
  line-height: 40px;
  font-size: 18px;
  color: #96c5d7;
}
.tabListLi{
  line-height: 30px;
  border: 1px solid rgba(255, 255, 255, .3);
  padding: 0 10px;
  margin-right: 10px;
  line-height: 30px;
  font-size: 20px;
  cursor: pointer;
}
.tabListLi.isActive{
  border: 1px solid #0da4df;
}
.popContainer{
  padding: 20px 0;
  box-sizing: border-box;
}
</style>
