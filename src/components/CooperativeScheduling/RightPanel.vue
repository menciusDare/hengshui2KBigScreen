<template>
  <div class="rightPanel flex1">
    <div class="rightPanelMain rowSpace">
      <ComprehensiveReview
        type="xietong"
        :conprehensiveName = "conprehensiveName"
        :panelParmas = "panelData.airEnvironment"
        :waterQualityDetail = "airQualityDetail" ></ComprehensiveReview>
      <div class="rowSpace flexColumn">
        <div class="height428px w590 panelCommon p22-6">
          <TasksCollaborators></TasksCollaborators>
        </div>
        <div class="height428px w590 panelCommon p22-6">
          <CurrentTasksCollaborators></CurrentTasksCollaborators>
        </div>
      </div>
      <div class="rowSpace flexColumn">
        <div class="height428px w590 panelCommon p22-6">
          <collRegionalRanking></collRegionalRanking>
        </div>
        <div class="height428px w590 panelCommon p22-6">
          <coll-type-statistics></coll-type-statistics>
        </div>
      </div>
      <div class="rowSpace flexColumn">
        <div class="height428px w590 panelCommon p22-6">
          <coll-timeout-event></coll-timeout-event>
        </div>
        <div class="height428px w590 panelCommon p22-6">
          <coll-regional-assessment-ranking></coll-regional-assessment-ranking>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from '../Common/TableCommon'
import Zhexian from '@/components/Common/Echarts/Zhexian.vue'
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import ComprehensiveReview from '@/components/Common/pegeCommon/ComprehensiveReview.vue'
import TasksCollaborators from './rightPanel/TasksCollaborators.vue'
import CurrentTasksCollaborators from './rightPanel/CurrentTasksCollaborators.vue'
import collRegionalRanking from './rightPanel/collRegionalRanking.vue'
import CollTypeStatistics from './rightPanel/collTypeStatistics'
import CollRegionalAssessmentRanking from './rightPanel/collRegionalAssessmentRanking'
import CollTimeoutEvent from './rightPanel/collTimeoutEvent'
import {getComprehensiveStatistics} from '@/common/api/cooperativeScheduling.js'
// import LevelPrence from "./rightPanel/LevelPrence";
// import PollutantTrends from "./rightPanel/PollutantTrends";
// import levelRank from  './rightPanel/levelRank'
// import PrimaryPollutant from  './rightPanel/PrimaryPollutant'
// import VideoMain from "./rightPanel/VideoMain";
// import AirQualityRank from "./rightPanel/AirQualityRank";
export default {
  name: 'RightPandel',
  data () {
    return {
      panelData: {
        airEnvironment: {
          waterLevel: '在线率',
          num: '42.9',
          percent: '485',
          onlineCount: 320,
          offlineCount: 48,
          company: '%'
        }
      },
      airQualityDetail: [
        {name: '在线数', id: 'onlineCount', isStatus: true, Company: ''},
        {name: '离线数', id: 'offlineCount', isStatus: true, Company: ''},
        {name: '当前任务', id: 'percent', isStatus: true, Company: ''}
      ],
      conprehensiveName: '协同调度综合看版'
    }
  },
  components: {
    CollTimeoutEvent,
    CollRegionalAssessmentRanking,
    CollTypeStatistics,
    TasksCollaborators,
    // AirQualityRank,
    // VideoMain,
    // LevelPrence,
    // TableCommon,
    // Zhexian,
    // zhuzhuangEcharts,
    ComprehensiveReview,
    CurrentTasksCollaborators,
    collRegionalRanking
    // PollutantTrends,
    // levelRank,
    // PrimaryPollutant,
  },
  created () {
    this.loadingData()
  },
  methods: {
    loadingData () {
      getComprehensiveStatistics().then(res => {
        if (res.code == 0) {
          this.panelData.airEnvironment.num = res.data.onlineRate
          this.panelData.airEnvironment.percent = res.data.taskCount
          this.panelData.airEnvironment.offlineCount = res.data.offlineCount
          this.panelData.airEnvironment.onlineCount = res.data.onlineCount
        }
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
.height428px{
  height: 428px;
}
</style>
