/*
    封装地图的核心功能，
    1、地图视图创建；*
    2、返回地图和视图*
    3、图层添加（切片、动态、要素和wms、wmts）和删除*
    4、创建Graphics并将其添加至GraphicsLayer *
    5、图层显示开关*
    6、图层渲染方法
    7、图层属性查询
    8、图层空间查询
    9、图层弹框显示
    10、图层多窗口标注
    11、图例面板定制和显示
    12、要素高亮*
    13、地图放大、缩小*
    14、回到初始范围-地图初始化*
    15、底图切换*
    17、三维切换
    18、时态播放
    19、数值标注
    20、业务接口获取的数组对象格式化成features
*/
import {
  loadModules
} from 'esri-loader'
import config from './mapConfig'
import appConfig from './ApplicationConfig.js'
import {mapState} from 'vuex'
import $store from '@/store/index'
export const WaterMap = {
  view: null,
  map: null
}

// 图层类型枚举
export const LayerType = {
  'ArcGISDynamic': 'MapImageLayer',
  'ArcGISTile': 'TileLayer',
  'ClusterLayer': 'ClusterLayer',
  'CSVLayer': 'CSVLayer',
  'FeatureLayer': 'FeatureLayer',
  'GraphicsLayer': 'GraphicsLayer',
  'WFSLayer': 'WFSLayer',
  'WMSLayer': 'WMSLayer',
  'WMTSLayer': 'WMTSLayer'
}
// 空间关系类型
export const spatialRelType = {
  'CONTAINS': 'esriSpatialRelContains',
  'CROSS': 'esriSpatialRelCrosses',
  'INTERSECTS': 'esriSpatialRelIntersects',
  'OVERLAPS': 'esriSpatialRelOverlaps',
  'TOUCHES': 'esriSpatialRelTouches',
  'WITHIN': 'esriSpatialRelWithin'
}
// 距离单位
export const units = {
  'KILOMETERS': 'kilometer',
  'METERS': 'meters',
  'SQUARE_KILOMETERS': 'square_kilometers',
  'SQUARE_METERS': 'square_meters'
}

/* 创建地图对象，并且增加底图，设置好冒泡窗口
 * divId是装载地图的div容器id
 * mapOptions是地图初始化参数，json格式
 *      center是初始化地图中心点
 *      zoom是初始化地图的缩放级别
 * callback是地图创建以后的回调函数
 */
export const createMap = (mapOptions, callback) => {
  loadModules([
    'esri/Basemap',
    'esri/Map',
    'esri/layers/TileLayer',
    'esri/views/MapView',
    'esri/views/SceneView',
    'esri/views/ui/DefaultUI',
    'esri/layers/WebTileLayer',
    'esri/config'
  ], {
    css: true
  })
    .then(([Basemap,
      Map,
      TileLayer,
      MapView,
      SceneView,
      DefaultUI,
      WebTileLayer,
      esriConfig
    ]) => {
      esriConfig.fontsUrl = appConfig.arcGisUrl.fontsUrl
      const baselayer = new TileLayer({
        url: config.baseMapService['ChinaOnlineStreetPurplishBlue'].url
      })
      const basemap = new Basemap({
        baseLayers: [baselayer],
        title: '蓝黑底图',
        id: 'myBlackBlueBasemap'
      })
      WaterMap.map = new Map({
        basemap: basemap
      })
      WaterMap.view = new MapView({
        container: mapOptions.containerId || 'viewDiv',
        map: WaterMap.map,
        center: mapOptions.center || config.center,
        zoom: mapOptions.center || config.zoom
      })
      // debugger
      var _this = this
      $store.state.map = WaterMap.map
      $store.state.mapView = WaterMap.view
      console.log($store.state.mapView)
      WaterMap.view.ui.empty('top-left')
      WaterMap.view.ui.empty('bottom-trailing')
      WaterMap.view.ui.remove('attribution')
      WaterMap.view.when(callback)
    })
}
// 获取地图对象
export function GetView () {
  return WaterMap.view
}
// 获取地图对象
export function GetMap () {
  return WaterMap.map
}

// 添加图层
export function addLayer (opts, callback) {
  if (WaterMap.map) {
    // 判断地图类型
    switch (opts.type) {
      case 'MapImageLayer':
        addDynamicLayer(opts, callback)
        break
      case 'TileLayer': // arcgis瓦片服务
        addTileLayer(opts, callback)
        break
      case 'WFSLayer':
        addWMSLayer(opts, callback)
        break
      case 'WMTSLayer':
        addWMTSLayer(opts, callback)
        break
      case 'FeatureLayer':
        addFeatureLayer(opts, callback)
        break
      case 'GraphicsLayer':
        addGraphicsLayer(opts, callback)
        break
      default:
        // mapevent && mapevent.remove();
        // mapevent = null;
        errorHandler({
          message: '图层类型错误'
        })
        callback && callback({
          status: 'error',
          message: '图层类型错误'
        })
    }
  }
}

