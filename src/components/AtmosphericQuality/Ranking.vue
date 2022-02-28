<template>
  <div class="backgroundPop">
    <div class="titleLine rankBg">
      <div class="textTitle">
        <span>考核排名</span>
      </div>
      <ul class="textTab flexRow">
        <li v-for="(item, index) in textTab" :key="index" :class="item.selected === true ? 'selected' : ''">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="rankMain rowSpace">
      <ul>
        <div class="textTitle">城市</div>
        <div class="rankMainTab changeCheck">
          <div class="changeRadio">
            <el-radio-group
              v-model="cityRadioSelected"
              v-for="(item, index) in cityRadio"
              :key="index"
              @change="changeItem(item.id)">
              <el-radio :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="changetable rankingTable">
          <el-table
          :data="rankTableCity"
          cell-mouse-enter="handleEdit"
          max-height="852"
          style="width: 100%">
          <el-table-column
            prop="time"
            align="center"
            label="排名">
            <template slot-scope="scope">
              NO. 0{{scope.row.num}}
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            align="center"
            label="城市">
          </el-table-column>
          <el-table-column
            prop="aqi"
            align="center"
            label="AQI">
          </el-table-column>
        </el-table>
        </div>
      </ul>
      <ul>
        <div class="textTitle">站点</div>
        <div class="rankMainTab changeCheck">
          <div class="changeRadio">
            <el-radio-group
              v-model="stationSelected"
              v-for="(item, index) in stationRadio"
              :key="index"
              @change="changeItem(item.id)">
              <el-radio :label="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="changetable rankingTable">
          <el-table
          :data="rankTableCity"
          cell-mouse-enter="handleEdit"
          max-height="852"
          style="width: 100%">
          <el-table-column
            prop="time"
            align="center"
            label="排名">
            <template slot-scope="scope">
              NO. 0{{scope.row.num}}
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            align="center"
            label="城市">
          </el-table-column>
          <el-table-column
            prop="aqi"
            align="center"
            label="AQI">
          </el-table-column>
        </el-table>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      textTab: [
        {name: '实时', id: 'time', selected: true},
        {name: '日', id: 'data', selected: false},
        {name: '月', id: 'mouth', selected: false},
        {name: '年', id: 'year', selected: false}
      ],
      cityRadio: [
        {name: '河流', id: 'river'},
        {name: '湖库', id: 'hu'},
        {name: '水源地', id: 'water'}
      ],
      cityRadioSelected: 'river',
      stationRadio: [
        {name: '国控', id: 'guo'},
        {name: '省控', id: 'sheng'},
        {name: '市控', id: 'shi'}
      ],
      stationSelected: 'guo',
      // 排名 --- 城市
      rankTableCity: [
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'},
        {num: 1, city: '随州', aqi: '29'}
      ]

    }
  },
  methods: {
    changeItem (value) {
      console.log(value)
    }
  }
}
</script>
