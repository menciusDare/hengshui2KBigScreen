export function getCurrentTime () {
  let dt = new Date()
  let y = dt.getFullYear()
  let m = dt.getMonth() + 1
  let d = dt.getDate()
  let hh = dt.getHours()
  let mm = dt.getMinutes()
  let ss = dt.getSeconds()
  m < 9 ? m = '0' + m : m
  hh < 9 ? m = '0' + hh : hh
  return `${y} / ${m} / ${d} ${hh}:${mm}`
}

export function getCurrentDate () {
  let dt = new Date()
  let y = dt.getFullYear()
  let m = dt.getMonth() + 1
  let d = dt.getDate()
  let hh = dt.getHours()
  let mm = dt.getMinutes()
  let ss = dt.getSeconds()
  m < 10 ? m = '0' + m : m
  hh < 10 ? m = '0' + hh : hh
  ss < 10 ? ss = '0' + ss : ss
  return `${hh}:${mm}:${ss}`
}
