/*
 * 基础配置信息
 */
const http = 'http://'
const https = 'https://'
// 需要配置的 ----start -----
// 配置底图的地址
export const baseMapUrl = 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer'
// export const baseMapUrl = 'http://10.0.200.201/server/rest/services/fenyang/fenyang/MapServer/0'
export const chinaXzqhUrl = 'http://huanbao106.arcgisonline.cn/arcgis/rest/services/china/china/MapServer/0'

//* ****************汾阳行政区划初始范围设置
// export const mapCenter = [111.755, 37.311]
// export const mapZoom = 11
// export const mapXzqhUrl ='http://111.207.155.52:9901/server/rest/services/fenyang/fenyang/MapServer/1'
// export const mapXzqhUrl ='http://10.0.200.201/server/rest/services/fenyang/fenyang/MapServer/1'
// export const mapXzqhUrl ='http://huanbao106.arcgisonline.cn/arcgis/rest/services/fenyang/fengyang/MapServer/1'

// *************古冶行政区划初始范围设置
export const mapCenter = [112.921864, 35.647921]
export const mapZoom = 10
export const mapXzqhUrl = 'http://111.207.155.52:9901/server/rest/services/jincheng/MapServer/0 '
// export const mapXzqhUrl ='http://10.0.200.201/server/rest/services/guye/guye/MapServer/0'
// export const mapXzqhUrl ='http://124.205.245.106/arcgis/rest/services/guye/guye/MapServer/0'
export const qsMapXzqhUrl = 'http://111.207.155.52:9901/server/rest/services/qinshuixianbianjie/MapServer/0'

// 需要配置的 ---- end -----
// 后台程序访问地址
export const dataReqBaseUrl = '/aircontrol/airdiagnosis' // 使用代理
export const dataSendUrl = '/aircontrol'
export const taskSendUrl = '/third'
export const datacloudurl = '/gis'
export const basSendUrl = '/bas'
export const gpsSendUrl = '/gps/'

