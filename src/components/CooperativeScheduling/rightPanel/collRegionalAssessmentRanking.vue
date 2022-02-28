<template>
  <div class="collRegionalAssessmentRanking">
    <div class="titleName">区域考核排名</div>
    <div class="assessmentRankingMain">
      <TableCommon
        class="collRegionalAssessmentTable"
        :data = "dataList2"
        :dataName="dataListName"></TableCommon>
    </div>
  </div>
</template>

<script>
import TableCommon from '../../Common/TableCommon'
import {getAssessmentRanking} from '@/common/api/cooperativeScheduling.js'

export default {
  name: 'collRegionalAssessmentRanking',
  components: {TableCommon},
  data () {
    return {
      dataList2: [
        // {
        //   regions: '咸安区',
        //   wanchengRate: '98',
        //   wancheng: '238',
        //   count: '241',
        //   chaoshi: '0%',
        //   bingId: 'assessmentRankingMain'
        // },
        // {
        //   regions: '咸安区',
        //   wanchengRate: '98',
        //   wancheng: '238',
        //   count: '240',
        //   chaoshi: '0%',
        //   bingId: 'assessmentRankingMain1'
        // },
        // {
        //   regions: '咸安区',
        //   wanchengRate: '40',
        //   wancheng: '238',
        //   count: '240',
        //   chaoshi: '0%',
        //   bingId: 'assessmentRankingMain3'
        // },
        // {
        //   regions: '咸安区',
        //   wanchengRate: '40',
        //   wancheng: '238',
        //   count: '240',
        //   chaoshi: '0%',
        //   bingId: 'assessmentRankingMain5'
        // },
        // {
        //   regions: '咸安区',
        //   wanchengRate: '40',
        //   wancheng: '238',
        //   count: '240',
        //   chaoshi: '0%',
        //   bingId: 'assessmentRankingMain6'
        // },
        // {
        //   regions: '咸安区',
        //   wanchengRate: '40',
        //   wancheng: '238',
        //   count: '240',
        //   chaoshi: '0%',
        //   bingId: 'assessmentRankingMain7'
        // }
      ],
      dataListName: [
        {prop: 'rowNum', label: '排名', type: 'num', width: '60', isCenter: true, isRank: true},
        {prop: 'regionName', label: '区域', type: 'normal', width: '155', isCenter: true},
        {prop: 'completeCount', label: '完成率/ 已完成 / 总数', type: 'bing-wancheng', width: '230', isCenter: true},
        {prop: 'timeOutRate', label: '超时', type: 'normal', width: 'auto', isCenter: true, isColor: true, color: 'rgba(82, 110, 228, 1)'}
      ]
    }
  },
  created () {
    this.loadingData()
  },
  methods: {
    loadingData () {
      getAssessmentRanking(2).then(res => {
        if (res.code == 0) {
          this.dataList2 = res.data
          console.log(res.data, 'res.datares.datares.data')
          res.data.map((item, index) => item.id = `getAssessmentRanking${index}`)
          if (this.dataList2 != null && this.dataList2.length > 0) {
            for (let i of this.dataList2) {
              i.timeOutRate = i.timeOutRate + '%'
            }
          }
        }
      })
    }
  }
}
</script>

<style>
.collRegionalAssessmentTable.changeTable.el-table td{
  padding: 8px 0;
}
</style>
