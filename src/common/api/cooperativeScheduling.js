import http, {LoginHttp} from './http'

// 协同调度综合看版
export const getComprehensiveStatistics = () => {
  return http.get('/api/online-monitor-data-share/taskInfo/getComprehensiveStatistics')
}

// 协同人员任务量统计
export const getTaskCountStatistics = () => {
  return http.get('/api/online-monitor-data-share/taskInfo/getTaskCountStatistics')
}

// 当前协同任务
export const getCurrentTask = (currentPage, pageSize, taskSource) => {
  return http.get('/api/online-monitor-data-share/taskInfo/getCurrentTask?currentPage=' + currentPage + '&pageSize=' + pageSize + '&taskSource=' + taskSource)
}

// 超时事件
export const timeOutTask = (currentPage, pageSize) => {
  return http.get('/api/online-monitor-data-share/taskInfo/timeOutTask?currentPage=' + currentPage + '&pageSize=' + pageSize)
}

// 区域考核排名
export const getAssessmentRanking = (taskSource) => {
  return http.get('/api/online-monitor-data-share/taskInfo/getAssessmentRanking?taskSource=' + taskSource)
}

// 协同任务类型统计
export const getTaskTypeStatistics = () => {
  return http.get('/api/online-monitor-data-share/taskInfo/getTaskTypeStatistics')
}

// 综合看板-问题分布
export const getProblemDistribution = (taskSource) => {
  return http.get('/api/online-monitor-data-share/taskInfo/getProblemDistribution?taskSource=' + taskSource)
}

// 协同任务区域排名 getRankByRegion
export const getRankByRegion = () => {
  return http.get('/api/online-monitor-data-share/taskInfo/getRankByRegion')
}
