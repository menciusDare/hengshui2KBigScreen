<template>
  <div class="backgroundPop width1300 height1150">
    <div class="airQuality">
      <div class="titleLine rankBg">
        <div class="textTitle">
          <span>空气质量考核</span>
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
      <div class="airMain marginTop26 rowSpace ">
        <div class="airEcharsMain colorAirL">
          <v-chart class="airMain" :options="airpolar" />
          <div class="airEchars echars1"></div>
        </div>
        <div class="airEcharsMain colorAirG">
          <v-chart class="airMain" :options="airpolarG" />
          <div class="airEchars echars2"></div>
        </div>
        <div class="airEcharsMain colorAirZ">
          <v-chart class="airMain" :options="airpolarZ" />
          <div class="airEchars echars3"></div>
        </div>
      </div>
    </div>
    <div class="rankDay">
      <div class="titleLine rankBg">
        <div class="textTitle">
          <span>优良天同比变化</span>
        </div>
      </div>
      <div class="marginTop26">
        <v-chart class="rankDayMain" :options="polar" />
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      polar: {
        grid: [
          {x: '5%', y: '18%', width: '90%', height: '75%'}
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
            data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
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
            name: '天数',
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
          {
            type: 'value',
            name: '变化率(%)',
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
              },
              formatter: '{value}%'
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
            yAxisIndex: 0,
            name: '今年',
            type: 'line',
            data: [],
            smooth: true,
            showSymbol: true,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 11, // 设定实心点的大小
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
            yAxisIndex: 0,
            name: '去年',
            type: 'line',
            data: [],
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
            yAxisIndex: 1,
            name: '变化率',
            type: 'line',
            data: [],
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
      airpolar: {
        title: [
          {
            subtext: '',
            subtextStyle: {
              color: '#fff',
              fontSize: 38
            },
            itemGap: 20,
            left: 'center',
            top: '30%'
          },
          {
            subtext: '当前占比',
            subtextStyle: {
              color: '#fff',
              fontSize: 20
            },
            itemGap: 20,
            left: 'center',
            top: '40%'
          }
        ],
        graphic: [{
          type: 'text',
          z: 100,
          left: 'center',
          top: '85%',
          style: {
            fill: '#fff',
            text: '',
            font: '24px Microsoft YaHei'
          }
        }],
        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false

          },
          axisTick: {
            show: false
          }
        },
        polar: [{
          center: ['50%', '45%'], // 中心点位置
          radius: '100%' // 图形大小
        }],
        series: [
          {
            type: 'bar',
            data: [],
            coordinateSystem: 'polar',
            name: '资源加工工业',
            idM: '3',
            roundCap: true,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#008BFF'
              }, {
                offset: 1,
                color: '#0071FF'
              }])
            },
            barWidth: 20,
            showBackground: {
              color: 'rgba(26, 62, 194, 0.9)',
              borderWidth: 0
            }
          },
          {
            type: 'bar',
            data: [],
            idM: '4',
            polarIndex: 0,
            backgroundStyle: {
              color: 'rgba(26, 62, 194, 0.9)',
              borderWidth: 2
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 2,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#008BFF'
                }, {
                  offset: 1,
                  color: '#0071FF'
                }]),
                shadowBlur: 5,
                shadowColor: '#2A95F9'
              }
            }
          }
        ]
      },
      airpolarG: {
        title: [
          {
            subtext: '',
            subtextStyle: {
              color: '#fff',
              fontSize: 38
            },
            itemGap: 20,
            left: 'center',
            top: '30%'
          },
          {
            subtext: '当前占比',
            subtextStyle: {
              color: '#fff',
              fontSize: 20
            },
            itemGap: 20,
            left: 'center',
            top: '40%'
          }
        ],
        graphic: [{
          type: 'text',
          z: 100,
          left: 'center',
          top: '85%',
          style: {
            fill: '#fff',
            text: '',
            font: '24px Microsoft YaHei'
          }
        }],
        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false

          },
          axisTick: {
            show: false
          }
        },
        polar: [{
          center: ['50%', '45%'], // 中心点位置
          radius: '100%' // 图形大小
        }],
        series: [
          {
            type: 'bar',
            data: [25],
            coordinateSystem: 'polar',
            name: '资源加工工业',
            idM: '3',
            roundCap: true,
            itemStyle: {
              color: 'rgba(108, 206, 251, 1)'
            },
            barWidth: 20,
            showBackground: {
              color: 'rgba(108, 206, 251, 1)',
              borderWidth: 0
            },
            radius: '100%' // 图形大小
          },
          {
            type: 'bar',
            data: [80],
            idM: '4',
            showBackground: true,
            polarIndex: 0,
            backgroundStyle: {
              color: 'rgba(53, 116, 146, 1)',
              borderWidth: 2
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 2,
            itemStyle: {
              normal: {
                opacity: 1,
                color: 'rgba(108, 206, 251, 1)'
              }
            }
          }
        ]
      },
      airpolarZ: {
        title: [
          {
            subtext: '',
            subtextStyle: {
              color: '#fff',
              fontSize: 38
            },
            itemGap: 20,
            left: 'center',
            top: '30%'
          },
          {
            subtext: '当前占比',
            subtextStyle: {
              color: '#fff',
              fontSize: 20
            },
            itemGap: 20,
            left: 'center',
            top: '40%'
          }
        ],
        graphic: [{
          type: 'text',
          z: 100,
          left: 'center',
          top: '85%',
          style: {
            fill: '#fff',
            text: '',
            font: '24px Microsoft YaHei'
          }
        }],
        angleAxis: {
          max: 100,
          clockwise: true, // 逆时针
          // 隐藏刻度线
          show: false
        },
        radiusAxis: {
          type: 'category',
          show: true,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false

          },
          axisTick: {
            show: false
          }
        },
        polar: [{
          center: ['50%', '45%'], // 中心点位置
          radius: '100%' // 图形大小
        }],
        series: [
          {
            type: 'bar',
            data: [25],
            coordinateSystem: 'polar',
            name: '资源加工工业',
            idM: '3',
            roundCap: true,
            itemStyle: {
              color: 'rgba(105, 29, 162, .6)'
            },
            barWidth: 20,
            showBackground: {
              color: 'rgba(175, 42, 255, .1)',
              borderWidth: 0
            },
            radius: '100%' // 图形大小
          },
          {
            type: 'bar',
            data: [80],
            idM: '4',
            showBackground: true,
            polarIndex: 0,
            backgroundStyle: {
              color: 'rgba(95, 20, 152, 1)',
              borderWidth: 2
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 2,
            itemStyle: {
              normal: {
                opacity: 1,
                color: 'rgba(175, 42, 255, 1)'
              }
            }
          }
        ]
      },
      time: new Date().getFullYear() + ''
    }
  },
  methods: {
    // 选择日期
    getTime () {
      this.go()
    },
    // 优良天比例
    getAreaStatisProportion () {
      var self = this
      // 重置
      self.airpolar.graphic[0].style.text = '优良天比例达到：%'
      self.airpolar.title[0].subtext = '%'
      self.airpolar.series[0].data = []
      self.airpolar.series[1].data = []
      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.airQualityDay_getAreaStatisProportion()
        var level13 = data[0].level1 + data[0].level2 + data[0].level3
        var level = data[0].level1 + data[0].level2 + data[0].level3 + data[0].level4 + data[0].level5 + data[0].level6
        self.airpolar.series[0].data = [((level13 / level) * 100).toFixed(2)]
        self.airpolar.series[1].data = [((level13 / level) * 100).toFixed(2)]

        self.airpolar.title[0].subtext = ((level13 / level) * 100).toFixed(2) + '%'
        return
      }

      var param = new URLSearchParams()
      param.append('dataType', '0')
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', self.time)
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaAir/getAreaStatisProportion', param
      ).then(function (res) {
        var data = res.data.data
        var level13 = data[0].level1 + data[0].level2 + data[0].level3
        var level = data[0].level1 + data[0].level2 + data[0].level3 + data[0].level4 + data[0].level5 + data[0].level6
        self.airpolar.series[0].data = [((level13 / level) * 100).toFixed(2)]
        self.airpolar.series[1].data = [((level13 / level) * 100).toFixed(2)]

        self.airpolar.title[0].subtext = ((level13 / level) * 100).toFixed(2) + '%'
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 因子下降比例
    getAreaYearPollutantDecline () {
      var self = this
      self.airpolarG.graphic[0].style.text = 'O3浓度下降：%'
      self.airpolarG.title[0].subtext = '%'
      self.airpolarZ.graphic[0].style.text = 'PM2.5浓度下降：%'
      self.airpolarZ.title[0].subtext = '%'
      self.airpolarG.series[0].data = []
      self.airpolarG.series[1].data = []
      self.airpolarZ.series[0].data = []
      self.airpolarZ.series[1].data = []

      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.airQualityDay_getAreaYearPollutantDecline()
        // O3
        self.airpolarG.title[0].subtext = (data[0].o3RateOfChange == null ? '0' : data[0].o3RateOfChange) + '%'
        self.airpolarG.series[0].data = [(data[0].o3RateOfChange == null ? '0' : data[0].o3RateOfChange)]
        self.airpolarG.series[1].data = [(data[0].o3RateOfChange == null ? '0' : data[0].o3RateOfChange)]
        // PM2.5
        self.airpolarZ.graphic[0].style.text = 'PM2.5浓度下降：' + (data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange) + '%'
        self.airpolarZ.title[0].subtext = (data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange) + '%'
        self.airpolarZ.series[0].data = [(data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange)]
        self.airpolarZ.series[1].data = [(data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange)]
        return
      }

      var param = new URLSearchParams()
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', self.time)
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaAir/getAreaYearPollutantDecline', param
      ).then(function (res) {
        var data = res.data.data
        // O3

        self.airpolarG.title[0].subtext = (data[0].o3RateOfChange == null ? '0' : data[0].o3RateOfChange) + '%'
        self.airpolarG.series[0].data = [(data[0].o3RateOfChange == null ? '0' : data[0].o3RateOfChange)]
        self.airpolarG.series[1].data = [(data[0].o3RateOfChange == null ? '0' : data[0].o3RateOfChange)]
        // PM2.5
        self.airpolarZ.graphic[0].style.text = 'PM2.5浓度下降：' + (data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange) + '%'
        self.airpolarZ.title[0].subtext = (data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange) + '%'
        self.airpolarZ.series[0].data = [(data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange)]
        self.airpolarZ.series[1].data = [(data[0].pm25RateOfChange == null ? '0' : data[0].pm25RateOfChange)]
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 优良天同比变化
    getAreaYearStatis () {
      var self = this
      self.polar.series[0].data = []
      self.polar.series[1].data = []
      self.polar.series[2].data = []

      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.airQualityDay_getAreaYearStatis()
        for (var i = 0; i < data.length; i++) {
          var time = data[i].monthTime.substring(4)
          // 今年
          self.polar.series[0].data.push([time + '月', data[i].level1 + data[i].level2 + data[i].level3])

          if (data[i].level1Tb == null || data[i].level2Tb == null || data[i].level3Tb == null) {
            // 去年
            self.polar.series[1].data.push([time + '月', '-'])
            // 变化率
            self.polar.series[2].data.push([time + '月', '-'])
          } else {
            // 去年
            self.polar.series[1].data.push([time + '月', data[i].level1Tb + data[i].level2Tb + data[i].level3Tb])
            // 变化率
            self.polar.series[2].data.push([time + '月', data[i].rateOfChange == null ? '-' : data[i].rateOfChange])
          }
        }
        return
      }

      var param = new URLSearchParams()
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', self.time)
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaAir/getAreaYearStatis', param
      ).then(function (res) {
        var data = res.data.data
        for (var i = 0; i < data.length; i++) {
          var time = data[i].monthTime.substring(4)
          // 今年
          self.polar.series[0].data.push([time + '月', data[i].level1 + data[i].level2 + data[i].level3])

          if (data[i].level1Tb == null || data[i].level2Tb == null || data[i].level3Tb == null) {
            // 去年
            self.polar.series[1].data.push([time + '月', '-'])
            // 变化率
            self.polar.series[2].data.push([time + '月', '-'])
          } else {
            // 去年
            self.polar.series[1].data.push([time + '月', data[i].level1Tb + data[i].level2Tb + data[i].level3Tb])
            // 变化率
            self.polar.series[2].data.push([time + '月', data[i].rateOfChange == null ? '-' : data[i].rateOfChange])
          }
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    getAnnualTarget () {
      var self = this
      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.airQualityDay_getAnnualTarget()
        self.airpolar.graphic[0].style.text = '优良天目标比例：' + data.airDayTargetProportion + '%'
        // o3目标下降
        self.airpolarG.graphic[0].style.text = 'O3浓度下降：' + data.o3Proportion + '%'
        // pm25目标下降
        self.airpolarZ.graphic[0].style.text = 'PM2.5浓度下降：' + data.pm25Proportion + '%'
        return
      }

      var param = new URLSearchParams()
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', self.time)
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaAir/getAnnualTarget', param
      ).then(function (res) {
        var data = res.data.data[0]
        self.airpolar.graphic[0].style.text = '优良天目标比例：' + data.airDayTargetProportion + '%'
        // o3目标下降
        self.airpolarG.graphic[0].style.text = 'O3浓度下降：' + data.o3Proportion + '%'
        // pm25目标下降
        self.airpolarZ.graphic[0].style.text = 'PM2.5浓度下降：' + data.pm25Proportion + '%'
      }).catch(function (err) {
        console.log(err)
      })
    },
    go () {
      this.getAreaStatisProportion()
      this.getAreaYearPollutantDecline()
      this.getAreaYearStatis()
      this.getAnnualTarget()
    }
  },

  mounted () {
    this.go()
  }
}
</script>
