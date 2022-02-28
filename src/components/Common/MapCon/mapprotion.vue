<template>
  <div class="mapcontainer" v-if="isShowMapcontainer">
    <div class="mapprotion" v-if="show">
      <div class="mapbanxin">
        <div class="mapprotionheader">
          <div class="close" @click="closeprotion()"></div>
        </div>
        <div class="mapswitchnew">
          <div style="float: left">
            <el-radio-group v-model="radio1" @change="changeradio()">
              <el-radio-button label="1">产废</el-radio-button>
              <el-radio-button label="2">贮存</el-radio-button>
              <el-radio-button label="3">转移</el-radio-button>
            </el-radio-group>
          </div>
          <div class="infobutton" @click="infobuttonshow">企业详情</div>
        </div>
        <div class="maptable">
          <el-table
            :data="tablelist"
            style="width: 100%"
            row-key="id"
            lazy
            height="760"
            :load="load"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            :key = 'itemKey'
          >
            <el-table-column
              prop="hours"
              label="类型"
              width="200"
              align="center"
            >
             <template slot-scope="scope">
                <!-- <el-tooltip class="item" effect="dark" :content="scope.row.hours" placement="right-start" >
                  <span>{{scope.row.hours}}</span>
                </el-tooltip> -->
                 <el-popover
    placement="top-start"
    title=""
    width="250"
    trigger="hover"
     popper-class="my-popover"
    :content="scope.row.hours">
    <span slot="reference" class="mui-ellipsis">{{scope.row.hours}}</span>
  </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="占比(%)"
              align="center"
              height="100"
            >
              <template slot-scope="scope">
                <!-- {{(((scope.row.feng)/(scope.row.zong) )*500)}}
          {{((scope.row.rate)*(500))}}
          {{scope.row.rate*500}} -->
          <div style="display:flex;">
                <div class="zhanbi" :style="{ background:scope.row.lightColour}">
                  <div
                    class="zhanbilu"

                    :style="{
                      width: scope.row.proportion * 500 + 'px',
                      background:scope.row.darkColor
                    }"
                  ></div>
                </div>
                <div style="margin-left:8px;margin-top:-3px;font-size:10px;"
               >{{(scope.row.proportion*100).toFixed(1)}}%</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="cumulativeTotal"
              label="数量（吨）"
              width="200"
              align="center"
            >
            </el-table-column>
          </el-table>
        </div>
        <!-- 企業詳情彈框 -->
      </div>
    </div>
    <my-dialog
      dialogTitle="完整报表"
      ref="myDialog"
      :dialogWidth="1500"
      @handelClose="handelClose"
    >
      <div slot="body">
        <statisticsProductionList></statisticsProductionList>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import statisticsProductionList from '../../../../src/components/Common/pegeCommon/statisticalAnalysis/statisticsProductionList.vue'
import MyDialog from '../../Common/MyDialog.vue'
import {
  getmapdialog,
  getmapchild
} from '../../../../src/common/api/mapdialog.js'

export default {
  name: 'mapprotion',
  props: ['disableprotionshow'],

  components: {
    MyDialog,
    statisticsProductionList
  },
  data () {
    return {
      visible: false,
      isShowMapcontainer: true,
      show: false,
      radio1: '1',
      itemKey: Math.random(),
      regionCode: this.AppConfig.appInfo.regionCode,
      tableData1: [
        {
          id: 1,
          hours: 'HW50',
          cumulativeTotal: '29829.99',
          proportion: '0.5',
          children: [
            {
              id: 2,
              hours: 'HW50',
              cumulativeTotal: '29829.99',
              proportion: '0.5'
            },
            {
              id: 32,
              leixing: 'HW51',
              address: '29829.99',
              rate: '0.9'
            }
          ]
        }
      ]
    }
  },
  methods: {
    load (tree, treeNode, resolve) {
      // console.log(tree, "tree");
      var value = tree.cumulativeTotal * 1000
      getmapchild(this.radio1, tree.hours, this.regionCode, value).then(
        (res) => {
          for (let i = 0; i < res.data.length; i++) {
            var id = i + 1000
            res.data[i].id = id
          }
          resolve(res.data)
          // console.log( tree,"9898989898596595658858")
        }
      )
    },
    changeradio () {
      this.tablelist = []
      let _this = this
      getmapdialog(this.radio1, this.regionCode).then((res) => {
        _this.tablelist = res.data
        _this.itemKey = Math.random()
        for (let i = 0; i < _this.tablelist.length; i++) {
          var children = [
            {
              id: i + 1000,
              hours: 'HW50',
              cumulativeTotal: '29829.99',
              proportion: '0.5'
            }
          ]
          var id = i + 1
          _this.tablelist[i].children = children
          _this.tablelist[i].id = id
          _this.tablelist[i].hasChildren = true
        }
      })
    },
    // 获取表格信息
    gettable () {
      getmapdialog(1, this.regionCode).then((res) => {
        this.tablelist = res.data
        for (let i = 0; i < this.tablelist.length; i++) {
          // var children=[
          //    {
          //       id: 21,
          //       hours: "HW50",
          //       cumulativeTotal: "29829.99",
          //       proportion: "0.5",
          //     },

          // ];
          var id = i + 1
          // this.tablelist[i].children=children;
          this.tablelist[i].id = id
          this.tablelist[i].hasChildren = true
        }
        console.log(this.tablelist, '获取11')
      })
    },
    // 打开企业信息弹窗
    openQyinfo () {
      this.show = true
    },
    // 关闭报表弹窗
    handelClose () {
      console.log('关闭李 ')
      this.$refs.myDialog.isShowDialog = false
    },
    closeprotion () {
      this.$emit('closeprotion')
    },
    // disableprotionshow () {
    //   this.disableprotionshow = false
    // },
    infobuttonshow () {
      this.show = false
      this.$refs.myDialog.open()
    }
  },
  mounted () {
    this.gettable()
  }
}
</script>

