<template>
  <div class="">
    <div class="titleName marginB20">AQI等级分布占比</div>
    <TableCommon
      class="gongneng"
      :data = "levelMain"
      :dataName= "nameList" v-if="isShow"></TableCommon>
  </div>
</template>

<script>
import TableCommon from '../../Common/TableCommon'

export default {
  name: 'LevelPrence',
  data () {
    return {
      isShow: false,
      levelMain: [
        {
          level: '严重污染',
          rate: '33',
          data: '30',
          id: 'level1'
        },
        {
          level: '重度污染',
          rate: '98',
          data: '15',
          id: 'level2'
        },
        {
          level: '中度污染',
          rate: '98',
          data: '120',
          id: 'level3'
        },
        {
          level: '轻度污染',
          rate: '98',
          data: '15',
          id: 'level4'
        },
        {
          level: '优良',
          rate: '98',
          data: '15',
          id: 'level5'
        }
      ],
      nameList: [
        {prop: 'level', label: '污染等级', type: 'normal-num', width: '228px', isCenter: false},
        {prop: 'rate', label: '占比（年）', type: 'bing', width: 'auto', isCenter: false},
        {prop: 'data', label: '天数', type: 'normal', width: 'auto', isCenter: true}
      ]
    }
  },
  components: {
    TableCommon
  },
  mounted () {
    this.getAQILevelProportion()
  },
  methods: {
    getAQILevelProportion () {
      var _this = this
      var url = '/api/online-monitor-data-share/airData/getYearlyAqi'
      var params = new URLSearchParams()
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            res.data.data.map((item, index) => item.num = index)
            _this.levelMain = res.data.data
            _this.isShow = true
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
.marginB20{
  margin-bottom: 20px;
}
</style>
