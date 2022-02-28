import http, {LoginHttp} from './http'

// 国省市 断面 controlLevelId --- 国省市,stationType --- 微站
export const loadingBoomListData = (controlLevelId, stationType, dataTime) => {
  return LoginHttp.post('/api/talroad-water-control-diagnosis/tCodStation/getStationInfo', `controlLevelId=${controlLevelId}&stationType=${stationType}&dataTime=${dataTime}`)
}

// 排污企业
export const loadingEnterpriseListData = (dateTime, entName, entType, regionCode) => {
  return LoginHttp.get('/api/regulatory/hzardousDP/getEntDistributionList?dateTime=' + dateTime + '&entName=' + entName + '&entType=' + entType + '&regionCode=' + regionCode, `dateTime=${dateTime}&entName=${entName}&entType=${entType}&regionCode=${regionCode}`)
}
// 危废转移
export const loadingEntTransferListData = (dateTime, entName, entType, regionCode) => {
  return LoginHttp.get('/api/regulatory/hzardousDP/getEntTransferList', {dateTime, entName, entType, regionCode})
}
// 危废转移
export const getRegionChildrenList = (regionCode) => {
  return LoginHttp.get('/api/regulatory/regionInfo/getRegionChildrenList', {regionCode})
}

// 涉水工业企业、污水厂、畜禽养殖、农村小型污水处理设施。
export const loadingWaterentErpriceData = (controlLevelId) => {
  return LoginHttp.get('/api/talroad-water-control-diagnosis/waterEnterprice/getWaterEnterprice', `type=${controlLevelId}`)
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
// //河流水质
export const getRiverWaterQuality = (regionCode, dateTime, pollutantCode) => {
  return http.get('/api/online-monitor-data-share/waterQueryInfo/getRiverStatusByTime', {regionCode, dateTime, pollutantCode})
}
