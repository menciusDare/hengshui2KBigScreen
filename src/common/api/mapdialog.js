
import http, {LoginHttp} from './http'

// 右侧面板图表接口

//  产废量实时汇总
export const getProdWasteByParams = (regionCode) => {
  return http.get('/api/regulatory/Daping/prodWaste', {regionCode})
}

// 地图弹框
export const getmapdialog = (dataType, regionCode) => {
  return LoginHttp.post('/api/regulatory/hzardousDP/queryTypeByRegionCodeList', `dataType=${dataType}&regionCode=${regionCode}`)
}
//
export const getmapchild = (dataType, dicType, regionCode, typeTotal) => {
  return LoginHttp.post('/api/regulatory/hzardousDP/queryDetailsByRegionCodeList', `dataType=${dataType}&dicType=${dicType}&regionCode=${regionCode}&typeTotal=${typeTotal}`)
}
