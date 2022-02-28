<template>
  <div class="backgroundPop width75 marginBottom regionRank height560">
    <div class="titleLine">
      <div class="textTitle">
        <span>协同任务区域排名</span>
      </div>
    </div>
    <div class="regionMain">
      <v-chart class="regionRankMain" :options="polar" />

    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      polar: {
        grid: [
          {x: '7%', y: '9%', width: '90%', height: '82%'}
        ],
        tooltip: {},
        legend: {
          show: false
        },
        xAxis: {
          data: ['咸安区', '嘉鱼县', '通城县', '崇阳县', '通山县', '赤壁市'],
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
          }
        },
        yAxis: {
          name: '数量',
          type: 'value',
          nameLocation: 'end',
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
        },
        series: [{
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(132, 250, 176, .8) '
              },
              {
                offset: 1,
                color: 'rgba(64, 188, 232, .8)'
              }
            ])
          },
          barWidth: 32
        }]
      }
    }
  }
}
</script>
