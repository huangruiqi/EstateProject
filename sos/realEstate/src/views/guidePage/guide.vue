<template>
<!-- :style="{backgroundImage: 'url(' + imgBack + ')'}"  -->
  <div class="guidePage"  v-show="check" :style="{backgroundImage: 'url(' + imgBack + ')'}" @click="goIndex()">
    <div class="content">
      <img :src=imgLogo alt="logo" class="guideLogo">
      <!-- <div class="click">
        <img src="../../assets/img/guidePage/click.png"/>
        <span>·点击探索·</span>
      </div> -->
      <div class="guideInfor">
        <span class="bottomInfor"><img src="../../assets/img/guidePage/bussiness.png" alt="bussiness"></span>
        <span class="bottomInfor"><img src="../../assets/img/guidePage/address.png" alt="bussiness"></span>
        <span class="bottomInfor"><img src="../../assets/img/guidePage/tel.png" alt="bussiness"></span>
      </div>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
import getImage from '../../ultis/getImage.js';
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
    this.$axios.get("/basic/guidePage/get?a=" + Math.random())
    .then((res) => {
      if (screen.width > 1024){
        this.imgBig = getImage(res.data.data.backgroundImageLocation, 1);
        this.imgLogoBig = getImage(res.data.data.projectLogoLocation, 1);
      }else {
        this.imgBig = getImage(res.data.data.backgroundImageLocation, 2);
        this.imgLogoBig = getImage(res.data.data.projectLogoLocation, 2);
      }
      this.imgBack = getImage(res.data.data.backgroundImageLocation, 5);
      // this.imgBig = res.data.data.backgroundImage.fileName;
      // this.imgBack = intial;
      this.imgLogo = getImage(res.data.data.projectLogoLocation, 5);
      // this.imgLogoBig = res.data.data.logo.fileName;
      this.word[0] = res.data.data.projectHost;
      this.word[1] = res.data.data.projectLocation;
      this.word[2] = res.data.data.projectHotline;
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
  .content {
    width: px2rem(1562);
    height: vertical(730);
    margin: px2rem(254) auto;
    margin-bottom: px2rem(68);
    @include fj();
    flex-direction: column;
    align-items: center;
    .guideLogo {
      width: px2rem(403);
      // filter: blur(4px);
      transition: all 0.7s;
    }
    .complete {
      filter: blur(0);
    }
    .click {
      width: px2rem(161);
      height: px2rem(140);
      @include fj();
      flex-direction: column;
      align-items: center;
      img {
        width: px2rem(73);
      }
      span {
        @include sc(px2rem(30), #b1b1b1);
      }
    }
    .guideInfor {
      width: 100%;
      height: px2rem(40);
      @include fj();
      align-items: center;
      .bottomInfor {
        @include sc(px2rem(30));
        img {
          width: px2rem(25);
        }
      }
    }
  }

}
.complete {
  filter: blur(0);
}
</style>
