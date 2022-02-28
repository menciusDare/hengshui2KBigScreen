<template>
  <div class="navMain">
    <div class="map">
      <div class="mapbanxin clearfix">
        <div class="header-box">
          <h3>{{ enterpriseBasicInfo.name }}</h3>
          <div class="close-btn" @click="handelClose"></div>
        </div>
        <div class="content-box">
          <ul class="marrightechart">
            <li>
               <div class="chemicaltitle">基本信息</div>
              <div class="chemicalbox clearfix">
                <div class="chemicalleft">
                  <div class="chenicalinfo">
                    <span class="chenicalinfoleft">负责人：</span>
                    <div class="chenicalinforight">
                      {{ enterpriseBasicInfo.contacts }}
                    </div>
                  </div>
                  <div class="chenicalinfo">
                    <span class="chenicalinfoleft">联系方式：</span>
                    <div class="chenicalinforight">
                      {{ enterpriseBasicInfo.contactsPhone }}
                    </div>
                  </div>
                  <div class="chenicalinfo">
                    <span class="chenicalinfoleft">企业类型：</span>
                    <div class="chenicalinforight">
                      {{ enterpriseBasicInfo.categoryName ? enterpriseBasicInfo.categoryName : '--' }}
                    </div>
                  </div>
                  <div class="chenicalinfo">
                    <span class="chenicalinfoleft">产废规模：</span>
                    <div class="chenicalinforight">
                      {{ enterpriseBasicInfo.totalOutputValue ? enterpriseBasicInfo.totalOutputValue : '--' }}吨
                    </div>
                  </div>
                  <div class="chenicalinfo">
                    <span class="chenicalinfoleft">信用代码：</span>
                    <div class="chenicalinforight">{{enterpriseBasicInfo.creditCode ? enterpriseBasicInfo.creditCode : '--' }}</div>
                  </div>
                  <div class="chenicalinfo">
                    <span class="chenicalinfoleft">所属区域：</span>
                    <div class="chenicalinforight">{{enterpriseBasicInfo.arceName ? enterpriseBasicInfo.arceName : '--'}}</div>
                  </div>
                </div>
                <!-- <div class="chemicalright">
                  <div class="chemicalrightvideo"></div>
                </div> -->
              </div>
            </li>
            <li>
              <ul class="my-ul" >
                <li >种类</li>
                <li >实际产废/报备规模（吨）</li>
              </ul>
              <div class="table-box table-height" v-if="reportinglist.length > 0">
                <table width="328px" border="0" class="reportingscaleecxalbox">
                  <tr
                    class="reportingseexeclbody"
                    v-for="(item, index) in reportinglist"
                    :key="index"
                  >
                    <td style="text-align: center; vertical-align: middle;width:60px">
                      <span class="round-box" :class="'bg-level' + index"></span>
                    </td>
                    <td style="vertical-align: middle;width:100px">
                      {{ item.typeName }}
                    </td>
                    <td style="vertical-align: middle;width:400px">
                      <el-progress
                        :percentage="item.actualProportion"
                        color="rgba(34, 82, 240, 1)"
                      ></el-progress>
                      <el-progress
                        :percentage="item.planProportion"
                        color="rgba(1, 189, 175, 1)"
                      ></el-progress>
                    </td>
                    <td style="vertical-align: middle;width:120px">
                      <div class="td-number">{{ item.actualNum ? item.actualNum : '--' }}</div>
                      <div class="td-number">{{ item.planNum ? item.planNum : '--' }}</div>
                    </td>
                  </tr>
                </table>
              </div>
              <div class="table-box table-height noData"  v-else>暂无数据</div>
            </li>
          </ul>
          <ul class="marrightvideo">
            <li>
              <div class="chemicaltitle">企业监控</div>
              <div class="marrightvideobody" v-if="videoList.length > 0">
                <div style="width: 100%; height: 100%;" v-for="(imte, index) in videoList" :key="index">
                  <iframe
                    :src="imte.url"
                    width="100%"
                    height="100%"
                    scrolling="no"
                    allowfullscreen
                    webkitallowfullscreen="true"
                    mozallowfullscreen="true"
                    frameborder="0"
                    v-if="imte.manufacturerType === 0"
                  >
                  </iframe>
                  <xMonitor
                    :url="imte.url"
                    :poster="imte.poster"
                    :kitToken="imte.kitToken"
                    v-else-if="imte.manufacturerType === 1"
                  ></xMonitor>
                  <div class="marrightvideoname">{{ imte.cameraName }}</div>
                </div>
              </div>
              <div class="marrightvideobody" v-else>暂无数据</div>
            </li>
            <li>
              <div class="responswitch">
                <el-select v-model="radio13" @change="changezhexian()" class="mySelect">
                  <el-option label="产废曲线" value="1">产废曲线</el-option>
                  <el-option label="企业台账" value="2">企业台账</el-option>
                  <el-option label="五联单记录" value="3"> 五联单记录</el-option>
                  <el-option label="贮存设施" value="4">贮存设施</el-option>
                </el-select>
              </div>
              <!-- <div class="respondateswitch">
                <el-radio-group v-model="radio13">
                  <el-radio-button label="年"></el-radio-button>
                  <el-radio-button label="月"></el-radio-button>
                  <el-radio-button label="周"></el-radio-button>
                </el-radio-group>
              </div> -->
              <!-- 折线图 -->
              <div v-if="radio13 == 1" style="height: 245px">
                <div class="responechart" ref="responeschart" id="responeschart" v-if="flag"></div>
                <!--<empty-data v-else></empty-data>-->
                <div  v-else class="noData">暂无数据</div>
              </div>
              <!-- 企业台账 -->
              <div class="table-height" v-if="radio13 == 2">
                <table
                  width="100%"
                  border="0"
                  class="reportingscaleecxalbox table-height"
                >
                  <tr class="reportingseexeclheader">
                    <td style="width: 60px">操作时间</td>
                    <td style="width: 100px; text-align: center">危废名称</td>
                    <td style="text-align: center">状态</td>
                    <td style="text-align: center">重量(KG)</td>
                  </tr>
                  <tr
                    class="reportingseexeclbody"
                    v-for="(item, index) in collectProductionBookList"
                    :key="index"
                  >
                    <td
                      style="
                      text-align: center;
                      vertical-align: middle;
                      width: 150px;
                    "
                    >
                      {{ item.createdTime.split(" ")[0] }}
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 297px;
                      text-align: center;
                    "
                    >
                      <div class="td-number"> {{ item.dictDetailName }}</div>
                      <div class="td-number">{{ item.dictDetailCode }}</div>
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 90px;
                      text-align: center;
                    "
                    >
                    <span
                      :class="
                        item.operationType == 1 ? 'ruku-color' : 'chuku-color'
                      "
                    >{{ item.operationType | formatStatus }}</span
                    >
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 150px;
                      text-align: center;
                    "
                    >
                      {{ item.number }}
                    </td>
                  </tr>
                </table>
              </div>
              <!-- 五联单记录 -->
              <div class="table-height" v-if="radio13 == 3">
                <table
                  width="100%"
                  border="0"
                  class="reportingscaleecxalbox"
                >
                  <tr class="reportingseexeclheader">
                    <td style="padding-left: 10px">五联单编号</td>
                    <td style="text-align: center">计划转移日期</td>
                    <td style="text-align: center">转移重量(KG)</td>
                  </tr>
                  <tr
                    class="reportingseexeclbody"
                    v-for="(item, index) in recordsList"
                    :key="index"
                  >
                    <td
                      style="
                      vertical-align: middle;
                      width: 180px;
                      padding-left: 10px;
                    "
                    >
                      {{ item.linkedId }}
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 220px;
                      text-align: center;
                    "
                    >
                      {{ item.plannedTransferTime.split(" ")[0] }}
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 190px;
                      text-align: center;
                    "
                    >
                      {{ item.amount }}
                    </td>
                  </tr>
                </table>
              </div>
              <!-- 贮存设施 -->
              <div class="table-height" v-if="radio13 == 4">
                <table
                  width="100%"
                  border="0"
                  class="reportingscaleecxalbox"
                >
                  <tr class="reportingseexeclheader">
                    <td style="width: 60px; text-align: center">序号</td>
                    <td style="width: 100px; text-align: center">危废名称</td>
                    <td style="text-align: center">存量(KG)</td>
                    <td style="text-align: center">最久已贮存时(天)</td>
                  </tr>
                  <tr
                    class="reportingseexeclbody"
                    v-for="(item, index) in storageFacilityMonitorList"
                    :key="index"
                  >
                    <td
                      style="
                      text-align: center;
                      vertical-align: middle;
                      width: 80px;
                    "
                    >
                      {{ index + 1 }}
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 290px;
                      text-align: center;
                    "
                    >
                      <div class="td-number">{{ item.dictDetailName }}</div>
                      <div class="td-number">({{ item.dictDetailCode }})</div>
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 110px;
                      text-align: center;
                    "
                    >
                      {{ item.currentAmount }}
                    </td>
                    <td
                      style="
                      vertical-align: middle;
                      width: 280px;
                      text-align: center;
                    "
                    >
                      {{ item.storageDay }}
                    </td>
                  </tr>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDPEnterpriseInfo,
  getDPMonitoringDpwaste,
  getDPMonitoringDpbroken,
  getselectentErpriseSSBook, // 企业台账-图表接口
  getEntContaineGroup, // 贮存设施-图表接口
  getselectTFiveLinkedPage, // 五联单记录-图表接口
  queryVideoList // 视频列表
} from '../../../common/api/rightPanel'
import xMonitor from './views/xMonitor'
export default {
  name: 'mapDiago',
  props: {
    id: Number
  },
  components: {
    xMonitor
  },
  data () {
    return {
      enterpriseBasicInfo: {}, // 企业基本信息
      reportinglist: [],
      videoList: [],
      radio13: '1',
      flag: true,
      collectProductionBookList: [], // 企业台账
      recordsList: [], // 五联单记录
      storageFacilityMonitorList: [] // 贮存设施
    }
  },
  filters: {
    formatStatus (val) {
      return val == 1 ? '入库' : '出库'
    }
  },
  created () {
    console.log('999999999', this.id)
  },
  methods: {
    // 关闭弹窗
    handelClose () {
      this.$parent.status = false
    },
    changezhexian () {
      if (this.radio13 == 1) {
        this.getDPMonitoringDpbrokenData()
      }
    },
    getDPMonitoringDpbrokenData () {
      // 获取折线图数据
      getDPMonitoringDpbroken(this.id).then((res) => {
        if (res.code == 0 && res.data) {
          if (res.data.length > 0) {
            console.log('产废折线图', res.data)
            let xData = []
            let thisData = []
            let lastData = []
            res.data.forEach((item) => {
              xData.push(item.month)
              thisData.push(item.thisNum)
              lastData.push(item.lastNum)
            })
            if (res.data.length == 0) {
              this.flag = false
              return
            }
            this.$nextTick(() => {
              this.getzhexianechart(xData, thisData, lastData)
            })
          }
        } else {
          this.flag = false
        }
      })
    },
    initData () {
      queryVideoList(this.id).then((res) => {
        if (res.code == 0 && res.data) {
          this.videoList = res.data.data.splice(0, 1)
        }
      })
      // 获取企业基本信息
      // this.id
      getDPEnterpriseInfo(this.id).then((res) => {
        if (res.code == 0 && res.data) {
          console.log('获取企业基本信息:', res.data)
          this.enterpriseBasicInfo = res.data
        }
      })
      // 产废情况对比
      getDPMonitoringDpwaste(this.id).then((res) => {
        let newArr = []
        if (res.code == 0 && res.data) {
          if (res.data.length > 0) {
            res.data.map((item, index) => {
              newArr.push(
                Object.assign({}, item, {
                  actualProportion: Number(
                    (
                      (item.actualNum / (item.actualNum + item.planNum)) *
                      100
                    ).toFixed(2)
                  ),
                  planProportion: Number(
                    (
                      (item.planNum / (item.actualNum + item.planNum)) *
                      100
                    ).toFixed(2)
                  )
                })
              )
            })
            this.reportinglist = newArr
          }
        }
      })

      getselectentErpriseSSBook(this.id).then((res) => {
        console.log('企业台账', res)
        if (res.code == 0 && res.data) {
          this.collectProductionBookList = res.data.records
        }
      })
      // 五联单记录
      getselectTFiveLinkedPage(this.id).then((res) => {
        console.log('五联单记录', res)
        if (res.code == 0 && res.data) {
          this.recordsList = res.data.records
        }
      })
      // 贮存设施
      getEntContaineGroup(this.id).then((res) => {
        var _this = this
        console.log('贮存设施', res)
        if (res.code == 0 && res.data) {
          var storageFacilityList = []
          for (var i = 0; i < res.data.length; i++) {
            for (var j = 0; j < res.data[i].containeInfoList.length; j++) {
              storageFacilityList.push(res.data[i].containeInfoList[j])
            }
          }
          _this.storageFacilityMonitorList = storageFacilityList
        }
      })
    },
    getzhexianechart (xData, thisData, lastData) {
      var myChart = this.$echarts.init(
        document.getElementById('responeschart')
      )
      var xData = xData
      var yData1 = thisData
      var yData2 = lastData
      var option = {
        title: {
          top: '0',
          left: 'center',
          textStyle: {
            align: 'center',
            color: '#FFFFFF',
            fontSize: 22
          }
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          x: 'right',
          y: '10px',
          textStyle: {
            color: '#FFFFFF',
            fontSize: 13
          },
          icon: 'circle',
          data: ['呼入量', '呼出量']
        },

        grid: {
          x: 50,
          y: 45,
          x2: 25,
          y2: 22,
          borderWidth: 1
        },
        xAxis: [
          {
            type: 'category',
            data: xData,
            nameTextStyle: {
              color: '#d4ffff'
            },
            axisLine: {
              lineStyle: {
                color: '#000000'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#FFF',
                fontSize: 12
              }
              // interval:0,
              // rotate:30
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameTextStyle: {
              color: '#d4ffff'
            },
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#000000'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#0B4CA9'
              }
            },
            axisLabel: {
              color: '#ffffff',
              fontSize: 12
            }
          }
        ],
        series: [
          {
            name: '呼入量',
            type: 'line',
            yAxisIndex: 0,
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: 'rgba(1, 189, 175, 1)'
              }
            },
            data: yData1
          },
          {
            name: '呼出量',
            type: 'line',
            yAxisIndex: 0,
            symbolSize: 12,
            itemStyle: {
              normal: {
                color: 'rgba(194, 134, 133, 1)'
              }
            },
            data: yData2
          }
        ]
      }
      myChart.setOption(option)
    }
  },
  mounted () {
    this.initData()
    this.$nextTick(() => {
      this.getDPMonitoringDpbrokenData()
    })
  }
}
</script>

