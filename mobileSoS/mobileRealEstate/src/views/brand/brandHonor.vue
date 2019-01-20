<template>
  <div class="brandHonor" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <div>
      <div class="brandHonorPhoto">
        <div class="brandHonorPhotoLeft" v-if="brandHonorPhoto.length > 1" @click="brandHonorLeftChange">
          <img src="@/assets/img/brand/left.png" alt="">
        </div>
        <transition-group tag="ul" :name="change">
          <li v-for="(photo, index) in brandHonorPhoto" :key='photo' v-show="index == imageNum">
            <img :src="photo.image" alt="">
          </li>
        </transition-group>
        <div class="brandHonorPhotoRight" v-if="brandHonorPhoto.length > 1" @click="brandHonorRightChange">
          <img src="@/assets/img/brand/right.png" alt="">
        </div>
      </div>
      <div class="brandHonorIntro">
        <ul class="brandHonorwords brandHonorScroll">
          <li v-for="(word, index) in brandHonorWords" >
            <span class="word-spot"></span>
            <span>{{ word.enterpriseHonorInfo }}</span>
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
  overflow: auto;
  >div {
    width:  85%;
    height: px2rem(1100);
    margin-top: 4rem;
  }
  .brandHonorPhoto {
    width: 100%;
    height: px2rem(496);
    position: relative;
    @include fj(center);
    align-items: center;
    >div {
      width: px2rem(36);
      height: px2rem(150);
      position: absolute;
      z-index: 99;
      @include fj(center);
      align-items: center;
      >img {
        width: px2rem(16);
        height: px2rem(36);
        opacity: 1;
      }
    }
    .brandHonorPhotoLeft {
      left: px2rem(0);
    }
    .brandHonorPhotoRight {
      right: px2rem(0);
    }
    ul {
      width: 80%;
      height: 100%;
      position: relative;
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
    height: calc(100% - 30rem);
    overflow-y: auto;
    position: relative;
    .brandHonorwords {
      width: 80%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      li {
        margin-top: px2rem(25);
        @include fj(flex-start);
        align-items: center;
        .word-spot {
          width: px2rem(16);
          height: px2rem(16);
          border-radius: 50%;
          background-color: #c7ad8b;
          margin: 0 px2rem(5);
        }
        span {
          @include fontSize(30);
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
      width: px2rem(30);
      height: px2rem(20);
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
import getImage from '../../utils/getImage.js'
export default {
  name: 'brandHonor',
  data() {
    return {
      brandHonorPhoto: '',
      brandHonorWords: '',
      imageNum: 0,
      change: '',
      wordRemind: true,
      head: 'http://118.24.113.182:80/',
      backgroundImage: ''
    }
  },
  created() {
    this.$axios.get('/brand/enterpriseHonor/get')
      .then(res => {
        this.brandHonorWords = res.data.data
        if (this.brandHonorWords.length > 4) {
          this.wordRemind = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseHonor/backHonorImage/get')
      .then(res => {
        this.background = getImage(res.data.data.imageLocation, 3)
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseHonor/honorImage/get')
      .then(res => {
        this.brandHonorPhoto = res.data.data
        this.brandHonorPhoto.map((item, index) => {
          if (item.imageLocation) {
            this.brandHonorPhoto[index].image = getImage(item.imageLocation, 1)
          }
        })
      })
      .catch(error => {
        console.log(error)
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
    var brandWorldScroll = document.getElementsByClassName('brandHonorIntro')[0];
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
    },
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
    }
  }
}
</script>
