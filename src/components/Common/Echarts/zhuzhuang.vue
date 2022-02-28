<template>
  <div class="zhuzhuangtu" :id="params.id"></div>
</template>

<script>
export default {
  props: {
    params: Object,
    changeZhuzhuang: Function
  },
  name: 'zhuzhuang',
  methods: {
    drawZhuangTu () {
      let series = []
      let length = {}
      let name = ''
      let nameTextStyle = {}
      let yAxis = []
      let showBackground = false
      let backgroundStyle = {}
      if (!!this.params.isManyList ||
          !!this.params.length ||
          !!this.params.name ||
          !!this.params.yAxis) {
        console.log('dddddddddddddddd')
        series = this.params.series
        length = this.params.length
        name = this.params.name.text
        nameTextStyle = {
          color: this.params.name.nameTextStyle,
          verticalAlign: this.params.name.position,
          align: this.params.name.align
        }
        yAxis = this.params.yAxis
      } else {
        series = [{
          data: this.params.series,
          type: 'bar',
          barWidth: this.params.barWidth,
          showBackground: this.params.showBackground,
          backgroundStyle: {
            color: 'rgba(180,180,180,0.2)'
          }
        }]
        length = {
          show: false
        }
        yAxis = {
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
            },
            show: this.params.isSplitLine
          },
          name: name,
          nameTextStyle: nameTextStyle,
          show: this.params.isShowy
        }
      }

      let option = {
        grid: this.params.grid,
        xAxis: {
          type: 'category',
          data: this.params.xAxis,
          axisLine: {
            show: this.params.isShowx
          },
          axisLabel: {
            interval: 0,
            color: 'rgba(255, 255, 255, .5)',
            rich: {
              a: {
                width: 10 // 只要有就行,无论大小
              }
            }
          },
          show: this.params.isShowx
        },
        yAxis: yAxis,
        series: series,
        tooltip: {
          show: !!this.params.tooltip,
          trigger: 'axis'
        },
        legend: length
      }
      console.log(series, 'isManyList', this.params.showBackground)
      var myChart = this.$echarts.init(document.getElementById(this.params.id))
      myChart.on('click', (params) => {
        this.$emit('changeZhuzhuang', (params))
      })
      console.log(this.params.id, this.params)
      // 使用制定的配置项和数据显示图表
      myChart.setOption(option)
    }
  },
  mounted () {
    this.drawZhuangTu()
  }
}
</script>

<style scoped>
.zhuzhuangtu{
  width: 100%;
  height: 100%;
}
</style>
