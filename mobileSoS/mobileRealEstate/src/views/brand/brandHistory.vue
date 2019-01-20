<template>
  <div class="brandHistory" :style="{ 'background-image': 'url(' + backgroundImage + ')'}">
    <div class="brandHistoryBox" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
      <transition-group :name="change">
        <div class="brandHistoryPhoto" v-for="(image, index1) in brandHistory" :key="index1*10" v-show="index1==brandHistoryNum">
          <img v-if="image.image !== null" :src="image.image" alt="">
        </div>
        <div class="brandHistorywords" v-for="(image, index) in brandHistory" :key="image.id" v-show="index==brandHistoryNum">
          <div class="brandHistoryBody">
            <div class="brandHistoryHead">
              {{ image.step }}
            </div>
            <div>
              <p class="brandHistoryTitle">
                {{ image.developTitle }}
              </p>
              <p class="brandHistoryContent">
                {{ image.enterpriseDevelopInfo }}
              </p>
            </div>
            <div class="brandHistoryNum">
              <ul>
                <li v-for="(a, index) in brandHistory" :key="index" :class="[{changeStyle: index==brandHistoryNum}]" @click="changeBrandHistory(index)">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/main';
@import '../../styles/mixin';
.brandHistory {
  height: 100%;
  @include fj(center);
  flex-direction: column;
  .brandHistoryBox {
    width: 100%;
    height: 50%;
    position: relative;
    .brandHistoryPhoto {
      position: absolute;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .brandHistorywords {
      width: 100%;
      height: px2rem(250);
      position: absolute;
      bottom: 0;
      background-color: rgba(18, 18, 18, 0.7);
      @include fj(center);
      .brandHistoryBody {
        width: 90%;
        height: 100%;
        @include fj(center);
        align-items: flex-start;
        flex-direction: column;
        .brandHistoryHead {
          width: auto;
          height: px2rem(50);
          color: #ffffff;
          padding: 0 .5rem;
          background-color: #ffdba1;
          @include fontSize(30);
          @include fj(center);
          align-items: center;
          text-align: center;
        }
        div {
          width: 100%;
          .brandHistoryTitle {
            color: #c79f62;
            @include fontSize(34);
            margin-top: .5rem;
          }
          .brandHistoryContent {
            color: #fffffe;
            margin-top: px2rem(15);
            @include fontSize(24);
          }
        }
      }

      .brandHistoryNum {
        width: 100%;
        height: 20%;
        @include fj(center);
        align-items: center;
        ul {
          width: 80%;
          height: px2rem(48);
          @include fj(center);
          align-items: center;
          li {
            width: px2rem(14);
            height: px2rem(14);
            @include fontSize(30);
            @include lineHeight(48);
            margin-left: px2rem(14);
            border-radius: 50%;
            text-align: center;
            background-color: #d0d0d0;
          }
          .changeStyle {
            width: 30px;
            border-radius: 5px;
            background-color: #d0d0d0;
          }
        }
      }
    }
  }
}
.photoSlideRight-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideRight-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}
.photoSlideRight-enter {
  transform: translateX(100%);
}
.photoSlideRight-leave {
  transform: translateX(0);
}
.photoSlideLeft-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideLeft-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}
.photoSlideLeft-enter {
  transform: translateX(-100%);
}
.photoSlideLeft-leave {
  transform: translateX(200%);
}
</style>
<script>
import getImage from '../../utils/getImage.js'
export default {
  name: 'brandHistory',
  data() {
    return {
      brandHistory: '',
      brandHistoryNum: 0,
      change: '',
      startX: 0,
      endX: 0,
      x: 0,
      head: 'http://118.24.113.182:80/',
      backgroundImage: ''
    }
  },
  created() {
    this.$axios.get('/brand/enterpriseDevelop/get')
      .then(res => {
        this.brandHistory = res.data.data
        this.brandHistory.map((item, index) => {
          if (item.enterpriseDevelopImageLocation) {
            this.brandHistory[index].image = getImage(item.enterpriseDevelopImageLocation, 3)
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
    this.$axios.get('/brand/enterpriseDevelop/backgroundImage/get')
      .then(res => {
        this.backgroundImage = getImage(res.data.data.imageLocation, 3)
      })
      .catch(error => {
        console.log(error)
      })
    this.$nextTick(()=>{
      document.title = '发展历程'
    })
  },
  methods: {
    changeBrandHistory(index) {
      if (this.brandHistoryNum < index) {
        this.change = 'photoSlideRight';
      }else if (this.brandHistoryNum > index) {
        this.change = 'photoSlideLeft';
      }
      this.brandHistoryNum = index;
    },
		touchstart(ev) {
      clearInterval(this.timer);
			this.startX = parseInt(ev.touches[0].clientX);
		},
		touchmove(ev) {
			this.endX = parseInt(ev.touches[0].clientX);
    },
		touchend(ev) {
			this.x = this.endX - this.startX;
			if (this.x>0) {
				this.brandHistoryNum--;
        this.change = 'photoSlideLeft';
        if (this.brandHistoryNum < 0) {
          this.brandHistoryNum = this.brandHistory.length-1;
        }
			}else if(this.x<0) {
				this.brandHistoryNum++;
        this.change = 'photoSlideRight';
        if (this.brandHistoryNum > this.brandHistory.length-1) {
          this.brandHistoryNum = 0;
        }
			}
		},
    getImage (data, i) {
      const imgSplit = data.split(/\_|\./g)
      return this.head + imgSplit[0] + '_' + imgSplit[i] + '.' + imgSplit[imgSplit.length - 1]
    }
  }
}
</script>
