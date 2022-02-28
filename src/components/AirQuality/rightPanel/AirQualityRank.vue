<template>
  <div class="pollutantMain"  style="height: 100%">
    <div class="titleName rowSpace">
      <span>空气质量考核排名</span>
      <div class="rowFlex">
        <el-select v-model="timeType" placeholder="请选择" @change="getAreaAndStationRanking">
          <el-option label="日" value="1"></el-option>
          <el-option label="月" value="2"></el-option>
          <el-option label="年" value="3"></el-option>
        </el-select>
        <el-select v-model="divisorType" placeholder="请选择" @change="getAreaAndStationRanking">
          <el-option label="AQI" value="AQI"></el-option>
          <el-option label="PMI" value="PMI"></el-option>
        </el-select>
      </div>
    </div>
    <div style="height: calc(100% - 40px)">
      <TableCommon
        class="height50"
        v-if="divisorType"
        :data = "dataList"
        :dataName="heliuTableName"></TableCommon>
      <TableCommon
        class="height50"
        :data = "dataList2"
        v-if="divisorType"
        :dataName="heliuTableName1"></TableCommon>
    </div>
  </div>
</template>

<script>
import TableCommon from '@/components/Common/TableCommon'
export default {
  name: 'AirQualityRank',
  data () {
    return {
      dataList: [
        {
          name: '咸宁市',
          rate: '98',
          id: 'zhexian1',
          wuran: 'PM2.5',
          num: '1'
        }, {
          name: '咸安区',
          rate: '98',
          id: 'zhexian2',
          wuran: 'PM2.5',
          num: '2'
        }, {
          name: '赤壁县',
          rate: '98',
          id: 'zhexian3',
          wuran: 'PM2.5',
          num: '3'
        },
        {
          name: '咸宁市',
          rate: '98',
          id: 'zhexian1',
          wuran: 'PM2.5',
          num: '1'
        }, {
          name: '咸安区',
          rate: '98',
          id: 'zhexian2',
          wuran: 'PM2.5',
          num: '2'
        }, {
          name: '赤壁县',
          rate: '98',
          id: 'zhexian3',
          wuran: 'PM2.5',
          num: '3'
        }
      ],
      dataList2: [
        {
          name: '咸宁市',
          rate: '98',
          id: 'zhexian1',
          wuran: 'PM2.5',
          num: '1'
        }, {
          name: '咸安区',
          rate: '98',
          id: 'zhexian2',
          wuran: 'PM2.5',
          num: '2'
        }, {
          name: '赤壁县',
          rate: '98',
          id: 'zhexian3',
          wuran: 'PM2.5',
          num: '3'
        },
        {
          name: '咸宁市',
          rate: '98',
          id: 'zhexian1',
          wuran: 'PM2.5',
          num: '1'
        }, {
          name: '咸安区',
          rate: '98',
          id: 'zhexian2',
          wuran: 'PM2.5',
          num: '2'
        }, {
          name: '赤壁县',
          rate: '98',
          id: 'zhexian3',
          wuran: 'PM2.5',
          num: '3'
        }
      ],
      heliuTableName: [],
      heliuTableName1: [],
      timeType: '1',
      divisorType: 'AQI'
    }
  },
  components: {
    TableCommon
  },
  mounted () {
    this.getAreaAndStationRanking()
  },
  methods: {
    getAreaAndStationRanking () {
      this.changeLabel()
      var _this = this
      var url = '/api/online-monitor-data-share/rank/getAreaAndStationRanking'
      var params = new URLSearchParams()
      params.append('divisorType', _this.divisorType)
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      params.append('timeType', _this.timeType)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            res.data.data.areaRank.map(item => (item.rate = parseInt(item.rate)))
            res.data.data.stationRank.map(item => (item.rate = parseInt(item.rate)))
            _this.dataList = res.data.data.areaRank
            _this.dataList2 = res.data.data.stationRank
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    },
    changeLabel () {
      this.heliuTableName = [
        {prop: 'name', label: '区域排名', type: 'rank-name', width: 'auto', isCenter: false, isRank: true},
        {prop: 'rate', label: this.divisorType, type: 'prence', width: '190', isCenter: true},
        {prop: 'wuran', label: '首要污染物', type: 'normal', width: '120', isCenter: true}
      ]
      this.heliuTableName1 = [
        {prop: 'name', label: '站点排名', type: 'rank-name', width: 'auto', isCenter: false, isRank: true},
        {prop: 'rate', label: this.divisorType, type: 'prence', width: '190', isCenter: true},
        {prop: 'wuran', label: '首要污染物', type: 'normal', width: '120', isCenter: true}
      ]
    }
  }
}
</script>

<style scoped>
.height50{
  height: 50%;
}
</style>