/* 增加WMS图层
 *  opts: 增加图层的参数
 *     -layerid:图层的标识
 *     -url: 图层服务地址
 *     -resourceInfo: resourceInfo对象
 */
function addWMSLayer (opts, callback) {
  loadModules(['esri/layers/WMSLayer']).then(([WMSLayer]) => {
    var wmsLayer = null
    if (IsLayerToEmpty(opts.layerid)) {
      wmsLayer = FindLayer(opts.layerid)
    } else {
      wmsLayer = new WMSLayer(opts.url, {
        resourceInfo: opts.resourceInfo
      })

      if (opts.layerid != null || opts.layerid != undefined) {
        wmsLayer.id = opts.layerid
      }
      if (opts.index) { WaterMap.map.add(wmsLayer, index) } else { WaterMap.map.add(wmsLayer) }
    }
  }).catch(err => {
    errorHandler({
      message: '添加wms服务失败',
      error: err
    })
  })
}
/********************************************************/
/********************************************************/
/* 增加WMTS图层
 *  opts: 增加图层的参数
 *     -layerid:图层的标识
 *     -url: 图层服务地址
 *     -resourceInfo:WMTS图层的资源信息
 *     -serviceMode:服务的类型，KVP或者RESTful
 */
function addWMTSLayer (opts, callback) {
  loadModules(['esri/layers/WMTSLayer']).then(([WMTSLayer]) => {
    var wmtsLayer = null
    if (IsLayerToEmpty(opts.layerid)) {
      wmtsLayer = FindLayer(opts.layerid)
    } else if (opts.url && opts.layerid) {
      wmtsLayer = new WMTSLayer(opts.url, {
        resourceInfo: opts.resourceInfo,
        serviceMode: opts.serviceMode || 'RESTful'
      })
      if (opts.layerid != null || opts.layerid != undefined) {
        wmtsLayer.id = opts.layerid
      }
      WaterMap.map.add(wmtsLayer)
    }
  }).catch(err => {
    errorHandler({
      message: '添加wmts服务失败',
      error: err
    })
  })
}
/********************************************************/
/* 增加动态图层
 *  opts: 增加图层的参数
 *     -layerid:图层的标识
 *     -url: 图层服务地址
 *     -minScale: 图层显示的最小比例尺
 *     -maxScale: 图层显示的最大比例尺
 */
function addDynamicLayer (opts, callback) {
  loadModules(['esri/layers/MapImageLayer']).then(([MapImageLayer]) => {
    var arcgisDynamic = null
    if (IsLayerToEmpty(opts.layerid)) {
      arcgisDynamic = FindLayer(opts.layerid)
    } else {
      arcgisDynamic = new MapImageLayer(opts.url)
      if (opts.minScale) {
        arcgisDynamic.minScale = opts.minScale
      }
      if (opts.maxScale) {
        arcgisDynamic.maxScale = opts.maxScale
      }
      if (opts.layerid) {
        arcgisDynamic.id = opts.layerid
      }
      if (opts.index) { WaterMap.map.add(arcgisDynamic, index) } else { WaterMap.map.add(arcgisDynamic) }
    }
  }).catch(err => {
    errorHandler({
      message: '添加动态服务失败',
      error: err
    })
  })
}
/********************************************************/

/* 增加切片图层
 *  opts: 增加图层的参数
 *     -layerid:图层的标识
 *     -url: 图层服务地址
 *     -minScale: 图层显示的最小比例尺
 *     -maxScale: 图层显示的最大比例尺
 */
function addTileLayer (opts, callback) {
  loadModules(['esri/layers/TileLayer']).then(([TileLayer]) => {
    var arcgisTiled = null
    if (IsLayerToEmpty(opts.layerid)) {
      arcgisTiled = FindLayer(opts.layerid)
    } else {
      arcgisTiled = new TileLayer(opts.url)
      if (opts.minScale != null || opts.minScale != undefined) {
        arcgisTiled.minScale = opts.minScale
      }
      if (opts.layerid != null || opts.layerid != undefined) {
        arcgisTiled.id = opts.layerid
      }
      if (opts.index) { WaterMap.map.add(arcgisTiled, index) } else { WaterMap.map.add(arcgisTiled) }
    }
    arcgisTiled.when(callback)
  }).catch(err => {
    errorHandler({
      message: '添加切片图层失败',
      error: err
    })
  })
}

