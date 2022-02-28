<template>
  <div class="backgroundPop marginBottom currentTask ">
    <div class="titleLine">
      <div class="textTitle">
        <span>当前协同任务</span>
      </div>
    </div>
    <div class="changetable currentTable">
      <el-table
      :data="currentTable"
      cell-mouse-enter="handleEdit"
      max-height="1002"
      style="width: 100%">
      <el-table-column
        prop="num"
        align="center"
        label="序号">
        <template slot-scope="scope">
          <div v-if= "scope.$index+1 < 10">0{{scope.$index+1}}</div>
          <div v-if= "scope.$index+1 >= 10">{{scope.$index+1}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="任务名称">
      </el-table-column>
      <el-table-column
        prop="time"
        align="center"
        label="上报时间">
      </el-table-column>
      <el-table-column
        prop="chuli"
        align="center"
        label="当前处理人">
      </el-table-column>
      <el-table-column
        prop="state"
        align="center"
        label="处理状态">
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      currentTable: [
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'},
        {name: '工地两侧未洒水', num: '1', time: '10月29日 10:00', chuli: '直销会', state: '处理中'}
      ]
    }
  }
}
</script>
