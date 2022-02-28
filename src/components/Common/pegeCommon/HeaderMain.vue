<template>
  <div class="headerMain alginCenter rowSpace">
    <div class="numList rowFlex">
      <div
        class="numListLi rowFlex alginCenter"
        v-for="(item, index) in data"
        :key="index">
        <div :class="item.name" class="iconMain"></div>
        <div class="num">
          {{item.num}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import tianqi from '../../../assets/img/tianqiIcon/duoyun.png'
import {timeFmtNext, timeFmt, C_TIME} from '@/assets/js/timeFmt.js'
export default {
  name: 'HeaderMain',
  data () {
    return {
      weather: {
        monitorTime: timeFmtNext(new Date(), 0, 'YYYY/MM/DD HH:mm:ss'),
        tep: '',
        conditionDay: ''
      },
      tianqiIcon: {
        '晴天': 'qing',
        '多云': 'duoyun',
        '阴': 'yin',
        '阵雪': 'zhenxue',
        '雾': 'wu',
        '浮尘': 'fuchen',
        '霾': 'mai',
        '雷阵雨': 'leizhenyu',
        '冰雹': 'bingbao',
        '雨夹雪': 'yujiaxue',
        '小雨': 'xiaoyu',
        '中雨': 'zhongyu',
        '大雨': 'daxue',
        '暴雨': 'baoyu',
        '小雪': 'xiaoxue',
        '中雪': 'zhongxue',
        '大雪': 'daxue',
        '暴雪': 'baoyu',
        '冻雨': 'dongyu'

      }
    }
  },
  props: {
    data: Array,
    type: String
  },
  methods: {
    getRealTimeAQI () {
      var _this = this
      var url = '/api/online-monitor-data-share/airData/getRealTimeAQI'
      var params = new URLSearchParams()
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            console.log(res.data.data)
            _this.weather.tep = res.data.data.tep
            _this.weather.conditionDay = _this.tianqiIcon[`${res.data.data.conditionDay}`]
            console.log(this.tianqiIcon[`${res.data.data.conditionDay}`])
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
    this.getRealTimeAQI()
  }
}
</script>

<style scoped>

</style>