/* 增加要素图层
 *  opts: 增加图层的参数
 *     -layerid:图层的标识
 *     -url: 图层服务地址
 *     -minScale: 图层显示的最小比例尺
 *     -maxScale: 图层显示的最大比例尺
 *     -featureCollection: 图层的要素集合
 *            -layerDefinition: 图层的定义信息
 *            -featureSet: 要素集合
 */
function addFeatureLayer (opts, callback) {
  loadModules([
    'esri/layers/FeatureLayer',
    'esri/config'
  ]).then(([
    FeatureLayer,
    esriConfig
  ]) => {
    esriConfig.fontsUrl = appConfig.arcGisUrl.fontsUrl

    var featureLayer = null
    if (IsLayerToEmpty(opts.layerid)) {
      featureLayer = FindLayer(opts.layerid)
    } else {
      if (opts.url !== null && opts.url !== undefined && opts.url !== '') {
        featureLayer = new FeatureLayer({
          url: opts.url,
          id: opts.layerid,
          outFields: ['*']
        })
      } else if (opts.source && opts.objectid) {
        featureLayer = new FeatureLayer({
          source: opts.source,
          id: opts.layerid,
          objectIdField: opts.objectid,
          fields: opts.fields,
          outFields: ['*']
        })
      }
      if (opts.index) { WaterMap.map.add(featureLayer, index) } else { WaterMap.map.add(featureLayer) }
    }
    featureLayer.when(callback)
  }).catch(err => {
    errorHandler({
      message: '添加要素图层失败',
      error: err
    })
  })
}
export function addFeatureLayerHeat (opts, callback) {
  loadModules([
    'esri/layers/FeatureLayer',
    'esri/config'
  ]).then(([
    FeatureLayer,
    esriConfig
  ]) => {
    esriConfig.fontsUrl = appConfig.arcGisUrl.fontsUrl
    var featureLayer = null
    if (IsLayerToEmpty(opts.layerid)) {
      WaterMap.map.remove(FindLayer(opts.layerid))
    }
    featureLayer = new FeatureLayer(opts)
    if (opts.index) { WaterMap.map.add(featureLayer, index) } else { WaterMap.map.add(featureLayer, 2) }
  }).catch(err => {
    errorHandler({
      message: '添加要素图层失败',
      error: err
    })
  })
}

/* 增加绘图图层
 *  opts: 增加图层的参数
 *  -layerid:图层的标识
 */
function addGraphicsLayer (opts, callback) {
  loadModules(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
    var graphicLayer = null
    if (IsLayerToEmpty(opts.layerid)) {
      graphicLayer = FindLayer(opts.layerid)
      graphicLayer.removeAll()
    } else {
      graphicLayer = new GraphicsLayer({
        id: opts.layerid
      })
      if (opts.index) { WaterMap.map.add(graphicLayer, opts.index) } else { WaterMap.map.add(graphicLayer) }
    }
    graphicLayer.when(callback)
  }).catch(err => {
    errorHandler({
      message: '添加graphicslayer失败',
      error: err
    })
  })
}
/* 创建Graphics并将其添加至GraphicsLayer
* params：要添加的layer信息
* -coords：geo数据的坐标，例如：点[[110,48]],线[[-111.30, 52.68],[-98, 49.5],[-93.94, 29.89]]，面[[-64.78, 32.3],[-66.07, 18.45],[-80.21, 25.78],[-64.78, 32.3]]
* -attributes：数据的属性表，例如：{Name: "Keystone Pipeline",Owner: "TransCanada"}
* -symbol：符号
* id：GraphicsLayer的id
 */
