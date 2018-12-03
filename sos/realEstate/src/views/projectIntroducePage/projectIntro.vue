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

  </div>
</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
export default {
  data() {
    return {
      back: '',
      imgProjectBack: '',
      projectWord: "",
      D3D: require('../../assets/img/index/3D.png'),
      check: 0,
      imgBig: ""
    }
  },
  created() {
    //请求首页项目图片和背景图片
    this.$axios.get("/project")
    .then(res => {
      if (screen.width > 1024){
        this.imgBig = res.data.data.image.fileName;
      }else {
        this.imgBig = res.data.data.image.middle;
      }
      // this.imgProjectBack = res.data.data.image.fileName;
      this.imgProjectBack = res.data.data.image.min;
      // this.imgBig = res.data.data.image.fileName;
      this.projectWord = res.data.data.introduction;
      this.check = 1;
    })
    .catch(error => {
      console.log(error);
    })
  },
  mounted() {

  },
  methods: {
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
  components: {
    // 'vue-lazy-component': VueLazyComponent
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
      width: px2rem(388);
      height: px2rem(724);
      position: absolute;
      left: transverse(90);
      top: vertical(0);
      background-color: black;
      opacity: 0.8;
      .wordTitle {
          width: 100%;
          height: px2rem(63);
          margin-top: px2rem(90);
          background-color: $colorAll;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
              @include sc(px2rem(36), #111015);
          }
      }
      .wordContent {
          width: px2rem(249);
          height: px2rem(371);
          margin: px2rem(71) auto;
          span {
              @include sc(px2rem(20), #ffffff);
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
