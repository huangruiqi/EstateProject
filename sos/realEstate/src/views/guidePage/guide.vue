<template>
<!-- :style="{backgroundImage: 'url(' + imgBack + ')'}"  -->
  <div class="guidePage"  v-show="check" :style="{backgroundImage: 'url(' + imgBack + ')'}" @click="goIndex()">
     <!-- <vue-lazy-component
        v-if="root"
        :viewport="root"
      style="width:100%;height:100%;"> -->
      <img :src=imgLogo alt="logo" class="guideLogo">
      <!-- <img src="" alt="logo" class="visible-lg guideLogo"> -->
      <!-- <img slot="skeleton" src="../../assets/img/leftNav/LOGO2.png" class="guideLogo"> -->
     <!-- </vue-lazy-component> -->
    <div class="guideInfor">
      <span class="bottomInfor"><img src="../../assets/img/guidePage/bussiness.png" alt="bussiness"></span>
      <span class="bottomInfor"><img src="../../assets/img/guidePage/address.png" alt="bussiness"></span>
      <span class="bottomInfor"><img src="../../assets/img/guidePage/tel.png" alt="bussiness"></span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
export default {
  data() {
    return {
      imgBack: '',
      imgLogo: '',
      word: [],
      root: null,
      check: 0,
      imgBig: "",
      imgLogoBig: ""
    }
  },
  created() {
    //获取引导页数据
    this.$axios.get("/bootpage")
    .then((res) => {
      if (screen.width > 1024){
        this.imgBig = res.data.data.backgroundImage.fileName;
        this.imgLogoBig = res.data.data.logo.fileName;
      }else {
        this.imgBig = res.data.data.backgroundImage.middle;
        this.imgLogoBig = res.data.data.logo.middle;
      }
      this.imgBack = res.data.data.backgroundImage.min;
      // this.imgBig = res.data.data.backgroundImage.fileName;
      // this.imgBack = intial;
      this.imgLogo = res.data.data.logo.min;
      // this.imgLogoBig = res.data.data.logo.fileName;
      this.word[0] = res.data.data.host;
      this.word[1] = res.data.data.address;
      this.word[2] = res.data.data.hotline;
      this.check = 1;
    })
    .catch(error => {
      console.log(error);
    })
  },
  mounted() {
    this.root = this.$parent.$el;
  },
  methods: {
    // 添加引导页下方信息
    addWords() {
      // 获取底层文字span的标签
      let bottomInfor = document.getElementsByClassName('bottomInfor');
      //将文字添加到各个的span中去
      for (let i = 0; i < 3; i++) {
        let inforContent = bottomInfor[i].innerHTML;//首先获取底层的icon图片内容
        inforContent += "&nbsp;&nbsp;" + this.word[i];
        bottomInfor[i].innerHTML = inforContent;
      }
    },
    // 进入主页
    goIndex() {
      this.$router.push('/index');
    }
  },
  components: {

  },
  watch: {
    imgLogoBig() {
      this.addWords();
      var ele = document.querySelector('.guideLogo');
      var imgUrl = this.imgLogoBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgLogo = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.imgLogo;
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'guideLogo complete');
        
      }
    },
    imgBig() {
      var ele = document.querySelector('.guidePage');
      var imgUrl = this.imgBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgBack = imgUrl;
        // console.log(this.imgProjectBack);
        ele.style.backgroundImage = 'url(' + this.imgBack + ')';
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'guidePage complete');
        }
      }
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";

.guidePage {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  cursor: pointer;
  // filter: blur(4px);
  transition: all 0.7s;
  .guideLogo {
    width: px2rem(680);
    @include cl();
    top: vertical(245);
    // filter: blur(4px);
    transition: all 0.7s;
  }
  .complete {
    filter: blur(0);
  }
  .guideInfor {
    width: 80%;
    height: px2rem(35);
    @include cl();
    top: vertical(892);
    @include fj(space-around);
    align-items: center;
    .bottomInfor {
      @include sc(px2rem(23));
      img {
        width: px2rem(23);
      }
    }
  }
}
.complete {
  filter: blur(0);
}
</style>
