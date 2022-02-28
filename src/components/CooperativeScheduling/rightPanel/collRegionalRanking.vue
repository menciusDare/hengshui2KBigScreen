<template>
  <div class="collRegionRanking">
    <div class="titleName">协同任务区域排名</div>
    <div class="xietongMainRank">
      <div class="mapPicture">
        <div class="mapBlock"
          v-if="mapCount[item.name]>0"
          v-for="(item, index) in mapList"
          :class="item.class"
          :style="{
            left: `${item.left}px`,
            top: `${item.top}px`,
            position: 'absolute',
            height: `${mapCount[item.name]*10}px`}">
          <div class="num">{{mapCount[item.name]}}</div>
          <div>
            <div
              class="zhuzhuang"
              :style="{
              width: '16px',
              height: `${mapCount[item.name]*10}px`}"></div>
          </div>
        </div>
      </div>
      <div class="rankingList">
        <div v-for="(item, index) in rankingList.slice(0, 3)" :key="index" class="rankingListMain rowSpace flexColumn">
          <div class="rankNum" :class="index===0 ? 'isActive': ''">
            NO.{{index+1}}
          </div>
          <div class="rowFlex alginCenter">
            <div class="rankName">{{item.regionName}}</div>
            <div :class="item.rankRise > 0 ? 'shangsheng': 'xiajiang'" class="tableIcon"></div>
            <div class="rankRise">
              {{item.rankRise}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRankByRegion} from '@/common/api/cooperativeScheduling.js'
export default {
  name: 'collRegionalRanking',
  data () {
    return {
      rankingList: [],
      mapList: [
        {
          name: '嘉鱼县',
          class: 'jiayu',
          left: '287',
          top: '130'
        },
        {
          name: '咸安区',
          class: 'xianan',
          left: '360',
          top: '170'
        },
        {
          name: '赤壁市',
          class: 'chibi',
          left: '210',
          top: '205'
        },
        {
          name: '通山县',
          class: 'tongcheng',
          left: '430',
          top: '240'
        },
        {
          name: '崇阳县',
          class: 'chongyang',
          left: '290',
          top: '260'
        },
        {
          name: '通山县',
          class: 'tongshan',
          left: '210',
          top: '330'
        }
      ],
      colorList: {
        '崇阳县': {
          0: 'rgba(197, 145, 2, 1)',
          1: 'rgba(247, 181, 0, 1)'
        }
      },
      mapCount: {}
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    initList () {
      getRankByRegion().then(res => {
        console.log(res.data)
        this.rankingList = res.data
        this.mapCount = {}
        res.data.forEach(item => {
          console.log(item)
          this.mapCount[item.regionName] = item.count
        })
      })
    }
  }
}
</script>

<style scoped>
.xietongMainRank{
  height: calc(100% - 40px);
  position: relative;
}
.collRegionRanking{
  width: 100%;
  height: 100%;
}
.mapPicture{
  position: absolute;
  left: 0%;
  bottom: 0%;
  width: 100%;
  height: 430px;
  background: url("../../../assets/img/diaodu/smallMap.png") no-repeat center;
  background-size: cover;
}
.rankingList{
  position: absolute;
  top: 13px;
  left: 0;
}
.rankingListMain{
  width: 131px;
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(45, 46, 61, .7);
  border-radius: 5px;
  margin-bottom: 3px;
}
.rankNum{
  width: 45px;
  padding: 5px;
  background: rgba(52, 80, 196, .3);
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
}
.rankNum.isActive{
  background: rgba(52, 80, 196, 1);
}
.rankRise, .rankName{
  color: rgba(255, 255, 255, .8);
}
.rankName{
  margin-right: 10px;
}
.mapBlock {
  position: absolute;

}
.mapBlock .num{
  text-align: center;
  width: 16px;
  margin-bottom: 1px;
  font-weight: 600;
  font-size: 14px;
}
.mapBlock .name{
  position: absolute;
  width: 100px;
  text-align: center;
}
.zhuzhuang{
  position: absolute;
  background: linear-gradient(left, #0158a9 , #0095cf);
  background: -ms-linear-gradient(left, #0158a9 , #0095cf);
  background: -webkit-linear-gradient(left, #0158a9 , #0095cf);
  background: -moz-linear-gradient(left, #0158a9 , #0095cf);
  z-index: 999
}
.zhuzhuang:before{
  position: absolute;
  top:-2px;
  content: "";
  width: 16px;
  height: 4px;
  border-radius:50%;
  background: #2193d0;
  z-index: 99
}

.zhuzhuang:after{
  position: absolute;
  bottom:-2px;
  content: "";
  width: 16px;
  height: 4px;
  border-radius:50%;
  background: linear-gradient(left, #0158a9 , #0095cf);
  background: -ms-linear-gradient(left, #0158a9 , #0095cf);
  background: -webkit-linear-gradient(left, #0158a9 , #0095cf);
  background: -moz-linear-gradient(left, #0158a9 , #0095cf);
  z-index: 9
}
.mapBlock.jiayu .zhuzhuang,.mapBlock.jiayu .zhuzhuang:after{
  background: linear-gradient(left, rgba(197, 145, 2, 1), rgba(247, 181, 0, 1));
  background: -ms-linear-gradient(left, rgba(197, 145, 2, 1), rgba(247, 181, 0, 1));
  background: -webkit-linear-gradient(left, rgba(197, 145, 2, 1), rgba(247, 181, 0, 1));
  background: -moz-linear-gradient(left, rgba(197, 145, 2, 1), rgba(247, 181, 0, 1) ));
}
.mapBlock.jiayu .zhuzhuang:before{
  background: rgba(247, 181, 0, 1);
}
.mapBlock.jiayu .tongshan,.mapBlock.jiayu .tongshan:after{
  background: linear-gradient(left, rgba(141, 11, 11, 1), rgba(247, 181, 0, 1));
  background: -ms-linear-gradient(left, rgba(141, 11, 11, 1), rgba(247, 181, 0, 1));
  background: -webkit-linear-gradient(left, rgba(141, 11, 11, 1), rgba(247, 181, 0, 1));
  background: -moz-linear-gradient(left, rgba(141, 11, 11, 1), rgba(247, 181, 0, 1));
}
.mapBlock.jiayu .tongshan:before{
  background: rgba(141, 11, 11, 1);
}
</style>
