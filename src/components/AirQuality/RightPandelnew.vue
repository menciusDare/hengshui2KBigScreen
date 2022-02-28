<template>
  <div class="rightPanel flex1">

    <div class="rightPanelMain rowSpace">
      <ComprehensiveReview
        type="air"
        :conprehensiveName = "conprehensiveName"
        :panelParmas = "panelData.airEnvironment"
        :waterQualityDetail = "airQualityDetail" ></ComprehensiveReview>
      <div class="w590 panelCommon p22-6 rowSpace flexColumn">
        <LevelPrence></LevelPrence>
        <div>
          <PollutantTrends></PollutantTrends>
          <levelRank></levelRank>
        </div>
      </div>
      <div class="w590 panelCommon p22-6 rowSpace flexColumn">
        <PrimaryPollutant></PrimaryPollutant>
        <VideoMain></VideoMain>
      </div>
      <div class="w590 panelCommon p22-6 rowSpace flexColumn">
        <AirQualityRank></AirQualityRank>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from '../Common/TableCommon'
import Zhexian from '@/components/Common/Echarts/Zhexian.vue'
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import ComprehensiveReview from '@/components/Common/pegeCommon/ComprehensiveReview.vue'
import LevelPrence from './rightPanel/LevelPrence'
import PollutantTrends from './rightPanel/PollutantTrends'
import levelRank from './rightPanel/levelRank'
import PrimaryPollutant from './rightPanel/PrimaryPollutant'
import VideoMain from './rightPanel/VideoMain'
import AirQualityRank from './rightPanel/AirQualityRank'

export default {
  name: 'RightPandel',
  data () {
    return {
      rightPanelTab: [
        {name: '空气质量监测', id: 'water'},
        {name: '空气预测预报', id: 'futou'}
      ],
      rightPanelTabSelected: 'water',
      panelData: {
        airEnvironment: {
          waterLevel: 'AQI',
          num: '66',
          percent: '42.9',
          countryNum: 12,
          waterNum: 66,
          company: ''
        }
      },
      airQualityDetail: [
        {name: '全国综合排名', id: 'countryNum', isStatus: true, Company: ''},
        {name: '大气综合', id: 'waterNum', isStatus: true, Company: ''},
        {name: '优良天气占比', id: 'percent', isStatus: false, Company: '%'}
      ],
      conprehensiveName: '空气质量综合看版'
    }
  },
  components: {
    AirQualityRank,
    VideoMain,
    LevelPrence,
    TableCommon,
    Zhexian,
    zhuzhuangEcharts,
    ComprehensiveReview,
    PollutantTrends,
    levelRank,
    PrimaryPollutant
  },
  mounted () {
    this.getRealTimeAQI()
  },
  methods: {
    getRealTimeAQI () {
      var _this = this
      var url = '/api/online-monitor-data-share/airData/getRealTimeAQI'
      var params = new URLSearchParams()
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            var realAQI = res.data.data
            _this.panelData.airEnvironment.num = realAQI.aqi
            _this.panelData.airEnvironment.waterNum = realAQI.aqi
            _this.panelData.airEnvironment.percent = realAQI.yearGoodAccount
            _this.panelData.airEnvironment.countryNum = realAQI.comprehensiveRank
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style>
@import "../../assets/css/RightPanel.css";
.panelCommon .titleName{
  padding: 0 10px;
}
</style>
