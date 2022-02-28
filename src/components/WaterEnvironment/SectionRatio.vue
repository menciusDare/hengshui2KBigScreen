<template>
  <div class="backgroundPop width75s marginBottom">
    <div class="titleLine">
      <div class="textTitle">
        <span>断面达标率</span>
      </div>
      <span class="time">{{params.yearDate.slice(0,4) + '.' + params.yearDate.slice(4,6)}}</span>
    </div>
    <div class="sectionRatioMain">
      <ul class="sectionTab rowSpace">
        <li v-for="(item, index) in sectionTab" :key="index" :class="item.id === slectedTab ? 'selected': ''" @click="checkLevel(item.id)" style="cursor: pointer">
          {{item.name}}
        </li>
      </ul>
      <div class="pr">
        <v-chart  class="mainEchars" :options="sectionRatio" />
        <div class="mainEcharsRound">
          <div class="iconWater"></div>
          <strong>{{tableData.total}}</strong>
          <span>断面总数</span>
        </div>
      </div>
      <div class="changetable sectionRatioTable">
        <el-table
        :data="sectionRatioTable"
        max-height="640"
        cell-mouse-enter="handleEdit"
        style="width: 100%">
        <el-table-column
          prop="name"
          align="center"
          width="150"
          label="未达标断面">
        </el-table-column>
        <el-table-column
          prop="fkWaterLevelName"
          width="150"
          align="center"
          label="水质目标" :formatter="fkWaterLevelName">
        </el-table-column>
        <el-table-column
          align="center"
          width="150"
          label="水质现状">
          <template slot-scope="scope">
            <div :class="fkWaterLevelNowNameColor(scope.row.fkWaterLevelNow)">
              {{fkWaterLevelNow(scope.row.fkWaterLevelNow)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="主要污染物">
          <template slot-scope="scope">
              {{pollutantName(scope.row)}}
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
      sectionTab: [
        {name: '全部', id: '0'},
        {name: '国控', id: '1'},
        {name: '省控', id: '2'},
        {name: '市控', id: '3'}
      ],
      slectedTab: '0',
      sectionRatioTable: [
      ],
      sectionRatio: {
        grid: [
          {x: '40%', y: '0%', width: '90%', height: '60%'}
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {d}%',
          textStyle: {
            color: '#BDCAE2',
            fontSize: '24'
          }
        },
        legend: {
          orient: 'horizontal',
          top: 0,
          data: ['达标断面', '未达标断面'],
          textStyle: {
            color: '#BDCAE2',
            fontSize: '24'
          },
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
            radius: ['60%', '70%'],
            label: {
              show: true,
              formatter: '{b}{d}%',
              fontSize: '20',
              color: '#fff'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              lineStyle: {
                width: 3
              }
            },
            data: [],
            left: '0%',
            center: ['55%', '61%']
          }
        ]
      },
      params: {
        cityType: '0',
        yearDate: this.getLastMonth(),
        regionCode: this.AppConfig.appInfo.regionCode
      },
      tableData: {}

    }
  },
  methods: {
    pollutantName (row) {
      let val = ''
      let arr = []
      if (row.pollutantName1 != null && row.pollutantName1 != '') {
        val += row.pollutantName1 + '（' + row.pollutant1Over + '）'
        arr.push(val)
      }
      if (row.pollutantName2 != null && row.pollutantName2 != '') {
        val = ''
        val += row.pollutantName2 + '（' + row.pollutant2Over + '）'
        arr.push(val)
      }
      if (row.pollutantName3 != null && row.pollutantName3 != '') {
        val = ''
        val += row.pollutantName3 + '（' + row.pollutant3Over + '）'
        arr.push(val)
      }
      let s = arr.join(' 、')

      if (s != null && s != '') {
        return s
      } else {
        return '--'
      }
    },
    fkWaterLevelName (row, cell, value) {
      if (value == null || value == '') {
        return '--'
      } else {
        return value + '类'
      }
    },
    fkWaterLevelNowNameColor (value) {
      if (value == '6') {
        return 'red'
      }
      if (value == '5') {
        return 'yellow'
      }
      if (value == '4') {
        return 'orange'
      }
      if (value == '3') {
        return 'lu'
      }
      if (value == '1' || value == '2') {
        return 'blue'
      }
    },
    fkWaterLevelNow (value) {
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
    checkLevel (index) {
      var _this = this
      _this.slectedTab = index
      _this.params.cityType = index
      _this.loadSectionRatio()
      _this.getDataList()
    },
    getDataList () {
      var _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.sectionRatioTable = _this.AppData.sectionRatio_getDataList()
        return
      }
      _this.$axios.get('/api/online-monitor-data-share/tEnvYeardataArea/getSectionFailList', {
        params: _this.params
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.sectionRatioTable = res.data.data
        }
      }).catch(reason => {})
    },
    loadSectionRatio () {
      var _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.tableData = _this.AppData.sectionRatio_loadSectionRatio()
        _this.initLoadSectionRatioEchart()
        return
      }
      _this.$axios.get('/api/online-monitor-data-share/tEnvYeardataArea/getComplianceRate', {
        params: _this.params
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.tableData = res.data.data
          _this.initLoadSectionRatioEchart()
        }
      })
    },

    /**
       * @Author              : yht
       * @Date                : 2020/12/7 11:39 上午
       * @Description         : 断面达标率
       * @UpdateUser          :
       * @UpdateDate          : 2020/12/7 11:39 上午
       * @UpdateDescription   :
       * @Param               : null
       * @return              : null
       */
    initLoadSectionRatioEchart () {
      let _this = this
      let data = [
        {
          value: _this.tableData.complianceTotal,
          name: '达标断面'
        }, {
          value: _this.tableData.notComplianceTotal,
          name: '未达标断面'
        }
      ]
      let color1 = new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0, color: '#5055FF'}, {offset: 1, color: '#007BFF'}])
      let color2 = new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [ {offset: 0, color: '#FF6B4D'}, {offset: 1, color: '#F248A6'}])
      const listColor = {
        '达标断面': color1,
        '未达标断面': color2
      }
      data.forEach(item => {
        const color = listColor[item.name]
        return item.itemStyle = {color}
      })
      _this.sectionRatio.series[0].data = data
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

      let lastYearMonth = year + '' + lastMonth
      return lastYearMonth
    }

  },
  mounted () {
    this.loadSectionRatio()
    this.getDataList()
  }
}
</script>
<style scoped>
  .blue{
    color: #028FFC
  }
  .orange{
    color: #F8C900
  }
</style>
