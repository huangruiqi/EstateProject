<template>
  <div class="houseIndex">
      <div class="header">
            <!-- <img src="../../../assets/img/goHouseHistory/back.png" alt="" @click="go()"> -->
        <top/>
      </div>
      <div class="middle">
        <router-view ref="content" @checkVR='checkVR'/>
      </div>
      <div class="bottom">
        <div class="category">
          <div :class="typeClassOne" @click="cateClassA" id="one"><router-link to='/houseType/prototype'>样板间</router-link></div>
          <div :class="typeClassTwo" @click="cateClassB" id="two"><router-link to='/houseType/plan'>平面图</router-link></div>
          <div :class="typeClassThree" @click="cateClassC" id="three"><router-link to='/houseType/three'>全景展示</router-link></div>
        </div>
        <div class="houseType">
          <img :src = 'leftArrow' id="leftArrow" :style='{display: leftDisplay}'>
          <div class="bigHouse">
            <div class="allHouse" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
              <div v-for='(houses, i) in house' class="oneHouse">
                <div class="divide"></div>
                <div class="houseEvery" @click='houseTypeClick(i)' >{{ houses.houseTypeName}}</div>
                <div class="divide"></div>
              </div>
            </div>
          </div>
          <img :src = 'rightArrow' id="rightArrow" :style='{display: rightDisplay}'>
        </div>

      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import top from '../../../components/top'
