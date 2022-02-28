/**
 * 网络请求 axios
 */

import Axios from 'axios'

const C_API = {
  HOST_PATH: ``,
  TIMEOUT: 15000
}

const code = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址不存在',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未部署或正在部署中',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持'
}

/**
 *  服务端返回的数据统一格式
 *  {
 *    status: 0,
 *    msg: '开发人员调试可见的消息提示',
 *    notice: '用户可见的消息提示',
 *    data: {},
 *  }
 */
const httpResponse = (resp) => {
  if (resp.status === 200) {
    const data = resp.data
    /* 根据自身后端返回数据格式做处理 */
    if (data.code === 0 || resp.status === 200) {
      return data
    }
    return {
      status: data.status,
      url: resp.config.url,
      notice: data.notice,
      msg: data.msg
    }
    /******/
  } else {
    return Promise.reject(resp)
  }
}

const httpCatch = (error) => {
  if (error.response && error.response.data) {
    return {
      status: error.response.status,
      url: error.config.url,
      notice: error.response.data.notice,
      msg: code[error.response.status] || error.message
    }
  } else {
    return {
      status: null,
      notice: '网络错误',
      msg: error.message
    }
  }
}

class HTTP {
  constructor (host, timeout, config) {
    this._agent = Axios.create({
      baseURL: host,
      timeout,
      ...config
    })
  }

  // 动态设置自定义请求头
  setHeader = (key, value) => {
    if (!key || !value) return
    this._agent.defaults.headers.common[key] = value
  };

  // 移除多余请求头
  removeHeader = (key) => {
    if (!key) return
    delete this._agent.defaults.headers.common[key]
  };

  get = (url, params = {}) => this._agent.get(url, { params }).then(httpResponse).catch(httpCatch);

  post = (uri, params) => this._agent.post(uri, params).then(httpResponse).catch(httpCatch);

  put = (uri, params) => this._agent.put(uri, params).then(httpResponse).catch(httpCatch);

  patch = (uri, params) => this._agent.patch(uri, params).then(httpResponse).catch(httpCatch);

  delete = (uri, params) => this._agent.delete(uri, params).then(httpResponse).catch(httpCatch);
}

const http = new HTTP(
  C_API.HOST_PATH,
  C_API.TIMEOUT,
  {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODg2NjY2NjY2NiIsInJvbGVJZCI6MywidXNlcklkIjo3NSwiYXV0aG9yaXRpZXMiOlsiMyJdLCJjbGllbnRfaWQiOiJ0YWxyb2FkIiwicmVnaW9uSWQiOjEsInBob25lIjoiMTg4NjY2NjY2NjYiLCJwZXJzb25uZWxUeXBlIjowLCJzY29wZSI6WyJzZXJ2ZXIiXSwidW5pdElkIjoxLCJleHAiOjE1NzQ4NDIxOTAsImp0aSI6ImI5MWI4MmVkLTRmZWMtNDlmMi05YTM1LTNiODAyYzMzNGZjMCIsInVzZXJuYW1lIjoiMTg4NjY2NjY2NjYifQ.w3g-Sv45RPeBRfU13ucQ2PrcoiBTAXKWhEuE7Pj794Q'
    }
  }
)
export default http
const LoginHttp = new HTTP(
  C_API.HOST_PATH,
  C_API.TIMEOUT,
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      // 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiIxODg2NjY2NjY2NiIsInJvbGVJZCI6MywidXNlcklkIjo3NSwiYXV0aG9yaXRpZXMiOlsiMyJdLCJjbGllbnRfaWQiOiJ0YWxyb2FkIiwicmVnaW9uSWQiOjEsInBob25lIjoiMTg4NjY2NjY2NjYiLCJwZXJzb25uZWxUeXBlIjowLCJzY29wZSI6WyJzZXJ2ZXIiXSwidW5pdElkIjoxLCJleHAiOjE1NzQ4NDIxOTAsImp0aSI6ImI5MWI4MmVkLTRmZWMtNDlmMi05YTM1LTNiODAyYzMzNGZjMCIsInVzZXJuYW1lIjoiMTg4NjY2NjY2NjYifQ.w3g-Sv45RPeBRfU13ucQ2PrcoiBTAXKWhEuE7Pj794Q'
    }
  }
)
export { LoginHttp }
