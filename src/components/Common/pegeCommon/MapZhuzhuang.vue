<template>
  <div class="bottomZhuzhuang rowSpace">
    <!-- <div class="tips alginCenter rowCenter" style="padding: 10px">
      <div>
        <div>{{time[0]}} - </div>
        <div>{{time[1]}}</div>
      </div>
    </div> -->
    <div class="zhuzhuangEchartsData">
      <zhuzhuangEcharts
        :params="zhuzhuangEchartsData"
        v-if="isShowZhuzhuangEchartsData"
        @changeZhuzhuang="changeZhuzhuang"
        ref="zhuzhuangEchartsData"></zhuzhuangEcharts>
    </div>
  </div>
</template>

<script>
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import { getAQIStatistics, getWaterQualityComplexEchartView } from '@/common/api/MapBottomZhuzhuang'
// import CheckPanel from '../MapCon/CheckPanel'
import mapCheckPanel from '@/components/Common/MapCon/js/mapCheckPanel.js'

export default {
  name: 'MapZhuzhuang',
  data () {
    return {
      zhuzhuangEchartsData: {
        xAxis: ['区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名'],
        series: [],
        id: 'zhuzhuangEchartsData1',
        grid: {
          width: '98%',
          height: '75%',
          bottom: '10%',
          left: '1%'
        },
        isShowy: true,
        isSplitLine: false,
        isShowx: false,
        barWidth: 5,
        showBackground: true,
        tooltip: true
      },
      isShowZhuzhuangEchartsData: false,
      regionCode: this.AppConfig.appInfo.regionCode,
      time: {
        0: '',
        1: ''
      },
      colorList: {
        0: 'rgba(0, 0, 0, .3)',
        1: 'rgba(0,280,0,.3)',
        2: 'rgba(255,255,0,0.3)',
        3: 'rgba(255,128,0,0.3)',
        4: '#ff0000',
        5: '#99004C',
        6: '#7E0023'
      }
    }
  },
  components: {
    zhuzhuangEcharts
  },
  methods: {
    // 柱状图
    getAirAQIStatistics () {
      this.isShowZhuzhuangEchartsData = false
      getAQIStatistics('120', this.regionCode).then(res => {
        var data = []
        console.log(res.data)
        let chartData = res.data
        this.zhuzhuangEchartsData.xAxis = chartData.monitortime
        let air = [
          {name: 'aqi', data: [[0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 1000]]},
          {name: 'co', data: [[0, 5], [6, 10], [11, 35], [36, 60], [61, 90], [91, 10000]]},
          {name: 'pm25', data: [[0, 35], [36, 75], [76, 115], [116, 150], [151, 250], [251, 10000]]},
          {name: 'pm10', data: [[0, 50], [51, 150], [151, 250], [251, 350], [351, 420], [421, 1000]]},
          {name: 'so2', data: [[0, 150], [151, 500], [501, 650], [651, 800], [801, 1600], [1601, 20000]]},
          {name: 'no2', data: [[0, 100], [101, 200], [201, 700], [701, 1200], [1201, 2340], [2341, 30000]]},
          {name: 'o3', data: [[0, 160], [161, 200], [201, 300], [301, 400], [401, 800], [801, 10000]]}
        ]
        let level = air.filter(item => item.name === 'aqi')[0]
        this.zhuzhuangEchartsData.series = this.getLevel(res.data['aqi'], level)
        this.time['0'] = chartData['monitortime'][0]
        this.time['1'] = chartData['monitortime'][`${chartData['monitortime'].length - 1}`]
        this.isShowZhuzhuangEchartsData = true
        console.log(this.zhuzhuangEchartsData.series)
      })

      // var params = new URLSearchParams();
      // params.append("day", 120);
      // params.append("regionCode",_this.regionCode);
      // _this.isShowZhuzhuangEchartsData = false
      //
      // _this.$axios.post(url, params).then(
      //   function (res) {
      //     if(res.status == 200){
      //
      //     }
      //   }
      // ).catch(function (error) {
      //   console.log(error)
      // })
    },
    getLevel (data, level) {
      console.log(data, level)
      let newData = []
      data.forEach(itemlist => {
        level.data.forEach((item2, index2) => {
          if (itemlist >= item2[0] && itemlist <= item2[1]) {
            let list = {
              value: itemlist,
              itemStyle: {
                color: this.colorList[index2]
              },
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(193,17,17,0.2)'
              }
            }
            newData.push(list)
          }
        })
      })
      console.log(newData, '<<<<<<<<<<')
      return newData
    },
    getTypeData () {
      (this.type === 'air' && this.getAirAQIStatistics()) ||
      (this.type === 'water' && this.getWaterMapZhuZhuang())
    },
    getWaterMapZhuZhuang () {
      this.isShowZhuzhuangEchartsData = false
      getWaterQualityComplexEchartView('120', this.regionCode).then(res => {
        console.log(res.data)
        let chartData = res.data
        this.time['0'] = chartData['monitortime'][0]
        this.time['1'] = chartData['monitortime'][`${chartData['monitortime'].length - 1}`]
        this.zhuzhuangEchartsData.series = res.data.fkWaterlevelid.map(
          item => {
            return {
              value: item,
              itemStyle: {
                color: this.colorList[item]
              }
            }
          }
        )
        console.log(this.zhuzhuangEchartsData.series, 'this.zhuzhuangEchartsData.seriesvthis.zhuzhuangEchartsData.seriesthis.zhuzhuangEchartsData.series')
        this.zhuzhuangEchartsData.xAxis = chartData.monitortime
        this.isShowZhuzhuangEchartsData = true
      })
      console.log('getWaterMapZhuZhuang')
    },
    changeZhuzhuang (params) {
      this.$emit('getZhuangTuDataTime', (params))
    }
  },
  props: {
    type: String,
    getZhuangTuDataTime: Function
  },
  watch: {
    type: function () {
      this.getTypeData()
    }
  },
  mounted () {
    this.getTypeData()
  }
}
</script>

<style scoped>

</style>
