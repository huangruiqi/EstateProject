<template>
<!-- :style="{backgroundImage: 'url(' + imgPlanBack + ')'}" -->
<!-- v-lazy:background-image='imgPlanBack' -->
  <div class="content">
    <img :src='imgPlanBack' alt="" class="picA" id="targetObj" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
    <!-- <img src="../../../assets/img/rightHouseNav/fullScreen.png" class="full"> -->
    <div class="pageNum">
      <span>1/1</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {
        typeClassChangeTwo: "noActiveTwo",//传给bottom没有被点击的盒子样式
        typeClassChange: "activeTwo",//传给bottom被点击的盒子样式
        imgPlanBack: "",
        dataAll: [],
        houseNum: 0
    }
  },
  created() {
    if (this.$route.query.houseNum) {
      this.houseNum = this.$route.query.houseNum;
    }
    this.$axios.get("/house/housetype")
    .then(res => {
      this.dataAll = res.data.data;
      this.imgPlanBack = this.dataAll[this.houseNum].housePlans[0].houseTypeImage.image.min;
      console.log( this.imgPlanBack);
    })
    .catch(error => {
      console.log(error);
    });
  },
  mounted(){
    document.title = '平面图';
    this.$on('giveNum', (val) => { 
      const error = 0;
      if(this.dataAll[val]) {
        if(this.dataAll[val].housePlans[0]) {
          this.imgPlanBack = this.dataAll[val].housePlans[0].houseTypeImage.image.min;
        }else {
          this.imgPlanBack = this.dataAll[error].housePlans[0].houseTypeImage.image.min;
        }  
      }
      if (this.dataAll[val]) {
        if(this.dataAll[val].houseType.vrUrl) {
          this.$emit('checkVR', val, 2);
          // this.src = this.dataAll[val].houseType.vrUrl;
        }else {
          this.$emit('checkVR', val, 2);
        }
      }
    });
    // let $targetObj = $('#targetObj');
    //             //初始化设置
    //     cat.touchjs.init($targetObj, function (left, top, scale, rotate) {
    //     });
    //             //拖拽
    //     cat.touchjs.drag($targetObj, function (left, top) {
                
    //     });
    //             //缩放
    //     cat.touchjs.scale($targetObj, function (scale) {
            
    //     });
  },
  methods: {
      //点击返回
      goHistory() {
          this.$router.push('/index');
      },
      requestFullScreen() {  
        let de = document.getElementsByClassName('picA')[0];  
        if (de.requestFullscreen) {  
            de.requestFullscreen();  
        } else if (de.mozRequestFullScreen) {  
            de.mozRequestFullScreen();  
        } else if (de.webkitRequestFullScreen) {  
            de.webkitRequestFullScreen();  
        }  
        
        $('.picA').click(() => {
          if (document.exitFullscreen) {  
            document.exitFullscreen();  
          } else if (document.mozCancelFullScreen) {  
            document.mozCancelFullScreen();  
          } else if (document.webkitCancelFullScreen) {  
            document.webkitCancelFullScreen();  
          }  
        });
      },
      //判断是否全屏
      isFullscreen(){
        return document.fullscreenElement    ||
               document.msFullscreenElement  ||
               document.mozFullScreenElement ||
               document.webkitFullscreenElement || false;
      },
      //退出全屏  
      exitFullscreen() {    
          if(this.isFullscreen()) {
            $('.picA').click(() => {
              if (document.exitFullscreen) {  
                  document.exitFullscreen();  
              } else if (document.mozCancelFullScreen) {  
                  document.mozCancelFullScreen();  
              } else if (document.webkitCancelFullScreen) {  
                  document.webkitCancelFullScreen();  
              }  
            });
          }else {

          }
      },

      touchstart() {

      },
      touchmove() {

      },
      touchend() {
        document.getElementsByClassName('picA')[0].click();
      },
      //得到户型
      getHouseTwo() {
        this.imgPlanBack = this.dataAll[this.houseNum].housePlans[0].houseTypeImage.image.min;
      }
  },
  components: {

  },
  watch: {
    dataAll() {
      // $('.full').click(() => {
      //   // this.requestFullScreen();
      //   let img = [];
      //   img.push($('.pic').eq(0).attr('src'));
      //   WeixinJSBridge.invoke('imagePreview', {    
      //     'current': $('.pic').eq(0).attr('src'),
      //     'urls': img
      //   }); 
      // });
      let time = setInterval(() => {
        if (document.getElementsByClassName('picA')[0]) {
          document.getElementsByClassName('picA')[0].onclick = () => {
            // console.log(document.getElementsByClassName('pic')[0].src);
            // alert(55);
            let img = [];
            img.push($('.picA').eq(0).attr('src'));
            var agent = navigator.userAgent.toLowerCase();
            if (agent.match(/MicroMessenger/i) == "micromessenger") {
                // return true;
              WeixinJSBridge.invoke('imagePreview', {    
                'current': document.getElementsByClassName('picA')[0].src,
                'urls': img
              }); 
            } else {
                // return false;
            }
          }
        }
      //   this.exitFullscreen();
      }, 100);
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';

.content {
  width: 100%;
  height: 100%;
  @include fj();
  flex-direction: column;
  position: relative;
  .picA {
    width: 100%;
    height: px2rem(562);
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .full {
    width: px2rem(64);
    position: absolute;
    top: px2rem(480);
    right: px2rem(30);
  }
  .pageNum {
    width: 100%;
    height: px2rem(30);
    position: relative;
    span {
      position: absolute;
      right: px2rem(61);
      @include fontSize(23);
      color: #c9c9c9;;
    }
  }
}

</style>
