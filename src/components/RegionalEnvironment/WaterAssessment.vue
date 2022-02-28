<template>
  <div class="waterStandard">
    <div class="titleLine">
      <div class="textTitle">
        <span>水环境质量考核</span>
      </div>
    </div>
    <div class="waterStadardMain marginTop44">
      <div class="mainTitle rowSpace alginCenter">
        <div class="flexRow">
          <i class="iconMubiao"></i>
          <span>目标：I～Ⅲ类水体占比 </span>
        </div>
        <div>
          <span>{{target}}</span>
        </div>
      </div>
      <v-chart class="waterStadardEchars" :options="waterAssess" />
    </div>
    <div class="waterStadardMain marginTop44">
      <div class="mainTitle rowSpace alginCenter">
        <div class="flexRow">
          <i class="iconMubiao"></i>
          <span>目标：劣Ⅴ类水体比例占比 </span>
        </div>
        <div>
          <span>{{target6}}</span>
        </div>
      </div>
      <v-chart class="waterStadardEchars" :options="waterAssessSix" />
    </div>
  </div>
</template>
<script>
import 'echarts-liquidfill'
export default{
  data () {
    return {
      oneAndThree: 0,
      target: '',
      target6: '',
      six: 0,
      waterAssess: {
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 25,
            color: '#000'
          }
        },
        series: [{
          type: 'liquidFill',
          color: [ new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(24, 212, 186, 0.4)'
            },
            {
              offset: 1,
              color: 'rgba(24, 160, 212, 0.3)'
            }
          ])],
          radius: '80%',
          center: ['50%', '55%'],
          data: [], // data个数代表波浪数
          backgroundStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(2, 27, 72, 0.5) '
              },
              {
                offset: 0.5,
                color: 'rgba(2, 27, 72, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(0, 155, 232, 0.5)'
              }
            ])
          },
          label: {
            normal: {
              color: '#fff',
              textStyle: {
                fontSize: 46
              }
            }
          },
          outline: {
            show: false
          }
        },
        {
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['89%', '87%'],
          hoverAnimation: false,
          data: [
            {
              name: '',
              value: 40,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: 'rgba(48, 224, 197, 1)'
              },
              emphasis: {
                labelLine: {
                  show: false
                }
              }
            },
            { // 画中间的图标
              name: '',
              value: 4,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#ffffff',
                normal: {
                  color: 'rgba(49, 251, 156, 1)',
                  borderColor: 'rgba(49, 251, 156, 1)',
                  borderWidth: 20
                }
              },
              label: {
                borderRadius: '100%'
              },
              emphasis: {
                labelLine: {
                  show: false
                }
              }
            },
            { // 解决圆点过大后续部分显示明显的问题
              name: 4,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#5886f0'
              },
              emphasis: {
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#5886f0'
                }
              }
            },
            { // 画剩余的刻度圆环
              name: '',
              value: 0,
              itemStyle: {
                color: '#050038'
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              emphasis: {
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: 'rgba(255,255,255,0)'
                }
              }
            }
          ]
        }]
      },
      waterAssessSix: {
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 25,
            color: '#000'
          }
        },
        series: [{
          type: 'liquidFill',
          color: [ new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(24, 212, 186, 0.4)'
            },
            {
              offset: 1,
              color: 'rgba(24, 160, 212, 0.3)'
            }
          ])],
          radius: '80%',
          center: ['50%', '55%'],
          data: [1, 1], // data个数代表波浪数
          backgroundStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(2, 27, 72, 0.5) '
              },
              {
                offset: 0.5,
                color: 'rgba(2, 27, 72, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(0, 155, 232, 0.5)'
              }
            ])
          },
          label: {
            normal: {
              color: '#fff',
              textStyle: {
                fontSize: 46
              }
            }
          },
          outline: {
            show: false
          }
        },
        {
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['89%', '87%'],
          hoverAnimation: false,
          data: [
            {
              name: '',
              value: 0,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: 'rgba(48, 224, 197, 1)'
              },
              emphasis: {
                labelLine: {
                  show: false
                }
              }
            },
            { // 画中间的图标
              name: '',
              value: 4,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#ffffff',
                normal: {
                  color: 'rgba(49, 251, 156, 1)',
                  borderColor: 'rgba(49, 251, 156, 1)',
                  borderWidth: 20
                }
              },
              label: {
                borderRadius: '100%'
              },
              emphasis: {
                labelLine: {
                  show: false
                }
              }
            },
            { // 解决圆点过大后续部分显示明显的问题
              name: 4,
              labelLine: {
                show: false
              },
              itemStyle: {
                color: '#5886f0'
              },
              emphasis: {
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: '#5886f0'
                }
              }
            },
            { // 画剩余的刻度圆环
              name: '',
              value: 0,
              itemStyle: {
                color: '#050038'
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              emphasis: {
                labelLine: {
                  show: false
                },
                itemStyle: {
                  color: 'rgba(255,255,255,0)'
                }
              }
            }
          ]
        }]
      }
    }
  },
  mounted () {
    this.getWaterQualityRatio()
    this.getWaterSectionAannualTarget()
  },
  methods: {
    getWaterQualityRatio () {
      var self = this
      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.waterAssessment_getWaterQualityRatio()
        var sum = data.level1 + data.level2 + data.level3 + data.level4 + data.level5 + data.level6
        var oneThree = data.level1 + data.level2 + data.level3
        self.assignment(sum, oneThree, data)
        return
      }

      var param = new URLSearchParams()
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', new Date().getFullYear())
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaWater/getWaterQualityRatio', param
      ).then(function (res) {
        var data = res.data.data[0]
        var sum = data.level1 + data.level2 + data.level3 + data.level4 + data.level5 + data.level6
        var oneThree = data.level1 + data.level2 + data.level3
        self.assignment(sum, oneThree, data)
      }).catch(function (err) {
        console.log(err)
      })
    },
    assignment (sum, oneThree, data) {
      var self = this
      self.oneAndThree = (oneThree / sum)
      self.six = (data.level6 / sum)
      self.waterAssess.series[0].data = [self.oneAndThree, self.oneAndThree]
      self.waterAssess.series[1].data[0].value = self.oneAndThree * 100
      self.waterAssess.series[1].data[3].value = 100 - (self.oneAndThree * 100)
      self.waterAssessSix.series[0].data = [self.six, self.six]
      self.waterAssessSix.series[1].data[0].value = self.six * 100
      self.waterAssessSix.series[1].data[3].value = 100 - (self.six * 100)
    },

    getWaterSectionAannualTarget () {
      var self = this

      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.waterAssessment_getWaterSectionAannualTarget()
        self.target = data.target
        self.target6 = data.target6
        return
      }

      var param = new URLSearchParams()
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', new Date().getFullYear())
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaWater/getWaterSectionAannualTarget', param
      ).then(function (res) {
        var data = res.data.data
        self.target = data.target
        self.target6 = data.target6
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
