import appConfig from './ApplicationConfig.js'
// 基础配置项
export default {
  center: [115.843987,37.759061], // 衡水
  zoom: 9,
  // 底图服务
  baseMapService: {
    // 彩色版
    'ChinaOnlineCommunity': {
      'url': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
      'thumbnailUrl': 'images/toggle/ChinaOnlineCommunity.jpg',
      'type': 'TileLayer',
      'title': 'ChinaOnlineCommunity'
    },
    // 暖色版
    'ChinaOnlineStreetWarm': {
      'url': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer',
      'thumbnailUrl': 'images/toggle/ChinaOnlineStreetWarm.jpg',
      'type': 'TileLayer',
      'title': 'ChinaOnlineStreetWarm'
    },
    // 蓝黑版
    'ChinaOnlineStreetPurplishBlue': {
      'url': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
      'thumbnailUrl': 'images/toggle/ChinaOnlineStreetPurplishBlue.jpg',
      'type': 'TileLayer',
      'title': 'ChinaOnlineStreetPurplishBlue'
    },
    // 灰色版
    'ChinaOnlineStreetGray': {
      'url': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer',
      'thumbnailUrl': 'images/toggle/ChinaOnlineStreetGray.jpg',
      'type': 'TileLayer',
      'title': 'ChinaOnlineStreetGray'
    },
    // 英文版
    'ChinaOnlineCommunityOnlyENG': {
      'url': 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunityOnlyENG/MapServer',
      'thumbnailUrl': 'images/toggle/ChinaOnlineCommunityOnlyENG.jpg',
      'type': 'TileLayer',
      'title': 'ChinaOnlineCommunityOnlyENG'
    },
    // Esri影像
    'WorldImageryMapOnline': {
      'url': 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
      'thumbnailUrl': 'app/widgets/BaseMapWidget/images/yx_2.png',
      'type': 'TileLayer',
      'title': 'WorldImageryMapOnline'
    },
    // Esri地形图
    'WorldTerrainMapOnline': {
      'url': 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer',
      'thumbnailUrl': 'app/widgets/BaseMapWidget/images/dx_1.png',
      'type': 'TileLayer',
      'title': 'WorldTerrainMapOnline'
    }
  },
  // 咸宁地图背景 图层
  layerInfo: [
    {
      title: '行政区划',
      id: 'xzqh',
      // url: 'http://10.0.200.201/server/rest/services/fenyang/fenyang/MapServer/1',
      url: appConfig.arcGisUrl.xzqh,
      show: true,
      renderer: {
        type: 'simple', // autocasts as new UniqueValueRenderer()
        symbol: {
          type: 'simple-fill', // autocasts as new SimpleFillSymbol()
          color: [62, 65, 172, 0.2],
          fillOpacity: 0.2,
          // color: '#95eed4',
          // color: [43, 0, 29, 0],
          style: 'solid',
          outline: { // autocasts as new SimpleLineSymbol()
            color: [62, 65, 172, 1],
            // color: '#95eed4',
            width: 1
          }
        }
      }
    }
  ],
  defaultPointMarkersymbol: {
    type: 'simple-marker',
    style: 'circle',
    color: 'blue',
    size: '8px',
    outline: {
      color: [255, 255, 0],
      width: 3
    }
  },
  defaultPointPictureSymbol: {
    type: 'picture-marker',
    url: '../assets/images/ico01.png',
    width: '64px',
    height: '64px'
  },
  defaultLineSymbol: {
    type: 'simple-line',
    color: 'lightblue',
    width: '2px',
    style: 'solid'
  },
  defaultFillSymbol: {
    type: 'simple-fill',
    color: [51, 51, 204, 0.9],
    style: 'solid',
    outline: {
      color: 'white',
      width: 1
    }
  },
  highlightPointMarkersymbol: {
    type: 'simple-marker',
    style: 'circle',
    color: 'blue',
    size: '8px',
    outline: {
      color: [255, 25, 0],
      width: 3
    }
  },
  highlightPointPictureSymbol: {
    type: 'picture-marker',
    url: '../assets/images/ico01.png',
    width: '64px',
    height: '64px'
  },
  highlightLineSymbol: {
    type: 'simple-line',
    color: 'lightblue',
    width: '2px',
    style: 'solid'
  },
  highlightFillSymbol: {
    type: 'simple-fill',
    color: [251, 51, 204, 0.9],
    style: 'solid',
    outline: {
      color: 'white',
      width: 1
    }
  }
}
