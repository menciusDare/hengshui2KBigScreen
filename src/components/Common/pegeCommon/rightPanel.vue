<template>
  <div class="rightPanel">
    <div class="rightbanxin">
      <div class="rightheader">
        <div class="rightleftheader">实时监控</div>
        <div class="rightrightheader clearfix">
          <span class="time">{{currentTime}}</span>
          <!-- <div class="timeborder"></div> -->
          <!-- <div class="tianqibox clearfix">
            <div class="tianqiimage1"><img src="../../../../src/assets/img/newimg/weather.png" alt=""></div>
            <div class="tianqiimage2"><img src="../../../../src/assets/img/newimg/Thermometer.png" alt=""></div>
            <span class="tianqitext">28℃</span>
          </div> -->
        </div>
      </div>
      <div class="rightbottombox clearfix">
        <div class="rightleftbox">
          <div class="realtimewaste">
            <div class="realtimetitle">实时产废量</div>
            <div class="realtimeechart" id="realechart" v-if="flag2"></div>
            <EmptyData v-else></EmptyData>
          </div>
          <div class="realtimewaste">
            <div class="realtimetitle">实时转移量</div>
            <div class="realtimeechart" id="volumechart" v-if="flag3"></div>
            <EmptyData v-else></EmptyData>
          </div>
          <div class="realtimewaste">
            <div class="realtimetitle">实时库存量</div>
            <div class="realtimeechart" id="inventoryechart" v-if="flag4"></div>
             <EmptyData v-else></EmptyData>
          </div>
          <div class="realtimewaste">
            <div class="realtimetitle">企业监控实况</div>
            <div class="realtimeechart newrealtimeechart" id="inventoryechart" v-if="tableFlag">
              <table width="780px" border="0" class="maintopleftecxalbox">
                <tr
                  class="maintoplefteexeclbody"
                  v-for="(item, index) in inOutInformation.monitorEnterpriseList"
                  :key="index"
                >
                  <td style="display: inline-block;width: 90px;text-align: center;">{{ item.time }}</td>
                  <td style="display: inline-block;width: 470px;vertical-align: middle;text-align: center;overflow: hidden;white-space: nowrap;text-overflow:ellipsis ;">{{ item.name }}</td>
                  <td style="display: inline-block;width: 50px;text-align: center;padding: 0 10px;" :class="[1>0 ? 'Warehousing' : 'Delivery']">{{ item.status | formatType}}</td>
                  <td style="display: inline-block;width: 150px;text-align: center"><span>{{ item.number }}(kg)</span></td>
                </tr>
              </table>
            </div>
            <EmptyData v-else></EmptyData>
          </div>
        </div>
        <div class="rightminbox">
          <div class="rightmiantop">
            <div class="rightmiantopbanxin clearfix">
              <ul class="rightmainleft">
                <li>
                  <div class="rightmiannum">{{inOutInformation.productionTotal}}</div>
                  <div class="totalaccumulated clearfix">
                    <div class="totalaccumulatedicon"><img src="../../../../src/assets/img/newimg/totalcumulative .png" alt=""></div>
                    <span class="totalaccumulatedtext">累计产废总量(吨)</span>
                  </div>
                </li>
                <li>
                  <div class="rightmiannum">{{inOutInformation.storageTotal}}</div>
                  <div class="totalaccumulated clearfix">
                    <div class="totalaccumulatedicon"><img src="../../../../src/assets/img/newimg/ruku.png" alt=""></div>
                    <span class="totalaccumulatedtext">累计入库总量(吨)</span>
                  </div>
                </li>
                <li>
                  <div class="rightmiannum">{{inOutInformation.transferTotal}}</div>
                  <div class="totalaccumulated clearfix">
                    <div class="totalaccumulatedicon"><img src="../../../../src/assets/img/newimg/zongzhuanyi.png" alt=""></div>
                    <span class="totalaccumulatedtext">累计转移总量(吨)</span>
                  </div>
                </li>
              </ul>
              <ul class="rightmainright">
                <li>
                  <div class="rightmiannum">{{inOutInformation.ordersTotal}}</div>
                  <div class="totalaccumulated clearfix">
                    <div class="totalaccumulatedicon"><img src="../../../../src/assets/img/newimg/Fivesheet.png" alt=""></div>
                    <span class="totalaccumulatedtext">五联单数量(单)</span>
                  </div>
                </li>
                <li>
                  <div class="rightmiannum">{{inOutInformation.transTransferTotal}}</div>
                  <div class="totalaccumulated clearfix">
                    <div class="totalaccumulatedicon"><img src="../../../../src/assets/img/newimg/kushen.png" alt=""></div>
                    <span class="totalaccumulatedtext">跨省转移(单)</span>
                  </div>
                </li>
                <li>
                  <div class="rightmiannum">{{inOutInformation.interReceptionTotal}}</div>
                  <div class="totalaccumulated clearfix">
                    <div class="totalaccumulatedicon"><img src="../../../../src/assets/img/newimg/kuashenjiehou.png" alt=""></div>
                    <span class="totalaccumulatedtext">跨省接收(吨)</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="rightminmin">
            <div class="rightminmintitle">今日数据</div>
            <div class="rightminminbanxin">
              <ul>
                <li>
                  <div class="rightminname">今日车次</div>
                  <div class="rightminnum text-color1">54</div>
                </li>
                <li>
                  <div class="rightminname">完成转运</div>
                  <div class="rightminnum text-color4">30</div>
                </li>
              </ul>
              <ul>
                <li>
                  <div class="rightminname">在途车辆</div>
                  <div class="rightminnum text-color2">24</div>
                </li>
                <li>
                  <div class="rightminname">新增联单</div>
                  <div class="rightminnum text-color2">350</div>
                </li>
              </ul>
              <ul>
                <li>
                  <div class="rightminname">转运预警</div>
                  <div class="rightminnum text-color3">13</div>
                </li>
                <li>
                  <div class="rightminname">在途联单</div>
                  <div class="rightminnum text-color1">24</div>
                </li>
              </ul>
              <ul>
                <li>
                  <div class="rightminname">待转运危废</div>
                  <div class="rightminnum text-color2">1,128</div>
                </li>
                <li>
                  <div class="rightminname">完成联单</div>
                  <div class="rightminnum text-color2">2,118</div>
                </li>
              </ul>
              <ul>
                <li>
                  <div class="rightminname">在途危废</div>
                  <div class="rightminnum text-color1">1,321</div>
                </li>
                <li>
                  <div class="rightminname"></div>
                  <div class="rightminnum"></div>
                </li>
              </ul>
            </div>
          </div>
          <div class="rightbottom">
            <div class="rightbottomtitle">预警信息</div>
            <div class="rightbottombanxin">
              <table width="100%" border="0" class="rightbottomecxalbox">
                <tr
                  class="rightbottomeexeclbody"
                  v-for="(item, index) in warninginformationlist"
                  :key="index"
                >
                  <!-- <td></td> -->
                  <td>
                    <div class="tablebanxin">
                      <div class="tableheader">
                        <div class="tableheaderleft clearfix">
                          <div class="tableheaderchepei" :title="item.chepei">{{ item.chepei }}</div>
                          <span class="tableheadertime">{{ item.time }}</span>
                        </div>
                        <!-- <div class="tableheaderright">查看</div> -->
                      </div>
                      <div class="tablebodytext">
                        {{ item.text }}
                      </div>
                    </div>
                  </td>

                  <!-- <td>{{ item.company }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.num }}</td> -->
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="rightrightbox">
          <div class="rightrighttopbox">
            <div class="rightrightbanxin">
              <!-- <ul class="rightrighttopHW clearfix">
                <li>
                  <div class="righthwbanxin">
                    <p class="hw">HW 08</p>
                    <p class="hwnum">53,221</p>
                  </div>
                </li>
                <li>
                  <div class="righthwbanxin">
                    <p class="hw">HW 08</p>
                    <p class="hwnum">53,221</p>
                  </div>
                </li>
                <li>
                  <div class="righthwbanxin">
                    <p class="hw">HW 08</p>
                    <p class="hwnum">53,221</p>
                  </div>
                </li>
              </ul> -->
              <ul class="rightrighttopHW rightrightbottomHW clearfix">
                <li v-for="(item,index) in proportionList.slice(0,5)" :key="index">
                  <div class="righthwbanxin">
                    <p class="hw" :class="item.textcolor+index">{{item.tpyeName}}</p>
                    <p class="hwnum" :class="item.textcolor+index">{{item.typeNum}}</p>
                  </div>
                </li>
              </ul>
              <div class="rightrightechart" id="rightrightechartbox" v-if="flag1"></div>
              <EmptyData v-else></EmptyData>
            </div>
          </div>
          <div class="rightrightbottombox">
            <div class="rightrightbottombanxin">
              <div class="rightrightbottomtitle">转运实况</div>
              <ul class="table-head">
                <li>车辆编号</li>
                <li>当前状态</li>
                <li>详细信息</li>
              </ul>
              <!--<vue-seamless-scroll :data="wasteproductionexecllist" class="seamless-warp" :class-option="classOption">-->
                <div class="rightrightbottomexcal">
                  <table width="100%" border="0" class="wasteproductionecxalbox">
                    <!-- <tr class="wasteproductioneexeclheader">
                      <td>车辆编号</td>
                      <td>当前状态</td>
                      <td style="text-align:center;padding-right:150px;">详细信息</td>
                      <td></td>
                    </tr> -->
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
              <!--</vue-seamless-scroll>-->
            </div>
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
} from '../../../common/api/rightPanel'
// import mapDiago from '../pegeCommon/mapDiago.vue'
import { getCurrentTime } from '../../../unit/getCurrentTime'
import EmptyData from '../../../../src/components/EmptyData.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  name: 'rightPanel',
  components: {
    EmptyData,
    vueSeamlessScroll
    // mapDiago
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
    }
  },
  data () {
    return {
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
      // reportinglist: [],
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
      // maintoplefteexecllist: [],
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
    this.timerDate = setInterval(() => {
      this.currentTime = getCurrentTime()
    }, 1000)
    this.initData()
  },
  mounted () {
    this.timer = setInterval(this.initData, 60000)
  },
  destroyed () {
    // clearInterval(this.timer)
    clearInterval(this.timer1)
    clearInterval(this.timerDate)
  },
  methods: {
    initData () {
      // 产废量实时汇总
      let regionCode = this.AppConfig.appInfo.regionCode
      // this.timer1 = setInterval(()=> {
      getProdWasteByParams(regionCode).then(res => {
        let xData = []
        let seriesData = []

        if (res.code == 0 && res.data) {
          if (res.data.length == 0) {
            this.flag2 = false
            return
          }
          if (res.data.length > 0) {
            res.data.forEach(item => {
              xData.push(item.qrodWasteTime)

              seriesData.push(item.qrodWasteNum)
            })
            this.getshishiecharts(xData, seriesData)
          }
        }
      })
      // },2000)

      // 转移量实时汇总
      getTransferByParams(regionCode).then(res => {
        let xData = []
        let seriesData = []
        if (res.code == 0 && res.data) {
          if (res.data.length == 0) {
            this.flag3 = false
            return
          }
          if (res.data.length > 0) {
            res.data.forEach(item => {
              xData.push(item.transferTime)
              seriesData.push(item.transferNum)
            })
            this.getzhuanyiecharts(xData, seriesData)
          }
        }
      })
      // 实时库存量
      getStorageByParams(regionCode).then(res => {
        let xData = []
        let seriesData = []
        if (res.code == 0 && res.data) {
          if (res.data.length == 0) {
            this.flag4 = false
            return
          }
          if (res.data.length > 0) {
            res.data.forEach(item => {
              xData.push(item.storageTime)
              seriesData.push(item.storageNum)
            })
            this.getkuchunecharts(xData, seriesData)
          }
        }
      })
      // 企业监控实况、累计实时总量统计
      getQueryInOutInformationByParams(regionCode).then(res => {
        console.log('企业实况监控', res)
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
      getProportionByParams(regionCode).then(res => {
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
          res.data.forEach(item => {
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
      getDPEnterpriseInfo().then(res => {
        if (res.code == 0 && res.data) {
          this.enterpriseBasicInfo = res.data
        }
      })
      // 产废情况对比
      getDPMonitoringDpwaste().then(res => {
        let newArr = []
        if (res.code == 0 && res.data) {
          if (res.data.length > 0) {
            res.data.map((item, index) => {
              newArr.push(Object.assign({}, item, {
                actualProportion: Number((((item.actualNum) / (item.actualNum + item.planNum)) * 100).toFixed(2)),
                planProportion: Number((((item.planNum) / (item.actualNum + item.planNum)) * 100).toFixed(2))
              }))
            })
            this.reportinglist = newArr
          }
        }
      })
    },
    getshishiecharts (xData, seriesData) {
      var myChart = this.$echarts.init(document.getElementById('realechart'))
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
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#188df0'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '  #83bff6'}

                  ]
                )
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    getzhuanyiecharts (xData, seriesData) {
      var myChart = this.$echarts.init(document.getElementById('volumechart'))
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
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#188df0'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '  #83bff6'}

                  ]
                )
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    getkuchunecharts (xData, seriesData) {
      var myChart = this.$echarts.init(
        document.getElementById('inventoryechart')
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
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#188df0'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '  #83bff6'}

                  ]
                )}
            },
            itemStyle: {
              normal: {
                color: 'rgba(34, 82, 240, 1)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
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

<style scoped>
@import "../../../assets/css/rightPanelnew68.css";
.text-color1 {
  color: rgba(240, 150, 34, 1);
}
.text-color2 {
  color: rgba(92, 174, 254, 1);
}
.text-color3 {
  color: rgba(240, 34, 34, 1);
}
.text-color4 {
  color: rgba(34, 240, 237, 1);
}
.text-style-0 {
    color: rgba(240, 34, 34, 1);
  }
  .text-style-2 {
    color: rgba(250, 201, 84, 1);
  }
  .text-style-3 {
    color: rgba(252, 141, 82, 1);
  }
  .text-style-4 {
    color: rgba(88, 169, 149, 1);
  }
  .text-style-1 {
    color: rgba(137, 113, 197, 1);
  }
  .table-head {
    display: flex;
  }
  .table-head li {
    flex: 2;
    display: flex;
    align-items: center;
    height: 50px;
    color: #ffffff;
    font-size: 20px;
  }
  .table-head li:nth-child(3) {
    flex: 4;
  }
  .seamless-warp{
    width: 100%;
    height: calc(100% - 90px);
    overflow: hidden;
  }
</style>
