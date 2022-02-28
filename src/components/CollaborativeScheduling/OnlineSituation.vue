<template>
  <div class="backgroundPop width75 marginBottom height560">
    <div class="titleLine">
      <div class="textTitle">
        <span>协同人员在线情况</span>
      </div>
    </div>
    <div class="changetable onlineTable">
      <el-table
      :data="onlineTable"
      cell-mouse-enter="handleEdit"
      max-height="400"
      style="width: 100%">
      <el-table-column
        prop="num"
        align="center"
        label="排名">
        <template slot-scope="scope">
          NO. 0{{scope.row.num}}
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        align="center"
        label="区域">
      </el-table-column>
      <el-table-column
        prop="online"
        align="center"
        label="在线">
      </el-table-column>
      <el-table-column
        prop="noOnline"
        align="center"
        label="离线">
      </el-table-column>
      <el-table-column
        prop="zaixian"
        align="center"
        label="在线率">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      onlineTable: [
        {num: '1', city: '锦州', online: '29', noOnline: '0', zaixian: '100%'}
      ]
    }
  }
}
</script>
