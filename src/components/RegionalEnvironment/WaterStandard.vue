<template>
  <div class="width938">
    <div class="titleLine">
      <div class="textTitle">
        <span>水质达标情况</span>
      </div>
    </div>
    <div class="waterStandardMain marginTop26">
      <div class="rowCenter">
        <div class="tabUl flexRow">
          <div class="tabLi" v-for="(item, index) in waterStandardTab" :key="index" :class="item.id === waterSelected ? 'selected' : ''" @click="waterStandardTabQieHuan(item)">
           {{item.name}}
          </div>
        </div>
      </div>
      <div class="changetable waterStandardTable marginTop26">
        <el-table
        :data="waterStandardTable"
        cell-mouse-enter="handleEdit"
        max-height="608"
        style="width: 100%">
        <el-table-column
          prop="reachName"
          width="150px"
          label="断面">
        </el-table-column>
        <el-table-column
          prop="waterLevelNowName"
          width="100px"
          label="水质类别">
        </el-table-column>
        <el-table-column
          prop="isOver"
          align="center"
          label="是否达标">
          <template slot-scope="scope">
            <div :class="scope.row.isOver === '2'?'colorYW' : ''">
              <div v-if="scope.row.isOver == '1'">已达标</div>
              <div v-if="scope.row.isOver == '2'">未达标</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="pollutantName1"
          align="center"
          label="主要污染物">
          <template slot-scope="scope">
            <div class="rowCenter">
              <span>{{ scope.row.pollutantName1 }} </span>
              <div class="bigNum" style="width: 150px">{{ scope.row.pollutant1Ove }}倍</div>
            </div>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      waterStandardTab: [
        {name: '地表水', id: '0'},
        {name: '饮用水源地', id: '3'}
      ],
      waterSelected: '0',
      waterStandardTable: [

      ]
    }
  },
  mounted () {
    this.getWaterQualityStandard()
  },
  methods: {
    // 切换
    waterStandardTabQieHuan (item) {
      this.waterSelected = item.id
      this.getWaterQualityStandard()
    },
    getWaterQualityStandard () {
      var self = this
      if (self.AppData.dataFlag) {
        // 演示数据
        self.waterStandardTable = self.AppData.waterStandard_getWaterQualityStandard(self.waterSelected)
        return
      }

      var param = new URLSearchParams()
      param.append('dataType', '0')
      param.append('regionCode', self.AppConfig.appInfo.regionCode)
      param.append('sourceOfWater', self.waterSelected)
      param.append('time', new Date().getFullYear() + '')
      self.$axios.post(
        '/api/online-monitor-data-share/TEnvDaydataAreaWater/getWaterQualityStandard', param
      ).then(function (res) {
        var data = res.data.data
        self.waterStandardTable = data
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
