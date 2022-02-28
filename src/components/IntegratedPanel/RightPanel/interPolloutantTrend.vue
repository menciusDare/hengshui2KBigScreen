<template>
  <div class="pollutantTrend">
    <div class="titleName pollutantMain rowSpace">
      <div>污染物趋势</div>
      <div class="rowFlex">
        <el-select v-model="value" placeholder="请选择" @change="pollutantTrendsData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="valueYinzi" placeholder="请选择" @change="pollutantTrendsData">
          <el-option
            v-for="item in optionsYinzi"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="zhexianMain">
      <Zhexian
        :data="dataListx"
        :id="levelRankId"
        :params = "zhexianParams" v-if="isShow"></Zhexian>
    </div>
  </div>
</template>

<script>
import Zhexian from '@/components/Common/Echarts/Zhexian.vue'
import {pollutantTrends} from '@/common/api/IntegratedPanel'

export default {
  name: 'interPolloutantTrend',
  data () {
    return {
      options: [
        {value: '1', label: '本周'},
        {value: '2', label: '本日'}
      ],
      value: '1',
      areaCode: this.AppConfig.appInfo.regionCode,
      listData: [],
      optionsYinzi: [
        {value: '1', label: '空气'},
        {value: '2', label: '水'}
      ],
      isShow: false,
      valueYinzi: '1',
      dataListx: [
        {
          name: 'I,II',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'III',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'IV',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'V',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        }
      ],
      levelRankId: 'trendMain',
      zhexianParams: {
        xIsTrue: true,
        yIsTrue: true,
        color: ['rgba(1, 213, 185, 1)', 'rgba(218, 218, 218, 1)', 'rgba(156, 102, 101, 1)', 'rgba(102, 45, 236, 1)', 'rgba(45, 84, 236, 1)'],
        isAreaStyle: false,
        id: 'noCommon',
        grid: {
          width: '90%',
          height: '75%',
          bottom: '10%',
          left: '8%'
        },
        data: [],
        legend: true,
        position: 'left',
        lengendPositions: 'left',
        tooltip: true
      }
    }
  },
  components: {
    Zhexian
  },
  mounted () {
    this.pollutantTrendsData()
  },
  methods: {
    pollutantTrendsData () {
      var _this = this
      this.isShow = false
      pollutantTrends(_this.areaCode, _this.valueYinzi, _this.value).then(res => {
        _this.getChartDataLine(res.data)
      })
    },
    getChartDataLine (listData) {
      if (this.valueYinzi == '1') {
        this.listData = listData.airDataList
        this.zhexianParams.data = this.listData.monitortime
        let chartData = [{code: 'aqi'}, {code: 'pm25'}, {code: 'pm10'}, {code: 'no2'}, {code: 'so2'}, {code: 'co'}]
        let nameList = {
          aqi: 'AQI',
          pm25: 'PM25',
          pm10: 'PM10',
          no2: 'NO2',
          so2: 'SO2',
          co: 'CO'
        }
        chartData.map(item => {
          item.name = nameList[`${item.code}`]
          item.type = 'line'
          item.stack = '容量'
          item.data = this.listData[`${item.code}`]
        })
        this.dataListx = chartData
      } else {
        this.listData = listData.waterDataList
        for (let i = 0; i < this.listData.level1.length; i++) {
          this.listData.level1[i] = this.listData.level1[i] + this.listData.level2[i]
        }
        this.zhexianParams.data = this.listData.monitortime
        var chartData = [{code: 'level1'}, {code: 'level3'}, {code: 'level4'}, {code: 'level5'}]
        let nameList = {
          level1: 'I、II',
          level3: 'III',
          level4: 'IV',
          level5: 'V'
        }
        chartData.map(item => {
          item.name = nameList[`${item.code}`]
          item.type = 'line'
          item.stack = '容量'
          item.data = this.listData[`${item.code}`]
        })
        this.dataListx = chartData
      }
      this.isShow = true
    }
  }
}
</script>

<style scoped>
.pollutantTrend{
  width: 100%;
  height: 100%;
}
.zhexianMain{
  width: 100%;
  height: calc(100% - 40px);
}
</style>
