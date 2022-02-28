<template>
  <div class="rightPanel flex1">
<!--    <div class="rightPanelTab rowFlex">-->
<!--      <div-->
<!--        class="rightPanelTabLi"-->
<!--        v-for="item in rightPanelTab"-->
<!--        :class="item.id === rightPanelTabSelected ? 'selected' : ''"-->
<!--        :key="item.id">-->
<!--        {{item.name}}-->
<!--      </div>-->
<!--    </div>-->
    <div class="rightPanelMain rowSpace">
      <ComprehensiveReview
        type="water"
        :conprehensiveName = "conprehensiveName"
        :panelParmas = "panelData.waterEnvironment"
        :waterQualityDetail = "waterQualityDetail" ></ComprehensiveReview>
      <div class="sectionCompliance panelMainBlock rowSpace flexColumn">
        <div class="titleName marginB20">断面达标情况</div>
        <TableCommon
          :data = "panelData.sectionGuoTableData"
          v-if="sectionGuoTableDataIsShow"
          :dataName="sectionGuoTableName"></TableCommon>
        <TableCommon
          :data = "panelData.duanmianTableData"
          :dataName="duanmianTableName"></TableCommon>
        <TableCommon
          class="heliu"
          :data = "panelData.heliuTableData"
          v-if="heliuIsShows"
          :dataName="heliuTableName"></TableCommon>
        <div class="waterLevel">
          <span class="smallTitle">水质现状</span>
          <div class="rowSpace">
            <div
              v-for="(item, index) in panelData.waterLevel"
              :key="item.name"
              class="waterLevelList rowSpace alginCenter">
              <div>{{item.name}}</div>
              <div :style="{color: color[item.name], fontSize: '22px'}">{{item.num}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="rowSpace flexColumn">
        <div class="panelMainBlock levelRank">
          <div class="titleName rowSpace">
            <div style="line-height: 40px">
              水质类别同比变化
            </div>
            <div class="querySelected ">
              <el-select v-model="yinziValue"  @change="pollutantChange" placeholder="请选择">
                <el-option
                  v-for="item in yinziOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
<!--              <el-select v-model="yinziValue2" placeholder="请选择">-->
<!--                <el-option-->
<!--                  v-for="item in yinziOptions2"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
              <el-date-picker
                v-model="year"
                type="year"
                format="yyyy"
                @change="dateChange"
                placeholder="选择年">
              </el-date-picker>
            </div>
          </div>
          <div class="smallTitleDel">咸宁地区空气与水质量考核变化率</div>
          <div class="introducePanel">
            <div class="introducePanelLis rowSpace flexColumn" v-for="item in panelData.introducePanel">
              <div>{{item.name}}</div>
              <div class="rowSpace">
                <div class="num">{{item.num}}%</div>
<!--                <div class="range">{{item.rangel}}%</div>-->
              </div>
            </div>
          </div>
          <div class="levelRankEchrts">
            <Zhexian
               v-if="panelData.levelRank.isShow"
              :data="panelData.levelRank.xAxis"
              :id="levelRankId"
              :params = "zhexianParams"></Zhexian>
          </div>
        </div>
        <div class="rowSpace bottomMain">
          <div class="panelMainBlock xianjiRate">
            <div class="titleName rowSpace">
              <div style="line-height: 40px">
                县级以上水源地达标率
              </div>
              <div class="querySelected ">
                <el-date-picker
                  v-model="yearZhuzhuang"
                  @change="dateZhuzhuangChange"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
              </div>
            </div>
            <div class="zhuzhuangEcharts">
              <zhuzhuangEcharts v-if="zhuzhuangEchartsData.isShow" :params="zhuzhuangEchartsData"></zhuzhuangEcharts>
            </div>
          </div>
          <div class="panelMainBlock xianjiRate rowSpace flexColumn">
            <div class="titleName rowSpace">
              <div style="line-height: 40px">
                各水功能区水质情况
              </div>
            </div>
            <div class="zhuzhuangEcharts">
              <TableCommon
                class="gongneng"
                :data = "panelData.gongnengRateData"
                :dataName="gongnengRateName"></TableCommon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from '../Common/TableCommon'
import Zhexian from '@/components/Common/Echarts/Zhexian.vue'
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import ComprehensiveReview from '@/components/Common/pegeCommon/ComprehensiveReview.vue'
export default {
  name: 'RightPandel',
  data () {
    return {
      rightPanelTab: [
        {name: '水环境质量监测', id: 'water'},
        {name: '斧头湖监管', id: 'futou'}
      ],
      rightPanelTabSelected: 'water',
      panelData: {
        waterEnvironment: {
          waterLevel: 'I,II 水质',
          percent: '43.9',
          countryNum: '--',
          waterNum: '--',
          num: '43.9',
          company: '%'
        },
        // sectionCompliance
        sectionGuoTableData: [{
          num: '1',
          name: '国控',
          rate: '33',
          qualifiedNum: '30',
          id: 'bing1'
        }, {
          num: '1',
          name: '省控',
          rate: '98',
          qualifiedNum: '15',
          id: 'bing2'
        }, {
          num: '1',
          name: '市控',
          rate: '98',
          qualifiedNum: '15',
          id: 'bing3'
        }],
        duanmianTableData: [
          {
            num: '1',
            name: '断面1',
            mubiao: 'II',
            xianshi: 'II',
            wuran: 'SO'
          }, {
            num: '1',
            name: '断面2',
            mubiao: 'II',
            xianshi: 'II',
            rate: '98',
            wuran: 'SO'
          }, {
            num: '1',
            name: '断面3',
            mubiao: 'II',
            xianshi: 'II',
            rate: '98',
            wuran: 'SO'
          }

        ],
        heliuTableData: [
          {
            name: '河流1',
            rate: '98',
            id: 'zhexian1',
            data: [30, 40, 50]
          }, {
            name: '河流2',
            rate: '98',
            id: 'zhexian2',
            data: [30, 40, 50]
          }, {
            name: '河流3',
            rate: '98',
            id: 'zhexian3',
            data: [30, 40, 50]
          },
          {
            name: '河流4',
            rate: '98',
            id: 'zhexian3',
            data: [30, 40, 50]
          }
        ],
        gongnengRateData: [
          {
            quyu: '河流1',
            rate: '33',
            id: 'heliu1',
            data: [30, 40, 50],
            shangyue: '+5',
            wuran: 'SO',
            num: '01'
          }, {
            quyu: '河流2',
            rate: '98',
            id: 'heliu2',
            data: [30, 40, 50],
            shangyue: '+5',
            wuran: 'SO',
            num: '02'
          }, {
            quyu: '河流3',
            rate: '33',
            id: 'heliu3',
            data: [30, 40, 50],
            shangyue: '-5',
            wuran: 'SO',
            num: '03'
          },
          {
            quyu: '河流3',
            rate: '33',
            id: 'heliu3',
            data: [30, 40, 50],
            shangyue: '-5',
            wuran: 'SO',
            num: '04'
          },
          {
            quyu: '河流3',
            rate: '33',
            id: 'heliu3',
            data: [30, 40, 50],
            shangyue: '-5',
            wuran: 'SO',
            num: '05'
          }
        ],
        waterLevel: [
          {name: 'I-II', num: '35'},
          {name: 'III', num: '35'},
          {name: 'IV', num: '35'},
          {name: 'V', num: '60'},
          {name: '劣V', num: '99'}
        ],
        levelRank: {
          xAxis: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ],
          isShow: false
        },
        introducePanel: [
          {name: '同比去年增长', id: 'add', num: '80', rangel: '+8'},
          {name: 'COD浓度', id: 'add', num: '10', rangel: '-8'},
          {name: '总氮浓度', id: 'add', num: '20', rangel: '-25'}
        ]
      },
      waterQualityDetail: [
        {name: '全国综合排名', id: 'countryNum', isStatus: true, Company: ''},
        {name: '水质综合', id: 'waterNum', isStatus: true, Company: ''},
        {name: 'I-II类水质', id: 'percent', isStatus: false, Company: '%'}
      ],
      conprehensiveName: '水环境质量综合看版',
      sectionGuoTableName: [
        {prop: 'num', label: '排名', type: 'index', width: '60', isCenter: true, isRank: true},
        {prop: 'name', label: '等级', type: 'normal', width: 'auto'},
        {prop: 'rate', label: '达标率', type: 'bing', width: 'auto', isCenter: false},
        {prop: 'qualifiedNum', label: '超标数', type: 'normal', width: 'auto'},
        {prop: 'id', label: '', type: 'normal', width: 'auto'}
      ],
      duanmianTableName: [
        {prop: 'num', label: '序号', type: 'index', width: '60'},
        {prop: 'name', label: '断面名称', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'mubiao',
          label: '水质目标',
          type: 'mubiao',
          isChildren: [
            {name: '目标', id: 'mubiao'},
            {name: '显示', id: 'xianshi'}
          ],
          width: 'auto',
          isCenter: false},
        {prop: 'wuran', label: '主要污染物', type: 'normal', width: 'auto'}
      ],
      heliuTableName: [
        {prop: 'name', label: '河流库湖', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'rate', label: '达标率', type: 'prence', width: 'auto'},
        {prop: 'data', label: '趋势', type: 'zhexian', width: 'auto'},
        {prop: 'id', label: '', type: 'normal', width: 'auto'}
      ],
      gongnengRateName: [
        {prop: 'num', label: '序号', type: 'index', width: '60', isRank: true},
        {prop: 'riverName', label: '区域', type: 'normal', width: 'auto'},
        {prop: 'nowFkWaterLevelNow', label: '本月水质', type: 'normal', width: 'auto'},
        {prop: 'beforeFkWaterLevelNow', label: '上月水质', type: 'normal', width: 'auto'},
        {prop: 'fkPollutantIdName', label: '首要污染物', type: 'normal', width: 'auto'},
        {prop: 'id', label: '', type: 'normal', width: 'auto'}
      ],
      NameId: 'sectionGuoTableName',
      color: {
        'I-II': 'rgba(90, 216, 166, 1)',
        'III': 'rgba(255, 221, 38, 1)',
        'IV': 'rgba(90, 216, 166, 1)',
        'V': 'rgba(255, 221, 38, 1)',
        '劣V': 'rgba(255, 221, 38, 1)'
      },
      yinziOptions: [
        {
          value: 'W21011',
          label: '总磷'
        }, {
          value: 'W21001',
          label: '总氮'
        }, {
          value: 'W21003',
          label: '氨氮'
        }, {
          value: 'W01019',
          label: '高锰酸盐指数'
        }
      ],
      yinziValue: 'W21011',
      yinziOptions2: [{
        value: 'co',
        label: 'CO'
      }],
      yinziValue2: 'co',
      year: new Date().format('yyyy'),
      yearZhuzhuang: new Date().format('yyyy'),
      levelRankId: 'levelRank',
      zhexianParams: {
        xIsTrue: true,
        yIsTrue: true,
        color: ['rgba(1, 213, 185, 1)', 'rgba(218, 218, 218, 1)', 'rgba(156, 102, 101, 1)', 'rgba(102, 45, 236, 1)', 'rgba(45, 84, 236, 1)'],
        isAreaStyle: false,
        id: 'noCommon',
        grid: {
          width: '85%',
          height: '75%',
          bottom: '10%',
          left: '10%'
        },
        data: [],
        legend: true,
        position: 'right',
        lengendPositions: 'right',
        tooltip: true
      },
      zhuzhuangEchartsData: {
        isShow: false,
        xAxis: ['区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名'],
        series: [
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 100,
            itemStyle: {
              color: 'rgba(224, 32, 32, 1)'
            }
          },
          {
            value: 30,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          }
        ],
        id: 'zhuzhuangEchartsData',
        grid: {
          width: '85%',
          height: '75%',
          bottom: '10%',
          left: '10%'
        },
        isShowy: true,
        isSplitLine: true,
        isShowx: true,
        barWidth: 6,
        tooltip: true
      },
      sectionGuoTableDataIsShow: false,
      heliuIsShows: false
    }
  },
  components: {
    TableCommon,
    Zhexian,
    zhuzhuangEcharts,
    ComprehensiveReview
  },
  mounted () {
    // 获取水环境质量综合看版
    this.getPanelData()
    // 断面达标情况 - 等级
    this.getSectionGuoTableData()
    // 断面达标情况 - 水质目标
    this.getDuanmianTableData()
    // 断面达标情况 - 河流
    this.getHeliuTableData()
    // 水质现状
    this.getWaterLevel()
    // 水质类别同比变化 Echart值
    this.dateChange()
    // 水质类别同比变化 左侧因子值
    this.pollutantChange()
    // 县级以上水源地达标率
    this.getZhuzhuangEchartsData()
    this.gongnengRateNameFun()
  },
  methods: {
    /** 水环境质量综合看版 */
    getPanelData () {
      let _this = this
      _this.$axios.get('api/online-monitor-data-share/waterQueryInfo/getWaterQualityComplexView').then((res) => {
        if (res.data.code == 200) {
          _this.panelData.waterEnvironment.num = res.data.data
          _this.panelData.waterEnvironment.percent = res.data.data
        }
      })
    },

    /** 断面达标情况 - 等级 */
    getSectionGuoTableData () {
      let _this = this
      let params = new URLSearchParams()
      params.append('regionCode', _this.app_config.appInfo.regionCode)
      this.sectionGuoTableDataIsShow = false
      _this.$axios.get('api/online-monitor-data-share/tEnvYeardataArea/getComplianceRate', {params: params}).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data, 'cccc')
          let dataMap = res.data.data.map((item, index) => {
            let tmp = {
              name: item.controlLevelName,
              rate: item.complianceRate.toString(),
              qualifiedNum: item.exceedingStandardTotal.toString(),
              num: index + 1,
              id: `sectionGuoTableData${index}`
            }
            return tmp
          })
          _this.panelData.sectionGuoTableData = dataMap
          this.sectionGuoTableDataIsShow = true
        }
      })
    },

    /** 断面达标情况 - 水质目标 */
    getDuanmianTableData () {
      let _this = this
      let params = new URLSearchParams()
      params.append('regionCode', _this.app_config.appInfo.regionCode)
      _this.$axios.get('api/online-monitor-data-share/tEnvYeardataArea/getReachWaterLevel', {params: params}).then((res) => {
        if (res.data.code == 200) {
          let dataMap = res.data.data.map((item, index) => {
            let tmp = {
              name: item.name,
              mubiao: item.fkWaterLevelIdName,
              xianshi: item.fkWaterLevelNowName,
              wuran: item.pollutantName,
              num: index + 1
            }
            return tmp
          })
          _this.panelData.duanmianTableData = dataMap
        }
      })
    },

    /** 断面达标情况 - 河流 */
    getHeliuTableData () {
      let _this = this
      let params = new URLSearchParams()
      params.append('riverCode', _this.app_config.appInfo.riverCode)
      this.heliuIsShows = false
      _this.$axios.get('api/online-monitor-data-share/tEnvYeardataArea/getRiverLakeComplianceRate', {params: params}).then((res) => {
        if (res.data.code == 200) {
          let dataMap = res.data.data.map((item, index) => {
            let tmp = {
              name: item.riverName,
              rate: item.complianceRate,
              num: index + 1,
              data: item.echartData,
              id: `heliuTableData${index + 1}`
            }
            return tmp
          })
          console.log(dataMap, 'indexindexindexindexindex')
          _this.panelData.heliuTableData = dataMap
          this.heliuIsShows = true
        }
      })
    },

    /** 水质现状 */
    getWaterLevel () {
      let _this = this
      let params = new URLSearchParams()
      params.append('regionCode', _this.app_config.appInfo.regionCode)
      _this.$axios.get('api/online-monitor-data-share/tEnvYeardataArea/getWaterStatusQuo', {params: params}).then((res) => {
        if (res.data.code == 200) {
          _this.panelData.waterLevel[0].num = res.data.data.oneToTwo
          _this.panelData.waterLevel[1].num = res.data.data.three
          _this.panelData.waterLevel[2].num = res.data.data.four
          _this.panelData.waterLevel[3].num = res.data.data.five
          _this.panelData.waterLevel[4].num = res.data.data.six
        }
      })
    },

    /** 水质类别同比变化 点击日期触发事件 */
    dateChange (val) {
      if (val) { this.year = val.format('yyyy') }
      let _this = this
      let params = new URLSearchParams()
      params.append('yearDate', _this.year)
      params.append('pollutantCode', _this.yinziValue)
      _this.panelData.levelRank.isShow = false
      _this.$axios.get('api/online-monitor-data-share/tEnvMonthdataRiver/getWaterLevelYearOnYearList', {params: params}).then((res) => {
        if (res.data.code == 200) {
          _this.zhexianParams.data = res.data.data.xaxis
          let echart = res.data.data.echartData
          let dat = []
          for (let key in echart) {
            dat.push({
              name: getEchartName(key),
              type: 'line',
              stack: '总量',
              data: echart[key]
            })
          }
          _this.panelData.levelRank.xAxis = dat
          _this.panelData.levelRank.isShow = true
        }
      })
      function getEchartName (name) {
        if (name == 'oneTwoWaterList') {
          return 'Ⅰ类/Ⅱ类'
        } else if (name == 'threeWaterList') {
          return 'Ⅲ类'
        } else if (name == 'fourWaterList') {
          return 'Ⅳ类'
        } else if (name == 'fiveWaterList') {
          return 'Ⅴ类'
        } else if (name == 'sixWaterList') {
          return '劣Ⅴ类'
        }
      }
    },

    /** 水质类别同比变化 点击因子触发事件 */
    pollutantChange (val) {
      let _this = this
      let params = new URLSearchParams()
      params.append('yearDate', _this.year)
      params.append('pollutantCode', _this.yinziValue)
      _this.$axios.get('api/online-monitor-data-share/tEnvMonthdataRiver/getWaterLevelYearOnYearList', {params: params}).then((res) => {
        if (res.data.code == 200) {
          _this.panelData.introducePanel[0].num = res.data.data.pollutantCodeYearOnYear
          _this.panelData.introducePanel[1].num = res.data.data.w01018YearOnYear
          _this.panelData.introducePanel[2].num = res.data.data.w21001YearOnYear
        }
      })
    },

    /** 县级以上水源地达标率 */
    getZhuzhuangEchartsData () {
      let _this = this
      _this.zhuzhuangEchartsData.isShow = false
      let params = new URLSearchParams()
      params.append('regionCode', _this.app_config.appInfo.regionCode)
      params.append('startDate', _this.yearZhuzhuang)
      _this.$axios.get('api/online-monitor-data-share/tEnvYeardataArea/getWaterSourceArea', {params: params}).then((res) => {
        if (res.data.code == 200) {
          _this.zhuzhuangEchartsData.xAxis = []
          _this.zhuzhuangEchartsData.series = []
          res.data.data.forEach((item, index) => {
            _this.zhuzhuangEchartsData.xAxis.push(item.regionName)
            _this.zhuzhuangEchartsData.series.push({
              value: item.complianceRate,
              itemStyle: {
                color: randomHexColor()
              }
            })
          })
          _this.zhuzhuangEchartsData.isShow = true
        }
      })
      function randomHexColor () { // 随机生成十六进制颜色
        var hex = Math.floor(Math.random() * 16777216).toString(16) // 生成ffffff以内16进制数
        while (hex.length < 6) { // while循环判断hex位数，少于6位前面加0凑够6位
          hex = '0' + hex
        }
        return '#' + hex // 返回‘#'开头16进制颜色
      }
    },
    dateZhuzhuangChange (val) {
      this.yearZhuzhuang = val.format('yyyy')
      this.getZhuzhuangEchartsData()
    },
    /** 地表水达标情况 */
    gongnengRateNameFun () {
      let _this = this
      let params = new URLSearchParams()
      params.append('riverCode', '0800010000')
      _this.$axios.get('api/online-monitor-data-share/tEnvYeardataArea/getWaterFeaturesInfo', {params: params}).then((res) => {
        if (res.data.code == 200) {
          console.log(res.data.data, 'gongnengRateName')
          res.data.data.map((item, index) => (item.num = index + 1))
          this.panelData.gongnengRateData = res.data.data.slice(0, 5)
        }
      })
    }
  }
}
</script>

<style>
@import "../../assets/css/RightPanel.css";
.marginB20{
  margin-bottom: 20px;
}
</style>
