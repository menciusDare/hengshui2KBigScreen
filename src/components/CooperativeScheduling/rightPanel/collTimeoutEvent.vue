<template>
  <div class="collTimeoutEvent">
    <div class="titleName rowSpace">
      <div>超时事件</div>
      <div>第一页</div>
    </div>
    <div class="collTimeoutMain">
      <TableCommon
        class="collTime"
        :data = "dataList2"
        :dataName="dataListName"></TableCommon>
    </div>
  </div>
</template>

<script>

import TableCommon from '../../Common/TableCommon'
import {timeOutTask} from '@/common/api/cooperativeScheduling.js'

export default {
  name: 'collTimeoutEvent',
  components: {TableCommon},
  data () {
    return {
      dataList2: [
        {
          name: '区域1工厂巡查',
          times: '2019/08/20 08:00',
          yaoqiu: '区域1工厂巡查'
        }
        // {
        //   name: '区域1工厂巡查',
        //   times: '2019/08/20 08:00',
        //   yaoqiu: '区域1工厂巡查'
        // },
        // {
        //   name: '区域1工厂巡查',
        //   times: '2019/08/20 08:00',
        //   yaoqiu: '区域1工厂巡查'
        // },
        // {
        //   name: '区域1工厂巡查',
        //   times: '2019/08/20 08:00',
        //   yaoqiu: '区域1工厂巡查'
        // },
        // {
        //   name: '区域1工厂巡查',
        //   times: '2019/08/20 08:00',
        //   yaoqiu: '区域1工厂巡查'
        // },
        // {
        //   name: '区域1工厂巡查',
        //   times: '2019/08/20 08:00',
        //   yaoqiu: '区域1工厂巡查'
        // }

      ],
      dataListName: [
        {prop: 'taskExplain', label: '要求', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'unitName', label: '整改对象', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'completeDate', label: '截止时间', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'caozuo',
          label: '操作',
          type: 'caozuo',
          width: '100',
          isCenter: false,
          isChildren: [
            {name: '催办', Fun: 'cunBanFun'},
            {name: '详细', Fun: 'detailFun'}
          ]
        }
      ]
    }
  },
  created () {
    this.loadingData()
  },
  methods: {
    loadingData () {
      timeOutTask(1, 6).then(res => {
        if (res.code == 0) {
          this.dataList2 = res.data.records
        }
      })
    }
  }
}
</script>

<style>
.collTimeoutEvent{
  width: 100%;
  height: 100%;
}
.collTimeoutMain{
  height: calc(100% - 33px);
}
.changeTable.el-table.collTime td .cell{
  font-size: 16px;
}
</style>
