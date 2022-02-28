<template>
  <el-table
    class="changeTable"
    :data="data"
    style="width: 100%">
    <el-table-column
      v-for="(item, index) in dataName"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      :align="item.isCenter == false ? '' : 'center'"
      height="100%"
      v-if="item.prop != 'id'">
      <template slot-scope="scope">
        <div
          v-if="item.type === 'normal'"
          :style="{color: !!item.isColor ? item.color : '' }">
          {{ scope.row[item.prop]}}{{!!item.isRate? '%': ''}}
        </div>
        <div v-if="item.type === 'bing'" class="alginCenter">
          <bing :data = "scope.row[item.prop]" :id="scope.row['id']"></bing>
          <div style="margin-left: 10px">{{scope.row[item.prop]}}%</div>
        </div>
        <div v-if="item.type === 'index'" class="rowCenter alginCenter">
          <div
            class="indexCss alginCenter rowCenter"
            :class="item.isRank === true && scope.row[item.prop]=='1' ||
            item.isRank === true && scope.row[item.prop]== '2'? 'isBackground' : ''">{{scope.row[item.prop]}}</div>
        </div>
        <div v-if="item.type === 'mubiao'" class="rowFlex alginCenter">
          <div v-for="(itemChildren, indexChildren) in item.isChildren" :key="indexChildren" class="alginCenter rowSpace">
            <div class="mubiaoIcon" :style="{background: color[scope.row[itemChildren.id]], marginRight: '7px'}"></div>
            <div class="">{{scope.row[itemChildren.id]}}类</div>
            <div class="jiantouIcon" v-if="indexChildren === 0" style="margin-left: 10px"></div>
          </div>
        </div>
        <div v-if="item.type === 'prence'" class="rowCenter alginCenter">
          <el-progress :percentage="scope.row[item.prop]" :show-text="!!item.isTrue ? item.isTrue: true "></el-progress>
        </div>
        <div v-if="item.type === 'zhexian'" class="rowCenter alginCenter">
          <div class="zhexianData">
            <Zhexian
              :data = "scope.row[item.prop]"
              :id="scope.row['id']"
              :params = "zhexianParams"></Zhexian>
          </div>
        </div>
        <div v-if="item.type === 'rate'" class="rowCenter alginCenter">
          <div class="tableIcon" :class="scope.row[item.prop]<0? 'xiajiang': 'shangsheng'"></div>
          <div>{{scope.row[item.prop]}}</div>
        </div>
        <div v-if="item.type === 'normal-num'" class="alginCenter">
          <div
            :style="{background: airColor[`${scope.row[item.prop]}`], marginRight: '10px'}"
            class="alginCenter rowCenter indexCss">
            {{scope.row['num']}}
          </div>
          <div>{{scope.row[item.prop]}}</div>
        </div>
        <div v-if="item.type === 'rank-name'" class="alginCenter">
          <div
              :style="{background: airColor[`${scope.row[item.prop]}`], marginRight: '10px'}"
              class="indexCss alginCenter rowCenter"
              :class="item.isRank === true && scope.row['num']=='1' ||
              item.isRank === true && scope.row['num']== '2'? 'isBackground' : ''">
            {{scope.row['num']}}
          </div>
          <div>{{scope.row['name']}}</div>
        </div>
        <div v-if="item.type === 'status'" class="alginCenter">
          <div
              style="width: 100%; height: 40px; border: 1px solid; border-radius: 7px"
              :style="{
                background: xietongStatus[`${scope.row[item.prop]}`]['back'],
                borderColor: xietongStatus[`${scope.row[item.prop]}`]['border'],
                color: xietongStatus[`${scope.row[item.prop]}`]['color']}"
              class="alginCenter rowCenter">
            {{scope.row[`${item.prop}`]}}
          </div>
        </div>
        <!--   完成率/已完成/总数 === 区域考核排名     -->
        <div v-if="item.type === 'bing-wancheng'" class="alginCenter">
          <bing :data = "scope.row['completeRate']" :id="scope.row['id']"></bing>
          <span style="margin-left: 10px; margin-right: 10px">{{scope.row['completeRate']}}%</span> /
          <span style="margin-left: 10px; margin-right: 10px">{{scope.row['completeCount']}}</span> /
          <span style="margin-left: 10px; margin-right: 10px">{{scope.row['totalCount']}}</span>
        </div>
        <div v-if="item.type === 'caozuo'" class="alginCenter">
          <div
            v-for="(itemChildren, itemChildrenIndex) in item.isChildren"
            :class="itemChildren.name === '催办' ? 'cuiban': ''"
            @click="handleEdit(scope.$index, scope.row, itemChildren.name)">
            {{itemChildren.name}}
          </div>
        </div>
        <!--   综合看板     -->
        <div v-if="item.type === 'num-name'" class="alginCenter">
          <div
              :style="{background: airColor[`${scope.row[item.prop]}`], marginRight: '10px'}"
              class="indexCss alginCenter rowCenter">
            {{scope.row['rankingNum']}}
          </div>
          <div>{{scope.row[item.prop]}}</div>
        </div>
        <div v-if = "item.type === 'changEcharts'">
            <div class="zhexianData">
           <changEcharts
              :data = "scope.row[item.prop]"
              :id="scope.row['id']"
              :params = "zhexianParams"></changEcharts>
                </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import bing from '@/components/Common/Echarts/bing.vue'
