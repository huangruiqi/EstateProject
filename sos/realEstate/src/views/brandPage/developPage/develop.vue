<template>
  <div id="develop">
    <!-- <img v-if="background[0]" v-lazy="background[0].backgroundImage.fileName" alt=""> -->
    <img v-if="developBackground !== null" :src="developBackground" alt="">
    <img v-if="developBackground == null" src="" alt="">
    <div class="content">
      <div class="content1">
        <div class="pictureIntro">
          <div class="hide" v-for="(world, index) in worlds" :key="index" :class="[{show: index==number}]">
            <img v-if="world.image !== null" :src="world.image" alt="">
            <div class="worldIntro">
              <div class="worldIntroTop">
                <div class="world hide" v-for="(world, index) in worlds" :key="index" :class="[{show: index==number}]">
                  <div class="word-time-title">
                    <div>
                      <div>
                        <span class="word-time">{{ world.step }}</span>
                        <span class="word-title">{{ world.developTitle }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="word-content">
                    {{ world.enterpriseDevelopInfo }}
                  </div>
                </div>
              </div>
              <ul class="worldIntroBottom">
                <li v-for="(Image,index) in worlds" :key="index" :class="[{changeStyle: index==number}]"
                    @click="changeAll(index)">
                </li>
              </ul>
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
    name: 'develop',
    data() {
      return {
        developBackground: '',
        worlds: '',
        number: 0,
        num: 0,
        backBig: '',
        head: ip + ':8080/static/image/',
        conDisplay: 'none'
      }
    },
    created() {
      this.$axios.get('/brand/enterpriseDevelop/get')
        .then(res => {
          if (res.data.data) {
            this.num = res.data.data.length
            this.worlds = res.data.data
            this.worlds.map((item, index) => {
              if (item.enterpriseDevelopImageLocation) {
                this.worlds[index].image = getImage(item.enterpriseDevelopImageLocation, 1)
              }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
      this.$axios.get('/brand/enterpriseDevelop/backgroundImage/get')
        .then(res => {
          if (res.data.data) {
            this.developBackground = getImage(res.data.data.imageLocation, 1)
            if (screen.width > 1024) {
              this.backBig = getImage(res.data.data.imageLocation, 1)
            } else {
              this.backBig = getImage(res.data.data.imageLocation, 2)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    components: {
      contact,
      contactContent
    },
    methods: {
      haveCon() {
        this.conDisplay = 'flex';
        this.$forceUpdate();
      },
      closeInfo() {
        this.conDisplay = 'none';
        this.$forceUpdate();
      },
      clickBack: function () {
        this.$router.push({path: '/index'})
      },
      changeAll(index) {
        this.number = index
      },
      getImage(data, i) {
        const imgSplit = data.split(/\_|\./g)
        let index = i;
        while (imgSplit.length - 1 <= index) {
          index--;
        }
        return this.head + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];
      },
    },
    watch: {
      backBig() {
        var ele = document.querySelector('.honor');
        var imgUrl = this.backBig
        var imgObject = new Image()

        imgObject.src = imgUrl
        // let time = setInterval(() => {
        imgObject.onload = function () {
          let time = setInterval(() => {
            this.developBackground = imgUrl
            // console.log(this.imgProjectBack);
            document.getElementsByClassName('back')[0].src = this.developBackground
            // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
            ele.setAttribute('class', 'honor complete')
          }, 100)
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
    width: transverse(1660);
    height: 100%;
    float: left;
    position: relative;

    > img {
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
        width: transverse(1650);
        height: vertical(800);

        .pictureIntro {
          position: relative;
          width: 100%;
          height: 100%;
          float: left;
          overflow: hidden;

          > div {
            width: 100%;
            height: 100%;

            > img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .worldIntro {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30%;
          @include fj(center);
          align-items: center;
          flex-direction: column;
          background-color: rgba(90, 90, 90, .85);

          .worldIntroTop {
            width: 100%;
            height: 65%;
            overflow: auto;

            .world {
              width: 100%;
              height: 100%;
              @include fj(center);
              font-family: FZHTJW;
              overflow: hidden;

              .word-time-title {
                width: 30%;
                height: 100%;
                float: left;
                margin-left: px2rem(40);

                &:before {
                  content: '';
                  float: right;
                  height: 100%;
                  border-right: 3px solid #9c9c9c;
                }

                > div {
                  height: 100%;
                  @include fj();
                  align-items: center;
                }

                span {
                  display: inline-block;
                  font-size: px2rem(36);
                  color: #e2e2e2;
                }

                .word-time {
                  color: #ffffff;
                  border-bottom: 2px solid #9c9c9c;
                }
              }

              .word-content {
                width: 60%;
                height: 100%;
                float: left;
                margin: 0 px2rem(40);
                font-size: px2rem(30);
                letter-spacing: .1em;
                color: #e2e2e2;
              }
            }
          }

          .worldIntroBottom {
            width: 100%;
            height: 26%;
            @include fj(center);
            align-items: center;

            li {
              width: px2rem(15);
              height: px2rem(15);
              background-color: #d0d0d0;
              float: left;
              @include fj(center);
              align-items: center;
              border: solid 1px #d0d0d0;
              border-radius: 50%;
              margin-left: px2rem(10);
            }

            .changeStyle {
              width: px2rem(30);
              border-radius: 5px;
              background-color: #d0d0d0;
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
