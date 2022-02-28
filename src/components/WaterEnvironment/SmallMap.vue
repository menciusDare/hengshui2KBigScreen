<template>
  <div class="main rowFlex flexColumn">
    <LogoMain></LogoMain>
    <div class="mainBottom">
      <div class="tabList rowSpace">
        <div
          class="tabListLi"
          v-for="item in tabList"
          :class="tabListSelected === item.id ? 'selcted': ''"
          @click="changeListData(item.id)"
          :key="item.id">{{item.name}}</div>
      </div>
      <div class="text rowSpace alginCenter">
        <div class="name"><span>咸宁市 / </span>{{mapContainer.name}}</div>
        <div class="num">{{mapContainer.num}}</div>
      </div>
      <div class="zhuzhuangtu">
        <zhuzhuangEcharts :params="zhuzhuangEchartsData"></zhuzhuangEcharts>
      </div>
      <div class="selectedDay rowCenter alginCenter">
        <div class="el-icon-minus"></div>
        <div class="data">近{{day}}天</div>
        <div class="el-icon-plus"></div>
      </div>
      <div class="map">
        <v-chart :options="polar" id="mapContainerPoll"></v-chart>
      </div>
      <div class="warn rowSpace alginCenter">
        <div>
          <div class="el-icon-warning red"></div>
          {{mapContainer.warn}}
        </div>
        <div class="defult el-icon-right"></div>
      </div>
      <div class="bottomTab rowSpace">
        <div
          v-for="item in bottomTab"
          :key="item.name"
          :class="item.name"
          class="bottomTabIcon rowCenter alginCenter">
          <div :class="`icon${item.name}`"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoMain from '@/components/Common/LogoMain.vue'
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import shandongGeoJson from '@/assets/shandong.json'
export default {
  name: 'SmallMap',
  components: {
    LogoMain,
    zhuzhuangEcharts
  },
  data () {
    return {
      tabList: [
        {name: '总磷', id: 'W21011'},
        {name: '总氮', id: 'W21001'},
        {name: '氨氮', id: 'W21003'},
        {name: '高锰酸盐指数', id: 'W01019'}
      ],
      tabListSelected: 'W21011',
      mapContainer: {
        name: '赤壁市',
        num: '57',
        data: [
          [20, 30, 40]
        ],
        warn: '赤壁县未来30天PM10 指数预计将超标10%'
      },
      day: 30,
      bottomTab: [
        {name: 'warnIcon'},
        {name: 'query'},
        {name: 'yuyin'},
        {name: 'shang'},
        {name: 'xia'},
        {name: 'ditu'}
      ],
      zhuzhuangEchartsData: {
        xAxis: ['区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名', '区域名'],
        series: [
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 100,
            itemStyle: {
              color: 'rgba(224, 32, 32, 1)'
            }
          },
          {
            value: 30,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          },
          {
            value: 85,
            itemStyle: {
              color: 'rgba(31, 47, 116, 1)'
            }
          },
          {
            value: 95,
            itemStyle: {
              color: 'rgba(250, 100, 0, 1)'
            }
          }
        ],
        id: 'zhuzhuangEchartsData3',
        grid: {
          width: '98%',
          height: '75%',
          bottom: '10%',
          left: '1%'
        },
        isShowy: false,
        isSplitLine: false,
        isShowx: false,
        barWidth: 5
      },
      polar: {
        grid: {
          height: '100%',
          width: '100%'
        },
        geo: {
          map: 'shandongGeoJson',
          top: 'center',
          left: 'center',
          roam: false,
          width: '100%',
          height: '90%',
          zoom: 1,
          label: {
            show: true,
            normal: {
              show: true,
              color: 'rgba(255, 255, 255, 1)'
            },
            emphasis: {
              color: 'rgba(255, 255, 255, 1)'
            }
          },
          aspectScale: 1, // 长宽比
          itemStyle: {
            normal: {
              areaColor: {
                colorStops: [{
                  offset: 0,
                  color: '#617D9E' // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: '#617D9E' // 50% 处的颜色
                },
                {
                  offset: 0.8,
                  color: '#617D9E' // 50% 处的颜色
                },
                {
                  offset: 1,
                  color: '#617D9E' // 100% 处的颜色
                }]
              },
              borderColor: 'rgba(255, 255, 255, .5)',
              borderWidth: 1,
              shadowColor: 'rgba(0, 0, 0, 1)',
              shadowOffsetX: 0,
              shadowOffsetY: 5,
              opacity: 1,
              shadowBlur: 5
            },
            emphasis: {
              // 鼠标移入颜色
              areaColor: 'rgba(255, 0, 0, 0.99)',
              borderWidth: 0
            }
          }
        },
        visualMap: {
          left: 'right',
          top: 'bottom',
          type: 'piecewise',
          calculable: true,
          show: false,
          pieces: [
            {gte: 1, lte: 1, color: 'rgba(0,280,0,.3)', label: '优'},
            {gte: 2, lte: 2, color: 'rgba(255,255,0,0.3)', label: '良'},
            {gte: 3, lte: 3, color: 'rgba(255,128,0,0.3)', label: '轻度污染'},
            {gte: 4, lte: 4, color: '#ff0000', label: '中度污染'},
            {gte: 5, lte: 5, color: '#99004C', label: '重度污染'},
            {gte: 6, lte: 6, color: '#7E0023', label: '严重污染'}
          ],
          textStyle: {
            color: '#ffffff'
          }
        },
        series: [
          {
            mapType: 'shandong',
            type: 'map',
            geoIndex: 0,
            data: [
              {name: '咸安区', value: 1},
              {name: '通山县', value: 2},
              {name: '崇阳县', value: 3},
              {name: '通辽县', value: 1},
              {name: '赤壁市', value: 4},
              {name: '嘉鱼县', value: 5}
              // {name: '威海市', value: 50},
              // {name: '青岛市', value: 70},
              // {name: '东营市', value: 80},
              // {name: '廊坊市', value: 1000},
              // {name: '日照市', value: 40},
              // {name: '临沂市', value: 40},
              // {name: '枣庄市', value: 40},
              // {name: '济宁市', value: 40},
              // {name: '泰安市', value: 40},
              // {name: '菏泽市', value: 300},
              // {name: '淄博市', value: 200},
              // {name: '济南市', value: 1000},
              // {name: '聊城市', value: 150},
              // {name: '德州市', value: 30},
              // {name: '滨州市', value: 30},
              // {name: '潍坊市', value: 30},
            ],
            layoutSize: 80
          }
        ]
      },
      shandong: ''
    }
  },
  methods: {
    changeListData (id) {
      console.log(id)
      this.tabListSelected = id
    }
  },
  mounted () {
    this.$echarts.registerMap(this.shandong, shandongGeoJson)
    this.polar.geo.map = this.shandong
  }
}
</script>