import Zhexian from '@/components/Common/Echarts/Zhexian.vue'
import changEcharts from '@/components/Common/Echarts/changEcharts.vue'

export default {
  name: 'TableCommon',
  data () {
    return {
      color: {
        'I': 'rgba(90, 216, 166, 1)',
        'II': 'rgba(255, 221, 38, 1)'
      },
      zhexianParams: {
        xIsTrue: false,
        yIsTrue: false,
        color: ['#fff'],
        isAreaStyle: false,
        id: 'common',
        grid: {
          width: '90%',
          height: '100%',
          top: 0,
          left: 0
        },
        legend: false,
        position: 'left'
      },
      airColor: {
        '严重污染': 'rgba(182, 32, 224, .24)',
        '重度污染': 'rgba(224, 32, 32, .24)',
        '中度污染': 'rgba(247, 181, 0, .24)',
        '轻度污染': 'rgba(50, 197, 255, .24)',
        '优良': 'rgba(109, 212, 0, .24)'
      },
      xietongStatus: {
        '已超时': {
          color: 'rgba(224, 32, 32, 1)',
          border: 'rgba(224, 32, 32, 0.33)',
          back: 'rgba(224, 32, 32, 0.1)'
        },
        '已办结': {
          color: 'rgba(236, 178, 6, 1)',
          border: 'rgba(236, 178, 6, .33)',
          back: 'rgba(247, 181, 0, 0.1)'
        },
        '处理中': {
          color: 'rgba(82, 110, 228, 1)',
          border: 'rgba(82, 110, 228, .33)',
          back: 'rgba(59, 75, 237, 0.1)'
        },
        '已完成': {
          color: 'rgba(109, 212, 0, 1)',
          border: 'rgba(109, 212, 0, .33)',
          back: 'rgba(109, 212, 0, .1)'
        }
      }
    }
  },
  methods: {
    handleEdit (row, main, name) {
      if (name === '催办') {
        console.log('催办')
      } else {
        console.log('详情')
      }
    }
  },
  props: {
    data: Array,
    dataName: Array
  },
  components: {
    bing,
    Zhexian,
    changEcharts
  }
}
</script>

<style scoped>
.indexCss{
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  width: 33px;
  height: 33px;
  font-size: 16px;
}
.indexCss.isBackground{
  background: #4164F5;
  color: #fff;
}
.mubiaoIcon{
  width: 15px;
  height: 15px;
  border-radius: 100%;
}
.jiantouIcon{
  width: 26px;
  height: 16px;
  background: url("../../assets/img/waterIcon/jiantou.png") no-repeat center;
  background-size: 100%;
}
.mRight10{
  margin-right:3px;
}
/*.mubiaoIcon.level1{*/
/*  */
/*}*/
</style>
<style>
.el-progress.el-progress--line{
  width: 100%;
}
.el-progress__text{
  color: #fff;
  font-weight: 500;
}
.zhexianData{
  width: 41px;
  height: 28px;
}
.cuiban{
  margin-right: 10px;
  color: rgba(94, 126, 255, 1);
}
</style>
