<template>
  <div class="leftPanel rowFlex flexColumn">
    <div class="mainBottom flexColumn rowSpace">
      <div class="mainbottombanxin">
        <h4 class="mainBottomText">区域看版（概况）</h4>
        <div class="mainminbox clearfix">
          <div class="mainleftbox">
            <video autoplay loop muted>
              <source
                src="../../../../src/assets/img/video/bigvideo.mp4"
                type="video/mp4"
              />
            </video>
            <span class="mainleftboxtext">处置利用率</span>
            <div class="mainleftboxechart">
              {{ this.utilizationratelist.disposeTakeRatio || '0%'}}
            </div>
            <ul class="mainleftboxdanwei clearfix">
              <li>
                <div class="danweilist">
                  <div class="danweilisticon">
                    <img
                      src="../../../../src/assets/img/newimg/Wasteproductionunit.png"
                      alt=""
                    />
                  </div>
                  <span class="danweiname">产废单位</span>
                </div>
                <div class="danweinum">
                  {{ this.utilizationratelist.prodWasteNum || 0}}
                </div>
              </li>
              <li>
                <div class="danweilist">
                  <div class="danweilisticon">
                    <img
                      src="../../../../src/assets/img/newimg/Collectionunit.png"
                      alt=""
                    />
                  </div>
                  <span class="danweiname">收集单位</span>
                </div>
                <div class="danweinum">
                  {{ this.utilizationratelist.gatherNum || 0}}
                </div>
              </li>
              <li>
                <div class="danweilist">
                  <div class="danweilisticon">
                    <img
                      src="../../../../src/assets/img/newimg/Disposal.png"
                      alt=""
                    />
                  </div>
                  <span class="danweiname">处置单位</span>
                </div>
                <div class="danweinum">
                  {{ this.utilizationratelist.disposeTakeNum || 0}}
                </div>
              </li>
            </ul>
            <ul class="mainleftboxyield clearfix">
              <li>
                <div style="margin-top: 80px">
                  <span class="chanliangname">年产废量(吨)</span>
                </div>
                <div class="chanliangnum" style="margin-top: 25px">
                  {{ this.utilizationratelist.prodWaste || 0}}
                </div>
                <div class="chanliangcomparison">
                  <div class="chanliangcomparisontext">环比</div>
                  <div class="chanliangcomparisonnum newchanliangcomparisonnum">

                    <div class="chanliangcomparisontexticon" v-if="  this.utilizationratelist.prodWasteIde == 0">
                      <img
                        src="../../../../src/assets/img/newimg/up.png"
                        alt=""
                        style="width: 14px; height: 15px"
                      />
                    </div>
                     <div class="chanliangcomparisontexticon" v-if="  this.utilizationratelist.prodWasteIde == 1">
                      <img
                        src="../../../../src/assets/img/newimg/down.png"
                        alt=""
                        style="width: 14px; height: 15px"
                      />
                    </div>

                    <div
                      class="chanliangcomparisonproportion"
                      :class="[
                        this.utilizationratelist.prodWasteIde == 1
                          ? 'activeClass'
                          : 'errorClass',
                      ]"
                    >
                      {{ this.utilizationratelist.prodWasteRatio || 0 }}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div style="margin-top: 80px">
                  <span class="chanliangname">综合利用量(吨)</span>
                </div>
                <div class="chanliangnum" style="margin-top: 25px">
                  {{ this.utilizationratelist.take || 0 }}
                </div>
                <div class="chanliangcomparison">
                  <div class="chanliangcomparisontext">环比</div>
                  <div class="chanliangcomparisonnum newchanliangcomparisonnum">
                    <div class="chanliangcomparisontexticon" v-if=" this.utilizationratelist.takeIde == 1">
                      <img
                        src="../../../../src/assets/img/newimg/down.png"
                        alt=""
                        style="width: 14px; height: 15px"
                      />
                    </div>
                    <div class="chanliangcomparisontexticon" v-if=" this.utilizationratelist.takeIde == 0">
                      <img
                        src="../../../../src/assets/img/newimg/up.png"
                        alt=""
                        style="width: 14px; height: 15px"
                      />
                    </div>
                    <div
                      class="chanliangcomparisonproportion"
                      :class="[
                        this.utilizationratelist.takeIde == 1
                          ? 'activeClass'
                          : 'errorClass',
                      ]"
                    >
                      {{ this.utilizationratelist.takeRatio ||0}}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div style="margin-top: 80px;text-align:center;">
                  <span class="chanliangname">处置量(吨)</span>
                </div>
                <div class="chanliangnum" style="margin-top: 25px">
                  {{ this.utilizationratelist.dispose||0 }}
                </div>
                <div class="chanliangcomparison">
                  <div class="chanliangcomparisontext">环比</div>
                  <div class="chanliangcomparisonnum newchanliangcomparisonnum" >
                    <div class="chanliangcomparisontexticon" v-if="  this.utilizationratelist.disposeIde == 0">
                      <img
                        src="../../../../src/assets/img/newimg/up.png"
                        alt=""
                        style="width: 14px; height: 15px"
                      />
                    </div>
                    <div class="chanliangcomparisontexticon"  v-if="  this.utilizationratelist.disposeIde == 1">
                      <img
                        src="../../../../src/assets/img/newimg/down.png"
                        alt=""
                        style="width: 14px; height: 15px"
                      />
                    </div>
                    <div
                      class="chanliangcomparisonproportion"
                      :class="[
                        this.utilizationratelist.disposeIde=='1'
                          ? 'activeClass'
                          : 'errorClass',
                      ]"
                    >
                      {{ this.utilizationratelist.disposeRatio ||0}}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div class="mainrightbox">
            <div class="mainrighttopbox clearfix">
              <div class="maintopleftbox">
                <div class="maintopleftboxbanxin">
                  <p class="maintopleftboxtext">产废排行</p>
                  <div class="maintopleftecxal">
                    <table width="100%" border="0" class="maintopleftecxalbox">
                      <tr class="maintoplefteexeclheader">
                        <td style="padding-left: 9px">排名</td>
                        <td style="text-align: center">区域</td>
                        <td style="padding-left: 2px">产废总量（吨）</td>
                        <td style="text-align: right; padding-right: 10px">
                          危废占比
                        </td>
                      </tr>
                      <tr
                        class="maintoplefteexeclbody"
                        v-for="(item, index) in this.wasterank"
                        :key="index"
                      >
                        <td style="width: 80px">
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
                        <td style="width: 100px; text-align: center">
                          {{ item.regionName || '- -'}}
                        </td>
                        <td style="text-align: center">{{ item.total || 0}}</td>
                        <td>
                          <ul class="weifeizhanbi clearfix">
                            <li
                              class="weifeizhanbilanse"
                              :style="{
                                width:
                                  (+item1.numSum / item.total) * 332 + 'px',
                              }"
                              v-for="(item1, index) in item.typeSum"
                              :key="index"
                              :class="item.bgcolor + index"
                            ></li>
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="maintoprightbox">
                <div class="maintoprightbanxin">
                  <div class="maintopheader clearfix">
                    <div class="rankingofwastetypes">产废类型占比排行</div>
                    <div class="rankingofwasteswitch">
                      <div>
                        <el-radio-group v-model="waste" @change="changewaste()">
                          <el-radio-button label="2">产废</el-radio-button>
                          <el-radio-button label="3">处置</el-radio-button>
                        </el-radio-group>
                      </div>
                    </div>
                  </div>
                  <div class="maintoprightexecl">
                    <table width="100%" border="0" class="maintoprightecxalbox">
                      <tr class="maintoprighteexeclheader">
                        <td style="width: 90px; padding-left: 10px">类型</td>
                        <td>占比</td>
                        <td>数量（吨）</td>
                      </tr>
                      <tr
                        class="maintoprighteexeclbody"
                        v-for="(item, index) in this.proportionwaste"
                        :key="index"
                      >
                        <td style="width: 90px; padding-left: 5px">
                          {{ item.hours }}

                          <!-- <div class="maintoprighteexeclpaiming" v-else>
                            <span v-if="index + 1 < 10">0</span>{{ index + 1 }}
                          </div> -->
                        </td>
                        <td class="zhanbitu">
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
                                width: (+item.value / 100) * 400 + 'px',
                              }"
                            ></div>
                          </div>
                        </td>
                        <td style="text-align:center;">
                          {{ item.cumulativeTotal || 0 }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="mainrightbottombox clearfix">
              <div class="mainbottomleftbox">
                <div class="productionenterprises">企业产废类型</div>
                <div class="productionenterprisesechart">
                  <div
                    class="productionentopechart"
                    id="productionpechart"
                  ></div>
                  <div
                    class="productionenbottomechart"
                    id="productionbottomechart"
                  ></div>
                </div>
                <div class="productionentervideo">
                  <div class="videoiconbox clearfix">
                    <div class="videoicon">
                      <img
                        src="../../../../src/assets/img/newimg/video.png"
                        alt=""
                      />
                    </div>
                    <span class="videospan">视频接入</span>
                  </div>
                  <div class="videotextbox">
                    <span
                      class="videotextboxnum"
                      :class="[1 > 0 ? 'videonum' : 'videodownnum']"
                      >{{this.videonum.entCount}}</span
                    >
                    <span class="videotextboxnum1">{{this.videonum.accessEntProportion}}%</span>
                  </div>
                </div>
              </div>
              <div class="mainbottomrightbox">
                <div class="statistics">
                  <div class="statisticsbanxin">
                    <div class="statisticsheader">
                      <div class="statisticstitle">产废量统计</div>
                      <div class="statisticsswitch">
                        <div>
                          <el-radio-group
                            v-model="changechuzhi"
                            @change="changechuzhinum()"
                          >
                            <el-radio-button label="1">年</el-radio-button>
                            <el-radio-button label="2">月</el-radio-button>
                            <el-radio-button label="3">周</el-radio-button>
                          </el-radio-group>
                        </div>
                      </div>
                    </div>
                    <div class="statisticsechartbox" id="statechartbox" v-if="flag1"></div>
                    <!-- <empty-data v-else></empty-data> -->
                  </div>
                  <div class="transshipment">
                    <div class="transshipmentbanxin">
                      <div class="transshipmentheader">
                        <div class="transshipmenttitle">转运量统计</div>
                        <div class="transshipmentswitch">
                          <div>
                            <el-radio-group
                              v-model="changezhuanyi"
                              @change="changezhhuanyiliang()"
                            >
                              <el-radio-button label="1">年</el-radio-button>
                              <el-radio-button label="2">月</el-radio-button>
                              <el-radio-button label="3">周</el-radio-button>
                            </el-radio-group>
                          </div>
                        </div>
                      </div>
                      <div
                        class="statisticsechartbox"
                        id="transshipmentechartbox"
                        v-if="flag2"
                      ></div>
                      <empty-data v-else></empty-data>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from '../../Common/TableCommon'
import LogoMain from '@/components/Common/LogoMain.vue'
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import shandongGeoJson from '@/assets/shandong.json'
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
  components: {
    zhuzhuangEcharts,
    TableCommon
  },
  data () {
    return {
      videonum: [],
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
      utilizationratelist: [],
      changezhuanyi: '1',
      changechuzhi: '1',
      waste2: '年',
      waste: '2',
      maintoplefteexecllist: [
        {
          name: '海淀区',
          num: '22,345',
          data: '454',
          bgcolor: 'bgcolor0',
          zhanbicolor: 'zhanbicolor0'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        },
        {
          name: '海淀区',
          num: '22,345',
          data: '454'
        }
      ],
      bumen2: [
        {
          id: 'zhexian33333',
          deptName: 'HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian4444',
          deptName: '1HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian33333',
          deptName: 'HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian4444',
          deptName: '1HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian33333',
          deptName: 'HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian4444',
          deptName: '1HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian33333',
          deptName: 'HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian4444',
          deptName: '1HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian33333',
          deptName: 'HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        },
        {
          id: 'zhexian4444',
          deptName: '1HW08',
          unsolvedCount: '20',
          totalCount: [1, 2, 3, 3]
        }
      ],
      dataListNameBumen2: [
        {
          prop: 'deptName',
          label: '类型',
          type: 'normal',
          width: 'auto',
          isCenter: false
        },
        {
          prop: 'unsolvedCount',
          label: '占比',
          type: 'changEcharts',
          width: '400',
          isCenter: false,
          isTrue: false
        },
        {
          prop: 'totalCount',
          label: '数量（吨）',
          type: 'zhexian',
          width: 'auto',
          isCenter: false
        }
      ],
      isShow3: true,
      regionCode: this.AppConfig.appInfo.regionCode
    }
  },
  methods: {
    // 获取产废量/转运量统计的柱状图
    getyuanhuanecharts (value, num) {
      var myChart = this.$echarts.init(
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
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#188df0'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '  #83bff6'}

                  ]
                )
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    getzhuanyunliangecharts (value, num) {
      var myChart = this.$echarts.init(
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
                color: new this.$echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#188df0'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '  #83bff6'}

                  ]
                )
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    getshaungqubingtushang (value, name) {
      var myChart = this.$echarts.init(
        document.getElementById('productionpechart')
      )
      console.log(this.bingtutop, 'yutuyy')
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
            text: value[0].name,
            bottom: '2%',
            left: '14%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4d71df',
                  fontSize: 20
                }
              }
            }
          },
          {
            text: value[1].name,
            bottom: '2%',
            left: '50%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'normal',
              rich: {
                num: {
                  color: '#32c78d',
                  fontSize: 20
                }
              }
            }
          },
          {
            text: value[2].name,
            bottom: '2%',
            left: '84%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4cb9cd',
                  fontSize: 20
                }
              }
            }
          }
        ],
        graphic: [
          {
            type: 'text',
            top: '45%',
            left: '11%',
            style: {
              text: perHigh,
              font: '30px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '45%',
            left: '46%',
            style: {
              text: perMiddle,
              font: '30px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '45%',
            left: '81%',
            style: {
              text: perLow,
              font: '30px "microsoft yahei"',
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
            center: ['15%', '50%'],
            radius: ['60%', '66%'],
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
            center: ['50%', '50%'],
            radius: ['60%', '66%'],
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
            center: ['85%', '50%'],
            radius: ['60%', '66%'],
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
      var myChart = this.$echarts.init(
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
            text: value[0].name,
            bottom: '2%',
            left: '12%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4d71df',
                  fontSize: 20
                }
              }
            }
          },
          {
            text: value[1].name,
            bottom: '2%',
            left: '49%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'normal',
              rich: {
                num: {
                  color: '#32c78d',
                  fontSize: 20
                }
              }
            }
          },
          {
            text: value[2].name,
            bottom: '2%',
            left: '84%',
            textAlign: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: 'normal',
              textAlign: 'center',
              rich: {
                num: {
                  color: '#4cb9cd',
                  fontSize: 20
                }
              }
            }
          }
        ],
        graphic: [
          {
            type: 'text',
            top: '45%',
            left: '11%',
            style: {
              text: perHigh,
              font: '30px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '45%',
            left: '45%',
            style: {
              text: perMiddle,
              font: '30px "microsoft yahei"',
              textAlign: 'center',
              fill: '#ffffff'
            }
          },
          {
            type: 'text',
            top: '45%',
            left: '81%',
            style: {
              text: perLow,
              font: '30px "microsoft yahei"',
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
            center: ['15%', '50%'],
            radius: ['60%', '66%'],
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
            center: ['50%', '50%'],
            radius: ['60%', '66%'],
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
            center: ['85%', '50%'],
            radius: ['60%', '66%'],
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
      var myChart = this.$echarts.init(document.getElementById('zhanbiechart'))

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
      var regionCode = '131100'
      getDisposalutilizationrate(2022, this.regionCode).then((res) => {
        this.utilizationratelist = res.data
      })
    },
    changewaste () {
      getwasteswitch(this.waste, this.regionCode).then((res) => {
        if (res.code == 0 && res.data) {
          if (res.data.length > 0) {
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
            console.log('proportionwaste', this.proportionwaste)
          }
        }
      })
    },
    getquyupaihang () {
      getwasteranking(this.regionCode).then((res) => {
        if (res.code == 0 && res.data) {
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
        this.videonum = res.data
        var topdata = res.data.pieDPVos.slice(0, 3)
        var bottomdata = res.data.pieDPVos.slice(3, 7)
        // console.log(topdata, "878787");
        // console.log(bottomdata, "878787");
        this.bingtutop = topdata
        this.bingtubottom = bottomdata
        this.getshaungqubingtushang(this.bingtutop)
        this.getshuangqubingtuxia(this.bingtubottom)
      })
    },
    changezhhuanyiliang () {
      var date = new Date()
      date = date.getFullYear()
      getwastetransfer(date, this.regionCode, this.changezhuanyi).then((res) => {
        // this.zhuanyiliangdata
        var data = res.data
        // console.log(data, "8888");
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
        // console.log(this.zhuanyiliangdata, "999");
        // console.log(this.zhuanyiliangname, "99910");
      })
    },
    changechuzhinum () {
      getwastechuzhi(-1, this.regionCode, this.changechuzhi).then((res) => {
        // this.zhuanyiliangdata
        var data = res.data
        console.log(data, '98989898')
        this.czdata = []
        this.czname = []
        for (let i = 0; i < data.length; i++) {
          this.czdata.push(data[i].dataNum)
          this.czname.push(data[i].number)
        }
        console.log(this.czdata, '2222')
        console.log(this.czname, '4444')
        if (this.czname.length == 0) {
          this.flag1 = false
          return
        }
        this.getyuanhuanecharts(
          this.czdata,
          this.czname
        )
      })
    }
    // productprisesechart
  },
  mounted () {
    // this.$echarts.registerMap(this.shandong, shandongGeoJson);
    // this.polar.geo.map = this.shandong;
    // // 显示 上方因子值
    console.log(this.utilizationratelist.prodWasteIde, 'up')
    // this.type === "air"
    //   ? (this.getRegionPollutant(), this.getAQIStatistics())
    //   : (this.loadingWaterInfoPollutantByParams(),
    //     this.loadingZhuzhuang(),
    //     this.loadingWaterInfoMapByParams());
    this.getyuanhuanecharts()
    this.getzhuanyunliangecharts()
    // this.getshaungqubingtushang();
    // this.getshuangqubingtuxia();
    this.getDisposalutilizationrateinfo()
    this.changewaste()
    this.changechuzhinum()
    this.getquyupaihang()
    this.getchanyeleixing()
    this.changezhhuanyiliang()
    // this.gethenxiangxizhuzhuangtu();
    // this.getRegionPollutant();
    // this.getRealTimeAQI()
  },
  watch: {}
}
</script>

<style scoped>
@import "../../../assets/css/leftPanel.css";
</style>
