<template>
  <div class="bing" :id="id"></div>
</template>

<script>
export default {
  name: 'changEcharts',
  props: {
    id: String,
    data: Array,
    params: Object
  },
  methods: {
    darwBing () {
      console.log(this.data)
      var serise = []
      if (this.params.id === 'common') {
        serise = [{
          data: this.data,
          type: 'line',
          symbol: 'none',
          show: this.params.isAreaStyle,
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255, 255, 255, 1)'
              },
              {
                offset: 1,
                color: 'rgba(216, 216, 216, 0.23)'
              }
              ], false)
            }
          }
        }]
      } else {
        serise = this.data
      }
      let option = {
        color: this.params.color,
        xAxis: {
          type: 'category',
          data: this.params.data,
          show: this.params.xIsTrue,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, .5)'
          }
        },
        yAxis: {
          type: 'value',
          show: this.params.yIsTrue,
          axisLabel: {
            color: 'rgba(255, 255, 255, .5)'
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            },
            show: true
          },
          position: this.params.position
        },
        tooltip: {
          show: !!this.params.tooltip,
          trigger: 'axis'
        },
        legend: {
          show: this.params.legend,
          position: this.params.lengendPositions,
          textStyle: {
            color: '#fff'
          },
          icon: 'circle'
        },
        grid: this.params.grid,
        series: serise
      }
      console.log(this.id)
      if (this.params.lengendPositions === 'left') {
        option.legend.left = '0'
      }
      if (this.params.lengendPositions === 'right') {
        option.legend.right = '0'
      }
      var myChart = this.$echarts.init(document.getElementById(this.id))

      // 使用制定的配置项和数据显示图表
      myChart.setOption(option)
    }
  },
  mounted () {
    this.darwBing()
  }
}
</script>

<style scoped>
.bing{
  width: 100%;
  height: 100%;
}
</style>
