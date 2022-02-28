<template>
  <div class="contentsMain">
    <div class="titleName">协同人员任务量统计</div>
    <div class="TasksCollaboratorsEcharts">
      <zhuzhuangEcharts :params="zhuzhuangEchartsData" v-if="isShow"></zhuzhuangEcharts>
    </div>
  </div>
</template>

<script>
import zhuzhuangEcharts from '@/components/Common/Echarts/zhuzhuang.vue'
import {getTaskCountStatistics} from '@/common/api/cooperativeScheduling.js'
export default {
  name: 'TasksCollaborators',
  data () {
    return {
      isShow: false,
      color: ['rgba(28, 28, 162, 1)', 'rgba(71, 163, 198, 1)', 'rgba(28, 220, 28, 1)', 'rgba(255, 255, 255, 1)'],
      zhuzhuangEchartsData: {
        xAxis: ['姓名一', '姓名二', '姓名三', '姓名四', '姓名五', '姓名六'],
        name: {
          status: true,
          text: '问题数',
          nameTextStyle: 'rgba(245,245,245, .7)',
          position: 'middle',
          align: 'right'
        },
        series: [],
        id: 'TaskCollaborators',
        grid: {
          width: '85%',
          height: '75%',
          bottom: '10%',
          right: '7%'
        },
        isShowy: true,
        isSplitLine: true,
        isShowx: true,
        barWidth: 5,
        isManyList: true,
        length: {
          status: true,
          data: [],
          textStyle: {
            color: '#fff'
          },
          itemWidth: 12,
          itemHeight: 12,
          left: 0,
          top: 12,
          icon: 'circle'
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, .5)'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
          // name: name,
          // nameTextStyle: nameTextStyle,
          // show: this.params.isShowy
        }
      }
    }
  },
  components: {
    zhuzhuangEcharts
  },
  mounted () {
    this.loadingData()
  },
  methods: {
    loadingData () {
      getTaskCountStatistics().then(res => {
        var data = res.data
        console.log(res.data)
        this.zhuzhuangEchartsData.series = []
        if (data != null && data.length > 0) {
          this.zhuzhuangEchartsData.xAxis = data[0].xlist
          for (let index = 0; index < data.length; index++) {
            var series = {
              name: data[index].taskType,
              type: 'bar',
              barWidth: '15%',
              itemStyle: {
                normal: {
                  color: this.color[index],
                  barBorderRadius: 0
                }
              },
              data: data[index].ylist
            }
            this.zhuzhuangEchartsData.length.data.push(data[index].taskType)
            this.zhuzhuangEchartsData.series.push(series)
            this.isShow = true
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.TasksCollaboratorsEcharts{
  height: calc(100% - 33px);
}
.contentsMain{
  width: 100%;
  height: 100%;
}
</style>
