<template>
  <div >
    <div class="titleName">首要污染物天数占比排名（年）</div>
    <div class="rowSpace">
      <div
        class="dayList rowSpace flexColumn"
        v-for="(item, index) in  dayList"
        :key="index">
        <div class="name">{{item.name}}</div>
        <div :style="{color: color[`${item.level}`]}" class="rowFlex alginEnd"><div class="num">{{item.num}}</div><div>%</div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'levelRank',
  data () {
    return {
      dayList: [
        {
          name: 'PM2.5',
          num: '60',
          level: '严重污染'
        },
        {
          name: 'PM10',
          num: '10',
          level: '重度污染'
        },
        {
          name: 'NO2',
          num: '8.8',
          level: '严重污染'
        },
        {
          name: 'SO2',
          num: '6.0',
          level: '严重污染'
        },
        {
          name: 'CO',
          num: '3.3',
          level: '严重污染'
        }
      ],
      color: {
        '严重污染': 'rgba(182, 32, 224)',
        '重度污染': 'rgba(224, 32, 32)',
        '中度污染': 'rgba(247, 181, 0)',
        '轻度污染': 'rgba(50, 197, 255)',
        '优良': 'rgba(109, 212, 0)'
      }
    }
  },
  mounted () {
    this.getPollutantProportionDays()
  },
  methods: {
    getPollutantProportionDays () {
      var _this = this
      var url = '/api/online-monitor-data-share/TEnvDaydataAreaAir/getPollutantProportionDays'
      var params = new URLSearchParams()
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            _this.dayList = res.data.data
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.dayList{
  width: 19.6%;
  padding: 17px;
  box-sizing: border-box;
  height: 103px;
  background: rgba(169, 168, 239, .2);
  border-radius: 14px;
  margin-top: 20px;
}
.dayList .name{
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
}
.dayList .num{
  font-size: 30px;
}
</style>
