<template>
  <div class="mapMain waterEnvironMap">
    <AxeMapCon :checkParameData="checkParameData" @initMapCoverings="initMapCoverings"></AxeMapCon>
    <div class="left1693 jcMain">
      <div class="jcdata jcMainList">
        <div class="titlejc flexRow rowSpace alginCenter">
          <span>参数</span>
          <i class="el-icon-arrow-up"></i>
        </div>
        <div class="changeRadio check-box">
          <div v-for="(item, index) in waterRadio" :key="index" style="cursor: pointer">
            <input type="checkbox" v-model="item.check" @click="handleCheckedChange(item)" />
            <img
              class="iconWaterList"
              v-if="ICONLIST.iconMain[item.id]['default'] != ''"
              :src="ICONLIST.iconMain[item.id]['default']" />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>
<script>
import AxeMapCon from '@/components/MapContainer/AxeMapCon'
export default{
  data () {
    return {
      radio: '',
      waterRadio: [
        {name: '河流', id: 'detectedData4', type: 'RIVER', check: true, status: ''},
        {name: '湖库', id: 'hu', type: 'hu', check: false, status: ''},
        {name: '水源地', id: 'waterSource', type: 'WATERBLOOD', check: false, status: ''},
        {name: '国控断面', id: 'guo', value: 1, type: 'SECTION', check: false, status: ''},
        {name: '省控断面', id: 'sheng', value: 2, type: 'SECTION', check: false, status: ''},
        {name: '市控断面', id: 'shi', value: 3, type: 'SECTION', check: false, status: ''},
        {name: '一般控制断面', id: 'common', value: 4, type: 'SECTION', check: false, status: ''},
        {name: '工业企业', id: 'industry', value: '3f382eca203f459cb6a66c265a3427da', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '污水厂', id: 'waterFactory', value: 'a6d7487fc3674cd999b7ee0a28099f62', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '垃圾填埋场', id: 'garbage', value: '074b014df9e54acc9358d24be5e8c38e', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '供水厂', id: 'waterSupply', value: '000002', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '入河排污口', id: 'outfall', value: '25', type: 'WATERENTERPRICE', check: false, status: ''},
        {name: '视频', id: 'video', type: 'VIDEO', check: false, status: ''}
      ],
      waterParame: [
        {name: '河流', id: 'river'},
        {name: '湖库', id: 'hu'},
        {name: '水源地', id: 'water'}
      ],
      parameSelected: '',
      checkParameData: {}
    }
  },
  components: {
    AxeMapCon
  },
  methods: {
    initMapCoverings () {
      this.waterRadio.forEach((item, index) => {
        if (item.check) {
          this.checkParameData = item
        }
      })
    },
    handleCheckedChange (val) {
      val.check = !val.check
      // for (let key in val) {
      //   this.$set(this.checkParameData, key, val[key])
      // }
      console.log(val, 'val', this.checkParameData)
      this.checkParameData = val
    }
  }
}
</script>
<style>
.iconWaterList{
  width: 20px;
  height: 20px;
}
</style>
