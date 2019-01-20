<template>
	<div id="culture">
    <img :src="cultureBackground" alt="">
    <div class="content">
      <div>
        <div class="contentTop">
          <img :src="culturePicture" alt="" class="culture">
        </div>
        <div class="contentBottom">
          <div>
            <div class="Intro">
              <div class="worldIntro" v-for="(title, index) in titles" :key="index">
                <div class="word-logo">
                  <img :src="title.logo" alt="">
                </div>
                <div class="word-content">
                  <h2 v-if="title.content !== null">{{ title.title }}</h2>
                  <p v-if="title.content !== null">{{ title.content }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
  </div>
</template>
<script>
import getImage from '../../../ultis/getImage.js';
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";
import ip from '../../../../static/ip'
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
  name: 'culture',
  data () {
    return {
      cultureBackground: '',
      titles: '',
      contents: '',
      culturePicture: '',
      backBig: '',
      culBig: '',
      head: ip + ':8080/static/image/',
      logo: [require('@/assets/img/dingwei.png'), require('@/assets/img/tuoguan.png'), require('@/assets/img/zerenxin.png'), require('@/assets/img/zuanshi.png')],
      conDisplay: 'none'
    }
  },
  created () {
    this.$axios.get('/brand/enterpriseCulture/get')
      .then(res => {
        if (res.data.data) {
          this.titles = res.data.data
          this.contents = res.data.data.content
          this.titles.map((item, index) => {
            if (index > 3) {
              item.logo = this.logo[index-3]
            } else {
              item.logo = this.logo[index]
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseCulture/image/get')
      .then(res => {
        if (res.data.data) {
          this.culturePicture = getImage(res.data.data.mainImageLocation, 1)
          this.cultureBackground = getImage(res.data.data.backgroundImageLocation, 1)
          if (screen.width > 1024) {
            this.backBig = getImage(res.data.data.backgroundImageLocation, 1)
            this.culBig = getImage(res.data.data.mainImageLocation, 1)
          } else {
            this.backBig = getImage(res.data.data.backgroundImageLocation, 2)
            this.culBig = getImage(res.data.data.mainImageLocation, 2)
          }
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
      getImage(data, i) {
        const imgSplit = data.split(/\_|\./g)
        let index = i;
        while (imgSplit.length - 1 <= index) {
            index--;
        }
          return this.head  + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];
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
    contact,
        contactContent
  },
  watch: {
    backBig () {
      var ele = document.querySelector('.honor');
      var imgUrl = this.backBig
      var imgObject = new Image()

      imgObject.src = imgUrl
      imgObject.onload = function () {
        this.cultureBackground = imgUrl
        // console.log(this.imgProjectBack);
        document.getElementsByClassName('back')[0].src = this.cultureBackground;
        // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'honor complete');

      }
    },
    culBig () {
      var ele = document.querySelector('.culture');
      var imgUrl = this.culturePicture;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.culturePicture = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.culturePicture;
        // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'culture complete');
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
#culture {
  width: transverse(1660);
  height: 100%;
  float: left;
  position: relative;
  >img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .content {
    position: absolute;
    top: vertical(125);
    width: 100%;
    height: vertical(900);
    @include fj(center);
    div {
      width: 85%;
      height: 100%;
      .contentTop {
        width: 100%;
        height: 40%;
        @include fj();
        flex-direction: column-reverse;
        >img {
          width: 100%;
          height: 90%;
        }
        .culture {
          // filter: blur(4px);
          transition: all 2s;
        }
        .complete {
            // filter: blur(0);
        }
      }
      .contentBottom {
        width: 100%;
        height: 60%;
        @include fj(center);
        align-items: flex-end;
        >div {
          width: 100%;
          height: 100%;
          margin: 0 px2rem(100);
          .Intro {
            width: 100%;
            height: 80%;
            margin-top: px2rem(80);
            @include fj();
            flex-wrap: wrap;
            align-items: flex-end;
            .worldIntro {
              width: 40%;
              height: px2rem(200);
              div {
                float: left;
              }
              .word-logo {
                width: px2rem(64);
                height: px2rem(64);
                img {
                  width: 100%;
                  height: 100%;
                  float: right;
                }
              }
              .word-content {
                width: calc(100% - 6rem);
                color: #666666;
                margin-left: px2rem(32);
                letter-spacing: .3em;
                >p {
                  height: calc(100% - 2rem);
                  font-size: px2rem(25);
                  letter-spacing: .2em;
                  word-wrap: break-word;
                  word-break: break-all;
                  overflow: hidden;
                }
              }
            }
          }
        }
      }
    }
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
