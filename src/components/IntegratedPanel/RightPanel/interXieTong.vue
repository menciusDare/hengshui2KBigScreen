<template>
  <div class="interXieTong">
    <div class="rowSpace pollutantMain">
      <div class="titleName">协同管控</div>
      <div class="rowFlex">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="flexColumn rowSpace interXieTongCon">
      <TableCommon
        v-if="isShow"
        class="currentTasks"
        :data = "quyu"
        :dataName="dataListNameQuYu"></TableCommon>
      <TableCommon
        v-if="isShow2"
        class="currentTasks"
        :data = "bumen"
        :dataName="dataListNameBumen"></TableCommon>
      <TableCommon
        v-if="isShow3"
        class="currentTasks"
        :data = "bumen2"
        :dataName="dataListNameBumen2"></TableCommon>
    </div>
  </div>
</template>

<script>
import TableCommon from '../../Common/TableCommon'
import {getAssessmentRanking, getCollaborativeControlByDept, getUnsolvedProblemByDept} from '@/common/api/IntegratedPanel'

export default {
  name: 'interXieTong',
  data () {
    return {
      value: '2',
      options: [
        {label: '空气', value: '2'},
        {label: '水', value: '3'}
      ],
      quyu: [],
      dataListNameQuYu: [
        {prop: 'rowNum', label: '排名', type: 'index', width: '60', isCenter: false},
        {prop: 'regionName', label: '区域', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'dealWithRate', label: '处理率', type: 'bing', width: 'auto', isCenter: true},
        {prop: 'timeOutRate', label: '超时率', type: 'normal', width: '130', isCenter: true, isRate: true}
      ],
      isShow: false,
      isShow2: false,
      isShow3: false,
      bumen: [],
      dataListNameBumen: [
        {prop: 'dealWithRate', label: '排名', type: 'index', width: '60', isCenter: false},
        {prop: 'deptName', label: '部门', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'dealWithRate', label: '处理率', type: 'bing', width: 'auto', isCenter: true},
        {prop: 'timeOutRate', label: '超时率', type: 'normal', width: '130', isCenter: true, isRate: true}
      ],
      bumen2: [],
      dataListNameBumen2: [
        {prop: 'deptName', label: '部门', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'unsolvedCount', label: '问题/未解决', type: 'prence', width: '218', isCenter: false, isTrue: false},
        {prop: 'totalCount', label: '', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'ylist', label: '趋势', type: 'zhexian', width: '160', isCenter: true, isRate: true}
      ]
    }
  },
  components: {
    TableCommon
  },
  methods: {
    initData () {
      getAssessmentRanking(this.value).then(res => {
        res.data.map((item, index) => item.id = `xietong${index}`)
        this.quyu = res.data
        this.isShow = true
      })
      getCollaborativeControlByDept(this.value).then(res => {
        res.data.map((item, index) => item.id = `dataListNameBumen${index}`)
        this.bumen = res.data
        this.isShow2 = true
      })
      getUnsolvedProblemByDept(this.value).then(res => {
        res.data.map((item, index) => item.id = `interZheXian${index}`)
        this.bumen2 = res.data
        this.isShow3 = true
      })
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style scoped>
.interXieTong{
  width: 100%;
  height: 100%;
}
.interXieTongCon{
  height: calc(100% - 40px);
  width: 100%;
}
</style>
