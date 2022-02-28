<template>
  <div class="">
    <div class="titleName rowSpace pollutantMain">
      <div>污染物考核排名</div>
      <div class="rowFlex">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="valueYinzi" placeholder="请选择">
          <el-option
            v-for="item in optionsYinzi"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <TableCommon
      class="currentTasks"
      :data = "dataList"
      :dataName="dataListName"></TableCommon>
  </div>
</template>

<script>
import TableCommon from '../../Common/TableCommon'
import {getAqiRanking} from '@/common/api/IntegratedPanel'
import {timeFmtNext, timeFmt, C_TIME} from '@/assets/js/timeFmt.js'
export default {
  name: 'integratedRankWuran',
  components: {TableCommon},
  data () {
    return {
      options: [
        {value: '1', label: '站点'},
        {value: '2', label: '区域'}
      ],
      value: '1',
      optionsYinzi: [
        {value: '1', label: '空气'},
        {value: '2', label: '水'}
      ],
      valueYinzi: '1',
      dataListName: [],
      dataList: []
    }
  },
  methods: {
    initGetAqiRanking () {
      let areaCode = '421200'
      let dateTime = timeFmtNext(new Date(), 0, 'YYYYMM')
      let stationType = this.value
      let type = this.valueYinzi
      getAqiRanking(areaCode, dateTime, stationType, type).then(res => {
        console.log(res)
        if (this.valueYinzi == '1') {
          this.dataListName = [
            // {prop: 'rankingNum', label: '站点排名', type: 'num', width: '60', isCenter: false},
            {prop: 'regionNameOrSiteName', label: '站点排名', type: 'num-name', width: 'auto', isCenter: false},
            {prop: 'rate', label: 'aqi', type: 'prence', width: 'auto', isCenter: true},
            {prop: 'pollutant', label: '污染物', type: 'normal', width: '100', isCenter: true}
          ]
        } else {
          this.dataListName = [
            // {prop: 'rankingNum', label: '站点排名', type: 'num', width: '60', isCenter: false},
            {prop: 'regionNameOrSiteName', label: '站点排名', type: 'num-name', width: 'auto', isCenter: false},
            {prop: 'rate', label: '水质级别', type: 'prence', width: 'auto', isCenter: true},
            {prop: 'pollutant', label: '污染物', type: 'normal', width: '100', isCenter: true}
          ]
        }
        this.dataList = res.data
      })
    }
  },
  watch: {
    value: function () {
      this.initGetAqiRanking()
    },
    valueYinzi: function () {
      this.initGetAqiRanking()
    }
  },
  mounted () {
    this.initGetAqiRanking()
  }
}
</script>

<style scoped>

</style>
