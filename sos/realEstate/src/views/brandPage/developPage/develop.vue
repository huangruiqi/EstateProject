<template>
	<div id="develop" class="honor">
    <!-- <img v-if="background[0]" v-lazy="background[0].backgroundImage.fileName" alt=""> -->
    <img v-if="background !== null" :src="background" alt="" class="back">
    <img v-if="background == null" src="" alt="">
    <div class="content">
      <div class="content1">
        <div class="pictureIntro">
          <div class="hide" v-for="(world, index) in worlds" :key="index" :class="[{show: index==number}]">
            <!-- <img v-lazy="worlds[index].image.fileName" alt=""> -->
            <img v-if="world.image !== null" :src="worlds[index].image.fileName" alt="">
            <img v-if="world.image == null" src="" alt="">
          </div>
        </div>
        <div class="worldIntro">
          <div>
            <div class="worldIntroTop">
              <div class="world hide" v-for="(world, index) in worlds" :key="index" :class="[{show: index==number}]">
                <div class="title">
                  {{ world.begin }} - {{ world.end }} (第 {{ index+1 }} 阶段)
                </div>
                <h3>
                  {{ world.title }}
                </h3>
                <p>
                  {{ world.content }}
                </p>
              </div>
            </div>
            <ul class="worldIntroBottom">
              <li v-for="(Image,index) in worlds" :key="index" :class="[{changeStyle: index==number}]" @click="changeAll(index)">
                {{ index+1 }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";

export default {
  name: "develop",
  data() {
    return {
      background: '',
      worlds: '',
      number: 0,
      num: 0,
      backBig: ''
    }
  },
  created() {
    this.$axios.get("/history")
			.then(res => {
        this.background = res.data.data[0].backgroundImage.min;
        if (screen.width > 1024){
          this.backBig = res.data.data[0].backgroundImage.fileName;
        }else {
          this.backBig = res.data.data[0].backgroundImage.middle;
        }
        // this.backBig = res.data.data[0].backgroundImage.fileName;
        this.num = res.data.data.length;
        // console.log(res.data)
        this.worlds = res.data.data;
        // console.log(res.data.data)
			})
			.catch(error => {
        console.log(error);
      })
  },
  methods: {
		clickBack: function() {
			this.$router.push({path: '/index'});
    },
    changeAll(index) {
      this.number = index;
    }
	},
  watch: {
    backBig() {
      var ele = document.querySelector('.honor');
      var imgUrl = this.backBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      // let time = setInterval(() => {
        imgObject.onload = function () {
          let time = setInterval(() => {
          this.background = imgUrl;
          // console.log(this.imgProjectBack);
          document.getElementsByClassName('back')[0].src = this.background;
            // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
          ele.setAttribute('class', 'honor complete');
          }, 100);
        }
      // }, 100);
    }
  }
}
</script>
<style type="text/css" lang="scss" scoped>
@import "../../../styles/main.scss";
@import "../../../styles/mixin.scss";
#develop {
  width: transverse(1620);
	height: 100%;
	float: left;
  position: relative;
  >img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .content {
    width: 100%;
    height: 100%;
    @include fj(center);
    align-items: center;
    .content1 {
      width: transverse(1400);
      height: vertical(800);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .pictureIntro {
        width: 55.5%;
        height: 100%;
        float: left;
        overflow: hidden;
        >div {
          width: 100%;
          height: 100%;
          >img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .worldIntro {
        width: 44.5%;
        float: left;
        height: 100%;
        @include fj(center);
        align-items: center;
        background-color: rgba(38, 38, 42, 0.78);
        div {
          width: 70%;
          height: 74%;
          .worldIntroTop {
            width: 100%;
            height: 65%;
            overflow: hidden;
            .world {
              width: 100%;
              height: 100%;
              float: left;
              .title {
                width: 100%;
                height: 15%;
                @include fj(center);
                align-items: center;
                background-color: #ffdba1;
                color: #121212;
                font-size: px2rem(25);
              }
              h3 {
                width: 100%;
                height: 25%;
                font-size: px2rem(40);
                @include fj(space-between);
                align-items: flex-end;
                color: #c79f62;
              }
              p {
                width: 100%;
                height: 60%;
                margin-top: 1px;
                line-height: px2rem(35);
                font-size: px2rem(25);
                @include fj(center);
                align-items: flex-start;
                color: #fffffe;
              }
            }
          }
          .worldIntroBottom {
            width: 100%;
            height: 35%;
            @include fj(space-between);
            align-items: flex-end;
            li {
              width: px2rem(48);
              height: px2rem(48);
              color: #ffdaaa;
              float: left;
              @include fj(center);
              align-items: center;
              border: solid 1px #c79f62;
            }
          }
        }
      }
    }
  }
  .changeStyle{
    background-color: #ffdaaa;
    color: #121212 !important;
  }
}
.honor {
  // filter: blur(4px);
  transition: all 0.7s;
}
.complete {
    // filter: blur(0);
}
</style>