export function addGraphicsToGraphicsLayer (params, id) {
  loadModules(['esri/Graphic']).then(([Graphic]) => {
    // console.log(id, params)
    var geo = null
    if (params.coords.length <= 1) {
      geo = {
        type: 'point', // autocasts as new Point()
        longitude: params.coords[0][0],
        latitude: params.coords[0][1]
      }
    } else {
      if (params.coords[0] == params.coords[params.coords.length - 1]) {
        geo = {
          type: 'polygon', // autocasts as new Polygon()
          rings: params.coords
        }
      } else {
        geo = {
          type: 'polyline', // autocasts as new Polygon()
          paths: params.coords
        }
      }
    }
    var graphic = new Graphic({
      geometry: geo,
      symbol: params.symbol,
      attributes: params.attributes
    })

    // 添加至GraphicsLayer
    if (IsLayerToEmpty(id)) {
      var slayer = FindLayer(id)
      // console.log(id)
      slayer.add(graphic)
    } else {
      errorHandler({
        message: '地图上没有该GraphicsLayer'
      })
    }
  }).catch(err => {
    errorHandler({
      message: '创建Graphics失败',
      error: err
    })
  })
}
/* 移除图层 */
export function removeLayer (layerid) {
  if (IsLayerToEmpty(layerid)) {
    var slayer = FindLayer(layerid)
    WaterMap.map.remove(slayer)
  } else {
    errorHandler({
      message: '地图上没有该图层'
    })
  }
}
/* 图层显示开关
* layerid：图层的id
*/
export function switchLayerShow (layerid) {
  if (IsLayerToEmpty(layerid)) {
    var slayer = FindLayer(layerid)
    slayer.visible = !slayer.visible
  } else {
    errorHandler({
      message: '地图上没有该图层'
    })
  }
}
// 全局查询，污染源名称、监测站名称
// export function FindGlobalFeatureByName(name) {
//   let p = new Promise((resolve, reject) => {
//     let featureSet = null;
//     loadModules([
//       "esri/layers/FeatureLayer",
//       "esri/tasks/support/Query"
//     ])
//       .then(([FeatureLayer, Query]) => {
//         console.log(name)
//         if (name.length > 0) {
//           const layer = new FeatureLayer({
//             url: config.layerInfo[0].url + "/3", //
//             outFields: ["*"]
//           });
//           console.log(layer.queryFeatures)
//           const query = new Query();
//           query.where = "ENNM like '%" + name + "%'";
//           query.outSpatialReference = {
//             wkid: 102100
//           };
//           query.returnGeometry = true;
//           query.outFields = ["*"];
//
//           layer.queryFeatures(query).then(function (results) {
//             console.log("关键字查询", results.features);
//             featureSet = results.features;
//             resolve(featureSet);
//           }, function (err) {
//             reject(err);
//           });
//
//         }
//
//       });
//
//   });
//
//   return p;
//
// }
export function FindGlobalFeatureByName (name) {
  let p = new Promise((resolve, reject) => {
    let featureSet = null
    loadModules([
      'esri/layers/FeatureLayer',
      'esri/tasks/support/Query'
    ])
      .then(([FeatureLayer, Query]) => {
        console.log(FeatureLayer, Query)
        console.log(name)
        if (name.length > 0) {
          const layer = new FeatureLayer({
            url: config.layerInfo[0].url + '/3', //
            outFields: ['*']
          })
          console.log(layer.queryFeatures)
          const query = new Query()
          query.where = "ENNM like '%" + name + "%'"
          query.outSpatialReference = {
            wkid: 102100
          }
          query.returnGeometry = true
          query.outFields = ['*']

          layer.queryFeatures(query).then(function (results) {
            console.log('关键字查询', results.features)
            featureSet = results.features
            resolve(featureSet)
          }, function (err) {
            reject(err)
          })
        }
      })
  })

  return p
}
/* 高亮要素
 *	params: 参数对象
 *	-graphics: 要闪烁的graphic数组
 *  -layerid:  添加到的图层id
 */
export function Highlight (params) {
  var features = params.features
  var hlayer = FindLayer(params.layerid)
  hlayer && hlayer.removeAll()
  if (!hlayer) {
    errorHandler({
      message: '没有找到高亮图层',
      error: err
    })
    return
  }
  loadModules([
    'esri/Graphic',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/PictureMarkerSymbol'
  ]).then(([Graphic, SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol, PictureMarkerSymbol]) => {
    if (features && features.length > 0) {
      let graphics = []
      for (let i = 0; i < features.length; i++) {
        let sym = null
        switch (features[i].geometry.type) {
          case 'point':
            sym = config.highlightPointMarkersymbol
            break
          case 'line':
            sym = config.highlightLineSymbol
            break
          case 'polygon':
            sym = config.highlightFillSymbol
            break
          default:
            break
        }
        let g = new Graphic({
          geometry: features[i].geometry,
          symbol: sym

        })
        graphics.push(g)
        hlayer && hlayer.addMany(graphics)
      }
    } else {
      errorHandler({
        message: '没有提供要高亮的图形数据'
      })
    }
  }).catch(err => {
    errorHandler({
      message: '高亮要素异常',
      error: err
    })
  })
}
// 显示点位高亮
export function queryStation () {

}

