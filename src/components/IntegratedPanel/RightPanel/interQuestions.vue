<template>
  <div class="interQuestionCon">
    <div class="rowSpace pollutantMain">
      <div class="titleName">问题分布</div>
      <div class="rowFlex">
        <el-select v-model="value" @change="initDarw" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="interQuestion">
      <div class="interEcharts">
        <zhuzhuangEcharts :params="zhuzhuangEchartsData" v-if="isShow"></zhuzhuangEcharts>
      </div>
      <div class="bottomIntroduce rowSpace">
        <div v-for="item in listData" :key="item.name" class="rowSpace listData">
          <div>
            {{item.name}}
          </div>
          <div :style="{color: item.color}" class="num">
            {{item.num}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import {getProblemDistribution} from '@/common/api/cooperativeScheduling.js'

export default {
  name: 'interQuestions',
  data () {
    return {
      value: 2,
      options: [
        {label: '空气', value: 2},
        {label: '水', value: 3}
      ],
      zhuzhuangEchartsData: {
        xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        name: {
          status: true,
          text: '问题数',
          nameTextStyle: 'rgba(245,245,245, .7)',
          position: 'middle',
          align: 'right'
        },
        yAxis: [
          {
            type: 'value',
            name: '问题数',
            position: 'left',
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
          },
          {
            type: 'value',
            name: '百分比（%）',
            position: 'right',
            axisLabel: {
              color: 'rgba(255, 255, 255, .5)'
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '问题数',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
              color: 'rgba(28, 28, 162, 1)'
            }
          },
          {
            name: '处理率',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            itemStyle: {
              color: 'rgba(71, 163, 198, 1)'
            }
          },
          {
            name: '超时率',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            itemStyle: {
              color: 'rgba(28, 220, 28, 1)'
            }
          },
          {
            name: '紧急',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            itemStyle: {
              color: 'rgba(255, 255, 255, 1)'
            }
          }
        ],
        id: 'interQuestions',
        grid: {
          width: '85%',
          height: '65%',
          bottom: '15%',
          right: '7%'
        },
        isShowy: true,
        isSplitLine: true,
        isShowx: true,
        barWidth: 5,
        isManyList: true,
        length: {
          status: true,
          data: ['问题数', '处理率', '超时率', '紧急'],
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 12,
          left: 0,
          top: 0,
          icon: 'circle'
        },
        tooltip: true
      },
      isShow: false,
      listData: [
        {name: '其他任务', num: '99', color: '#E02020'},
        {name: '巡查任务', num: '99', color: 'rgba(250, 100, 0, 1)'},
        {name: '排查任务', num: '99', color: 'rgba(75, 101, 204, 1)'},
        {name: '管控任务', num: '99', color: 'rgba(75, 101, 204, 1)'},
        {name: '复查任务', num: '99', color: 'rgba(75, 101, 204, 1)'}
      ]
    }
  },
  components: {
    zhuzhuangEcharts
  },
  methods: {
    initDarw () {
      this.isShow = false
      getProblemDistribution(this.value).then(res => {
        if (res.code == 0) {
          this.zhuzhuangEchartsData.xAxis = res.data.xlist
          this.zhuzhuangEchartsData.series[0].data = res.data.problemRateList
          this.zhuzhuangEchartsData.series[1].data = res.data.dealWithRateList
          this.zhuzhuangEchartsData.series[2].data = res.data.timeOutRateList
          this.zhuzhuangEchartsData.series[3].data = res.data.urgentRateList
          this.listData[0].num = res.data.otherTaskCount
          this.listData[1].num = res.data.patrolTaskCount
          this.listData[2].num = res.data.troubleshootTaskCount
          this.listData[3].num = res.data.controlTaskCount
          this.listData[4].num = res.data.reviewTaskCount
          this.isShow = true
          console.log(this.zhuzhuangEchartsData)
        }
      })
    }
  },
  mounted () {
    this.initDarw()
  }
}
</script>

<style scoped>
.interQuestion{
  width: 100%;
  height: calc(100% - 40px);
}
.interQuestionCon{
  width: 100%;
  height: 100%;
}
.interEcharts{
  height: calc(100% - 60px);
  width: 100%;
}
.bottomIntroduce{

}
.listData{
  width: 19%;
  background: rgba(255, 255, 255, .1);
  height: 57px;
  line-height: 57px;
  padding: 0 17px;
  box-sizing: border-box;
  border-radius: 14px;
}
</style>
