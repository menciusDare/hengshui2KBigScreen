
import http, {LoginHttp} from './http'

// 右侧面板图表接口

//  产废量实时汇总
export const getProdWasteByParams = (regionCode) => {
  return http.get('/api/regulatory/Daping/prodWaste', {regionCode})
}

//  转移量实时汇总
export const getTransferByParams = (regionCode) => {
  return http.get('/api/regulatory/Daping/transfer', {regionCode})
}

//  实时库存量
export const getStorageByParams = (regionCode) => {
  return http.get('/api/regulatory/Daping/storage', {regionCode})
}
// 库存危废占比
export const getProportionByParams = (regionCode) => {
  return http.get('/api/regulatory/Daping/proportion', {regionCode})
}

// 企业监控实况、累计实时总量统计 数据接口
export const getQueryInOutInformationByParams = (regionCode, page = 1, size = 10) => {
  return http.post('/api/regulatory/hzardousDP/queryInOutInformationByRegionCode', `regionCode=${regionCode}&page=${page}&size=${size}`)
}

// 企业基本信息
export const getDPEnterpriseInfo = (id = 381) => {
  return http.get('/api/regulatory/DPEnterpriseInfo/' + id)
}

// 产废情况对比
export const getDPMonitoringDpwaste = (id = 381) => {
  return http.get('/api/regulatory/DPMonitoring/dpwaste', {id})
}

// 产废折线图
export const getDPMonitoringDpbroken = (id = 381) => {
  return http.get('/api/regulatory/DPMonitoring/dpbroken', {id})
}

/**
 * 弹窗图表类型接口
 */

// 企业台账-图表接口
export const getselectentErpriseSSBook = (entId = 381, limit = 10, page = 1) => {
  return http.get('/api/regulatory/hzardousDP/selectentErpriseSSBook', {entId, limit, page})
}

// 贮存设施-图表接口
export const getEntContaineGroup = (entId = 381) => {
  return http.get('/api/regulatory/hzardousDP/getEntContaineGroup/' + entId)
}
// 五联单记录-图表接口
export const getselectTFiveLinkedPage = (entId = 237, limit = 10, page = 1) => {
  return http.get('/api/regulatory/hzardousDP/selectTFiveLinkedPage', {entId, limit, page})
}

export const queryVideoList = (entId = 237, type = 1) => {
  // return http.get('/api/regulatory/hzardousDP/queryVideoList', {entId,type});
  return http.get('/api/regulatory/hzardousDP/queryVideoList?entId=' + entId + '&type=1', {})
}

// 获取转运实况数据 /regulatory/Daping/fiveList
export const getRegulatoryList = (regionCode) => {
  return http.get('/api/regulatory/Daping/fiveList', {regionCode})
}
