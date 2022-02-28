<template>
  <div class="backgroundPop width1300 height1150">
    <div class="titleLine rankBg">
      <div class="textTitle">
        <span>变化趋势分析</span>
      </div>
    </div>
    <div class="WuRan marginTop16">
      <div class="rowSpace alginCenter">
        <div class="textTitle">
          <span>空气污染物趋势分析</span>
        </div>
        <el-select v-model="airWuranvalue" clearable placeholder="请选择" class="airWuranSelected changeSelected" @change="AirControllerLevel">
          <el-option
            v-for="item in airWuranSelected"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="waterStandardMain marginTop26">
        <div class="rowCenter">
          <div class="tabUl flexRow">
            <div class="tabLi" v-for="(item, index) in airTab" :key="index" :class="item.id === airTabSelected ? 'selected' : ''" @click="airCompareClick(item)" >
             {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <v-chart class="airWuRanEchart marginTop16" :options="airpolar" />
      <ul class="listTab flexRow marginTop26" style="margin-top: 20px;">
        <li v-for="(item, index) in airList" @click="airListQh(item)" style="line-height: 32px;" :key="index" :class="item.id === airListSelected ? 'selected' : ''">{{item.name}}</li>
      </ul>
    </div>
    <div class="WuRan marginTop44">
      <div class="rowSpace alginCenter">
        <div class="textTitle">
          <span>水污染物趋势分析</span>
        </div>
        <el-select v-model="waterWuranvalue" clearable placeholder="请选择" class="airWuranSelected changeSelected" @change="WaterControllerLevel">
          <el-option
            v-for="item in waterWuranSelected"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="waterStandardMain marginTop26">
        <div class="rowCenter">
          <div class="tabUl flexRow">
              <div class="tabLi" v-for="(item, index) in waterTab" :key="index"  :class="item.id === waterTabSelected ? 'selected' : ''"  @click="waterCompareClick(item)" >
             {{item.name}}
            </div>
          </div>
        </div>
      </div>
      <v-chart class="airWuRanEchart marginTop16" :options="waterpolar" />
      <ul class="listTab flexRow marginTop26" style="margin-top: 20px;">
        <li v-for="(item, index) in waterList" @click="waterListQh(item)" style="margin-right: -1px;line-height: 32px;" :key="index" :class="item.id === waterListSelected ? 'selected' : ''">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      airWuranSelected: [
        {
          id: '1',
          label: '一月'
        }, {
          id: '2',
          label: '二月'
        }, {
          id: '3',
          label: '三月'
        }, {
          id: '4',
          label: '四月'
        }, {
          id: '5',
          label: '五月'
        }, {
          id: '6',
          label: '六月'
        }, {
          id: '7',
          label: '七月'
        }, {
          id: '8',
          label: '八月'
        }, {
          id: '9',
          label: '九月'
        }, {
          id: '10',
          label: '十月'
        }, {
          id: '11',
          label: '十一月'
        }, {
          id: '12',
          label: '十二月'
        }
      ],
      airWuranvalue: '',
      airpolar: {
        grid: [
          {x: '5%', y: '16%', width: '90%', height: '75%'}
        ],
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            var showHtm = ''
            var timeList = ['浓度', '改善率']
            for (var i = 0; i < params.length; i++) {
              // x轴名称
              var name = timeList[i]
              // 日期
              var text = params[i].axisValue
              if (i == 0) {
                showHtm += text + '<br>'
              }
              // 值
              var value = params[i].data[1]
              if (name == '浓度') {
                showHtm += '<span style="color:#387898">' + name + '</span>: ' + value + ' μg/m³' + '<br>'
              } else {
                showHtm += '<span style="color:#8b7a40">' + name + '</span>: ' + value + ' %' + '<br>'
              }
            }
            return showHtm
          }
        },
        legend: {
          show: true,
          icon: 'stack',
          itemWidth: 14,
          itemHeight: 1,
          itemGap: 25,
          right: 200,
          textStyle: {
            color: 'RGB(193,223,255)',
            fontSize: 20
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
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
            name: '浓度（ μg/m³ ）',
            nameLocation: 'end',
            nameTextStyle: {
              color: '#93AECE',
              fontSize: 16
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
            name: '改善率(%)',
            nameLocation: 'end',
            nameTextStyle: {
              color: '#93AECE',
              fontSize: 16
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
            name: '当前浓度',
            type: 'line',
            data: [],
            showSymbol: true,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 11, // 设定实心点的大小
            color: 'rgba(88, 204, 252, 1)',
            lineStyle: {
              color: 'rgba(88, 204, 252, 1)'
            }
          },
          {
            yAxisIndex: 1,
            name: '改善率',
            type: 'line',
            data: [],
            color: 'rgba(255, 209, 77, 1)',
            showSymbol: true,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 11, // 设定实心点的大小
            lineStyle: {
              color: 'rgba(255, 209, 77, 1)'
            }
          }
        ]
      },
      airTab: [
        {name: '同比', id: '0'},
        {name: '环比', id: '1'}
      ],
      airTabSelected: '0',
      airList: [
        {name: 'PM2.5', id: 'pm25'},
        {name: 'PM10', id: 'pm10'},
        {name: 'NO₂', id: 'no2'},
        {name: 'SO₂', id: 'so2'},
        {name: 'CO', id: 'CO'},
        {name: 'O₃', id: 'o3'}
      ],
      airListSelected: 'pm25',
      airCompareType: '0',
      airTime: '',
      // 水污染
      waterWuranSelected: [
        {
          id: '1',
          label: '一月'
        }, {
          id: '2',
          label: '二月'
        }, {
          id: '3',
          label: '三月'
        }, {
          id: '4',
          label: '四月'
        }, {
          id: '5',
          label: '五月'
        }, {
          id: '6',
          label: '六月'
        }, {
          id: '7',
          label: '七月'
        }, {
          id: '8',
          label: '八月'
        }, {
          id: '9',
          label: '九月'
        }, {
          id: '10',
          label: '十月'
        }, {
          id: '11',
          label: '十一月'
        }, {
          id: '12',
          label: '十二月'
        }
      ],
      waterWuranvalue: '',
      waterpolar: {
        grid: [
          {x: '5%', y: '16%', width: '90%', height: '75%'}
        ],
        tooltip: {
          trigger: 'axis',
          formatter: function (params, ticket, callback) {
            var showHtm = ''
            var timeList = ['浓度', '改善率']
            for (var i = 0; i < params.length; i++) {
              // x轴名称
              var name = timeList[i]
              // 日期
              var text = params[i].axisValue
              if (i == 0) {
                showHtm += text + '<br>'
              }
              // 值
              var value = params[i].data[1]
              if (name == '浓度') {
                showHtm += '<span style="color:#8a394e">' + name + '</span>: ' + value + ' μg/m³' + '<br>'
              } else {
                showHtm += '<span style="color:#363d99">' + name + '</span>: ' + value + ' %' + '<br>'
              }
            }
            return showHtm
          }
        },
        legend: {
          show: true,
          icon: 'stack',
          itemWidth: 14,
          itemHeight: 1,
          itemGap: 25,
          right: 200,
          textStyle: {
            color: 'RGB(193,223,255)',
            fontSize: 20
          }
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
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
            name: '浓度（ μg/m³ ）',
            nameLocation: 'end',
            nameTextStyle: {
              color: '#93AECE',
              fontSize: 16
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
            name: '改善率(%)',
            nameLocation: 'end',
            nameTextStyle: {
              color: '#93AECE',
              fontSize: 16
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
            name: '当前浓度',
            type: 'line',
            data: [],
            showSymbol: true,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 11, // 设定实心点的大小
            color: 'rgba(253, 78, 105, 1)',
            lineStyle: {
              color: 'rgba(253, 78, 105, 1)'
            }
          },
          {
            name: '改善率',
            type: 'line',
            yAxisIndex: 1,
            data: [],
            color: 'rgba(85, 87, 255, 1)',
            showSymbol: true,
            symbol: 'circle', // 折线点设置为实心点
            symbolSize: 11, // 设定实心点的大小
            lineStyle: {
              color: 'rgba(85, 87, 255, 1)'
            }
          }
        ]
      },
      waterTab: [
        {name: '同比', id: '0'},
        {name: '环比', id: '1'}
      ],
      waterTabSelected: '0',
      waterList: [
        {name: 'COD', id: 'w01018'},
        {name: '高锰酸盐', id: 'w01019'},
        {name: '氨氮', id: 'w21003'},
        {name: '溶解氧', id: 'w01009'},
        {name: 'PH', id: 'w01001'},
        {name: '总氮', id: 'w21001'},
        {name: '总磷', id: 'w21011'}
      ],
      waterListSelected: 'w01018',

      waterCompareType: '0',
      waterTime: ''
    }
  },
  methods: {
    // 水变化趋势
    WaterControllerLevel () {
      var x = this.waterWuranvalue < 10 ? '0' + this.waterWuranvalue : this.waterWuranvalue
      var xList = []
      for (var i = 1; i <= 31; i++) {
        if (i < 10) {
          xList.push(x + '-0' + i)
        } else {
          xList.push(x + '-' + i)
        }
      }
      this.waterpolar.xAxis[0].data = xList
      if (this.waterWuranvalue < 10) {
        this.waterTime = '0' + this.waterWuranvalue
      } else {
        this.waterTime = '' + this.waterWuranvalue
      }
      this.getPollutantTrends()
    },
    waterCompareClick (item) {
      this.waterCompareType = item.id
      this.waterTabSelected = item.id
      this.getPollutantTrends()
    },
    waterListQh (item) {
      this.waterListSelected = item.id
      this.getPollutantTrends()
    },
    /**
       * 水污染物趋势分析
       */
    getPollutantTrends () {
      var self = this
      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.changeTrendPrp_getPollutantTrends()
        // 重置data 确保只显示一条
        self.waterpolar.series[0].data = []
        self.waterpolar.series[1].data = []
        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            var time = data[i].monitorTime.substring(5)
            self.waterpolar.series[0].data.push([time, data[i][self.waterListSelected]])
            self.waterpolar.series[1].data.push([time, data[i][self.waterListSelected + 'RateOfChange'] == null ? '-' : data[i][self.waterListSelected + 'RateOfChange']])
          }
        }
        return
      }

      var param = new URLSearchParams()
      var date = new Date()
      param.append('compareType', self.waterCompareType)
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', date.getFullYear() + '-' + self.waterTime)
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaWater/getPollutantTrends', param
      ).then(function (res) {
        if (res.data.code == 200) {
          var data = res.data.data
          // 重置data 确保只显示一条
          self.waterpolar.series[0].data = []
          self.waterpolar.series[1].data = []
          if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
              var time = data[i].monitorTime.substring(5)
              self.waterpolar.series[0].data.push([time, data[i][self.waterListSelected]])
              self.waterpolar.series[1].data.push([time, data[i][self.waterListSelected + 'RateOfChange'] == null ? '-' : data[i][self.waterListSelected + 'RateOfChange']])
            }
          }
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    // 空气变化趋势
    airListQh (item) {
      this.airListSelected = item.id
      this.getAreaYearPollutantTrend()
    },
    airCompareClick (item) {
      this.airCompareType = item.id
      this.airTabSelected = item.id
      this.getAreaYearPollutantTrend()
    },
    AirControllerLevel () {
      var x = this.airWuranvalue < 10 ? '0' + this.airWuranvalue : this.airWuranvalue
      var xList = []
      for (var i = 1; i <= 31; i++) {
        if (i < 10) {
          xList.push(x + '-0' + i)
        } else {
          xList.push(x + '-' + i)
        }
      }
      this.airpolar.xAxis[0].data = xList
      if (this.airWuranvalue < 10) {
        this.airTime = '0' + this.airWuranvalue
      } else {
        this.airTime = '' + this.airWuranvalue
      }
      this.getAreaYearPollutantTrend()
    },
    getAreaYearPollutantTrend () {
      var self = this
      if (self.AppData.dataFlag) {
        // 演示数据
        let data = self.AppData.changeTrendPrp_getAreaYearPollutantTrend()
        self.airpolar.series[0].data = []
        self.airpolar.series[1].data = []
        if (data.length != 0) {
          for (var i = 0; i < data.length; i++) {
            var time = data[i].monthTime.substring(5, 10)
            self.airpolar.series[0].data.push([time, data[i][self.airListSelected]])
            self.airpolar.series[1].data.push([time, data[i][self.airListSelected + 'RateOfChange'] == null ? '-' : data[i][self.airListSelected + 'RateOfChange']])
          }
        }
        return
      }

      var param = new URLSearchParams()
      var date = new Date()
      param.append('compareType', self.airCompareType)
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('time', date.getFullYear() + '-' + self.airTime)
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaAir/getAreaYearPollutantTrend', param
      ).then(function (res) {
        if (res.data.code == 200) {
          var data = res.data.data
          // 重置data 确保只显示一条
          self.airpolar.series[0].data = []
          self.airpolar.series[1].data = []
          if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
              var time = data[i].monthTime.substring(5, 10)
              self.airpolar.series[0].data.push([time, data[i][self.airListSelected]])
              self.airpolar.series[1].data.push([time, data[i][self.airListSelected + 'RateOfChange'] == null ? '-' : data[i][self.airListSelected + 'RateOfChange']])
            }
          }
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  },
  mounted () {
    var data = new Date()
    this.waterWuranvalue = data.getMonth() + 1 + ''
    this.waterTime = this.waterWuranvalue < 10 ? '0' + this.waterWuranvalue : this.waterWuranvalue
    var x = this.waterWuranvalue < 10 ? '0' + this.waterWuranvalue : this.waterWuranvalue

    this.airWuranvalue = data.getMonth() + 1 + ''
    this.airTime = this.airWuranvalue < 10 ? '0' + this.airWuranvalue : this.airWuranvalue

    var xList = []
    for (var i = 1; i <= 31; i++) {
      if (i < 10) {
        xList.push(x + '-0' + i)
      } else {
        xList.push(x + '-' + i)
      }
    }
    this.waterpolar.xAxis[0].data = xList
    this.airpolar.xAxis[0].data = xList
    this.getAreaYearPollutantTrend()
    this.getPollutantTrends()
  }
}
</script>
