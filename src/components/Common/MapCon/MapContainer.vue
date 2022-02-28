<template>
  <div id="viewDiv">
    <PopMain :params = "popParams" ref="popupWidgetDay" :type="type"></PopMain>
    <pophover :params = "popParams" ref="pophoveren" :type="type"></pophover>
  </div>
</template>

<script>
import config from './js/mapConfig.js'
import * as mapCore from './js/mapCore'
import mapCheckPanel from './js/mapCheckPanel'
import PopMain from './PopMain'
import pophover from './pophover'

import ysc from '../../../assets/img/ysc1.jpg'
import errorwarn from '../../../assets/img/errowarn.jpg'

import {getMapStationList} from '@/common/api/airFilterMapStations.js'
import {loadingEnterpriseListData, loadingEntTransferListData, loadingBoomListData, getRiverWaterQuality} from '@/common/api/WaterEnvironment'
let cMapVue
export default {
  name: 'MapContainer',
  components: {PopMain, pophover},
  props: {
    type: String,
    paramsTime: Object,
    changePanelParams: Object,
    mapLoadingSuccess: Function,
    mapList: Object,
    regionCode: String
  },
  data () {
    return {
      popParams: {
        name: 'cbbb',
        type: 'guo'
      },
      mapStationList: {
        isChange: true,
        data: []
      },
      cyaer: new Date().getFullYear().toString(),
      params: {},
      status: false,
      listIcon: {
        guo: 'type',
        sheng: 'type',
        shi: 'type',
        station: 'alarmStatus'
      },
      mapLoading: false,
      riverColor: {
        0: '#34C3F6',
        1: '#34C3F6',
        2: '#34C3F6',
        3: '#03FF03',
        4: '#FAFF19',
        5: '#FF9000',
        6: '#FE0000'
      }
    }
  },
  methods: {
    initMap () {
      let _this = this
      mapCore.createMap({
        containerId: 'viewDiv'
      }, function () {
        // console.log('view渲染成功')
        _this.mapLoading = true
        _this.$emit('mapLoadingSuccess', (true))
        _this.initLayer()
        _this.initViewClick()
        _this.$store.state.mapview = mapCore.GetView()
        _this.$store.state.map = mapCore.GetMap()
      })
    },
    /* 初始化默认图层 */
    initLayer () {
      // console.log('添加行政区域边界')
      let _self = this
      for (let i = 0; i < config.layerInfo.length; i++) {
        let value = config.layerInfo[i]
        value.renderer.symbol.color = [62, 65, 172, 0.2] // 填充颜色
        value.renderer.symbol.outline.color = [255, 255, 255, 1]// 行政区域 颜色
        _self.createFeatureLayer(value, function () {
          var layer = mapCore.GetMap().findLayerById(value.id)
          layer.renderer = value.renderer
        })
      }
      this.createGraphicLayer('ls', () => {})
      // 异常报警
      this.createGraphicLayer('errorWarn', () => {
        var parms = {
          coords: [[125.64818800, 44.2552332]],
          symbol: {
            type: 'simple-marker',
            color: [255, 0, 0],
            size: 26,
            outline: {
              width: 0,
              color: [255, 34, 34]
            }
          },
          attributes: {id: 1}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
        var parms = {
          coords: [[125.64818800, 44.2552332]],
          symbol: {
            type: 'text',
            color: 'rgba(0,25,24,1)',
            // haloColor: "black",
            // haloSize: "1px",
            text: '5',
            // xoffset: 3,
            yoffset: -8,
            font: { // autocasts as new Font()
              size: 25,
              family: 'Josefin Slab',
              weight: 'bold'
            }
          },
          attributes: {id: 100}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
        var parms = {
          coords: [[124.64818800, 44.2552332]],
          symbol: {
            type: 'simple-marker',
            color: [255, 0, 0],
            size: 26,
            outline: {
              width: 0,
              color: [255, 34, 34]
            }
          },
          attributes: {id: 1}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
        var parms = {
          coords: [[124.64818800, 44.2552332]],
          symbol: {
            type: 'text',
            color: 'rgba(0,25,24,1)',
            // haloColor: "black",
            // haloSize: "1px",
            text: '5',
            // xoffset: 3,
            yoffset: -8,
            font: { // autocasts as new Font()
              size: 25,
              family: 'Josefin Slab',
              weight: 'bold'
            }
          },
          attributes: {id: 100}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
        var parms = {
          coords: [[125.64818800, 43.4552332]],
          symbol: {
            type: 'simple-marker',
            color: [255, 0, 0],
            size: 26,
            outline: {
              width: 0,
              color: [255, 34, 34]
            }
          },
          attributes: {id: 1}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
        var parms = {
          coords: [[125.64818800, 43.4552332]],
          symbol: {
            type: 'text',
            color: 'rgba(0,25,24,1)',
            // haloColor: "black",
            // haloSize: "1px",
            text: '1',
            // xoffset: 3,
            yoffset: -8,
            font: { // autocasts as new Font()
              size: 25,
              family: 'Josefin Slab',
              weight: 'bold'
            }
          },
          attributes: {id: 100}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
        var parms = {
          coords: [[124.64818800, 44.0552332]],
          symbol: {
            type: 'simple-marker',
            color: [255, 0, 0],
            size: 26,
            outline: {
              width: 0,
              color: [255, 34, 34]
            }
          },
          attributes: {id: 1}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
        mapCore.FindLayer('errorWarn').visible = false
        var parms = {
          coords: [[124.64818800, 44.0552332]],
          symbol: {
            type: 'text',
            color: 'rgba(0,25,24,1)',
            // haloColor: "black",
            // haloSize: "1px",
            text: '1',
            // xoffset: 3,
            yoffset: -8,
            font: { // autocasts as new Font()
              size: 25,
              family: 'Josefin Slab',
              weight: 'bold'
            }
          },
          attributes: {id: 100}
        }
        mapCore.addGraphicsToGraphicsLayer(parms, 'errorWarn')
      })
      // 转运车辆
      // this.createGraphicLayer("transferTruck", () => {
      //   //[125.376562967041,43.88188100997033],[125.37793625805662,43.819241529373755],[125.40883530590818,43.82048010099163],[125.409521951416,43.823700266951555],[125.40420044873045,43.84153188733981],[125.40231217358397,43.84722697657234]
      //   // var parms1={
      //   //   coords:[[125.3791378876953,43.79681894188991],[125.37776459667967,43.933453424324064],[125.38600434277342,43.9383980697994],[125.38737763378904,44.01251841089369],[125.4120968720703,44.050037403612976]],
      //   //   symbol:{
      //   //     type: "simple-line",  // autocasts as SimpleLineSymbol()
      //   //     color: [226, 119, 40],
      //   //     width: 4
      //   //   },
      //   //   attributes:{id:2}
      //   // }
      //   // mapCore.addGraphicsToGraphicsLayer(parms1, "transferTruck")
      //   var parms2 = {
      //     coords: [[125.4120968720703, 44.050037403612976]],
      //     symbol: {
      //       type: "picture-marker",  // 车辆
      //       url: ysc,
      //       width: 20,
      //       height: 20
      //     },
      //     attributes: {id: 3}
      //   }
      //   mapCore.addGraphicsToGraphicsLayer(parms2, "transferTruck")
      //   var parms2 = {
      //     coords: [[125.3120968720703, 44.050037403612976]],
      //     symbol: {
      //       type: "picture-marker",  // 车辆
      //       url: ysc,
      //       width: 20,
      //       height: 20
      //     },
      //     attributes: {id: 3}
      //   }
      //   mapCore.addGraphicsToGraphicsLayer(parms2, "transferTruck")
      //   var parms2 = {
      //     coords: [[125.2120968720703, 44.150037403612976]],
      //     symbol: {
      //       type: "picture-marker",  // 车辆
      //       url: ysc,
      //       width: 20,
      //       height: 20
      //     },
      //     attributes: {id: 3}
      //   }
      //   mapCore.addGraphicsToGraphicsLayer(parms2, "transferTruck")
      //   var parms2 = {
      //     coords: [[125.4120968720703, 44.350037403612976]],
      //     symbol: {
      //       type: "picture-marker",  // 车辆
      //       url: ysc,
      //       width: 20,
      //       height: 20
      //     },
      //     attributes: {id: 3}
      //   }
      //   mapCore.addGraphicsToGraphicsLayer(parms2, "transferTruck")
      //   var parms2 = {
      //     coords: [[125.5120968720703, 44.450037403612976]],
      //     symbol: {
      //       type: "picture-marker",  // 车辆
      //       url: ysc,
      //       width: 20,
      //       height: 20
      //     },
      //     attributes: {id: 3}
      //   }
      //   mapCore.addGraphicsToGraphicsLayer(parms2, "transferTruck")
      //   mapCore.FindLayer("transferTruck").visible=false;
      // })
      // 产废企业
      this.createGraphicLayer('polluteEnterprise', () => {
        loadingEnterpriseListData(-1, -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap', true)
          _self.createGraphic(res.data)
          mapCore.FindLayer('polluteEnterprise').visible = false
        })
        loadingEnterpriseListData(_self.cyaer + '01', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap1', false)
        })
        loadingEnterpriseListData(_self.cyaer + '02', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap2', false)
        })
        loadingEnterpriseListData(_self.cyaer + '03', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap3', false)
        })
        loadingEnterpriseListData(_self.cyaer + '04', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap4', false)
        })
        loadingEnterpriseListData(_self.cyaer + '05', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap5', false)
        })
        loadingEnterpriseListData(_self.cyaer + '06', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap6', false)
        })
        loadingEnterpriseListData(_self.cyaer + '07', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap7', false)
        })
        loadingEnterpriseListData(_self.cyaer + '08', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap8', false)
        })
        loadingEnterpriseListData(_self.cyaer + '09', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap9', false)
        })
        loadingEnterpriseListData(_self.cyaer + '10', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap10', false)
        })
        loadingEnterpriseListData(_self.cyaer + '11', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap11', false)
        })
        loadingEnterpriseListData(_self.cyaer + '12', -1, 1, this.regionCode).then(res => {
          _self.createGraphicHeat(res.data, 'heatmap12', false)
        })
      })
      // 经营企业
      this.createGraphicLayer('produceEnterprise', () => {
        loadingEnterpriseListData(-1, -1, 2, this.regionCode).then(res => {
          _self.createGraphic1(res.data)
          mapCore.FindLayer('produceEnterprise').visible = false
        })
      })
    },
    resetRegionWRY (regeionCode) {
      var _self = this
      loadingEnterpriseListData(-1, -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap', mapCore.FindLayer('heatmap').visible)
        mapCore.FindLayer('polluteEnterprise').removeAll()
        _self.createGraphic(res.data)
      })
      loadingEnterpriseListData(_self.cyaer + '01', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap1', mapCore.FindLayer('heatmap1').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '02', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap2', mapCore.FindLayer('heatmap2').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '03', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap3', mapCore.FindLayer('heatmap3').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '04', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap4', mapCore.FindLayer('heatmap4').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '05', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap5', mapCore.FindLayer('heatmap5').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '06', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap6', mapCore.FindLayer('heatmap6').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '07', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap7', mapCore.FindLayer('heatmap7').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '08', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap8', mapCore.FindLayer('heatmap8').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '09', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap9', mapCore.FindLayer('heatmap9').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '10', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap10', mapCore.FindLayer('heatmap10').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '11', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap11', mapCore.FindLayer('heatmap11').visible)
      })
      loadingEnterpriseListData(_self.cyaer + '12', -1, 1, regeionCode).then(res => {
        _self.createGraphicHeat(res.data, 'heatmap12', mapCore.FindLayer('heatmap12').visible)
      })
      loadingEnterpriseListData(-1, -1, 2, regeionCode).then(res => {
        mapCore.FindLayer('produceEnterprise').removeAll()
        _self.createGraphic1(res.data)
      })
    },
    /* 创建 FeatureLayer */
    createFeatureLayer (value, callback) {
      mapCore.addLayer({
        layerid: value.id,
        url: value.url,
        source: value.source,
        objectid: 'id',
        type: 'FeatureLayer'
      }, callback)
    },
    createAirGra (type, id, layId) {
      console.log(this.paramsTime)
      const regionCode = this.AppConfig.appInfo.regionCode
      const dayTime = this.paramsTime.time
      const stationType = []
      const divisorType = id
      this.params = {
        layId: layId,
        type: type,
        id: id
      }
      let _this = this
      this.createGraphicLayer(layId, () => {
        this.mapStationList.data = []
        getMapStationList(regionCode, dayTime, stationType, divisorType).then(res => {
          _this.mapStationList.isChange = !_this.mapStationList.isChange
          _this.mapStationList.data = res.data
        })
      })
    },
    // / * 创建坐标点位*/
    createGraphic (data) {
      // ICONLIST
      // console.log(data)
      // let params =  this.listIcon[`${this.params.type}`][`${this.params.layId}`]
      // if (this.params.layId === 'waterStationCheck') {
      //   //console.log(this.params.layId)
      // }
      data.forEach(item => {
        // [][`${item[this.listIcon[this.params.layId]]}`]
        // //console.log(data, this.params.type, this.params.layId, this.ICONLIST.iconMain[`${this.params.layId}`],item[this.listIcon[this.params.layId]])

        if (
          item.lat != null &&
          item.lng != null &&
          item.lat != '' &&
          item.lng != '') {
          let attributes = item
          let imgurl = cMapVue.ICONLIST.iconMain['enterprise']['default']
          let gar = {
            coords: [
              [ item.lng, item.lat]
            ],
            attributes: attributes,
            symbol: {
              type: 'picture-marker',
              url: imgurl,
              width: '72px',
              height: '72px'
            }
          }
          mapCore.addGraphicsToGraphicsLayer(gar, 'polluteEnterprise')
        }
      })
    },
    // / * 创建坐标点位*/
    createGraphic1 (data) {
      // ICONLIST
      // console.log(data)
      // let params =  this.listIcon[`${this.params.type}`][`${this.params.layId}`]
      // if (this.params.layId === 'waterStationCheck') {
      //   //console.log(this.params.layId)
      // }
      data.forEach(item => {
        // [][`${item[this.listIcon[this.params.layId]]}`]
        // //console.log(data, this.params.type, this.params.layId, this.ICONLIST.iconMain[`${this.params.layId}`],item[this.listIcon[this.params.layId]])

        if (
          item.lat != null &&
          item.lng != null &&
          item.lat != '' &&
          item.lng != '') {
          let attributes = item
          let imgurl = cMapVue.ICONLIST.iconMain['enterprise']['jinying']
          let gar = {
            coords: [
              [ item.lng, item.lat]
            ],
            attributes: attributes,
            symbol: {
              type: 'picture-marker',
              url: imgurl,
              width: '72px',
              height: '72px'
            }
          }
          mapCore.addGraphicsToGraphicsLayer(gar, 'produceEnterprise')
        }
      })
    },
    // / * 创建坐标点位*/
    createGraphicHeat (data, layerid, visible) {
      let features = []
      data.forEach(item => {
        if (
          item.lat != null &&
          item.lng != null &&
          item.lat != '' &&
          item.lng != '') {
          features.push({
            geometry: {
              type: 'point',
              x: item.lng, // 经度
              y: item.lat, // 纬度
              spatialReference: '4326' // 坐标系
            },
            attributes: {
              ObjectID: item.id,
              crime_count: 10
            }
          })
        }
      })
      const renderer = {
        type: 'heatmap',
        colorStops: [
          { color: 'rgba(63, 40, 102, 0)', ratio: 0 },
          { color: '#00AFFF', ratio: 0.1 },
          { color: '#14B441', ratio: 0.3 },
          { color: '#FFFA00', ratio: 0.7 },
          { color: '#FF4600', ratio: 1 }
        ],
        maxPixelIntensity: 30,
        minPixelIntensity: 0
      }
      let featurelayerOpt = {
        geometryType: 'point',
        id: layerid,
        layerid: layerid,
        source: features,
        title: '热力图',
        fields: [{ name: 'ObjectID', alias: 'ObjectID', type: 'oid' }, { name: 'crime_count', alias: 'crime_count', type: 'integer' }],
        objectIdField: 'ObjectID',
        renderer: renderer,
        visible: visible
      }
      mapCore.addFeatureLayerHeat(featurelayerOpt)
    },
    /* 创建 GraphicLayer */
    createGraphicLayer (id, callback) {
      mapCore.addLayer({
        layerid: id,
        type: 'GraphicsLayer'
      }, callback)
    },
    /* 初始化view的click事件 */
    initViewClick () {
      this.$refs.popupWidgetDay.viewClick()
      this.$refs.pophoveren.viewClick()
    },
    // 创建 国省控的 图层 和点位
    createWaterStationCheck (type, id, layId) {
      // console.log('createWaterStationCheck', type, id)
      this.mapList.waterStationCheck.forEach(item => {
        this.createGraphicLayer(item, () => {
          // //console.log('创建layId', id)
          this.params = {
            layId: item,
            type: type,
            id: item
          }
          this.changeSECTION(item)
        })
      })
    },
    changeSECTION (id) {
      var parmas = {
        'guo': '1',
        'sheng': '2',
        'shi': '3',
        'common': '4',
        'fu': '',
        'gu': '',
        'wei': '3',
        'hei': ''
      }
      var parmas2 = {
        'guo': '0',
        'sheng': '0',
        'shi': '0',
        'common': '4',
        'fu': '2',
        'gu': '3',
        'wei': '1',
        'hei': '4'
      }
      this.mapStationList.data = []
      console.log(this.paramsTime)
      loadingBoomListData(parmas[id], parmas2[id], this.paramsTime.time).then(res => {
        this.mapStationList.isChange = !this.mapStationList.isChange
        this.mapStationList.data = res.data
      })
    },
    // 国控站 --- 省控站
    getWaterStationCheck () {
      mapCheckPanel.$on('waterStationCheck', (type, id, layId, isCheck) => {
        /// /console.log(isCheck, 'isCheck')
        if (isCheck) {
          this.createWaterStationCheck(type, id, layId)
        } else {
          this.removeLayer(id)
        }
      })
    },
    removeLayer (id) {
      // //console.log(id)
      let airPointFeaLayer = mapCore.GetMap().findLayerById(id)
      // //console.log(airPointFeaLayer)
      airPointFeaLayer.removeAll() // 清除原有图层
    },
    // 加载河流
    loadingRiver (type, id, layId) {
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
      let value = {url: 'http://10.0.200.201/server/rest/services/ChangChun/ChangChunBound/MapServer/0', id: layId}
      console.log(layId)
      let renderer = {
        type: 'unique-value', // autocasts as new UniqueValueRenderer()
        field: 'NAME',
        defaultSymbol: {
          type: 'simple-line',
          // color: '#1bbaf5',
          color: '#1bbaf5',
          width: '2px'
        }, // autocasts as new SimpleFillSymbol()
        uniqueValueInfos: [

        ]
      }
      this.createFeatureLayer(value, () => {
        var layer = mapCore.GetMap().findLayerById(layId)
        console.log(layer, value)
        let regionCode = this.app_config.appInfo.regionCode
        let dateTime = this.paramsTime.time
        let pollutantCode = id
        getRiverWaterQuality(regionCode, dateTime, pollutantCode).then(
          res => {
            let data = res.data ? res.data : res
            console.log(layer, layer.labelingInfo, layer.renderer)
            renderer.uniqueValueInfos = []
            for (let i = 0; i < data.length; i++) {
              console.log(data[i]['waterLevel'])
              let valueinfo = {
                value: data[i]['riverName'],
                symbol: {
                  type: 'simple-line', // autocasts as new SimpleLineSymbol()
                  color: this.riverColor[`${data[i]['waterLevel']}`],
                  width: '2px'
                }
              }
              console.log(valueinfo)
              renderer.uniqueValueInfos.push(valueinfo)
            }
            console.log(renderer.uniqueValueInfos, 'renderer.uniqueValueInfos')
            layer.renderer = renderer
            // layer.labelingInfo = [label]
          }
        )
      })
    }
  },
  watch: {
    'mapStationList.isChange': function () {
      // //console.log('createWaterStationCheck', this.mapStationList.data)
      // this.createGraphic(this.mapStationList.data)
      // this.createGraphicHeat(this.mapStationList.data)
    },
    'changePanelParams.isShow': function () {
      console.log(this.changePanelParams, '改变图层')
      if (this.changePanelParams.layId === 'waterStationCheck') {
        this.createWaterStationCheck(this.changePanelParams.type, this.changePanelParams.id, this.changePanelParams.layId)
        if (!this.changePanelParams.Status) {
          console.log('删除')
          this.removeLayer(this.changePanelParams.id)
        }
      } else if (this.changePanelParams.layId === 'station') {
        this.createAirGra(this.changePanelParams.type, this.changePanelParams.id, this.changePanelParams.layId)
      } else if (this.changePanelParams.layId === 'river') {
        this.loadingRiver(this.changePanelParams.type, this.changePanelParams.id, this.changePanelParams.layId)
      }
    },
    regionCode: function () {
      this.resetRegionWRY(this.regionCode)
    },
    type: function () {
      // if (mapCore.GetView()) {
      //   mapCore.GetView().container = null
      // }
      this.initMap()
      // new Promise((resolve, reject) => {
      //   mapCheckPanel.$emit('mapLoadingSuccess', (true), (resolve))
      // }).then((data) => { // 因为new Promise返回的就是一个promise对象实例，所以这里可以链式操作
      //   ////console.log(data)
      //   if (this.type === 'air') {
      //     this.getAmessage()
      //   }
      //   if (this.type === 'water') {
      //     ////console.log(this.type, "mapLoadingSuccess, mapLoadingSuccess")
      //     this.getWaterStationCheck()
      //   }
      // })
    },
    'paramsTime.isShow': function () {
      console.log(this.paramsTime.time)
      // this.getAmessage()
      // this.initMap()
      // if (this.type === 'air') {
      //   this.getAmessage()
      // }
      // if (this.type === 'water') {
      //   this.getWaterStationCheck()
      // }
    }
  },
  beforeDestroy () {
    if (mapCore.GetView()) {
      mapCore.GetView().container = null
    }
  },
  mounted () {
    cMapVue = this
    cMapVue.initMap()
    if (cMapVue.regionCode) {
      cMapVue.regionCode = cMapVue.AppConfig.appInfo.regionCode
    }
    // if (this.type === 'air') {
    //   this.getAmessage()
    // }
    // if (this.type === 'water') {
    //   this.getWaterStationCheck()
    // }
  }
}
</script>

<style>
#viewDiv{
  width: 100%;
  height: 100%;
  position: relative;
}

</style>
