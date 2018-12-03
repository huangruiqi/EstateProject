<template>
  <div class="brandHonor">
    <div class="brandHonorScroll">
      <div class="brandHonorPhoto">
        <div class="brandHonorPhotoLeft" @click="brandHonorLeftChange">
          <img src="@/assets/img/brand/left.png" alt="">
        </div>
        <transition-group tag="ul" :name="change">
          <li v-for="(photo, index) in brandHonorPhoto" :key="index" v-show="index == imageNum">
            <img :src="photo.image.min" alt="">
          </li>
        </transition-group>
        <div class="brandHonorPhotoRight" @click="brandHonorRightChange">
          <img src="@/assets/img/brand/right.png" alt="">
        </div>  
      </div>
      <div class="brandHonorIntro">
        <ul class="brandHonorwords">
          <li v-for="(word, index) in brandHonorWords" :key="index">
            <img src="@/assets/img/brand/honorWordLogo.png" alt="">
            <span>{{ word.content }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="honorWordRemind" >
      <img v-show="wordRemind" src="@/assets/img/brand/honorWordRemind.png" alt="">
    </div>
  </div>
</template>
<style lang="scss">
@import '../../styles/main';
@import '../../styles/mixin';
.brandHonor {
  width: 100%;
  height: 90%;
  @include fj(space-around);
  align-items: center;
  flex-direction: column;
  >div {
    width:  80%;
    height: px2rem(1100);
    overflow-y: auto;
  }
  .brandHonorPhoto {
    width: 100%;
    height: px2rem(685);
    position: relative;
    overflow: hidden;
    @include fj();
    align-items: center;
    >div {
      width: px2rem(36);
      height: px2rem(150);
      position: absolute;
      z-index: 99;
      @include fj(center);
      align-items: center;
      background-color: rgba(101, 101, 101, 0.26);
      >img {
        width: px2rem(16);
        height: px2rem(36);
        opacity: 1;
      }
    }
    .brandHonorPhotoLeft {
      left: 0;
    }
    .brandHonorPhotoRight {
      right: 0;
    }
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        height: 100%;
        position: absolute;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .brandHonorIntro {
    .brandHonorwords {
      width: 100%;
      li {
        margin-top: px2rem(30);
        img {
          width: px2rem(36);
          height: px2rem(28);
        }
        span {
          @include fontSize(28);
          color: #fff;
          @include lineHeight(50);
        }
      }
    }
  }
  .honorWordRemind {
    width: 100%;
    height: px2rem(80);
    @include fj(center);
    align-items: center;
    margin-top: px2rem(20);
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
<script>
export default {
  name: 'brandHonor',
  data() {
    return {
      brandHonorPhoto: '',
      brandHonorWords: '',
      imageNum: 0,
      change: '',
      wordRemind: true
    }
  },
  created() {
    this.$axios.get('/honor')
      .then(res=>{
        this.brandHonorPhoto = res.data.data.images
        this.brandHonorWords = res.data.data.texts
      })
    this.$nextTick(()=>{
      if (document.body.clientHeight > 750) {
        // $('.brandHonorwords').css('height','32rem')
      }
      document.title = '品牌荣誉'
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
    var brandWorldScroll = document.getElementsByClassName('brandHonorScroll')[0];
    brandWorldScroll.addEventListener('scroll', ()=>{
      var allheight = parseInt(brandWorldScroll.scrollHeight);
      var judeHeight = Math.ceil(brandWorldScroll.scrollTop) + Math.ceil(brandWorldScroll.offsetHeight);
      if (allheight == judeHeight || allheight+1 == judeHeight) {
        this.wordRemind = false;
      }else if (allheight > judeHeight) {
        this.wordRemind = true;
      }
    })
  },
  methods: {
    brandHonorLeftChange() {
      this.imageNum--;
      this.change = 'photoSlideRight';
      if (this.imageNum < 0) {
        this.imageNum = this.brandHonorPhoto.length-1;
      }
    },
    brandHonorRightChange() {
      this.imageNum++;
      this.change = 'photoSlideLeft';
      if (this.imageNum > this.brandHonorPhoto.length-1) {
        this.imageNum = 0;
      }
    }
  }
}
</script>
