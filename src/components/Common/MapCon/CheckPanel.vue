
<template>
  <div class="mapcheck" ref="mapcheckEl">
    <div class="checkPanel">
      <div class="checkPanelTitle">
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="enterpriseName"
          :fetch-suggestions="querySearch"
          placeholder="搜索企业"
        @focus="searchshow()"
        >
         <!-- @select="handleSelect" -->
          <i
            class="el-icon-search el-input__icon"
            slot="suffix"
           @click="searchshow()"
          >
           <!-- @click="handleIconClick" -->
          </i>
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <!--          <span class="addr">{{ item.address }}</span>-->
          </template>
        </el-autocomplete>
      </div>
      <div class="checkPanelMain">
        <div class="" v-for="(item, index) in changeParams[type]" :key="index">
          <div
            class="checkTitleSmall rowFlex alginCenter"
            @click="item.isShow = !item.isShow"
          >
            <div
              :class="item.isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            ></div>
            <div class="changeSan"></div>
            <div class="name">{{ item.name }}</div>
          </div>
          <!--        {{changeParams[type][index].stationIsShow}}-->
          <div class="checkMainSmall" v-if="item.isShow">
            <div v-if="item.id != 'waterStationCheck'">
              <div
                class="rowFlex paramsList alginCenter"
                v-for="(itemList, indexList) in item.paramsList"
                :key="indexList"
                :class="
                  changeChecks.indexOf(itemList.id) != -1 ? 'isActive' : ''
                "
                @click="changeItem(itemList.id, index, item.id, '')"
              >
                <div :class="item.id === 'station' ? 'iconMainCon' : ''">
                  <div
                    :class="`${itemList.class}`"
                    :style="{ background: color2[`${itemList.id}`] }"
                  ></div>
                </div>
                <div class="">{{ itemList.name }}</div>
              </div>
            </div>
            <!--              <input type="checkbox" v-model="itemList.isCheck" @click="changeItem(itemList.id, indexList, item.id, itemList.isCheck)" />-->
            <div v-else>
              <div
                class="rowFlex paramsList alginCenter opcaly"
                v-for="(itemList, indexList) in item.paramsList"
                :key="indexList"
                @click="
                  changeItem(itemList.id, indexList, item.id, itemList.isCheck)
                "
                :class="itemList.isCheck ? 'isActive' : ''"
              >
                <img
                  class="iconWaterList"
                  :src="ICONLIST.iconMain[`${itemList.id}`]['default']"
                />
                <div :class="item.id === 'station' ? 'iconMainCon' : ''">
                  <div
                    :class="`${itemList.id}`"
                    :style="{ background: color2[`${itemList.id}`] }"
                  ></div>
                </div>
                <div class="">{{ itemList.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="checkdialog" v-if="serchshowinfo">
      <div class="checkoutclose">
        <div class="classicon" @click="closesearch()"></div>
      </div>
      <div class="checkdialgbanxin">
        <div class="checkoutinput">
          <el-input placeholder="请输入内容" v-model="enterpriseName" @input="seachents()">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>

        <ul class="checknamebox">
          <li v-for="(item, index) in restaurants" :key="index" @click="selectedItem(item)">
            <div class="checknamebanxin">
              <div class="checkutname">{{ item.entName }}</div>
              <div class="checkoutprotion"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import mapCheckPanel from './js/mapCheckPanel'
import {
  formatDate,
  formatString
} from '@/components/MapContainer/mapjs/CommonUtil'
import { dataRequestUrl } from '@/components/MapContainer/js/AppConfig'
import { EchartsLayer } from '@/components/MapContainer/mapjs/EchartsLayer'
import { createWrytLayers } from '@/components/MapContainer/mapjs/MapImpl'
import {
  createWindLayer,
  addWindHandle,
  removeWindHandle
} from '@/components/MapContainer/mapjs/WindImpl'
import {
  loadingEntTransferListData,
  loadingEnterpriseListData,
  getRegionChildrenList
} from '@/common/api/WaterEnvironment'
import * as mapCore from './js/mapCore'
export default {
  name: 'CheckPanel',
  data () {
    return {
      serchshowinfo: false,
      enterpriseName: '',
      changePanelParams: [],
      cEnterprise: {},
      restaurants: [],
      cyaer: new Date().getFullYear().toString(),
      pointLngLatMap: {
        371323: [118.620799, 35.906956], //
        371328: [118.025934, 35.758239], //
        371321: [118.418545, 35.532190], //
        371326: [117.663066, 35.431063], //
        371325: [117.951575, 35.231784], //
        371302: [118.284700, 35.199066], //
        371312: [118.513723, 35.127682], //
        371327: [118.778438, 35.199066], //
        371324: [117.957524, 34.857018], //
        371311: [118.275777, 34.931377], //
        371329: [118.650542, 34.880813], //
        371322: [118.332289, 34.627995], //
        371371: [118.271047, 34.991223],
        371372: [118.436624, 35.052547],
        371373: [119.090989, 35.192678]
      },
      state: '',
      clayer: {
        QXlayer: null,
        htlayer: null
      },
      color2: {
        aqi: 'rgba(224, 32, 32, 1)',
        pm25: 'rgba(109, 212, 0, 1)',
        pm10: 'rgba(224, 32, 32, 1)',
        no2: 'rgba(50, 197, 255, 1)',
        co: 'rgba(50, 197, 255, 1)',
        o3: 'rgba(50, 197, 255, 1)'
      },
      cregionid: this.app_config.appInfo.regionCode,
      changeChecks: ['heatmap'],
      cmaptype: 'heatmap',
      changeParams: {
        air: [
          {
            name: '地图类型',
            id: 'maptype',
            paramsList: [
              {
                name: '企业分布热力图',
                id: 'heatmap',
                class: 'heatmap',
                isShow: true
              },
              {
                name: '危废转移流向图',
                id: 'zhuanyi',
                class: 'zhuanyi',
                isShow: true
              },
              {
                name: '产废过程演绎图',
                id: 'chanfeigc',
                class: 'chanfeigc',
                isShow: true
              }
            ],
            isShow: true,
            stationIsShow: 'heatmap'
          },
          {
            name: '图层',
            stationIsShow: 'yun',
            id: 'tuceng',
            paramsList: [
              {
                name: '异常报警',
                id: 'errorWarn',
                class: 'errorWarn',
                isShow: true,
                isCheck: true
              },
              {
                name: '产废企业',
                id: 'polluteEnterprise',
                class: 'polluteEnterprise',
                isShow: true,
                isCheck: true
              },
              {
                name: '经营企业',
                id: 'produceEnterprise',
                class: 'produceEnterprise',
                isShow: true,
                isCheck: true
              },
              {
                name: '转运车辆',
                id: 'transferTruck',
                class: 'transferTruck',
                isShow: true,
                isCheck: true
              }
            ],
            isShow: true
          },
          {
            name: '地区',
            stationIsShow: '长春全市',
            id: 'region',
            paramsList: [],
            isShow: true
          }
        ]
      }
    }
  },
  methods: {
    closesearch () {
      this.$emit('closesearch')
      // this.$refs.mapcheckEl.style.width = '244px';
      // this.$refs.mapcheckEl.style.hieght =  '612px';
      this.serchshowinfo = false
    },
    searchshow () {
      this.$emit('searchshow')
      // this.$refs.mapcheckEl.style.width = '1048px';
      // this.$refs.mapcheckEl.style.hieght = '600px';
      this.serchshowinfo = true
      this.enterpriseName = ''
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    selectedItem (item) {
      this.serchshowinfo = false
      this.enterpriseName = item.entName
      this.cEnterprise = item
      this.$store.state.mapview.center = [
        this.cEnterprise.lng,
        this.cEnterprise.lat
      ]
      this.$store.state.mapview.zoom = 16
      // this.$refs.mapcheckEl.style.width = 0;
      // this.$refs.mapcheckEl.style.hieght = 0;
      var parms = {
        coords: [[this.cEnterprise.lng, this.cEnterprise.lat]],
        symbol: {
          type: 'text',
          color: 'rgba(255,255,255,1)',
          // haloColor: "black",
          // haloSize: "1px",
          text: this.enterpriseName,
          // xoffset: 3,
          yoffset: 68,
          font: { // autocasts as new Font()
            size: 25,
            family: 'Josefin Slab',
            weight: 'bold'
          }
        },
        attributes: {id: 100}
      }
      mapCore.FindLayer('ls').removeAll()
      mapCore.addGraphicsToGraphicsLayer(parms, 'ls')
    },
    seachents () {
      var _this = this
      loadingEnterpriseListData(_this.cyaer + '05', this.enterpriseName, -1, this.cregionid).then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i]['value'] = res.data[i].entName
        }
        _this.restaurants = res.data
      })
    },
    loadAll () {
      var _this = this
      loadingEnterpriseListData(_this.cyaer + '05', -1, -1, this.cregionid).then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i]['value'] = res.data[i].entName
        }
        _this.restaurants = res.data
      })
      getRegionChildrenList(this.cregionid).then((res) => {
        _this.changeParams.air[2].paramsList.push({
          name: res.data[0].name,
          id: res.data[0].value,
          class: 'location',
          isShow: true,
          isCheck: true
        })
        for (var i = 0; i < res.data[0].children.length; i++) {
          _this.changeParams.air[2].paramsList.push({
            name: res.data[0].children[i].name,
            id: res.data[0].children[i].value,
            class: 'location',
            isShow: true,
            isCheck: true
          })
        }
      })
    },
    handleSelect (item) {
      this.cEnterprise = item
      this.$store.state.mapview.center = [
        this.cEnterprise.lng,
        this.cEnterprise.lat
      ]
      this.$store.state.mapview.zoom = 15
    },
    handleIconClick (ev) {
      if (this.cEnterprise.entName === this.enterpriseName) {
        this.$store.state.mapview.center = [
          this.cEnterprise.lng,
          this.cEnterprise.lat
        ]
        this.$store.state.mapview.zoom = 15
      }
      // console.log(ev);
    },
    changeItem (id, index, layId, isCheck) {
      this.$emit('changeItems', id, layId)
      if (layId === 'region') {
        this.changeChecks.splice(this.changeChecks.indexOf(this.cregionid), 1)
        this.cregionid = id
        this.changeChecks.push(id)
        mapCore.FindLayer('xzqh').definitionExpression =
          id === '131100' ? '' : 'PAC = ' + id + ''
        this.$store.state.mapview.center = this.pointLngLatMap[id]
        this.$store.state.mapview.zoom = 10
        if (id === '131100') {
          this.$store.state.mapview.center = [118.296597, 35.317219]
          this.$store.state.mapview.zoom = 9
        }
      } else {
        if (layId === 'maptype') {
          for (var i = 0; i < 12; i++) {
            mapCore.FindLayer('heatmap' + (i + 1)).visible = false
          }
          mapCore.FindLayer('heatmap').visible = false
          if (id === 'chanfeigc') {
            mapCore.FindLayer('heatmap1').visible = true
          }
          if (this.cmaptype != 'zhuanyi' && this.cmaptype != 'chanfeigc') {
            mapCore.FindLayer(this.cmaptype).visible =
              this.changeChecks.indexOf(id) != -1
          }
          this.changeChecks.splice(this.changeChecks.indexOf(this.cmaptype), 1)
          this.cmaptype = id
          this.changeChecks.push(id)
          if (this.cmaptype != 'zhuanyi' && this.cmaptype != 'chanfeigc') {
            mapCore.FindLayer(this.cmaptype).visible =
              this.changeChecks.indexOf(id) != -1
          }
        } else {
          if (this.changeChecks.indexOf(id) != -1) {
            this.changeChecks.splice(this.changeChecks.indexOf(id), 1)
          } else {
            this.changeChecks.push(id)
          }
          if (id != 'zhuanyi') {
            mapCore.FindLayer(id).visible = this.changeChecks.indexOf(id) != -1
          }
        }
      }
      this.updateMap(this.type, id)
    },
    updateMap (type, id) {
      if (this.clayer.QXlayer) {
        this.clayer.QXlayer.setVisible(false)
      }
      let _self = this;
      (id === 'feng' && this.initWindLayers()) ||
        (id === 'yun' && this.initWrytLayers()) ||
        (id === 'zhuanyi' &&
          this.changeChecks.indexOf(id) != -1 &&
          loadingEntTransferListData(_this.cyaer + '05', -1, -1, this.cregionid).then((res) => {
            _self.initZhuanyiLayers(res.data)
          }))
    },
    /**
     * 初始化危废转移数据
     */
    initZhuanyiLayers: function (data) {
      var geoCoordMap = data.geoCoordMap
      var planePath = 'circle'

      var convertData = function (data) {
        var res = []
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i]
          var fromCoord = geoCoordMap[dataItem[1].name]
          var toCoord = geoCoordMap[dataItem[0].name]
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
              value: 3
            })
          }
        }
        return res
      }
      var series = []
      data.resultData.forEach(function (item, i) {
        series.push(
          {
            name: item[0][0].entName + ' Top10',
            type: 'lines',
            coordinateSystem: 'arcgis',
            zlevel: 2,
            symbol: ['none', 'none'],
            symbolSize: 6,
            effect: {
              show: true,
              color:'#eee',
              opacity: 1,
              period: 3, //箭头指向速度，值越小速度越快
              trailLength: 0.5, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 6, //图标大小
            },
            // effect: {
            //   show: true,
            //   period: 4,
            //   color: '#53FF53',
            //   trailLength: 0.1,
            //   symbol: planePath,
            //   symbolSize: 15
            // },
            lineStyle: {
              normal: {
                color: '#eee',
                width: 0,
                opacity: 0.6,
                curveness: 0.2
              }
            },
            data: convertData(item)
          },{
            "coordinateSystem": 'arcgis',
            "type": "effectScatter",
            "symbolSize": 10,
            "hoverAnimation": true,
            "itemStyle": {
              "color": "rgba(60,53,212,1)",
              "borderColor": "rgba(60,53,212,1)",
              "borderWidth": 10
            },
            "data": [
              {
                "value": geoCoordMap[item[0][0].name],
                "itemStyle": {
                  "normal": {
                    "color": 'rgba(60,53,212,1)'
                  }
                }
              }
            ],
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'right', //显示位置
            //     offset: [5, 0], //偏移设置
            //     formatter: function (params) {
            //       //圆环显示文字
            //       return item[0][0].entName;
            //     },
            //     fontWeight: 3,
            //     fontSize: 30,
            //   },
            // }
            // name: item[0][0].entName + ' Top10',
            //   type: "effectScatter",
            // coordinateSystem: 'arcgis',
            //   "hoverAnimation": true,
            //   itemStyle: {
            //     "color": "rgba(60,53,212,1)",
            //     "borderColor": "rgba(60,53,212,0.4)",
            //     "borderWidth": 10
            //   },
            // // zlevel: 1,
            // // effect: {
            // //   show: true,
            // //   period: 4,
            // //   trailLength: 0.1,
            // //   color: '#fff',
            // //   symbolSize: 3
            // // },
            // //
            // // lineStyle: {
            // //   normal: {
            // //     color: '#eee',
            // //     width: 0,
            // //     curveness: 0.1
            // //   }
            // // },
            // data: convertData(item),
            // label: {
            //   normal: {
            //     show: true,
            //     position: 'right', //显示位置
            //     offset: [5, 0], //偏移设置
            //     formatter: function (params) {
            //       //圆环显示文字
            //       return item[0][0].entName;
            //     },
            //     fontWeight: 1,
            //     fontSize: 6,
            //   },
            // }
          },

        )
      })
      if (!this.clayer.QXlayer) {
        var chart = new EchartsLayer(this.$store.state.mapview)
        this.clayer.QXlayer = chart
      } else {
        this.clayer.QXlayer.setVisible(true)
      }

      // chart.setBaseMap(view)
      var option = {
        // title: {
        //     text: 'ArcGIS API for Javascript4.10扩展Echarts4之模拟迁徙',
        //     subtext: 'Data from Echart社区,Develop By YANG',
        //     left: 'center',
        //     textStyle: {
        //         color: '#fff'
        //     }
        // },
        series: series
      }
      if (this.clayer.QXlayer.domDiv == null) {
        var divdom = document.createElement('div')
        this.clayer.QXlayer.init(this.$store.state.mapview, option, divdom)
      } else {
        this.clayer.QXlayer.chart.clear()
        if (option.series.length == 0) {
          this.clayer.QXlayer.setVisible(false)
          return
        } else {
          this.clayer.QXlayer.setChartOption(option)
        }
      }
      // var divdom=document.createElement("div")
      // this.clayer.QXlayer.init(this.$store.state.mapview,option,divdom)
      this.clayer.QXlayer.chart.resize()
      this.clayer.QXlayer.box.hidden = false
    },
    /**
     * 初始化风场数据
     */
    initWindLayers: function () {
      debugger
      let cVue = this

      let nowDate = new Date()
      let nowDateStr = formatDate(nowDate, 'yyyyMMddhhmmss')
      let curHour = nowDateStr.substr(0, 10)
      let curDay = nowDateStr.substr(0, 8)
      let jsonName = curHour + '.json'
      // 风场的地址  20191204/2019120400.png  + curDay +"/"+ jsonName;
      let curJsonUrl = formatString(
        '{0}{1}/{2}',
        dataRequestUrl.options.windImageUrl,
        curDay,
        jsonName
      )
      let htmlobj = $.ajax({
        url: curJsonUrl,
        async: true,
        success: function (response) {
          debugger
          addWindHandle()
          createWindLayer(cVue.$store.state.mapview, response)
        },
        error: function () {
          // alert("请求失败");
        }
      })
    },
    /**
     * 初始化污染云图数据
     */
    initWrytLayers: function () {
      debugger
      let cVue = this
      // let geoExtent = {xmin: 111.433762, ymin: 37.149617, xmax: 112.008355, ymax: 37.486424 ,spatialReference: { wkid: 4326 }};
      // let curPicUrl = 'http://localhost/aqi.png'
      let renderField = cVue.$store.state.selectFactor
      let curPicUrl =
        dataRequestUrl.options.pollution_cloudImageUrl + renderField + '.png'
      let geoExtent = dataRequestUrl.options.pollution_cloudExtentUrl
      createWrytLayers(
        curPicUrl,
        cVue.addWrytImg,
        cVue.$store.state.mapview,
        geoExtent,
        'wrytImageLayer'
      )
    },
    addWrytImg: function (wrytImageLayer) {
      debugger
      let cVue = this
      if (cVue.$store.state.map != null) {
        let layer = cVue.$store.state.map.findLayerById('wrytImageLayer')
        if (layer != null) {
          cVue.$store.state.map.remove(layer)
        }
        // 云图放在倒数第二层
        wrytImageLayer.visible = false
        // 增加了行政区划底图
        let xzqhLayerIndex = cVue.$store.state.map.layers.findIndex(function (
          item
        ) {
          return item.id === 'xzqhBoundaryLayer'
        })
        cVue.$store.state.map.add(wrytImageLayer, xzqhLayerIndex + 1)
        debugger
        wrytImageLayer.when(function () {
          wrytImageLayer.visible = true
        })
        // 地图移动刷新,防止地图初始化时候，图片叠加图层加载刷新不过来
        setTimeout(function () {
          var center = cVue.$store.state.mapview.center.clone()
          center.x -= 1 // 底图是投影
          cVue.$store.state.mapview.center = center
          let animation = cVue.$store.state.mapview.goTo(
            cVue.$store.state.mapview.center,
            {
              speedFactor: 1,
              easing: 'linear' // linear, in-cubic, out-cubic, in-out-cubic, in-expo, out-expo, in-out-expo
            }
          )
        }, 200)
      }
    },
    mouloadingMapCheck () {
      if (this.mapLoadingSuccessStatus === true) {
        if (this.type === 'air') {
          console.log('air', '地图加载完成')
          this.changeParams[this.type][`${0}`].stationIsShow =
            this.changeParams[this.type][0].paramsList[0].id
          this.$emit(
            'changePanel',
            this.type,
            this.changeParams[this.type][0].paramsList[0].id,
            this.changeParams[this.type][0].id
          )
        } else {
          console.log(
            'water',
            '地图加载完成',
            this.changeParams[this.type],
            this.changeParams[this.type][0].id
          )
          if (this.changeParams[this.type][0].id === 'river') {
            console.log(
              this.changeParams[this.type][0].id,
              'this.changeParams[this.type][0].id'
            )
            this.$emit('changePanel', this.type, 'w01019', 'river')
          }
          if (this.changeParams[this.type][1].id === 'waterStationCheck') {
            setTimeout(() => {
              this.$emit(
                'changePanel',
                this.type,
                'guo',
                'waterStationCheck',
                this.changeParams[this.type][1].paramsList[0].isCheck
              )
            }, 1000)
          }
          // let arr = [
          //   {type: this.type, id: 'guo', layId: 'waterStationCheck', isCheck: this.changeParams[this.type][1].paramsList[0].isCheck},
          //   {type: this.type, id: 'w01019', layId: 'river', isCheck: this.changeParams[this.type][0].paramsList[0].isCheck}
          // ]
          // // arr.forEach(item => {
          // //   console.log(item.isCheck)
          // //
          // //   this.$emit('changePanel', (item.type), (item.id), (item.layId), (item.isCheck))
          // // })
          // new Promise((resolve, reject) => {
          // }).then((resolve) => { // 因为new Promise返回的就是一个promise对象实例，所以这里可以链式操作
          //   console.log(resolve)
          // })
          // this.$emit('changePanel', (this.type), ('w01019'), ('river'), (this.changeParams[this.type][0].paramsList[0].isCheck))
        }
      }
    }
  },
  props: {
    type: String,
    changePanel: Function,
    mapLoadingSuccessStatus: Boolean,
    paramsTime: Object,
    qxdata: []
  },
  watch: {
    type: function () {
      this.loadingMapCheck()
    },
    mapLoadingSuccessStatus: function () {
      console.log(this.mapLoadingSuccessStatus)
      this.loadingMapCheck()
    },
    'paramsTime.isShow': function () {
      this.loadingMapCheck()
    },
    qxdata: function () {
      this.initZhuanyiLayers(this.qxdata)
    }
  },
  mounted () {
    this.loadAll()
    this.changeChecks.push(this.cregionid)
  }
}
</script>

