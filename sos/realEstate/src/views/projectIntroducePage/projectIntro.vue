<template>
<!-- v-lazy:background-image='imgProjectBack' -->
  <div class="projectIntroduce" v-show="check" :style="{backgroundImage: 'url(' + imgProjectBack + ')'}">
      <div class="projectWord">
          <div class="wordTitle">
              <span>项目介绍</span>
          </div>
          <div class="wordContent">

          </div>
      </div>
      <div class="backImage"  @click="clickBack">
        <img src="@/assets/img/brandBGC/back.png" alt="">
      </div>
      <contact @haveCon='haveCon'></contact>
      <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
  </div>
</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
import getImage from '../../ultis/getImage.js'
import contact from '../../components/haveContact'
import contactContent from '../../components/contactContent'
export default {
  data() {
    return {
      back: '',
      imgProjectBack: '',
      projectWord: "",
      D3D: require('../../assets/img/index/3D.png'),
      check: 0,
      imgBig: "",
      conDisplay: 'none'
    }
  },
  created() {
    //请求首页项目图片和背景图片
    this.$axios.get("/project/info/get")
    .then(res => {
      if (screen.width > 1024){
        this.imgBig = getImage(res.data.data.backgroundImageLocation, 1);
      }else {
        this.imgBig = getImage(res.data.data.backgroundImageLocation, 2);
      }
      // this.imgProjectBack = res.data.data.image.fileName;
      this.imgProjectBack = getImage(res.data.data.backgroundImageLocation, 4);
      // this.imgBig = res.data.data.image.fileName;
      this.projectWord = res.data.data.content;
      this.check = 1;
    })
    .catch(error => {
      console.log(error);
    })
  },
  mounted() {

  },

  components: {
    contact,
    contactContent
  },
  methods: {
    haveCon() {
      this.conDisplay = 'flex';
      this.$forceUpdate();
    },
    closeInfo() {
      this.conDisplay = 'none';
      this.$forceUpdate();
    },
    //添加介绍的文字
    addWords() {
      // console.log(document.getElementsByClassName('wordContent')[0]);
      let wordIntrol = "<span>&nbsp;&nbsp;&nbsp;&nbsp;" + this.projectWord + "</span>";//为内容区域所添加的字符串
      if (document.getElementsByClassName('wordContent')) {

        document.getElementsByClassName('wordContent')[0].innerHTML = wordIntrol;
        // $('.wordContent').html(wordIntrol);
      }
    },
    //返回
    clickBack() {
      this.$router.push({path: '/index'});;
    }
  },
  
  watch: {
      projectWord() {
          this.addWords();
      },
      imgBig() {
        var ele = document.querySelector('.projectIntroduce');
        var imgUrl = this.imgBig;
        var imgObject = new Image();

        imgObject.src = imgUrl;
        imgObject.onload = function () {
          this.imgProjectBack = imgUrl;
          // console.log(this.imgProjectBack);
          ele.style.backgroundImage = 'url(' + this.imgProjectBack + ')';
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
          ele.setAttribute('class', 'projectIntroduce complete');
        }
      }
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";
.projectIntroduce {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  // filter: blur(4px);
  transition: all 0.7s;
  .projectWord {
      width: px2rem(509);
      height: px2rem(924);
      position: absolute;
      left: transverse(93);
      top: vertical(0);
      background-color: black;
      opacity: 0.8;
      .wordTitle {
          width: 100%;
          height: px2rem(90);
          margin-top: px2rem(134);
          background-color: #c7ad8c;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
              @include sc(px2rem(36), #111015);
          }
      }
      .wordContent {
          width: px2rem(392);
          height: px2rem(500);
          margin: px2rem(57) auto;
          span {
              @include sc(px2rem(24), #ffffff);
              line-height: px2rem(48);
              letter-spacing: -1;
          }
      }
  }
  .backImage {
    height: vertical(125);
    position: absolute;
    display: flex;
    align-items: flex-end;
    right: px2rem(60);
    z-index: 99;
    cursor: pointer;
    >img {
      width: px2rem(57);
      height: px2rem(50);
    }
  }
  .button {
    width: 9%;
    height: vertical(150);
    position: absolute;
    right: transverse(90);
    bottom: vertical(90);
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.complete {
  filter: blur(0);
}
</style>
