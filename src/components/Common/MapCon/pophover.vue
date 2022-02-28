<template>
  <div class="popMain"  v-if="status" ref="popMain">
    {{ name }}
  </div>
</template>

<script>
// import PopRealTime from "./PopMain/PopRealTime";
// import PopHistory from "./PopMain/PopHistory";
// import PopStations from "./PopMain/PopStations";
import * as mapCore from './js/mapCore'
export default {
  name: 'pophover',
  // components: {PopStations, PopHistory, PopRealTime},
  data () {
    return {
      // tabList: [
      //   {name: '实时数据', id: 'PopRealTime'},
      //   {name: '历史报警', id: 'PopHistory'},
      //   {name: '站点信息', id: 'PopStations'}
      // ],
      // currentComponents: 'PopRealTime',
      // defaultData: {},
      status: false,
      clickedPoint: null,
      screenPoint: null,
      id: '',
      name: ''
    }
  },
  methods: {
    // changeCurrentComponents(id) {
    //   this.currentComponents = id
    // },
    viewClick () {
      var mapView = mapCore.GetView()
      this.status = false
      mapView.watch('zoom', function (evt) {
        // console.log(mapView.zoom)
        if (mapView.zoom > 13) {
          mapView.map.findLayerById('polluteEnterprise').visible = true
        } else {
          mapView.map.findLayerById('polluteEnterprise').visible = false
        }
        // console.log(mapView.map.findLayerById("polluteEnterprise").visible)
      })
      let _self = this
      mapView.watch('extent', function (evt) {
        if (_self.clickedPoint) {
          _self.screenPoint = mapView.toScreen(_self.clickedPoint)
          _self.locatedPopup()
        }
        mapCore.FindLayer('ls').removeAll()
      })
      mapView.on('pointer-move', (event) => {
        mapView.hitTest(event).then((response) => {
          //
          if (response.results.length > 0) {
            console.log(response.results, 'response.results')
            var graphic = response.results[0].graphic
            _self.name = graphic.attributes.entName
            _self.id = graphic.layer.id
            if (_self.id == 'polluteEnterprise') {
              _self.status = true
              //  $(".popMain").css("borderColor", 'rgba(34, 140, 240, 1)');
              // $(".popMain:after").css("borderTopColor",'rgba(34, 140, 240, 1)');
              $('.popMain').removeClass('lupopMain').addClass('lanpopMain')
              //  $('#cc').removeClass('lupopMain').addClass('popMain')
            } else if (_self.id == 'produceEnterprise') {
              //  $(".popMain").css("borderColor",'rgba(36, 206, 189, 1)');
              // $(".popMain:after").css("borderTopColor",'rgba(36, 206, 189, 1)');
              //  $('#cc').removeClass('popMain').addClass('lupopMain')
              $('.popMain').removeClass('lanpopMain').addClass('lupopMain')
              _self.status = true
            } else {
              _self.status = false
            }
            // graphic.geometry.x = graphic.geometry.longitude-300
            _self.clickedPoint = graphic.geometry
            // // console.log(graphic.geometry)
            _self.screenPoint = mapView.toScreen(_self.clickedPoint)
            // _self.dataId = graphicData.layer.id;
            // this.showPopup(graphicData)
            // _self.status = true
            _self.locatedPopup()
          } else {
            _self.status = false
          }
        })
      })

      // console.log('rhis')
    },
    locatedPopup () {
      let _self = this
      var x = 0
      var y = 0
      var targetX = 0
      var targetY = 0
      var visible = false
      if (document.getElementsByClassName('popMain').length > 0) {
        var style = document.getElementsByClassName('popMain')[0].style
        if (!visible) {
          x = (_self.screenPoint && _self.screenPoint.x) || 0
          y = (_self.screenPoint && _self.screenPoint.y) || 0
        }

        targetX = (_self.screenPoint && _self.screenPoint.x) || 0
        targetY = (_self.screenPoint && _self.screenPoint.y) || 0
        style.opacity = 1
        visible = true
        var divWidth = 0,
          divHeight = 0
        divWidth = $('.popMain').width()
        divHeight = $('.popMain').height()
        x = targetX - divWidth / 2
        y = -(document.getElementById('viewDiv').clientHeight - targetY) - 10
        // style.margin-left = Math.round(x) + "px"
        // style.margin-top = Math.round(y) + "px"
        // style.transform ="translate(" + Math.round(x) + "px," + Math.round(y) + "px, 0)";
        $('.popMain').css('left', _self.screenPoint.x)
        $('.popMain').css('top', _self.screenPoint.y - 94)
      }
    }
  },
  props: {
    params: Object,
    type: String
  },
  watch: {
    // currentComponents: function () {
    //   console.log(this.currentComponents)
    // }
  }
}
</script>

<style scoped>
.popMain {
  padding:  10px 20px;
  height: 82px;
  text-align: center;
  line-height: 60px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
  border-radius: 5px;
  font-size: 31px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;

}

.lanpopMain{
 border: 1px solid rgba(34, 140, 240, 1);
}
.lanpopMain::after{
  position: absolute;
  content: "";
  opacity: 1;
  display: block;
  width: 10;
  height: 10;
  bottom: -22px;
  left: 50%;
  margin-left: -6px;
  border: 10px solid transparent;
  border-top-color: rgba(34, 140, 240, 1);
}
.lupopMain {
  border: 1px solid rgba(36, 206, 189, 1);
}
.lupopMain::after{
  position: absolute;
  content: "";
  opacity: 1;
  display: block;
  width: 10;
  height: 10;
  bottom: -22px;
  left: 50%;
  margin-left: -6px;
  border: 10px solid transparent;
  border-top-color: rgba(36, 206, 189, 1);
}
.hovermap {
  height: 82px;
  z-index: 999;
  font-size: 31px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 70px;
  text-align: center;
}
</style>
