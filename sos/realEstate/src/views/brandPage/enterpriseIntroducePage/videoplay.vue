<template>
  <div class="video4">
    <!-- <div class="player">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     data-setup='{"techOrder": ["html5", "flash", "other supported tech"]}'
      >
      </video-player>
    </div>-->
    <div class="backImage"  @click="clickBack">
      <img src="@/assets/img/brandBGC/back.png" alt="">
    </div> 
    <!-- <embed src='http://player.youku.com/player.php/sid/XMzU3MTI4NTYwNA==/v.swf' allowFullScreen='true' quality='high' width='480' height='400' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'>
    </embed> -->
    <iframe height=100% width=100% src='http://player.youku.com/embed/XMzU3MTI4NTYwNA==' frameborder=0 >
    </iframe>
    <!-- <div style="width:100%;height:300px">  
      <iframe style="width:100%;height:100%" ref="video" frameborder=0 allowfullscreen></iframe>  
    </div> -->
  </div>
</template>

<script>
import video from 'video.js'
// import VideoPlayer from 'vue-video-player'
import { videoPlayer } from 'vue-video-player';
// import 'videojs-contrib-hls/dist/videojs-contrib-hls';
export default {
  data () {
    return {
      // videoMp4: '',
      // playerOptions: {
      //   playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
      //   autoplay: false, //如果true,浏览器准备好时开始回放。
      //   muted: false, // 默认情况下将会消除任何音频。
      //   loop: false, // 导致视频一结束就重新开始。
      //   preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      //   language: 'zh-CN',
      //   aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      //   fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      //   sources: [{
      //     type: "video/mp4",
      //     src:  ""//你的m3u8地址（必填）
      //   }],
      //   // poster: "poster.jpg", //你的封面地址
      //   width: document.documentElement.clientWidth,
      //   notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      //   controlBar: {
      //     timeDivider: true,
      //     durationDisplay: true,
      //     remainingTimeDisplay: false,
      //     fullscreenToggle: true  //全屏按钮
      //   }
      // },
      back: '',
      src1: ''
    }
  },
  components: {
    videoPlayer
  },
  created() {
    this.$axios.get("/introduction")
      .then(res => {
        this.back = res.data.enterprise.Images.back;
        console.log(this.back);
        this.src1 = res.data.data.videoUrl;
        // this.playerOptions.sources[0].src = "http://player.youku.com/player.php/sid/XMzU3MTI4NTYwNA==/v.swf";
        // this.$refs.video.src = 'http://player.youku.com/player.php/sid/XMzU3MTI4NTYwNA==/v.swf'
      })
      .catch(error => {
        console.log(error);
      })
  },
  methods: {
    onPlayerPlay(player) {
      // alert("play");
    },
    onPlayerPause(player){
      // alert("pause");
    },
    clickBack: function() {
			this.$router.push({path: '/brand/enterprise'});
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
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.video4 {
  width: 100%;
  height: 100%;
}
  .container {
    background-color: #efefef;
    min-height: 100%;
    color: #fff !important;
  }
  .player {
    width: 100%;
    height: 100%;
  }
  .backImage {
    height: vertical(125);
    position: fixed;
    top: 0;
    display: flex;
    align-items: flex-end;
    right: px2rem(60);
    z-index: 99;
    >img {
      width: px2rem(57);
      height: px2rem(50);
    }
  }
</style>
