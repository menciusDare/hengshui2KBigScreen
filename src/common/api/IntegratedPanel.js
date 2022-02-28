import http, {LoginHttp} from './http'

// 国省市 断面 controlLevelId --- 国省市,stationType --- 微站
export const getAqiRanking = (areaCode, dateTime, stationType, type) => {
  return http.get('/api/online-monitor-data-share/rankingController/getAqiRanking', {areaCode, dateTime, stationType, type})
}
// 地表水质量变化趋势
export const changeTrendOfSurfaceWaterQuality = (areaCode) => {
  return http.get('/api/online-monitor-data-share/rankingController/changeTrendOfSurfaceWaterQuality', {areaCode})
}

/// rankingController/overallWater
export const overallWater = (areaCode, dateTime) => {
  return http.get('/api/online-monitor-data-share/rankingController/overallWater', {areaCode, dateTime})
}

// 综合看板污染源趋势
export const pollutantTrends = (areaCode, type, dateType) => {
  return http.get('/api/online-monitor-data-share/rankingController/pollutantTrends', {areaCode, type, dateType})
}

// 协同管控 - getAssessmentRanking
export const getAssessmentRanking = (taskSource) => {
  return http.get('/api/online-monitor-data-share/taskInfo/getAssessmentRanking', {taskSource})
}
// getCollaborativeControlByDept

export const getCollaborativeControlByDept = (taskSource) => {
  return http.get('/api/online-monitor-data-share/taskInfo/getCollaborativeControlByDept', {taskSource})
}

// getUnsolvedProblemByDept
export const getUnsolvedProblemByDept = (taskSource) => {
  return http.get('/api/online-monitor-data-share/taskInfo/getUnsolvedProblemByDept', {taskSource})
}
