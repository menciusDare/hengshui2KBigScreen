<template>
  <div class="backgroundPop  marginBottom width1000 height1150">
    <div class="trend">
      <div class="titleLine">
        <div class="textTitle">
          <span>河流水质变化趋势</span>
        </div>
        <span class="time">{{waterChangeDate}}</span>
      </div>
      <div class="trendMain">

        <div class="trendCon marginTop26">
          <el-select v-model="trendSelectValue"  placeholder="请选择" class="trendSelectMain changeSelected" @change="trendSelectValueChange">
            <el-option v-for="item in trendSelect" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>

          <v-chart class="trendEchars" :options="trendEchars" style="padding-top: 50px;"/>

          <ul class="flexRow trendListMain">
            <li v-for=" (item, index) in trendList" class="trendList" :key="index" :class="item.id === trendListSelected ? 'selected': ''" @click="trendListSelectedClick(item.id)">
              {{item.name}}
            </li>
          </ul>

        </div>
      </div>
    </div>

    <div class="dyeChange">
      <div class="titleLine">
        <div class="textTitle">
          <span>河流主要污染物变化</span>
        </div>
        <span class="time">{{dyeChangeDate}}</span>
      </div>
      <div class="dyeChangeMain marginTop44">
        <div class="dyeChangeTab rowSpace alginCenter">
          <ul class="rowSpace qalityTab">
            <li v-for="(item, index) in dyeChangeTab" class="qalityTabLi" :key="index"
                :class="item.id === dyeChangeTabSelected ? 'seletecd': ''" @click="dyeChangeTabClick(item.id)">
              {{item.name}}
            </li>
          </ul>
          <el-select v-model="dyeChangeValue"  placeholder="请选择" class="waterRankSelected changeSelected" @change="dateChange">
            <el-option
              v-for="item in dyeChangeSelected"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <v-chart id="dyeChangeEchars" :options="dyeChangeEchars"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      /** *********** 河流水质变化趋势 start *************/
      // 河流水质变化趋势 - 周期 options
      trendSelect: [
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
      // 河流水质变化趋势 - 周期 默认 0 - 近24小时
      trendSelectValue: 0,
      dateTypes: '0',
      // 河流水质变化趋势 - 污染因子 options
      trendList: [
        {name: 'PH', id: 'w01001', unit: 'mg/L'},
        {name: '高锰酸盐指数', id: 'w01019', unit: 'mg/L'},
        {name: '氨氮', id: 'w21003', unit: 'mg/L'},
        {name: '总氮', id: 'w21001', unit: 'mg/L'},
        {name: '总磷', id: 'w21011', unit: 'mg/L'},
        {name: '溶解氧', id: 'w01009', unit: 'mg/L'},
        {name: '叶绿素a', id: 'w26001', unit: 'mg/L'},
        {name: '藻密度', id: 'w26002', unit: 'mg/L'}
      ],
      // 河流水质变化趋势 - 污染因子
      trendListSelected: 'w01001',
      // 淦河、北洪港河、王生茂河、贺胜桥河
      tBasRiver: [
        {riverName: '淦河', riverCode: '0800020001'},
        {riverName: '北洪港河', riverCode: '0800020000'},
        {riverName: '王生茂河', riverCode: '0800020003'},
        {riverName: '贺胜桥河', riverCode: '0800020002'}
      ],
      // 河流水质变化趋势 数据
      waterTrendData: {},
      // 河流水质变化趋势
      trendEchars: {},
      // 日期
      waterChangeDate: '',
      /** *********** 河流水质变化趋势 end *************/
      /** *********** 河流主要污染物变化 start *************/
      // 河流主要污染物变化 - 河流日期 options
      dyeChangeSelected: [
        {
          id: 0,
          label: '枯水期'
        },
        {
          id: 1,
          label: '平水期'
        },
        {
          id: 2,
          label: '丰水期'
        }
      ],
      // 河流主要污染物变化 - 河流周期
      dyeChangeValue: 0,
      // 河流主要污染物变化 - 河流 options
      dyeChangeTab: [
        {name: '淦河', id: '0800020001'},
        {name: '北洪港河', id: '0800020000'},
        {name: '王生茂河', id: '0800020003'},
        {name: '贺胜桥河', id: '0800020002'}
      ],
      // 河流主要污染物变化 - 河流code
      dyeChangeTabSelected: '0800020001',
      // 查询年份
      year: new Date().getFullYear(),
      // 河流主要污染物变化 数据
      dyeChangeData: {},
      // 河流主要污染物变化
      dyeChangeEchars: {},
      // 河流主要污染物变化 - 日期
      dyeChangeDate: ''
      /** *********** 河流主要污染物变化 end *************/
    }
  },
  computed: {

  },
  mounted () {
    // 初始化查询 - 河流水质变化趋势
    this.initWaterTrendQuery(this.trendSelectValue, this.trendListSelected)
    // 初始化查询 - 河流主要污染物变化
    this.initDyeChangeQuery((this.year - 1) + '12', this.year + '02')
  },
  methods: {

    /**
     * 初始化查询 - 河流水质变化趋势
     * @param dateType   0 - 24小时， 1 - 近一周， 2 - 近一个月， 3 - 近一年
     * @param pollutantCode 污染因子code
     * @param riverCode 流域code
     */
    initWaterTrendQuery (dateType, pollutantCode) {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.waterTrendData = _this.AppData.changingTrend_initWaterTrendQuery()
        _this.initWaterTrendChart()
        return
      }

      if (!dateType && !pollutantCode) {
        _this.waterTrendData = []
        _this.initWaterTrendChart()
        return
      }
      _this.dateTypes = dateType
      let params = new URLSearchParams()
      params.append('dateType', dateType)
      params.append('pollutantCode', pollutantCode)
      params.append('tBasRiver', JSON.stringify(_this.tBasRiver))

      _this.$axios.post('api/online-monitor-data-share/waterQuality/getRiverWaterQualityChanges', params).then(function (res) {
        if (res.data.code == 200) {
          _this.waterTrendData = res.data.data
          _this.getWaterChangeDate()
          _this.initWaterTrendChart()
        }
      }
      )
    },

    /**
     * 河流水质变化趋势 - 日期显示
     */
    getWaterChangeDate () {
      if (this.trendSelectValue == 3) {
        let startTime = this.waterTrendData.xaxis[0].slice(0, 4) + '.' + this.waterTrendData.xaxis[0].slice(4, 6)
        let endTime = this.waterTrendData.xaxis[this.waterTrendData.xaxis.length - 1].slice(0, 4) + '.' + this.waterTrendData.xaxis[this.waterTrendData.xaxis.length - 1].slice(4, 6)
        this.waterChangeDate = startTime + ' - ' + endTime
      } else {
        this.waterChangeDate = this.waterTrendData.xaxis[0].replaceAll('-', '.') + ' - ' + this.waterTrendData.xaxis[this.waterTrendData.xaxis.length - 1].replaceAll('-', '.')
      }
    },

    /**
     * 河流水质变化趋势 - 日期展示
     *
     */
    getDyeChangeDate () {
      if (this.dyeChangeValue == '0') {
        let startTime = (this.year - 1) + '.12'
        let endTime = this.year + '.02'
        this.dyeChangeDate = startTime + ' - ' + endTime
      }
      if (this.dyeChangeValue == '1') {
        let startTime = this.year + '.03'
        let endTime = this.year + '.04'
        this.dyeChangeDate = startTime + ' - ' + endTime
      }
      if (this.dyeChangeValue == '2') {
        let startTime = this.year + '.05'
        let endTime = this.year + '.09'
        this.dyeChangeDate = startTime + ' - ' + endTime
      }
    },

    /**
     * 河流水质变化趋势 - echart
     */
    initWaterTrendChart () {
      // 初始化趋势图
      var _this = this
      var xDatas = _this.waterTrendData.xaxis == null ? [] : _this.waterTrendData.xaxis
      var data = _this.waterTrendData == null ? [] : _this.waterTrendData
      //  数据集合
      var series = new Array()
      // 标题
      var legend = data.data
      var selected = {}

      if (data.seriesVos != null) {
        var seriesVos = data.seriesVos
        if (seriesVos.length > 0) {
          for (let i = 0; i < seriesVos.length; i++) {
            var obj = {}
            obj.name = seriesVos[i].name
            obj.type = seriesVos[i].type
            obj.data = seriesVos[i].data
            obj.smooth = false// 平滑
            obj.symbol = 'circle'// 折线点设置为实心点
            obj.symbolSize = 11 // 设定实心点的大小
            series.push(obj)
          }
        }
      }

      _this.trendEchars = {
        color: ['#6236FF', '#F7B500', '#B620E0', '#CDE577', '#F759AB', '#B37FEB'],
        // 图例
        legend: {
          top: 0,
          data: legend,
          selected: selected,
          type: 'scroll', // 图例过多滚动，
          textStyle: {
            color: 'RGB(193,223,255)',
            fontSize: 18
          },
          // // icon: "rect",
          itemWidth: 12, // 设置宽度
          itemHeight: 12 // 设置高度
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
          // formatter: '{a} <br/>{b}: {c}天',
          // formatter: '{b}: {d}%',
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            var x = 0 // x坐标位置
            var y = 0 // y坐标位置

            // 当前鼠标位置
            var pointX = point[0]
            var pointY = point[1]

            // 外层div大小
            // var viewWidth = size.viewSize[0];
            // var viewHeight = size.viewSize[1];

            // 提示框大小
            var boxWidth = size.contentSize[0]
            var boxHeight = size.contentSize[1]

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5
            } else { // 左边放的下
              x = pointX - boxWidth
            }

            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5
            } else { // 上边放得下
              y = pointY - boxHeight
            }

            return [x, y]
          },
          formatter: function (params) {
            let result = params[0].axisValueLabel + '<br/>'
            let unit = ''
            for (let index in _this.trendList) {
              if (_this.trendList[index].id == _this.trendListSelected) {
                unit = _this.trendList[index].unit
              }
            }
            for (let index in params) {
              result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[index].color + ';"></span>' + params[index].seriesName + ': ' + params[index].data[1] + ' ' + unit + '<br/>'
            }

            return result
          }
        },
        grid: {x: ' 5%', y: '15%', width: '90%', height: '75%'},
        // x轴
        xAxis: {
          type: 'category',
          data: xDatas,
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#93AECE'
            },
            formatter: function (value) {
              let val = value
              // 判断是否是24H,是截取字符串"2020-01-01 01:00:00" 为 "01:00"
              if (_this.dateTypes == '0') {
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

          axisLine: {
            lineStyle: {
              color: '#93AECE',
              width: 1// 这里是为了突出显示加上的，可以去掉
            }
          }
        },
        // y轴
        yAxis:
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
                color: '#93AECE'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          },
        // 数据
        series: series
      }
    },

    /**
     * 河流水质变化趋势 - 周期 change
     */
    trendSelectValueChange () {
      this.initWaterTrendQuery(this.trendSelectValue, this.trendListSelected)
    },

    /**
     * 河流水质变化趋势 - 污染因子 click
     * @param val
     */
    trendListSelectedClick (val) {
      this.trendListSelected = val
      this.initWaterTrendQuery(this.trendSelectValue, this.trendListSelected)
    },

    /**
     * 河流主要污染物变化 - 初始化查询
     * @param startTime   default : new Date().getFullYear - 1 + "12"
     * @param endTime default : new Date().getFullYear + "02"
     */
    initDyeChangeQuery (startTime, endTime) {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.dyeChangeData = _this.AppData.changingTrend_initDyeChangeQuery()
        _this.initDyeChangeChart()
        return
      }

      if (!startTime && !endTime) {
        return
      }

      _this.$axios.get('api/online-monitor-data-share/waterQuality/getRiverPollutantChange', {
        params: {
          'startTime': startTime,
          'endTime': endTime,
          'riverCod': _this.dyeChangeTabSelected
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.dyeChangeData = res.data.data
          _this.getDyeChangeDate()
          _this.initDyeChangeChart()
        }
      }
      )
    },

    /**
     * 河流主要污染物变化 - echart
     */
    initDyeChangeChart () {
      let seriesData = this.dyeChangeData == null ? [] : this.dyeChangeData.dateList
      let tbasPollutantList = this.dyeChangeData == null ? [] : this.dyeChangeData.tbasPollutantList
      let xDatas = this.dyeChangeData == null ? [] : this.dyeChangeData.nameList
      this.dyeChangeEchars = {
        grid: [
          {x: '7%', y: '9%', width: '90%', height: '82%'}
        ],
        tooltip: {
          formatter: function (params) {
            for (let index in tbasPollutantList) {
              if (tbasPollutantList[index].pollutantName == params.name) {
                return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#40E9BD;"></span>' + params.name + ': ' + params.data + ' ' + tbasPollutantList[index].unit
              }
            }
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
            show: false
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
        },
        series: [{
          type: 'bar',
          data: seriesData,
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#40E9BD'
              },
              {
                offset: 1,
                color: '#40BCE8'
              }
            ])
          },
          barWidth: 32
        }]
      }
    },

    /**
     * 河流污染物变化 - 河流change事件
     * @param val
     */
    dyeChangeTabClick (val) {
      this.dyeChangeTabSelected = val
      this.dateChange(this.dyeChangeValue)
    },

    /**
     * 河流污染物变化 - 河流周期
     * @param val
     */
    dateChange (val) {
      // val 0 枯水期 去年12月 - 今年2月
      // val 2 丰水期 当年5月 - 9月
      // val 1 平水期 当年3月 - 4月

      if (val == '0') {
        let startTime = (this.year - 1) + '12'
        let endTime = this.year + '02'
        this.initDyeChangeQuery(startTime, endTime)
      }
      if (val == '1') {
        let startTime = this.year + '03'
        let endTime = this.year + '04'
        this.initDyeChangeQuery(startTime, endTime)
      }
      if (val == '2') {
        let startTime = this.year + '05'
        let endTime = this.year + '09'
        this.initDyeChangeQuery(startTime, endTime)
      }
    }
  }
}
</script>
