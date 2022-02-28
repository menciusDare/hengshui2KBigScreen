<template>
  <div class="mapMain waterEnvironMap rowFlex flexColumn">
    <div class="maptitlebg"></div>
    <div class="maptitle">
      <div style="margin-bottom: 34px" class="maptitlexie">衡水市固体（危险）废物全过程智慧监管平台</div>
    </div>
    <div class="flex1 mapShow" >
      <MapContainer
        :type="type"
        v-if="type"
        :mapList="mapList"
        :regionCode="regionCode"
        :paramsTime="paramsTime"
        @mapLoadingSuccess="mapLoadingSuccess"
        :changePanelParams="changePanelParams"
      ></MapContainer>
    </div>
    <div class="left1693 jcMain">
      <check-panel
        :paramsTime="paramsTime"
        :mapLoadingSuccessStatus="mapLoadingSuccessStatus"
        :type="type"
        :qxdata="qxdata"
        v-if="type"
        ref="checkPanelEl"
        @changePanel="changePanel"
        @changeItems="changeItems"
        @searchshow="searchshow"
        @closesearch="closesearch"
      ></check-panel>
    </div>
    <!-- 時間軸 -->
    <div
      class="timezhou"
      id="timeshow"
      style="height: 80px; width:1048px;"
      v-show="this.isShowTimeLine"
    ></div>
    <div class="protioninfo" @click="protionshow()">统计分析</div>

    <mapprotion
     ref="mapprotionEl"
     @closeprotion="closeprotion"
     >
      <!-- :tablelist="tablelist" -->
     </mapprotion>
  </div>
</template>
<script>
import WaterMapContainer from '@/components/MapContainer/WaterMapCon.vue' // 断面达标率
import { timeFmtNext, timeFmt, C_TIME } from '@/assets/js/timeFmt.js'
import config from '@/components/MapContainer/js/mapConfig.js'
import { loadModules } from 'esri-loader'
import MapContainer from '@/components/Common/MapCon/MapContainer.vue'

import CheckPanel from '../MapCon/CheckPanel'
import mapCheckPanel from '@/components/Common/MapCon/js/mapCheckPanel.js'
import * as mapCore from '../MapCon/js/mapCore'
import {loadingEntTransferListData} from '@/common/api/WaterEnvironment'
import mapprotion from '@/components/Common/MapCon/mapprotion.vue'
// import { getmapdialog } from "../../../../src/common/api/mapdialog.js";

