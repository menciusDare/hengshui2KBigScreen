<template>
  <div class="backgroundPop width75 qualityDistribution marginBottom height560">
    <div class="titleLine">
      <div class="textTitle">
        <span>空气质量分布</span>
      </div>
      <span class="time">2020.09.23  13:30</span>
    </div>
    <ul class="distributionTab rowSpace">
      <li v-for="(item, index) in distributionTab" :key="index" :class="item.selected ? 'selected': ''">
        {{item.name}}
      </li>
    </ul>
    <div style="position: relative;">
      <span style="position: absolute;font-size: 36px;color:#CDDFFF;font-weight: bold;text-shadow: 0px 0px 20px #357EFF;left: 28%; top:45%;">300天</span>
      <v-chart class="changingtrendMain" :options="qualityPolar" />
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      distributionTab: [
        {name: 'AQI', selected: true},
        {name: '首页污染物', selected: false}
      ],
      // qualityPolar ---- 空气质量分布
      qualityPolar: {
        grid: [
          {x: '0%', y: '15%', width: '90%', height: '75%'}
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}天',
          textStyle: {
            color: '#BDCAE2',
            fontSize: '24'
          }
        },
        legend: {
          orient: 'vertical',
          right: 10,
          data: ['优', '良', '轻度污染', '中度污染', '重度污染', '严重污染'],
          textStyle: {
            color: '#BDCAE2',
            fontSize: '24'
          }
        },
        series: [
          {
            type: 'pie',
            roundCap: true, // 可选项为1和2，不填则采用原有拼接方式
            // coordinateSystem: 'polar',
            name: 'AQI',
            radius: ['55%', '70%'],
            label: {
              show: true,
              formatter: '{c} 天',
              fontSize: '28'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true
            },
            data: [],
            left: '0%',
            center: ['35%', '50%']
          }]
      }
    }
  },
  methods: {
    loadQualityPolar () {
      let data = [
        {value: 335, name: '优'},
        {value: 310, name: '良'},
        {value: 135, name: '中度污染'},
        {value: 500, name: '重度污染'},
        {value: 500, name: '严重污染'},
        {value: 234, name: '轻度污染'}
      ]
      const listColor = {
        '优': '#46C96F',
        '良': '#F8C900',
        '轻度污染': '#F19D38',
        '中度污染': '#EA3522',
        '重度污染': '#8B2293',
        '严重污染': '#8E1C10'
      }
      console.log(listColor['严重污染'])
      data.forEach(item => {
        const color = listColor[item.name]
        return item.itemStyle = {color}
      })
      this.qualityPolar.series[0].data = data
      console.log()
    }
  },
  mounted () {
    this.loadQualityPolar()
  }
}
</script>
