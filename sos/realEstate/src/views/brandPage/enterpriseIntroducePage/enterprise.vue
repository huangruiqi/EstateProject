<template>
  <div id="enterprise" class="honor">
    <div class="enterpriseImage">
      <transition-group tag="ul" :name="change">
        <li v-for="(image, index) in images" :key="image" v-show="index == imageNum">
          <img :src="image.image" alt="">
        </li>
      </transition-group>
    </div>

    <transition-group tag="ul" class="spot">
      <li v-for="(image, index) in images" :key="image"  @click="changeImage(index)" :class="[{changeStyle: index==imageNum}]"></li>
    </transition-group>
    <div class="introduce">
      <div class="worldIntro">
        <p v-if="worlds.enterpriseIntroduction">{{ worlds.enterpriseIntroduction }} </p>
        <p v-else></p>
        <div @click="bigVideo">
          <img src="../../../assets/img/leftNav/video.jpg" alt="">
        </div>
      </div>
    </div>
    <div class="touchevent" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
    </div>
    <router-view></router-view>
    <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
  </div>
</template>
<script>
import getImage from '../../../ultis/getImage.js';
import ip from '../../../../static/ip'
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
  name: 'enterprise',
  data () {
    return {
      images: '',
      worlds: '',
      worldBgc: '',
      videoWorld: '',
      videoMp4: '',
      videoStop: '',
      imageNum: 0,
      timer: '',
      startX: 0,
      endX: 0,
      x: 0,
      change: '',
      head: ip + ':8080/static/image/',
      conDisplay: 'none'
    }
  },
  created () {
    this.$axios.get('/brand/enterpriseIntroduction/get')
      .then(res => {
        if (res.data.data) {
          this.worlds = res.data.data
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.post('/brand/enterpriseIntroduction/image/get')
      .then(res => {
        if (res.data.data) {
          this.images = res.data.data
          this.images.map((item, index) => {
            if (item.imageLocation) {
              this.images[index].image = getImage(item.imageLocation, 1)
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    })
  },
  methods: {
    clickBack: function () {
      this.$router.push({path: '/index'})
    },
    autoPlay () {
      this.imageNum++
      this.change = 'photoSlideLeft'
      if (this.imageNum > this.images.length - 1) {
        this.imageNum = 0
      }
    },
    changeImage (index) {
      clearInterval(this.timer)
      this.imageNum = index
      this.timer = setInterval(() => {
        this.autoPlay()
      }, 4000)
    },
    bigVideo () {
      this.$router.push({path: '/mp4'})
    },
    left () {
      clearInterval(this.timer)
      this.imageNum--;
      this.change = 'photoSlideRight'
      if (this.imageNum < 0) {
        this.imageNum = this.images.length - 1
      }
    },
    touchstart (ev) {
      this.startX = parseInt(ev.touches[0].clientX)
    },
    touchmove (ev) {
      this.endX = parseInt(ev.touches[0].clientX)
    },
    touchend (ev) {
      this.x = this.endX - this.startX
      if (this.x > 0) {
        clearInterval(this.timer)
        this.left()
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 4000)
      } else if (this.x < 0) {
        clearInterval(this.timer)
        this.autoPlay()
        this.timer = setInterval(() => {
          this.autoPlay()
        }, 4000)
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
    images() {
      let that = this
      let ele = document.getElementsByTagName('img')
      let imgUrl = []
      let imgObject = []
      let num = 0
      for (let i = 0; i < this.images.length; i++) {
        if (screen.width > 1024) {
          imgUrl[i] = this.images[i].image.fileName
          // alert(334);
        } else {
          imgUrl[i] = this.images[i].image.middle
        }
        imgObject[i] = new Image()
        imgObject[i].src = imgUrl[i]
      }

      for (let i = 0; i < this.images.length; i++) {
        imgObject[i].onload = function () {
          num++
          ele[i + 2].src = imgUrl[i]
          // document.getElementsByClassName('honor')[0].setAttribute('class', 'honor complete');
          // if (i == 0) {
          // that.$emit('eventB');
          // that.clickUrl = imgUrl[0];
          // that.$emit('event', this.clickUrl);
          // }
        }
      }
      let time = setInterval(() => {
        if (this.images.length == num && document.getElementById('enterprise')) {
          document.getElementById('enterprise').setAttribute('class', 'honor complete');
        }
      }, 100);
      // console.log(document.getElementById('enterprise')[0]);
    }
  }
}
// window.onload = function () {
// 	var startX,endX;
// 	var box = document.querySelector('.touchevent')
// 	box.addEventListener('touchstart', function(event){
// 	//  console.log(event)
// 		var Touch = event.touches[0]
// 		startX = parseInt(Touch.clientX);
// 		// console.log(startX)
// 	//  alert(Touch.screenY + '\n' + Touch.clientY+'\n'+
// 		//Touch.pageY+'\n'+Touch.radiusX + '\n' + Touch.radiusY + '\n' +
// 	//  Touch.rotationAngle
// 		//)
// 		event.preventDefault()
// 	},false)

// 	box.addEventListener('touchmove', function(event){
// 		var touchend = event.touches[0];
// 		endX = parseInt(touchend.clientX)
// 		// console.log('end'+endX)
// 		event.preventDefault()
// 	},false)

// 	box.addEventListener('touchend', function(event){
// 		var x = endX - startX;
// 		// console.log('X='+x)
// 		if (x>0) {

// 		}
// 		event.preventDefault()
// 	},false)

// 	// var body = document.body
// 	// body.addEventListener('touchstart',function(ev){
// 	// 	console.log('body', ev)
// 	// 	event.preventDefault()
// 	// })
// 	// body.addEventListener('touchmove',function(ev){
// 	// 	console.log('body', ev)
// 	// 	event.preventDefault()
// 	// })
// }

</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.touchevent {
  width: 75%;
  height: 100%;
  position: absolute;
  z-index: 90;
}
#enterprise {
  width: transverse(1660);
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
  .enterpriseImage {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    ul {
      width: 100%;
      height: 100%;
      li {
        position: absolute;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .spot {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: px2rem(70);
    z-index: 99;
    padding-top: px2rem(3);
    @include fj(center);
    li {
      width: px2rem(14);
      height: px2rem(14);
      border-radius: 50%;
      margin-left: px2rem(5);
      background-color: #ffffff;
    }
    .changeStyle {
      width: px2rem(20);
      height: px2rem(20);
      margin-top: px2rem(-3);
      border-radius: 50%;
      background-color: #ffffff;
    }
  }
  .introduce {
    width: transverse(1080);
    height: 100%;
    float: right;
    position: absolute;
    right: 0;
    z-index: 88;
    >img {
      width: 100%;
      height: 100%;
      float: left;
      opacity: 0.7;
    }
    .worldIntro {
      position: absolute;
      right: px2rem(150);
      top: vertical(200);
      width: 77%;
      height: 68%;
      background-color: #ffffff;
      background-color: rgba(250, 250, 250, 0.85);
      >div {
        float: right;
        width: px2rem(80);
        height: px2rem(60);
        margin-right: px2rem(50);
        @include fj(space-between);
        align-items: center;
        >img {
          width: 100%;
          height: 100%;
          margin-right: px2rem(30);
        }
      }
      >p {
        // width: calc(100% - 30/16rem);
        height: 80%;
        line-height: px2rem(45);
        float: right;
        text-indent: 2em;
        letter-spacing: .1em;
        font-size: px2rem(28);
        margin: vertical(72) px2rem(40) 0 px2rem(30);
        color: #333333;
      }
    }
  }
}
.honor {
  // filter: blur(10px);
  transition: all 0.7s;
}
.complete {
    // filter: blur(0);
}
.photoSlideLeft-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideLeft-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}
.photoSlideLeft-enter {
  transform: translateX(100%);
}
.photoSlideLeft-leave {
  transform: translateX(0);
}
.photoSlideRight-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideRight-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}
.photoSlideRight-enter {
  transform: translateX(-100%);
}
.photoSlideRight-leave {
  transform: translateX(200%);
}
</style>
