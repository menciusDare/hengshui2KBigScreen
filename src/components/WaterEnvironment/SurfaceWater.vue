<template>
  <div class="backgroundPop width75s marginBottom">
    <div class="titleLine">
      <div class="textTitle">
        <span>地表水达标情况</span>
      </div>
      <span class="time">{{params.yearDate.slice(0,4) + '.' + params.yearDate.slice(4,6)}}</span>
    </div>
    <div class="SurfaceWater">
      <div class="textTitle padding-left0">
        <span>水质现状</span>
      </div>
      <div class="situationEcharsCon">
        <v-chart class="situationEchars marginTop26" :options="situationEchars"></v-chart>
        <div class="echarsCenter">
          <strong>{{dataPin.waterQuality}}</strong>
          <span>区域水质情况</span>
        </div>
      </div>
      <!-- <div class="situationEchars" id="situationEchars"></div> -->
      <div class="textTitle padding-left">
        <span>县级以上集中式饮用水源地</span>
      </div>
      <div class="progressWater rowSpace">
        <div class="progressText alginCenter rowCenter">总数{{progressWater.total}}个</div>
        <div class="progressMain">
          <div class="progressMainColor" :style="{width:progressWater.complianceRate+ '%',}">
            <div class="progressBlock">
              达标率{{progressWater.complianceRate}}%
              <div class="xian"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="textTitle padding-left0 rowSpace riverTitle">
        <span>河流、湖库</span>
        <div class="text alginCenter">
          <div class="iconM"></div>
          <span>目标</span>
          <strong>III类及以上断面{{target}}</strong>
        </div>
      </div>
      <div class="riverMain">
        <v-chart class="riverEchars" :options="riverEchars" width="100%" height="100%" id="riverLakeEchart"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        progressWater: {
          total: 9,
          complianceRate: 78
        },
        target:0,
        riverCode: this.AppConfig.appInfo.riverCode,
        regionCode:this.AppConfig.appInfo.regionCode,
        threePercentage:0,
        // 河流湖库
        riverEchars: {
          grid: [
            {x: ' 5%', y: '4%', width: '90%', height: '86%'}
          ],
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
          },
          legend: {
            show: false
          },
          xAxis: [
            {
              type: 'category',
              data: ['10:00', '10:00', '10:00', '10:00', '10:00', '10:00', '10:00'],
              axisLine: {
                lineStyle: {
                  color: '#ddd',
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
                  color: '#ddd',
                },
              },
              axisLabel: {
                textStyle: {
                  color: '#93AECE',
                  fontSize: 18
                },
              },
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              type: 'line',
              data: [90, 10, 90, 100, 15, 30, 7],
              showSymbol: false,
              smooth: true,
              lineStyle: {
                color: '#44D7B6'
              },
              areaStyle: {
                color: 'rgba(129, 240, 255, 0.2)'
              },
              markLine: {
                data: [{
                  name: 'III类及以上断面30%',
                  yAxis: 30,
                  symbol: "none",
                  label: {
                    show: true,
                    position: 'insideStartTop',
                    formatter: '{b}',
                    fontSize: '20'
                  },
                  lineStyle: {
                    color: '#F8C900'
                  }
                },
                {
                  name: 'III类及以上断面40%',
                  yAxis: 40,
                  symbol: "none",
                  label: {
                    show: true,
                    position: 'insideStartTop',
                    formatter: '{b}',
                    fontSize: '20'
                  },
                  lineStyle: {
                    color: '#F8C900'
                  }
                }],
                silent: true,
              }
            }
          ]
        },
        riverLakeData:{},
        situationEchars: {
          grid: [
            {x: '40%', y: '0%', width: '90%', height: '60%'}
          ],
          legend: {},
          tooltip : {
            trigger: 'item',
            formatter: '{b}: {d}%',
            textStyle: {
              color: "#BDCAE2",
              fontSize: "24",
            }
          },
          series: [
            {
              type: 'pie',
              roundCap: true,//可选项为1和2，不填则采用原有拼接方式
              // coordinateSystem: 'polar',
              name: 'AQI',
              radius: ['75%', '90%'],
              label: {
                show: false,
              },
              emphasis: {
                label: {
                  show: false,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false,
              },
              data: [],
              left: "0%",
              center: ["20%", "50%"]
            }
          ]
        },
        params:{
          yearDate:this.getLastMonth(),
          regionCode:this.AppConfig.appInfo.regionCode,
        },
        dataPin:{},
        paramsTwo:{
          startDate:this.getLastMonth(),
          regionCode:this.AppConfig.appInfo.regionCode,
        },
      }
    },
    mounted(){
      this.loadSituationEchars()
      this.getDataList();
      this.initRiverLake();
    },
    methods: {
      /**
       * @Author              : yht
       * @Date                : 2020/12/7 11:01 上午
       * @Description         : 县级以上集中式饮用水源地
       * @UpdateUser          :
       * @UpdateDate          : 2020/12/7 11:01 上午
       * @UpdateDescription   :
       * @Param               : null
       * @return              : null
       */
      getDataList(){
        var _this = this;
        if (_this.AppData.dataFlag) {
          // 演示数据
          _this.progressWater = _this.AppData.surfaceWater_getDataList();
          return;
        }
        _this.$axios.get('/api/online-monitor-data-share/tEnvYeardataArea/getWaterSourceArea',{params:_this.paramsTwo}).then(function (res) {
          if (res.data.code == 200) {
            _this.progressWater = res.data.data;
          }
        }).catch(reason => {});

      },
      getLastMonth: function () {
        var year, lastMonth
        var date = new Date()
        var nowYear = date.getFullYear()   //当前年：四位数字
        var nowMonth = date.getMonth()     //当前月：0-11
        if (nowMonth == 0) getLastMonth{   //如果是0，则说明是1月份，上一个月就是去年的12月
          year = nowYear - 1
          lastMonth = 12
        } else { //不是1月份，年份为当前年，月份本来是要减1的，但是由于`getMonth()`的月份本身就是少了1的，所以月份不用变。
          year = nowYear
          lastMonth = nowMonth
        }

        lastMonth = lastMonth < 10 ? ('0' + lastMonth) : lastMonth   //月份格式化：月份小于10则追加个0

        let lastYearMonth = year +''+ lastMonth
        return lastYearMonth;
      },
      loadSituationEchars(){
        var _this = this;
        if (_this.AppData.dataFlag) {
          // 演示数据
          _this.dataPin = _this.AppData.surfaceWater_loadSituationEchars();
          _this.initLoadSituationEchars();
          return;
        }

        _this.$axios.get('/api/online-monitor-data-share/tEnvYeardataArea/getWaterStatusQuo', {
          params:_this.params
        }).then(function (res) {
          if (res.data.code == 200) {
            _this.dataPin = res.data.data[0];
            _this.initLoadSituationEchars();
          }
        }).catch(reason => {});
      },

      /**
       * 水质现状 echart
       */
      initLoadSituationEchars () {
        let _this = this;
        // 绘制图表
        let  data = [
          {
            value: (_this.dataPin.oneCategory+_this.dataPin.twoCategory),
            name: "I-II类",
          },
          {
            value:  _this.dataPin.threeCategory,
            name: "III类",
          },

          {
            value: _this.dataPin.fourCategory,
            name: "IV类",
          },
          {
            value: _this.dataPin.fiveCategory,
            name: "V类",
          },
          {
            value: _this.dataPin.badFiveCategory,
            name: "劣V类",
          }
        ]
        let color1 = new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0,color: '#27CAFB'}, {offset: 1,color: '#028FFC'}]);
        let color2 = new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0,color: '#84FAB0'}, {offset: 1,color: '#67C51D'}]);
        let color3 = new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0,color: '#F8C900'}, {offset: 1,color: '#F8C900'}]);
        let color4 = new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0,color: '#F19D38'}, {offset: 1,color: '#F19D38'}]);
        let color5 = new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0,color: '#FE0000'}, {offset: 1,color: '#EA3522'}]);
        const  listColor = {
          "I-II类": color1,
          "III类": color2,
          'IV类': color3,
          'V类': color4,
          '劣V类': color5
        }
        let total = data.reduce((a, b) => {
          return a + b.value * 1
        }, 0)
        // console.log(total)
        _this.situationEchars.legend = {
          show: true,
          orient: 'vertical',
          top: '20',
          right: '30',
          data: ['I-II类', 'III类', 'IV类', 'V类', '劣V类'],
          textStyle: {
            color: "#BDCAE2",
            fontSize: "24",
          },
          formatter:  (name) => {
            let res = data.filter( item => item.name === name)
            let percent = (res[0].value * 100 / total).toFixed(2);
            return `    ${name}   ${percent}%   ${res[0].value}个`
          },
        }
        data.forEach( item => {
          const color = listColor[item.name]
          return item.itemStyle = {color}
        })
        _this.situationEchars.series[0].data = data
      },

      /**
       * 初始化河流、湖库
       */
      initRiverLake(){
        let _this = this;
        if (_this.AppData.dataFlag) {
          // 演示数据
          _this.riverLakeData = _this.AppData.surfaceWater_initRiverLake();
          _this.target = _this.riverLakeData.data.target;
          _this.initRiverLakeEchart();
          return;
        }
        _this.$axios.get('api/online-monitor-data-share/tEnvYeardataArea/getWaterRiverAndLake',{
          params:{
            "yearDate":new Date().getFullYear(),
            "riverCode":_this.riverCode,
            "regionCode":_this.regionCode
          }
        }).then(function (res) {
            if (res.data.code == 200) {
              _this.riverLakeData = res.data.data;
              _this.target = res.data.data.target;
              _this.initRiverLakeEchart();
            }
          }
        )
      },
      initRiverLakeEchart(){
        //初始化趋势图
        var _this = this;
        var xDatas = [];
        var yDatas = [];
        for(let i = 0; i<=100 ;i++) {
          yDatas.push(i);
        }
        var series = [];
        for (let key in _this.riverLakeData.data) {
          xDatas.push(key);
          let riverLakeDatum = _this.riverLakeData.data[key]
          series.push(riverLakeDatum);
        }

        _this.riverEchars = {
          color:["#44D7B6"],
          grid: [
            {x: '6%', y: '8%', width: '85%', height: '86%'}
          ],
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false
          },
          xAxis: [
            {
              type: 'category',
              data: xDatas,
              axisLine: {
                lineStyle: {
                  color: '#ddd',
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
                formatter: function(value) {
                  let val = value;
                  // 截取202001 为01
                  val = value.substring(4,value.length);

                  var str = "";
                  var num = 6; //每行显示字数
                  var valLength = val.length; //该项x轴字数
                  var rowNum = Math.ceil(valLength / num); // 行数

                  if(rowNum > 1) {
                    for(var i = 0; i < rowNum; i++)
                    {
                      var temp = "";
                      var start = i * num;
                      var end = start + num;

                      temp = val.substring(start, end) + "\n";
                      str += temp;
                    }
                    return str;
                  } else {
                    return val;
                  }
                },
              },
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              name: '个数',
              data:[],
              type: 'value',
              nameTextStyle: {
                color: '#93AECE'
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd',
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#93AECE',
                  fontSize: 18
                },
              },
            },
            {
              data:[],
              type: 'value',
              nameTextStyle: {
                color: '#93AECE'
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ddd',
                }
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgba(255,255,255,.1)'
                }
            },
              axisLabel: {
                textStyle: {
                  color: '#93AECE',
                  fontSize: 18
                },
                formatter: '{value}%'
              },
              max: 100,
              min: 0,
            }
          ],
          series: [
            {
              yAxisIndex: 0,
              type: 'line',
              data: series,
              symbol:'circle',//折线点设置为实心点
              symbolSize :11,  //设定实心点的大小

              showSymbol: true,
              smooth: true,
              lineStyle: {
                color: '#44D7B6'
              },
              areaStyle: {
                color: 'rgba(129, 240, 255, 0.2)'
              },
              silent: true,
            },
            {
              yAxisIndex: 1,
              type: 'line',
              data: [],
              showSymbol: false,
              smooth: true,
              lineStyle: {
                color: '#44D7B6'
              },
              areaStyle: {
                color: 'rgba(129, 240, 255, 0.2)'
              },
              markLine: {
                data: [{
                  name: 'III类及以上断面' + _this.threePercentage +'%',
                  yAxis: _this.threePercentage,
                  symbol: "none",
                  label: {
                    show: true,
                    position: 'insideStartTop',
                    formatter: '{b}',
                    fontSize: '20',
                  },
                  lineStyle: {
                    color: '#F8C900'
                  },

                },
                  // {
                  //   name: 'III类及以上断面'+ 40 + '%',
                  //   yAxis: 40,
                  //   symbol: "none",
                  //   label: {
                  //     show: true,
                  //     position: 'insideStartTop',
                  //     formatter: '{b}',
                  //     fontSize: '20'
                  //   },
                  //   lineStyle: {
                  //     color: '#F8C900'
                  //   }
                  // }
                  ],
                silent: true,
              }
            },

          ]
        };

        var chart = this.$echarts.init(document.getElementById('riverLakeEchart'));
        chart.on('showTip',(params)=>{
          let data = params.dataIndex;
          _this.threePercentage = ( (series[data] / _this.riverLakeData.total) * 100 ).toFixed(0);
          _this.riverEchars.series[1].markLine.data[0].name = 'III类及以上断面' + _this.threePercentage +'%';
           _this.riverEchars.series[1].markLine.data[0].yAxis = _this.threePercentage;
        });

      },
    }

  }
</script>