<style scoped>
/*@import "../../../assets/css/rightPanelnew68.css";*/
.navMain {
  width: 738px;
  height: 580px;
}
.map {
  width: 738px;
  height: 580px;
  border-radius: 13px;
}
.mapbanxin {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px 21px 25px 21px;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
}
.header-box {
  /*position: absolute;*/
  /*top:0;*/
  /*left: 0;*/
  /*z-index: 999;*/
  display: flex;
  align-items: center;
  width: 100%;
  height: 22px;
  /*background: black;*/
  line-height: 22px;
  justify-content: space-between;
}
.header-box h3 {
  font-size: 16px;
  color: #ffffff;
}
.header-box .close-btn {
  width: 20px;
  height: 20px;
  background: url('../../../assets/img/close.png')no-repeat center center;
  background-size: 20px 20px;
  margin-left: auto;
  cursor: pointer;
}
.content-box {
  display: flex;
}
.content-box ul {
  width: 50%;
  height: 100%;
}

.marrightvideo{
  /*height: 92% !important;*/
    /*overflow-y: auto;*/
  padding-left: 10px;
}
.marrightvideo ::-webkit-scrollbar{
    width: 0;
}
/*ie10+*/
.marrightvideo  {
    -ms-overflow-style: none;
}
/*firefox*/
.marrightvideo{
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;/*旧版本的Firefox*/
}
.mapbanxin ul li {
  width: 100%;
  /*height: 460px;*/
  /*margin-bottom: 30px;*/
}
.mapbanxin ul li:nth-child(3) {
  /* overflow-y: auto; */
}
.mapbanxin ul li:nth-child(3) table {
  height: calc(100% - 40px);
  overflow-y: scroll;
}
.mapbanxin ul li:nth-child(3)::-webkit-scrollbar {
  width: 0;
}
/*ie10+*/
.mapbanxin ul li:nth-child(3) {
  -ms-overflow-style: none;
}
/*firefox*/
.mapbanxin ul li:nth-child(3) {
  scrollbar-width: none;
  overflow: -moz-scrollbars-none; /*旧版本的Firefox*/
}
.marrightvideo li {
  overflow: hidden;
}
.marrightechart{
  padding-right: 10px;
}
.chemicaltitle {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  height: 20px;
  line-height: 20px;
  margin: 18px 0 14px 0;
}
.chemicalbox {
  width: 100%;
  height: 200px;
  /*margin-top: 17px;*/
  display: flex;
}
.chemicalleft {
  width: 100%;
  height: 100%;
}
.chemicalright {
  width: 50%;
  height: 100%;
}
.chenicalinfo {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  line-height: 32px;
  background: rgba(169, 168, 239, 0.14);
  background: rgba(169, 168, 239, 0.14);
  border-radius: 6px;
  margin-bottom: 2px;
  font-size: 14px;
}
.chenicalinfoleft {
  width: 100px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 10px;
  padding-top: 0;
  box-sizing: border-box;
}
.chenicalinforight {
  flex: 1;
  font-weight: 400;
  color: #ffffff;
  padding-top: 0;
  box-sizing: border-box;
  text-align: left;
}
.chemicalrightvideo {
  width: 320px;
  height: 335px;
  background: #d8d8d8;
  border-radius: 10px;
  margin-left: 20px;
}
.reportingscaleecxalbox {
  border-collapse: separate;
  border-spacing: 0px 6px;
}
.reportingseexeclheader {
  height: 44px;
  line-height: 44px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}
