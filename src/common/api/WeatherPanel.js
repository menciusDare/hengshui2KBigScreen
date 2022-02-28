import http, {LoginHttp} from './http'

// 获取天气
export const loadingBoomListData = (controlLevelId, stationType) => {
  return LoginHttp.post('/api/talroad-water-control-diagnosis/tCodStation/getStationInfo', `controlLevelId=${controlLevelId}&stationType=${stationType}`)
}
