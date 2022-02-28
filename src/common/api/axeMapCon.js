import http, {LoginHttp} from './http'

// 国省市 断面 controlLevelId --- 国省市,stationType --- 微站
export const loadingBoomListData = (controlLevelId, stationType) => {
  return LoginHttp.post('/api/talroad-water-control-diagnosis/tCodStation/getStationInfo', `controlLevelId=${controlLevelId}&stationType=${stationType}`)
}

// 工业企业、污水厂、垃圾填埋。
export const loadingWaterentErpriceData = (controlLevelId) => {
  return LoginHttp.post('/api/talroad-water-control-diagnosis/waterEnterprice/getWaterEnterprice', `type=${controlLevelId}`)
}

// 黑臭水体
export const loadingWatercodBlackWater = (riverCode) => {
  return http.get('/api/talroad-water-control-diagnosis/waterCodBlackWater/initAll', {riverCode})
}
// 视频
export const loadingvideo = () => {
  return http.get('/api/talroad-water-control-diagnosis/riverVideo/initAll')
}
// 水源地
export const loadingWaterBlood = (regionCode) => {
  return LoginHttp.post('/api/talroad-water-control-diagnosis/river/getWaterSourceAreaList', `regionCode=${regionCode}`)
}
// 河流水质
export const getRiverWaterQuality = (regionCode) => {
  return LoginHttp.post('/api/talroad-water-control-diagnosis/river/getRiverWaterQuality', `regionCode=${regionCode}`)
}
