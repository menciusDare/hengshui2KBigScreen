
import http, {LoginHttp} from './http'

// getWaterInfoPollutantByParams
export const getWaterInfoPollutantByParams = (dateTime, regionCode) => {
  return http.get('/api/online-monitor-data-share/waterQueryInfo/getWaterInfoPollutantByParams', {dateTime, regionCode})
}
// 柱状图
// ///waterQueryInfo/getWaterQualityComplexEchartView
export const getWaterQualityComplexEchartView = (dateTime, regionCode) => {
  return http.get('/api/online-monitor-data-share/waterQueryInfo/getWaterQualityComplexEchartView', {dateTime, regionCode})
}
// 地图
export const getWaterInfoMapByParams = (dateTime, regionCode) => {
  return http.get('/api/online-monitor-data-share/waterQueryInfo/getWaterInfoMapByParams', {dateTime, regionCode})
}
// 区域看板处置利用率
export const getDisposalutilizationrate = (date, regionCode) => {
  return http.get('/api/regulatory/dpAreaBoard/boardEnterprise', {date, regionCode})
}
// 产废类型占比排行切换
export const getwasteswitch = (dataType, regionCode) => {
  return LoginHttp.post('/api/regulatory/hzardousDP/queryTypeByRegionCode', `dataType=${dataType}&&regionCode=${regionCode}`)
}
// 产废排行
export const getwasteranking = (regionCode) => {
  return LoginHttp.post('/api/regulatory/hzardousDP/selectRegionalProduction', `regionCode=${regionCode}`)
}
// 产废企业类型
export const getproctionleixing = (regionCode) => {
  return LoginHttp.post('/api/regulatory/hzardousDP/selectEntinfoGroupByCategory', `regionCode=${regionCode}`)
}
// 产废量/转运量统计
export const getwastetransfer = (date, regionCode, type) => {
  return http.get('/api/regulatory/dpAreaBoard/prodTransfer', {date, regionCode, type})
}
// 转运量/处置量统计
export const getwastechuzhi = (date, regionCode, type) => {
  return http.get('/api/regulatory/dpAreaBoard/prodWaste', {date, regionCode, type})
}
