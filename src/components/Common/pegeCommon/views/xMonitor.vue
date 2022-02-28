<template>
	<div id="wrap">
		<div id="monitorAppX"></div>
	</div>
</template>

<script>
import './imouplayer'
export default {
  props: {
    url: String,
    kitToken: String,
    poster: String
  },
  data () {
    return {
      player: null
    }
  },
  methods: {
    initMonitor () {
      var _this = this
      if (_this.player) { _this.player.destroy() }
      _this.player = new ImouPlayer('#monitorAppX')
      const url = _this.url
      const kitToken = _this.kitToken
      const urlArr = []
      url.split('%').forEach(function (item, index) {
				    const obj = {
				        url: item,
				        kitToken: kitToken.split('%')[index],
          poster: _this.poster.split('%')[index]
				    }
				    urlArr.push(obj)
      })
      const params = {
				    src: urlArr,
				    width: 622,
				    height: 372,
        autoplay: true,
				    controls: false
      }
      this.player.setup(params)
    }

  },
  mounted () {
    this.$nextTick(() => {
      this.initMonitor()
    })
  }
}

</script>
