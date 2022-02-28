<template>
  <div class="mTop10">
    <table-common
      :data = "quyu"
      class="pop"
      :dataName="dataListName"></table-common>
  </div>
</template>

<script>
import {getHistoryAlarm, alarmDatalist} from '@/common/api/popMain.js'

import TableCommon from '../../TableCommon'
export default {
  name: 'PopHistory',
  components: {TableCommon},
  data () {
    return {
      dataListName: [],
      quyu: []
    }
  },
  props: {
    defaultData: Object,
    type: String
  },
  methods: {
    getStationYinzi () {
      if (this.type === 'water') {
        this.dataListName = [
          {prop: 'alarmTime', label: '排名', type: 'normal', width: 'auto', isCenter: true},
          {prop: 'alarmDescribe', label: '区域', type: 'normal', width: 'auto', isCenter: true},
          {prop: 'typeName', label: '处理率', type: 'normal', width: 'auto', isCenter: true},
          {prop: 'measure', label: '超时率', type: 'normal', width: 'auto', isCenter: true},
          {prop: 'status', label: '整改结果', type: 'normal', width: 'auto', isCenter: true}
        ]
        this.getStationWater()
      } else {
        this.dataListName = [
          {prop: 'time', label: '时间', type: 'normal', width: 'auto', isCenter: true},
          {prop: 'param', label: '参数', type: 'normal', width: 'auto', isCenter: true},
          {prop: 'type', label: '类型', type: 'normal', width: 'auto', isCenter: true},
          {prop: 'value', label: '浓度值', type: 'normal', width: 'auto', isCenter: true}
        ]
        this.getStationAir()
      }
    },
    getStationWater () {
      let pageSize = 10
      let pageNum = 1
      let stationId = this.defaultData.unifiedCode
      this.isShow = false
      getHistoryAlarm(stationId, pageNum, pageSize).then(res => {
        console.log(res.data)
        this.quyu = res.data.list
      })
    },
    getStationAir () {
      let stationId = this.defaultData.unifiedCode
      alarmDatalist(stationId).then(res => {
        console.log(res.data)
      })
    },
    changePollutantTab (code) {
      this.pollutantCode = code
      if (this.type === 'water') {
        this.getStationWater()
      } else {
        this.getStationAir()
      }
    }
  },
  mounted () {
    this.getStationYinzi()
  },
  watch: {
    'defaultData.unifiedCode': function () {
      this.getStationYinzi()
    }
  }
}
</script>

<style scoped>
.mTop10{
  margin-top: 10px;
}
</style>
<style>
.changeTable.el-table.pop th {
  background: #0e2843;
  padding: 10px 0;
}
.changeTable.el-table.pop th .cell{
  font-size: 16px;
  color: #8697a6;
}
</style>
