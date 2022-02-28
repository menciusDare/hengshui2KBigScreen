<template>
  <div>
    <div class="rowSpace flexWarp">
      <div
        v-for="(item, index) in listMain"
        :key="index"
        class="listCss rowSpace">
        <div>
          <div class="rowFlex mainBottom10 alginCenter">
            <div class="icon" :class="item.icon"></div>
            <div class="name">{{item.name}}</div>
          </div>
          <div class="alginEnd">
            <div class="rowFlex alginEnd maRight16">
              <div class="nameBig" :style="{color: item.color}">{{parseInt(listData[`${item.id}`])}}</div>
              <div class="baifen" v-if="item.isShowP">%</div>
            </div>
            <div class="rowFlex alginCenter">
              <div
                class="tableIcon"
                :class="listData[`${item.yinzi}`] >= 0  ? 'shangsheng' : 'xiajiang'"></div>
              <div class="baifenSmall">{{listData[`${item.yinzi}`]}}%</div>
            </div>
          </div>
        </div>
        <div class="rightZhu" v-if="item.isShowP">
          <div :style="{background: item.color, width: '8px', height: `${listData[item.id]}%`}">
          </div>
        </div>
      </div>
    </div>
    <div class="waterBLood listCss">
      <div class="rowFlex mainBottom10 alginCenter">
        <div class="icon booldWater"></div>
        <div class="name">地表水质量变化趋势</div>
      </div>
      <div class="mtop26 rowSpace">
        <div class="zongheLevel">
          综合水质
          <div class="levelNum">{{level[levelCon]}}</div>
        </div>
        <div class="rightZhuEcharts">
          <zhuzhuangEcharts :params="zhuazhuangEchartsData" v-if="isShow"></zhuzhuangEcharts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import {changeTrendOfSurfaceWaterQuality, overallWater} from '@/common/api/IntegratedPanel'
import {timeFmtNext, timeFmt, C_TIME} from '@/assets/js/timeFmt.js'

export default {
  name: 'InterOverallWater',
  data () {
    return {
      listMain: [
        {name: 'PM2.5浓度', id: 'pm25', yinzi: 'pm25Up', icon: 'air', color: '#E02020', isShowP: false},
        {name: 'O3浓度', id: 'o3', yinzi: 'o3Up', icon: 'air1', color: 'rgba(173, 185, 237, .5)', isShowP: false},
        {name: 'I-III类水体比例', id: 'one1', yinzi: 'one2', icon: 'water', color: 'rgba(250, 100, 0, 1)', isShowP: true},
        {name: '劣V类水体比例', id: 'sex1', yinzi: 'sex2', icon: 'water', color: 'rgba(173, 185, 237, .5)', isShowP: true}
      ],
      listData: {
        'num': null,
        'one1': 6,
        'one2': -0.33,
        'sex1': 0.5,
        'sex2': 0.42,
        'pm25': 62,
        'pm25Up': 0,
        'o3': 199,
        'o3Up': 0
      },
      zhuazhuangEchartsData: {
        xAxis: [],
        series: [],
        id: 'interOverWater',
        grid: {
          width: '98%',
          height: '75%',
          bottom: '10%',
          right: '1%'
        },
        isShowy: false,
        isSplitLine: false,
        isShowx: false,
        barWidth: 5
      },
      color: {
        0: '#fff',
        1: 'rgba(218, 218, 218, 1)',
        2: 'rgba(218, 218, 218, 1)',
        3: 'rgba(218, 218, 218, 1)',
        4: '#fff',
        5: 'rgba(218, 218, 218, 1)',
        6: 'red'
      },
      isShow: false,
      level: {
        '1': 'I',
        '2': 'II',
        '3': 'III',
        '4': 'IV',
        '5': 'V',
        '6': '劣V',
        null: '--'
      },
      levelCon: ''
    }
  },
  components: {
    zhuzhuangEcharts
  },
  methods: {
    getData () {
      let areaCode = '421200'
      let dateTime = timeFmtNext(new Date(), 0, 'YYYYMM')
      overallWater(areaCode, dateTime).then(res => {
        console.log(res.data)
        this.listData = res.data
      })
      changeTrendOfSurfaceWaterQuality(areaCode).then(res => {
        this.zhuazhuangEchartsData.xAxis = res.data.timeList
        res.data.dataList.map(item => {
          item.value = item.level
          item.itemStyle = {}
          this.$set(item.itemStyle, 'color', this.color[`${item.level}`])
        })
        this.zhuazhuangEchartsData.series = res.data.dataList
        this.levelCon = res.data.level
        this.isShow = true
        console.log(res.data.level, 'zhuazhuangEchartsData')
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
.listCss{
  width: 50%;
  padding: 16px 40px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(245,245,245,.2);
  border-right: 1px solid rgba(245,245,245,.2);
}
.listCss:nth-child(2n) {
  border-right: 0;
}
.listCss .icon{
  width: 23px;
  height: 23px;
  background: #1DCEBC;
  margin-right: 4px;
}
.listCss .icon.water{
  background: url("../../../assets/img/zonghe/water.png") no-repeat center;
  background-size: 100%;
}
.listCss .icon.air{
  background: url("../../../assets/img/zonghe/pm25.png") no-repeat center;
  background-size: 100%;
}
.listCss .icon.air1{
  background: url("../../../assets/img/zonghe/O3.png") no-repeat center;
  background-size: 100%;
}
.listCss .icon.booldWater{
  background: url("../../../assets/img/zonghe/waterBlood.png") no-repeat center;
  background-size: 100%;
}
.listCss .name{
  font-size: 20px;
  line-height: 28px;
}
.mainBottom10{
  margin-bottom: 10px;
}
.nameBig{
  font-size: 46px;
  font-weight: 600;
  line-height: 40px;
}
.baifen{
  font-size: 30px;
  color: rgba(109, 114, 120, 1);
}
.baifenSmall{
  font-size: 20px;
  color: rgba(109, 114, 120, 1);
}
.maRight16{
  margin-right: 16px;
}
.rightZhu{
  height: 86px;
  width: 8px;
  background: rgba(255, 255, 255, .1);
  border-radius: 5px;
  position: relative;
}
.rightZhu>div{
  border-radius: 5px;
  position: absolute;
  bottom: 0;
}
.waterBLood.listCss{
  width: 100%;
  border-bottom: none;
  border-right: none;
  padding: 25px 40px;
  box-sizing: border-box;
}
.zongheLevel{
  width: 144px;
  height: 70px;
  line-height: 70px;
  border-radius: 9px;
  box-shadow: 0px 1px 12px 0px #FA6400;
  border: 1px solid #FA6400;
  text-align: center;
  color: #FA6400;
  font-weight: 600;
  font-size: 28px;
  position: relative;
}
.levelNum{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 9px;
  background: rgba(0, 0, 0, .5);
}
.mtop26{
  margin-top: 26px;
}
.rightZhuEcharts{
  width: calc(100% - 150px);
  height: 70px;
}
</style>
