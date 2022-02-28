<template>
  <div class="leftPanel rowFlex flexColumn">
    <h4>区域看版（概况）</h4>
    <!-- 处置利用率 -->
    <div class="management-box">
      <span>处置利用率</span>
      <div class="management flex">
        <div class="img-box">
          <div>
        <video autoplay loop muted>
          <source
            src="../../../assets/img/waterIcon/bgVideo.mp4"
            type="video/mp4"
          />
        </video>
          </div>
          <div class="text_portaion"><span>{{ utilizationratelist.disposeTakeRatio }}</span></div>
        </div>
       <div>
         <div class="flex management-list">
           <div class="management-itme">
             <img
               src="../../../assets/img/waterIcon/Waste-production.png"
               alt=""
             />
             <span>产废单位</span>
             <div class="management-item-text">
               {{ utilizationratelist.prodWasteNum }}
             </div>
           </div>
           <div class="management-itme">
             <img src="../../../assets/img/waterIcon/collect.png" alt="" />
             <span>收集单位</span>
             <div class="management-item-text">
               {{ utilizationratelist.gatherNum }}
             </div>
           </div>
           <div class="management-itme">
             <img src="../../../assets/img/waterIcon/utilize.png" alt="" />
             <span>处置单位</span>
             <div class="management-item-text">
               {{ utilizationratelist.disposeTakeNum }}
             </div>
           </div>
         </div>
         <div class="hr"></div>
         <div class="flex management-list">
           <div class="management-itme">
             <span>年产废量</span>/t
             <div class="management-item-text">
               {{ parseInt(utilizationratelist.prodWaste) }}
             </div>
           </div>
           <div class="management-itme">
             <span>综合利用量</span>/t
             <div class="management-item-text">
               {{ parseInt(utilizationratelist.take) }}
             </div>
           </div>
           <div class="management-itme">
             <span>处置量</span>/t
             <div class="management-item-text">
               {{ parseInt(utilizationratelist.dispose) }}
             </div>
           </div>
         </div>
      </div>
      </div>
     <div class="flex">
       <div class="item flex">
         <span> 环比</span>
         <img
           v-if="utilizationratelist.prodWasteIde == 0"
           src="../../../assets/img/waterIcon/increase.png"
           alt=""
         />
         <img
           v-if="utilizationratelist.prodWasteIde == 1"
           src="../../../assets/img/waterIcon/decline.png"
           alt=""
         />
         <div
           class="chanliangcomparisonproportion"
           :class="[
             utilizationratelist.prodWasteIde == 1
               ? 'activeClass'
               : 'errorClass',
           ]"
         >
           {{ utilizationratelist.prodWasteRatio || 0 }}
         </div>
       </div>
       <div class="item flex">
         <span> 环比</span>
         <img
           v-if="utilizationratelist.takeIde == 0"
           src="../../../assets/img/waterIcon/increase.png"
           alt=""
         />
         <img
           v-if="utilizationratelist.takeIde == 1"
           src="../../../assets/img/waterIcon/decline.png"
           alt=""
         />
         <div
           class="chanliangcomparisonproportion"
           :class="[
             utilizationratelist.takeIde == 1
               ? 'activeClass'
               : 'errorClass',
           ]"
         >
           {{ utilizationratelist.takeRatio || 0 }}
         </div>
       </div>
       <div class="item flex">
         <span> 环比</span>
         <img
           v-if="utilizationratelist.disposeIde == 0"
           src="../../../assets/img/waterIcon/increase.png"
           alt=""
         />
         <img
           v-if="utilizationratelist.disposeIde == 1"
           src="../../../assets/img/waterIcon/decline.png"
           alt=""
         />
         <div
           class="chanliangcomparisonproportion"
           :class="[
             utilizationratelist.disposeIde == 1
               ? 'activeClass'
               : 'errorClass',
           ]"
         >
           {{ utilizationratelist.disposeRatio || 0 }}
         </div>
       </div>
     </div>
    </div>
    <!-- 产废排行 -->
    <div class="waste-production">
      <div class="title-box flex">
        产废排行
        <div class="flex">
          <el-select size="mini" v-model="wasteType" placeholder="请选择">
            <el-option
              v-for="item in wasteOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="category" v-if="wasteType == 2">
            <el-select
              size="mini"
              v-model="categoryType"
              placeholder="请选择"
              @change="changewaste()"
            >
              <el-option
                v-for="item in categoryOpting"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="maintopleftecxal">
        <table
          width="100%"
          v-if="wasteType === 1"
          border="0"
          class="maintopleftecxalbox"
        >
          <tr class="maintoplefteexeclheader">
            <td style="padding-left: 10px">排名</td>
            <td style="padding-left: 20px">区域</td>
            <td style="padding-left: 15px">产废总量（吨）</td>
            <td style="text-align: right">危废占比</td>
          </tr>
          <tr
            class="maintoplefteexeclbody"
            v-for="(item, index) in this.wasterank"
            :key="index"
          >
            <td style="width: 67px">
              <div
                class="maintoplefteexeclpaiming2"
                v-if="index + 1 == 1 || index + 1 == 2"
              >
                <span v-if="index + 1 < 10">0</span>{{ index + 1 }}
              </div>
              <div class="maintoplefteexeclpaiming" v-else>
                <span v-if="index + 1 < 10">0</span>{{ index + 1 }}
              </div>
            </td>
            <td style="width: 88px; text-align: center; opacity: 0.8; ">
              {{ item.regionName || "- -" }}
            </td>
            <td style="text-align: center">{{ item.total || 0 }}</td>
            <td>
              <ul class="weifeizhanbi clearfix">
                <li
                  class="weifeizhanbilanse"
                  :style="{
                    width: (+item1.numSum / item.total) * 332 + 'px',
                  }"
                  v-for="(item1, index) in item.typeSum"
                  :key="index"
                  :class="item.bgcolor + index"
                ></li>
              </ul>
            </td>
          </tr>
        </table>
        <table width="100%" v-else border="0" class="maintoprightecxalbox">
          <tr class="maintoprighteexeclheader">
            <td style="width: 90px; padding-left: 10px">类型</td>
            <td style="padding-left: 10px">占比</td>
            <td style="width: 101px">数量(吨)</td>
          </tr>
          <tr
            class="maintoprighteexeclbody"
            v-for="(item, index) in this.proportionwaste"
            :key="index"
          >
            <td style="width: 90px; padding-left: 5px">
              {{ item.hours }}
            </td>
            <td class="zhanbitu">
                <div  style="font-size:14px;width:100%;height:10px;margin-left:85px;margin-bottom:15px;transform: scale(0.7)"> {{ item.dicTypeExplain }}({{+item.value}}%)</div>
              <div
                class="zhanbi"
                id="zhanbiechart"
                :class="item.bgcolor + index"
              >
                <div
                  class="zhanbilu"
                  :class="item.zhanbicolor + index"
                  ref="zhanbilu"
                  :style="{
                    width: (+item.value / 100) * 320 + 'px',
                  }"
                ></div>
              </div>
            </td>
            <td style="text-align: center">
              {{ item.cumulativeTotal || 0 }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 产废企业类型 -->
    <div class="enterprise">
      <div class="title">产废企业类型</div>
      <div class="productionenterprisesechart flex">
        <div class="productionentopechart" id="productionpechart"></div>
        <div class="productionenbottomechart" id="productionbottomechart"></div>
      </div>
      <div class="productionentervideo">
        <div class="videoiconbox clearfix">
          <div class="videoicon">
            <img src="../../../assets/img/waterIcon/video.png" alt="" />
          </div>
          <span class="videospan">视频接入</span>
        </div>
        <div class="videotextbox">
          <span
            class="videotextboxnum"
            :class="[1 > 0 ? 'videonum' : 'videodownnum']"
            >{{ videonum.entCount }}</span
          >
          <span class="videotextboxnum1"
            >{{ videonum.accessEntProportion }}%</span
          >
        </div>
      </div>
    </div>
    <!-- 产废量/转运量统计 -->
    <div class="Statistics">
      <div class="title-box flex">
        产废量/转运量统计
        <div class="flex">
          <el-select size="mini" v-model="StatisticsType" @change="StatisticSelect" placeholder="请选择">
            <el-option
              v-for="item in StatisticsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select size="mini" v-model="timeType" placeholder="请选择" @change="StatisticsType == 1? changechuzhinum() : changezhhuanyiliang()">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="statisticsechartbox" id="statechartbox" v-show="StatisticsType == 1"></div>
      <div class="statisticsechartbox" id="transshipmentechartbox" v-show="StatisticsType == 2" ></div>
    </div>
  </div>
</template>

<script>
import {
  getDisposalutilizationrate,
  getwasteswitch,
  getwasteranking,
  getproctionleixing,
  getwastetransfer,
  getwastechuzhi
} from '@/common/api/leftPanel'
export default {
  name: 'SmallMap',
  props: {
    type: String
  },
  data () {
    return {
      // 产废排行选择
      wasteType: 1,
      wasteOptions: [
        {
          value: 1,
          label: '产废排行'
        },
        {
          value: 2,
          label: '类型占比排行'
        }
      ],
      categoryType: 2,
      categoryOpting: [
        {
          value: 2,
          label: '产废'
        },
        {
          value: 3,
          label: '处置'
        }
      ],
      //   统计
      StatisticsType: 1,
      StatisticsOptions: [
        { value: 1, label: '产废量' },
        { value: 2, label: '转运量' }
      ],
      timeType: 1,
      timeOptions: [
        { value: 1, label: '年' },
        { value: 2, label: '月' },
        { value: 3, label: '周' }
      ],
      videonum: {
        entCount: 0,
        accessEntProportion: 0
      },
      flag1: true,
      flag2: true,
      czdata: [],
      czname: [],
      zhuanyiliangdata: [],
      zhuanyiliangname: [],
      bingtutop: [],
      bingtubottom: [],
      wasterank: [],
      proportionwaste: [],
      utilizationratelist: {
        prodWaste: '0',
        take: '0',
        dispose: '0',
        prodWasteRatio: '0',
        prodWasteIde: '0',
        takeRatio: '0',
        takeIde: null,
        disposeRatio: '0',
        disposeIde: null,
        disposeTakeRatio: '0',
        prodWasteNum: '0',
        gatherNum: '0',
        disposeTakeNum: '0'
      },
      changezhuanyi: '1',
      changechuzhi: '1',
      waste2: '年',
      waste: '2',
      isShow3: true,
      regionCode: this.AppConfig.appInfo.regionCode
    }
  },
  methods: {
    // 获取产废量/转运量统计的柱状图
    getyuanhuanecharts (value, num) {
      let myChart = this.$echarts.init(
        document.getElementById('statechartbox')
      )
      var option = {
        xAxis: [
          {
            type: 'category',
            data: value, // 数据值
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
                // 这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
              // 这里是为了突出显示加上的
            }
          }
        },
        grid: {
          x: 65,
          y: 30,
          x2: 5,
          y2: 20,
          borderWidth: 1
        },
        series: [
          {
            data: num,
            type: 'bar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#188df0' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '  #83bff6' }
                ])
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    getzhuanyunliangecharts (value, num) {
      if (this.StatisticsType == 1) { return }
      let myChart = this.$echarts.init(
        document.getElementById('transshipmentechartbox')
      )
      var option = {
        xAxis: [
          {
            type: 'category',
            data: value,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
                // 这里是为了突出显示加上的
              }
            }
          }
        ],
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#FFFFFF'
              // 这里是为了突出显示加上的
            }
          }
        },
        grid: {
          x: 65,
          y: 30,
          x2: 5,
          y2: 20,
          borderWidth: 1
        },
        series: [
          {
            data: num,
            type: 'bar',
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#188df0' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '  #83bff6' }
                ])
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    getshaungqubingtushang (value, name) {
      function formatter (v) {
        let text = v
        if (text.length >= 5 && text.length <= 10) {
          return (text = `${text.slice(0, 5)}\n${text.slice(5)}`)
        } else if (text.length >= 10 && text.length <= 16) {
          return (text = `${text.slice(0, 7)}\n${text.slice(7)}`)
        } else {
          return text
        }
      }
      let myChart = this.$echarts.init(
        document.getElementById('productionpechart')
      )
      var data = [
        { name: '高级风险', value: 76 },
        { name: '中级风险', value: 66 },
        { name: '低级风险', value: 196 }
      ]
      var dataHigh = value[0].value
      var dataMiddle = value[1].value
      var dataLow = value[2].value
      var total = 0
      for (var i = 0; i < data.length; i++) {
        total += data[i].value
      }

      var perHigh = value[0].value
      var perMiddle = value[1].value
      var perLow = value[2].value

      var option = {
        title: [
          {
            text: '',
            top: 30,
            left: 1,
            textStyle: {
              color: '#35598d',
              fontSize: 12,
              fontWeight: 'normal'
            }
          },
          {
            text: formatter(value[0].name),
            bottom: '2%',
            left: '12%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4d71df',
                  fontSize: 12
                }
              }
            }
          },
          {
            text: formatter(value[1].name),
            bottom: '2%',
            left: '50%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 'normal',
              rich: {
                num: {
                  color: '#32c78d',
                  fontSize: 12
                }
              }
            }
          },
          {
            text: formatter(value[2].name),
            bottom: '2%',
            left: '84%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4cb9cd',
                  fontSize: 12
                }
              }
            }
          }
        ],
        graphic: [
          {
            type: 'text',
            top: '35%',
            left: '8%',
            style: {
              text: perHigh,
              font: '16px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '35%',
            left: '44%',
            style: {
              text: perMiddle,
              font: '16px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '35%',
            left: '78%',
            style: {
              text: perLow,
              font: '16px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          }
        ],
        tooltip: {
          show: false
        },
        series: [
          {
            name: '高级风险',
            type: 'pie',
            center: ['15%', '40%'],
            radius: ['50%', '56%'],
            startAngle: 180, // 起始角度
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            emphasis: false,
            data: [
              {
                value: dataHigh,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'rgba(34, 82, 240, 1)'
                  }
                }
              },
              {
                name: '',
                itemStyle: {
                  emphasis: {
                    color: '#e6e9f0'
                  },
                  normal: {
                    color: 'rgba(92, 98, 120, 1)'
                  }
                },
                value: total
              }
            ]
          },
          {
            name: '中级风险',
            type: 'pie',
            center: ['50%', '40%'],
            radius: ['50%', '56%'],
            startAngle: 180, // 起始角度
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            data: [
              {
                value: dataMiddle,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'rgba(237, 125, 49, 1)'
                  }
                }
              },
              {
                name: '',
                itemStyle: {
                  emphasis: {
                    color: '#e6e9f0'
                  },
                  normal: {
                    color: 'rgba(92, 98, 120, 1)'
                  }
                },
                value: total
              }
            ]
          },
          {
            name: '低级风险',
            type: 'pie',
            center: ['85%', '40%'],
            radius: ['50%', '56%'],
            startAngle: 180, // 起始角度
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            data: [
              {
                value: dataLow,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'rgba(34, 240, 225, 1)'
                  }
                }
              },
              {
                name: '',
                itemStyle: {
                  emphasis: {
                    color: '#e6e9f0'
                  },
                  normal: {
                    color: 'rgba(92, 98, 120, 1)'
                  }
                },
                value: total
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    getshuangqubingtuxia (value) {
      function formatter (v) {
        let text = v
        if (text.length >= 5 && text.length <= 10) {
          return (text = `${text.slice(0, 5)}\n${text.slice(5)}`)
        } else if (text.length >= 10 && text.length <= 16) {
          return (text = `${text.slice(0, 8)}\n${text.slice(8)}`)
        } else {
          return text
        }
      }
      let myChart = this.$echarts.init(
        document.getElementById('productionbottomechart')
      )
      var data = [
        { name: '高级风险', value: 76 },
        { name: '中级风险', value: 66 },
        { name: '低级风险', value: 196 }
      ]
      var dataHigh = value[0].value
      var dataMiddle = value[1].value
      var dataLow = value[2].value
      var total = 0
      for (var i = 0; i < data.length; i++) {
        total += data[i].value
      }

      var perHigh = value[0].value
      var perMiddle = value[1].value
      var perLow = value[2].value

      var option = {
        title: [
          {
            text: '',
            top: 30,
            left: 30,
            textStyle: {
              color: '#35598d',
              fontSize: 18,
              fontWeight: 'normal'
            }
          },
          {
            // text: "高级风险" + "{num|" + dataHigh + "}条",
            text: formatter(value[0].name),
            bottom: '2%',
            left: '15%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4d71df',
                  fontSize: 12
                }
              }
            }
          },
          {
            text: formatter(value[1].name),
            bottom: '2%',
            left: '52%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 'normal',
              rich: {
                num: {
                  color: '#32c78d',
                  fontSize: 12
                }
              }
            }
          },
          {
            text: formatter(value[2].name),
            bottom: '2%',
            left: '84%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 12,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4cb9cd',
                  fontSize: 12
                }
              }
            }
          }
        ],
        graphic: [
          {
            type: 'text',
            top: '35%',
            left: '14%',
            style: {
              text: perHigh,
              font: '16px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '35%',
            left: '47%',
            style: {
              text: perMiddle,
              font: '16px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '35%',
            left: '78%',
            style: {
              text: perLow,
              font: '16px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          }
        ],
        tooltip: {
          show: false
        },
        series: [
          {
            name: '高级风险',
            type: 'pie',
            center: ['18%', '40%'],
            radius: ['50%', '56%'],
            startAngle: 180, // 起始角度
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            emphasis: false,
            data: [
              {
                value: dataHigh,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 214, 86, 1)'
                  }
                }
              },
              {
                name: '',
                itemStyle: {
                  emphasis: {
                    color: '#e6e9f0'
                  },
                  normal: {
                    color: 'rgba(92, 98, 120, 1)'
                  }
                },
                value: total
              }
            ]
          },
          {
            name: '中级风险',
            type: 'pie',
            center: ['52%', '40%'],
            radius: ['50%', '56%'],
            startAngle: 180, // 起始角度
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            data: [
              {
                value: dataMiddle,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'rgba(15, 104, 210, 1)'
                  }
                }
              },
              {
                name: '',
                itemStyle: {
                  emphasis: {
                    color: '#e6e9f0'
                  },
                  normal: {
                    color: 'rgba(92, 98, 120, 1)'
                  }
                },
                value: total
              }
            ]
          },
          {
            name: '低级风险',
            type: 'pie',
            center: ['85%', '40%'],
            radius: ['50%', '56%'],
            startAngle: 180, // 起始角度
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            hoverAnimation: false,
            data: [
              {
                value: dataLow,
                name: '',
                itemStyle: {
                  normal: {
                    color: 'rgba(255, 255, 255, 1)'
                  }
                }
              },
              {
                name: '',
                itemStyle: {
                  emphasis: {
                    color: 'rgba(92, 98, 120, 1)'
                  },
                  normal: {
                    color: 'rgba(92, 98, 120, 1)'
                  }
                },
                value: total
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    gethenxiangxizhuzhuangtu () {
      let myChart = this.$echarts.init(document.getElementById('zhanbiechart'))

      var option = {
        yAxis: {
          type: 'category',
          axisLine: {
            show: false // 坐标线
          },
          axisTick: {
            show: false // 小横线
          },
          axisLabel: {
            show: false,
            color: '#999' // 坐标轴字颜色
          }
        },
        xAxis: {
          show: false,

          axisTick: {
            show: false // 小横线
          },
          splitLine: {
            show: false
          }
        },

        // animationDuration: 9000,
        series: [
          {
            zlevel: 1,
            type: 'bar',
            barWidth: '10px',
            barGap: '-100%',

            label: {
              show: false,
              position: 'right' // 每一条的数据位置
            },
            itemStyle: {
              normal: {
                color: '#2d82ff', // 每个数据的颜色
                barBorderRadius: [30, 30, 30, 30] // 圆角大小
              }
            },
            data: [
              {
                value: 120
              }
            ]
          },
          {
            type: 'bar',
            barWidth: '10px',
            showBackground: true,

            label: {
              show: false,
              position: 'right' // 每一条的数据位置
            },
            itemStyle: {
              normal: {
                color: '#30E4FF', // 每个数据的颜色
                barBorderRadius: [30, 30, 30, 30] // 圆角大小
              }
            },
            data: [
              {
                value: 400
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    getDisposalutilizationrateinfo () {
      getDisposalutilizationrate(2021, this.regionCode).then((res) => {
        if (res.data) {
          this.utilizationratelist = res.data
        }
      })
    },
    changewaste () {
      getwasteswitch(this.categoryType, this.regionCode).then((res) => {
        if (res.code == 0 && res.data) {
          if (res.data.length > 0) {
            let harzardousTypeList = sessionStorage.getItem('harzardousTypeList')
            let harzardousList = JSON.parse(harzardousTypeList)
            res.data.forEach((item) => {
              harzardousList.forEach(ele => {
                if (item.hours == ele.typeName) {
                  let filterItem = ele.dicTypeExplain.split('（H')

                  if (filterItem[0].length > 8) {
                    item.dicTypeExplain = filterItem[0].slice(0, 8)
                  } else {
                    item.dicTypeExplain = filterItem[0]
                  }
                }
              })
            })

            let newArr = []
            res.data.map((item, index) => {
              newArr.push(
                Object.assign({}, item, {
                  bgcolor: 'bgcolor',
                  zhanbicolor: 'zhanbicolor'
                })
              )
            })

            this.proportionwaste = newArr
          }
        }
      })
    },
    getquyupaihang () {
      getwasteranking(this.regionCode).then((res) => {
        if (res.code === 0 && res.data) {
          if (res.data.length > 0) {
            let newArr = []
            res.data.map((item, index) => {
              newArr.push(
                Object.assign({}, item, {
                  bgcolor: 'newbgcolor'
                })
              )
            })
            this.wasterank = newArr
          }
        }
      })
    },
    getchanyeleixing () {
      getproctionleixing(this.regionCode).then((res) => {
        if (res.data) {
          this.videonum = res.data
        }
        var topdata = res.data.pieDPVos.slice(0, 3)
        var bottomdata = res.data.pieDPVos.slice(3, 7)
        this.bingtutop = topdata
        this.bingtubottom = bottomdata
        this.getshaungqubingtushang(this.bingtutop)
        this.getshuangqubingtuxia(this.bingtubottom)
      })
    },
    changezhhuanyiliang () {
      var date = new Date()
      date = date.getFullYear()
      getwastetransfer(date, this.regionCode, this.timeType).then((res) => {
        var data = res.data
        this.zhuanyiliangdata = []
        this.zhuanyiliangname = []
        for (let i = 0; i < data.length; i++) {
          this.zhuanyiliangdata.push(data[i].dataNum)
          this.zhuanyiliangname.push(data[i].number)
        }
        if (this.zhuanyiliangname.length == 0) {
          this.flag2 = false
          return
        }
        this.getzhuanyunliangecharts(
          this.zhuanyiliangdata,
          this.zhuanyiliangname
        )
      })
    },
    changechuzhinum () {
      var date = new Date()
      date = date.getFullYear()

      getwastechuzhi(date, this.regionCode, this.timeType).then((res) => {
        // this.zhuanyiliangdata
        var data = res.data
        this.czdata = []
        this.czname = []
        for (let i = 0; i < data.length; i++) {
          this.czdata.push(data[i].dataNum)
          this.czname.push(data[i].number)
        }
        if (this.czname.length == 0) {
          this.flag1 = false
          return
        }
        this.getyuanhuanecharts(this.czdata, this.czname)
      })
    },
    // 产废统计转运统计切换
    StatisticSelect (value) {
      value === 1 ? this.changechuzhinum() : this.changezhhuanyiliang()
    }
  },
  mounted () {
    // // 显示 上方因子值
    // this.getyuanhuanecharts();
    // this.getzhuanyunliangecharts();
    // this.getshaungqubingtushang();
    // this.getshuangqubingtuxia();

    // this.gethenxiangxizhuzhuangtu()
    this.getDisposalutilizationrateinfo()

    this.changewaste()

    this.changechuzhinum()
    // 左侧产废排行
    this.getquyupaihang()
    // 左侧视频接入
    this.getchanyeleixing()

    this.changezhhuanyiliang()
  },
  watch: {}
}
</script>

<style scoped>
@import "../../../assets/css/leftPanel.css";
/* 公共类名  */
.flex {
  display: flex;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.hr {
  margin-top: 0px;
  margin-bottom: 15px;
  width: 313px;
  opacity: 0.2;
  border: 1px solid #ffffff;
}
h4 {
  width: 469px;
  height: 39px;
  color: #fff;
  line-height: 39px;
  font-size: 20px;
  background: linear-gradient(270deg, rgba(34, 82, 240, 0) 0%, rgba(34,82,240,0.7) 100%);
}
.management-box {
  margin-top: 20px;
}
.management-box .img-box {
  height: 160px;
  width: 162px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../../assets/img/waterIcon/Utilization-rate.png")
    no-repeat center;
}
.text_portaion{
     position: absolute;
  z-index: 10000;
   text-align: center;
}
/* .management-box .img-box div{
  position: absolute;
  left: 73px;
} */
.management-box .img-box span {
  font-size: 30px;
}
.management-itme {
  width: 104px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}
.management-itme img {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.management-box .management-itme span {
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
}
.management-item-text {
  /*margin-left: 20px;*/
  height: 41px;
  color: #fff;
  opacity: 1;
  line-height: 41px;
  font-size: 20px;
}
.item {
  width: 144px;
  height: 31px;
  background: rgba(99, 102, 118, 0.3);
  border-radius: 3px;
  font-size: 13px;
  margin: 0 10px;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.waste-production {
  margin-top: 32px;
}
.title-box {
  justify-content: space-between;
}

.enterprise .title {
  width: 108px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 25px;
  margin-top: 37px;
}
.videoicon img {
  opacity: 0.7;
  width: 18px;
  height: 18px;
}
.Statistics {
  margin-top: 20px;
}
.title-box >>> .el-select {
  width: 120px;
  margin-left: 5px;
}
.title-box >>> .el-input__inner {
  height: 22px;
  line-height: 22px;
}
.title-box >>> .el-input__inner {
  font-size: 12px;
  border: 1px solid rgba(122, 122, 122, 0.3);
  background-color: rgba(122, 122, 122, 0.3);
  color: #fff;
}
.title-box >>> .el-input__icon {
  line-height: 22px;
}
.category >>> .el-select {
  width: 75px;
}
</style>
