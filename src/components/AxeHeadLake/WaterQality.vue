<template>
  <div class="backgroundPop width75 marginBottom qalityTarget height1150">
    <div class="qality">
      <div class="titleLine">
        <div class="textTitle">
          <span>水质情况</span>
        </div>
        <span class="time">{{params.yearDate.slice(0,4) + '.' +params.yearDate.slice(4,6)}}</span>
      </div>
      <div class="qalityMain">
        <div class="qalityTab rowSpace marginTop26">
          <div
            class="qalityTabLi"
            v-for="(item, index) in qalityTab"
            :key ="index"
            :class="item.id === qalitySelected ? 'seletecd' : ''"
            @click="loadSituationEcharsPin(index,item.id)"
            >
              {{item.name}}
          </div>
        </div>
        <div class="rowCenter alginCenter">
          <div class="lineList flexRow alginCenter mR20">
            <span>水质现状：</span>
            <strong v-if="fkWaterlevelnow && fkWaterlevelnow>0" class="bgRed padding10" :style="'background:'+ color[fkWaterlevelnow]" >{{getWaterLever(fkWaterlevelnow)}}</strong>
            <strong v-else class="bgRed padding10" style="background: none">--</strong>
          </div>
          <span>主要污染物：{{pollutantNames}}</span>
        </div>
        <div id="qalityTargetEchars">
          <v-chart  :options="qualityPolar"  style="width: 100%; height: 100%;"/>
        </div>
      </div>
    </div>
    <div class="target">
      <div class="titleLine">
        <div class="textTitle">
          <span>水质目标</span>
        </div>
        <span class="time">{{yearStart}} - {{yearEnd}}</span>
      </div>
      <div class="targetCon marginTop26">
        <div class="qalityTab rowSpace">
          <div
            class="qalityTabLi swiper-slide"
            v-for="(item, index) in qalityTab"
            :key ="index"
            :class="item.id === targetSelected ? 'seletecd' : ''"
            @click="changeTarget(item.id,index)"
            >
              {{item.name}}
          </div>
        </div>
        <div class="targetTabMain" >
          <div class="qulityTabLine flexRow">
            <div class="lineList flexRow">
              <span>水质目标：</span>
              <strong class="yellowTarge">{{targetTabMain.mubiao}}</strong>
            </div>
            <div class="lineList flexRow  marginLeft106">
              <span>水质现状：</span>
              <strong v-if="targetTabMain.state && targetTabMain.state>0" class="luTarge" :style="'background:'+ color[targetTabMain.state]" >{{level[targetTabMain.state]}}</strong>
              <strong v-else class="luTarge" style="background: none">--</strong>
            </div>
          </div>
          <div class="itemTabMain">
            <!-- 湖水切换 -->
            <div class="swiperTab" >
              <swiper :options="swiperOption" v-if="qalityTabMainData.length">
                <!-- slides -->
                <swiper-slide
                  class="itemLi"
                  v-for ="(item,index) in qalityTabMainData"
                  :key ="item.sectionName"
                  :class = "index == ListMainSelected ? 'selected' : 'fff'">
                  <div @click = "getTable(index)">
                    {{item.sectionName}}
                  </div>
                </swiper-slide>
              </swiper>
              <div v-if="qalityTabMainData.length>2">
                <div class="swiper-button-prev swiperPrev alginCenter rowCenter" slot="button-prev">
                  <i class="el-icon-arrow-left"></i>
                </div>
                <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
                <div class="swiper-button-next swiperNext alginCenter rowCenter" slot="button-next">
                  <i class="el-icon-arrow-right"></i>
                </div>
                <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
              </div>
            </div>
            <div
              v-for ="(item,index) in ListMain"
              :key ="item.sectionCode">
              <div class="itemListIntord rowSpace">
                <span class="rowSpace alginCenter"><i class="mubiao"></i>目标{{ getWaterLever(item.waterLever)}}</span>
                <span>{{item.isStandards==true?'达标':'未达标'}}</span>
              </div>
              <div class="changetable PollutionTable marginTop26">
                <el-table
                  :data="item.items"
                  cell-mouse-enter="handleEdit"
                  max-height="255"
                  style="width: 100%">
                  <el-table-column
                    prop="pollutantName"
                    align="left"
                    label="指标">
                  </el-table-column>
                  <el-table-column
                    prop="targetPrice"
                    align="center"
                    label="目标值">
                  </el-table-column>
                  <el-table-column prop="monthPriceAvg" align="center" label="累计均值">
                    <template slot-scope="scope">
                      <div v-if="scope.row.monthPriceAvg != 0">
                        <span v-if="scope.row.monthPriceAvg == scope.row.targetPrice " style="color: #FFBC00;border-radius: 5px;font-weight: 500;">{{scope.row.monthPriceAvg}}</span>
                        <span v-if="scope.row.monthPriceAvg > scope.row.targetPrice "  style="color: #E92924;border-radius: 5px;font-weight: 500;">{{scope.row.monthPriceAvg}}</span>
                        <span v-if="scope.row.monthPriceAvg < scope.row.targetPrice "  style="color: #42E977;border-radius: 5px;font-weight: 500;">{{scope.row.monthPriceAvg}}</span>
                      </div>
                      <div v-else>
                        <span> -- </span>
                      </div>

                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="surplusControl"
                    align="center" :formatter="surplusControl"
                    label="剩余控制">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      qalityTab: this.AppConfig.axeLke,
      qalitySelected: 'huxin',
      targetSelected: 'huxin',
      ListMainSelected: '0',
      ListMain: [],
      // qualityPolar ---- 水质情况
      qualityPolar: {
        grid: [
          {x: '20%', y: '15%', width: '90%', height: '75%'}
        ],
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b}: {c}天',
          formatter: '{b}: {d}%',
          textStyle: {
            color: '#BDCAE2',
            fontSize: '24'
          }
        },
        legend: {
          orient: 'vertical',
          top: 20,
          right: 60,
          data: ['I-II类', 'III类', 'IV类', 'V类', '劣V类'],
          textStyle: {
            color: '#BDCAE2',
            fontSize: '24'
          },
          icon: 'circle',
          formatter: function (name) {
            return name
          }
        },
        series: [
          {
            type: 'pie',
            roundCap: true, // 可选项为1和2，不填则采用原有拼接方式
            // coordinateSystem: 'polar',
            name: 'AQI',
            radius: ['55%', '70%'],
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: [],
            left: '0%',
            center: ['35%', '50%']
          }]
      },
      // 水质目标
      targetTabMain: {},
      qalityTabMain: {
      },
      year: new Date().format('yyyy'),
      yearEnd: new Date().format('yyyy.MM'),
      yearStart: new Date().format('yyyy') + '.01',
      regionCode: this.AppConfig.appInfo.regionCode,
      qalityTabMainData: [
        {name: 'ccccnc', value: '0'},
        {name: 'dddddd', value: '1'},
        {name: 'ccccnc', value: '2'},
        {name: 'ddddd', value: '3'},
        {name: 'ccccnddddc', value: '4'},
        {name: 'ddddd', value: '5'},
        {name: 'ccccndddc', value: '6'},
        {name: 'ddddd', value: '7'}
      ],
      params: {
        yearDate: this.getLastMonth(),
        regionCode: this.AppConfig.appInfo.riverCode,
        sectionCode: []
      },
      dataPin: {},
      color: [ '', '#29C1EA', '#29C1EA', '#6BBC44', '#E6E64A', '#F0902A', '#E92924'],
      level: [ '', 'Ⅰ类', 'Ⅱ类', 'Ⅲ类', 'Ⅳ类', 'Ⅴ类', '劣Ⅴ类'],
      waterInfoStartTime: '',
      waterInfoEndTime: '',
      // 水质情况 - 首要污染物
      pollutantNames: '--',
      // 水质情况 - 水质现状
      fkWaterlevelnow: '',
      mySwiper: '',
      tabSelected: '',
      swiperOption: {
        loop: false,
        slidesPerView: 2, // 每页展示几个
        slidesPerGroup: 2,
        observer: true, // 动态检查器,自动初始化swiper,默认为false
        observerParents: true, // 将observe应用于Swiper的父元素.当Swiper的父元素变化时,Swiper更新.如window.resize.
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next'

        // navigation: {
        // },
      }
    }
  },
  mounted () {
    this.loadSituationEcharsPin(0, 'huxin')
    this.changeTarget(this.targetSelected, 0)
    // setTimeout(() => {$('.mySwiper').css("transform","translate3d(0,0,0)")}, 50)
  },
  methods: {
    // 水质目标 --- 切换
    changeTarget (id, index) {
      this.targetSelected = id
      this.targetTabMain = this.qalityTab[index].targetTabMain
      this.changeListMain(index)
      this.getWaterLevelNow(index)
    },
    changeListMain (index) {
      // this.ListMainSelected = index;
      // this.ListMain = this.qalityTabMain[this.targetSelected].listTab.filter(item =>  item.id === 'huxin' )
      // console.log(this.ListMain)
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.qalityTabMainData = _this.AppData.waterQality_changeListMain()
        _this.ListMainSelected = 0
        _this.getTable(_this.ListMainSelected)
        return
      }
      _this.qalityTabMainData = []
      _this.ListMain = []
      let params = new URLSearchParams()
      // params.append("page", cur_page);
      // params.append("limit", cur_pageSize);
      params.append('year', _this.year)
      params.append('regionCode', _this.regionCode)
      params.append('sectionCode', _this.qalityTab[index].apiParams)
      _this.$axios.post('/api/online-monitor-data-share/waterQuality/getWaterSectionAnnualTargetList', params).then(function (res) {
        if (res.data.code == 200) {
          _this.qalityTabMainData = res.data.data.records
          _this.ListMainSelected = 0
          _this.getTable(_this.ListMainSelected)
        }
      }).catch(reason => {})
    },
    getTable (index) {
      this.ListMain = []
      this.ListMainSelected = index
      this.ListMain.push(this.qalityTabMainData[index])
      console.info(this.ListMain)
    },
    getWaterLever (value) {
      if (value == '' || value == null) {
        return '--'
      } else {
        if (value == '6') {
          return '劣Ⅴ类'
        }
        if (value == '5') {
          return 'Ⅴ类'
        }
        if (value == '4') {
          return 'Ⅳ类'
        }
        if (value == '3') {
          return 'Ⅲ类'
        }
        if (value == '2') {
          return 'Ⅱ类'
        }
        if (value == '1') {
          return 'Ⅰ类'
        }
      }
    },
    surplusControl (row, cell, value) {
      if (value < 0) {
        return 0
      } else {
        return value
      }
    },
    // 水质情况---饼图
    loadSituationEcharsPin (index, id) {
      let _this = this
      if (this.AppData.dataFlag) {
        // 演示数据
        _this.getWaterInfo(index)
        _this.dataPin = _this.AppData.waterQality_loadSituationEcharsPin()
        _this.initloadSituationEchars()
        _this.qalitySelected = id
        return
      }
      _this.getWaterInfo(index)
      _this.qalitySelected = id
      _this.params['sectionCode'] = _this.qalityTab[index].apiParams.toString()
      _this.$axios.get('/api/online-monitor-data-share/tEnvYeardataArea/getWaterStatusQuo', {
        params: _this.params
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.dataPin = res.data.data[0]
          _this.initloadSituationEchars()
        }
      }).catch(reason => {})
    },

    initloadSituationEchars () {
      let _this = this
      let data = [
        {value: (_this.dataPin.oneCategory + _this.dataPin.twoCategory), name: 'I-II类'},
        {value: _this.dataPin.threeCategory, name: 'III类'},
        {value: _this.dataPin.fourCategory, name: '劣V类'},
        {value: _this.dataPin.fiveCategory, name: 'V类'},
        {value: _this.dataPin.badFiveCategory, name: 'IV类'}
      ]
      const listColor = {
        'I-II类': '#028FFC',
        'III类': '#67C51D',
        'IV类': '#F8C900',
        'V类': '#F19D38',
        '劣V类': '#EA3522'
      }
      console.log(listColor['劣V类'])
      data.forEach(item => {
        const color = listColor[item.name]
        return item.itemStyle = {color}
      })
      let total = data.reduce((a, b) => {
        return a + b.value * 1
      }, 0)
      _this.qualityPolar.legend = {
        show: true,
        orient: 'vertical',
        top: '20',
        right: '100',
        data: ['I-II类', 'III类', 'IV类', 'V类', '劣V类'],
        textStyle: {
          color: '#BDCAE2',
          fontSize: '24'
        },
        formatter: (name) => {
          let res = data.filter(item => item.name === name)
          let percent = 0
          if (total != 0) {
            percent = (res[0].value * 100 / total).toFixed(2)
          }
          return `${name}   ${percent}% `
        }
      }
      _this.qualityPolar.series[0].data = data
    },

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

      var new_date = new Date(year, lastMonth, 1)
      var lastDate = new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate()

      this.waterInfoStartTime = year + '' + lastMonth
      this.waterInfoEndTime = year + '' + lastMonth

      let lastYearMonth = year + '' + lastMonth
      return lastYearMonth
    },

    /**
       * @Author              : yht
       * @Date                : 2020/11/20 5:32 下午
       * @Description         : 获取水质情况，水质现状与首要污染物
       * @UpdateUser          :
       * @UpdateDate          : 2020/11/20 5:32 下午
       * @UpdateDescription   : 获取水质情况，水质现状与首要污染物
       * @Param               : index 斧头湖流域数组下标
       * @return              : null
       */
    getWaterInfo (index) {
      let _this = this

      if (_this.AppData.dataFlag) {
        // 演示数据
        let data = _this.AppData.waterQality_getWaterLevelNow()
        let arr = []
        arr.push(data.fkPollutantid1Name)
        arr.push(data.fkPollutantid2Name)
        arr.push(data.fkPollutantid3Name)
        _this.pollutantNames = arr.slice(',').toString()
        _this.fkWaterlevelnow = data.fkWaterlevelnow
        return
      }

      _this.pollutantNames = '--'
      _this.getLastMonth()
      let reachIds = _this.AppConfig.axeLke[index].apiParams.join(',')
      _this.$axios.get('/api/online-monitor-data-share/waterQuality/getWaterQualityGoalsByParams', {
        params: {
          startTime: _this.waterInfoStartTime,
          endTime: _this.waterInfoEndTime,
          reachIds: reachIds
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          if (res.data.data) {
            let arr = []
            arr.push(res.data.data.fkPollutantid1Name)
            arr.push(res.data.data.fkPollutantid2Name)
            arr.push(res.data.data.fkPollutantid3Name)
            _this.pollutantNames = arr.slice(',').toString()
            _this.fkWaterlevelnow = res.data.data.fkWaterlevelnow
          }
        }
      })
    },

    /**
       * @Author              : yht
       * @Date                : 2020/11/20 5:35 下午
       * @Description         : 获取水质目标，水质现状
       * @UpdateUser          :
       * @UpdateDate          : 2020/11/20 5:35 下午
       * @UpdateDescription   :
       * @Param               : index 斧头湖流域数组下标
       * @return              : null
       */
    getWaterLevelNow (index) {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        let data = _this.AppData.waterQality_getWaterLevelNow()
        _this.targetTabMain.state = data.fkWaterlevelnow
        return
      }
      let reachIds = _this.AppConfig.axeLke[index].apiParams.join(',')
      _this.$axios.get('/api/online-monitor-data-share/waterQuality/getWaterQualityGoalsByParams', {
        params: {
          startTime: new Date().getFullYear() + '01',
          endTime: new Date().format('yyyyMM'),
          reachIds: reachIds
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.targetTabMain.state = res.data.data.fkWaterlevelnow
        }
      })
    }
  }
}
</script>
