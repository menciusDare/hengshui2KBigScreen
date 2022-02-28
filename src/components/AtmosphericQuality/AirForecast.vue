<template>
  <div class="backgroundPop width75 airForecast height560">
    <div class="titleLine">
      <div class="textTitle">
        <span>空气质量预测</span>
      </div>
    </div>
    <div class="changetable airtable">
      <el-table
      :data="airForecast.airtable"
      cell-mouse-enter="handleEdit"
      style="width: 100%">
      <el-table-column
        prop="time"
        width="100px"
        align="center"
        max-height="425"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="tianqi"
        width="60px"
        align="center"
        label="天气">
        <template slot-scope="scope">
          <i class="icon"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="zhiliang"
        align="center"
        label="空气质量等级">
        <template slot-scope="scope">
          <span v-if="scope.row.zhiliang === '优'" class="lu">{{scope.row.zhiliang}}</span>
          <span v-if="scope.row.zhiliang === '良'" class="yellow">{{scope.row.zhiliang}}</span>
          <span v-if="scope.row.zhiliang === '重度'" class="red">{{scope.row.zhiliang}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="aqi"
        align="center"
        label="预估AQI">
      </el-table-column>
      <el-table-column
        prop="fengxiang"
        align="center"
        label="风向">
      </el-table-column>
      <el-table-column
        prop="wuran"
        align="center"
        label="首要污染物">
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      airForecast: {
        airtable: [
          {
            time: '明天',
            tianqi: '晴',
            zhiliang: '优',
            aqi: '30-40',
            fengxiang: '西北风',
            wuran: 'PM2.5'
          },
          {
            time: '明天',
            tianqi: '晴',
            zhiliang: '良',
            aqi: '30-40',
            fengxiang: '西北风',
            wuran: 'PM2.5'
          },
          {
            time: '明天',
            tianqi: '晴',
            zhiliang: '重度',
            aqi: '30-40',
            fengxiang: '西北风',
            wuran: 'PM2.5'
          },
          {
            time: '明天',
            tianqi: '晴',
            zhiliang: '优',
            aqi: '30-40',
            fengxiang: '西北风',
            wuran: 'PM2.5'
          },
          {
            time: '明天',
            tianqi: '晴',
            zhiliang: '优',
            aqi: '30-40',
            fengxiang: '西北风',
            wuran: 'PM2.5'
          },
          {
            time: '明天',
            tianqi: '晴',
            zhiliang: '优',
            aqi: '30-40',
            fengxiang: '西北风',
            wuran: 'PM2.5'
          }
        ]
      }

    }
  }
}
</script>
