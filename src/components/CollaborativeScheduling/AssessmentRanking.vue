<template>
  <div class="timeoutMain ">
    <div class="titleLine">
      <div class="textTitle">
        <span>区域考核排名</span>
      </div>
    </div>
    <v-chart class="assessmentRank" :options="polar" />
  </div>
</template>
<script>
export default{
  data () {
    return {
      polar: {
        grid: [
          {x: '7%', y: '8%', width: '90%', height: '85%'}
        ],
        tooltip: {},
        legend: {
          show: false
        },
        xAxis: {
          type: 'value',
          nameLocation: 'end',
          nameTextStyle: {
            color: '#93AECE'
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
            show: true,
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
        yAxis: {
          name: '区域',
          data: ['咸安区', '嘉鱼县', '通城县', '崇阳县', '通山县', '赤壁市'],
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: '#93AECE',
            fontSize: 18
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
        series: [{
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(0, 0, 0, 1)'
          },
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgba(164, 236, 252, 1) '
              },
              {
                offset: 1,
                color: 'rgba(50, 197, 255, 1)'
              }
            ])
          },
          barWidth: 28
        }]
      }
    }
  }
}
</script>