<style scoped>
@import "../../../assets/css/CenterMain.css";
.container {
  position: relative;
}
/deep/ .mapdialog .el-dialog {
  background: none !important;
  border-radius: 13px !important;
}
/deep/ .mapdialog .el-dialog__header {
}

.mapprotion {
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  min-height: 935px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 13px;
  z-index: 999;
}
.mapbanxin {
  width: 97%;
  margin: 0 auto;
}
.mapprotionheader {
  width: 100%;
  height: 50px;
  border-radius: 13px;
  margin-bottom: 20px;
  margin-top: 10px;
}
.mapswitchnew {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
}
/deep/ .mapswitchnew .el-radio-button__inner {
  width: 120px !important;
  border: none;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 22px;
  line-height: 15px;
}
/deep/
  .mapswitchnew
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
  background: rgba(34, 82, 240, 1);
  border-color: none;
  color: #fff;
}
.infobutton {
  float: right;
  width: 160px;
  height: 100%;
  background: rgba(34, 82, 240, 1);
  text-align: center;
  line-height: 40px;
  font-size: 22px;
}
.maptable {
  width: 100%;
}
.close {
  width: 25px;
  height: 25px;
  float: right;
  margin-top: 10px;
  background: url("../../../../src/assets/img/mapclose.png") no-repeat center
    center;
  background-size: contain;
}
.zhanbi {
  width: 500px;
  height: 6px;
  border-radius: 7px;
  background: yellowgreen;
}
.zhanbilu {
  width: 60%;
  height: 5.8px;
  border-radius: 7px;
  background: rgba(72, 207, 174, 1);
}
/deep/ .maptable .el-table td {
  padding: 20px 0 !important;
  background: rgba(169, 168, 239, 0.14);
}
/deep/ .maptable .el-table th {
  padding: 20px 0 !important;
  background: rgba(169, 168, 239, 0.14);
}
/deep/ .maptable .el-table {
  background: rgba(169, 168, 239, 0.14);
  font-size: 18px;
}
/deep/ .maptable .el-table__header-wrapper .has-gutter tr {
  background: transparent !important;
}
/deep/ .maptable .el-table__body-wrapper .el-table__body tr {
  background: transparent !important;
}
/deep/.maptable .el-table tbody tr:hover > td {
  background-color: rgba(169, 168, 239, 0.24) !important;
}
/deep/.maptable .el-table__body-wrapper .el-table__body td {
  color: #ffffff;
}
/deep/ .maptable .el-table th {
  background: rgba(169, 168, 239, 0.14) !important;
  color: #ffffff;
}
/deep/ .maptable .el-table__body th {
  background: rgba(169, 168, 239, 0.14) !important;
  color: #ffffff;
}
/deep/ .maptable .el-icon-arrow-right:before {
  color: #fff;
  font-size: 16px;
}
/deep/ .maptable .el-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
/deep/.el-table th.is-leaf {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
 /deep/ .el-tooltip__popper {
    min-width: 100px;
}
.mui-ellipsis {
   overflow: hidden;
     white-space: nowrap;
    text-overflow: ellipsis;
 }
</style>
<style>
.my-popover{
  background:rgba(0, 0, 0, 0.7);
  border:none;
  color:#fff;
  font-size:18px;
    min-width:  200px ;
      -webkit-box-shadow :  0   2px   12px   0   rgba ( 0 ,  0 ,  0 ,  0.1 );
    box-shadow:  0   2px   12px   0   rgba ( 0 ,  0 ,  0 ,  0.1 );
    word-break: break-all;
}

</style>
