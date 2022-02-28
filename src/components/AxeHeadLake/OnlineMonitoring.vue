<template>
  <div class="backgroundPop width75 marginBottom height1150">
    <div class="onLineMonitoring">
      <div class="titleLine">
        <div class="textTitle">
          <span>浮船在线监测</span>
        </div>
        <span class="time">{{rowSpaceDate}}</span>
      </div>
      <div class="rowSpace alginCenter marginTop26">
        <div class="qalityTab rowSpace">
          <div
            class="qalityTabLi"
            v-for="(item, index) in qalityTab"
            :key ="index"
            :class="index === qalitySelected ? 'seletecd' : ''" @click="checkQalityTab(index)"
            >
              {{item.name}}
          </div>
        </div>
        <el-select v-model="params.dateType"  placeholder="请选择" class="onLineSelected changeSelected" @change="checkSelect">
          <el-option
            v-for="item in onLineValueSelected"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div>
        <v-chart class="onLineEchars" :options="onLineEchars" />
      </div>
    </div>
    <div class="Pollution">
      <div class="titleLine">
        <div class="textTitle">
          <span>总磷污染分析</span>
        </div>
      </div>
      <div class="changetable PollutionTable marginTop26">
        <el-table :data="phosphorusData" cell-mouse-enter="handleEdit" style="width: 100%" :height="360">
        <el-table-column prop="name" align="left" label="断面名称"></el-table-column>
        <el-table-column prop="dayValue" align="center" label="昨日均值">
          <template  slot-scope="scope">
            <span>{{scope.row.w21011DayValue==null?'--':scope.row.w21011DayValue}} <span style="color: red">{{getW21011OverCountDayValue(scope.row.w21011OverCountDayValue)}}</span></span>
          </template>
        </el-table-column>
        <el-table-column prop="monthValue" align="center" label="本月均值">
          <template  slot-scope="scope">
            <span>{{scope.row.w21011MonthValue==null?'--':scope.row.w21011MonthValue}} <span style="color: red">{{getW21011OverCountDayValue(scope.row.w21011OverCountMonthValue)}}</span></span>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      // 浮船在线监测 - 日期
      rowSpaceDate: '',
      // 浮船在线监测 - 数据
      rowSpaceData: {},
      qalityTab: [
        {name: '湖心', id: '2002'},
        {name: '西侧湖面', id: '2004'},
        {name: '东侧湖面', id: '2010'}
      ],
      qalitySelected: 0,
      onLineValueSelected: [
        {
          id: 0,
          label: '近24H'
        }, {
          id: 1,
          label: '近一周'
        }, {
          id: 2,
          label: '近一月'
        }, {
          id: 3,
          label: '近一年'
        }
      ],
      onLineValue: 0,
      // 浮船在线监测
      onLineEchars: {
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
          icon: 'circle',
          top: '2%',
          left: '0',
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
            data: [],
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
        series: []
      },
      // 总磷data
      phosphorusData: [],
      // 斧头湖流域
      riverCode: 'a6ee7ad6785b4f0a96fc423558af254d',
      params: {
        dateType: 0,
        crossCod: ''
      }
    }
  },
  mounted () {
    this.initQuery()
    this.checkQalityTab(0)
  },
  methods: {
    getW21011OverCountDayValue (value) {
      if (value != null) {
        return '(' + value + ')' + '倍'
      } else {
        return ''
      }
    },
    /**
       * 总磷初始化查询
       */
    initQuery () {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.phosphorusData = _this.AppData.onlineMonitoring_initQuery()
        return
      }
      _this.$axios.get('api/online-monitor-data-share/waterQuality/getPollutantAnalyze', {
        params: {
          'pollutantCod': 'w21011',
          'riverCod': _this.riverCode
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.phosphorusData = res.data.data
        }
      }
      )
    },
    /**
       * 河流水质变化趋势 - 日期显示
       */
    getWaterChangeDate () {
      if (this.params.dateType == 3) {
        let startTime = this.rowSpaceData.dataX[0].slice(0, 4) + '.' + this.rowSpaceData.dataX[0].slice(4, 6)
        let endTime = this.rowSpaceData.dataX[this.rowSpaceData.dataX.length - 1].slice(0, 4) + '.' + this.rowSpaceData.dataX[this.rowSpaceData.dataX.length - 1].slice(4, 6)
        this.rowSpaceDate = startTime + ' - ' + endTime
      } else {
        this.rowSpaceDate = this.rowSpaceData.dataX[0].replaceAll('-', '.') + ' - ' + this.rowSpaceData.dataX[this.rowSpaceData.dataX.length - 1].replaceAll('-', '.')
      }
    },
    // 浮船在线监测
    loadSituationEcharsPin () {
      var _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.rowSpaceData = _this.AppData.onlineMonitoring_loadSituationEcharsPin()
        let data = _this.rowSpaceData.mapLakeStationDetailVos
        this.initEchart(_this.rowSpaceData.pollutants, data)
        return
      }

      _this.$axios.get('/api/online-monitor-data-share/waterQuality/getWaterQualityChange', {
        params: _this.params
      }).then(function (res) {
        if (res.data.code == 200) {
          let data = res.data.data.mapLakeStationDetailVos
          _this.rowSpaceData = res.data.data
          _this.getWaterChangeDate()
          let pollutants = res.data.data.pollutants
          this.initEchart(pollutants, data)
        }
      }).catch(reason => {})
    },

    initEchart (pollutants, data) {
      let _this = this
      let series = []
      pollutants.forEach(item => {
        let arr = []
        data.forEach(items => {
          let arrs = [items['monitorTime']]
          arrs.push(items[item.pollutantCode])
          arr.push(arrs)
        })
        let obj = {
          name: item.pollutantName,
          type: 'line',
          data: arr,
          smooth: false,
          showSymbol: true,
          symbol: 'circle', // 折线点设置为实心点
          symbolSize: 11 // 设定实心点的大小
        }

        series.push(obj)
      })
      _this.onLineEchars = {
        grid: [
          {x: '7%', y: '15%', width: '90%', height: '75%'}
        ],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let result = params[0].axisValueLabel + '<br/>'
            let unit = ''
            for (let index in params) {
              for (let index in pollutants) {
                if (params[index].seriesName == pollutants[index].pollutantName) {
                  unit = pollutants[index].unit
                  break
                }
              }
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[index].color + ';"></span>' + params[index].seriesName + ': ' + (params[index].data[1] ? params[index].data[1] : '-') + ' ' + unit + '<br/>'
            }
            return result
          }
        },
        legend: {
          show: true,
          icon: 'circle',
          top: '0%',
          left: '0',
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 25,
          textStyle: {
            color: 'RGB(193,223,255)',
            fontSize: 18
          },
          type: 'scroll', // 图例过多滚动，
          pageTextStyle: {
            color: '#4cabce'
          },
          pageIconColor: '#4cabce'
        },
        xAxis: [
          {
            type: 'category',
            data: _this.rowSpaceData.dataX,
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              // interval: 0,
              textStyle: {
                color: '#93AECE',
                fontSize: 18
              },
              // margin: 10,
              formatter: function (value) {
                let val = value
                // 判断是否是24H,是截取字符串"2020-01-01 01:00:00" 为 "01:00"
                if (_this.params.dateType == '0') {
                  val = value.substring(11, 16)
                }
                var str = ''
                var num = 6 // 每行显示字数
                var valLength = val.length // 该项x轴字数
                var rowNum = Math.ceil(valLength / num) // 行数

                if (rowNum > 1) {
                  for (var i = 0; i < rowNum; i++) {
                    var temp = ''
                    var start = i * num
                    var end = start + num

                    temp = val.substring(start, end) + '\n'
                    str += temp
                  }
                  return str
                } else {
                  return val
                }
              }
            },
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            name: '数值',
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
          }
        ],
        series: series
      }
    },

    checkSelect () {
      this.loadSituationEcharsPin()
    },
    checkQalityTab (index) {
      this.qalitySelected = index
      this.params.crossCod = this.qalityTab[index].id
      this.loadSituationEcharsPin()
    }
  }
}
</script>
