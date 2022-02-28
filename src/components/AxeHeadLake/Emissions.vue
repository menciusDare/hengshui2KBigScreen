<template>
  <div class="backgroundPop width1000 marginBottom height1150">
    <div class="emissions">
      <div class="titleLine">
        <div class="textTitle">
          <span>重点污染源排放量</span>
        </div>
        <span class="time">{{new Date().getFullYear()+ '.01.01' + ' - ' + new Date().format("yyyy.MM.dd")}}</span>
      </div>
      <div class="changetable emissionsTable marginTop26">
        <el-table :data="emissionsTable" cell-mouse-enter="handleEdit" max-height="266" style="width: 100%">
        <el-table-column prop="type" align="left" label="类别"></el-table-column>
        <el-table-column prop="count" align="center" label="个数">
          <template slot-scope="scope">
            <span>{{scope.row.count ? scope.row.count  :'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pollutionDiagnoseResult.w00000" align="center" width="150px" label="废水排放量（万吨/年）">
          <template slot-scope="scope">
            <span>{{scope.row['pollutionDiagnoseResult'] ? scope.row.pollutionDiagnoseResult.w00000  :'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pollutionDiagnoseResult.w01018" align="center" width="111px" label="COD （吨/年）">
          <template slot-scope="scope">
            <span>{{scope.row.pollutionDiagnoseResult ? scope.row.pollutionDiagnoseResult.w01018  :'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pollutionDiagnoseResult.w21003" align="center" width="111px" label="氨氮 （吨/年）">
          <template slot-scope="scope">
            <span>{{scope.row.pollutionDiagnoseResult ? scope.row.pollutionDiagnoseResult.w21003  :'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pollutionDiagnoseResult.w21011" align="center" width="111px" label="总磷 （吨/年）">
          <template slot-scope="scope">
            <span>{{scope.row.pollutionDiagnoseResult ? scope.row.pollutionDiagnoseResult.w21011  :'-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pollutionDiagnoseResult.w21001" align="center" width="111px" label="总氮 （吨/年）">
          <template slot-scope="scope">
            <span>{{scope.row.pollutionDiagnoseResult ? scope.row.pollutionDiagnoseResult.w21001  :'-'}}</span>
          </template>
        </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="outletInvestigation">
      <div class="titleLine">
        <div class="textTitle">
          <span>排口排查</span>
        </div>
      </div>
      <div class="outletMain rowSpace">
        <div class="outletMainList rowSpace" v-for="(item, index) in outletMainList" :key="index">
          <span>{{item.name}}</span><strong>{{item.num}}</strong>
        </div>
      </div>
    </div>
    <div class="KeyTasks">
      <div class="titleLine">
        <div class="textTitle">
          <span>斧头湖重点任务</span>
        </div>
      </div>
      <div class="changetable KeyTasksTable marginTop26">
        <el-table :data="keyTasksTable" cell-mouse-enter="handleEdit" max-height="364" style="width: 100%">
        <el-table-column prop="projectName" align="left" label="任务名称"></el-table-column>
        <el-table-column prop="assumeUnit" align="center" label="责任单位"></el-table-column>
        <el-table-column prop="endTime" align="center" label="完成时限" :formatter="formatter"></el-table-column>
        <el-table-column prop="progress" align="center" label="目前进度"  :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.progress + '%'}}</span>
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
      emissionsTable: [
        { name: '污水厂', num: 4, water: 4, cod: 4, andan: 4, lin: 4, dan: 4 },
        { name: '污水厂', num: 4, water: 4, cod: 4, andan: 4, lin: 4, dan: 4 },
        { name: '污水厂', num: 4, water: 4, cod: 4, andan: 4, lin: 4, dan: 4 }
      ],
      outletMainList: [
        { name: '排扣总数', num: '58' },
        { name: '排扣总数', num: '58' },
        { name: '排扣总数', num: '58%' }
      ],
      keyTasksTable: [],
      riverCode: this.AppConfig.appInfo.lankCode
    }
  },
  mounted () {
    this.initKeyTasksQuery()
    this.initEmissionsQuery()
  },
  methods: {
    /**
       * 初始化查询 - 斧头湖重点任务
       * @param riverCode 流域code
       */
    initKeyTasksQuery () {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.keyTasksTable = _this.AppData.emissions_initKeyTasksQuery()
        return
      }
      _this.$axios.get('api/online-monitor-data-share/waterQuality/getWaterMojorByRiverCode', {
        params: {
          'riverCode': _this.riverCode
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.keyTasksTable = res.data.data
        }
      }
      )
    },
    formatter (row, cloumn, index) {
      return new Date(row.endTime).format('yyyy-MM-dd')
    },

    /**
       * 初始化查询 - 重点污染源排放量
       * @param riverCode 流域code
       * 后台留了企业类型code，待以后确认哪些为重点污染源在加
       */
    initEmissionsQuery () {
      let _this = this
      if (_this.AppData.dataFlag) {
        // 演示数据
        _this.emissionsTable = _this.AppData.emissions_initEmissionsQuery()
        return
      }
      _this.$axios.get('api/online-monitor-data-share/waterQuality/getEnterprisePollutantByriverCode', {
        params: {
          'riverCode': _this.riverCode
        }
      }).then(function (res) {
        if (res.data.code == 200) {
          _this.emissionsTable = res.data.data
        }
      }
      )
    }
  }
}
</script>
