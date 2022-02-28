<template>
  <div class="mainContainer axeHeadLake">
   <MapMain></MapMain>
      <div class="showContentsLeft left0">
        <WaterQality></WaterQality>
      </div>
      <div class="showContentsLeft left924">
        <OnlineMonitoring></OnlineMonitoring>
      </div>
      <div class="showContentsRight right0">
        <Emissions></Emissions>
      </div>
      <div class="showContentsRight right1171">
        <ChangingTrend></ChangingTrend>
      </div>

      <!-- <div class="left1693 jcMain">
      <div class="jcdata jcMainList">
        <div class="titlejc flexRow rowSpace alginCenter">
          <span>参数</span>
          <i class="el-icon-arrow-up"></i>
        </div>
        <div class="changeRadio check-box">
          <div v-for="(item, index) in waterRadio" :key="index" @click="handleCheckedChange(item)" style="cursor: pointer">
            <input type="checkbox" v-model="item.check"/>
            <img
              class="iconWaterList"
              v-if="ICONLIST.iconMain[item.id]['default'] != ''"
              :src="ICONLIST.iconMain[item.id]['default']" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      </div> -->
      <!-- <div class="left1693 jcMain">
        <div class="atmosphericQuality axeH marginTop26">
          <div class="parame">
            <ul class="ulTab">
              <li class="rowSpace alginCenter biaotou">
                <span>参数</span>
                <i class="el-icon-arrow-up"></i>
              </li>
              <ul>
                <li v-for="(item, index) in waterRadio" :key="index" :class="item.id === parameSelected ? 'selected': ''">
                  {{item.name}}
                </li>
              </ul>
            </ul>
          </div>

      </div>
      </div> -->
  </div>
</template>
<script>
import MapMain from '@/components/AxeHeadLake/MapMain.vue'// 视频
import WaterQality from '@/components/AxeHeadLake/WaterQality.vue'// 水质情况 ---- 水质目标
import OnlineMonitoring from '@/components/AxeHeadLake/OnlineMonitoring.vue'// 浮船在线监测
import Emissions from '@/components/AxeHeadLake/Emissions.vue'// 排放量
import ChangingTrend from '@/components/AxeHeadLake/ChangingTrend.vue'// 视频
// import MapMain from '@/components/AxeHeadLake/MapMain.vue'//视频
export default{
  components: {
    MapMain,
    WaterQality,
    OnlineMonitoring,
    Emissions,
    ChangingTrend
    // MapMain,
  },
  data () {
    return {
      radio: '',
      waterRadio: [
        {name: '河流', id: 'detectedData4', type: 'RIVER', check: true, status: ''},
        {name: '湖库', id: 'hu', type: 'hu', check: false, status: ''},
        {name: '水源地', id: 'waterSource', type: 'WATERBLOOD', check: false, status: ''},
        {name: '国控断面', id: 'guo', value: 1, type: 'SECTION', check: false, status: ''},
        {name: '省控断面', id: 'sheng', value: 2, type: 'SECTION', check: false, status: ''},
        {name: '市控断面', id: 'shi', value: 3, type: 'SECTION', check: false, status: ''},
        {name: '一般控制断面', id: 'common', value: 4, type: 'SECTION', check: false, status: ''},
        {name: '工业企业', id: 'industry', value: '3f382eca203f459cb6a66c265a3427da', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '污水厂', id: 'waterFactory', value: 'a6d7487fc3674cd999b7ee0a28099f62', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '垃圾填埋场', id: 'garbage', value: '074b014df9e54acc9358d24be5e8c38e', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '供水厂', id: 'waterSupply', value: '000002', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '入河排污口', id: 'outfall', value: '25', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '视频', id: 'video', type: 'VIDEO', check: false, status: ''}
      ],
      waterParame: [
        {name: '河流', id: 'river'},
        {name: '湖库', id: 'hu'},
        {name: '水源地', id: 'water'}
      ],
      parameSelected: '',
      checkedParameData: {}
    }
  },
  methods: {
    handleCheckedChange (val) {
      console.log(val, 'val')
      this.checkParameData = val
    }
  }
}
</script>
<style scoped>
.jcMain img {
  width: 20px;
  height: 20px;
}
</style>