<style>
  .mapcheck {
    width: 244px;
    height: 612px;
    position: absolute;
    z-index: 100;
    top: 184px;
    right: 15px;
  }
.checkPanel {
  width: 100%;
  background: rgba(0, 0, 0, 1);
  border-radius: 10px;
  /*position: absolute;*/
  /*top: 45px;*/
  /*right: 25px;*/
}
.checkPanelTitle {
  height: 48px;
  background: #1d1d1d;
  border-radius: 10px 10px 0 0;
  line-height: 48px;
  padding: 0 0 0 0px;
  box-sizing: border-box;
}
.el-input__icon {
  font-size: 20px !important;
  padding-right: 0px !important;
  padding-top: 0px !important;
}
.checkoutinput .el-input__icon {
  font-size: 32px !important;
  padding-right: 20px !important;
  padding-top: 24px !important;
}
.el-input__inner {
  font-size: 16px;
}
.checkPanelMain {
  padding: 20px 14px 17px 14px;
  box-sizing: border-box;
  max-height: 1009px;
  overflow-y: scroll;
}
.checkTitleSmall {
  cursor: pointer;
}
.checkTitleSmall .name {
  height: 33px;
  line-height: 33px;
  font-size: 20px;
  margin-left: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.paramsList {
  margin: 8px 0;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  box-sizing: border-box;
  padding: 0 0 0 28px;
  opacity: 0.5;
  cursor: pointer;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.paramsList.isActive {
  opacity: 1;
}
/*.paramsList.opcaly{*/
/*  opacity: 1;*/
/*}*/
.iconMainCon {
  width: 10px;
  height: 10px;
  border: 1px solid rgba(255, 255, 255, 1);
  border-radius: 100%;
  margin-right: 10px;
}
.iconMainCon .aqi,
.iconMainCon .pm25,
.iconMainCon .pm10,
.iconMainCon .no2,
.iconMainCon .co,
.iconMainCon .o3 {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
.changeSan {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/listIcon.png") no-repeat center;
  background-size: 100%;
  margin-left: 9px;
}
.iconWaterList {
  width: 20px;
  height: 20px;
  margin: 0 10px 0px 0px;
}
.yun {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/tuceng/yun.svg") no-repeat center;
  background-size: 100%;
  margin-right: 10px;
}
.feng {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/tuceng/yun.svg") no-repeat center;
  background-size: 100%;
  margin-right: 10px;
}
.feng {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/tuceng/fengchang.svg") no-repeat
    center;
  background-size: 100%;
  margin-right: 10px;
}
.fengxiang {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/tuceng/fengsu.svg") no-repeat
    center;
  background-size: 100%;
  margin-right: 10px;
}
.now {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/tuceng/shishi.svg") no-repeat
    center;
  background-size: 100%;
  margin-right: 10px;
}
.zouhang {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/tuceng/zou.svg") no-repeat center;
  background-size: 80%;
  margin-right: 10px;
}
.dingwei {
  width: 21px;
  height: 16px;
  background: url("../../../assets/img/mapIcon/tuceng/dingwei.svg") no-repeat
    center;
  background-size: 60%;
  margin-right: 10px;
}
.heatmap {
  width: 21px;
  height: 20px;
  background: url("../../../assets/img/mapIcon/tuceng/heatmap.png") no-repeat
    center;
  background-size: 53%;
  margin-right: 10px;
}
.location {
  width: 26px;
  height: 26px;
  background: url("../../../assets/img/mapIcon/tuceng/location.png") no-repeat
    center;
  background-size: 60%;
  margin-right: 10px;
}
.produceEnterprise {
  width: 26px;
  height: 26px;
  background: url("../../../assets/img/mapIcon/tuceng/produceEnterprise.png")
    no-repeat center;
  background-size: 60%;
  margin-right: 10px;
}
.transferTruck {
  width: 26px;
  height: 26px;
  background: url("../../../assets/img/mapIcon/tuceng/transferTruck.png")
    no-repeat center;
  background-size: 60%;
  margin-right: 10px;
}
.zhuanyi {
  width: 26px;
  height: 26px;
  background: url("../../../assets/img/mapIcon/tuceng/zhuanyi.png") no-repeat
    center;
  background-size: 60%;
  margin-right: 10px;
}
.chanfeigc {
  width: 26px;
  height: 26px;
  background: url("../../../assets/img/mapIcon/tuceng/zhuanyi.png") no-repeat
    center;
  background-size: 60%;
  margin-right: 10px;
}
.errorWarn {
  width: 26px;
  height: 26px;
  background: url("../../../assets/img/mapIcon/tuceng/errorWarn.png") no-repeat
    center;
  background-size: 60%;
  margin-right: 10px;
}
.polluteEnterprise {
  width: 26px;
  height: 26px;
  background: url("../../../assets/img/mapIcon/tuceng/polluteEnterprise.png")
    no-repeat center;
  background-size: 60%;
  margin-right: 10px;
}
.el-autocomplete-suggestion.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.el-autocomplete-suggestion.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.el-icon-search {
  cursor: pointer;
}
.my-autocomplete {
  background: #1d1d1d;
  border-width: 0px;
}
.checkPanelTitle .el-autocomplete input {
  width: 102%;
  height: 50px;
  line-height: 50px;
  background: #1d1d1d;
  box-shadow: 0px 1px 17px 0px rgba(255, 255, 255, 0.13);
  border-radius: 14px;
  border-width: 0px;
}

.checkdialog {
  width: 1000px;
  min-height: 180px;
  background: #000000;
  box-shadow: 0px 2px 3px 0px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
}
.checkoutclose{
  width:100%;
  height:60px;
}
.checkdialgbanxin {
  width: 97%;
  margin: 0 auto;
  position: relative;
}
.checkdialgbanxin .el-input {
  width: 100% !important;
  height: 80px !important;
}
.checkdialgbanxin .el-input__inner {
  background-color: rgba(0, 0, 0, 1);
  box-shadow: 0px 2px 3px 0px rgba(255, 255, 255, 0.5);
  border-radius: 10px 10px 0px 0px;
  border: 0.1px solid rgba(255, 255, 255, 0.5);
    border-color:rgba(255, 255, 255, 0.5);
  width: 100% !important;
  height: 100% !important;
  font-size: 22px;
}
.checkoutinput {
  width: 100%;
  height: 80px;
}
.checknamebox {
  width: 1000px;
  max-height: 420px;
  margin-bottom:30px;
}
.checknamebox li {
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-bottom: 10px;
  cursor:pointer;
}
.checknamebox {
  overflow-y: auto;
}
.checknamebox::-webkit-scrollbar {
  width: 0;
}
/*ie10+*/
.checknamebox {
  -ms-overflow-style: none;
}
/*firefox*/
.checknamebox {
  scrollbar-width: none;
  overflow: -moz-scrollbars-none; /*旧版本的Firefox*/
}
.checknamebanxin {
  width: 97%;
  height: 100%;
  border-bottom: 1px solid #979797;
  margin: 0 auto;
}
.checkutname {
  /*height: 100px;*/
  /*line-height: 100px;*/
  font-size: 26px;
  float: left;
}
.checkoutprotion {
  width: 20px;
  height: 20px;
  background: url("../../../../src/assets/img/checkoutsearch.png") no-repeat
    center center;
  background-size: contain;
  margin: 20px 20px 0 0;
  float: right;
}
.classicon{
  width:20px;
  height:20px;
  background: url("../../../../src/assets/img/closesearch.png") no-repeat
    center center;
  background-size: contain;
  float:right;
  margin-top:10px;
  margin-right:20px;
}
.el-autocomplete-suggestion{
  display:none;
}
</style>
