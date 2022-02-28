import http, {LoginHttp} from './http'

// getWaterInfoPollutantByParams
export const getWaterBasReachRealData = (pollutantCode, pollutantCodes, stationId) => {
  return LoginHttp.post('/loginApi/waterdiagnosis/waterBasReach/getWaterBasReachRealData', `pollutantCode=${pollutantCode}&pollutantCodes=${pollutantCodes}&stationId=${stationId}`)
}

// getHistoryAlarm

export const getHistoryAlarm = (stationId, pageNum, pageSize) => {
  return LoginHttp.post('/loginApi/waterdiagnosis/tCodStation/getHistoryAlarm', `stationId=${stationId}&pageNum=${pageNum}&pageSize=${pageSize}`)
}
// getStationDetail

export const getStationDetail = (stationId) => {
  return LoginHttp.post('/loginApi/waterdiagnosis/tCodStation/getStationDetail', `stationId=${stationId}`)
}
// station/detail
export const getdetail = (id) => {
  return http.get('/aircontrol/airdiagnosis/api/station/detail', {id})
}
// airdiagnosis/api/monitorData/todayTrend/typelist
export const typelist = (stationId) => {
  return http.get('/aircontrol/airdiagnosis/api/monitorData/todayTrend/typelist', {stationId})
}
/// api/alarmData/list
export const alarmDatalist = (stationId) => {
  return http.get('/aircontrol/airdiagnosis/api/alarmData/list', {stationId})
}
