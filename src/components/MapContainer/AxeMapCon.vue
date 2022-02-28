<template>
  <div class="mapMain">
    <div id="viewDiv"></div>
  </div>
</template>
<script>
import { loadModules } from 'esri-loader'
import {
  dataRequestUrl,
  baseMapUrl,
  mapZoom,
  // mapXzqhUrl,
  chinaXzqhUrl
} from './js/AppConfig'
// import AirInfoImpl from "./mapjs/AirInfoImpl";
import {loadingBoomListData,
  loadingWaterentErpriceData,
  loadingvideo,
  loadingWaterBlood,
  getRiverWaterQuality } from '@/common/api/axeMapCon'
const mapCenter = [114.48338, 29.666581]
// const mapCenter = [114.180865, 29.995613]
const mapXzqhUrl = 'http://10.0.200.201/server/rest/services/XianNingRegion/MapServer/0'
export default {
  name: 'MapComponent',
  props: {
    checkParameData: {
      type: Object
    }
  },
  data () {
    return {
      selectParameName: 'aqi',
      textTab: [
        {name: '实时', id: 'time', selected: true},
        {name: '日', id: 'data', selected: false},
        {name: '月', id: 'mouth', selected: false},
        {name: '年', id: 'year', selected: false}
      ],

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
      color: ['rgb(226, 119, 40)', '#ccc', '#555555'],
      graphics: [],
      numShow: false,
      nameShow: false,
      riverColor: {
        1: '#34C3F6',
        2: '#34C3F6',
        3: '#03FF03',
        4: '#FAFF19',
        5: '#FF9000',
        6: '#FE0000'
      }
    }
  },
  watch: {
    checkParameData: {
      handler (newVal, oldVal) {
        // console.log(newVal, oldVal)
        let {id, value, type, check} = newVal
        if (check) {
          this.changeMap(id, value, type, this.ICONLIST.iconMain[id])
        } else {
          this.clearLayer(id)
        }
      },
      deep: true
    }

  },
  created () {
  },
  mounted () {
    this.creatMap()
  },
  methods: {
    changeMap (id, value, type, iconList) {
      switch (type) {
        case 'SECTION':
          this.changeStation(id, value, iconList, type)
          break
        case 'WATERENTERPRICE':
          this.changeWaterEnterprice(id, value, iconList, type)
          break
        case 'WATERBLOOD':
          this.changeWaterSource(id, iconList, type)
          break
        case 'VIDEO':
          this.changeVideo(id, iconList, type)
          break
        case 'RIVER':
          this.changeRiver(id)
      }
      console.log(id, value, type)
    },
    changeStation (id, value, iconList, type) {
      loadingBoomListData(value, 0).then(res => {
        if (res.code == 0 && res.data) {
          this.drawPoint(id, res.data, iconList, type)
        }
      })
    },
    changeWaterEnterprice (id, value, iconList, type) {
      loadingWaterentErpriceData(value).then(res => {
        if (res.code == 0 && res.data) {
          this.drawPoint(id, res.data, iconList, type)
        }
      })
    },
    changeWaterSource (id, iconList, type) {
      let regionCode = this.app_config.appInfo.regionCode
      loadingWaterBlood(regionCode).then(res => {
        if (res.code == 0 && res.data) {
          this.drawPoint(id, res.data, iconList, type)
        }
      })
    },
    changeVideo (id, iconList, type) {
      loadingvideo().then(res => {
        if (res.code == 0 && res.data) {
          this.drawPoint(id, res.data, iconList, type)
        }
      })
    },
    changeRiver (id) {
      let value = {url: 'http://10.0.200.201/server/rest/services/XianningWaterArea/MapServer/0', id: id}
      let renderer = {
        type: 'unique-value', // autocasts as new UniqueValueRenderer()
        field: 'uuid',
        defaultSymbol: {
          type: 'simple-line',
          color: '#1bbaf5',
          // color: '#445f7e',
          width: '2px'
        }, // autocasts as new SimpleFillSymbol()
        uniqueValueInfos: []
      }
      let label = {
        labelExpressionInfo: {
          expression: '$feature.NAME'
        },
        // labelPlacement: "above-before",
        symbol: {
          type: 'text', // autocasts as new TextSymbol()
          color: 'white',
          haloSize: 1,
          haloColor: 'black',
          font: { // autocasts as new Font()
            size: 12
          }
        }
      }
      this.createFeatureLayer(value, () => {
        var layer = this.$store.state.map.findLayerById(id)
        console.log(layer)
        let regionCode = this.app_config.appInfo.regionCode
        getRiverWaterQuality(regionCode).then(
          res => {
            let data = res.data ? res.data : res
            renderer.uniqueValueInfos = []
            for (let i = 0; i < data.length; i++) {
              if (data[i]['waterQuality']) { // 如果水质不为空,自定义河流水质颜色
                let valueinfo = {
                  value: data[i]['riverCode'],
                  symbol: {
                    type: 'simple-line', // autocasts as new SimpleLineSymbol()
                    color: this.riverColor[data[i]['waterQuality']],
                    width: '2px'
                  }
                }
                renderer.uniqueValueInfos.push(valueinfo)
              }
            }
            layer.renderer = renderer
            layer.labelingInfo = [label]
          }
        )
      })
    },
    /* 创建 FeatureLayer */
    createFeatureLayer (value, callback) {
      this.addFeatureLayer({
        layerid: value.id,
        url: value.url,
        type: 'FeatureLayer',
        index: 0
      }, callback)
    },
    // 创建 addFeatureLayer
    addFeatureLayer (opts, callback) {
      loadModules([
        'esri/layers/FeatureLayer',
        'esri/config'
      ]).then(([FeatureLayer, esriConfig]) => {
        esriConfig.fontsUrl = '/front/ArcGIS_Font/'
        var featureLayer = null
        if (this.$store.state.map.findLayerById(opts.layerid)) {
          featureLayer = this.$store.state.map.findLayerById(opts.layerid)
          featureLayer.visible = true
        } else {
          if (opts.url !== null && opts.url !== undefined && opts.url !== '') {
            featureLayer = new FeatureLayer({
              url: opts.url,
              id: opts.layerid
            })
          } else if (opts.source && opts.layerid && opts.source.length > 0) {
            featureLayer = new FeatureLayer({
              source: opts.source,
              id: opts.layerid,
              objectIdField: opts.layerid,
              fields: opts.fields,
              outFields: ['*']
            })
          }
          if (opts.index) { this.$store.state.map.add(featureLayer, 0) } else { this.$store.state.map.add(featureLayer, 0) }
        }
        featureLayer.visible = true
        featureLayer.when(callback)
      })
    },

    clearLayer (id) {
      let layer = this.$store.state.map.findLayerById(id)
      if (layer) {
        if (id == 'detectedData4') { // 河流
          layer.visible = false
        } else {
          layer.removeAll()
        }
      }
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
        'esri/config',
        'esri/Graphic'
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
          esriConfig,
          Graphic
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
            // center: [135.08851148002088, 53.56090105044319],
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
                  // color: [255, 0, 51, 0.8], // 原始红色的边框颜色
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
          })
          this.$emit('initMapCoverings')
        }
      )
    },
    drawPoint (layerId, listMain, iconList, type) {
      loadModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic'])
        .then(([GraphicsLayer, Graphic]) => {
          if (listMain.length) {
          // 此处datas为数据集,一般采取遍历方式加载,根据业务具体判断
          // 设置图标的经纬度
            let graphics = [] // 此为图层集合,经过业务处理的图层无论是图标还是文字都要存储到//这里面
            listMain.forEach(item => {
              switch (type) {
                case 'SECTION':
                  this.drawPointContainer(Graphic, graphics, item, item.stationName, iconList[item.type || '6'], type)
                  break
                case 'WATERENTERPRICE':
                  this.drawPointContainer(Graphic, graphics, item, item.stationName, iconList['1'], type)
                  break
                case 'WATERBLOOD':
                  this.drawPointContainer(Graphic, graphics, item, item.stationName, iconList['1'], type)
                  break
                case 'VIDEO':
                  this.drawPointContainer(Graphic, graphics, item, item.stationName, iconList['1'], type)
                  break
              }
            })
            if (graphics && graphics.length > 0) {
              console.log(layerId, this.$store.state.map)
              let airPointFeaLayer = this.$store.state.map.findLayerById(layerId)
              if (airPointFeaLayer != null) {
                airPointFeaLayer.removeAll() // 清除原有图层
                airPointFeaLayer.addMany(graphics) // 将图层放入layer
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
                airPointFeaLayer.addMany(graphics) // 将图层放入layer
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
    drawPointContainer (Graphic, graphics, list, name, icon, type) {
      console.log('////', icon)
      let IconListBoom = icon
      let x, y
      if (type == 'WATERBLOOD') {
        x = list.centerLng
        y = list.centerLat
      } else {
        x = list.longitude
        y = list.latitude
      }
      let pointGeometry = {
        type: 'point',
        x: x,
        y: y
      }
      // 设置图标的图片(symbolPicUrl为图片地址),宽,高
      let graphicSymbol = {
        type: 'picture-marker',
        url: icon,
        // url: guo,
        width: 30,
        height: 30
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
</style>
