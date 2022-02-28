<template>
  <div class="mapMain">
    <div id="viewDiv"></div>
    <div class="parameDate">
      <div class="parame parameBtn">
          <span :class="['toggleBtn', numShow? 'btn-selected' : '']" @click="toggleNumShow">数值</span>
          <span :class="['toggleBtn', nameShow? 'btn-selected' : '']" @click="toggleNameShow">名称</span>
      </div>
      <ul class="parame ulTab">
        <li class="rowSpace alginCenter biaotou">
          <span>参数</span>
          <i class="el-icon-arrow-up" v-if="showParame" @click="showParame = !showParame"></i>
          <i class="el-icon-arrow-down" v-else @click="showParame = !showParame"></i>
        </li>
        <ul v-if="showParame">
          <li v-for="(item, index) in parame" :key="index" :class="selectParameIndex == index ? 'selected': ''" @click="switchParame(item,index)">
            {{item.name}}
          </li>
        </ul>
      </ul>
      <div class="jcdata jcMainList marginTop26">
        <div class="titlejc flexRow rowSpace alginCenter changeRadio">
          <el-checkbox  :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAll">
              <span>图层</span>
          </el-checkbox>
          <i class="el-icon-arrow-up" v-if="showCheck" @click="showCheck = !showCheck"></i>
          <i class="el-icon-arrow-down" v-else @click="showCheck = !showCheck"></i>
        </div>
        <div class="radioMain changeRadio" v-if="showCheck">
          <el-checkbox-group v-model="checkList" v-for="(item, index) in waterRadio" :key="index" @change="changeItem">
            <el-checkbox :label="item.id" :value="item.id">
              <span class="iconRadio" :class="item.icon">{{item.name}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { loadModules } from 'esri-loader'
import {
  dataRequestUrl,
  baseMapUrl,
  mapZoom,
  mapCenter,
  mapXzqhUrl,
  chinaXzqhUrl
} from './js/AppConfig'
// import AirInfoImpl from "./mapjs/AirInfoImpl";
import { getlist } from '../../common/api/airMapCon'
export default {

  name: 'MapComponent',
  data () {
    return {
      checkAll: true,
      isIndeterminate: false,
      showCheck: true,
      showParame: true,
      selectParameIndex: 0,
      selectParameName: 'aqi',
      parame: [
        {name: 'AQI', value: 'aqi', selected: true},
        {name: 'PM2.5', value: 'pm2.5', selected: false},
        {name: 'PM10', value: 'pm10', selected: false},
        {name: 'NO2', value: '  no2', selected: false},
        {name: 'CO', value: 'co', selected: false},
        {name: 'SO2', value: 'so2', selected: false},
        {name: 'O3', value: 'o3', selected: false}
      ],
      textTab: [
        {name: '实时', id: 'time', selected: true},
        {name: '日', id: 'data', selected: false},
        {name: '月', id: 'mouth', selected: false},
        {name: '年', id: 'year', selected: false}
      ],
      waterRadio: [
        {name: '国控站', id: 'guo', icon: 'guo', value: '1', url: require('@/assets/img/guokong-1.png')},
        {name: '省控站', id: 'sheng', icon: 'sheng', value: '2', url: require('@/assets/img/shengkong-1.png')},
        {name: '市控站', id: 'shi', icon: 'shi', value: '3', url: require('@/assets/img/shikong-1.png')},
        {name: '微型站', id: 'wei', icon: 'wei', value: '4', url: require('@/assets/img/weixing-1.png')},
        {name: '视频监控', id: 'viedeo', icon: 'video', value: '5', url: require('@/assets/img/video.png')}
      ],
      selectStationList: [],
      allStationListData: {},
      checkList: ['guo', 'sheng', 'shi', 'wei', 'viedeo'],
      creatMapStatus: false,
      popData: {},
      popShow: false,
      type: '0',
      numGraphic: null,
      mapTabList: [
        {name: '普通', status: true, kind: '01'},
        {name: '卫星', status: false, kind: '02'}
      ],
      mapTabSele: '01',
      boomStationListDraw: [],
      popBoomFirst: '',
      popBoomid: null,
      airStationInfo: [],
      color: ['rgb(226, 119, 40)', '#ccc', '#555555'],
      graphics: [],
      numShow: false,
      nameShow: false
    }
  },
  created () {
    // this.getAllStationData()
  },
  mounted: function () {
    this.creatMap()
  },
  methods: {
    // 首次加载全部站点数据
    getAllStationData () {
      this.waterRadio.map((item, index) => {
        let params = {
          stationTypeId: item.value
        }
        getlist(params).then(res => {
          if (res.status == 200 && res.data && res.data.length > 0) {
            this.allStationListData[item.id] = res.data
            // this.drawPoint(item.id, this.airStationInfo, item)
          } else {
            this.allStationListData[item.id] = []
          }
          console.log(index, this.waterRadio.length)
          if (index == this.waterRadio.length - 1) {
            console.log(this.allStationListData, 'lll')
            this.getSelectStationList()
          }
        })
      })
    },
    // 遍历获取当前被选中的站点数据
    getSelectStationList () {
      this.selectStationList = []
      this.checkList.map(item => {
        // debugger
        for (let key in this.allStationListData) {
          if (item == key) {
            let currents = this.waterRadio.find(val => val.id == key)
            this.selectStationList.push(this.allStationListData[key])
            console.log('oooeee', key, this.allStationListData[key], currents)
            this.drawPoint(key, this.allStationListData[key], currents)
          }
        }
      })
    },
    getStationData () {
      let stationArr = []
      console.log(this.selectStationList)
      this.selectStationList.map((item, index) => {
        let params = {
          stationTypeId: item.value
        }
        getlist(params).then(res => {
          if (res.status == 200 && res.data && res.data.length > 0) {
            this.airStationInfo = res.data
            console.log(item, 'data')

            this.drawPoint(item.id, this.airStationInfo, item)
          }
        })
      })
    },
    // 切换因子
    switchParame (item, index) {
      this.selectParameIndex = index
      this.selectParameName = item.value
      // this.getStationData()
    },
    handleCheckAll (val) {
      this.isIndeterminate = false
      this.checkList = val ? this.waterRadio.map(item => item.id) : []
      console.log('lll', this.checkList)
      this.clearLayer()
      this.getSelectStationList()
    },
    changeItem (data) {
      debugger
      this.checkList = data
      // if (!data.length) {
      this.clearLayer()
      // this.getStationData()
      this.getSelectStationList()

      let checkedCount = data.length
      this.checkAll = checkedCount === this.waterRadio.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.waterRadio.length
    },
    // 切换是否展示数值
    toggleNumShow () {
      this.clearLayer()
      this.numShow = !this.numShow
      this.getSelectStationList()
      // this.selectStationList.map((item, index) => {
      //   this.drawPoint(item.id, this.airStationInfo, item)
      // })
    },
    // 切换是否展示名称
    toggleNameShow () {
      this.clearLayer()
      this.nameShow = !this.nameShow
      this.getSelectStationList()
      // this.selectStationList.map((item, index) => {
      //   this.drawPoint(item.id, this.airStationInfo, item)
      // })
    },
    clearLayer () {
      this.$store.state.map.layers.items.forEach(item => {
        if (item.type === 'graphics') {
          this.$store.state.map.findLayerById(item.id).removeAll()
        }
      })
      this.graphics = []
    },
    creatMap () {
      loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Basemap',
        'esri/layers/TileLayer',
        'esri/geometry/Extent',
        'esri/layers/WebTileLayer',
        'esri/layers/support/TileInfo',
        'esri/geometry/SpatialReference',
        'esri/layers/BaseDynamicLayer',
        'esri/layers/FeatureLayer',
        'esri/widgets/Zoom',
        'esri/config'

      ]).then(
        ([
          Map,
          MapView,
          Basemap,
          TileLayer,
          Extent,
          WebTileLayer,
          TileInfo,
          SpatialReference,
          BaseDynamicLayer,
          FeatureLayer,
          Zoom,
          esriConfig
        ]) => {
          // esriConfig.fontsUrl = '/front/ArcGIS_Font/'
          esriConfig.fontsUrl = '/front/ArcGIS_Font/'
          // 初始化底图baseMapUrl
          let myBaseTileLayer = new TileLayer({
            url: baseMapUrl
          })

          let baseMap = new Basemap({
            baseLayers: [myBaseTileLayer], // 默认蓝黑底图
            title: '自定义底图',
            id: 'myBasemap'
          })
          let map
          // 创建地图
          map = new Map({
            basemap: baseMap
          })
          this.$store.state.map = map

          let mapView = new MapView({
            container: 'viewDiv',
            map: map,
            zoom: mapZoom, // 初始范围可以用center和zoom组合,也可以通过extent设置
            center: mapCenter,
            constraints: {
              minZoom: 5,
              maxZoom: 18,
              rotationEnabled: false
            },
            highlightOptions: {
              color: [128, 255, 255, 1],
              haloOpacity: 0.9,
              fillOpacity: 0.2
            }
          })
          this.$store.state.mapview = mapView
          // 汾阳行政区划
          // 不显示默认的zoom
          mapView.ui.remove('zoom')
          mapView.ui._removeComponents(['attribution'])
          this.$store.state.zoomwidget = new Zoom({
            view: mapView,
            container: document.createElement('zoomdiv')
          })
          mapView.when(() => {
            this.$store.state.mapLoaded = true
            let feaXzqhRenderer = {
              type: 'simple', // autocasts as new UniqueValueRenderer()
              symbol: {
                type: 'simple-fill',
                color: [62, 65, 172, 0.2],
                outline: {
                  // autocasts as new SimpleLineSymbol()
                  // color: [255, 0, 51, 0.8],   //原始红色的边框颜色
                  color: [62, 65, 172, 1],
                  width: 1.5
                }
              }
            }
            // 行政区划数据放在底层
            let fyxzqh = new FeatureLayer({
              url: mapXzqhUrl,
              id: 'xzqhBoundaryLayer',
              renderer: feaXzqhRenderer
            })
            map.add(fyxzqh, 1)
            this.$emit('fristLoadingFun', (true))
          })
          this.getAllStationData()
          // this.getStationData()
        }
      )
    },
    drawPoint (layerId, listMain, icon) {
      loadModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic'])
        .then(([GraphicsLayer, Graphic]) => {
          if (listMain.length) {
          // 此处datas为数据集,一般采取遍历方式加载,根据业务具体判断
          // 设置图标的经纬度
            let graphics = [] // 此为图层集合,经过业务处理的图层无论是图标还是文字都要存储到//这里面
            listMain.forEach(d => {
              this.drawPointContainer(Graphic, this.graphics, d, d.stationName, icon)
              // 企业类别
              // if (d.typeStatus === 'StationsList') {
              //   this.drawPointContainer(Graphic, this.graphics, d, d.stationName, this.IconList[`Icon${d.fkBlowdownCode.substr(0, 1)}`])
              // }
              // // 锅炉房
              // if (d.typeStatus === 'boomStationList') {
              //   let IconListBoom = boomIcon
              //   this.drawPointContainer(Graphic, this.graphics, d, d.boilerAddress, IconListBoom)
              // }
              // 污水处理厂
              // if (d.typeStatus === 'PollutionTypeData') {
              //   this.drawPointContainer(Graphic, this.graphics, d, d.name, waterIcon)
              // }
              // // 水站
              // if (d.typeStatus === 'WaterStationID') {
              //   let IconList = {
              //     1: waterstatinICon1,
              //     2: waterstatinICon2
              //   }
              //   this.drawPointContainer(Graphic, this.graphics, d, d.stationName, IconList[`${d.fkControllevelid}`])
              // }
              // if (d.typeStatus === 'AirStationID') {
              //   let IconList = {
              //     1: airIcon1,
              //     2: airIcon2
              //   }
              //   this.drawPointContainer(Graphic, this.graphics, d, d.stationName, IconList[`${d.fkControllevelid}`])
              // }
            })
            if (this.graphics && this.graphics.length > 0) {
              console.log(layerId, this.$store.state.map)
              let airPointFeaLayer = this.$store.state.map.findLayerById(layerId)
              if (airPointFeaLayer != null) {
                airPointFeaLayer.removeAll() // 清除原有图层
                airPointFeaLayer.addMany(this.graphics) // 将图层放入layer
                let geometryExtent
                // airPointFeaLayer.visible = false;
                this.$store.state.map.add(airPointFeaLayer) // 将layer放入地图
              // airPointFeaLayer.when(function () {
              //   airPointFeaLayer.visible = true;  //可见性先隐藏后打开为了让图层一起加载显示
              // });
              } else {
                airPointFeaLayer = new GraphicsLayer({
                  'id': layerId // id一定要写,不同的图层id不同,根据id清除图层
                })
                airPointFeaLayer.addMany(this.graphics) // 将图层放入layer
                // airPointFeaLayer.visible = true;
                this.$store.state.map.add(airPointFeaLayer) // 将layer放入地图
              // airPointFeaLayer.when(function () {
              //   // airPointFeaLayer.visible = true;  //可见性先隐藏后打开为了让图层一起加载显示
              // });
              }
            }
          } else {
            // let airPointFeaLayer = this.$store.state.map.findLayerById(layerId)
            if (this.$store.state.map.findLayerById(layerId)) {
              this.$store.state.map.findLayerById(layerId).removeAll() // 清除原有图层
            }
          }
        })
    },
    drawPointContainer (Graphic, graphics, list, name, icon) {
      let IconListBoom = icon
      let pointGeometry = {
        type: 'point',
        // type: 'multipoint',
        // type: 'extent',
        // type: 'polygon',
        x: list.longitude,
        y: list.latitude
      }
      // 设置图标的图片(symbolPicUrl为图片地址),宽,高
      let graphicSymbol = {
        type: 'picture-marker',
        url: icon.url,
        // url: guo,
        width: 36,
        height: 36
      }

      // 默认符号层  图层中添加d即添加对象信息,在点击图标时可以获取到d中的信息
      let graphic = new Graphic({
        geometry: pointGeometry,
        attributes: list,
        symbol: graphicSymbol
      })
      // graphic为构成图标图层,放入图层集合中
      graphics.push(graphic)
      // 数值/名称 此处可做是否加载名称判断,数值与名称的添加方式相同,不同在于文字位置
      if (this.nameShow) {
        // numGraphic为构成文字图层, 放入图层集合中
        let numTextSymbol = {
          type: 'text',
          color: '#fff', // 字体颜色
          font: {
            family: 'sans-serif', // 字体样式
            size: 20 // 字体大小
          },
          text: name, // 文字,此处用站点名举例 list[this.selectParameName] name
          xoffset: 0, // 文字水平偏移量
          yoffset: -25, // 文字垂直偏移量
          horizontalAlignment: 'center', // 水平居中
          verticalAlignment: 'middle' // 垂直居中
        }
        let numGraphic = new Graphic({
          geometry: pointGeometry, // 点的经纬度
          attributes: list,
          symbol: numTextSymbol
        })
        graphics.push(numGraphic)
      }
      if (this.numShow) {
        // numGraphic为构成文字图层, 放入图层集合中
        let numTextSymbol = {
          type: 'text',
          color: '#fff', // 字体颜色
          font: {
            family: 'sans-serif', // 字体样式
            size: 18 // 字体大小
          },
          text: list[this.selectParameName], // 文字,此处用站点名举例 list[this.selectParameName] name
          xoffset: 25, // 文字水平偏移量
          yoffset: 0, // 文字垂直偏移量
          horizontalAlignment: 'center', // 水平居中
          verticalAlignment: 'middle' // 垂直居中
        }

        let numGraphic = new Graphic({
          geometry: pointGeometry, // 点的经纬度
          attributes: list,
          symbol: numTextSymbol
        })
        graphics.push(numGraphic)
      }
    }
  }

}
</script>
<style scoped lang="less">
.mapMain{
  position: absolute;
  left: 0;
  top: 0;
}
#viewDiv {
  width: 100%;
  height: 100%;
}
.parameBtn{
  display: flex;
  justify-content: space-between;
  color: #fff;
  margin-bottom: 20px;
  .toggleBtn{
    width: 100px;
    height: 59px;
    line-height: 59px;
    border: 1px solid rgba(53, 126, 255, 0.5);
    border-radius: 10px;
    text-align: center;
    cursor: pointer;
  }
  .btn-selected{
    background: linear-gradient(360deg, rgba(53, 126, 255, 0.6) 0%, rgba(100, 155, 253, 0.1) 100%);
    border: 1px solid #4C8DFF;
    color: #fff;
    font-weight: 500;
  }
}

</style>
