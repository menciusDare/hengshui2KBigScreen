<template>
  <div>
    <div class="titleName">首要污染物</div>
    <div class="rowSpace">
      <div class="w45"
        v-for="(item, index) in newDataList"
        :key="index">
        <div class="rowSpace">
          <div class="">当前累积</div>
          <div class="">剩余控制</div>
        </div>
        <div
          v-for="itemList in item.data"
          :key="itemList.name"
          class="dataListChildren">
          <div class="name">{{itemList.name}}</div>
          <div class="rowSpace num">
            <div class="">{{itemList.leijiNum}}</div>
            <div class="">{{itemList.sheyuNum}}</div>
          </div>
          <div
            class="lineXian"
            :style="{background: `linear-gradient(270deg, ${colorList[itemList.color]['color1']} 0%, ${colorList[itemList.color]['color2']} 100%)`}"
            >
<!--            :style="{background: `linear-gradient(270deg, ${color[itemList.color][0]} 0%, ${color[itemList.color][1]} 100%)`}"-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrimaryPollutant',
  data () {
    return {
      dataList: [
        {
          name: '列表1',
          data: [
            {name: 'PM2.5', id: 'pm25'},
            {name: 'NO2', id: 'no2'},
            {name: 'CO', id: 'co'}
          ]
        },
        {
          name: '列表二',
          data: [
            {name: 'PM10', id: 'pm10'},
            {name: 'SO2', id: 'pm10'},
            {name: 'O3', id: 'o3'}
          ]
        }
      ],
      levelColor: [
        {name: 'aqi', data: [[0, 50], [51, 100], [101, 150], [151, 200], [201, 300], [301, 1000]]},
        {name: 'co', data: [[0, 5], [6, 10], [11, 35], [36, 60], [61, 90], [91, 10000]]},
        {name: 'pm25', data: [[0, 35], [36, 75], [76, 115], [116, 150], [151, 250], [251, 10000]]},
        {name: 'pm10', data: [[0, 50], [51, 150], [151, 250], [251, 350], [351, 420], [421, 1000]]},
        {name: 'so2', data: [[0, 150], [151, 500], [501, 650], [651, 800], [801, 1600], [1601, 20000]]},
        {name: 'no2', data: [[0, 100], [101, 200], [201, 700], [701, 1200], [1201, 2340], [2341, 30000]]},
        {name: 'o3', data: [[0, 160], [161, 200], [201, 300], [301, 400], [401, 800], [801, 10000]]}
      ],
      colorList: {
        0: {
          'color1': 'rgba(109, 212, 0, .33)',
          'color2': 'rgba(109, 212, 0, 1)'
        },
        1: {
          'color1': 'rgba(109, 212, 0, .33)',
          'color2': 'rgba(109, 212, 0, 1)'
        },
        2: {
          'color1': 'rgba(50, 197, 255, .33)',
          'color2': 'rgba(50, 197, 255, 1)'
        },
        3: {
          'color1': 'rgba(247, 181, 0, .33)',
          'color2': 'rgba(247, 181, 0, 1)'
        },
        4: {
          'color1': 'rgba(224, 32, 32, .33)',
          'color2': 'rgba(224, 32, 32, 1)'
        },
        5: {
          'color1': 'rgba(182, 32, 224, .33)',
          'color2': 'rgba(182, 32, 224, 1)'
        },
        6: {
          'color1': 'rgba(255, 255, 255, .33)',
          'color2': 'rgba(255, 255, 255, 1)'
        }
      },
      newDataList: []
    }
  },
  mounted () {
    this.getPollutantTargetControl()
  },
  methods: {
    getPollutantTargetControl () {
      var _this = this
      var url = '/api/online-monitor-data-share/TEnvDaydataAreaAir/getPollutantTargetControl'
      var params = new URLSearchParams()
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            var chartData = res.data.data
            _this.getDataList(chartData)
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    },
    getDataList (chartData) {
      var actual = chartData.actual
      var target = chartData.target
      this.dataList.map(item => {
        item.data.forEach(itemList => {
          itemList.leijiNum = actual[itemList.id]
          itemList.sheyuNum = target[itemList.id]
          this.levelColor.filter(itemFilter => itemFilter.name === itemList.id)[0].data.forEach((item2, index2) => {
            console.log(itemList.leijiNum)
            if (itemList.leijiNum >= item2[0] && itemList.leijiNum <= item2[1]) {
              itemList.color = index2
            } if (itemList.leijiNum === null) {
              itemList.color = 6
            }
          })
        })
      })
      this.newDataList = this.dataList
      console.log(this.dataList)
      // for (let i = 0; i < this.dataList.length; i++) {
      //   var data1 = this.dataList[i].data;
      //   for (let j = 0; j < data1.length; j++) {
      //     if (data1[j].name == 'PM2.5') {
      //       data1[j].leijiNum = actual.pm25;
      //       data1[j].sheyuNum = target.pm25;
      //     } else if (data1[j].name == 'PM10') {
      //       data1[j].leijiNum = actual.pm10;
      //       data1[j].sheyuNum = target.pm10;
      //     } else if (data1[j].name == 'NO2') {
      //       data1[j].leijiNum = actual.no2;
      //       data1[j].sheyuNum = target.no2;
      //     } else if (data1[j].name == 'SO2') {
      //       data1[j].leijiNum = actual.so2;
      //       data1[j].sheyuNum = target.so2;
      //     } else if (data1[j].name == 'CO') {
      //       data1[j].leijiNum = actual.co;
      //       data1[j].sheyuNum = target.co;
      //     } else if (data1[j].name == 'O3') {
      //       data1[j].leijiNum = actual.o3;
      //       data1[j].sheyuNum = target.o3;
      //     }
      //   }
      // }
    }
  }
}
</script>

<style scoped>
.w45{
  width: 45%;
}
.dataListChildren{
  margin-top: 25px;
}
.dataListChildren .name{
  font-size: 27px;
  font-weight: 500;
  line-height: 34px;
  margin-bottom: 5px;
}
.dataListChildren .num{
  font-size: 20px;
  font-weight: 500;
  line-height: 34px;
  margin-bottom: 5px;
}
.dataListChildren .lineXian{
  width: 100%;
  height: 6px;
  background: #1A1F32;
}
.dataListChildren .lineXian .lineXiaNei{
  position: absolute;
  left: 0;
  height: 6px;
  width: 100%;
}
</style>
