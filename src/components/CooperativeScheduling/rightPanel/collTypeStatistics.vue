<template>
  <div class="collTypeStatistics">
    <div class="titleName">协同任务类型统计</div>
    <div class="zhuzhuangEchartsData">
      <zhuzhuangEcharts :params="zhuzhuangEchartsData" v-if="isShow"></zhuzhuangEcharts>
      <div class="leftPanel">
        <div class="tasksNum panelStyle">
          <div class="topText">任务总量</div>
          <div class="rowFlex alginEnd mtop10">
            <div class="leftPanelDataNum">{{this.leftPanelData.num}}</div>
            <div class="rowFlex">
              <div class="icon tableIcon" :class="this.leftPanelData.status ? 'shangsheng':'xiajiang'"></div>
              <div class="leftPanelCompare">{{this.leftPanelData.compare}}</div>
            </div>
          </div>
        </div>
        <div class="tasksList panelStyle mtop6">
          <div class="topText">
            TOP{{leftPanelData.topList.length}}
          </div>
          <div
            class="tasksListMain rowSpace"
            v-for="(item, index) in leftPanelData.topList"
            :key="index">
            <div>{{item.taskType}}</div>
            <div class="num">{{item.taskCount}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import {getTaskTypeStatistics} from '@/common/api/cooperativeScheduling.js'

export default {
  name: 'collTypeStatistics',
  data () {
    return {
      zhuzhuangEchartsData: {
        xAxis: ['类型名', '类型名', '类型名', '类型名', '类型名', '类型名'],
        name: {
          status: true,
          text: '',
          nameTextStyle: 'rgba(245,245,245, .7)',
          position: 'middle',
          align: 'right'
        },
        series: [
          {
            name: '任务数',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: 'rgba(31, 47, 116, 1)',
                barBorderRadius: 0
              }
            },
            data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
          },
          {
            name: '超时数',
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: 'rgba(224, 32, 32, 1)',
                barBorderRadius: 0
              }

            },
            data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
          }
        ],
        id: 'collTypeStatistics',
        grid: {
          width: '60%',
          height: '75%',
          bottom: '10%',
          right: '7%'
        },
        isShowy: true,
        isSplitLine: true,
        isShowx: true,
        barWidth: 5,
        isManyList: true,
        length: {
          status: true,
          data: ['任务数', '超时数'],
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 12,
          left: 0,
          top: 12,
          icon: 'circle'
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, .5)'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        }
      },
      isShow: false,
      leftPanelData: {
        num: '688',
        compare: '33',
        topList: [
          {taskType: '类型一', taskCount: '95'},
          {taskType: '类型二', taskCount: '87'},
          {taskType: '类型三', taskCount: '65'}
        ],
        status: true
      }
    }
  },
  components: {
    zhuzhuangEcharts
  },
  mounted () {
    this.loadingData()
  },
  methods: {
    loadingData () {
      getTaskTypeStatistics().then(res => {
        this.zhuzhuangEchartsData.xAxis = res.data.xlist
        this.zhuzhuangEchartsData.series[0].data = res.data.taskCountList
        this.zhuzhuangEchartsData.series[1].data = res.data.timeOutCountList
        this.leftPanelData.num = res.data.taskTotalCount
        this.leftPanelData.compare = res.data.changeCount
        this.leftPanelData.topList = res.data.taskRankList
        this.isShow = true
        console.log('this.zhuzhuangEchartsData', this.zhuzhuangEchartsData)
      })
    }
  }
}
</script>

<style scoped>
.collTypeStatistics{
  width: 100%;
  height: 100%;
}
.zhuzhuangEchartsData{
  width: 100%;
  height: calc(100% - 40px);
  position: relative;
}
.leftPanel{
  position: absolute;
  top: 50px;
  left: 0;
}
.panelStyle{
  background: rgba(45, 46, 61, .7);
  border-radius: 5px;
  width: 130px;
  padding: 14px 10px;
  box-sizing: border-box;
}
.mtop6{
  margin-top: 6px;
}
.mtop10{
  margin-top: 10px;
}
.tasksListMain{
  padding:17px 0 23px;
  border-bottom: 1px solid rgba(151, 151, 151, .1);
}
.tasksListMain:last-child{
  border-bottom: 0px;
}
.tasksListMain .num{
  color: rgba(82, 110, 228, 1);
}
.topText{
  font-size: 16px;
  color: rgba(191, 191, 191, 1);
}
.leftPanelDataNum{
  font-size: 27px;
  font-weight: 600;
  line-height: 25px;
  margin-right: 6px;
}
.leftPanelCompare{
  color: rgba(255, 255, 255, .6);
}
</style>