export default {
  name: 'MapMain',
  data () {
    return {
      // tablelist:[],
      disableprotionshow: false,
      isShowTimeLine: false,
      radio1: '固体废物',
      mapPopOpen: false,
      qxdata: [],
      qxdatas: [],
      cplaytype: '',
      cyaer: new Date().getFullYear().toString(),
      regionCode: this.AppConfig.appInfo.regionCode,
      mapEchars: {
        grid: [{ x: ' 5%', y: '15%', width: '90%', height: '75%' }],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '10:00',
              '10:00',
              '10:00',
              '10:00',
              '10:00',
              '10:00',
              '10:00'
            ],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#93AECE',
                fontSize: 18
              },
              margin: 10
            },
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameLocation: 'end',
            nameTextStyle: {
              color: '#93AECE'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'none'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#93AECE',
                fontSize: 18
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          }
        ],
        series: [
          {
            name: 'PH',
            type: 'line',
            data: [90, 10, 90, 100, 15, 30, 7],
            showSymbol: false,
            smooth: true,
            lineStyle: {
              color: 'rgba(60, 230, 253, 1)'
            },
            areaStyle: {
              color: 'rgba(129, 240, 255, 0.2)'
            }
          }
        ]
      },
      checkedParameter: {},
      weather: {
        monitorTime: timeFmtNext(new Date(), 0, 'YYYY/MM/DD HH:mm:ss'),
        tep: ''
      },
      paramsTime: {
        isShow: false,
        time: ''
      },
      changePanelParams: {
        type: '',
        id: '',
        layId: '',
        Status: '',
        isShow: true
      },
      mapLoadingSuccessStatus: false,
      mapList: {
        waterStationCheck: [],
        station: [],
        river: []
      },
      myChart: null
    }
  },
  components: {
    CheckPanel,
    MapContainer,
    WaterMapContainer,
    mapprotion
  },
  watch () {
    isShowTimeLine((newValue, oldValue) => {
      console.log('newValue', newValue)
      this.myChart && this.myChart.resize()
    })
  },
  methods: {
    //  gettable() {
    //   getmapdialog(1,220100).then((res) => {
    //   this.tablelist=res.data;
    //   for(let i =0;i<this.tablelist.length;i++){
    //     var children=[
    //        {
    //           id: 21,
    //           hours: "HW50",
    //           cumulativeTotal: "29829.99",
    //           proportion: "0.5",
    //         },

    //     ];
    //     var id=i;
    //     this.tablelist[i].children=children;
    //     this.tablelist[i].id=id;
    //   }
    //   console.log(this.tablelist,"获取11")
    //   });
    // },
    // 点击搜索框显示搜索框，关闭企业信息弹窗
    searchshow () {
      this.$refs.mapprotionEl.isShowMapcontainer = false
    },
    // 点击关闭搜索框
    closesearch () {
      this.$refs.mapprotionEl.isShowMapcontainer = true
    },
    // 关闭企业信息弹窗
    closeprotion () {
      this.$refs.mapprotionEl.show = false
    },
    protionshow () {
      this.$refs.mapprotionEl.openQyinfo()
      this.$refs.checkPanelEl.serchshowinfo = false
      this.$refs.mapprotionEl.isShowMapcontainer = true
    },
    handleCheckedWaterChange (value) {
      this.waterRadio.map((item) => {
        if (item.id === value.id) {
          item.check = !value.check
          item.status = `${item.id}-${item.check}`
        }
      })
      this.checkedParameter = value
    },
    changeItems (id, layId) {
      if (id == 'heatmap') {
        this.isShowTimeLine = false
        this.gettimeoutechart(this.isShowTimeLine)
        this.cplaytype = id
      } else if (id == 'chanfeigc') {
        this.isShowTimeLine = true
        this.gettimeoutechart(this.isShowTimeLine)
        this.cplaytype = id
      } else if (id == 'zhuanyi') {
        this.isShowTimeLine = true
        this.gettimeoutechart(this.isShowTimeLine)
        this.cplaytype = id
      }
      if (layId == 'region') {
        this.regionCode = id
        this.qxdatas = []
        this.initQxDatas(this.regionCode)
        this.resetRegionWRY(this.regionCode)
      }
    },
    changeMapStatus (status) {
      if (status === true) {
        this.checkedParameter = this.waterRadio[0]
        this.checkedParameter.status = `${this.waterRadio[0].id}-${this.waterRadio[0].check}`
      }
    },

    initQxDatas (regioCode) {
      var _self = this
      loadingEntTransferListData(_self.cyaer + '01', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 1, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '02', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 2, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '03', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 3, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '04', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 4, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '05', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 5, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '06', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 6, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '07', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 7, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '08', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 8, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '09', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 9, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '10', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 10, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '11', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 11, data: res.data, regionCode: regioCode})
      })
      loadingEntTransferListData(_self.cyaer + '12', -1, -1, regioCode).then(res => {
        _self.qxdatas.push({key: 12, data: res.data, regionCode: regioCode})
      })
    },
    getLastMonth: function () {
      var year, lastMonth
      var date = new Date()
      var nowYear = date.getFullYear() // 当前年：四位数字
      var nowMonth = date.getMonth() // 当前月：0-11
      if (nowMonth == 0) {
        // 如果是0，则说明是1月份，上一个月就是去年的12月
        year = nowYear - 1
        lastMonth = 12
      } else {
        // 不是1月份，年份为当前年，月份本来是要减1的，但是由于`getMonth()`的月份本身就是少了1的，所以月份不用变。
        year = nowYear
        lastMonth = nowMonth
      }

      lastMonth = lastMonth < 10 ? '0' + lastMonth : lastMonth // 月份格式化：月份小于10则追加个0

      let lastYearMonth = year + '' + lastMonth
      return lastYearMonth
    },
    changeMapLevel (level) {
      var zoom = this.$store.state.mapview.zoom + level
      this.$store.state.mapview.zoom = zoom
      this.$store.state.mapview.zoom = zoom
    },
    changeBasemap (type) {
      loadModules(['esri/Basemap', 'esri/layers/TileLayer'], {
        css: true
      }).then(([Basemap, TileLayer]) => {
        const baselayer = new TileLayer({
          url: config.baseMapService[type].url
        })
        const basemap = new Basemap({
          baseLayers: [baselayer]
        })
        this.$store.state.mapview.map.basemap = basemap
      })
    },
    getRealTimeAQI () {
      var _this = this
      var url = '/api/online-monitor-data-share/airData/getRealTimeAQI'
      var params = new URLSearchParams()
      params.append('regionCode', _this.regionCode)
      _this.$axios
        .post(url, params)
        .then(function (res) {
          if (res.status == 200) {
            _this.weather = res.data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 站点报警展示
    getStationAlarmStatistic () {
      if (this.type === 'air') {
        var _this = this
        var url =
          '/api/online-monitor-data-share/airStation/getStationAlarmStatistic'
        var params = new URLSearchParams()
        params.append('regionCode', _this.regionCode)
        _this.$axios
          .post(url, params)
          .then(function (res) {
            if (res.status == 200) {
              let stationNum = res.data.data
              _this.numList[0].num = stationNum.alarmStationNum
              _this.numList[1].num = stationNum.toAlarmStationNum
              _this.numList[2].num = stationNum.normalStationNum
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        var _this = this
        var url =
          '/api/online-monitor-data-share/waterQueryInfo/getWaterAlarmTotal'
        _this.$axios
          .get(url)
          .then(function (res) {
            if (res.status == 200) {
              let stationNum = res.data.data
              _this.numList[0].num = stationNum.exceedingStandardNum
              _this.numList[1].num = stationNum.earlyWarningNum
              _this.numList[2].num = stationNum.normalNum
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    // 接受柱状图的时间 改变地图
    getZhuangTuDataTime (params) {
      this.paramsTime.isShow = !this.paramsTime.isShow
      this.paramsTime.time = params.name
    },
    changePanel (type, id, layId, Status) {
      console.log('type', type)
      console.log(type, id, layId, Status, 'type, id, layId, Status')
      this.changePanelParams.isShow = !this.changePanelParams.isShow
      this.changePanelParams.type = type
      this.changePanelParams.id = id
      this.changePanelParams.layId = layId
      this.changePanelParams.Status = Status

      if (layId === 'waterStationCheck') {
        if (Status === true) {
          this.mapList[`${layId}`].push(id)
        } else {
          this.mapList[`${layId}`] = this.mapList[`${layId}`].filter(
            (item) => item != id
          )
        }
      } else if (layId === 'river') {
        this.mapList[`${layId}`] = []
        this.mapList[`${layId}`].push(layId)
      } else {
        this.mapList[`${layId}`] = []
        this.mapList[`${layId}`].push(id)
      }
    },
    // 地图加载完成
    mapLoadingSuccess (status) {
      console.log(status, '地图加载完成')
      this.mapLoadingSuccessStatus = status
    },
    gettimeoutechart (val) {
      var _self = this
      this.myChart = this.$echarts.init(document.getElementById('timeshow'))
      this.myChart.clear()
      if (!val) {
        return
      }
      var year = [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
      var optionXyMap01 = {
        timeline: {
          data: year,
          axisType: 'category',
          autoPlay: true,
          playInterval: 5000,
          left: '0%',
          right: '0%',
          bottom: '10%',
          width: '98%',
          height: 54,
          //  height: null,
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, .8)', // 默认年份的颜色
                fontSize: 20
              }
            },
            emphasis: {
              textStyle: {
                color: 'rgba(255, 255, 255, .8)',
                fontSize: 20
              }
            },
            height: 40
          },
          symbolSize: 22,
          lineStyle: {
            // 线条样式
            color: 'rgba(255,255,255,.2)', // 线条样式-背景色
            width: 6
          },
          checkpointStyle: {
            // 划过圆圈的样式
            borderColor: '#ffffff', // 划过圆圈的边框颜色
            borderWidth: 2,
            color: 'rgba(34, 82, 240, 1)',
            symbolSize: 18
          },
          emphasis: {
            itemStyle: {
              color: 'rgba(34, 82, 240, 1)',
              borderColor: 'rgba(34, 82, 240, 1)'
            }
          },
          progress: {
            lineStyle: {
              color: 'rgba(34, 82, 240, 1)' // 进度条颜色
            },
            itemStyle: {
              color: 'rgba(34, 82, 240, 1)',
              borderColor: 'rgba(34, 82, 240, 1)'
            }
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            itemGap: 40,
            itemSize: 30,
            position: 'left',
            normal: {
              color: 'rgba(255,255,255,.2)', // 时间轴箭头颜色
              borderColor: 'rgba(255,255,255,.2)' // 箭头边框颜色以及暂停播放按钮颜色
            },
            emphasis: {
              color: 'rgba(255,255,255,.2)',
              borderColor: 'rgba(255,255,255,.2)'
            }
          }
        },
        options: []
      }
      this.myChart.setOption(optionXyMap01)
      this.myChart.on('timelinechanged', (obj) => {
        if (_self.cplaytype == 'chanfeigc') {
          for (var i = 0; i < 12; i++) {
            if (obj.currentIndex == i) {
              mapCore.FindLayer('heatmap' + (i + 1)).visible = true
            } else {
              mapCore.FindLayer('heatmap' + (i + 1)).visible = false
            }
          }
        }
        if (_self.cplaytype == 'zhuanyi') {
          for (var i = 0; i < 12; i++) {
            if (_self.qxdatas[i].key == (obj.currentIndex + 1) && _self.qxdatas[i].regionCode == _self.regionCode) {
              _self.qxdata = _self.qxdatas[i].data
            }
          }
        }
        var month_str = year[obj.currentIndex]
      })
    }
  },
  mounted () {
    // this.gettable();
    //this.getStationAlarmStatistic()
    this.getRealTimeAQI()
    this.gettimeoutechart()
    this.qxdatas = []
    this.initQxDatas(this.regionCode)
  },
  watch: {
    type: function () {
      this.getStationAlarmStatistic()
      this.getRealTimeAQI()
    }
  },
  props: {
    type: String
  }
}
</script>
<style>
@import "../../../assets/css/CenterMain.css";
 /deep/ .mapdialog .el-dialog{
  background:none !important;
  border-radius:13px !important;
}
/deep/ .mapdialog .el-dialog__header{
}
.protioninfo{
  width:244px;
  height:50px;
  background:rgba(0, 0, 0, 1);
  position:absolute;
  top: 122px;
  right: 15px;
  z-index: 999;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  font-size: 22px;
}
</style>
