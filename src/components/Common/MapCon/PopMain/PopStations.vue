<template>
  <div>
    <div v-if="type === 'water'">
      <div class="">
        <div class="smallTitle">站点信息</div>
        <div class="rowFlex flexWarp ">
          <div
            class="rowSpace informationList"
            v-for="(item, index) in stations"
            :key="index">
            <div>
              {{item.name}}
            </div>
            <div>
              {{stationsList[item.id]}}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="smallTitle">设备列表</div>
        <table-common
          class="pop"
          :data = "equipmentList"
          :dataName="dataListName">
        </table-common>
      </div>
    </div>
    <div v-else>
      <div class="rowFlex mTop10">
        <div class="rowFlex"><div>类型</div><div></div></div>
        <div class="rowFlex"><div>所属网络</div><div></div></div>
      </div>
      <div class="mTop10">
        <div
          class="airList rowSpace"
          v-for="(item, index) in airList"
          :key="index">
          <div>{{item.name}}</div>
          <div>{{airOptions[item.id]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableCommon from '../../TableCommon'

import {getStationDetail, getdetail} from '@/common/api/popMain.js'

export default {
  name: 'PopStations',
  components: {TableCommon},
  data () {
    return {
      stations: [
        {name: '名称', id: 'stationName'},
        {name: '水站级别', id: 'controlLevelName'},
        {name: '水站类型', id: 'stationTypeName'}
      ],
      stationsList: {},
      equipmentList: [],
      dataListName: [
        {prop: 'installTime', label: '设备年份', type: 'normal', width: 'auto', isCenter: true},
        {prop: 'code', label: '设备型号', type: 'normal', width: 'auto', isCenter: true},
        {prop: 'manufacturerName', label: '设备厂家', type: 'normal', width: 'auto', isCenter: true}
      ],
      airList: [
        {name: '设备名称', id: 'deviceName'},
        {name: '设备型号', id: 'deviceName'},
        {name: '厂家', id: 'manufacturer'},
        {name: '使用年份', id: 'useYear'},
        {name: '测试方法', id: 'principle'}
      ],
      airOptions: {}
    }
  },
  props: {
    defaultData: Object,
    type: String
  },
  methods: {
    getStationYinzi () {
      if (this.type === 'water') {
        this.getStationWater()
      } else {
        this.getStationAir()
      }
    },
    getStationWater () {
      let stationId = this.defaultData.unifiedCode
      this.isShow = false
      getStationDetail(stationId).then(res => {
        console.log(res.data)
        this.stationsList = res.data
        this.equipmentList = res.equipmentList
      })
    },
    getStationAir () {
      let stationId = this.defaultData.unifiedCode
      this.isShow = false
      getdetail(stationId).then(res => {
        console.log(res.data.devices)
        this.airOptions = res.data.devices[0]
      })
    },
    changePollutantTab (code) {
      this.pollutantCode = code
      if (this.type === 'water') {
        this.getStationWater()
      } else {
        this.getStationAir()
      }
    }
  },
  mounted () {
    this.getStationYinzi()
  },
  watch: {
    'defaultData.unifiedCode': function () {
      this.getStationYinzi()
    }
  }
}
</script>

<style scoped>
.smallTitle{
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 10px;
}
.informationList{
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  background: #0e2843;
  color: #8697a6;
}
.mTop10{
  margin-top: 10px;
}
</style>
<style>
.changeTable.el-table.pop th {
  background: #0e2843;
  padding: 10px 0;
}
.changeTable.el-table.pop th .cell{
  font-size: 16px;
  color: #8697a6;
}
.airList{
  line-height: 40px;
  font-size: 16px;
  background: #0e2843;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
