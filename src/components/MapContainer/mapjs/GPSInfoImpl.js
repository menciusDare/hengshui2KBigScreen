import axios from 'axios'
import {dataRequestUrl, dataReqBaseUrl} from '../mapjs/AppConfig'

export default {
  getGPSInfoList: function (url, params, callBack) {
    var FunDwGetCheList = []
    axios.get(url, { params: params}
    ).then(function (response) {
      response = response.substring(0, response.length)
      response = response.substring(1, response.length - 1)
      let p_Wy = JSON.parse(response).z3
      let params = {
        p_Wy: p_Wy,
        p_strTj: '',
        p_iFs: 0
      }
      axios.get(dataRequestUrl.options.gpsListInfo.FunDwGetZu, {params: params}
      ).then(function (response) {
        response = response.substring(0, response.length)
        response = response.substring(1, response.length - 1)
        let FunDwGetZu = JSON.parse(response)
        for (let i = 0; i < FunDwGetZu.length; i++) {
          FunDwGetZu[i].zuId = FunDwGetZu[i].ZuId
          FunDwGetZu[i].name = FunDwGetZu[i].Name
          FunDwGetZu[i].cheNum = FunDwGetZu[i].CheNum
          FunDwGetZu[i].pwy = p_Wy
        }
        let params = {
          list: FunDwGetZu
        }
        $.ajax({
          type: 'POST',
          url: dataReqBaseUrl + '/api/zhdkj/getFunDwGetOne',
          data: JSON.stringify(params),
          contentType: 'application/json',
          dataType: 'json', // 返回浏览器的数据类型，指定是json格式，前端这里才可以解析json数据
          success: function (data) {
            callBack(data.data)
          }
        })
      })
    }).catch(function (error) {
      console.log(error)
    })
  }

}
