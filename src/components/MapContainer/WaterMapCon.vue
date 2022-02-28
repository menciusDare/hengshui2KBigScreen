<template>
  <div class="mapMain">
    <div id="viewDiv"></div>
    <div class="popMain"></div>
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
import { loadingBoomListData,
  loadingWaterentErpriceData,
  loadingWatercodBlackWater,
  loadingvideo,
  loadingWaterBlood, getRiverWaterQuality} from '@/common/api/WaterEnvironment'
export default {
  name: 'MapComponent',
  data () {
    return {
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
      a1Gra: null,
      a2Gra: null,
      addShinkStatus: false,
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
  mounted: function () {
    this.creatMap()
  },
  props: {
    checkedParameter: Object,
    changeMapStatus: Function
  },
  watch: {
    'checkedParameter.status': function () {
      const {id, check} = this.checkedParameter
      const [type, checkSelectedId] = id.split('-');
      (check === false && this.removeLayer(checkSelectedId)) ||
      (check === true && this.updateMap(type, checkSelectedId))
    },
    addShinkStatus: function () {
      this.addShinkStatus === true && this.addGraphicShink()
    }
    // "$store.state.map.findLayerById(blackStink)" :function () {
    //   console.log("blackStinkblackStink")
    // }
  },
  methods: {
    updateMap (type, id) {
      (type === 'SECTION' && this.changeSECTION(id, this.ICONLIST.iconMain[id], type)) ||
      (type === 'WATERENTERPRICE' && this.ChangewaterentErprice(id, this.ICONLIST.iconMain[id], type)) ||
      (type === 'WATERCODBLACKWATER' && this.changeWatercodBlackWater(id, this.ICONLIST.iconMain[id], type)) ||
      (type === 'VIDEO' && this.changevideo(id, this.ICONLIST.iconMain[id], type)) ||
      (type === 'WATERBLOOD' && this.changeWaterBlood(id, this.ICONLIST.iconMain[id], type)) ||
      (type === 'RIVER' && this.changeWaterRiver(id))
    },
    changeSECTION (id, iconList, type) {
      var parmas = {
        'guo': '1',
        'sheng': '2',
        'shi': '3',
        'common': '4'
      }
      loadingBoomListData(parmas[id], 0).then(res => {
        this.drawPoint(id, res.data, iconList, type)
      })
    },
    ChangewaterentErprice (id, iconList, type) {
      debugger
      var parmas = {
        'industry': '3f382eca203f459cb6a66c265a3427da',
        'waterFactory': 'a6d7487fc3674cd999b7ee0a28099f62',
        'breed': '0062',
        'garbage': '074b014df9e54acc9358d24be5e8c38e',
        'waterSupply': '000002',
        'outfall': '25'
      }
      loadingWaterentErpriceData(parmas[id]).then(res => {
        this.drawPoint(id, res.data, iconList, type)
      })
    },
    changeWatercodBlackWater (id, iconList, type) {
      loadingWatercodBlackWater('').then(res => {
        this.drawPoint(id, res.data, iconList, type)
      })
    },
    changevideo (id, iconList, type) {
      loadingvideo().then(res => {
        this.drawPoint(id, res.data, iconList, type)
      })
    },
    changeWaterBlood (id, iconList, type) {
      let regionCode = this.app_config.appInfo.regionCode
      loadingWaterBlood(regionCode).then(res => {
        this.drawPoint(id, res.data, iconList, type)
      })
    },
    changeWaterRiver (id) {
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
      ]).then(([ FeatureLayer, esriConfig]) => {
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
          esriConfig.fontsUrl = '/front/ArcGIS_Font/'
          // 初始化底图baseMapUrl
          let myTk = 'GfjNXG12fQDSzMYNKlCwGKljCjGE3LFE'
          // let baseTileLayer = new WebTileLayer({
          //   id: 'vectorBase',
          //   urlTemplate:
          //     `http://{subDomain}.map.baidu.com/api?v=3.0/{level}/{col}/{row}&ak=${myTk}`,
          //     // 'https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain/lang=zh_cn/{level}/{col}/{row}.png',
          //   subDomains: ['t0','t1','t2','t3','t4','t5','t6','t7']
          // })
          // let baseAnoTileLayer = new WebTileLayer({
          //   id: 'vectorAnoBase',
          //   urlTemplate:
          //   `http://{subDomain}.map.baidu.com/api?v=3.0/{level}/{col}/{row}&ak=${myTk}`,
          //   subDomains: ['t0','t1','t2','t3','t4','t5','t6','t7']
          // })
          // let baseMap = new Basemap({
          //   baseLayers: [baseTileLayer, baseAnoTileLayer], // 默认蓝黑底图
          //   title: '普通',
          //   id: 'myVectorBasemap2'
          // })

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
            basemap: baseMap,
            ground: {
              surfaceColor: [226, 240, 255]
            }
          })
          // map.ground.surfaceColor = '#004C73'
          this.$store.state.map = map
          let mapView = new MapView({
            container: 'viewDiv',
            map: map,
            zoom: mapZoom, // 初始范围可以用center和zoom组合，也可以通过extent设置
            center: mapCenter,
            constraints: {
              minZoom: 5,
              maxZoom: 18,
              rotationEnabled: false
            },
            highlightOptions: {
              color: [128, 255, 255, 1],
              haloOpaSECTION: 0.9,
              fillOpaSECTION: 0.2
            }
          })
          this.$store.state.mapview = mapView
          this.$emit('changeMapStatus', (true))
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
          })
        }
      )
    },
    drawPoint (layerId, listMain, iconList, type) {
      loadModules([
        'esri/layers/GraphicsLayer',
        'esri/Graphic'])
        .then(([GraphicsLayer, Graphic]) => {
          if (listMain.length) {
          // 此处datas为数据集，一般采取遍历方式加载，根据业务具体判断
          // 设置图标的经纬度
            let graphics = [] // 此为图层集合，经过业务处理的图层无论是图标还是文字都要存储到//这里面
            listMain.forEach(d => {
              (type === 'SECTION' && this.drawPointContainer(Graphic, graphics, d, d.stationName, iconList[d.type || '6'], type)) ||
            //  涉水工业企业 污水厂 畜禽养殖 垃圾填埋场 入河排污口
            (type === 'WATERENTERPRICE' && this.drawPointContainer(Graphic, graphics, d, d.stationName, iconList[1], type)) ||
            // 黑臭水体
            (type === 'WATERCODBLACKWATER' && this.drawPointContainer(Graphic, graphics, d, d.stationName, iconList[`${d.isCall}`] || iconList['common'], type)) ||
            (type === 'VIDEO' && this.drawPointContainer(Graphic, graphics, d, d.stationName, iconList[1], type)) ||
            (type === 'WATERBLOOD' && this.drawPointContainer(Graphic, graphics, d, d.stationName, iconList[1], type))
            })
            if (graphics && graphics.length > 0) {
            // console.log(mapView.findLayerById(layerId))
              let airPointFeaLayer = this.$store.state.map.findLayerById(layerId)

              if (airPointFeaLayer != null) {
                airPointFeaLayer.removeAll() // 清除原有图层
                airPointFeaLayer.addMany(graphics) // 将图层放入layer
                let geometryExtent
                const list = new Promise(resolve => {
                  this.$store.state.map.add(airPointFeaLayer) // 将layer放入地图
                  return resolve('ok')
                })
                Promise.all([list]).then(() => {
                  if (type === 'WATERCODBLACKWATER') {
                    this.addShinkStatus = true
                  }
                })
              } else {
                airPointFeaLayer = new GraphicsLayer({
                  'id': layerId // id一定要写，不同的图层id不同，根据id清除图层
                })
                airPointFeaLayer.addMany(graphics) // 将图层放入layer
                debugger
                const list = new Promise(resolve => {
                  this.$store.state.map.add(airPointFeaLayer) // 将layer放入地图
                  return resolve('ok')
                })
                Promise.all([list]).then(() => {
                  if (type === 'WATERCODBLACKWATER') {
                    this.addShinkStatus = true
                  }
                })
              // this.$store.state.map.add(airPointFeaLayer); //将layer放入地图
              // if(type === 'WATERCODBLACKWATER') {
              //   this.addShinkStatus = true
              // }
              }
            }
          } else {
            let airPointFeaLayer = this.$store.state.map.findLayerById(layerId)
            airPointFeaLayer.removeAll() // 清除原有图层
          }
        })
    },
    drawPointContainer (Graphic, graphics, list, name, icon, type) {
      let listx = ''
      let listy = ''
      if (type === 'WATERBLOOD') {
        listx = list.centerLng
        listy = list.centerLat
      } else {
        listx = list.longitude
        listy = list.latitude
      }
      let pointGeometry = {
        type: 'point',
        x: listx,
        y: listy
      }
      // 设置图标的图片(symbolPicUrl为图片地址)，宽，高
      let graphicSymbol = {
        type: 'picture-marker',
        url: icon,
        width: 30,
        height: 30
      }
      // 默认符号层  图层中添加d即添加对象信息，在点击图标时可以获取到d中的信息
      let graphic = new Graphic({
        geometry: pointGeometry,
        attributes: list,
        symbol: graphicSymbol
      })
      // graphic为构成图标图层，放入图层集合中
      graphics.push(graphic)
    },
    addGraphicShink () {
      loadModules([
        'esri/layers/FeatureLayer',
        'esri/layers/GraphicsLayer',
        'esri/Graphic',
        'esri/symbols/PictureMarkerSymbol'
      ]).then(([FeatureLayer, GraphicsLayer, Graphic, PictureMarkerSymbol]) => {
        console.log(this.$store.state.map)
        let cab = []
        let graphicMain = this.$store.state.map.layers.items.filter((item) => item['type'] === 'graphics' && item.id === 'blackStink')[0]
        console.log(graphicMain)
        let shankPoint = graphicMain.graphics.items.filter((itemList) => itemList.attributes.isCall === true)

        shankPoint.forEach((item, index) => {
          let feature = item.attributes
          let a1Gra = new Graphic({
            geometry: {
              type: 'point',
              longitude: feature.longitude,
              latitude: feature.latitude
            },
            // attributes: params.attributes,
            symbol: {
              type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
              color: [221, 22, 22, 0.5],
              size: 30,
              outline: { // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: [221, 22, 22, 0.8]
              }
            }
          })
          let a2Gra = new Graphic({
            geometry: {
              type: 'point',
              longitude: feature.longitude,
              latitude: feature.latitude
            },
            symbol: {
              type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
              color: [221, 22, 22, 0.5],
              size: 20,
              outline: { // autocasts as new SimpleLineSymbol()
                width: 0.5,
                color: [221, 22, 22, 0.8]
              }
            }
          })
          cab.push([a1Gra, a2Gra])
        })
        console.log(cab)
        if (cab.length > 0) {
          var layer = this.$store.state.map.findLayerById('blackStinkjinggao')
          if (layer != null) {
            layer.removeAll()
            cab.forEach(item => {
              layer.addMany(item)
              console.log(item)
              this.$store.state.map.add(layer, 0) // 将layer放入地图
              this.shinkGraphic({a1Gra: item[0], a2Gra: item[1]})
            })
          } else {
            layer = new GraphicsLayer({
              id: 'blackStinkjinggao'
            })
            cab.forEach(item => {
              layer.addMany(item)
              this.$store.state.map.add(layer, 0) // 将layer放入地图
              this.shinkGraphic({a1Gra: item[0], a2Gra: item[1]})
            })
          }
        }
      })
    },
    shinkGraphic (parmas) {
      if (this.$store.state.map.findLayerById('blackStinkjinggao')) {
        requestAnimationFrame(() => {
          let size = parmas.a1Gra.symbol.size == 0 ? (10) : parmas.a1Gra.symbol.size
          var symbol = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            color: [221, 22, 22, 0.5],
            size: size + (0.3),
            outline: { // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: [221, 22, 22, 0.8]
            }
          }
          let size2 = parmas.a2Gra.symbol.size == 0 ? (5) : parmas.a2Gra.symbol.size
          var symbol2 = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            color: [221, 22, 22, 0.5],
            size: size2 + (0.2),
            outline: { // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: [221, 22, 22, 0.8]
            }
          }
          // graphic1.setAttribute('symbol', symbol);
          parmas.a1Gra.symbol = symbol
          parmas.a2Gra.symbol = symbol2
          if (symbol.size < 45 || symbol2.size < 30) {
            // graphic1.symbol.size = 10;
            this.shinkGraphic({a1Gra: parmas.a1Gra, a2Gra: parmas.a2Gra})
          } else {
            parmas.a1Gra.symbol.size = 0
            parmas.a2Gra.symbol.size = 0
            this.shinkGraphic({a1Gra: parmas.a1Gra, a2Gra: parmas.a2Gra})
          }
        })
      }
    },
    removeLayer (id) {
      let airPointFeaLayer = this.$store.state.map.findLayerById(id)
      if (id === 'blackStink') {
        airPointFeaLayer.removeAll() // 清除原有图层
        this.addShinkStatus = false
        this.$store.state.map.findLayerById('blackStinkjinggao').removeAll()
      }
      if (id === 'detectedData4') {
        airPointFeaLayer.visible = false
      } else {
        airPointFeaLayer.removeAll() // 清除原有图层
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
