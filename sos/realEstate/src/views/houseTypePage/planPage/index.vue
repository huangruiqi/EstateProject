<template>
<!-- :style="{backgroundImage: 'url(' + imgPlanBack + ')'}" -->
  <div class="content" style="background-color:#F2EBE1" v-show="check" :style="{backgroundImage: 'url(' + imgPlanBack + ')'}">
    <div id="changePosition">
      <div class="topHouse">
        <img src="../../../assets/img/goHouseHistory/goHistory2.png" @click="goHistory()">
      </div>
      <div class="middleHouse">
      </div>
    </div>
    <!-- <img src="../../../assets/img/goHouseHistory/goHistory2.png" @click="goHistory()"> -->
        <!-- 传给子组件值 -->
    <bottom ref="bottom" @changeCate='changeCate' :typeClassChange='typeClassChangeTwo' :typeClassChangeThree='typeClassChangeTwo' :typeClassChangeTwo='typeClassChange' @eventB='getHouseTwo'></bottom>
  </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/navBar/bottomNavBar'
import error from '../../../assets/img/index/loading.jpg'
import no from '../../../assets/img/no.jpg'

export default {
  data() {
    return {
        typeClassChangeTwo: "noActiveTwo",//传给bottom没有被点击的盒子样式
        typeClassChange: "activeTwo",//传给bottom被点击的盒子样式
        imgPlanBack: "",
        dataAll: [],
        houseNum: 0,
        check: 0 ,
        imgBig: ""
    }
  },
  created() {
    this.$axios.get("/house/housetype")
    .then(res => {
      if (this.$route.query.houseNum) {
        this.houseNum = this.$route.query.houseNum;
      }
      this.dataAll = res.data.data;
      if (this.dataAll[this.houseNum].housePlans[0]) {
        this.imgPlanBack = this.dataAll[this.houseNum].housePlans[0].houseTypeImage.image.min;
        if (screen.width > 1024){
          this.imgBig = this.dataAll[this.houseNum].housePlans[0].houseTypeImage.image.fileName;
        }else {
          this.imgBig = this.dataAll[this.houseNum].housePlans[0].houseTypeImage.image.middle;
        }
      } else {
        this.imgPlanBack = no;
        document.querySelector('.content').setAttribute('class', 'content complete');
      }
      // this.imgBig = this.dataAll[this.houseNum].housePlans[0].houseTypeImage.image.fileName;
      this.check = 1;
      // console.log( this.imgPlanBack);
    })
    .catch(error => {
      console.log(error);
    });
  },
  mounted(){
    this.$refs.bottom.$emit('change2');
    this.$on('bridge', (val, val2) => {
      this.imgPlanBack = this.dataAll[val].housePlans[0].houseTypeImage.image.fileName;
      if (this.dataAll[val]) {
        if(this.dataAll[val].houseType.vrUrl) {
          this.$refs.bottom.$emit('checkVR', val, 2);
          // this.$emit('checkVR', val, 2);
          // this.src = this.dataAll[val].houseType.vrUrl;
        }else {
          // this.$emit('checkVR', val, 2);
          this.$refs.bottom.$emit('checkVR', val, 2);
        }
      }
    });
    this.$on('bridgeTwo', (val) => {
        this.houseNum = val;
        if(this.dataAll[val]) {
          // console.log(val);
          if(this.dataAll[val].housePlans[0]) {
             this.imgPlanBack = this.dataAll[val].housePlans[0].houseTypeImage.image.fileName;
          }else {
            this.imgPlanBack = no;
          }
         
        }
        if (this.dataAll[val]) {
          if(this.dataAll[val].houseType.vrUrl) {
            this.$refs.bottom.$emit('checkVR', val, 2);
            // this.$emit('checkVR', val, 2);
            // this.src = this.dataAll[val].houseType.vrUrl;
          }else {
            // this.$emit('checkVR', val, 2);
            this.$refs.bottom.$emit('checkVR', val, 2);
          }
        }
          
    });
    // this.shuaXin();
  },
  methods: {
      //点击返回
      goHistory() {
          // window.location.href = "/index"; 
          this.$router.push('/index');
      },
      //得到户型
      getHouseTwo() {
        this.imgPlanBack = this.dataAll[this.houseNum].housePlans[0].houseTypeImage.image.fileName;
      },
      changeCate() {
            // this.$on('bridgeTwo', (val) => {
                // this.$refs.rightA.$emit('changeHouse2', this.val);
            // });
      }
  },
  components: {
      bottom
  },
  watch: {
      imgPlanBack() {
        var ele = document.querySelector('.content');
        var imgUrl = this.imgBig;
        var imgObject = new Image();

        imgObject.src = imgUrl;
        imgObject.onload = function () {
          this.imgProjectBack = imgUrl;
          // console.log(this.imgProjectBack);
          ele.style.backgroundImage = 'url(' + this.imgProjectBack + ')';
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
          ele.setAttribute('class', 'content complete');
        }
      }
  }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';

.content {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: blur(4px);
    transition: all 0.7s;
    img {
      width: px2rem(57);
      height: px2rem(50);
      position: absolute;
      top: px2rem(48);
      left: percentage(1503 / 1620);
                // margin-top: px2rem(48);
                // margin-left: percentage(1503 / 1620);
      cursor: pointer;
    }
    #changePosition {
        width: 100%;
        height: vertical(905);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .topHouse {
            width: 100%;
            height: percentage(140 / 905);
            z-index: 1;
            img {
                width: px2rem(57);
                height: px2rem(50);
                cursor: pointer;
                z-index: 1000;
            }
        }
        .middleHouse {
            width: 100%;
            height: percentage(765 / 905);
        }
    }
}
.complete {
  filter: blur(0);
}

</style>
