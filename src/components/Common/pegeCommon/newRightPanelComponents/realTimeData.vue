<template>
  <div class="real-time-data-wrap">
    <div class="title"><span>实时数据</span></div>
    <div class="main-wrap">
      <div class="main-head">
        <span class="name">实时数据</span>
        <div class="select-wrap">
          <el-select
            style="border-radius: 4px; height: 22px"
            v-model="realTimeData"
          >
            <el-option
              v-for="item in realTimeDataOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 图表 -->
      <div class="chart-wrap">
        <!-- 产废量图表 -->
        <div class="wasteProduction-wrap" v-show="realTimeData=='wasteProduction'">
          <div class="wasteProduction" style="width:500px;height:192px;" v-if="flag2" ref="wasteProduction" ></div>
          <EmptyData :boxHeight="192" v-else></EmptyData>
        </div>
        <!-- 转移量图表 -->
        <div class="transferAmount-wrap" v-show="realTimeData=='transferAmount'">
          <div class="transferAmount" style="width:500px;height:192px;" v-if="flag3" ref="transferAmount" ></div>
          <EmptyData :boxHeight="192" v-else></EmptyData>
        </div>
        <!-- 库存量图表 -->
        <div class="inventory-wrap" v-show="realTimeData=='inventory'">
          <div class="inventory" style="width:500px;height:192px;" v-if="flag4" ref="inventory" ></div>
          <EmptyData :boxHeight="192" v-else></EmptyData>
        </div>
      </div>
      <div class="real-time-total">
        <ul class="monitoring-reality">
          <li >
            <span >{{inOutInformation.monitorEnterpriseList[0].time}}</span>
          </li>
          <li style="width:118px;overflow: hidden;
