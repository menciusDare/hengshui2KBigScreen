<template>
  <div class="timeoutMain">
    <div class="titleLine">
      <div class="textTitle">
        <span>超时事件</span>
      </div>
    </div>
    <div class="changetable timeoutTable">
      <el-table
      :data="timeoutTable"
      cell-mouse-enter="handleEdit"
      style="width: 100%">
      <el-table-column
        prop="num"
        align="center"
        max-height="440"
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
        prop="overtime"
        align="center"
        label="处理状态">
        <template slot-scope="scope">
          <div class="time">{{scope.row.overtime}}小时</div>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      timeoutTable: [
        {name: '工地裸土未覆盖', num: '1', time: '10月29日 10:00', chuli: '直销会', overtime: '1.0'},
        {name: '工地裸土未覆盖', num: '1', time: '10月29日 10:00', chuli: '直销会', overtime: '3.0'},
        {name: '工地裸土未覆盖', num: '1', time: '10月29日 10:00', chuli: '直销会', overtime: '1.0'}
      ]
    }
  }
}
</script>
