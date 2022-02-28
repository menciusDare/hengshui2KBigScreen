<template>
  <div class="backgroundPop width75 marginBottom taskStatistics height560">
    <div class="titleLine">
      <div class="textTitle">
        <span>协同人员任务统计</span>
      </div>
    </div>
    <div class="taskStatisticsMain">
      <div class="taskStatisticsTitle">
        <strong>2020</strong>
        <span>年 巡查 </span>
        <strong class="big">19999 </strong>
        <span>次</span>
        <strong>历程</strong>
        <strong class="big">18888 </strong>
        <span>历程</span>
      </div>
      <v-chart class="taskStatisticsMain" :options="polar" />
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      polar: {
        grid: [
          {x: '7%', y: '15%', width: '90%', height: '75%'}
        ],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '一月', '一月', '一月', '一月', '一月', '一月'],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#93AECE',
                fontSize: 18
              },
              margin: 10
            },
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameLocation: 'end',
            name: '次数',
            nameTextStyle: {
              color: '#93AECE',
              fontSize: 18
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'none'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#93AECE',
                fontSize: 18
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          }
        ],
        series: [
          {
            name: '2020',
            type: 'line',
            data: [90, 10, 3, 100, 15, 30, 7],
            smooth: false,
            showSymbol: true,
            color: 'rgba(68, 215, 182, 1)',
            lineStyle: {
              color: 'rgba(68, 215, 182, 1)'
            }
          }
        ]
      }
    }
  }
}
</script>
