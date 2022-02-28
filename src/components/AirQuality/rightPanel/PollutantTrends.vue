<template>
  <div class="pollutantMain">
    <div class="titleName rowSpace">
      <span>污染物趋势</span>
      <div class="rowFlex">
        <el-select v-model="dateType" placeholder="请选择" @change="getAreaPollutantTrend">
          <el-option label="天" value="1"></el-option>
          <el-option label="周" value="2"></el-option>
        </el-select>
        <el-select v-model="valueOptions" placeholder="请选择" @change="getAreaPollutantTrend">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="zhexianMain">
      <Zhexian
        v-if="isShow"
        :data = "pollutantData"
        :id="id"
        :params = "zhexianParams"></Zhexian>
    </div>
  </div>
</template>

<script>
import Zhexian from '../../Common/Echarts/Zhexian'

export default {
  name: 'PollutantTrends',
  data () {
    return {
      pollutantData: [
        {
          name: '污染物趋势',
          type: 'line',
          stack: '污染物趋势',
          data: [120, 132]
        }],
      id: 'pollutantId',
      zhexianParams: {
        xIsTrue: true,
        yIsTrue: true,
        color: ['rgba(75, 237, 220, 1)'],
        isAreaStyle: false,
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
      value1: '',
      dateType: '1',
      options: [
        {label: 'AQI', value: 'aqi'},
        {label: 'PM2.5', value: 'pm25'},
        {label: 'PM10', value: 'pm10'},
        {label: 'SO2', value: 'so2'},
        {label: 'NO2', value: 'no2'},
        {label: 'O3', value: 'o3'},
        {label: 'CO', value: 'co'}
      ],
      valueOptions: 'aqi',
      isShow: false
    }
  },
  components: {
    Zhexian
  },
  mounted () {
    this.getAreaPollutantTrend()
    console.log('data' + this.zhexianParams.data)
  },
  methods: {
    getAreaPollutantTrend () {
      var _this = this
      _this.isShow = false
      var url = '/api/online-monitor-data-share/TEnvDaydataAreaAir/getAreaPollutantTrend'
      var params = new URLSearchParams()
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      params.append('dateType', _this.dateType)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            var chartData = res.data.data
            _this.zhexianParams.data = chartData.monitortime
            _this.pollutantData[0].data = chartData[_this.valueOptions]
            console.log(_this.pollutantData[0].data)
            _this.isShow = true
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.zhexianMain {
  height: 209px;
  width: 100%;
}
.pollutantMain{
  margin-bottom: 13px;
}
</style>
