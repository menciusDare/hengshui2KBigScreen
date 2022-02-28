
export default {
  // center: [111.8, 37.3],// 汾阳
  center: [125.64818800, 44.2552332], // 长春
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
  }
}
