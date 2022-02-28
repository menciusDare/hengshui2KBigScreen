import http, {LoginHttp} from './http'

// 空气柱状图的数据
export const getAQIStatistics = (day, regionCode) => {
  return LoginHttp.post('/api/online-monitor-data-share/airData/getAQIStatistics', `day=${day}&regionCode=${regionCode}`)
}

// 水的柱状图
export const getWaterQualityComplexEchartView = (dateTime, regionCode) => {
  return http.get('/api/online-monitor-data-share/waterQueryInfo/getWaterQualityComplexEchartView', {dateTime, regionCode})
}
