<template>
  <div class="indexPage"  v-show="check" :style="{backgroundImage: 'url(' + imgIndexBack + ')'}" >
    <img :src="imgProject" alt="projectImg" class="projectImg">
    <div class="module">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import intial from '../../assets/img/index/loading.jpg';
export default {
  data() {
    return {
      imgIndexBack: '',
      imgBig: "",
      imgProBig: "",
      imgProject: '',
      moduleIndex: [],
      check: 0,
      icon: [require('../../assets/img/index/icon1.png'),require('../../assets/img/index/icon2.png'),require('../../assets/img/index/icon3.png'),require('../../assets/img/index/icon4.png')]
    }
  },
  created() {
    //请求首页项目图片和背景图片
    this.$axios.get("/mainpage")
    .then(res => {
      if (screen.width > 1024){
        this.imgBig = res.data.data.backgroundImage.fileName;
        this.imgProBig = res.data.data.projectImage.fileName;
      }else {
        this.imgBig = res.data.data.backgroundImage.middle;
        this.imgProBig = res.data.data.projectImage.middle;
      }
      this.imgIndexBack = res.data.data.backgroundImage.min;
      // this.imgBig = res.data.data.backgroundImage.fileName;
      this.imgProject = res.data.data.projectImage.min;
      // this.imgProBig = res.data.data.projectImage.fileName;
      this.check = 1;
    })
    .catch(error => {
      console.log(error);
    })

    //请求激活的模块
    // http://192.168.43.127:8080/module/main
    this.$axios.get("/module/main", {params:{'select':'true'}})
    .then(res => {
      this.moduleIndex = res.data.data;
      // console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  },
  methods: {
    //进行跳转页面
    skip(position) {
      this.$router.push(position);
    },
    //用来判断总有几个模块并把它加到module里面去
    judgeModule() {
      let moduleContent = "";//为module里面的内容
      let a = 0;
      for (let moduleOne of this.moduleIndex) {
        moduleContent += '<div class="smallNav"><img src="' + this.icon[a] + '" class="navLogo"><span>' + moduleOne.description + '</span></div>';
        a++;
      }
      document.getElementsByClassName('module')[0].innerHTML = moduleContent;
    },
    //导航移上去变logo
    hoverChange() {
      let navLogo = document.getElementsByClassName('navLogo');
      let smallNav = document.getElementsByClassName('smallNav');
      for (let i = 0; i < smallNav.length; i++) {
        smallNav[i].onclick = () => {
          // navLogo[i].src = this.moduleIndex[i].logo2;
          this.skip( this.moduleIndex[i].url);
          // console.log(navLogo[i].src);
        }
      }
    }
  },
  components: {

  },
  watch: {
    //检测到数组有变化后就立即执行函数
    moduleIndex() {
      this.judgeModule();
      this.hoverChange();
    },
    imgBig() {
      var ele = document.querySelector('.indexPage');
      var imgUrl = this.imgBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgIndexBack = imgUrl;
          // console.log(this.imgProjectBack);
        ele.style.backgroundImage = 'url(' + this.imgIndexBack + ')';
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'indexPage complete');
      }
    },
    imgProBig() {
      // this.addWords();
      var ele = document.querySelector('.projectImg');
      var imgUrl = this.imgProBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.imgProject = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.imgProject;
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'projectImg complete');
        
      }
    },
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";

.indexPage {
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  // filter: blur(4px);
  transition: all 0.7s;
  .projectImg {
    width: px2rem(601);
    @include cl();
    top: vertical(204);
    // filter: blur(4px);
    transition: all 0.7s;
  }
  .complete {
    filter: blur(0);
  }
  .module {
    width: 62.8%;
    height: px2rem(181);
    @include cl();
    top: vertical(768);
    @include fj(space-around);
    .smallNav {
      cursor: pointer;
      @include fj(space-between);
      align-items: center;
      flex-direction: column;
      img {
        width: px2rem(92);
      }
      span {
        @include sc(px2rem(40));
      }
    }
  }
}
.complete {
  filter: blur(0);
}
</style>