text-overflow:ellipsis; white-space: nowrap;">
            <span >{{inOutInformation.monitorEnterpriseList[0].name}}</span>
          </li>
          <li :class="[1>0 ? 'Warehousing' : 'Delivery']">
           <span >{{inOutInformation.monitorEnterpriseList[0].status | formatType}}</span>
          </li>
          <li >
            <span >{{inOutInformation.monitorEnterpriseList[0].typeName}}</span>
          </li>
          <li >
            <span >{{inOutInformation.monitorEnterpriseList[0].number}}(kg)</span>
          </li>
        </ul>
        <!-- 预警信息 -->
        <div class="early-warning">
          <div class="top">
            <span>{{warninginformationlist[0].chepei}}</span>
            <span class="time">{{ warninginformationlist[0].time }}</span>
          </div>
          <div class="bottom">
            <span>{{warninginformationlist[0].text}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getProdWasteByParams,
  getTransferByParams,
  getStorageByParams,
  getQueryInOutInformationByParams,
  getProportionByParams,
  getDPEnterpriseInfo, // 企业基本信息
  getDPMonitoringDpwaste
} from '../../../../common/api/rightPanel'
// import mapDiago from '../pegeCommon/mapDiago.vue'
import { getCurrentTime } from '../../../../unit/getCurrentTime'
import EmptyData from '@/components/EmptyData.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'realTimeData',
  components: {
    EmptyData,
    vueSeamlessScroll
    // mapDiago
  },
  data () {
    return {
      realTimeData: 'wasteProduction',
      realTimeDataOptions: [
        { label: '产废量', value: 'wasteProduction' },
        { label: '转移量', value: 'transferAmount' },
        { label: '库存量', value: 'inventory' }
      ],
      wasteProductionChart: null,
      transferAmountChart: null,
      inventoryChart: null,
      flag1: true,
      flag2: false,
      flag3: false,
      flag4: false,
      tableFlag: true,
      bingtuData: [],
      tablejiankunData: [],
      yData: [],
      xData: [],
      seriesData: [],
      currentTime: '',
      timerDate: null,
      radio13: '产废曲线',
      wasteproductionexecllist: [
        {
          number: '吉AQ69P1',
          status: '司机确认接单',
          info: '确认接单HW49，共计 2963 公斤'
          // look: "查看",
        },
        {
          number: '吉AV4526',
          status: '结束',
          info: '接收HW06，共计 4000 公斤'
          // look: "查看",
        },
        {
          number: '吉AV4526',
          status: '结束',
          info: '接收HW02，共计 2920 公斤'
          // look: "查看",
        },
        {
          number: '吉AU6249',
          status: '结束',
          info: '接收HW02，共计 5700 公斤'

          // look: "查看",
        },
        {
          number: '吉AV7363',
          status: '司机确认接单',
          info: '确认接单HW06，共计 297 公斤'
          // look: "查看",
        },
        {
          number: '吉AH3751',
          status: '完成装载',
          info: '交割HW08，共计 2270 公斤'
          // look: "查看",
        },
        {
          number: '吉AH3061',
          status: '完成装载',
          info: '交割HW08，共计 3345 公斤'
          // look: "查看",
        },
        {
          number: '吉AV4526',
          status: '结束',
          info: '接收HW02，共计 173400 公斤'
          // look: "查看",
        },
        {
          number: '吉AU4113',
          status: '结束',
          info: '接收HW08，共计 6500 公斤'
          // look: "查看",
        },

        {
          number: '吉AH3151',
          status: '完成装载',
          info: '交割HW06，共计 2345 公斤'
          // look: "查看",
        }
      ],
      warninginformationlist: [
        {
          time: '09:35:45',
          chepei: '吉AH3951',
          text: '连续行驶超过120分钟，已提醒司机注意疲劳驾驶'
        },
        {
          time: '08:40:45',
          chepei: '嘉吉生化有限公司',
          text: '危废贮存间储量异常变化'
        },
        {
          time: '08:10:13',
          chepei: '吉AQ69P1',
          text: '转移车辆偏离路线'
        },
        {
          time: '07:10:13',
          chepei: '吉AQ69P1',
          text: '转移车辆载重异常'
        },
        {
          time: '16:45:45',
          chepei: '长春一东汽车零部件制造有限责任公司',
          text: '企业储藏设施变动异常'
        },
        {
          time: '16:45:45',
          chepei: '吉AH3151',
          text: '转移车辆运输超时'
        }
      ],
      inOutInformation: {},
      proportionList: [], // 危废占比数据
      enterpriseBasicInfo: {}, // 企业基本信息
      ComparisonproductionWaste: [], // 产废情况对比
      timer: null,
      timer1: null
    }
  },
  filters: {
    formatType (val) {
      return val == 0 ? '出库' : '入库'
    }
  },
  created () {
    // this.initData();
  },
  mounted () {
    this.initData()
    this.timer = setInterval(this.initData, 60000)
    window.addEventListener('resize', () => {
      this.wasteProductionChart && this.wasteProductionChart.resize()
      this.transferAmountChart && this.transferAmountChart.resize()
      this.inventoryChart && this.inventoryChart.resize()
    })
  },
  destroyed () {
    clearInterval(this.timer1)
    clearInterval(this.timerDate)
  },
  methods: {
    initData () {
      let regionCode = this.AppConfig.appInfo.regionCode
      // 产废量实时汇总
      this.getProdWasteData(regionCode)
      // 转移量实时汇总
      this.getTransferData(regionCode)
      // 实时库存量
      this.getStorageData(regionCode)
      // 企业监控实况、累计实时总量统计
      getQueryInOutInformationByParams(regionCode).then((res) => {
        if (res.code == 0 && res.data) {
          if (res.data.monitorEnterpriseList.length == 0) {
            this.tableFlag = false
          }
          this.tablejiankunData = res.data
          this.inOutInformation = res.data
          console.log('inOutInformation', this.inOutInformation)
        }
      })
      // 库存危废占比
      getProportionByParams(regionCode).then((res) => {
        if (res.code == 0 && res.data) {
          if (res.data.length == 0) {
            this.flag1 = false
            return
          }
          let newArr = []
          res.data.map((item, index) => {
            newArr.push(
              Object.assign({}, item, {
                textcolor: 'text-style-'
              })
            )
          })
          this.proportionList = newArr
          let sData = []
          res.data.forEach((item) => {
            sData.push({
              value: item.proportion.substr(0, item.proportion.indexOf('.')),
              // value:item.proportion.substr(0, item.proportion.indexOf('.')),
              name: item.tpyeName
            })
          })
          this.getyuanpanechart(sData)
        }
      })
      // 获取企业基本信息
      getDPEnterpriseInfo().then((res) => {
        if (res.code == 0 && res.data) {
          this.enterpriseBasicInfo = res.data
        }
      })
      // 产废情况对比
      getDPMonitoringDpwaste().then((res) => {
        let newArr = []
        if (res.code == 0 && res.data) {
          if (res.data.length > 0) {
            res.data.map((item, index) => {
              newArr.push(
                Object.assign({}, item, {
                  actualProportion: Number(
                    (
                      (item.actualNum / (item.actualNum + item.planNum)) *
                      100
                    ).toFixed(2)
                  ),
                  planProportion: Number(
                    (
                      (item.planNum / (item.actualNum + item.planNum)) *
                      100
                    ).toFixed(2)
                  )
                })
              )
            })
            this.reportinglist = newArr
          }
        }
      })
    },
    // 获取产废量数据
    getProdWasteData (regionCode) {
      getProdWasteByParams(regionCode).then((res) => {
        console.log('产废量图表数据', res)
        let xData = []
        let seriesData = []
        if (res.code == 0 && res.data) {
          if (res.data.length == 0) {
            this.flag2 = false
          } else {
            this.flag2 = true
            res.data.forEach((item) => {
              xData.push(item.qrodWasteTime)
              seriesData.push(item.qrodWasteNum)
            })
            this.$nextTick(() => {
              this.getshishiecharts(xData, seriesData)
            })
          }
        }
      })
    },
    // 获取转移量图表数据
    getTransferData (regionCode) {
      getTransferByParams(regionCode).then((res) => {
        console.log('转移量图表数据', res)
        let xData = []
        let seriesData = []
        if (res.code == 0 && res.data) {
          if (res.data.length == 0) {
            this.flag3 = false
          } else {
            this.flag3 = true
            res.data.forEach((item) => {
              xData.push(item.transferTime)
              seriesData.push(item.transferNum)
            })
            this.$nextTick(() => {
              this.getzhuanyiecharts(xData, seriesData)
            })
          }
        }
      })
    },
    // 获取库存量图表数据
    getStorageData (regionCode) {
      getStorageByParams(regionCode).then((res) => {
        console.log('库存量图表数据', res)
        let xData = []
        let seriesData = []
        if (res.code == 0 && res.data) {
          if (res.data.length == 0) {
            this.flag4 = false
          } else {
            this.flag4 = true
            res.data.forEach((item) => {
              xData.push(item.storageTime)
              seriesData.push(item.storageNum)
            })
            this.$nextTick(() => {
              this.getkuchunecharts(xData, seriesData)
            })
          }
        }
      })
    },
    // 产废量
    getshishiecharts (xData, seriesData) {
      this.wasteProductionChart = this.$echarts.init(this.$refs.wasteProduction)
      var option = {
        xAxis: [
          {
            type: 'category',
            data: xData, // 数据值
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
                // 这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
              // 这里是为了突出显示加上的
            }
          }
        },
        grid: {
          x: 45,
          y: 20,
          x2: 4,
          y2: 30,
          borderWidth: 1
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#188df0' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '  #83bff6' }
                ])
              }
            }
          }
        ]
      }
      this.wasteProductionChart.setOption(option)
    },
    // 转移量
    getzhuanyiecharts (xData, seriesData) {
      this.transferAmountChart = this.$echarts.init(this.$refs.transferAmount)
      var option = {
        xAxis: [
          {
            type: 'category',
            data: xData, // 数据值
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
                // 这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
              // 这里是为了突出显示加上的
            }
          }
        },
        grid: {
          x: 45,
          y: 20,
          x2: 4,
          y2: 30,
          borderWidth: 1
        },
        series: [
          {
            data: seriesData,
            type: 'bar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#188df0' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '  #83bff6' }
                ])
              }
            }
          }
        ]
      }
      this.transferAmountChart.setOption(option)
    },
    // 库存量
    getkuchunecharts (xData, seriesData) {
      this.inventoryChart = this.$echarts.init(this.$refs.inventory)
      var option = {
        xAxis: [
          {
            type: 'category',
            data: xData, // 数据值
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
                // 这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
              // 这里是为了突出显示加上的
            }
          }
        },
        grid: {
          x: 65,
          y: 20,
          x2: 4,
          y2: 30,
          borderWidth: 1
        },
        series: [
          {
            data: seriesData,
            type: 'line',
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#188df0' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '  #83bff6' }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(34, 82, 240, 1)'
              }
            }
          }
        ]
      }
      this.inventoryChart.setOption(option)
    },
    getyuanpanechart (sData) {
      // rightrightechartbox
      var myChart = this.$echarts.init(
        document.getElementById('rightrightechartbox')
      )
      var option = {
        color: ['rgba(240, 34, 34, 1)', 'rgba(137, 113, 197, 1)', 'rgba(250, 201, 84, 1)', 'rgba(252, 141, 82, 1)', 'rgba(88, 169, 149, 1)'],
        // title: {
        //     text: '网络/安全设备',
        //     left: '60',
        //     top: 0,
        //     textAlign: 'center',
        //     textStyle: {
        //         color: '#fff',
        //         fontSize: 14,
        //         fontWeight: 0
        //     }
        // },
        grid: {
          left: -100,
          top: 50,
          bottom: 10,
          right: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vartical',
          // x: "right",
          top: 'center',
          right: '15',
          // bottom: "0%",
          itemWidth: 16,
          itemHeight: 8,
          itemGap: 16,
          textStyle: {
            color: '#A3E2F4',
            fontSize: 12,
            fontWeight: 0
          },
          data: ['IDS', 'VPN', '交换机', '防火墙', 'WAF', '堡垒机']
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: 'category',
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#0B4A6B',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: '#0B4A6B',
            margin: 8,
            fontSize: 16
          }
        },
        radiusAxis: {
          min: 40,
          max: 120,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#0B3E5E',
              width: 1,
              type: 'solid'
            }
          },
          axisLabel: {
            formatter: '{value} %',
            show: false,
            padding: [0, 0, 20, 0],
            color: '#0B3E5E',
            fontSize: 16
          },
          splitLine: {
            lineStyle: {
              color: '#0B3E5E',
              width: 2,
              type: 'solid'
            }
          }
        },
        calculable: true,
        series: [{
          type: 'pie',
          radius: ['5%', '10%'],
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false,
              length: 30,
              length2: 55
            },
            emphasis: {
              show: false
            }
          },
          data: [{
            name: '',
            value: 0,
            itemStyle: {
              normal: {
                color: '#0B4A6B'
              }
            }
          }]
        }, {
          type: 'pie',
          radius: ['90%', '95%'],
          hoverAnimation: false,
          labelLine: {
            normal: {
              show: false,
              length: 30,
              length2: 55
            },
            emphasis: {
              show: false
            }
          },
          name: '',
          data: [{
            name: '',
            value: 0,
            itemStyle: {
              normal: {
                color: '#0B4A6B'
              }
            }
          }]
        }, {
          stack: 'a',
          type: 'pie',
          radius: ['20%', '80%'],
          roseType: 'area',
          zlevel: 10,
          label: {
            normal: {
              show: true,
              formatter: '{c}',
              textStyle: {
                fontSize: 30
              },
              position: 'outside',
              formatter: '{d}%'
            },
            emphasis: {
              show: true
            }
          },
          labelLine: {
            normal: {
              show: true,
              length: 20,
              length2: 55
            },
            emphasis: {
              show: false
            }
          },
          data: sData
        } ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
