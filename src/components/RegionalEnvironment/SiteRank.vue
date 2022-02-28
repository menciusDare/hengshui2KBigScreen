<template>
  <div class="waterStandard width674">
    <div class="titleLine">
      <div class="textTitle">
        <span>站点排名</span>
      </div>
    </div>
    <div class="waterStandardMain marginTop26">
      <div class="rowCenter">
        <div class="tabUl flexRow">
          <div class="tabLi" v-for="(item, index) in siteTab" :key="index" :class="item.id === siteTabSelected ? 'selected' : ''">
           {{item.name}}
          </div>
        </div>
      </div>
      <div class="rankMainTab changeCheck rowCenter marginTop26">
        <div class="changeRadio">
          <el-radio-group
            v-model="siteRadioSelected"
            v-for="(item, index) in siteRadio"
            :key="index"
            @change="changeItem(item.id)">
            <el-radio :label="item.id">{{item.name}}</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="changetable waterStandardTable marginTop26 siteTable">
        <el-table
        :data="waterStandardTable"
        cell-mouse-enter="handleEdit"
        max-height="850"
        style="width: 100%">
        <el-table-column
          prop="num"
          width="150px"
          align="center"
          label="排名">
          <template slot-scope="scope">
            <span v-if="scope.row.num < 10">
              NO. 0{{scope.row.num}}
            </span>
            <span v-else>
              NO. {{scope.row.num}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="station"
          align="center"
          label="站点">
        </el-table-column>
        <el-table-column
          prop="aqi"
          align="center"
          label="AQI">
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
      siteTab: [
        {name: '空气', id: 'dibiao'},
        {name: '水', id: 'yinyong'}
      ],
      siteTabSelected: 'dibiao',
      waterStandardTable: [
        {
          num: '1', station: '嘉鱼县滨湖路站', aqi: '30'
        },
        {
          num: '1', station: '嘉鱼县滨湖路站', aqi: '30'
        },
        {
          num: '10', station: '嘉鱼县滨湖路站', aqi: '30'
        }
      ],
      siteRadio: [
        {name: '国控', id: 'guo'},
        {name: '省控', id: 'sheng'},
        {name: '市控', id: 'shi'}
      ],
      siteRadioSelected: 'guo'
    }
  }
}
</script>
