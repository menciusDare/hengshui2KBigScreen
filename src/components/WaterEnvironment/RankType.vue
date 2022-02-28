<template>
  <div class="backgroundPop  marginBottom waterRankType height1150">
    <div class="waterRank">
      <div class="titleLine">
        <div class="textTitle">
          <span>水质排名</span>
        </div>
        <span class="time">{{month.slice(0,4) + '.' + month.slice(4,6)}}</span>
      </div>
      <div class="waterRankMain">
        <div class="waterRankMainTab rowSpace alginCenter">
          <ul class="rowSpace">
            <li v-for= "(item, index) in waterRankTab" :key = "index" :class="item.id === waterRankTabSelcted ? 'selected': ''" @click="waterRankChange(index)" style="cursor:pointer;">
              {{item.name}}
            </li>
          </ul>
          <el-select v-model="waterRankvalue" placeholder="请选择" class="waterRankSelected changeSelected" @change="controllerLevel">
            <el-option
              v-for="item in waterRankSelected"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <v-chart class="waterRankEchars" :options="waterRankEchars" id="waterRankEchars" />
<!--        <div id="waterRankEchars" style="height: auto;"/>-->
      </div>
    </div>
    <div class="waterType">
      <div class="titleLine">
        <div class="textTitle">
          <span>本月区县水质类别变化排名</span>
        </div>
        <span class="time">{{new Date().format("yyyy.MM")}}</span>
      </div>
      <v-chart class="waterTypeEchars" :options="waterTypeEchars" />
      <!-- <div class=""></div> -->
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // date
      month: this.getLastMonth(),
      // 区域code
      regionCode: this.AppConfig.appInfo.regionCode,
      // 控制级别 options
      waterRankSelected: [
        {
          id: 0,
          label: '全部'
        }, {
          id: 1,
          label: '国省控'
        }, {
          id: 2,
          label: '市控'
        }
      ],
      // 控制级别
      waterRankvalue: 0,
      // 污染因子 options
      waterRankTab: [
        {name: '高锰酸盐指数', id: 'w01019'},
        {name: '氨氮', id: 'w21003'},
        {name: '总氮', id: 'w21001'},
        {name: '总磷', id: 'w21011'}
      ],
      // 污染因子
      waterRankTabSelcted: 'w01019',
      // 水质排名data
      waterRankData: {},
      // 水质类别变化排名data
      waterTypeRankData: {},

      waterRankEchars: {
        grid: [
          {x: '7%', y: '9%', width: '90%', height: '82%'}
        ],
        tooltip: {},
        legend: {
          show: false
        },
        xAxis: {
          data: ['咸安区', '嘉鱼县', '通城县', '崇阳县', '通山县', '赤壁市'],
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
          }
        },
        yAxis: {
          name: '上月均值',
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
        },
        series: [{
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#4280FF'
              },
              {
                offset: 1,
                color: '#AEC7FB'
              }
            ])
          },
          barWidth: 32
        }]
      },
      waterTypeEchars: {
        grid: [
          {x: '7%', y: '9%', width: '90%', height: '82%'}
        ],
        tooltip: {},
        legend: {
          show: false
        },
        xAxis: {
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
          }
        },
        yAxis: {
          name: 'III类及以上断面提升率',
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
        },
        series: [{
          type: 'bar',
          data: [],
          itemStyle: {
            color: (data) => { // 设置正负颜色值
              let color1 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0, color: '#84FAB0'}, {offset: 1, color: '#8FD3F4'}])
              let color2 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0, color: '#FBAEAE'}, {offset: 1, color: '#F60000'}])
              return data.data >= 0 ? color1 : color2
            }
          },
          barWidth: 32
        }]
      }
    }
  },
  mounted () {
    // 通过控制级别查询水质排名
    this.controllerLevel(this.waterRankvalue)
    // 查询水质类别变化排名
    this.initWaterTypeRank()
  },
  methods: {
    /**
       * 查询水质排名
       * @param controlLevelId 控制级别
       * @param pollutant 污染因子
       */
    init (controlLevelId, pollutant) {
      let _this = this
      if (this.AppData.dataFlag) {
        // 演示数据
        _this.waterRankData = _this.AppData.rankType_init()
        _this.initWaterRankChart()
        return
      }
      _this.$axios.get('api/online-monitor-data-share/tEnvMonthdata/getWaterQualityRanking', {
        params: {
          'pollutant': pollutant,
          'controlLevelId': controlLevelId
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.waterRankData = res.data.data
          _this.initWaterRankChart()
        }
      }
      )
    },
    /**
       * 获取上个月时间
       */
    getLastMonth: function () {
      var year, lastMonth
      var date = new Date()
      var nowYear = date.getFullYear() // 当前年：四位数字
      var nowMonth = date.getMonth() // 当前月：0-11
      if (nowMonth == 0) { // 如果是0，则说明是1月份，上一个月就是去年的12月
        year = nowYear - 1
        lastMonth = 12
      } else { // 不是1月份，年份为当前年，月份本来是要减1的，但是由于`getMonth()`的月份本身就是少了1的，所以月份不用变。
        year = nowYear
        lastMonth = nowMonth
      }

      lastMonth = lastMonth < 10 ? ('0' + lastMonth) : lastMonth // 月份格式化：月份小于10则追加个0

      let lastYearMonth = year + '' + lastMonth
      return lastYearMonth
    },

    /**
       * 根据国省控级别查询水质排名
       * @param val 控制级别
       */
    controllerLevel (val) {
      if (val == 0) {
        // 查询全部
        this.init('\'1\',\'2\',\'3\'', this.waterRankTabSelcted)
      } else if (val == 1) {
        // 查询国省控
        this.init('\'1\',\'2\'', this.waterRankTabSelcted)
      } else if (val == 2) {
        // 查询市控
        this.init('\'3\'', this.waterRankTabSelcted)
      }
    },

    /**
       *  根据污染因子，查询水质排名、
       *  @param index 污染因子
       */
    waterRankChange (index) {
      this.waterRankTabSelcted = this.waterRankTab[index].id
      this.controllerLevel(this.waterRankvalue)
    },

    /**
       * 水质排名echart
       */
    initWaterRankChart () {
      // 初始化趋势图
      var _this = this
      var xDatas, series = []
      xDatas = _this.waterRankData.map(item => {
        return item.reachName
      })
      series = _this.waterRankData.map(item => {
        return item[_this.waterRankTabSelcted]
      })

      _this.waterRankEchars = {
        grid: [
          {x: '7%', y: '9%', width: '90%', height: '79%'}
        ],
        tooltip: {
          formatter: function (params) {
            let unit = 'mg/L'
            return `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4280FF;"></span>  ${params.name} : ${params.value}  ${unit}`
          }
        },
        legend: {
          show: false
        },
        xAxis: {
          data: xDatas,
          scale: true,
          triggerEvent: true,
          // 设置文本过长超出隐藏...表示

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
            margin: 10,
            formatter: function (value) {
              var str = value
              var num = 4 // 每行显示字数
              var valLength = value.length // 该项x轴字数
              if (valLength >= 3) {
                str = value.substring(0, 3) + '\n' + '...'
              }
              return str

              // var rowNum = Math.ceil(valLength / num); // 行数
              //
              // if(rowNum > 1)
              // {
              //   for(var i = 0; i < rowNum; i++)
              //   {
              //     var temp = "";
              //     var start = i * num;
              //     var end = start + num;
              //
              //     temp = value.substring(start, end) + "\n";
              //     str += temp;
              //   }
              //
              //   return str;
              // }
              // else
              // {
              //   return value;
              // }
            }
          }

        },
        yAxis: {
          name: '上月均值',
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
        },
        series: [{
          type: 'bar',
          data: series,
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#4280FF'
              },
              {
                offset: 1,
                color: '#AEC7FB'
              }
            ])
          },
          barWidth: 32
        }]
      }

      var chart = this.$echarts.init(document.getElementById('waterRankEchars'))
      // 页面监控宽度的变化
      window.addEventListener('resize', function () {
        chart.resize()
      })

      // 判断是否创建过div框,如果创建过就不再创建了
      // 该div用来盛放文本显示内容的，方便对其悬浮位置进行处理
      var id = document.getElementById('extension')
      if (!id) {
        var div = '<div id = \'extension\' sytle="display:block;"></div>'
        $('html').append(div)
      }
      chart.on('mouseover', function (params) {
        // 注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
        if (params.componentType == 'xAxis') {
          // 设置悬浮文本的位置以及样式
          $('#extension').css({
            'position': 'absolute',
            'color': '#fff',
            'font-size': '16px',
            'padding': '5px',
            'display': 'block',
            'border-radius': '4px',
            'width': '110px',
            'background-color': 'rgba(0, 0, 0, .2)',
            'box-shadow': 'rgba(0, 0, 0, 0.3) 2px 2px 8px'
          }).text(params.value)
          $('html').mousemove(function (event) {
            var xx = event.pageX + 20
            var yy = event.pageY + 15
            $('#extension').css('top', yy).css('left', xx)
          })
        }
      })
      chart.on('mouseout', function (params) {
        // 注意这里，我是以X轴显示内容过长为例，如果是y轴的话，需要改为yAxis
        if (params.componentType == 'xAxis') {
          $('#extension').css('display', 'none')
        }
      })
    },

    /**
       * 查询水质类别排名
       * @param controlLevelId 控制级别
       * @param pollutant 污染因子
       */
    initWaterTypeRank (getWaterTypeRank) {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.waterTypeRankData = _this.AppData.rankType_initWaterTypeRank()
        _this.initwaterTypeRankChart()
        return
      }
      _this.$axios.get('api/online-monitor-data-share/tEnvMonthdataArea/getWaterTypeRank', {
        params: {
          'regionCode': _this.regionCode
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.waterTypeRankData = res.data.data
          _this.initwaterTypeRankChart()
        }
      }
      )
    },
    // 水质类别变化排名 Echart初始化
    initwaterTypeRankChart () {
      // 初始化趋势图
      var _this = this
      var xDatas, series = []
      xDatas = _this.waterTypeRankData.map(item => {
        return item.regionName
      })
      series = _this.waterTypeRankData.map(item => {
        return item.liftRate
      })
      _this.waterTypeEchars = {
        grid: [
          {x: '7%', y: '9%', width: '90%', height: '82%'}
        ],
        tooltip: {
          formatter: function (params) {
            let result = ''
            let unit = '%'
            result = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + '#F60000' + ';"></span>' + params.name + ': ' + params.value + ' ' + unit + '<br/>'
            return result
          }
        },
        legend: {
          show: false
        },
        xAxis: {
          data: xDatas,
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
          }
        },
        yAxis: {
          name: 'III类及以上断面提升率',
          type: 'value',
          nameLocation: 'end',
          nameTextStyle: {
            color: '#93AECE',
            fontSize: 18,
            padding: [0, 0, 0, 80]
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
        },
        series: [{
          type: 'bar',
          data: series,
          itemStyle: {
            color: (data) => { // 设置正负颜色值
              let color1 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#84FAB0'
              }, {offset: 1, color: '#8FD3F4'}])
              let color2 = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FBAEAE'
              }, {offset: 1, color: '#F60000'}])
              return data.data >= 0 ? color1 : color2
            }
          },
          barWidth: 32
        }]
      }
    }
  }
}
</script>
