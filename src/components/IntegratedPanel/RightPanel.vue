<template>
  <div class="rightPanel flex1">
    <div class="rightPanelMain rowSpace">
      <ComprehensiveReview
        type="zonghe"
        :conprehensiveName = "conprehensiveName"
        :panelParmas = "panelData.airEnvironment"
        :waterQualityDetail = "airQualityDetail" ></ComprehensiveReview>
      <div class="rowSpace flexColumn">
        <div class="height428px w590 panelCommon ">
          <inter-overall-water></inter-overall-water>
        </div>
        <div class="height428px w590 panelCommon p22-6">
          <integrated-rank-wuran></integrated-rank-wuran>
        </div>
      </div>
      <div class="rowSpace flexColumn">
        <div class="height428px w590 panelCommon p22-6">
          <inter-polloutant-trend></inter-polloutant-trend>
        </div>
        <div class="height428px w590 panelCommon p22-6">
          <inter-questions></inter-questions>
        </div>
      </div>
      <div class="rowSpace flexColumn">
        <div class="w590 panelCommon p22-6">
          <inter-xie-tong></inter-xie-tong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ComprehensiveReview from '@/components/Common/pegeCommon/ComprehensiveReview.vue'
import IntegratedRankWuran from './RightPanel/integratedRankWuran'
import InterOverallWater from './RightPanel/InterOverallWater'
import InterPolloutantTrend from './RightPanel/interPolloutantTrend'
import InterQuestions from './RightPanel/interQuestions'
import interXieTong from './RightPanel/interXieTong'
export default {
  name: 'RightPandel',
  data () {
    return {
      panelData: {
        airEnvironment: {
          waterLevel: 'ECI',
          num: '--',
          countryNum: '--',
          dayRate: '--',
          company: '',
          ratePercent: '--'
        }
      },
      airQualityDetail: [
        {name: '全国综合排名', id: 'countryNum', isStatus: true, Company: ''},
        {name: '优良天数占比', id: 'dayRate', isStatus: true, Company: '%'},
        {name: '占比', id: 'ratePercent', isStatus: false, Company: '%'}
      ],
      conprehensiveName: '协同调度综合看版'
    }
  },
  components: {
    InterQuestions,
    InterPolloutantTrend,
    InterOverallWater,
    IntegratedRankWuran,
    ComprehensiveReview,
    interXieTong
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
