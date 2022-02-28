<template>
  <div class="mapMain">
    <div class="mapPop atmospher" v-if="mapPopOpen">
      <div class="mapPopTitle rowSpace alginCenter">
        <span>咸宁 咸宁环保局</span>
        <i class="el-icon-close" @click="mapPopOpen = false"></i>
      </div>
      <div class="mapPopMain">
        <div class="mainTop">
          <div class="rowSpace TopLine alginCenter">
            <strong>AQI 90</strong>
            <ul class="rowSpace alginCenter">
              <li class="flexRow alginCenter">
                <i class="iconMap iconMaptianqi"></i> {{mapPop.tianqi}}
              </li>
              <li class="flexRow alginCenter">
                <i class="iconMap iconMapwd"></i> {{mapPop.wendu}}℃
              </li>
              <li class="flexRow alginCenter">
                <i class="iconMap iconMapfeng"></i> {{mapPop.feng}}级
              </li>
              <li class="flexRow alginCenter">
                <i class="iconMap iconMapsd"></i> {{mapPop.shidu}}%
              </li>
            </ul>
          </div>
          <ul class="rowSpace mapMainUl">
            <li v-for="(item, index) in mapPop.data" :key ="index">
              <div class="name">{{item.name}}</div>
              <div class="num"><span :style="{color:item.color}">{{item.num}}</span> ug/m³</div>
            </li>
          </ul>
          <div class="mainTopEchars">
            <span>最近及未来二十四小时AQI变化曲线</span>
            <v-chart class="changingtrendMain" :options="mapPopPolar" />
          </div>
        </div>
      </div>
    </div>
    <AirMapCon></AirMapCon>
  </div>
</template>
<script>
import AirMapCon from '@/components/MapContainer/AirMapCon'
export default{
  components: {
    AirMapCon
  },
  data () {
    return {
      mapPopOpen: false,
      mapPop: {
        aqi: 90,
        tianqi: '晴',
        wendu: 23,
        feng: 3,
        shidu: 58,
        data: [
          {
            name: 'AQI',
            num: 105,
            color: 'rgba(241, 157, 56, 1)'
          },
          {
            name: 'AQI',
            num: 105,
            color: 'rgba(70, 201, 111, 1)'
          },
          {
            name: 'AQI',
            num: 105,
            color: 'rgba(234, 53, 34, 1)'
          },
          {
            name: 'AQI',
            num: 105,
            color: 'rgba(234, 53, 34, 1)'
          },
          {
            name: 'AQI',
            num: 105,
            color: 'rgba(234, 53, 34, 1)'
          }
        ]
      },
      mapPopPolar: {
        grid: [
          {x: '7%', y: '15%', width: '90%', height: '75%'}
        ],
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: 'category',
            data: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            axisLine: {
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#93AECE',
                fontSize: 18
              },
              margin: 10
            },
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameLocation: 'end',
            nameTextStyle: {
              color: '#93AECE'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'none'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#93AECE',
                fontSize: 18
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            }
          }
        ],
        series: [
          {
            name: 'aqi',
            type: 'line',
            data: [90, 10, 3, 100, 15, 30, 7],
            smooth: true,
            showSymbol: false,
            lineStyle: {
              color: 'rgba(60, 230, 253, 1)'
            },
            areaStyle: {
              color: 'rgba(129, 240, 255, 0.2)'
            }
          }
        ]
      }
    }
  }
}
</script>