export default {
  data() {
    return {
      "left": 0,
      "right": 0,
      "leftDisplay": 'none',
      "rightDisplay": 'none',
      "typeClassOne": "active",
      "typeClassTwo": "noActive",
      "typeClassThree": "noActive",
      "house": {},
      "houseNum": 0,
      "num": 0,
      "blockNum": 0,//当前显示的第一个户型数
      "leftArrow": require('../../../assets/img/rightHouseNav/goLeft.png'),
      "rightArrow": require('../../../assets/img/rightHouseNav/goRight.png'),
      start: 0,
      end: 0,
      x: 0,
      control1: 0,
      control2: 0

    }
  },
  created() {
    this.$axios.get("/house/houseType/get")
    .then(res => {
      this.house = res.data.data.reverse();
      this.houseNum = this.house.length;
      if (!this.house[0].houseTypeVrUrl) {
        $('#three').css('display', 'none');
        // document.getElementsByClassName('chooseSmall')[0].style.width = '28%';

      }
    })
    .catch(error => {
      console.log(error);
    });
  },
  mounted() {
    this.routeClass();
    // document.getElementsByClassName('houseEvery')[0].click();
    // console.log(document.getElementsByClassName('houseEvery')[0]);
    this.watch();
    this.watchDiv();
  },
  methods: {
        //返回
    go() {
      this.$router.push('/index');
    },
    //判断是否有VR
    checkVR(val, cate) {
      // alert(val);
      if(!this.house[val].houseTypeVrUrl) {
        $('#three').css('display', 'none');
        if (cate == 2) {
          // $('#two').click();
          // this.$router.push({path:'/houseType/plan',
          // query: {houseNum: val}});
        }else if (cate == 1) {
          // $('#one').click();
          // this.$router.push({path:'/houseType/protoType',
          // query: {houseNum: val}});
        }else {
          $('#two').click();
          this.$router.push({path:'/houseType/plan',
          query: {houseNum: val}});
        }
        // $('.houseEvery').eq(val).click();
        // this.$router.push('/houseType/plan');

      }else {
        // console.log(2);
        $('#three').css('display', 'flex');
      }
    },
    //判断路由改变类型样式
    routeClass() {
      if (this.$route.path == '/houseType/prototype') {
        this.typeClassOne = "active";
        this.typeClassTwo = "noActive";
        this.typeClassThree = "noActive";
      }else if (this.$route.path == '/houseType/plan') {
        this.typeClassOne = "noActive";
        this.typeClassTwo = "active";
        this.typeClassThree = "noActive";
      }else if (this.$route.path == '/houseType/three') {
        this.typeClassOne = "noActive";
        this.typeClassTwo = "noActive";
        this.typeClassThree = "active";
      }
    },
    //点击类型改变样式
    cateClassA() {
      this.typeClassOne = "active";
      this.typeClassTwo = "noActive";
      this.typeClassThree = "noActive";
    },
    cateClassB() {
      this.typeClassOne = "noActive";
      this.typeClassTwo = "active";
      this.typeClassThree = "noActive";
    },
    cateClassC() {
      this.typeClassOne = "noActive";
      this.typeClassTwo = "noActive";
      this.typeClassThree = "active";
      this.$router.push({path:'/houseType/three',
      query: {houseNum: this.num}});
    },
    //加户型
    addhouseNum() {
      // console.log(this.houseNum);
      if (this.houseNum < 5 && this.houseNum > 0) {
        let houseType = '<div class="houseEvery">' + this.house[0].houseTypeName + '</div>';
        for (let i = 1; i< this.houseNum; i++) {
          houseType += '<div class="divide"></div>';
          houseType += '<div class="houseEvery">' +this.house[i].houseTypeName + '</div>';
        }
        $('.houseType').eq(0).html(houseType);
        // document.getElementsByClassName('houseType')[0].innerHTML = houseType;
      }else if(this.houseNum > 4) {
        let houseType = '<img src="' + this.leftArrow + '" style="display:none;" id="leftArrow">';
        houseType += '<div class="houseEvery">' + this.house[0].houseTypeName + '</div>';
        for (let i = 1; i< 4; i++) {
          houseType += '<div class="divide"></div>';
          houseType += '<div class="houseEvery">' +this.house[i].houseTypeName + '</div>';
        }
        for (let i = 4; i < this.houseNum; i++) {
          houseType += '<div class="divide" style="display:none;"></div>';
          houseType += '<div class="houseEvery" style="display:none;">' +this.house[i].houseTypeName + '</div>';
        }
        houseType += '<img src="' + this.rightArrow + '" id="rightArrow">';
        $('.houseType').eq(0).html(houseType);
      }
    },
    //点击户型左右箭头
    arrowClick() {
      if($('.houseType').find('img')[1]) {
        $('#rightArrow').click(() => {
          $('#leftArrow').css('display', 'flex');
          $('.houseEvery').eq(this.blockNum).css('display', 'none');
          $('.divide').eq(this.blockNum).css('display', 'none');
          $('.divide').eq(this.blockNum + 3).css('display', 'flex');
          $('.houseEvery').eq(this.blockNum + 4).css('display', 'flex');
          this.blockNum++;
          if (this.blockNum + 4 == this.houseNum) {
            $('#rightArrow').css('display', 'none');
          }
        });
      }
      if($('.houseType').find('img')[0]) {
        $('#leftArrow').click(() => {
          $('#rightArrow').css('display', 'flex');
          $('.houseEvery').eq(this.blockNum - 1).css('display', 'flex');
          $('.divide').eq(this.blockNum - 1).css('display', 'flex');
          $('.houseEvery').eq(this.blockNum + 3).css('display', 'none');
          $('.divide').eq(this.blockNum + 2).css('display', 'none');
          this.blockNum--;
          if (this.blockNum == 0) {
            $('#leftArrow').css('display', 'none');
          }
        });
      }
    },
    //点击户型几变样式
    houseTypeClick(index) {
      // e.preventDefault();
      for (let i = 0; i < this.houseNum; i++) {
        $('.houseEvery').eq(i).css("color", "#666666");
      }
      $('.houseEvery').eq(index).css('color', '#c7ad8b');
      this.num = index;
      this.$refs.content.$emit('giveNum', index);
    },
    //随时监控左边栏的位置
    watch() {
      let timer = setInterval(() => {
        for (let i = 0; i < this.houseNum; i++) {
          if ($('.houseEvery').eq(i).css('color') == '#c7ad8b' && this.$refs.content) {

            // this.$refs.content.$emit('giveNum', i);
          }
        }
      },100);
    },
    watchDiv() {
      const timer = setInterval(() => {
        if (document.getElementsByClassName('allHouse')[0]) {
          const width = window.getComputedStyle(document.getElementsByClassName('allHouse')[0], null).width;
          const left = window.getComputedStyle(document.getElementsByClassName('allHouse')[0], null).left;
          const right = window.getComputedStyle(document.getElementsByClassName('allHouse')[0], null).right;
          this.left = parseInt(left);
          this.right = parseInt(right);
          if (parseInt(left) < 0) {
            this.leftDisplay = 'block';
          } else {
            this.leftDisplay = 'none';
          }
          if (parseInt(right) < 0) {
            // console.log(right);
            this.rightDisplay = 'block';
          } else {
            this.rightDisplay = 'none';
          }

          this.$forceUpdate();
        }
        
      },100);
    },
    touchstart(ev) {
      this.start = parseInt(ev.touches[0].clientX);
      const allHouse = document.getElementsByClassName('allHouse')[0];
      this.control1 = parseInt(window.getComputedStyle(allHouse, null).left);
      this.control2 = parseInt(window.getComputedStyle(allHouse, null).right);
    },
    touchmove(ev) {
      this.end = parseInt(ev.touches[0].clientX);
      const allHouse = document.getElementsByClassName('allHouse')[0];
      const bigDiv = document.getElementsByClassName('bigHouse')[0];
      const allHouseWidth = window.getComputedStyle(allHouse, null).width;
      const bigDivWidth = window.getComputedStyle(bigDiv, null).width;
      const maxLeft = parseInt(allHouseWidth) - parseInt(bigDivWidth);
      this.x = this.end - this.start;
      if (this.x < 0) {
        this.left = this.control1 + this.x;
        this.right = this.control2 - this.x;
        if (this.right >= 0) {
          allHouse.style.left = -maxLeft + 'px';
          this.left = -maxLeft;
          this.right = 0;
        } else {
          allHouse.style.left = this.left + 'px';
        }
      } else if(this.x > 0) {
        this.left = this.control1 + this.x;
        this.right = this.control2 - this.x;
        if (this.left >= 0) {
          allHouse.style.left = 0 + 'px';
          this.left = 0;
          this.right = -maxLeft + 'px';
        } else {
          allHouse.style.left = this.left + 'px';
        }
      } else if(this.x == 0) {
        // console.log(1);
      }
    },
    touchend(ev) {
      if (this.end == 0) {
        // console.log(1);
        this.house.forEach((hou, i) => {
          if (hou.houseTypeName == ev.target.innerHTML) {
            this.houseTypeClick(i);
          }
        });
      }
      this.end = 0;
    }

  },
  components: {
    top
  },
  watch: {
    houseNum() {
      this.routeClass();
      // this.addhouseNum();
      // $('.houseEvery').eq(0).css('color', '#c7ad8b');
      this.watch();
      // this.watchDiv();
      // this.arrowClick();
      // this.houseTypeClick();
    }
  }
}
</script>

