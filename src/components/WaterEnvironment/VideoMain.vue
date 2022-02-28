<template>
  <div class="backgroundPop width75 marginBottom videoMain">
    <div class="titleLine">
      <div class="textTitle">
        <span>视频监控</span>
      </div>
    </div>
    <ul class="rowSpace rowWrap" style="height: 1000px;overflow: auto;">
      <template  v-for="(item,index) in videoData" >
        <li>
          <div class="img">
            <iframe
                     :src="item.url"
                     scrolling="no" allowfullscreen="false" webkitallowfullscreen="false" mozallowfullscreen="false"
                     style="width: 100%;height: 100%"
            >
            </iframe>
          </div>
          <span>{{item.videoName}}</span>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      videoData: []
    }
  },
  mounted () {
    this.getDataList()
  },
  methods: {
    getDataList () {
      var _this = this
      _this.$axios.get('/api/online-monitor-data-share/airBasVideocamera/riverVideo/initAll').then(function (res) {
        if (res.data.code == 200) {
          _this.videoData = res.data.data
          let replace = _this.videoData[0].url.replace('play', 'autoplay')
          _this.videoData[0].url = replace
        }
      }).catch(reason => {})
    }
  }
}
</script>