let dataRequestUrl = {}
dataRequestUrl.options = {
  // 雷达图片数据污染云图数据设置
  // 'radarImageUrl':"http://localhost/lidarResult/current/PMT027/PMT027.png",
  // 'radarExtentUrl':"http://localhost/lidarResult/current/PMT027/PMT027.txt",
  // 'radarImageUrl':datacloudurl+"/lidar/lidarResult/20191203/PMT027/PMT027_2019120301.png",
  // 'radarExtentUrl':datacloudurl+"/lidar/lidarResult/20191203/PMT027/PMT027_2019120301.txt",
  // 'radarHisImageUrl':"http://localhost/lidarResult/",
  'radarImageUrl': datacloudurl + '/lidar/lidarResult/current/PMT061/PMT061.png',
  'radarExtentUrl': datacloudurl + '/lidar/lidarResult/current/PMT061/PMT061.txt',
  'radarHisImageUrl': datacloudurl + '/lidar/lidarResult/',
  'radarTypeList': ['PMT061'],
  // 'radarwkid':3857,
  // 污染云图数据设置
  // 'pollution_cloudImageUrl':"http://localhost/wrytresult/current/",
  // 'pollutionhis_cloudImageUrl':"http://localhost/wrytresult/",
  // 汾阳云图范围
  'pollution_cloudExtentUrl': {xmin: 111.934148115, ymin: 35.18735391, xmax: 113.61960204, ymax: 36.067486125, spatialReference: {wkid: 4326}},
  // 古冶云图范围
  // 'pollution_cloudExtentUrl':{xmin: 13172553.669300, ymin: 4807203.347400, xmax: 13200222.462700, ymax: 4839860.848600,spatialReference:{wkid:3857}},
  'pollution_cloudImageUrl': datacloudurl + '/jingcheng/wrytresultly/current/',
  'pollutionhis_cloudImageUrl': datacloudurl + '/jingcheng/wrytresultly/',
  // 风场数据设置
  'windImageUrl': datacloudurl + '/wind/windresult/',
  // 'windImageUrl':'http://localhost/windresult/',
  // aqi及6因子分级标准
  'airLevelInfo': {
    'aqi': [[0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 1000]],
    'pm25': [[0, 35], [36, 75], [76, 115], [116, 150], [151, 250], [251, 1000]],
    'pm10': [[0, 50], [51, 150], [151, 250], [251, 350], [351, 420], [421, 1000]],
    'co': [[0, 5], [6, 10], [11, 35], [36, 60], [61, 90], [91, 10000]],
    'no2': [[0, 100], [101, 200], [201, 700], [701, 1200], [1201, 2340], [2341, 30000]],
    'so2': [[0, 150], [151, 500], [501, 650], [651, 800], [801, 1600], [1601, 20000]],
    'o3': [[0, 100], [101, 160], [161, 215], [216, 265], [266, 800], [801, 10000]],
    'tsp': [[0, 100], [101, 160], [161, 215], [216, 265], [266, 800], [801, 1000]]
  },
  // 污染事件
  'wrsjListInfo': {
    'getWrsjList': dataSendUrl + '/event/external/event/selectPollutansEventInfo', // 污染事件请求接口
    'getPollutionSource_statistics': dataReqBaseUrl + '/api/station/entCountStatistics', // 污染源分布统计
    'queryFields': [
      {
        name: 'OBJECTID',
        alias: 'ID',
        type: 'oid'
      },
      {
        name: 'id',
        alias: '编号',
        type: 'integer'
      },
      {
        name: 'createTime',
        alias: '创建时间',
        type: 'string'
      },
      {
        name: 'problemTypeName',
        alias: '污染类型名称',
        type: 'string'
      },
      {
        name: 'eventDescName',
        alias: '事件描述',
        type: 'string'
      },
      {
        name: 'remark',
        alias: '备注',
        type: 'string'
      },
      {
        name: 'status',
        alias: '状态',
        type: 'integer'
      },
      {
        name: 'username',
        alias: '用户名',
        type: 'string'
      },
      {
        name: 'gridName',
        alias: '网格名称',
        type: 'string'
      },
      {
        name: 'longitude',
        alias: '经度',
        type: 'double'
      },
      {
        name: 'latitude',
        alias: '纬度',
        type: 'double'
      },
      {
        name: 'eventName',
        alias: '事件名称',
        type: 'string'
      },
      {
        name: 'stationTypeId',
        alias: 'stationTypeId',
        type: 'string'
      }
    ],
    'renderInfo': {
      renderField: 'eventName',
      type: 'simple',
      defaultSymbol: {
        type: 'picture-marker',
        width: '24px',
        height: '24px',
        xoffset: 20
      }
    }
  },
  // 站点信息
  'stationListInfo': {
    'sendstation_paicha': taskSendUrl + '/task/external/task/addScreeningTask', // 发送站点排查数据
    'sendstation_guankong': taskSendUrl + '/task/external/task/addControlsTask', // 发送站点管控数据
    'getDepartmentList': taskSendUrl + '/base/sysDept/combox', // 获取部门列表数据
    'getexhaust': dataReqBaseUrl + '/api/pollutant/outlet', // 废气排放口数据
    'getpollutant': dataReqBaseUrl + '/api/pollutant/list', // 污染源种类
    'close_warm': dataReqBaseUrl + '/api/alarmData/cancel', // 报警信息-取消警报
    'getStation_info_guokong': dataReqBaseUrl + '/api/station/detail', // 站点信息-站点详情-国控/省控/市控/微型
    'getMeasureList': dataReqBaseUrl + '/api/measure/list', // 整改措施-措施列表
    'getStation_info_wuranyuan': dataReqBaseUrl + '/api/station/pollutionDetail', // 站点信息-站点详情-污染源
    'getStation_info_yangchen': dataReqBaseUrl + '/api/station/dustDetail', // 站点信息-站点详情-扬尘
    'getStation_type': dataReqBaseUrl + '/api/stationType/list', // 站点类型-查询站点类型列表
    'getStation_warm_realtime': dataReqBaseUrl + '/api/alarmData/realtime', // 站点信息-站点实时报警
    'getStation_warm_history': dataReqBaseUrl + '/api/alarmData/list', // 报警信息-站点报警记录
    'getStation_wry_history': dataReqBaseUrl + '/api/alarmData/wryHistoryAlarm', // 报警信息-站点报警记录
    'getStationList': dataReqBaseUrl + '/api/station/list', // 站点列表-国控/省控/市控/微型
    'gettoday_trend_gssw': dataReqBaseUrl + '/api/monitorData/todayTrend/typelist', // 今日趋势-国控/省控/市控/微型
    'gettoday_trend_w': dataReqBaseUrl + '/api/monitorData/todayTrend/entlist', // 今日趋势-污染源
    'gettoday_trend_wHistory': dataReqBaseUrl + '/api/monitorData/todayTrend/historyEntlist', // 今日趋势-污染源-历史数据
    'gettoday_trend_y': dataReqBaseUrl + '/api/monitorData/todayTrend/dustlist', // 今日趋势-扬尘
    'getContaminantList': dataReqBaseUrl + '/api/station/entlist', // 站点列表-污染源
    // 第一个配置为唯一值字段，根据查询条件返回站点列表信息来配置上图图层的字段信息
    'history24HoursDataList': dataReqBaseUrl + '/api/playdata/station/hourlist', // 历史24小时数据
    'history30DaysDataList': dataReqBaseUrl + '/api/playdata/station/daylist', // 历史30天数据
    'queryFields': [
      {
        name: 'OBJECTID',
        alias: 'ID',
        type: 'oid'
      },
      {
        name: 'stationId',
        alias: '站点编号',
        type: 'string'
      },
      {
        name: 'stationName',
        alias: '站点名称',
        type: 'string'
      },
      {
        name: 'longitude',
        alias: '经度',
        type: 'double'
      },
      {
        name: 'latitude',
        alias: '纬度',
        type: 'double'
      },
      {
        name: 'aqi',
        alias: 'aqi',
        type: 'double'
      },
      {
        name: 'pm25',
        alias: 'pm25',
        type: 'double'
      },
      {
        name: 'pm10',
        alias: 'pm10',
        type: 'double'
      },
      {
        name: 'so2',
        alias: 'so2',
        type: 'double'
      },
      {
        name: 'no2',
        alias: 'no2',
        type: 'double'
      },
      {
        name: 'co',
        alias: 'co',
        type: 'double'
      },
      {
        name: 'o3',
        alias: 'o3',
        type: 'double'
      },
      {
        name: 'aqiisover',
        alias: 'aqiisover',
        type: 'double'
      },
      {
        name: 'pm25isover',
        alias: 'pm25isover',
        type: 'double'
      },
      {
        name: 'pm10isover',
        alias: 'pm10isover',
        type: 'double'
      },
      {
        name: 'so2isover',
        alias: 'so2isover',
        type: 'double'
      },
      {
        name: 'no2isover',
        alias: 'no2isover',
        type: 'double'
      },
      {
        name: 'coisover',
        alias: 'coisover',
        type: 'double'
      },
      {
        name: 'o3isover',
        alias: 'o3isover',
        type: 'double'
      },
      {
        name: 'stationTypeId',
        alias: 'stationTypeId',
        type: 'integer'
      },
      {
        name: 'day',
        alias: 'day',
        type: 'string'
      },
      {
        name: 'hour',
        alias: 'hour',
        type: 'string'
      },
      {
        name: 'alarmStatus',
        alias: '报警状态',
        type: 'integer'
      }
    ],
    'renderInfo': {
      renderField: 'aqi',
      type: 'unique-value',
      defaultSymbol: {
        type: 'picture-marker',
        width: '36px',
        height: '27px',
        xoffset: 20
      }
    }
  },
  'entStationListInfo': {
    'getEntStationList': dataReqBaseUrl + '/api/station/entlist', // 站点列表-污染源
    'getSourceKind': dataReqBaseUrl + '/api/stationType/enttypelist', // 站点类型-污染源类型
    'history24HoursDataList': dataReqBaseUrl + '/api/playdata/pollution/hourlist', // 历史24小时数据
    'history30DaysDataList': dataReqBaseUrl + '/api/playdata/pollution/daylist', // 历史30天数据
    'queryFields': [
      {
        name: 'OBJECTID',
        alias: 'ID',
        type: 'oid'
      },
      {
        name: 'stationId',
        alias: '站点编号',
        type: 'string'
      },
      {
        name: 'stationName',
        alias: '站点名称',
        type: 'string'
      },
      {
        name: 'longitude',
        alias: '经度',
        type: 'double'
      },
      {
        name: 'latitude',
        alias: '纬度',
        type: 'double'
      },
      {
        name: 'entType',
        alias: '污染源类型',
        type: 'string'
      },
      {
        name: 'stationTypeId',
        alias: 'stationTypeId',
        type: 'integer'
      },
      {
        name: 'day',
        alias: 'day',
        type: 'string'
      },
      {
        name: 'hour',
        alias: 'hour',
        type: 'string'
      },
      {
        name: 'alarmStatus',
        alias: '报警状态',
        type: 'integer'
      },
      {
        name: 'isover',
        alias: '达标状态',
        type: 'integer'
      }
    ],
    'renderInfo': {
      renderField: 'isover',
      type: 'unique-value',
      defaultSymbol: {
        type: 'picture-marker',
        width: '24px',
        height: '24px',
        xoffset: 20
      }
    },
    'renderInfo_source': {
      renderField: 'status',
      type: 'unique-value',
      defaultSymbol: {
        type: 'picture-marker',
        width: '24px',
        height: '24px',
        xoffset: 20
      }
    }
  },
  'dustStationListInfo': {
    'getDustStationList': dataReqBaseUrl + '/api/station/dustlist', // 站点列表-扬尘
    'history24HoursDataList': dataReqBaseUrl + '/api/playdata/dust/hourlist', // 历史24小时数据
    'history30DaysDataList': dataReqBaseUrl + '/api/playdata/dust/daylist', // 历史30天数据
    'queryFields': [
      {
        name: 'OBJECTID',
        alias: 'ID',
        type: 'oid'
      },
      {
        name: 'stationId',
        alias: '站点编号',
        type: 'string'
      },
      {
        name: 'stationName',
        alias: '站点名称',
        type: 'string'
      },
      {
        name: 'longitude',
        alias: '经度',
        type: 'double'
      },
      {
        name: 'latitude',
        alias: '纬度',
        type: 'double'
      },
      {
        name: 'aqi',
        alias: 'aqi',
        type: 'double'
      },
      {
        name: 'pm25',
        alias: 'pm25',
        type: 'double'
      },
      {
        name: 'pm10',
        alias: 'pm10',
        type: 'double'
      },
      {
        name: 'so2',
        alias: 'so2',
        type: 'double'
      },
      {
        name: 'no2',
        alias: 'no2',
        type: 'double'
      },
      {
        name: 'co',
        alias: 'co',
        type: 'double'
      },
      {
        name: 'o3',
        alias: 'o3',
        type: 'double'
      },
      {
        name: 'aqiisover',
        alias: 'aqiisover',
        type: 'double'
      },
      {
        name: 'pm25isover',
        alias: 'pm25isover',
        type: 'double'
      },
      {
        name: 'pm10isover',
        alias: 'pm10isover',
        type: 'double'
      },
      {
        name: 'so2isover',
        alias: 'so2isover',
        type: 'double'
      },
      {
        name: 'no2isover',
        alias: 'no2isover',
        type: 'double'
      },
      {
        name: 'coisover',
        alias: 'coisover',
        type: 'double'
      },
      {
        name: 'o3isover',
        alias: 'o3isover',
        type: 'double'
      },
      {
        name: 'stationTypeId',
        alias: 'stationTypeId',
        type: 'integer'
      },
      {
        name: 'day',
        alias: 'day',
        type: 'string'
      },
      {
        name: 'hour',
        alias: 'hour',
        type: 'string'
      },
      {
        name: 'alarmStatus',
        alias: '报警状态',
        type: 'integer'
      }
    ],
    'renderInfo': {
      renderField: 'aqi',
      type: 'unique-value',
      defaultSymbol: {
        type: 'picture-marker',
        width: '36px',
        height: '27px',
        xoffset: 20
      }
    }
  },
  'gpsListInfo': {
    'FunDengLu': gpsSendUrl + 'FunDengLu',
    'FunDwGetZu': gpsSendUrl + 'FunDwGetZu',
    'FunDwGetChe': gpsSendUrl + 'FunDwGetChe',
    'FunDwGetOne': gpsSendUrl + 'FunDwGetOne'

  }
  // let layersRequest = esriRequest('/windField/windResult/'+new Date().format("yyyyMMdd")+'/'+new Date().format("yyyyMMddhh")+'.json', {
}
export {dataRequestUrl}
