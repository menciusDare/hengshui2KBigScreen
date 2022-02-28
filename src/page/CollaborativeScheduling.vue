<template>
  <div class="collaborative mainContainer">
    <MapMain></MapMain>
    <div class="showContentsLeft left0">
      <OnlineSituation></OnlineSituation>
      <TaskStatistics></TaskStatistics>
    </div>
    <div class="showContentsLeft left924">
      <RegionalRanking></RegionalRanking>
      <TypeStatistics></TypeStatistics>
    </div>
    <div class="showContentsRight right1181">
      <CurrentTask></CurrentTask>
    </div>
    <div class="showContentsRight right0">
      <div class="backgroundPop marginBottom timeoutTask">
        <TimeoutTask></TimeoutTask>
        <AssessmentRanking></AssessmentRanking>
      </div>
    </div>
    <div class="leftTab">
      <div v-for="(item, index) in leftTab " :key="index" :class="item.id === tabselected ? 'selected': ''">
        {{item.name}}
      </div>
    </div>
  </div>
</template>
<script>
import OnlineSituation from '@/components/CollaborativeScheduling/OnlineSituation.vue'// 在线情况
import TaskStatistics from '@/components/CollaborativeScheduling/TaskStatistics.vue'// 协同人员任务统计
import RegionalRanking from '@/components/CollaborativeScheduling/RegionalRanking.vue'// 协同任务区域排名
import TypeStatistics from '@/components/CollaborativeScheduling/TypeStatistics.vue'// 协同任务类型统计
import CurrentTask from '@/components/CollaborativeScheduling/CurrentTask.vue'// 当前协同任务
import TimeoutTask from '@/components/CollaborativeScheduling/TimeoutTask.vue'// 超时事件
import AssessmentRanking from '@/components/CollaborativeScheduling/AssessmentRanking.vue'// 区域考核排名
import MapMain from '@/components/CollaborativeScheduling/MapMain.vue'// 区域考核排名

export default{
  components: {
    OnlineSituation,
    RegionalRanking,
    TaskStatistics,
    TypeStatistics,
    CurrentTask,
    TimeoutTask,
    AssessmentRanking,
    MapMain
  },
  data () {
    return {
      leftTab: [
        {name: '任务分布', id: 'renwu'},
        {name: '网格员分布', id: 'wgy'},
        {name: '巡查分布', id: 'xuncha'}
      ],
      tabselected: 'renwu'
    }
  }
}
</script>
