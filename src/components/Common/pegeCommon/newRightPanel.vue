<template>
  <div class="new-right-panel">
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
          <div
            class="wasteProduction-wrap"
            v-show="realTimeData == 'wasteProduction'"
          >
            <div
              class="wasteProduction"
              style="width: 100%px; height: 192px"
              v-if="flag2"
              ref="wasteProduction"
            ></div>
            <EmptyData :boxHeight="192"  v-else ></EmptyData>
          </div>
          <!-- 转移量图表 -->
          <div
            class="transferAmount-wrap"
            v-show="realTimeData == 'transferAmount'"
          >
            <div
              class="transferAmount"
              style="width: 500px; height: 192px"

              v-if="flag3"
              ref="transferAmount"
            ></div>
             <EmptyData :boxHeight="192"  v-else></EmptyData>
          </div>
          <!-- 库存量图表 -->
          <div class="inventory-wrap" v-show="realTimeData == 'inventory'">
            <div
              class="inventory"
              style="width: 500px; height: 192px"
              v-if="flag4"
              ref="inventory"
            ></div>
             <EmptyData :boxHeight="192"  v-else></EmptyData>
          </div>
        </div>
        <div class="real-time-total">
          <ul class="monitoring-reality">
            <li>
              <span>{{ inOutInformation.monitorEnterpriseList.length ? inOutInformation.monitorEnterpriseList[0].time : '' }}</span>
            </li>
            <li
              style="
                width: 118px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              <span>{{ inOutInformation.monitorEnterpriseList.length ? inOutInformation.monitorEnterpriseList[0].name : ''}}</span>
            </li>
            <li style="width:35px;margin:0 5px 0 5px;" :class="[1 > 0 ? 'Warehousing' : 'Delivery']">
              <span  v-if="inOutInformation.monitorEnterpriseList.length">{{
                inOutInformation.monitorEnterpriseList[0].status | formatType
              }}</span>
            </li>
            <li>
              <span>{{
                inOutInformation.monitorEnterpriseList.length ? inOutInformation.monitorEnterpriseList[0].typeName : ''
              }}</span>
            </li>
            <li>
              <span v-if="inOutInformation.monitorEnterpriseList.length && inOutInformation.monitorEnterpriseList[0].number">
                (kg)
                </span>
              <span></span
              >
            </li>
          </ul>
          <!-- 预警信息 -->
          <div class="early-warning">
            <div class="top">
              <span>{{ wasteproductionexecllist.length ? wasteproductionexecllist[0].number:'' }}</span>
              <span class="time" v-show="wasteproductionexecllist.length">{{ currentDate }}</span>
            </div>
            <div class="bottom" v-show="wasteproductionexecllist.length">
              <span>{{ warninginformationlist.length ? warninginformationlist[0].text : ''}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 今日数据 -->
    <div class="today-data-wrap">
      <div class="title"><span>今日数据</span></div>
      <ul class="today-data" style="margin-top:6px;">
        <li class="today-data-item" v-for="(item,index) in todayData.slice(0,9)" :key="index">
          <span class="name">{{item.name}}</span>
          <span class="value" :style="'color:'+item.color">{{item.value}}</span>
        </li>
      </ul>
      <!-- 累计信息 -->
      <ul class="cumulative-data" style="margin-top:20px;">
        <li>
          <div class="top">
            <img class="icon-wrap" src="../../../assets/img/new-right-panel/ljcf.png"></img>
            <span class="title">累计产废总量/t</span>
          </div>
          <div class="value">{{inOutInformation.productionTotal?inOutInformation.productionTotal:'0'}}</div>
        </li>
        <li>
          <div class="top">
           <img class="icon-wrap" src="../../../assets/img/new-right-panel/wld.png"></img>
            <span class="title">五联单数量/单</span>
          </div>
          <div class="value">{{inOutInformation.ordersTotal?inOutInformation.ordersTotal:'0'}}</div>
        </li>
       <li>
          <div class="top">
            <img class="icon-wrap" src="../../../assets/img/new-right-panel/ljrkzl.png"></img>
            <span class="title">累计入库总量/t</span>
          </div>
          <div class="value">{{inOutInformation.storageTotal?inOutInformation.storageTotal:'0'}}</div>
        </li>
      </ul>
      <ul class="cumulative-data">
        <li>
          <div class="top">
            <img class="icon-wrap" src="../../../assets/img/new-right-panel/kszy.png"></img>
            <span class="title">跨省转移/单</span>
          </div>
          <div class="value">{{inOutInformation.transTransferTotal?inOutInformation.transTransferTotal:'0'}}</div>
        </li>
        <li>
          <div class="top">
           <img class="icon-wrap" src="../../../assets/img/new-right-panel/ljrkzl.png"></img>
            <span class="title">累计转移总量/t</span>
          </div>
          <div class="value">{{inOutInformation.transferTotal?inOutInformation.transferTotal:'0'}}</div>
        </li>
       <li>
          <div class="top">
            <img class="icon-wrap" src="../../../assets/img/new-right-panel/ksjs.png"></img>
            <span class="title">跨省接收/t</span>
          </div>
          <div class="value">{{inOutInformation.interReceptionTotal?inOutInformation.interReceptionTotal:'0'}}</div>
        </li>
      </ul>
      <!-- 图表统计 -->
      <div class="chart-total-wrap">
        <div class="left" style="width:150px;height:150px;">
          <div v-if="flag1" class="rightrightechart" style="width:150px;height:150px;" ref="rightrightechartbox" ></div>
          <EmptyData v-else :boxHeight="120"></EmptyData>
        </div>
        <div class="right" style="width: 100%">
          <ul class="data-total-wrap">
            <li class="item" v-for="(item,index) in proportionList.slice(0,4)" :key="index">
              <!-- <p class="title" :class="item.textcolor+index">{{item.tpyeName}}</p> -->
                 <p class="title" :class="item.textcolor+index" style="font-size:14px;height:10px;margin-bottom:15px;transform: scale(0.75)">{{item.dicTypeExplain}}</p>

              <p class="num" :class="item.textcolor+index">{{item.typeNum}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
     <div class="rightrightbottombox">
            <div class="rightrightbottombanxin">
              <div class="rightrightbottomtitle">转运实况</div>
              <ul class="table-head">
                <li style="width:114px;">车辆编号</li>
                <li class="flex-2">当前状态</li>
                <li >详细信息</li>
              </ul>
              <vue-seamless-scroll :data="wasteproductionexecllist" class="seamless-warp" :class-option="classOption">
                <div class="rightrightbottomexcal">
                  <table width="100%" border="0" class="wasteproductionecxalbox">
                    <tr
                      class="wasteproductioneexeclbody"
                      v-for="(item, index) in wasteproductionexecllist"
                      :key="index"
                    >
                      <td >
                        <div class="differt" v-if="(index+1)<=3">{{ item.number }}</div>
                        <div v-else class="differtinfo">{{ item.number }}</div>
                      </td>
                      <td style="text-align:center;"  >{{ item.status }}</td>
                      <td style="text-align:center;">{{ item.info }}</td>
                      <!-- <td style="color: #4da7ff">
                        <span>{{ item.look }}</span>
                      </td> -->
                    </tr>
                  </table>
                </div>
              </vue-seamless-scroll>
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
  getDPMonitoringDpwaste,
  getRegulatoryList
} from '../../../common/api/rightPanel'
// import mapDiago from '../pegeCommon/mapDiago.vue'
import { getCurrentTime, getCurrentDate } from '../../../unit/getCurrentTime'
import EmptyData from '@/components/EmptyData.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'newRightPanel',
  components: {
    EmptyData,
    vueSeamlessScroll
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
      flag2: true,
      flag3: true,
      flag4: true,
      tableFlag: true,
      bingtuData: [],
      tablejiankunData: [],
      yData: [],
      xData: [],
      seriesData: [],
      currentTime: '',
      timerDate: null,
      radio13: '产废曲线',
      wasteproductionexecllist: [],
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
      inOutInformation: {
        monitorEnterpriseList: [
          {time: '', name: '', status: '', typeName: '', number: ''}
        ]
      },
      proportionList: [], // 危废占比数据
      enterpriseBasicInfo: {}, // 企业基本信息
      ComparisonproductionWaste: [], // 产废情况对比
      timer: null,
      timer1: null,
      todayData: [
        {name: '今日车次', value: '0', color: '#F09622'},
        {name: '在途车辆', value: '0', color: '#5CAEFE'},
        {name: '转运预警', value: '0', color: '#F02222 '},
        {name: '待转运危废', value: '0', color: '#F09622 '},
        {name: '在途危废', value: '0', color: '#5CAEFE'},
        {name: '完成转运', value: '0', color: '#22F0ED'},
        {name: '新增联单', value: '0', color: '#F09622'},
        {name: '在途联单', value: '0', color: '#5CAEFE '},
        {name: '完成联单', value: '0', color: '#22F0ED '}
      ],
      regionCode: this.AppConfig.appInfo.regionCode,
      prodWasteTimer: null,
      transferDataTimer: null,
      storageDataTimer: null,
      inOutInformationTimer: null,
      getRegulatoryTimer: null,
      proportionTimer: null
    }
  },
  computed: {
    classOption () {
      return {
        step: 0.8, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    },
    currentDate () {
      return getCurrentDate()
    }
  },
  filters: {
    formatType (val) {
      return val === '' ? '' : val === 0 ? '出库' : '入库'
    }
  },
  mounted () {
    this.initProdWasteData()
    this.initTransferData()
    this.initGetStorageData()
    this.initGetInOutInformation()
    this.initGetRegulatoryList()
    this.initGetProportion()
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.prodWasteTimer)
    clearInterval(this.transferDataTimer)
    clearInterval(this.storageDataTimer)
    clearInterval(this.inOutInformationTimer)
    clearInterval(this.getRegulatoryTimer)
    clearInterval(this.proportionTimer)
  },
  methods: {
    // 产废量实时汇总
    initProdWasteData () {
      this.getProdWasteData(this.regionCode)
        .then((res) => {
          return this.delayGetProdWasteData()
        })
    },
    // 获取产废量数据
    getProdWasteData (regionCode) {
      return new Promise((resolve, reject) => {
        getProdWasteByParams(regionCode)
          .then((res) => {
            resolve()
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
          .catch((err) => {
            reject(err)
          })
      })
    },
    delayGetProdWasteData () {
      this.prodWasteTimer = setTimeout(() => {
        this.initProdWasteData()
      }, 120000)
    },

    initTransferData () {
      this.getTransferData(this.regionCode)
        .then((res) => {
          return this.delayGetTransferData()
        })
    },
    // 获取转移量图表数据
    getTransferData (regionCode) {
      return new Promise((resolve, reject) => {
        getTransferByParams(regionCode).then((res) => {
          resolve()
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
      })
    },
    delayGetTransferData () {
      this.transferDataTimer = setTimeout(() => {
        this.initTransferData()
      }, 120000)
    },

    initGetStorageData () {
      this.getStorageData(this.regionCode)
        .then((res) => {
          return this.delayGetStorageData()
        })
    },
    // 获取库存量图表数据
    getStorageData (regionCode) {
      return new Promise((resolve, reject) => {
        getStorageByParams(regionCode).then((res) => {
          resolve()
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
      })
    },
    delayGetStorageData () {
      this.storageDataTimer = setTimeout(() => {
        this.initGetStorageData()
      }, 120000)
    },

    initGetInOutInformation () {
      this.getInOutInformation(this.regionCode)
        .then((res) => {
          return this.delayGetInOutInformation()
        })
    },
    // 企业监控实况、累计实时总量统计
    getInOutInformation (regionCode) {
      return new Promise((resolve, reject) => {
        getQueryInOutInformationByParams(regionCode).then((res) => {
          resolve()
          if (res.code == 0 && res.data) {
            if (res.data.monitorEnterpriseList.length == 0) {
              this.tableFlag = false
            }
            this.tablejiankunData = res.data
            this.inOutInformation = res.data
          }
        })
      })
    },
    delayGetInOutInformation () {
      this.inOutInformationTimer = setTimeout(() => {
        this.initGetStorageData()
      }, 120000)
    },

    initGetRegulatoryList () {
      this.getRegulatory(this.regionCode)
        .then((res) => {
          return this.delayGetRegulatoryList()
        })
    },
    getRegulatory (regionCode) {
      return new Promise((resolve, reject) => {
        getRegulatoryList(regionCode).then(res => {
          resolve()
          if (res.code == 0 && res.data) {
            this.wasteproductionexecllist = res.data
          }
        })
      })
    },
    delayGetRegulatoryList () {
      this.getRegulatoryTimer = setTimeout(() => {
        this.initGetStorageData()
      }, 120000)
    },

    initGetProportion () {
      this.getProportion(this.regionCode)
        .then((res) => {
          return this.delayGetProportion()
        })
    },
    getProportion (regionCode) {
      return new Promise((resolve, reject) => {
        getProportionByParams(regionCode).then((res) => {
          resolve()
          if (res.code == 0 && res.data) {
            if (res.data.length == 0) {
              this.flag1 = false
              return
            }
            this.flag1 = true
            let harzardousTypeList = sessionStorage.getItem('harzardousTypeList')
            let harzardousList = JSON.parse(harzardousTypeList)
            res.data.forEach((item) => {
              harzardousList.forEach(ele => {
                if (item.tpyeName === ele.typeName) {
                  item.dicTypeExplain = ele.dicTypeExplain
                }
              })
            })
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
            // let harzardousTypeList = sessionStorage.getItem('harzardousTypeList')
            // let harzardousList = JSON.parse(harzardousTypeList)
            // res.data.forEach((item) => {
            //   harzardousList.forEach(ele => {
            //     if (item.typeName == ele.typeName) {
            //       item.typeName = ele.dicTypeExplain
            //     }
            //   })
            // })

            res.data.forEach((item) => {
              sData.push({
                value: item.proportion.substr(0, item.proportion.indexOf('.')),
                name: item.tpyeName
              })
            })
            this.$nextTick(() => {
              this.getyuanpanechart(sData)
            })
          }
        })
      })
    },
    delayGetProportion () {
      this.proportionTimer = setTimeout(() => {
        this.initGetProportion()
      }, 120000)
    },
    // 产废量
    getshishiecharts (xData, seriesData) {
      this.wasteProductionChart = this.$echarts.init(
        this.$refs.wasteProduction
      )
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
      var myChart = this.$echarts.init(this.$refs.rightrightechartbox)
      var option = {
        color: [
          'rgba(240, 34, 34, 1)',
          'rgba(137, 113, 197, 1)',
          'rgba(250, 201, 84, 1)',
          'rgba(252, 141, 82, 1)',
          'rgba(88, 169, 149, 1)'
        ],
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
          left: 0,
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
        series: [
          {
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
            data: [
              {
                name: '',
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#0B4A6B'
                  }
                }
              }
            ]
          },
          {
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
            data: [
              {
                name: '',
                value: 0,
                itemStyle: {
                  normal: {
                    color: '#0B4A6B'
                  }
                }
              }
            ]
          },
          {
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
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
@import url("../../../assets/css/newRightPanel.css");
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
        background: rgba(255, 255, 255, 0.15);
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
          color: #ffbf5a;
          line-height: 22px;
        }
        .top > span:nth-child(2) {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 20px;
          margin-left: 17px;
        }
        .bottom {
          margin-top: 6px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 20px;
        }
      }
    }
  }
}
// 今日数据样式
.today-data-wrap {
  margin-top: 20px;
  .title {
    height: 25px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 25px;
  }
  .today-data {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    // padding: 0 7px;
    box-sizing: border-box;
    .today-data-item {
      width: 19.5%;
      display: inline-block;
      text-align: center;
      .name {
        display: block;
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 21px;
      }
      .value {
        display: block;
        height: 41px;
        font-size: 28px;
        font-family: Oswald-Medium, Oswald;
        font-weight: 500;
        line-height: 41px;
      }
    }
    .today-data-item:not(:last-child) {
      // margin-right: 36px;
    }
  }
  .cumulative-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 9px;
    .top {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-wrap {
        width: 20px;
        height: 18px;
      }
      .title {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 22px;
        margin-left: 6px;
        opacity: 0.8;
      }
    }
    .value {
      height: 35px;
      font-size: 20px;
      font-family: Oswald-Regular, Oswald;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 35px;
      text-align: center;
    }
  }
   .cumulative-data:nth-child(1) {
     border-bottom: 1px solid rgba(255, 255, 255, 0.2);
   }
   .chart-total-wrap {
     display: flex;
     margin-top: 10px;
     .right {
       margin-left: 22px;
       .data-total-wrap {
         display: flex;
         flex-wrap: wrap;
         justify-content: space-between;
         .item {
           width: 49.5%;
           margin-bottom: 10px;
           .title {
              height: 22px;
              font-size: 16px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              line-height: 22px;
              text-align: center;
           }
           .num {
             height: 32px;
            font-size: 22px;
            font-family: Oswald-Medium, Oswald;
            font-weight: 600;
            line-height: 32px;
            text-align: center;
           }
         }
       }
     }
   }
}
</style>
