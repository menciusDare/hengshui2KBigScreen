export const timeFmtNext = (time, n, fmt) => {
  const timestamp = new Date(time || new Date()).getTime()
  const date = new Date(timestamp + n * 24 * 3600 * 1000)
  return timeFmt(date, fmt)
}
export const timeFmt = (time, fmt) => {
  const date = new Date(time)
  const value = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in value) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (value[k]) : (('00' + value[k]).substr(('' + value[k]).length)))
    }
  }
  return fmt
}

export const C_TIME = {
  Y: 'YYYY',
  M: 'YYYY-MM',
  D: 'YYYY-MM-DD',
  H: 'YYYY-MM-DD HH',
  m: 'YYYY-MM-DD HH:mm',
  s: 'YYYY/MM/DD \n HH:mm:ss',
  q: 0, // 季度
  S: 0// 毫秒
}
