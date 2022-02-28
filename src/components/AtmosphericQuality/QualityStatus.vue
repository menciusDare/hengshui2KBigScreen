<template>
  <div class="backgroundPop width75 qualityStatus marginBottom height560">
    <div class="titleLine">
      <div class="textTitle">
        <span>空气质量现状</span>
      </div>
      <span class="time">2020.09.23  13:30</span>
    </div>
    <div class="statusTop rowSpace">
      <div class="tubiao">
        <v-chart :options="baiopan" class="baiopan"></v-chart>
        <span>首页污染物：PM2.5</span>
        <div class="fenshu">100</div>
      </div>
      <div class="leftMain flexRow">
        <div class="leftText">
          <strong class="tianqi">{{qualityStatus.tianqi.wendu}}</strong>
          <span>{{qualityStatus.tianqi.qing}}</span>
          <span>{{qualityStatus.tianqi.shidu}}</span>
          <span>{{qualityStatus.tianqi.fengli}}</span>
        </div>
        <div class="iconTai"></div>
      </div>
    </div>
    <ul class="statusBottom rowSpace">
      <li v-for="(item, index) in qualityStatus.wuran" :key="index" :class="item.class">
        <div class="tiao"></div>
        <strong>{{item.name}}</strong>
        <div>
          <span>{{item.num}}</span>μg/m³
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  data () {
    return {
      qualityStatus: {
        tianqi: {
          wendu: '17-23℃',
          shidu: '58%',
          fengli: '风力 3级',
          qing: '晴'
        },
        wuran: [
          {name: 'PM2.5', num: '105', class: 'lu'},
          {name: 'PM2.5', num: '105', class: 'yellow'},
          {name: 'PM2.5', num: '105', class: 'lu'},
          {name: 'PM2.5', num: '105', class: 'lu'},
          {name: 'PM2.5', num: '105', class: 'lu'},
          {name: 'PM2.5', num: '105', class: 'red'}
        ]
      },
      baiopan: {
        tooltip: {
          show: false
        },
        series: [
          {
            type: 'gauge',
            radius: '87%',
            detail: {
              show: false
            },
            splitLine: {
              show: false,
              length: -40
            },
            markPoint: {
              symbol: 'roundRect'
            },
            max: 500,
            axisLine: {
              lineStyle: {
                width: 50,
                shadowBlur: 0,
                color: [
                  [0.1, 'rgba(70, 201, 111, 1)'],
                  [0.2, 'rgba(248, 201, 0, 1)'],
                  [0.3, 'rgba(241, 157, 56, 1)'],
                  [0.4, 'rgba(255, 27, 29, 1)'],
                  [0.6, 'rgba(173, 0, 96, 1)'],
                  [1, 'rgba(142, 28, 16, 1)']
                ]
              }
            },
            axisLabel: {
              distance: 8,
              color: 'rgba(189, 202, 226, 1)',
              fontSize: 16
            },
            data: [{value: 20}]
          }
        ]
      }
    }
  }
}
</script>
