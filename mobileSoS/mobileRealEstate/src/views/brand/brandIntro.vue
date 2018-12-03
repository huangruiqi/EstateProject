<template>
  <div class="brandIntro">
    <div class="brandIntroLunbo">
      <div class="brandIntroPhoto touchevent" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
        <transition-group tag="ul" :name="change">
          <li v-for="(image, index) in brandIntroPhoto" :key="index" v-show="index == imageNum">
            <img :src="image.image.min" alt="">
          </li>
        </transition-group>
      </div>
      <div class="brandIntroNum">
        <ul class="spot">
          <li v-for="(image, index) in brandIntroPhoto" :key="index" :class="[{changeStyle: index==imageNum}]"></li>
        </ul>
      </div>
      <div class="brandIntroVideo"  @click="brandVideo">
        <img src="../../assets/img/brand/video.png" alt="">
      </div>
    </div>
    <div class="brandIntroWord">
      <p class="brandIntroWordTitle">
        {{ brandIntroTitle }}
      </p>
      <p class="brandIntroWordContent">
        {{ brandIntroContent }}
      </p>
    </div>
    <div class="brandIntroWordRemind" v-show="wordRemind">
      <img src="@/assets/img/brand/honorWordRemind.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  name: 'brandIntro',
  data() {
    return {
      brandIntroPhoto: '',
      brandIntroContent: '',
      brandIntroTitle: '',
      imageNum: 0,
      timer: '',
			startX: 0,
			endX: 0,
      x: 0,
      change: '',
      wordRemind: true
    }
  },
  created() {
    this.$axios.get("/introduction")
      .then(res=>{
        this.brandIntroPhoto = res.data.data.images
        this.brandIntroTitle = res.data.data.title
        this.brandIntroContent = res.data.data.content
      })
    this.$nextTick(()=>{
      document.title = '企业介绍'
			this.timer = setInterval(() => {
			  this.autoPlay()
			}, 4000);
    })
  },
  mounted () {
    setTimeout(()=>{
      if (brandWorldScroll.offsetHeight == brandWorldScroll.scrollHeight) {
        this.wordRemind = false;
      }else {
        this.wordRemind = true;
      }
    },100);
    var brandWorldScroll = document.getElementsByClassName('brandIntroWordContent')[0];
    brandWorldScroll.addEventListener('scroll', ()=>{
      var allheight = parseInt(brandWorldScroll.scrollHeight);
      var judeHeight = Math.ceil(brandWorldScroll.scrollTop) + Math.ceil(brandWorldScroll.offsetHeight);
      if (allheight == judeHeight || allheight+1 == judeHeight || allheight == judeHeight+1) {
        this.wordRemind = false;
      }else if (allheight > judeHeight) {
        this.wordRemind = true;
      }
    });
  },
  methods: {
    autoPlay() {
      this.imageNum++;
      this.change = 'photoSlideLeft';
			if (this.imageNum > this.brandIntroPhoto.length -1) {
				this.imageNum = 0;
			}
		},
		left() {
			clearInterval(this.timer);
      this.imageNum--;
      this.change = 'photoSlideRight';
			if (this.imageNum < 0) {
				this.imageNum = this.brandIntroPhoto.length-1;
      }
		},
		touchstart(ev) {
      clearInterval(this.timer);
      this.startX = parseInt(ev.touches[0].clientX);
      var imageStyle = document.getElementsByClassName('brandIntroPhoto')[0].children[0];
      // var imageLeft = parseInt(document.getElementsByClassName('brandIntroPhoto')[0].children[0].children[0].style.left);
      // var imageWidth = imageStyle.children[this.imageNum].offsetWidth;
      // imageStyle.children[this.imageNum].style.left = 0;
      // if (this.imageNum == 0) {
      //   imageStyle.children[imageStyle.children.length-1].style.left = - imageWidth + 'px';
      // }else {
      //   imageStyle.children[this.imageNum-1].style.left = - imageWidth + 'px';
      // }
      // if (this.imageNum == imageStyle.children.length-1) {
      //   imageStyle.children[0].style.left = imageWidth + 'px';
      // }else {
      //   imageStyle.children[this.imageNum+1].style.left = imageWidth + 'px';
      // }
		},
		touchmove(ev) {
      this.endX = parseInt(ev.touches[0].clientX);
    },
		touchend(ev) {
			this.x = this.endX - this.startX;
			if (this.x>0) {
				this.left()
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 4000);
			}else if(this.x<0) {
				this.autoPlay()
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 4000)
			}
		},
		brandVideo() {
			this.$router.push({path: '/brand/mp4'});
    },
    // watch: {
    //   worldScroll() {
    //     this.$nextTick(() => {
    //       console.log(document.getElementsByClassName('brandIntroWordContent')[0].scrollTop,document.getElementsByClassName('brandIntroWordContent')[0].scrollHeight)
    //     })
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
@import '../../styles/mixin';
@import '../../styles/main';
.hidden {
  display: none;
}
.show {
  display: block !important;
}
.brandIntro {
  width: 100%;
  height: 100%;
  .brandIntroLunbo {
    height: 42%;
    position: relative;
    overflow: hidden;
    .brandIntroPhoto {
      width: 100%;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        li {
          position: absolute;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .brandIntroNum {
      width: 100%;
      height: px2rem(20);
      position: absolute;
      bottom: 0;
      @include fj(center);
      align-items: center;
      .spot {
        position: absolute;
        bottom: 0;
        width: 80%;
        height: px2rem(15);
        z-index: 2;
        @include fj(center);
        li {
          width: px2rem(14);
          height: px2rem(14);
          border-radius: 50%;
          margin-left: px2rem(5);
          background-color: #bfbfbf;
        }
        .changeStyle {
          width: px2rem(30);
          height: px2rem(14);
          border-radius: 5px;
          background-color: #ffdaaa;
        }
      }
    }
    .brandIntroVideo {
      width: px2rem(80);
      height: px2rem(66);
      position: absolute;
      right: px2rem(25);
      bottom: px2rem(25);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .brandIntroWord {
    width: 100%;
    height: 45%;
    @include fj(flex-start);
    flex-direction: column;
    align-items: center;
    .brandIntroWordTitle {
      width: 85%;
      height: px2rem(80);
      @include fontSize(40);
      margin-top: 5rem;
      color: #ffdaaa;
      @include fj();
      align-items: center;
    }
    .brandIntroWordContent {
      width: 85%;
      height: 78%;
      @include fontSize(24);
      @include lineHeight(40);
      text-indent: 2em;
      margin-top: 1rem;
      color: #fffffe;
      overflow-y: auto;
    }
  }
  .brandIntroWordRemind {
    width: 100%;
    height: 3%;
    @include fj(center);
    align-items: center;
    img {
      width: px2rem(37);
      height: px2rem(27);
    }
  }
}
.photoSlideLeft-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideLeft-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}
.photoSlideLeft-enter {
  transform: translateX(100%);
}
.photoSlideLeft-leave {
  transform: translateX(0);
}
.photoSlideRight-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideRight-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}
.photoSlideRight-enter {
  transform: translateX(-100%);
}
.photoSlideRight-leave {
  transform: translateX(200%);
}
</style>
