<template>
  <div class="video4">
    <iframe height=100% width=100% src='http://play.video.qcloud.com/iplayer.html?$appid=1251035517&$fileid=14651978969511520829&$autoplay=0&$sw=1280&$sh=720' frameborder=0 allowfullscreen>
    </iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      back: '',
      src1: ''
    }
  },
  created() {
    this.$axios.get("/introduction")
      .then(res => {
        // this.src1 = res.data.data.videoUrl;
        this.src1='http://play.video.qcloud.com/iplayer.html?$appid=1251035517&$fileid=14651978969511520829&$autoplay=0&$sw=1280&$sh=720';
        console.log(this.src1)
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    clickBack: function() {
			this.$router.push({path: '/brand/brandIntro'});
		}
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../styles/main.scss';
@import '../../styles/mixin.scss';
.video4 {
  width: 100%;
  height: 90%;
  padding-top: 6rem;
  position: relative;
  iframe {
    position: absolute;
    top: 30%;
  }
}
</style>
