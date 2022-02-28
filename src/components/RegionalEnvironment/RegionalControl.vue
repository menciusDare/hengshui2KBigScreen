<template>
  <div class="backgroundPop width1500 height1150">
    <div class="titleLine rankBg">
      <div class="textTitle">
        <span>协同管控</span>
      </div>
      <div>
        <el-select v-model="regionalvalue" clearable placeholder="请选择" class="airWuranSelected changeSelected" @change="controllerLevel">
          <el-option
            v-for="item in regionalSelected"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="regionalCon rowSpace">
      <div class="changetable ">
        <el-table
        :data="regionalConTable"
        cell-mouse-enter="handleEdit"
        max-height="385"
        style="width: 100%">
        <el-table-column
          prop="num"
          align="center"
          label="排名">
          <template slot-scope="scope">
            NO.
            <span v-if="scope.row.num<10">0{{scope.row.num}}</span>
            <span v-else>{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="quyu"
          align="center"
          label="区域">
        </el-table-column>
        <el-table-column
          prop="chuli"
          align="center"
          label="处理率">
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          label="超时率">
          <template slot-scope="scope">
            <span v-if="scope.row.time === '100%'" class="red">{{scope.row.time}}</span>
            <span v-else>{{scope.row.time}}</span>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div class="changetable ">
        <el-table
        :data="regionalConTable1"
        cell-mouse-enter="handleEdit"
        max-height="385"
        style="width: 100%">
        <el-table-column
          prop="num"
          align="center"
          label="排名">
          <template slot-scope="scope">
            NO.
            <span v-if="scope.row.num<10">0{{scope.row.num}}</span>
            <span v-else>{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="quyu"
          align="center"
          label="区域">
        </el-table-column>
        <el-table-column
          prop="chuli"
          align="center"
          label="处理率">
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          label="超时率">
          <template slot-scope="scope">
            <span v-if="scope.row.time === '100%'" class="red">{{scope.row.time}}</span>
            <span v-else>{{scope.row.time}}</span>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <div class="questionMain rowSpace">
      <div class="questionRegion">
        <div class="textTitle">
          <span>问题分布（区域）</span>
        </div>
        <div class="questionRegionCon">
          <div
            class="questionRound"
            v-for=" (item, index) in questionRound"
            :key="index"
            :class="item.class"
            :style={width:item.width,height:item.height,left:item.left,top:item.top}>
            <div class="num">
              {{item.num}}
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="questionIndustry">
        <div class="textTitle">
          <span>问题分布（行业）</span>
        </div>
        <v-chart class="regionRankMain" :options="polar" />
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      regionalConTable: [
        {num: '1', quyu: '锦州', chuli: 29, time: '100%'},
        {num: '1', quyu: '锦州', chuli: 29, time: '99%'}
      ],
      regionalConTable1: [
        {num: '1', quyu: '锦州', chuli: 29, time: '88%'},
        {num: '10', quyu: '锦州', chuli: 29, time: '99%'},
        {num: '10', quyu: '锦州', chuli: 29, time: '100%'}
      ],
      questionRound: [
        {name: '', width: '15px', height: '15px', left: '502px', top: '32px', class: 'zi', num: ''},
        {name: '', width: '15px', height: '15px', left: '445px', top: '169px', class: 'zi', num: ''},
        {name: '', width: '15px', height: '15px', left: '419px', top: '328px', class: 'zi', num: ''},
        {name: '', width: '15px', height: '15px', left: '73px', top: '332px', class: 'zi', num: ''},
        {name: '', width: '21px', height: '21px', left: '78px', top: '218px', class: 'zi', num: ''},
        {name: '', width: '21px', height: '21px', left: '208px', top: '78px', class: 'zi', num: ''},
        {name: '', width: '13px', height: '13px', left: '84px', top: '275px', class: 'zi', num: ''},
        {name: '', width: '11px', height: '11px', left: '294px', top: '400px', class: 'zi', num: ''},
        {name: '', width: '32px', height: '32px', left: '220px', top: '126px', class: 'zi', num: ''},
        {name: '', width: '82px', height: '82px', left: '330px', top: '352px', class: 'lu', num: ''},
        {name: '嘉鱼县', width: '130px', height: '130px', left: '250px', top: '23px', class: 'lu', num: '40'},
        {name: '赤壁市', width: '98px', height: '98px', left: '484px', top: '100px', class: 'zi', num: '63'},
        {name: '通山县', width: '108px', height: '108px', left: '411px', top: '223px', class: 'zi', num: '53'},
        {name: '咸安区', width: '162px', height: '162px', left: '232px', top: '163px', class: 'zi', num: '80'},
        {name: '崇阳县', width: '118px', height: '118px', left: '126px', top: '299px', class: 'lan', num: '48'},
        {name: '通城县', width: '124px', height: '124px', left: '91px', top: '117px', class: 'zi', num: '54'}

      ],
      polar: {
        grid: [
          {x: '7%', y: '9%', width: '90%', height: '82%'}
        ],
        tooltip: {},
        legend: {
          show: false
        },
        xAxis: {
          data: ['咸安区', '嘉鱼县', '通城县', '崇阳县', '通山县', '赤壁市'],
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
          }
        },
        yAxis: {
          name: '数量',
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
        },
        series: [{
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(63, 127, 158, 1) '
              },
              {
                offset: 1,
                color: 'rgba(102, 105, 255, 0.8)'
              }
            ])
          },
          barWidth: 32
        }]
      },
      regionalSelected: [
        {
          id: 0,
          label: '一月'
        }, {
          id: 1,
          label: '二月'
        }, {
          id: 2,
          label: '三月'
        }
      ],
      regionalvalue: 0
    }
  },
  methods: {
    controllerLevel () {

    }
  }
}
</script>
