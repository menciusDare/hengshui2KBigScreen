<template>
  <div class="mainContainer regionalEnvironment">
    <div class="showContentsLeft left0">
      <RegionalControl></RegionalControl>
    </div>
    <div class="showContentsLeft left1672">
      <AirQualityDay></AirQualityDay>
    </div>
    <div class="showContentsLeft top274 left2993">
      <div class="backgroundPop width2844 height951 rowSpace">
        <!-- 水环境质量考核 -->
        <WaterAssessment></WaterAssessment>
        <!-- 地表水质量变化趋势 -->
        <FloodWaterTrend></FloodWaterTrend>
        <!-- 水质达标情况 -->
        <WaterStandard></WaterStandard>
      </div>
    </div>
    <div class="showContentsRight right0">
      <div class="backgroundPop width1500 rowSpace height1150">
        <!-- 考核排名--站点排名 -->
        <AssessmentRank></AssessmentRank>
        <SiteRank></SiteRank>
      </div>
    </div>
    <div class="showContentsRight right1679">
      <!-- 变化趋势分析 -->
      <ChangeTrendPrp></ChangeTrendPrp>
    </div>
  </div>
</template>
<script>
import RegionalControl from '@/components/RegionalEnvironment/RegionalControl.vue'
import AirQualityDay from '@/components/RegionalEnvironment/AirQualityDay.vue'
import WaterAssessment from '@/components/RegionalEnvironment/WaterAssessment.vue'
import FloodWaterTrend from '@/components/RegionalEnvironment/FloodWaterTrend.vue'
import WaterStandard from '@/components/RegionalEnvironment/WaterStandard.vue'
import AssessmentRank from '@/components/RegionalEnvironment/AssessmentRank.vue'
import SiteRank from '@/components/RegionalEnvironment/SiteRank.vue'
import ChangeTrendPrp from '@/components/RegionalEnvironment/ChangeTrendPrp.vue'

export default{
  components: {
    RegionalControl,
    AirQualityDay,
    WaterAssessment,
    FloodWaterTrend,
    WaterStandard,
    AssessmentRank,
    SiteRank,
    ChangeTrendPrp
  }
}
</script>
<style>

</style>
