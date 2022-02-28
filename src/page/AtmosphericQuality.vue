<template>
  <div class="mainContainer atmosphericQuality">
    <MapMain ref="MapMain"></MapMain>
    <div class="showContentsLeft left0">
      <QualityStatus></QualityStatus>
      <AirForecast></AirForecast>
    </div>
    <div class="showContentsLeft left924">
      <QualityDistribution></QualityDistribution>
      <Changingtrend></Changingtrend>
    </div>
    <!-- <div class="parameDate">
      <ul class="parame ulTab">
        <li class="rowSpace alginCenter biaotou">
          <span>参数</span>
          <i class="el-icon-arrow-up"></i>
        </li>
        <ul>
          <li v-for="(item, index) in parame" :key="index" :class="item.selected ? 'selected': ''">
            {{item.name}}
          </li>
        </ul>
      </ul>
      <div class="jcdata jcMainList marginTop26">
        <div class="titlejc flexRow rowSpace alginCenter">
          <span>监测数据</span>
          <i class="el-icon-arrow-up"></i>
        </div>
        <div class="radioMain changeRadio">
          <el-radio-group v-model="radio" v-for="(item, index) in waterRadio" :key="index" @change="changeItem(item.id)">
            <el-radio :label="item.id">
              <span class="iconRadio" :class="item.icon">{{item.name}}</span>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
    </div> -->
    <div class="showContentsRight right0 right1500 ranking">
      <Ranking></Ranking>
    </div>
    <div class="showContentsRight right1671 right400 video">
      <Video></Video>
    </div>
  </div>
</template>
<script>
import MapMain from '@/components/AtmosphericQuality/MapMain.vue'
import QualityStatus from '@/components/AtmosphericQuality/QualityStatus.vue'
import AirForecast from '@/components/AtmosphericQuality/AirForecast.vue'
import QualityDistribution from '@/components/AtmosphericQuality/QualityDistribution.vue'
import Changingtrend from '@/components/AtmosphericQuality/Changingtrend.vue'
import Video from '@/components/AtmosphericQuality/Video.vue'
import Ranking from '@/components/AtmosphericQuality/Ranking.vue'
export default{
  components: {
    MapMain,
    QualityStatus,
    AirForecast,
    QualityDistribution,
    Ranking,
    Video,
    Changingtrend
  },
  data () {
    return {
      parame: [
        {name: 'AQI', selected: true},
        {name: 'PM2.5', selected: false},
        {name: 'AQI', selected: false},
        {name: 'PM2.5', selected: false},
        {name: 'AQI', selected: false},
        {name: 'PM2.5', selected: false},
        {name: 'AQI', selected: false}
      ],
      textTab: [
        {name: '实时', id: 'time', selected: true},
        {name: '日', id: 'data', selected: false},
        {name: '月', id: 'mouth', selected: false},
        {name: '年', id: 'year', selected: false}
      ],
      waterRadio: [
        {name: '国控站', id: 'guo', icon: 'guo'},
        {name: '省控站', id: 'sheng', icon: 'sheng'},
        {name: '市控站', id: 'shi', icon: 'shi'},
        {name: '微型站', id: 'wei', icon: 'wei'},
        {name: '视频监控', id: 'viedeo', icon: 'video'}
      ],
      radio: 'guo'
    }
  }
}
</script>
<style>
</style>