<style scoped>
.main{
  width: 557px;
  height: 100%;
  background: rgba(29, 29, 29, 1);
}
.mainBottom{
  flex: 1;
  background: #000000 linear-gradient(0deg, rgba(0, 145, 255, 0)  30%,  rgba(0, 145, 255, 0.32) 40%,  rgba(0, 145, 255, 0) 100%);
  padding: 18px;
  box-sizing: border-box;
}
.tabListLi{
  padding: 0 17px;
  line-height: 22px;
  color: rgba(255, 255, 255, .5);
  border-radius: 11px;
  font-size: 16px;
  cursor: pointer;
}
.tabListLi.selcted{
  color: rgba(0, 0, 0, 1);
  background: #fff;
}
.name{
  font-size: 24px;
}
.name span{
  color: rgba(123, 123, 123, 1);
}
.num{
  font-weight: 600;
  color: #0342FF;
  font-size: 60px;
  line-height: 73px;
}
.zhuzhuangtu{
  width: 100%;
  height: 29px;
  background: #1A1F32;
  margin-top: 13px;
  margin-bottom: 13px;
}
.selectedDay{
  width: 161px;
  margin: 0 auto;
  padding: 0 26px;
  height: 36px;
  border: 1px solid rgba(151, 151, 151, .5);
  border-radius: 18px;
  color: rgba(255, 255, 255, .5);
}
.data{
  padding: 0 10px;
}
.map{
  width: 450px;
  height: 450px;
  /*background: #1DCEBC;*/
  margin: 8px auto 57px;
}
.warn{
  height: 34px;
  background: rgba(85, 96, 122, 0.45);
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 12px;
  margin-top: 57px;
}
.red{
  color: rgba(237, 63, 63, 1);
}
.defult{
  width: 17px;
  height: 17px;
  font-size: 20px;
  color: rgba(50, 197, 255, 1);
}
.bottomTab{
  background: rgba(85, 96, 122, 0.28);
  border-radius: 18px;
  padding: 13px;
  box-sizing: border-box;
  height: 76px;
  margin-top: 10px;
}
.bottomTabIcon{
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: rgba(72, 85, 94, 1);
}
.bottomTabIcon.warnIcon{
  background: #8E1C10;
}
.iconwarnIcon{
  width: 13px;
  height: 50px;
  background: url("../../assets/img/waterIcon/gongjuWarn.png") no-repeat center;
  background-size: 100%;
}
.bottomTabIcon.query{
  background: linear-gradient(162deg, rgba(96, 168, 125, .2) 0%, rgba(33, 157, 152, .2) 100%);;
}
.iconquery{
  width: 25px;
  height: 28px;
  background: url("../../assets/img/waterIcon/gongjuQuery.png") no-repeat center;
  background-size: 100%;
}
.bottomTabIcon.yuyin{
  background: url("../../assets/img/waterIcon/yuyinBg.png") no-repeat center;
  background-size: 100%;
}
.iconyuyin{
  width: 23px;
  height: 31px;
  background: url("../../assets/img/waterIcon/yuyin.png") no-repeat center;
  background-size: 100%;
}
.bottomTabIcon.shang{
}
.iconshang{
  width: 25px;
  height: 28px;
  background: url("../../assets/img/waterIcon/liebiao.png") no-repeat center;
  background-size: 100%;
}
.bottomTabIcon.xia{
}
.iconxia{
  width: 25px;
  height: 24px;
  background: url("../../assets/img/waterIcon/zhanshi.png") no-repeat center;
  background-size: 90%;
}
.bottomTabIcon.ditu{
  background: rgba(72, 85, 94, 0.2);
  box-shadow: 0px 2px 27px 0px #3961FF;
  border: 1px solid #0033FF;
}
.iconditu{
  width: 33px;
  height: 22px;
  background: url("../../assets/img/waterIcon/ditu.png") no-repeat center;
  background-size: 100%;
}
.warnIcon{
}
#mapContainerPoll{
  width: 100%;
  height: 100%;
}
</style>
