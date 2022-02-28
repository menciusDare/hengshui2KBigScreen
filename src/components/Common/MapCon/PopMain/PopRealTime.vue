<template>
  <div class="popContainer">
    <div class="time rowFlex">
      <div class="timeName" v-if="type==='water'">监测时间：</div>
      <div class="timeName" v-else>数据时间：</div>
      <div>{{defaultData.monitorTime}}</div>
    </div>
    <div class="time rowFlex" v-if="type === 'water'">
      <div class="timeName">状态：</div>
      <div>{{stationsStatus[`${defaultData[`${type} === 'air' ? 'alarmStatus': 'alarmInfo'`]}`] || '--'}}</div>
    </div>
    <div class="pollutantTabMain rowFlex first1 flexWarp">
      <div
        class="pollutantTabLi "
        :class="type"
        v-for="item in pollutantTab">
        <div>
          {{item.name}}
        </div>
        <div v-if="type === 'water'">
          {{item.monitoringValue || '--'}}
        </div>
        <div v-else>
          {{realTimeData[item.code]}}<span class="danwei">{{item.danwei}}</span>
        </div>
      </div>
    </div>
    <div class="pollutantTabMain nameMains rowFlex">
      <div class="pollutantTabLi name"
        v-for="item in pollutantTab"
        :class="pollutantCode === item.code ? 'isActive': ''"
        @click="changePollutantTab(item.code)">
        {{item.name}}
      </div>
    </div>
    <div class="pollutantZheXian">
      <zhe-xian
        v-if="isShow"
        :data = "pollutantData"
        :id="id"
        :params = "zhexianParams"></zhe-xian>
    </div>
  </div>
</template>

<script>
import {getWaterBasReachRealData, getdetail, typelist} from '@/common/api/popMain.js'
import ZheXian from '../../Echarts/Zhexian'

export default {
  name: 'PopRealTime',
  components: {ZheXian},
  data () {
    return {
      time: '',
      stationsStatus: {
        1: '正常',
        2: '预警',
        3: '报警'
      },
      pollutantCode: 'w01001',
      pollutantCodes: 'w01001,w01009,w21003,w01019',
      pollutantTab: [],
      // 折线图
      pollutantData: [
        {
          name: '污染物趋势',
          type: 'line',
          stack: '污染物趋势',
          data: []
        }],
      id: 'pollutantZheXian',
      zhexianParams: {
        xIsTrue: true,
        yIsTrue: true,
        color: ['#0fb6f5'],
        isAreaStyle: true,
        id: 'noCommon',
        grid: {
          width: '90%',
          height: '70%',
          bottom: 20,
          right: 20
        },
        legend: false,
        data: ['10:00', '11:00'],
        position: 'left',
        tooltip: true
      },
      isShow: false,
      realTimeData: {}
    }
  },
  props: {
    defaultData: Object,
    type: String
  },
  methods: {
    getStationYinzi () {
      if (this.type === 'water') {
        this.getStationWater()
      } else {
        this.pollutantCode = 'aqi'
        this.getStationAir()
      }
    },
    getStationWater () {
      let pollutantCode = this.pollutantCode
      let pollutantCodes = this.pollutantCodes
      let stationId = this.defaultData.unifiedCode
      this.isShow = false
      getWaterBasReachRealData(pollutantCode, pollutantCodes, stationId).then(res => {
        console.log(res.data)
        this.pollutantTab = res.data.pollutantAllList
        let data = []
        res.data.hourData.forEach(item => {
          data.push(item[1])
        })
        this.pollutantData[0].data = data
        this.zhexianParams.data = res.data.xList
        this.isShow = true
        console.log(this.pollutantData.data)
      })
    },
    getStationAir () {
      let stationId = this.defaultData.unifiedCode
      this.isShow = false
      this.pollutantTab = [
        {name: 'AQI', code: 'aqi', danwei: ''},
        {name: 'PM2.5', code: 'pm25', danwei: 'μg/m³'},
        {name: 'CO', code: 'co', danwei: 'μg/m³'},
        {name: 'PM10', code: 'pm10', danwei: 'μg/m³'},
        {name: 'SO2', code: 'so2', danwei: 'μg/m³'},
        {name: 'NO2', code: 'no2', danwei: 'μg/m³'},
        {name: 'O3', code: 'o3', danwei: 'μg/m³'}
      ]
      getdetail(stationId).then(res => {
        console.log(res.data)
        this.realTimeData = res.realTimeData
      })
      typelist(stationId).then(res => {
        let data = []
        let xData = []
        res.data.forEach(item => {
          data.push(item[this.pollutantCode])
          xData.push(item['hours'])
        })
        this.pollutantData[0].data = data
        this.zhexianParams.data = xData
        this.isShow = true
        console.log(this.pollutantData.data)
      })
    },
    changePollutantTab (code) {
      this.pollutantCode = code
      console.log(this.type)
      if (this.type === 'water') {
        this.getStationWater()
      } else {
        this.getStationAir()
      }
    }
  },
  mounted () {
    this.getStationYinzi()
  },
  watch: {
    'defaultData.unifiedCode': function () {
      this.getStationYinzi()
    }
  }
}
</script>

<style scoped>
.pollutantZheXian{
  height: 140px;
  width: 100%;
}
.time{
  padding: 10px;
  font-size: 16px;
  color: #8697a6;
}
.pollutantTabMain{
  padding: 10px;
  color: #8697a6;
  box-sizing: border-box;
  margin: 10px 0;
}
.pollutantTabMain.first1{
  border-bottom: 1px solid #2e3d52;
  border-top: 1px solid #2e3d52;
}
.pollutantTabLi>div:first-child{
  margin-bottom: 10px;
}
.pollutantTabMain .pollutantTabLi.name{
  cursor: pointer;
  padding: 0 10px;
  border: 1px solid #143e59;
  border-right: 0px;
  line-height: 30px;
}
.pollutantTabMain .pollutantTabLi.name:last-child{
  border-right: 1px solid #143e59;
}
.nameMains{
  width: auto;
}
.isActive{
  background: #4192b0;
  color: #fff;
}
.pollutantTabLi.air{
  width: 25%;
  margin-top: 10px;
}
.danwei{
  color: #4192b0;
  font-weight: bold;
}
</style>
