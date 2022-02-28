import http, {LoginHttp} from './http'

// 空气地图点位 筛选 aqi...
export const getMapStationList = (regionCode, dayTime, stationType, divisorType) => {
  return LoginHttp.post('/api/online-monitor-data-share/airStation/getMapStationList', `regionCode=${regionCode}&dayTime=${dayTime}&stationType=${stationType}&divisorType=${divisorType}`)
}
