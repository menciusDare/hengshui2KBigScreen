<template>
  <div class="backgroundPop width75 changingtrend marginBottom height560">
    <div class="titleLine">
      <div class="textTitle">
        <span>变化趋势</span>
      </div>
    </div>
    <div>
      <v-chart class="changingtrendMain" :options="polar" />
    </div>
    <ul class="changingtrendTab rowSpace">
      <li v-for="(item, index) in changingtrendTab" :key="index" :class="item.selected ? 'selected': ''">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  data () {
    return {
      // 变化趋势 --- 折线图
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
          show: true,
          icon: 'stack',
          top: '2%',
          right: '0',
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 25,
          textStyle: {
            color: 'RGB(193,223,255)',
            fontSize: 20
          }
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
            smooth: true,
            showSymbol: false,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(249, 212, 35, 1)'
              },
              {
                offset: 1,
                color: 'rgba(255, 78, 80, 1)'
              }
            ]),
            lineStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(249, 212, 35, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 78, 80, 1)'
                }
              ])
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(249, 212, 35, .1)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 78, 80, .1)'
                }
              ])
            }
          },
          {
            name: '2019',
            type: 'line',
            data: [5, 40, 11, 4, 25, 16, 1],
            color: 'rgba(53, 126, 255, 1)',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: 'rgba(53, 126, 255, 1)'
            },
            areaStyle: {
              color: 'rgba(53, 126, 255, 0.2)'
            }
          },
          {
            name: '2021',
            type: 'line',
            data: [5, 40, 11, 4, 150, 16, 1],
            color: 'rgba(67, 183, 181, 1)',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: 'rgba(67, 183, 181, 1)'
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(75, 237, 220, .1)'
                },
                {
                  offset: 1,
                  color: 'rgba(74, 180, 230, .1)'
                }
              ])
            }
          }
        ]
      },
      changingtrendTab: [
        {name: 'AQI', selected: true},
        {name: 'PM2.5', selected: false},
        {name: 'AQI', selected: false},
        {name: 'PM2.5', selected: false},
        {name: 'AQI', selected: false},
        {name: 'PM2.5', selected: false},
        {name: 'AQI', selected: false}
      ]
    }
  }
}
</script>
