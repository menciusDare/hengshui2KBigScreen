<template>
  <div class="bing" :id="id"></div>
</template>

<script>
export default {
  name: 'bing.vue',
  props: {
    id: String,
    data: Number
  },
  methods: {
    darwBing () {
      console.log(this.data, 100 - this.data, 100 - this.data)
      let data = [
        {value: this.data, name: 'a'},
        {value: 100 - this.data, name: 'b'}
      ]
      let color1 = this.data < 50 ? 'rgba(224, 32, 32, 1)' : 'rgba(0, 196, 255, 1)'
      let color = [color1, 'rgba(255, 255, 255, .16)']
      let option = {
        color: color,
        tooltip: {
          show: false,
          trigger: 'item'
        },
        legend: {
          show: false,
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '100%',
            data: data,
            labelLine: {
              show: false
            }
          }
        ]
      }
      console.log(this.id, 'getId')
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
  width: 30px;
  height: 30px;
}
</style>
