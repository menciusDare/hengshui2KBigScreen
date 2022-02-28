import http from './http'
export const queryStationList = (params) => {
  return http.get('/api/airGis/api/base/queryStationList', params)
}

export const getlist = (params) => {
  return http.get('/api/airGis/api/station/list', params)
}
