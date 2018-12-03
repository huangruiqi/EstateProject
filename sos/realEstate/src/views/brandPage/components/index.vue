<template>
<div id="leftNav">
  <div id="leftNavBar">
    <div class="leftLogo" >
      <img src="../../../assets/img/leftNav/logo.png" alt="">
    </div>
    <ul id="LeftWorld">
      <router-link tag="li" v-for="(world, index) in worlds" :key="index" :to="world.address" :class="index==Num?leftBottom:''">
        {{ world.name }}
      </router-link>
    </ul>
    <div class="leftEat">
      <!-- <img src="../../../assets/img/leftNav/eat.png" alt=""> -->
    </div>
  </div>
  <div class="backImage"  @click="clickBack">
    <img src="../../../assets/img/brandBGC/back.png" alt="">
  </div>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";

export default {
  name: 'layout',
  data() {
    return{
      worlds: [
        {
            "name": "企业简介",
            "address": "/brand/enterprise"
        },
        {
            "name": "品牌荣誉",
            "address": "/brand/honor"
        },
        {
            "name": "发展历程",
            "address": "/brand/develop"
        },
        {
            "name": "企业文化",
            "address": "/brand/culture"
        }
      ],
      Num: 0,
      leftBottom: 'leftBottom'
    }
  }, 
  created() {
  },
  methods: {
    clickBack: function() {
			this.$router.push({path: '/index'});
		}
  },
 
  watch: {
    worlds() {
      this.Num = this.worlds.length-1;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
#leftNav{
  width: 100%;
  height: 100%;
  position: relative;
  .backImage {
    height: vertical(125);
    position: absolute;
    display: flex;
    align-items: flex-end;
    right: px2rem(60);
    cursor: pointer;
    z-index: 99;
    >img {
      width: px2rem(57);
      height: px2rem(50);
    }
  }
  #leftNavBar {
    width: transverse(300);
    height: 100%;
    background-color: #121212;
    float: left;
    border-right: 0.05rem solid #c79f62;
    .leftLogo {
      width: px2rem(167);
      margin: px2rem(90) auto;
      margin-bottom: 0;
      >img {
        width: 100%;
        height: 100%;
      }
    }
    #LeftWorld {
      width: 100%;
      height: vertical(500);
      display: -webkit-flex;
      @include fj(center);
      flex-direction: column;
      flex-wrap: wrap;
      >:last-child {
        border-bottom: 0.05rem solid #c79f62;
      }
      li {
        height: vertical(180);
        border-top: 0.05rem solid #c79f62;
        text-align: center;
        @include sc(px2rem(30));
        @include fj(center);
        align-items: center;
        cursor: pointer;
      }
      .router-link-active {
        background-color: #ffdaaa;
        color: #121212;
      }
      .leftBottom {
        border-bottom: 0.05rem solid #c79f62;
      }
    }
    .leftEat {
      width: px2rem(106);
      height: px2rem(106);
      margin: vertical(120) auto;
      >img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
