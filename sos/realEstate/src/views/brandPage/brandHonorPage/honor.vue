<template>
	<div id="honor" class="honor">
    <img :src="background" alt="">
    <div class="content">
      <div class="worlds">
        <div class="word-line">
        </div>
        <ul class="words">
          <li v-for="(world, index) in worlds" :key="index">
            <span class="honor-spot"></span>
            <span>{{ world.enterpriseHonorInfo }}</span>
          </li>
        </ul>
      </div>
      <div class="picture">
        <div class="left" @click="leftChange" v-show="honorPhoto.length > 1">
          <img src="@/assets/img/brandBGC/left.png" alt="">
        </div>
        <img class="hide" v-if="photo.image" :src="photo.image" v-for="(photo, index) in honorPhoto" :key="index" alt="" :class="[{show: index==imageNum}]">
        <div class="right" @click="rightRight" v-show="honorPhoto.length > 1">
          <img src="@/assets/img/brandBGC/right.png" alt="">
        </div>
      </div>
    </div>
    <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
  </div>
</template>
<script>
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";
import ip from '../../../../static/ip'
import getImage from '../../../ultis/getImage.js';
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
  name: 'honor',
  data () {
    return {
      background: '',
      honorPhoto: '',
      worldLogo: '',
      back: '',
      left: '',
      right: '',
      worlds: '',
      imageNum: 0,
      backBig: '',
      head: ip + ':8080/static/image/',
      conDisplay: 'none'
    }

  },
  created () {
    this.$axios.get('/brand/enterpriseHonor/get')
      .then(res => {
        if (res.data.data) {
          this.worlds = res.data.data
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseHonor/backHonorImage/get')
      .then(res => {
        if (res.data.data) {
          this.background = getImage(res.data.data.imageLocation, 1)
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
    this.$axios.get('/brand/enterpriseHonor/honorImage/get')
      .then(res => {
        if (res.data.data) {
          this.honorPhoto = res.data.data
          this.honorPhoto.map((item, index) => {
            if (item.imageLocation) {
              this.honorPhoto[index].image = getImage(item.imageLocation, 1)
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
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
    clickBack: function() {
      this.$router.push({path: '/index'})
    },
    leftChange () {
      this.imageNum--
      if (this.imageNum < 0) {
        this.imageNum = this.honorPhoto.length - 1
      }
    },
    rightRight () {
      this.imageNum++
      if (this.imageNum > this.honorPhoto.length - 1) {
        this.imageNum = 0
      }
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
  components: {
    contact,
        contactContent
  },
  watch: {
    backBig () {
      var ele = document.querySelector('.honor')
      var imgUrl = this.backBig
      var imgObject = new Image()

      imgObject.src = imgUrl
      imgObject.onload = function () {
        var time = setInterval(() => {
          this.background = imgUrl
          document.getElementsByClassName('back')[0].src = this.background;
          ele.setAttribute('class', 'honor complete')
        }, 100)
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
#honor {
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
    width: 100%;
    height: vertical(955);
    position: absolute;
    top: vertical(125);
    @include fj(center);
    align-items: center;
    flex-direction: row-reverse;
    .worlds {
      width: transverse(800);
      height: vertical(900);
      margin-left: vertical(40);
      position: relative;
      .word-line {
        position: absolute;
        left: px2rem(7.5);
        bottom: 0;
        width: px2rem(1);
        height: calc(100% - 17px);
        background-color: #999999;
      }
      .words {
        @include fj(flex-start);
        flex-direction: column;
        margin-top: px2rem(-55);
        li {
          font-size: px2rem(30);
          line-height: 34px;
          @include fj(flex-start);
          align-items: center;
          margin-top: px2rem(50);
          .honor-spot {
            width: px2rem(15);
            height: px2rem(15);
            background-color: #c7ad8c;
            border-radius: 50%;
          }
          >span {
            text-indent: 1.2em;
            color: #333333;
          }
          >img {
            width: px2rem(32);
            height: px2rem(22);
          }
        }
      }
    }
    .picture {
      width: transverse(850);
      height: vertical(900);
      position: relative;
      @include fj(center);
      align-items: center;
      overflow: hidden;
      .left,.right {
        position: absolute;
        top: 50%;
        cursor: pointer;
        transform: translateY(-50%);
        >img {
          width: px2rem(33);
          height: px2rem(73);
          &:hover {
            color: #c7ad8c;
            // background-color: transparent;
            // background-color: #c7ad8c;
            opacity: .5;
          }
        }
      }
      .left {
        left: px2rem(30);
      }
      .right{
        right: px2rem(30);
      }
      >img {
        width: 100%;
        height: 100%;
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
