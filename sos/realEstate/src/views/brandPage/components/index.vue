<template>
<div id="leftNav">
  <div id="leftNavBar">
    <div class="leftLogo" >
      <img :src="companyLogo" alt="">
    </div>
    <ul id="LeftWorld">
      <router-link @click.native="closeLinkInfo" tag="li" v-for="(world, index) in worlds" :key="index" :to="world.address" :class="index==Num?leftBottom:''">
        {{ world.name }}
      </router-link>
    </ul>
    <!-- <div class="leftEat">
       <img src="../../../assets/img/leftNav/eat.png" alt="">
    </div> -->
  </div>
  <div class="backImage"  @click="clickBack">
    <img src="../../../assets/img/goHouseHistory/goHistory.png" alt="">
  </div>
  <transition name="fade">
    <div class="linkInfo" v-if="isShowInfo">
      <div class="companyInfo">
        <p>中海地产</p>
        <p>售楼电话：</p>
        <p>000-1234 5678</p>
      </div>
      <ul class="userInfo">
        <li>
          电话
          <input type="text" id="userPhone">
        </li>
        <li>
          区域
          <select name="area" id="area">
            <option value="audi">Audi</option>
          </select>
        </li>
        <li>
          <span>价格</span>
          <select name="price" id="price">
            <option value="audi">Audi</option>
          </select>
        </li>
        <input type="submit" value="提交" class="upUserInfo">
      </ul>
    </div>
  </transition>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
import getImage from '@/ultis/getImage.js'

export default {
  name: 'layout',
  data () {
    return {
      worlds: [
        {
          'name': '企业简介',
          'address': '/brand/enterprise'
        },
        {
          'name': '品牌荣誉',
          'address': '/brand/honor'
        },
        {
          'name': '发展历程',
          'address': '/brand/develop'
        },
        {
          'name': '企业文化',
          'address': '/brand/culture'
        }
      ],
      Num: 0,
      leftBottom: 'leftBottom',
      isShowInfo: false,
      companyLogo: ''
    }
  },
  created () {
    this.$axios.get("/basic/guidePage/get")
      .then((res) => {
        res.data.data && res.data.data.projectLogoLocation ? this.companyLogo = getImage(res.data.data.projectLogoLocation, 1) : "";
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    clickBack: function () {
      this.$router.push({path: '/index'})
    },
    closeLinkInfo: function () {
      this.isShowInfo = false
    },
    showInfo: function () {
      this.isShowInfo = !this.isShowInfo
    }
  },
  watch: {
    worlds () {
      this.Num = this.worlds.length - 1
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
    width: transverse(260);
    height: 100%;
    background-color: #ffffff;
    float: left;
    position: relative;
    .leftLogo {
      width: px2rem(179);
      margin: px2rem(90) auto;
      margin-bottom: 0;
      >img {
        width: 100%;
        height: 100%;
      }
    }
    #LeftWorld {
      width: 100%;
      height: vertical(600);
      // display: -webkit-flex;
      margin-top: px2rem(97);
      // @include fj(center);
      // flex-direction: column;
      // flex-wrap: wrap;
      li {
        width: 100%;
        height: px2rem(100);
        text-align: center;
        @include sc(px2rem(36));
        letter-spacing: .2em;
        @include fj(center);
        align-items: center;
        cursor: pointer;
        color: #727272;
        &:hover {
          background-color: #dfc29d;
        }
        &:active {
          background-color: #c1a077;
        }
        color: #666666;
      }
      .router-link-active {
        background-color: #c7ad8c;
        color: #fefdfd;
      }
    }
    .leftEat {
      width: px2rem(150);
      height: px2rem(150);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: px2rem(30);
      margin: auto;
      >img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
.linkUs {
  position: fixed;
  width: 4rem;
  height: 10rem;
  font-size: 1.4rem;
  text-align: center;
  line-height: 4rem;
  background-color: #fff;
  border: 1px solid #000;
  writing-mode: vertical-lr;
  writing-mode: tb-lr;
  cursor: pointer;
  z-index: 100;
  right: 0;
  top: 45%;
}
.linkInfo {
  position: fixed;
  z-index: 100;
  width: px2rem(260);
  left: transverse(320);
  top: vertical(20);
  font-size: px2rem(20);
  .companyInfo, .userInfo {
    @include fj();
    flex-direction: column;
    align-items: center;
    border: 1px solid #000;
    background-color: #fff;
  }
  .userInfo {
    li {
      width: 80%;
      margin-top: px2rem(10);
      input, #area, #price {
        width: 77%;
        border: 1px solid #000;
        box-shadow: 0 0 px2rem(10) #eee inset;
      }
    }
    .upUserInfo {
      width: 45%;
      height: px2rem(40);
      border: 1px solid #000;
      border-radius: px2rem(10);
      background-color: #fff;
      margin: px2rem(15) 0;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
