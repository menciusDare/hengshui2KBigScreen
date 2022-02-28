<template>
  <div>
    <div class="titleName rowSpace">
      <div>视频监控</div>
      <div class="pollutantMain">
        <el-select v-model="videoId" placeholder="请选择" @change="getVideoCameraByStationId">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="videoMainCon">
      <iframe
        :src=this.url
        width="577px"
        height="353px"
        id="ysopen1"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoMain',
  data () {
    return {
      options: [],
      url: '',
      videoId: ''
    }
  },
  mounted () {
    this.getVideoNameList()
    this.getVideoCameraByStationId()
  },
  methods: {
    getVideoCameraByStationId () {
      var _this = this
      var url = '/api/online-monitor-data-share/airStation/getVideoCameraById'
      var params = new URLSearchParams()
      params.append('id', _this.videoId)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            _this.url = res.data.data.url
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    },
    getVideoNameList () {
      var _this = this
      var url = '/api/online-monitor-data-share/airStation/getVideoNameList'
      var params = new URLSearchParams()
      params.append('regionCode', _this.AppConfig.appInfo.regionCode)
      _this.$axios.post(url, params).then(
        function (res) {
          if (res.status == 200) {
            var videoList = res.data.data
            _this.getOption(videoList)
          }
        }
      ).catch(function (error) {
        console.log(error)
      })
    },
    getOption (videoList) {
      for (let i = 0; i < videoList.length; i++) {
        var option = {
          label: '',
          value: ''
        }
        option.label = videoList[i].videoName
        option.value = videoList[i].pkId
        this.options.push(option)
      }
    }
  }
}
</script>

<style scoped>

</style>
