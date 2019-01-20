<template>
  <div class="brandCulture" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <div class="brandCulturePhoto">
      <img :src="brandCultureImage" alt="">
    </div>
    <div class="brandCultureWords">
      <ul class="brandCultureScroll">
        <li v-for="(title, index) in brandCultureTitle" :key="index">
          <p class="brandCultureTitle"> {{ title.title }} </p>
          <p class="brandCultureContent">  {{ title.content }} </p>
        </li>
      </ul>
      <div class="honorWordRemind" v-if="wordRemind">
        <img src="@/assets/img/brand/honorWordRemind.png" alt="">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/main';
@import '../../styles/mixin';
.styleNull {
  margin: 0 !important;
}
.brandCulture {
  width: 100%;
  height: 100%;
  .brandCulturePhoto {
    width: 100%;
    height: 30%;
    margin-top: 30%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .brandCultureWords {
    width: 100%;
    height: 40%;
    position: relative;
    ul {
      width: 90%;
      height: 80%;
      margin-top: px2rem(10);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      overflow-y: scroll;
      li {
        width: 70%;
        height: px2rem(100);
        margin: 0 15%;
        @include fj(space-between);
        align-items: center;
        flex-direction: column;
        .brandCultureTitle {
          color: #666666;
          @include fontSize(30);
          @include lineHeight(63);
        }
        .brandCultureContent {
          height: calc(100% - 2rem);
          color: #999999;
          @include fontSize(24);
          text-align: center;
        }
      }
    }
    .honorWordRemind {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: px2rem(50);
      @include fj(center);
      align-items: center;
      img {
        width: px2rem(30);
        height: px2rem(20);
      }
    }
  }
}
</style>
<script>
import getImage from '../../utils/getImage.js'
export default {
  name: 'brandCulture',
  data() {
    return {
      brandCultureImage: '',
      brandCultureTitle: '',
      brandCultureContent: '',
      brandCultureNum: Number,
      wordRemind: true,
      head: 'http://118.24.113.182:80/',
      backgroundImage: ''
    }
  },
  created() {
    this.$axios.get('/brand/enterpriseCulture/get')
      .then(res => {
        this.brandCultureTitle = res.data.data
        this.brandCultureNum = res.data.data.length
        if (this.brandCultureNum > 3) {
          this.wordRemind = true
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseCulture/image/get')
      .then(res => {
        this.brandCultureImage = getImage(res.data.data.mainImageLocation, 3)
        this.backgroundImage = getImage(res.data.data.backgroundImageLocation, 3)
      })
      .catch(error => {
        console.log(error)
      })
    this.$nextTick(()=>{
      document.title = '企业文化'
    })
  },
  methods: {
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
    }
  },
  mounted () {
    setTimeout(()=>{
      if (brandCultureScroll.offsetHeight === brandCultureScroll.scrollHeight) {
        this.wordRemind = false;
      }else {
        this.wordRemind = true;
      }
    },100);
    var brandCultureScroll = document.getElementsByClassName('brandCultureScroll')[0];
    brandCultureScroll.addEventListener('scroll', ()=>{
      var allheight = parseInt(brandCultureScroll.scrollHeight);
      var judeHeight = Math.ceil(brandCultureScroll.scrollTop) + Math.ceil(brandCultureScroll.offsetHeight);
      if (allheight <= judeHeight+1) {
        this.wordRemind = false;
      }else if (allheight > judeHeight) {
        this.wordRemind = true;
      }
    })
  }
}
</script>
