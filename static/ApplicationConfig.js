var app_config = {
  appInfo: {
    title: '大屏展示', // 系统名称
    riverCode: '0800010000',
    // regionCode: '131100',
    regionCode: '371300',  
    regionName: '衡水市',
    pageSizes: [5, 10, 15, 20],
    pageSize: 10,
    IMG_URL: 'http://10.0.200.26/',
    airMonitorFront: 'http://218.241.184.18:8411/#/loginByToken?token=',
    taskSource: 3,
    openUrl: 'http://10.0.200.120:8412/#/loginByToken?token=',
    openWaterUrl: 'http://10.0.200.160:8413//#/loginByToken?token=',
    openWaterName: 'entName',
    openName: 'waterName',
    lankCode: 'a6ee7ad6785b4f0a96fc423558af254d'// 斧头湖编码
  },
  // 数据报表
  dataExport: {
    // monitorData:{
    //     labels:"站点名称,监测时间,",
    //     values:"stationName,monitorTime,",
    // },
  },
  authInfo: {
    // username: 'talroad',
    // password: 'talroad',
  },
  datas: {
    menus: []
  },
  arcGisUrl: {
    // loadServer:'http://10.0.200.201:8081/arcgis_js_api/library/4.11/esri/themes/light/main.css',//公司gis服务器
    // initServer: 'http://10.0.200.201:8081/arcgis_js_api/library/4.11/init.js',//公司gis服务器
    river: 'http://10.0.200.201/server/rest/services/fenyang/River/MapServer/0'// 公司gis河流服务器
    // xzqh: 'http://10.0.200.201/server/rest/services/fenyang/fenyang/MapServer/1',//公司gis服务器
    // fontsUrl: 'http://10.0.200.99:8423/arcgisFont',//公司
    // fontsUrl: '/arcgisFont',//公司
    // // river: 'http://10.0.200.201/server/rest/services/fenyang/anshanghe/MapServer/0',//公司gis河流服务器
    // loadServer:'http://111.207.155.52:18081/arcgis_js_api/library/4.11/esri/themes/light/main.css',//汾阳gis服务器
    // initServer: 'http://111.207.155.52:18081/arcgis_js_api/library/4.11/init.js',//汾阳gis服务器
    // // river: 'http://111.207.155.52:9901/server/rest/services/fenyang/River/MapServer/0',//汾阳gis服务器
    // river: 'http://10.0.200.201/server/rest/services/XianningWaterArea/MapServer/0',//咸宁 河流 gis服务器
    // // xzqh: 'http://111.207.155.52:9901/server/rest/services/fenyang/fenyang/MapServer/1',//汾阳gis服务器
    // xzqh: 'http://10.0.200.201/server/rest/services/XianNingRegion/MapServer/0'//咸宁gis服务器
    // fontsUrl: 'http://124.165.213.44:8203',//汾阳gis服务器
  },
  // 斧头湖配置
  axeLke: [
    {
      name: '湖心',
      id: 'huxin',
      liClass: '',
      apiParams: ['c32c96217d904fceaabf5214f8c0100', 'e83da9b9-2023-4ba4-8c6b-44354eeab368', 'c32c96217d904fceaabf5214f8c0234'],
      targetTabMain: {
        mubiao: 'Ⅰ类',
        state: '3类'
      }
    },
    {
      name: '湖体',
      id: 'huti',
      liClass: '',
      apiParams: ['e83da9b9-2023-4ba4-8c6b-44354eeab368'],
      targetTabMain: {
        mubiao: 'Ⅱ类',
        state: '36类'
      }
    },
    {
      name: '出入湖河流',
      id: 'churu',
      liClass: '',
      apiParams: ['c32c96217d904fceaabf5214f8c0234'],
      targetTabMain: {
        mubiao: 'Ⅲ类',
        state: '7类'
      }
    }
  ]

}

// module.exports=app_config;
export default app_config