.reportingseexeclbody {
  height: 44px;
  background: rgba(169, 168, 239, 0.14);
  border-radius: 6px;
  line-height: 44px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
}
.td-number{
  height: 22px;
  line-height: 22px;
}
.responswitch {
  width: 100%;
  height: 46px;
}
/deep/ .responswitch .el-radio-button__inner {
  width: 62px;
  background:rgba(255,255,255,0.2);
  font-size:22px;
  border: none;
  color:#ffffff;
}
/deep/
  .responswitch
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background: rgba(34, 82, 240, 1);
  border-color: rgba(34, 82, 240, 1);
}
.respondateswitch {
  width: 240px;
  height: 40px;
  margin-top: 20px;
}
/deep/ .respondateswitch .el-radio-button__inner {
  width: 80px;
  border: none;
}
/deep/
  .respondateswitch
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background: rgba(34, 82, 240, 1);
  border-color: rgba(34, 82, 240, 1);
}
.responechart {
  width: 100%;
  height: 100%;
}
.marrightvideoheader {
  width: 100%;
  height: 42px;
  margin-top: 20px;
  padding-left: 20px;
}
.marrightvideoheadernum {
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  float: left;
}
.marrightvideoheadericon {
  width: 30px;
  height: 30px;
  float: right;
  margin-right: 40px;
  box-sizing: border-box;
  /* background: brown; */
}
.marrightvideobody {
  width: 100%;
  height: 200px;
  /* background: #5d3131; */
  /*margin-left: 20px;*/
  border-radius: 9px;
  /*margin-top: 14px;*/
  position: relative;
  text-align: center;
  line-height: 200px;
  color: rgba(255,255,255,0.7);
}
.marrightvideobodyname {
  position: absolute;
  top: 14px;
  right: 17px;
}
.marrightvideoradiu {
  width: 16px;
  height: 16px;
  /* background: rgba(255, 10, 10, 1); */
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 15px;
}
.marrightvideoname {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  position: absolute;
  top: 14px;
  right: 17px;
}
.Warehousing {
  color: #01bdaf;
}
.Delivery {
  color: #f09622;
}
.rightrightechart {
  width: 100%;
  height: 58%;
  margin-top: 28px;
}
.differt {
  width: 130px;
  height: 40px;
  background: rgba(34, 240, 237, 0.1);
  border-radius: 7px;
  text-align: center;
  line-height: 40px;
}

