<template>
  <div class="tableContainer">
    <el-form :inline="true" :model="queryStatistics" class="queryInput">
      <el-form-item label="所在地">
        <el-cascader
          placeholder="请选择所在地"
          v-model="regionCode"
          :options="regionOptions"
          style="width: 150px"
          change-on-select
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="选择时间">
        <el-date-picker
          style="width: 260px"
          v-model="queryStatistics.time"
          type="monthrange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="数据类型">
        <el-select
          v-model="queryStatistics.typeId"
          style="width: 140px"
          @change="getTypeId"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="危废类型">
        <el-select
          v-model="queryStatistics.dicType"
          multiple
          collapse-tags
          style="width: 150px"
          placeholder="请选择"
          @change="getDetailsCodeByDicType()"
        >
          <el-option
            v-for="item in dicTypeOptions"
            :key="item.id"
            :label="item.typeName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="危废编码">
        <el-select
          v-model="queryStatistics.detailsCode"
          multiple
          collapse-tags
          style="width: 180px"
          :disabled="dicTypeFlag"
          placeholder="请选择"
          @change="getDetailsCode"
        >
          <el-option
            v-for="item in detailsCodeOptions"
            :key="item.detailsCode"
            :label="item.detailsCode"
            :value="item.detailsCode"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="button"
          size="medium"
          @click="onSubmit"
          class="el-button el-button--primary"
        >
          <span>查询</span></el-button
        >
        <!-- <el-button type="button" size="medium"  @click="exportEntTableData" class="el-button el-button--primary">
              <span>导出</span></el-button> -->
      </el-form-item>
    </el-form>
    <ul class="tabs-wrap">
      <li
        class="tab-item"
        :class="{ active: currentIndex == index }"
        v-for="(tab, index) in tabsList"
        :key="index"
        @click="changeTab(tab, index)"
      >
        <span>{{ tab.title }}</span>
      </li>
    </ul>
    <!-- 内容 -->
    <div class="maptableclass">
      <div label="危废类型" v-if="activeName == 'first'">
        <el-table
          :data="newtableDataCompany"
          :span-method="objectSpanMethod"
          height="600px"
          style="width: 100%"
        >
          <!-- <template slot="empty">
                  <img src="../../../../assets/img/empty-data.png" alt="">
                  </template> -->
          <el-table-column
            prop="entName"
            label="企业名称"
            align="center"
            v-if="activeName === 'second'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.entName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="entName"
            label="危废类别"
            align="center"
            v-if="activeName === 'first'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="regionName"
            label="区县"
            align="center"
          ></el-table-column>
          <el-table-column
            label="危废类别"
            width="250px"
            align="center"
            v-if="activeName === 'second'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="危废编码"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="suName"
            label="俗称"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="queryStatistics.typeId === 1"
            prop="yield"
            label="产生量（吨）"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="queryStatistics.typeId === 2"
            prop="entrustedUtilization"
            label="委外处置利用量（吨）"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="queryStatistics.typeId === 3"
            prop="storage"
            label="贮存量（吨）"
            align="center"
          ></el-table-column>
        </el-table>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="pageCount"
            background
          >
          </el-pagination>
        </div>
      </div>
      <div label="企业数据" v-if="activeName == 'second'">
        <el-table
          :data="newtableDataCompany"
          :span-method="objectSpanMethod"
          height="600px"
          style="width: 100%"
        >
          <!-- <template slot="empty">
                  <img src="../../../../assets/img/empty-data.png" alt="">
                  </template> -->
          <el-table-column
            prop="entName"
            label="企业名称"
            align="center"
            v-if="activeName === 'second'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.entName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="entName"
            label="危废类别"
            align="center"
            v-if="activeName === 'first'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="regionName"
            label="区县"
            align="center"
          ></el-table-column>
          <el-table-column
            label="危废类别"
            width="250px"
            align="center"
            v-if="activeName === 'second'"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.typeName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="危废编码"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="suName"
            label="俗称"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="queryStatistics.typeId === 1"
            prop="yield"
            label="产生量（吨）"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="queryStatistics.typeId === 2"
            prop="entrustedUtilization"
            label="委外处置利用量（吨）"
            align="center"
          ></el-table-column>
          <el-table-column
            v-if="queryStatistics.typeId === 3"
            prop="storage"
            label="贮存量（吨）"
            align="center"
          ></el-table-column>
        </el-table>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="pageCount"
            background
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import downloadFile from '../../../../unit/DownloadFile'
export default {
  data () {
    return {
      currentIndex: 0,
      currentName: 'first',
      tabsList: [
        { name: 'first', title: '危废类型' },
        { name: 'second', title: '企业数据' }
      ],
      pageSize: 50,
      cur_page: 1,
      pageCount: 1,
      pageSizes: [10, 15, 20, 30, 50, 100],
      activeName: 'first',
      regionOptions: [],
      regionCode: [],
      regionCodeId: this.app_config.appInfo.regionCode,
      pickerOptions: {
        shortcuts: [
          {
            text: '上月',
            onClick (picker) {
              const end = new Date()
              end.setMonth(end.getMonth() - 1)
              picker.$emit('pick', [end, end])
            }
          },
          {
            text: '今年至上月',
            onClick (picker) {
              const end = new Date()
              end.setMonth(end.getMonth() - 1)
              const start = new Date(new Date().getFullYear(), 0)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 3)
              end.setMonth(end.getMonth() - 1)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      queryStatistics: {
        typeId: 1,
        time: [this.returnStart(), this.returnStart()],
        dicType: [],
        detailsCode: []
      },
      dicTypeFlag: true,
      dicTypeOptions: [],
      detailsCodeOptions: [],
      regionName: sessionStorage.getItem('regionName'),
      typeOptions: [
        { type: 1, name: '产生量' },
        { type: 2, name: '委外处置利用量' },
        { type: 3, name: '贮存量' }
      ],
      newtableDataCompany: [
        // {
        //   entName: "",
        //   region: "",
        //   typeName: "",
        //   name: "",
        //   code: "",
        //   suName: "",
        //   lastNum: "",
        //   yield: "",
        //   inventoryAdjustment: "",
        //   weiwaiNum: "",
        //   shengwai: "",
        //   shengnei: "",
        //   zixing: "",
        //   ciNum: "",
        //   storage: "",
        //   yearStorage: "",
        //   mouth: "",
        // },
      ]
    }
  },
  created () {
    this.loadingData()
    this.getRegionChildrenList()
    this.showDicType()
  },
  methods: {
    // 切换类型
    changeTab (tab, index) {
      this.activeName = tab.name
      this.currentIndex = index
      this.loadingData()
    },
    getDetailsCodeByDicType () {
      console.log('leng', leng)
      var leng = this.queryStatistics.detailsCode.length
      if (leng == 0) {
        this.dicTypeFlag = true
      }
    },
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.pageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1
      this.loadingData()
    },
    handleCurrentChange (val) {
      this.cur_page = val
      this.loadingData()
    },
    returnStart () {
      const start = new Date()
      if (start.getMonth() < 10) {
        return start.getFullYear() + '-0' + start.getMonth()
      } else {
        return start.getFullYear() + '-' + start.getMonth()
      }
    },
    handleClick (tab, event) {
      this.onSubmit()
    },
    getDetailsCodeByDicType () {
      var _this = this
      _this.$axios
        .get(
          '/api/regulatory/type/getDetailsCodeByDicType?types=' +
            _this.queryStatistics.dicType.join(',')
        )
        .then(function (res) {
          if (res.data.code == 0) {
            _this.detailsCodeOptions = []
            if (res.data.data.length > 0) {
              for (var i = 0; i < res.data.data.length; i++) {
                _this.detailsCodeOptions.push(res.data.data[i])
              }
            } else {
              _this.detailsCodeOptions = []
            }
            _this.dicTypeFlag = false
            if (_this.queryStatistics.dicType.length == 0) {
              _this.dicTypeFlag = true
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    showDicType () {
      var _this = this
      _this.$axios
        .post('/api/regulatory/type/showDicType', {
          params: {
            type: 1
          }
        })
        .then(function (res) {
          console.log('危废类型', res)

          if (res.data.code == 0) {
            // let harzardousTypeList = sessionStorage.getItem('harzardousTypeList')
            // let harzardousList = JSON.parse(harzardousTypeList)
            // res.data.data.forEach((item) => {
            //   harzardousList.forEach(ele => {
            //     if (item.typeName == ele.typeName) {
            //       item.dicTypeExplain = ele.dicTypeExplain
            //     }
            //   })
            // })

            let filteredList = res.data.data.filter(item => {
              if (item.dicTypeExplain != undefined) {
                return item
              }
            })

            _this.dicTypeOptions = filteredList
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    getRegionChildrenList () {
      var _this = this
      _this.$axios
        .get('/api/regulatory/regionInfo/getRegionChildrenList', {
          params: {
            regionCode: this.regionCodeId
          }
        })
        .then(function (res) {
          if (res.data.code == 0) {
            _this.regionOptions = res.data.data
            _this.regionCode = [res.data.data[0].value + '']
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log(error)
        })
    },
    getTypeId () {
      this.onSubmit()
    },
    loadingData () {
      var _this = this
      var start = ''
      var end = ''
      if (
        _this.queryStatistics.time != null &&
        _this.queryStatistics.time.length > 0
      ) {
        start = _this.queryStatistics.time[0]
        end = _this.queryStatistics.time[1]
      }
      _this.$axios
        .get(
          '/api/regulatory/tEnterpriseStorageStandingBook/getProductionStatistics',
          {
            params: {
              regionCode:
                this.regionCode[this.regionCode.length - 1] || this.regionCodeId,
              start: start,
              end: end,
              dataType: _this.queryStatistics.typeId,
              orderType: 1,
              dicType: _this.queryStatistics.dicType.join(','),
              // dicType: '17,105,104,103,102,1',
              detailsCode: _this.queryStatistics.detailsCode.join(','),
              // detailsCode: '900-041-49,219-002-08,071-001-08,251-002-08,251-003-08,251-004-08',
              activeName: _this.activeName,
              page: _this.cur_page,
              limit: _this.pageSize
            }
          }
        )
        .then((response) => {
          // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
          if (response.data.code == 0) {
            console.log('meiling成功之后的回调', response)
            _this.newtableDataCompany = response.data.data.records
            _this.pageCount = response.data.data.total
            // _this.pageSize = response.data.data.pages;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          console.log('error', error)
        })
    },
    // exportEntTableData(){
    //   var url = "/api/regulatory/tEnterpriseStorageStandingBook/getProductionStatisticsExport";
    //   let params = new URLSearchParams();
    //   var _this = this;
    //   var start = "";
    //   var end = "";
    //   if(null != _this.queryStatistics.time&&_this.queryStatistics.time.length>0){
    //     start = _this.queryStatistics.time[0];
    //     end = _this.queryStatistics.time[1];
    //   }
    //   params.append("regionCode", _this.regionCode[_this.regionCode.length-1]);
    //   params.append("start", start);
    //   params.append("end", end);
    //   params.append("dataType", _this.queryStatistics.typeId);
    //   params.append("orderType", 1);
    //   params.append("dicType", _this.queryStatistics.dicType.join(","));
    //   params.append("detailsCode", _this.queryStatistics.detailsCode.join(","));
    //   params.append("activeName", _this.activeName);
    //   this.$axios
    //           .post(
    //                   url,
    //                   params,
    //                   { responseType: "blob" } // 1.首先设置responseType对象格式为 blob:
    //                   // {responseType: 'arraybuffer'}
    //           )
    //           .then(function (response) {
    //             downloadFile(response);
    //           })
    //           .catch(function () {
    //             _this.$message.info("导出异常,请重试!");
    //           });
    // },
    onSubmit () {
      this.cur_page = 1
      this.pageSize = 50
      this.loadingData()
    },
    objectSpanMethod () {}
  }
}
</script>
<style>
.tabs-wrap {
  display: flex;
  margin-bottom: 30px;
}
.tabs-wrap .tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.8);
  color: rgba(255, 255, 255, 0.8);
}
.tabs-wrap .tab-item.active {
  background-color: rgba(34, 82, 240, 1);
}
</style>
<style scoped>
.wasteList .tableContainer {
  box-sizing: border-box;
  height: 100%;
}
.wasteList .tab {
  width: 100%;
  display: flex;
  border-bottom: 1px solid #f4f4f4;
}
.wasteList .tab .tabMain {
  cursor: pointer;
}
.wasteList .tab .tabMain.selected {
  font-weight: bold;
  background: #fff;
  border-bottom: 2px solid #35a1ec;
  color: #35a1ec;
}
.wasteList .tableMain {
  overflow: scroll;
  height: 100%;
}

.wasteList .el-form--inline .el-form-item {
  margin-bottom: 1%;
}
.wasteList .el-table {
  color: #333;
}
.wasteList .el-table thead {
  color: #333;
}
.wasteList .el-table--border {
  /* 2px solid # */
  border: 1px solid #8c939d;
}
.wasteList .el-table th.is-leaf,
.el-table td {
  border-bottom: 1px solid #8c939d;
}
.wasteList .el-table--border th,
.el-table--border td {
  border-right: 1px solid #8c939d;
}
.tableContainer >>> .el-form-item__label {
  color: #ffffff;
}
.tableContainer >>> .el-input__icon {
  font-size: 28px !important;
  padding-top: 2px !important;
  padding-right: 4px !important;
}
.tableContainer >>> .el-date-editor .el-range__icon {
  line-height: 25px !important;
}
.tableContainer >>> .el-form-item__label {
  font-size: 16px !important;
}
.wasteList .el-button {
  /*background: #35a1ec;*/
  padding: 0 20px;
  line-height: 35px;
}
.wasteList .panel {
  padding: 10px;
  box-sizing: border-box;
  height: 95%;
}
.el-form-item__label {
  color: #ffffff;
}
.el-tabs__item {
  color: #ffffff;
}
.el-tabs__item.is-active {
  color: #ffffff;
  background-color: rgba(34, 82, 240, 1);
}

.tableContainer >>> .el-input__inner {
  font-size: 18px !important;
}
.maptableclass >>> .el-pagination {
  text-align: right;
  margin-top: 20px;
}
.maptableclass >>> .el-table__header-wrapper tr,
.el-table__body-wrapper tr {
  background-color: transparent;
}
.maptableclass >>> .el-table__header-wrapper th {
  background: rgba(168, 168, 175, 0.14);
}
.maptableclass >>> .el-table__body-wrapper td {
  background: rgba(168, 168, 175, 0.14);
}
.maptableclass >>> .el-table {
  background: rgba(169, 168, 239, 0.14);
  font-size: 18px;
}
.maptableclass >>> .el-table__header-wrapper .has-gutter tr {
  background: transparent !important;
}
.maptableclass >>> .el-table__body-wrapper .el-table__body tr {
  background: transparent !important;
}
.maptableclass >>> .el-table tbody tr:hover > td {
  background-color: rgba(169, 168, 239, 0.24) !important;
}
.maptableclass >>> .el-table__body-wrapper .el-table__body td {
  color: #ffffff;
}
.maptableclass >>> .el-table th {
  background: rgba(169, 168, 239, 0.14) !important;
  color: #ffffff;
}
.maptableclass >>> .el-table__body th {
  background: rgba(169, 168, 239, 0.14) !important;
  color: #ffffff;
}
.maptableclass >>> .el-icon-arrow-right:before {
  color: #fff;
  font-size: 16px;
}
.maptableclass >>> .el-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.tableContainer >>> .el-button--primary {
  background: rgba(34, 82, 240, 1);
  border-color: rgba(34, 82, 240, 1);
}
</style>
