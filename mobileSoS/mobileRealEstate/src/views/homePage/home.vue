<template>
  <div class="homePage" :style="{backgroundImage: 'url(' + homeBgc + ')'}">
    <div class="homeHead">
      <img :src="homeLogo" alt="">
    </div>
    <div class="projectList">
      <ul class="homeModule">
        <router-link tag="li" :to="module.url" v-for="(module, index) in moduleIndex" :key="index">
          <img :src="module.icon" alt="">
         <span> {{ module.description }} </span>
        </router-link>
      </ul>
    </div>
    <div class="companyLogo">
      <img src="@/assets/img/index/companyLogo.png" alt="">
    </div>
  </div>
</template>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";
.homePage {
  width: 100%;
  height: 100%;
  background-size: cover;
  .homeHead {
    width: 100%;
    height: 55%;
    @include fj(flex-end);
    flex-direction: column;
    align-items: center;
    img {
      width: px2rem(500);
      height: px2rem(300);
    }
  }
  .projectList {
    width: 100%;
    height: 37%;
    @include fj(center);
    align-items: center;
    .homeModule {
      width: px2rem(505);
      height: px2rem(195);
      @include fj();
      align-items: space-between;
      flex-wrap: wrap;
      margin-top: 4%;
      li {
        width: px2rem(250);
        height: px2rem(90);
        background-color: rgba(98, 98, 100, 0.53);
	      opacity: 0.53;
        @include fj(space-around);
        align-items: center;
        img {
          width: px2rem(30);
          height: px2rem(30);
        }
        span {
          color: #ffdba1;
          @include fontSize(30);
          @include lineHeight(30);
        }
      }
    }
  }
  .companyLogo {
    width: 100%;
    height: 8%;
    @include fj(center);
    align-items: flex-start;
    img {
      width: px2rem(134);
      height: px2rem(24);
    }
  }
}
</style>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      imgIndexBack: "",
      imgProject: "",
      homeLogo: '',
      homeBgc: [require('../../assets/img/index/homeBgc.png')],
      moduleIndex: [],
      icon: [require('../../assets/img/index/icon1.png'),require('../../assets/img/index/icon2.png'),require('../../assets/img/index/icon3.png'),require('../../assets/img/index/icon4.png')]
    }
  },
  created() {
    this.$axios.get('/bootpage')
      .then(res=>{
        this.homeLogo = res.data.data.logo.min
      })
    //请求激活的模块
    this.$axios.get("/module/main", {params:{'select':'true'}})
    .then(res => {
      this.moduleIndex = res.data.data;
      for (let i = 0; i < this.moduleIndex.length; i++) {
        this.moduleIndex[i].icon = this.icon[i]
      }
    })
    .catch(error => {
      console.log(error);
    })
  },
  methods: {
  }
}
</script>

