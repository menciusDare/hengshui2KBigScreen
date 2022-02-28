<template>
  <div class="mapMain collaborativePop">
    <div class="mapPop atmospher" v-if="mapPopOpen">
      <div class="mapPopTitle rowSpace alginCenter">
        <span>咸宁 咸宁环保局</span>
        <i class="el-icon-close" @click="mapPopOpen = false"></i>
      </div>
      <div class="mapPopMain">
        <div>
          上地工业园北区未完成减排任务
        </div>
        <ul>
          <li>上报时间：<strong>2020年9月19日 12:00</strong></li>
          <li>截止时间：<strong>2020年9月19日 12:00</strong></li>
          <li>所属网格：<strong>网格10</strong></li>
          <li>当前处理人：<strong>智小慧</strong></li>
          <li>办理状态：<strong>办理中</strong></li>
        </ul>
      </div>
    </div>
    <div class="mapSign">
      <ul>
        <li>
          <i class="iconSign xun"></i>
          <span>巡查任务</span>
        </li>
        <li>
          <i class="iconSign pai"></i>
          <span>排查任务</span>
        </li>
        <li>
          <i class="iconSign guan"></i>
          <span>管控任务</span>
        </li>
        <li>
          <i class="iconSign fu"></i>
          <span>复查任务</span>
        </li>
      </ul>
    </div>
    <div class="mapSign people">
      <ul>
        <li>
          <i class="iconSign online"></i>
          <span>在线人员</span>
        </li>
        <li>
          <i class="iconSign noline"></i>
          <span>离线人员</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      mapPopOpen: true
    }
  }
}
</script>
