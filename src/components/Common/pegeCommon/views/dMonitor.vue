<template>
	<div id="wrap">
		<div id="monitorAppD"></div>
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
      _this.player = new ImouPlayer('#monitorAppD')
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
				    width: 636,
				    height: 420,
        autoplay: true,
				    controls: true
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
