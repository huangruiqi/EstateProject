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
import getImage from '../../../utils/getImage.js'
export default {
  data() {
    return {
        typeClassChangeTwo: "noActiveTwo",//传给bottom没有被点击的盒子样式
        typeClassChange: "activeTwo",//传给bottom被点击的盒子样式
        imgPlanBack: "",
        dataAll: [],
        houseNum: 0,
        title: ''
    }
  },
  created() {
    if (this.$route.query.houseNum) {
      this.houseNum = this.$route.query.houseNum;
    }
    this.$axios.get("/house/houseType/get")
    .then(res => {
      this.title = res.data.data;
        if(this.title[this.houseNum]) {
          this.$axios.get("/house/houseTypeImage/get?houseTypeId=" + this.title[this.houseNum].id)
          .then(res => { 
            this.dataAll = res.data.data;
            this.imgPlanBack = getImage(this.dataAll.houseTypeImageLocation, 3);
          })
          .catch(error => {
            console.log(error);
          });
        }
    })
    .catch(error => {
      console.log(error);
    });
  },
  mounted(){
    document.title = '平面图';
    this.$on('giveNum', (val) => { 
      if (this.houseNum != val && this.title[val]) {
        this.houseNum = val;
        if(this.title[this.houseNum]) {
          this.$axios.get("/house/houseTypeImage/get?houseTypeId=" + this.title[this.houseNum].id)
          .then(res => { 
            this.dataAll = res.data.data;
            this.imgPlanBack = this.dataAll && this.dataAll.houseTypeImageLocation && getImage(this.dataAll.houseTypeImageLocation, 3);
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
      this.$emit('checkVR', val, 2);
    });
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
    height: px2rem(540);
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
    height: px2rem(35);
            // background-color: #fff;
    position: relative;
            span {
                position: absolute;
                right: px2rem(30);
                @include fontSize(30);
                letter-spacing: px2rem(2);
                color: #717171;
            }
  }
}

</style>
