<template>
  <div class="">
    <div class="titleName rowSpace pollutantMain">
      <div>当前协同任务</div>
      <div class="rowFlex">
        <!-- <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> -->
        <el-select v-model="valueYinzi" @change="loadingData" placeholder="请选择">
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
      :data = "dataList2"
      :dataName="dataListName"></TableCommon>
  </div>
</template>

<script>
import TableCommon from '../../Common/TableCommon'
import {getCurrentTask} from '@/common/api/cooperativeScheduling.js'

export default {
  name: 'CurrentTasksCollaborators',
  components: {TableCommon},
  data () {
    return {
      options: [
        {
          label: '站点',
          value: 'zhandian'
        }
      ],
      value: 'zhandian',
      optionsYinzi: [
        {
          label: '空气',
          value: 2
        },
        {
          label: '水',
          value: 3
        }
      ],
      valueYinzi: 2,
      dataList2: [
        {
          taskName: 'XX河道垃圾清理',
          createTime: '2019/08/20 08:00',
          taskStatus: '已超时',
          num: '1'
        }
        // {
        //   name: 'XX河道垃圾清理',
        //   times: '2019/08/20 08:00',
        //   status: '待处理',
        //   num: '2'
        // },
        // {
        //   name: 'XX河道垃圾清理',
        //   times: '2019/08/20 08:00',
        //   status: '排查中',
        //   num: '3'
        // },
        // {
        //   name: 'XX河道垃圾清理',
        //   times: '2019/08/20 08:00',
        //   status: '排查中',
        //   num: '4'
        // },
        // {
        //   name: 'XX河道垃圾清理',
        //   times: '2019/08/20 08:00',
        //   status: '排查中',
        //   num: '5'
        // },
        // {
        //   name: 'XX河道垃圾清理',
        //   times: '2019/08/20 08:00',
        //   status: '排查中',
        //   num: '5'
        // }
      ],
      dataListName: [
        {prop: 'rouNum', label: '序号', type: 'index', width: '60', isCenter: false},
        {prop: 'taskName', label: '任务', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'createTime', label: '发布时间', type: 'normal', width: 'auto', isCenter: false},
        {prop: 'taskStatus', label: '状态', type: 'status', width: '130', isCenter: true}
      ]
    }
  },
  created () {
    this.loadingData()
  },
  methods: {
    loadingData () {
      getCurrentTask(1, 6, this.valueYinzi).then(res => {
        if (res.code == 0) {
          this.dataList2 = res.data.records
        }
      })
    }
  }
}
</script>

<style>
.changeTable.el-table.currentTasks td{
  padding: 5px 0;
}
.currentTasks{
 margin-top: 13px;
}
</style>
