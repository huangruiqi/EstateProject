<template>
  <div class="houseIndex">
      <div class="header">
        <img src="../../../assets/img/goHouseHistory/back.png" alt="" @click="go()">
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

        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      "typeClassOne": "active",
      "typeClassTwo": "noActive",
      "typeClassThree": "noActive",
      "house": {},
      "houseNum": 0,
      "blockNum": 0,//当前显示的第一个户型数
      "leftArrow": require('../../../assets/img/rightHouseNav/goLeft.png'),
      "rightArrow": require('../../../assets/img/rightHouseNav/goRight.png'),
      "numHanzi": ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"]
    }
  },
  created() {
    this.$axios.get("/house/housetype")
    .then(res => {
      this.house = res.data.data;
      this.houseNum = this.house.length;
      if (!this.house[0].houseType.vrUrl) {
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
    this.watch();
  },
  methods: {
        //返回
    go() {
      this.$router.push('/index');
    },
    //判断是否有VR
    checkVR(val, cate) {
      // alert(val);
      if(!this.house[val].houseType.vrUrl) {
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
    },
    //加户型
    addhouseNum() {
      // console.log(this.houseNum);
      if (this.houseNum < 5 && this.houseNum > 0) {
        let houseType = '<div class="houseEvery">户型一</div>';
        for (let i = 1; i< this.houseNum; i++) {
          houseType += '<div class="divide"></div>';
          houseType += '<div class="houseEvery">户型' + this.numHanzi[i] + '</div>';
        }
        $('.houseType').eq(0).html(houseType);
        // document.getElementsByClassName('houseType')[0].innerHTML = houseType;
      }else if(this.houseNum > 4) {
        let houseType = '<img src="' + this.leftArrow + '" style="display:none;" id="leftArrow">';
        houseType += '<div class="houseEvery">户型一</div>';
        for (let i = 1; i< 4; i++) {
          houseType += '<div class="divide"></div>';
          houseType += '<div class="houseEvery">户型' + this.numHanzi[i] + '</div>';
        }
        for (let i = 4; i < this.houseNum; i++) {
          houseType += '<div class="divide" style="display:none;"></div>';
          houseType += '<div class="houseEvery" style="display:none;">户型' + this.numHanzi[i] + '</div>';
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
    houseTypeClick() {
      for (let i = 0; i < this.houseNum; i++) {
        $('.houseEvery').eq(i).click(() => {
          $('.houseEvery').eq(i).css('color', '#ffdaaa');
          $('.houseEvery').eq(i).siblings().css("color", "white");
        });
      }
    },
    //随时监控左边栏的位置
    watch() {
      let timer = setInterval(() => {
        for (let i = 0; i < this.houseNum; i++) {
          if ($('.houseEvery').eq(i).css('color') == 'rgb(255, 218, 170)' && this.$refs.content) {
            this.$refs.content.$emit('giveNum', i);
          }
        }
      },100);
    }

  },
  components: {

  },
  watch: {
    houseNum() {
      this.routeClass();
      this.addhouseNum();
      $('.houseEvery').eq(0).css('color', '#ffdaaa');
      this.watch();
      this.arrowClick();
      this.houseTypeClick();
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
    background-color: #202020;
    @include fj();
    flex-direction: column;
    .header {
      width: 100%;
      height: px2rem(93);
      // background-color: #fff;
      position: relative;
      img {
        width: px2rem(64);
        height: px2rem(64);
        position: absolute;
        top: px2rem(29);
        right: px2rem(27);
      }
    }
    .middle {
      width: 100%;
      height: px2rem(641);
      // background-color: #fff;
    }
    .bottom {
      width: 100%;
      height: px2rem(218);
      // background-color: #fff;
      .category {
        width: 100%;
        height: 44.5%;
        @include fj(space-around);
        align-items: flex-start;
        div {
          width: px2rem(132);
          height: px2rem(50);
          @include fj(center);
          align-items: center;
          @include fontSize(28);
          border: px2rem(2) solid #ffdaaa;
        }
        #three {
          width: px2rem(170);
        }
        .active {
          background-color: #ffdaaa;
          a {
            color: #202020;
          }
        }
        .noActive {
          background-color: #202020;
          a {
            color: #ffdaaa;
          }
        }
      }
      .houseType {
        width: 100%;
        height: 55.5%;
        border-top: px2rem(2) solid #ffdaaa;
        @include fj(center);
        align-items: center;
        .houseEvery {
          width: px2rem(157);
          height: px2rem(40);
          @include fontSize(28);
          @include fj(center);
          align-items: center;
          color: #fff;
        }
        .divide {
          width: px2rem(2);
          height: px2rem(29);
          background-color: #c9c9c9;
        }
        img {
          width: px2rem(15);
          height: px2rem(27);
        }
      }
    }
}
</style>
