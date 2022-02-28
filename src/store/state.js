//
export default{
  show: true, // 用来对污染分析时进行组件间的互相通知，点击分析时，使勾选项全部置为空
  zoomwidget: null, // 自定义
  map: null, // 全局map
  mapview: null, // 全局mapview
  windObject: null, // 全局监听地图静止事件
  curBaseMapId: null, // 当前底图id
  wrsjTempTypeId: 'wrsjTempTypeId', // 污染事件临时typeid
  curRenderType: [], // 数值、名称渲染方式 namerender   numrender  默认为空
  allCheckLayerList: ['country', 'province', 'city', 'county'], // 所有选择的图层
  checkStationLayerList: [], // 勾选的国控、省控、市控、微型站
  selectFactor: 'aqi', // 当前选择的指标
  countryRealTimeDataList: [], // 国控实时数据列表
  provinceRealTimeDataList: [], // 省控实时数据列表
  cityRealTimeDataList: [], // 市控实时数据列表
  countyRealTimeDataList: [], // 微站实时数据列表
  wryRealTimeDataList: [], // 污染源实时数据列表
  ycRealTimeDataList: [], // 扬尘实时数据列表
  wrsjRealTimeDataList: [], // 污染事件实时数据列表
  realFreshTimer: null,
  popupPoint: '', // 设置当前选中的点的stationId和坐标，格式：stationId,lng,lat
  mapLoaded: false,
  highlight: null,
  mapRouteName: '', // 全局监听地图模块的路由变化
  stationtype: {// 站点类型列表
    'guokong': '',
    'shengkong': '',
    'shikong': '',
    'weixing': '',
    'wanranyuan': '',
    'yangchen': ''
  },
  PollutionSourceType: [], // 污染源类型
  PollutionSource: {
    map: null, // 污染全局map
    mapview: null, // 污染全局view
    pollutiontype: [], // 污染源总类型
    curRenderType: 0, // 显示状态 1-显示文字 0-不显示文字
    pullution_selectstatue: 'all', // 污染源选中状态  qualification  Excess  all  Offline
    pollution_selecttype: [], // 污染源选中类型
    mapLoaded: false
  },
  // 风场获取相关数据控制
  WindInformation: {
    block_show: false, // 模块化显示
    Wind_speed: 0, // 风速
    wind_direction: '无', // 风向
    wind_field: [] // 差值后的向量
  }
}
