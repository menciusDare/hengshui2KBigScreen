<template>
  <div class="backgroundPop marginBottom width75 contrastYear height1150">
    <div class="titleLine">
      <div class="textTitle">
        <span>水质类别同比变化</span>
      </div>
    </div>
    <div class="contrastYearMain">
      <ul class="" style="overflow-y: scroll;height: 980px;">
        <li v-for="(item, index) in contrastYear" :key="index" class="rowSpace alginCenter">
          <span>{{item.name}}</span>
          <div class="typeDiv flexRow">
            <div class="typeBlock" v-for="(item2, index) in new Array(18)" :key="index"
                 :style="{background: item.YearColor}"></div>
          </div>
          <div class="typeDiv flexRow">
            <div class="typeBlock" v-for="(item2, index) in new Array(18)" :key="index"
                 :style="{background: item.lastYearColor}"></div>
          </div>

        </li>
      </ul>
      <div class="year rowSpace">
        <span style="width: 20%;"></span>
        <span class="">{{new Date().format('yyyy年MM月')}}</span>
        <span class="">{{(new Date().getFullYear()-1)+ '年'+ new Date().format('MM') + '月'}}</span>
      </div>
    </div>
    <div class="biaozhu">
      <div v-for="item in Object.values(color)" :style="{background: item}" class=""></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      contrastYear: [],
      // 表柱color
      color: [ '#29C1EA', '#6BBC44', '#E6E64A', '#F0902A', '#E92924'],
      // color:['#34C3F6','#67C51D','#F8C900','#FF9000','#E90E0B'],
      // 水质类别颜色
      score: {
        '1': '#29C1EA', // 一类水
        '2': '#29C1EA', // 二类水
        '3': '#6BBC44', // 三类水
        '4': '#E6E64A', // 四类水
        '5': '#F0902A', // 五类水
        '6': '#E92924' // 劣五类
      },
      // 查询今年日期
      yearDate: new Date().format('yyyyMM'),
      // 查询去年日期
      lastYearDate: (new Date().getFullYear() - 1) + new Date().format('MM')
    }
  },
  mounted () {
    // 查询水质类别同比变化
    this.init()
  },
  methods: {
    colorBlock () {
      this.contrastYear = this.contrastYear.map(
        (item, index) => ({...item, lastYearColor: this.score[item.lastYear], YearColor: this.score[item.nowYear]})
      )
      console.log(this.contrastYear)
    },

    /**
       * 查询水质类别同比变化
       */
    init () {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.contrastYear = _this.AppData.contrastYear_init()
        return
      }
      _this.$axios.get('api/online-monitor-data-share/tEnvMonthdataRiver/getWaterLevelYearOnYearList', {
        params: {
          'lastYearDate': _this.lastYearDate,
          'yearDate': _this.yearDate,
          'riverCode': _this.AppConfig.appInfo.riverCode
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          let data = res.data.data
          _this.contrastYear = data.map(item => {
            let tmp = {
              name: item.riverName,
              lastYear: item.lastFkWaterLevelNow,
              nowYear: item.fkWaterLevelNow,
              lastYearColor: '',
              YearColor: ''
            }
            return tmp
          })
          _this.contrastYear.filter(item => {
            item.lastYearColor = _this.score[item.lastYear]
            item.YearColor = _this.score[item.nowYear]
          })
        }
      }
      )
    }

  }
}
</script>
