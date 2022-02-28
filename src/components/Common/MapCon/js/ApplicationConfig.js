import {loadCss} from 'esri-loader'

var app_config = {
  appInfo: {
    title: '地表水质量在线监测系统', // 系统名称
    riverCode: '0800010000',
    // regionCode:"141182",
    regionCode: '421200',
    // regionName:"汾阳市",
    regionName: '咸宁市',
    pageSizes: [5, 10, 15, 20],
    pageSize: 10,
    IMG_URL: 'http://10.0.200.26/',
    airMonitorFront: 'http://218.241.184.18:8411/#/loginByToken?token=',
    taskSource: 3,
    openUrl: 'http://10.0.200.120:8412/#/loginByToken?token=',
    openWaterUrl: 'http://10.0.200.160:8413//#/loginByToken?token=',
    openWaterName: 'entName',
    openName: 'waterName',
    lankCode: 'a6ee7ad6785b4f0a96fc423558af254d', // 斧头湖编码

    // 跳转水源地
    waterSource: '&page=WaterSourceView',
    // 跳转重要湖库信息管理
    waterBasLakeInfo: '&page=WaterBasLakeInfo',
    // 跳转河流信息管理
    waterBasRiverInfo: '&page=WaterBasRiverInfo',
    // 跳转废水排污管理
    waterOutletList: '&page=waterOutletList'
  },
  // 数据报表
  dataExport: {
    monitorData: {
      labels: '站点名称,监测时间,',
      values: 'stationName,monitorTime,'
    }
  },
  authInfo: {
    username: 'talroad',
    password: 'talroad'
  },
  datas: {
    menus: []
  },
  arcGisUrl: {
    // loadServer:'http://10.0.200.201:8081/arcgis_js_api/library/4.11/esri/themes/light/main.css',//公司gis服务器
    // initServer: 'http://10.0.200.201:8081/arcgis_js_api/library/4.11/init.js',//公司gis服务器
    // river: 'http://10.0.200.201/server/rest/services/fenyang/River/MapServer/0',//公司gis河流服务器
    // xzqh: 'http://10.0.200.201/server/rest/services/fenyang/fenyang/MapServer/1',//公司gis服务器
    // fontsUrl: 'http://10.0.200.99:8423/arcgisFont',//公司
    fontsUrl: '/front/ArcGIS_Font/', // 公司
    // river: 'http://10.0.200.201/server/rest/services/fenyang/anshanghe/MapServer/0',//公司gis河流服务器
    loadServer: 'http://111.207.155.52:18081/arcgis_js_api/library/4.11/esri/themes/light/main.css', // 汾阳gis服务器
    initServer: 'http://111.207.155.52:18081/arcgis_js_api/library/4.11/init.js', // 汾阳gis服务器
    // river: 'http://111.207.155.52:9901/server/rest/services/fenyang/River/MapServer/0',//汾阳gis服务器
    river: 'http://10.0.200.201/server/rest/services/XianningWaterArea/MapServer/0', // 咸宁 河流 gis服务器
    // xzqh: 'http://111.207.155.52:9901/server/rest/services/fenyang/fenyang/MapServer/1',//汾阳gis服务器
    // xzqh: 'http://10.0.200.201/server/rest/services/XianNingRegion/MapServer/0'//咸宁gis服务器
    xzqh: 'http://111.207.155.52:9901/server/rest/services/HengShui/HengShuiXzqh/MapServer/0'// 临沂
    // fontsUrl: 'http://124.165.213.44:8203',//汾阳gis服务器
  },

  // 斧头湖配置
  axeLke: {
    // 监测点位类型 value都是断面ID
    monitorStationType_options: [
      {
        value: ['9999', 'bb8025c1152d41e2a4adf95sdsds45', '9996'],
        label: '全部'
      },
      {
        value: ['9999', 'bb8025c1152d41e2a4adf95sdsds45'],
        label: '湖心'
      },
      {
        value: ['9999', '9996'],
        label: '湖体'
      },
      {
        value: ['9999', '9996'],
        label: '入湖河流断面'
      },
      {
        value: ['9999', '9996'],
        label: '出湖河流断面'
      }

    ]
  }
}

// module.exports=app_config;
export default app_config
