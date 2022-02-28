<template>
  <div class="floodWater width938">
    <div class="titleLine">
      <div class="textTitle">
        <span>地表水质量变化趋势</span>
      </div>
      <div>
        <el-date-picker
          v-model="time"
          value-format="yyyy"
          :clearable="false"
          class="changeSelected"
          @change="getTime()"
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </div>
    </div>
<!--    <div  class="rowSpace marginTop44 trendUl">-->
<!--      <div v-for="item in Object.keys(legendData)" class="flexRow trendLi">-->
<!--        <div :style={background:legendData[item]} class="trendBlock"></div>-->
<!--        <span> {{item}}</span>-->
<!--      </div>-->
<!--    </div>-->
    <v-chart class="floodWaterMain marginTop26" :options="polar" />
  </div>
</template>
<script>
export default{
  data () {
    return {
      time: '',
      polar: {

        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        color: ['#1976d3', '#02aaf3', '#82c844', '#dacb50', '#ef8e01', '#e02433'],
        // 图例
        legend: {
          top: 0,
          textStyle: {
            color: '#ffffff'
          },
          data: ['Ⅰ类', 'Ⅱ类', 'Ⅲ类', 'Ⅳ类', 'Ⅴ类', '劣Ⅴ类']
        },
        // x轴
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              width: 0// 这里是为了突出显示加上的
            }
          },
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        // y轴
        yAxis: {
          axisLabel: {

            formatter: '{value}天'

          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
              width: 0// 这里是为了突出显示加上的
            }
          },
          type: 'value'
        },
        // 数据
        series: [
          {
            name: 'Ⅰ类',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: []
          },
          {
            name: 'Ⅱ类',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: []
          },
          {
            name: 'Ⅲ类',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: []
          },
          {
            name: 'Ⅳ类',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: []
          },
          {
            name: 'Ⅴ类',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: []
          },
          {
            name: '劣Ⅴ类',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: []
          }
        ]
      }
    }
  },
  methods: {
    getTime () {
      this.getWaterQualityTrends()
    },

    /**
       * 地表水质量变化趋势
       */
    getWaterQualityTrends () {
      var self = this
      self.polar.series[0].data = []
      self.polar.series[1].data = []
      self.polar.series[2].data = []
      self.polar.series[3].data = []
      self.polar.series[4].data = []
      self.polar.series[5].data = []

      if (self.AppData.dataFlag) {
        // 演示数据
        let tmpData = self.AppData.waterStandard_getWaterQualityTrends()
        for (let i = 0; i < tmpData.length; i++) {
          let time1 = tmpData[i].monthTime.substring(4)
          if (time1.substring(0, 1) == 0) {
            time1 = time1.substring(1)
          }
          self.polar.series[0].data.push([time1 + '月', tmpData[i].level1])
          self.polar.series[1].data.push([time1 + '月', tmpData[i].level2])
          self.polar.series[2].data.push([time1 + '月', tmpData[i].level3])
          self.polar.series[3].data.push([time1 + '月', tmpData[i].level4])
          self.polar.series[4].data.push([time1 + '月', tmpData[i].level5])
          self.polar.series[5].data.push([time1 + '月', tmpData[i].level6])
        }
        return
      }

      var param = new URLSearchParams()
      param.append('dataType', '0')
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', self.time)
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaWater/getWaterQualityTrends', param
      ).then(function (res) {
        var data = res.data.data
        for (var i = 0; i < data.length; i++) {
          var time = data[i].monthTime.substring(4)
          if (time.substring(0, 1) == 0) {
            time = time.substring(1)
          }
          self.polar.series[0].data.push([time + '月', data[i].level1])
          self.polar.series[1].data.push([time + '月', data[i].level2])
          self.polar.series[2].data.push([time + '月', data[i].level3])
          self.polar.series[3].data.push([time + '月', data[i].level4])
          self.polar.series[4].data.push([time + '月', data[i].level5])
          self.polar.series[5].data.push([time + '月', data[i].level6])
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    var date = new Date()
    this.time = date.getFullYear() + ''
    this.getWaterQualityTrends()
  }
}
</script>