.round-box {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(237, 85, 85, 1);
}
.round-box.bg-level0, .round-box.bg-level5, .round-box.bg-level10 {
  background-color: rgba(237, 85, 85, 1);
}
.round-box.bg-level1, .round-box.bg-level6, .round-box.bg-level11 {
  background-color: rgba(252, 141, 82, 1);
}
.round-box.bg-level2, .round-box.bg-level7, .round-box.bg-level12 {
  background-color: rgba(255, 206, 86, 1);
}
.round-box.bg-level3, .round-box.bg-level8, .round-box.bg-level13{
  background-color: rgba(237, 85, 85, 1);
}
.round-box.bg-level4, .round-box.bg-level9, .round-box.bg-level14 {
  background-color: rgba(69, 216, 255, 1);
}
.navMain >>> .el-progress__text {
  display: none;
}
.navMainl >>> .el-progress-bar {
  padding-right: 22px;
}
.el-radio-group {
  display: flex;
}
.ruku-color {
  color: #01bdaf;
}
.chuku-color {
  color: #f09622;
}
.table-height {
  height: 245px;
   /*overflow-y: scroll;*/
}

.table-height{
    overflow-y: auto;
}
.table-height::-webkit-scrollbar{
    width: 0;
}
/*ie10+*/
.table-height{
    -ms-overflow-style: none;
}
/*firefox*/
.table-height{
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;/*旧版本的Firefox*/
}
.table-box{
    overflow-y: auto;
}
.table-box::-webkit-scrollbar{
    width: 0;
}
/*ie10+*/
.table-box{
    -ms-overflow-style: none;
}
/*firefox*/
.table-box{
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;/*旧版本的Firefox*/
}
.my-ul {
  width:100% !important;
  display:flex;
  padding: 21px 0 0px 0;
}
.my-ul li {
  height: 20px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom:0;
  line-height:20px;
}
.my-ul li:nth-child(1) {
  width: 66px;
  padding-left:20px;
}
.my-ul li:nth-child(2) {
  flex: 1;
}
.mySelect{
  margin-top: 6px;
  width: 50%;
  /*float: right;*/
}
  >>>.mySelect .el-input__inner{
    background: transparent;
    color: #ffffff;
    /*height: 30px;*/
    /*line-height: 30px;*/
    font-size: 14px;
  }
  /*>>>.mySelect .el-input__icon{*/
    /*line-height: 30px;*/
  /*}*/
  .noData {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    line-height: 245px;
  }
</style>