.Warehousing{
    color: #01BDAF;
  }
  .Delivery{
    color: #F09622;
  }
.flex-1 {
  flex: 1;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.flex-2 {
  flex: 2;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.flex-3 {
  flex: 3;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.real-time-data-wrap {
  .title {
    display: flex;
    align-items: center;
    width: 469px;
    height: 39px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    background: linear-gradient(
      270deg,
      rgba(34, 82, 240, 0) 0%,
      rgba(34, 82, 240, 0.5) 100%
    );
    padding-left: 15px;
  }
  .main-wrap {
    margin-top: 19px;
    .main-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        height: 25px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 25px;
      }
      .select-wrap {
        width: 84px;
      }
      /deep/ .select-wrap .el-select .el-input__inner {
        font-size: 13px;
        height: 22px;
        color: #ffffff;
        border: none;
        background: rgba(255, 255, 255, 0.15);
      }
      /deep/ .select-wrap .el-select .el-input__icon {
        font-size: 13px !important;
        padding-right: 0 !important;
        padding-top: 0 !important;
        line-height: 22px;
      }
    }
    .chart-wrap {
      .wasteProduction-wrap,
      .transferAmount-wrap,
      .inventory-wrap {
        width: 100%;
        height: 192px;
      }
      .wasteProduction,
      .transferAmount,
      .inventory {
        width: 100%;
        height: 192px;
      }
    }
    .real-time-total {
      margin-top: 20px;
      .monitoring-reality {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        background: rgba(255,255,255,0.15);
        border-radius: 6px;
        padding: 0 10px;
        box-sizing: border-box;
      }
      .early-warning {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 60px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 7px;
        padding: 0 14px;
        box-sizing: border-box;
        margin-top: 9px;
        .top > span:nth-child(1) {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFBF5A;
          line-height: 22px;
        }
        .top > span:nth-child(2) {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 20px;
          margin-left: 17px;
        }
        .bottom {
          margin-top: 6px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