// 判断图层是否为空
export function IsLayerToEmpty (layerid) {
  // console.log("layerid",WaterMap.map.findLayerById(layerid))
  var flag = false
  if (WaterMap.map.findLayerById(layerid)) {
    flag = true
  } else {
    flag = false
  }
  return flag
}

// 查找图层
export function FindLayer (id) {
  var layer = null
  try {
    layer = WaterMap.map && WaterMap.map.findLayerById(id)
  } catch (e) {
    // TODO handle the exception
    errorHandler({
      message: '查找图层失败',
      error: e
    })
    return null
  }
  return layer
}
/* 地图放大缩小
* level：为1或者-1，分别为放大和缩小
*/
export function changeMapLevel (level) {
  var zoom = WaterMap.view.zoom + level
  WaterMap.view.zoom = zoom
}
/* 回到初始范围-地图初始化 */
export function homeExtent () {
  WaterMap.view.zoom = config.zoom
  WaterMap.view.center = config.center
}
/* 底图切换
* type：config中baseMapService的底图的key值
*/
export function changeBasemap (type) {
  loadModules([
    'esri/Basemap',
    'esri/layers/TileLayer'
  ], {
    css: true
  })
    .then(([Basemap,
      TileLayer
    ]) => {
      const baselayer = new TileLayer({
        url: config.baseMapService[type].url
      })
      const basemap = new Basemap({
        baseLayers: [baselayer]
      })
      WaterMap.map.basemap = basemap
    })
}

/*
* 从数据接口获取的数组对象创建为要素对象的数组
*/
export function conver2FeaturesFromArray (params) {
  let p = new Promise((resolve, reject) => {

  })
  return p
}

/*
点要素闪烁
params:
{
  map:地图对象
  layerid:GraphicsLayer的id
  x:x坐标
  y:y坐标
  outerSize:外圆的初始大小
  innerSize:内圆的初始大小
  outerFillColor:外圆的填充颜色
  outerOutlineColor:外圆的轮廓线颜色
  innerFillColor: 内圆的填充颜色
  innerOutlineColor: 内圆的轮廓线颜色

}
*/
export function shrinkPoint (params) {
  let map = params.map || WaterMap.map
  let glayer = map.findLayerById(params.layerid)
  console.log(glayer)
  loadModules([
    'esri/Graphic'
  ], {
    css: true
  }).then(([Graphic]) => {
    let graphic1 = new Graphic({
      geometry: {
        x: params.x || 117,
        y: params.y || 34,
        type: 'point'
      },
      symbol: {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: params.outerFillColor || [255, 25, 0, 0.2],
        size: params.outerSize || 10,
        outline: { // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: params.outerOutlineColor || [255, 25, 0, 0.3]
        }
      }
    })
    let graphic2 = new Graphic({
      geometry: {
        x: params.x || 117,
        y: params.y || 34,
        type: 'point'
      },
      symbol: {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: params.innerFillColor || [255, 255, 0, 0.4],
        size: params.innerSize || 5,
        outline: { // autocasts as new SimpleLineSymbol()
          width: 0.5,
          color: params.innerOutlineColor || [255, 255, 0, 0.5]
        }
      }
    })
    console.log(graphic2)
    glayer.addMany([graphic1, graphic2])
    function shinkGraphic () {
      if (map.findLayerById(params.layerid)) {
        requestAnimationFrame(function () {
          let size = graphic1.symbol.size == 0 ? (params.outerSize || 10) : graphic1.symbol.size
          let symbol = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            color: params.outerFillColor || [255, 25, 0, 0.2],
            size: size + (params.outerStep || 0.3),
            outline: { // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: params.outerOutlineColor || [255, 25, 0, 0.4]
            }
          }
          let size2 = graphic2.symbol.size == 0 ? (params.innerSize || 5) : graphic2.symbol.size
          let symbol2 = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            color: params.innerFillColor || [255, 25, 0, 0.5],
            size: size2 + (params.innerStep || 0.2),
            outline: { // autocasts as new SimpleLineSymbol()
              width: 0.5,
              color: params.innerOutlineColor || [255, 25, 0, 0.6]
            }
          }

          // graphic1.setAttribute('symbol', symbol);
          graphic1.symbol = symbol
          graphic2.symbol = symbol2
          if (symbol.size < 45 || symbol2.size < 30) {
            // graphic1.symbol.size = 10;
            shinkGraphic()
          } else {
            graphic1.symbol.size = 0
            graphic2.symbol.size = 0
            shinkGraphic()
          }
        })
      }
    }
    shinkGraphic()
  })
}

/* 异常处理 */
function errorHandler (err) {
  err && err.message && console.log(err.message)
  err && err.error && console.log(err.error.stack)
}
