<template>
  <div class="waterQuality panelMainBlock" :class="type">
    <div class="titleName">{{ conprehensiveName }}</div>
    <div class="waterQualityPercent alginCenter rowCenter" id="waterechart">
      <!-- <div>
        <div class="level">{{panelParmas.waterLevel}}</div>
        <div class="percent rowCenter">{{panelParmas.num}}<span>{{panelParmas.company}}</span></div>
      </div> -->
    </div>
    <div class="rowSpace waterQualityDetail">
      <div v-for="item in waterQualityDetail" class="rowFlex" :key="item.id">
        <div v-if="item.id != 'ratePercent'" class="rowFlex">
          <div
            v-if="item.isStatus"
            class="waterQualityIcon rowCenter alginCenter"
          >
            <div :class="`${item.id}Icon`"></div>
          </div>
          <div>
            <div class="name">{{ item.name }}</div>
            <div class="num">
              {{ panelParmas[item.id]
              }}<span class="company">{{ item.Company }}</span>
            </div>
            <div class="detailButton rowFlex">
              <div>查看详情</div>
              <div class="detailIcon el-icon-right"></div>
            </div>
          </div>
        </div>
        <div v-else class="rowFlex alginCenter">
          <div
            class="tableIcon"
            :class="panelParmas[item.id] > 0 ? 'shangsheng' : 'xiajiang'"
          ></div>
          <div>
            <div class="num ratePercent">
              {{ panelParmas[item.id]
              }}<span class="company ratePercent">{{ item.Company }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComprehensiveReview',
  props: {
    panelParmas: Object,
    waterQualityDetail: Array,
    conprehensiveName: String,
    type: String
  },
  data () {
    return {}
  },
  methods: {
    getyuanhuanecharts () {
      var myChart = this.$echarts.init(document.getElementById('waterechart'))

      var data = {
        name: '贷款',
        value: [88], // 百分比
        nAmount: 1566557.14 // 总额
      }

      var option = {
        backgroundColor: '#03060F',
        title: {
          text: data.value[0] + '%',
          textStyle: {
            color: '#2A95F9',
            fontSize: 70
          },
          // subtext: data.name + '占比',
          // subtextStyle: {
          //     color: '#aaaaaa',
          //     fontSize: 30
          // },
          itemGap: 20,
          left: 'center',
          top: '47%'
        },
        graphic: [
          {
            type: 'text',
            z: 100,
            left: 'center',
            top: '80%',
            style: {
              fill: '#fff',
              text: data.name + '总额' + data.nAmount + '万',
              // text: [
              //     '横轴表示温度，单位是°C',
              //     '纵轴表示高度，单位是km',
              //     '右上角有一个图片做的水印',
              //     '这个文本块可以放在图中各',
              //     '种位置'
              // ].join('\n'),
              font: '18px Microsoft YaHei'
            }
          }
        ],
        tooltip: {
          formatter: function (params) {
            return (
              '<span style="color: #fff;">占比：' + params.value + '%</span>'
            )
          }
        },
        angleAxis: {
          max: 100,
          clockwise: false, // 逆时针
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
        polar: [
          {
            center: ['50%', '50%'], // 中心点位置
            radius: '100%' // 图形大小
          }
        ],
        series: [
          {
            type: 'bar',
            data: data.value,
            showBackground: true,
            polarIndex: 0,
            backgroundStyle: {
              color: '#022546',
              borderWidth: 10
            },
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 30,
            itemStyle: {
              normal: {
                opacity: 1,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#008BFF'
                  },
                  {
                    offset: 1,
                    color: '#0071FF'
                  }
                ]),
                shadowBlur: 5,
                shadowColor: '#2A95F9'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    gethenxiangzhuzhuangtu () {
      var myChart = this.$echarts.init(document.getElementById('waterechart'))
      var warningCountData = [
        {
          name: '',
          data: [0]
        },
        {
          name: '',
          data: [0]
        },
        {
          name: '',
          data: [0]
        },
        {
          name: '',
          data: [0]
        }
      ]

      var option = {
        backgroundColor: '#fff',
        grid: {
          top: 'middle',
          left: '3%',
          right: '4%',
          bottom: '3%',
          height: 50
        },
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        xAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        yAxis: {
          data: ['sss'],
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        color: [
          '#EF6B6E',
          '#FCAD2C',
          '#3DBB33 ',
          '#5292FD',
          '#7F6AAD',
          '#585247'
        ],
        series: []
      }

      warningCountData.forEach((item, index) => {
        option.series.push({
          type: 'bar',
          name: item.name,
          stack: '2',
          label: {
            normal: {
              show: true,
              position: 'inside', // 在横条内
              // position: [5, 5],
              formatter: `{name|${item.name}}{value|(${item.data})}`,
              align: 'center',
              textStyle: {
                color: '#fff',
                rich: {
                  name: {
                    fontSize: '16',
                    fontWeight: 500,
                    color: 'red',
                    textAlign: 'left'
                  },
                  value: {
                    fontSize: '14',
                    fontWeight: 500,
                    color: 'none',
                    textAlign: 'left'
                  }
                }
              }
            }
          },
          barWidth: 30,
          data: item.data[0] == 0 ? [1] : [0],
          itemStyle: {
            normal: {
              barBorderRadius: [0]
            }
          }
        })
        if (index === 0) {
          option.series[index].itemStyle.normal.barBorderRadius = [5, 0, 0, 5]
        } else if (index === warningCountData.length - 1) {
          option.series[index].itemStyle.normal.barBorderRadius = [0, 5, 5, 0]
        } else {

        }
      })
      myChart.setOption(option)
    },
    getduogebingtuechart () {
      var myChart = this.$echarts.init(document.getElementById('waterechart'))
      var data = [
        {
          name: '装备制造',
          value: 54
        },
        {
          name: '现代材料',
          value: 44
        },
        {
          name: '新能源',
          value: 35
        },
        {
          name: '新一代信息技术',
          value: 30
        },
        {
          name: '商贸物流',
          value: 20
        }
      ]
      var titleArr = [],
        seriesArr = [],
        colors = [
          ['#389af4', '#dfeaff'],
          ['#ff8c37', '#ffdcc3'],
          ['#ffc257', '#ffedcc'],
          ['#fd6f97', '#fed4e0'],
          ['#a181fc', '#e3d9fe']
        ]
      data.forEach(function (item, index) {
        titleArr.push({
          text: item.name,
          left: index * 20 + 10 + '%',
          top: '65%',
          textAlign: 'center',
          textStyle: {
            fontWeight: 'normal',
            fontSize: '16',
            color: colors[index][0],
            textAlign: 'center'
          }
        })
        seriesArr.push({
          name: item.name,
          type: 'pie',
          clockWise: false,
          radius: [60, 70],
          itemStyle: {
            normal: {
              color: colors[index][0],
              shadowColor: colors[index][0],
              shadowBlur: 0,
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          center: [index * 20 + 10 + '%', '50%'],
          data: [
            {
              value: item.value,
              label: {
                normal: {
                  formatter: function (params) {
                    return params.value + '%'
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: 'bold',
                    color: colors[index][0]
                  }
                }
              }
            },
            {
              value: 100 - item.value,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: colors[index][1]
                },
                emphasis: {
                  color: colors[index][1]
                }
              }
            }
          ]
        })
      })

      var option = {
        backgroundColor: '#fff',
        title: titleArr,
        series: seriesArr
      }
      myChart.setOption(option)
    },
    getzhuzhuangtuhezhexiantuecharts () {
      var myChart = this.$echarts.init(document.getElementById('waterechart'))
      let dataList = [
        {
          name: '苹果',
          value: '56'
        },
        {
          name: '橘子',
          value: '75'
        },
        {
          name: '香蕉',
          value: '85'
        },
        {
          name: '火龙果',
          value: '78'
        },
        {
          name: '西瓜',
          value: '76'
        },
        {
          name: '椰子',
          value: '45'
        },
        {
          name: '葡萄',
          value: '100'
        }
      ]

      myChart.setOption({
        backgroundColor: 'rgb(20,28,52)',
        grid: {
          left: '10%', // 距离左边的距离
          right: '13%', // 距离右边的距离
          bottom: '10%', // 距离下边的距离
          top: '8%' // 距离上边的距离
        },
        title: {
          text: '爱吃水果指数',
          left: 26,
          top: 26,
          textStyle: {
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: 50000,
            fontFamily: 'PingFang SC'
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: true
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: false
            },
            saveAsImage: {
              show: true,
              name: '爱吃水果指数统计图',
              pixelRatio: 2
            }
          },
          iconStyle: {
            normal: {
              borderColor: '#41A7DE'
            }
          },
          itemSize: 12,
          top: 20,
          right: 22
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['苹果', '橘子', '香蕉', '火龙果', '西瓜', '椰子', '葡萄'],
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: 14,
                fontFamily: 'Microsoft YaHei'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
                fontSize: 12,
                fontFamily: 'Microsoft YaHei'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#666'
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
                fontSize: 12,
                fontFamily: 'Microsoft YaHei'
              }
            },
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: dataList.length > 15 ? 35 : 100
          }
        ],
        series: [
          {
            name: '爱吃指数',
            type: 'bar',
            data: dataList,
            barGap: '-100%',
            barCategoryGap: '60%',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#499ef4'
                  },
                  {
                    offset: 1,
                    color: '#3eb5dd'
                  }
                ])
              },
              emphasis: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#3eb5dd'
                  },
                  {
                    offset: 1,
                    color: '#499ef4'
                  }
                ])
              }
            }
          },
          {
            symbol: 'none',
            name: '爱吃水果占比',
            type: 'line',
            yAxisIndex: 1,
            data: dataList,
            itemStyle: {
              normal: {
                color: '#ff7f50'
              }
            }
          }
        ]
      })

      // 这里先解绑，防治click事件触发多次
      myChart.off('click')

      // 这里使用getZr(),直接使用click方法点击背景不会触发
      myChart.getZr().on('click', (params) => {
        const pointInPixel = [params.offsetX, params.offsetY]

        if (myChart.containPixel('grid', pointInPixel)) {
          const pointInGrid = Math.abs(
            myChart.convertFromPixel('grid', pointInPixel)[0]
          )
          // 这个就是当前的index下标
          console.log(pointInGrid)
          // 这里就是当前的值
          console.log(dataList[pointInGrid])
        } else {
          console.log('点击的是背景...')
        }
      })
    },
    getqiantaobingtuecharts () {
      var myChart = this.$echarts.init(document.getElementById('waterechart'))
      var option = {
        title: {
          text: '三资风险分布',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 20
          },
          top: '3%',
          left: 'center'
        },
        backgroundColor: 'balck',
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: '12%',
          data: [
            '大户',
            '天桥',
            '槐荫',
            '官庄',
            '历下',
            '历城',
            '市中',
            '高新'
          ],
          textStyle: {
            color: [],
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 10
          }
        },

        series: [
          {
            type: 'pie',
            selectedMode: 'single',

            radius: [4, '70%'],
            center: ['50%', '46.8%'],
            label: {
              normal: {
                position: 'right'
              }
            },
            itemStyle: {
              color: 'blue'
            },

            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 200,
                lineStyle: {
                  color: '#ffffff',
                  width: '2'
                }
              }
            },
            label: {
              fontSize: 14,
              show: true,
              position: 'outside'
            },

            z: 20,
            data: [
              {
                name: '藍色4',
                value: 21
              }
            ]
          },
          {
            type: 'pie',
            selectedMode: 'single',

            radius: [3, '60%'],
            center: ['50%', '52.5%'],
            label: {
              normal: {
                //  position: 'inner'
              }
            },
            itemStyle: {
              color: 'purple'
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            z: 30,
            data: [
              {
                name: '紫色',
                value: 21
              }
            ]
          },
          {
            type: 'pie',
            selectedMode: 'single',

            radius: [2, '48%'],
            center: ['50%', '59%'],
            label: {
              normal: {
                //  position: 'inner'
              }
            },
            itemStyle: {
              color: 'green'
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            z: 40,
            data: [
              {
                name: '綠色4',
                value: 21
              }
            ]
          },
          {
            type: 'pie',
            selectedMode: 'single',

            radius: [1, '36%'],
            center: ['50%', '64.9%'],
            label: {
              normal: {
                //  position: 'inner'
              }
            },
            itemStyle: {
              color: 'pink'
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            z: 50,
            data: [
              {
                name: '粉色',
                value: 21
              }
            ]
          },
          {
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '28%'],
            center: ['50%', '68.8%'],
            label: {
              normal: {}
            },
            itemStyle: {
              color: 'yellow'
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            z: 60,
            data: [
              {
                name: '黃色',
                value: 21
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    gethenxiangduibizhuzhuangtu () {
      var myChart = this.$echarts.init(document.getElementById('waterechart'))

      const categroy = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      var colorList = [
        '#c23531',
        '#2f4554',
        '#61a0a8',
        '#d48265',
        '#91c7ae',
        '#749f83',
        '#ca8622',
        '#bda29a',
        '#6e7074',
        '#546570',
        '#c4ccd3'
      ]

      var data = [2200, 1820, 1910, 2340, 2900, 3300, 3100]
      var categroyData = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      var sortIndex = categroyData.map((x) => categroyData.indexOf(x))

      sortIndex.sort((a, b) => data[a] - data[b])
      data = sortIndex.map((x) => data[x])
      categroyData = sortIndex.map((x) => categroyData[x])
      var option = {
        title: {
          text: '简易动态数据 Demo'
        },
        xAxis: { splitLine: {// 去除网格线
          show: false
        },
        splitArea: {show: false}},
        yAxis: {
          data: categroyData,
          splitLine: {// 去除网格线
            show: false
          },
          splitArea: {show: false}
        },
        series: [
          {
            type: 'bar',
            data: data,
            itemStyle: {
              color: function (params) {
                return colorList[categroy.indexOf(params.name)]
              }
            },
            label: {
              color: 'red',
              show: true,
              position: 'right'
            }
          }
        ]
      }

      setInterval(function () {
        // 这个可以控制他动不动
        data = data.map((x) => x + Math.floor(Math.random() * 30) - 15)

        sortIndex.sort((a, b) => data[a] - data[b])
        data = sortIndex.map((x) => data[x])
        categroyData = sortIndex.map((x) => categroyData[x])
        // 删掉就不动
        myChart.setOption({
          yAxis: {
            data: categroyData
          },
          series: {
            data: data
          }
        })
      }, 40)
      myChart.setOption(option)
    }
  },
  mounted () {
    // this.gethenxiangduibizhuzhuangtu();
  }
}
</script>

<style scoped>
.waterQualityPercent1 {
  width: 586px;
  height: 500px;
}
</style>