<style lang="scss">
@import "../../../styles/common";
@import "../../../styles/main";
@import "../../../styles/mixin";
.houseIndex {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto 93%;
    background-image: url('../../../assets/img/index/background.jpg');
    // background-color: #202020;
    // @include fj();
    // flex-direction: column;
    position: relative;
    .header {
      width: 100%;
      height: px2rem(61);
      // background-color: #fff;
      position: absolute;
      top: 0;

    }
    .middle {
      width: 100%;
      height: px2rem(592);
      position: absolute;
      top: 18.8%;
      // background-color: #fff;
    }
    .bottom {
      width: 100%;
      height: px2rem(227);
      position: absolute;
      bottom: 0;
      // background-color: #fff;
      .category {
        width: 100%;
        height: px2rem(129);
        @include fj(space-around);
        align-items: flex-start;
        div {
          width: px2rem(142);
          height: px2rem(51);
          @include fj(center);
          align-items: center;
          @include fontSize(24);
          border: px2rem(2) solid #666666;
        }
        #three {
          width: px2rem(142);
        }
        .active {
          background-color: #c7ad8b;
          border: px2rem(2) solid #c7ad8b;
          a {
            color: #ffffff;
          }
        }
        .noActive {
          background-color: transparent;
          border: px2rem(2) solid #666666;
          a {
            color: #666666;
          }
        }
      }
      .houseType {
        width: 100%;
        height: px2rem(98);
        background-color: #ffffff;
        box-shadow: 0px 11px 36px 3px
          rgba(29, 35, 40, 0.2);
        @include fj(center);
        align-items: center;
        position: relative;
          #leftArrow {
            width: px2rem(17);
            height: px2rem(43);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: px2rem(28);
          }
          #rightArrow {
            width: px2rem(17);
            height: px2rem(43);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: px2rem(28);
          }
        .allHouse {
          height: 100%;
          position: absolute;
          left: px2rem(0);
          @include fj();
          align-items: center;
        }
        >div {
          width: px2rem(656);
          height: 100%;
          position: relative;
          // overflow: hidden;
        }

        .oneHouse {
          min-width: px2rem(162);
          height: 100%;
          @include fj();
          align-items: center;
          // position: relative;
          .houseEvery {
            width: px2rem(157);
            height: px2rem(58);
            @include fontSize(30);
            @include fj(center);
            align-items: center;
            color: #666666;
          }
          .divide {
            width: px2rem(1);
            height: px2rem(58);
            background-color: #e6e6e6;
          }
          .divide:last-of-type, .divide:first-of-type{
            // display: none;
          }
        }
        .oneHouse:first-of-type {
            >div {
              color: #c7ad8b;
            }
        }

      }
    }
}
</style>
