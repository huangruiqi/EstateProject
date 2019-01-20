<template>
<!-- :style="{backgroundImage: 'url(' + imgPlanBack + ')'}" -->
  <div class="content" style="background-color:#F2EBE1" :style="{backgroundImage: 'url(' + imgPlanBack + ')'}">
    <div id="changePosition">
      <div class="topHouse">
        <img src="../../../assets/img/goHouseHistory/goHistory.png" @click="goHistory()">
      </div>
      <div class="middleHouse">
      </div>
    </div>
    <!-- <img src="../../../assets/img/goHouseHistory/goHistory2.png" @click="goHistory()"> -->
        <!-- 传给子组件值 -->
    <bottom ref="bottom" @changeCate='changeCate' :typeClassChange='typeClassChangeTwo' :typeClassChangeThree='typeClassChangeTwo' :typeClassChangeTwo='typeClassChange' @eventB='getHouseTwo'></bottom>
    <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
  </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/navBar/bottomNavBar'
import error from '../../../assets/img/index/loading.jpg'
import no from '../../../assets/img/no.jpg'
import getImage from '../../../ultis/getImage.js'
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
  data() {
    return {
        typeClassChangeTwo: "noActiveTwo",//传给bottom没有被点击的盒子样式
        typeClassChange: "activeTwo",//传给bottom被点击的盒子样式
        imgPlanBack: "",
        dataAll: [],
        houseNum: -1,
        check: 0 ,
        imgBig: "",
        title: "",
        conDisplay: 'none'
    }
  },
  created() {
    //这个是vr那传过来的
    if (this.$route.params.houseNum) {
      this.houseNum = this.$route.params.houseNum;
       
      this.$axios.get("/house/houseType/get")
      .then(res => {
        this.title = res.data.data;
          if(this.title[this.houseNum]) {
            this.$axios.get("/house/houseTypeImage/get?houseTypeId=" + this.title[this.houseNum].id)
            .then(res => {           
              this.dataAll = res.data.data;
              this.check = 1;
              if(this.dataAll.houseTypeImageLocation) {
                this.imgPlanBack = getImage(this.dataAll.houseTypeImageLocation, 5);
                if (screen.width > 1024){
                  this.imgBig = getImage(this.dataAll.houseTypeImageLocation, 1);
                }else {
                  this.imgBig = getImage(this.dataAll.houseTypeImageLocation, 2);
                }
              }else {
                this.imgPlanBack = no;
                document.querySelector('.content').setAttribute('class', 'content complete');
              }           
            })
            .catch(error => {
              console.log(error);
            });
          
          }
      })
      .catch(error => {
        console.log(error);
      });
    } else {
      this.$axios.get("/house/houseType/get")
      .then(res => {
        this.title = res.data.data;  
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  mounted(){
    this.$refs.bottom.$emit('change2');
    this.$on('bridge', (val, val2) => {
        if(this.houseNum != val && this.title[val]) {
          this.$refs.bottom.$emit('checkVR', val, 2);
          this.houseNum = val;
          this.$axios.get("/house/houseTypeImage/get?houseTypeId=" + this.title[val].id)
          .then(res => {           
            this.dataAll = res.data.data;
            if(this.dataAll.houseTypeImageLocation) {
              this.imgPlanBack = getImage(this.dataAll.houseTypeImageLocation, 5);
              if (screen.width > 1024){
                this.imgBig = getImage(this.dataAll.houseTypeImageLocation, 1);
              }else {
                this.imgBig = getImage(this.dataAll.houseTypeImageLocation, 2);
              }
            }else {
              this.imgPlanBack = no;
              document.querySelector('.content').setAttribute('class', 'content complete');
            }           
          })
          .catch(error => {
            console.log(error);
          });
         
        }
    });
    this.$on('bridgeTwo', (val) => {
        if(this.houseNum != val && this.title[val]) {
          this.houseNum = val;
          this.$axios.get("/house/houseTypeImage/get?houseTypeId=" + this.title[val].id)
          .then(res => {           
            this.dataAll = res.data.data;
            if(this.dataAll.houseTypeImageLocation) {
              this.imgPlanBack = getImage(this.dataAll.houseTypeImageLocation, 5);
              if (screen.width > 1024){
                this.imgBig = getImage(this.dataAll.houseTypeImageLocation, 1);
              }else {
                this.imgBig = getImage(this.dataAll.houseTypeImageLocation, 2);
              }
              this.$forceUpdate();
            }else {
              this.imgPlanBack = no;
              document.querySelector('.content').setAttribute('class', 'content complete');
            }           
          })
          .catch(error => {
            console.log(error);
          });
          
        }
        this.$refs.bottom.$emit('checkVR', val, 2);
        // if (this.dataAll[val]) {
        //   if(this.dataAll[val].houseType.vrUrl) {
        //     this.$refs.bottom.$emit('checkVR', val, 2);
        //   }else {
        //     this.$refs.bottom.$emit('checkVR', val, 2);
        //   }
        // }
    });
  },
  methods: {
      //点击返回
      goHistory() {
          this.$router.push('/index');
      },
      //得到户型
      getHouseTwo() {
        this.imgPlanBack = getImage(this.dataAll.houseTypeImageLocation, 1);
      },
      changeCate() {
            
      },
      haveCon() {
            this.conDisplay = 'flex';
            this.$forceUpdate();
        },
        closeInfo() {
            this.conDisplay = 'none';
            this.$forceUpdate();
        },
  },
  components: {
      bottom,
      contact,
        contactContent
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
    position: relative;
    // img {
    //   width: px2rem(57);
    //   height: px2rem(50);
    //   position: absolute;
    //   top: px2rem(48);
    //   left: percentage(1503 / 1620);
    //             // margin-top: px2rem(48);
    //             // margin-left: percentage(1503 / 1620);
    //   cursor: pointer;
    // }
    #changePosition {
        width: 100%;
        height: vertical(905);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .topHouse {
            height: vertical(117);
            position: absolute;
            display: flex;
            align-items: flex-end;
            top: 0;
            right: px2rem(95);
            img {
                width: px2rem(63);
                height: px2rem(57);
                cursor: pointer;
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
