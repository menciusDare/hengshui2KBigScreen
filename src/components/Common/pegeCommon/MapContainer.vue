<template>
<div class="mapMain waterEnvironMap rowFlex flexColumn">
  <HeaderMain :data="numList"></HeaderMain>
</div>
</template>

<script>
import HeaderMain from './HeaderMain'
export default {
  name: 'MapContainer',
  components: {HeaderMain},
  data () {
    return {
      numList: [
        // 超标
        {name: 'warn1', num: '2'},
        // 预警
        {name: 'warn2', num: '14'},
        // 正常
        {name: 'warn3', num: '14'}
      ]
    }
  },
  methods: {
    // 站点报警展示
    getStationAlarmStatistic () {
      var _this = this
      var url = '/api/online-monitor-data-share/airStation/getStationAlarmStatistic'
      var params = new URLSearchParams()
      params.append('regionCode', _this.regionCode)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status === 200) {
            let stationNum = res.data.data
            _this.numList[0].num = stationNum.alarmStationNum
            _this.numList[1].num = stationNum.toAlarmStationNum
            _this.numList[2].num = stationNum.normalStationNum
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
   // this.getStationAlarmStatistic()
  },
  props: {
    type: String
  }
}
</script>

<style>
@import "../../../assets/css/CenterMain.css";
</style>
