<template>
  <div class="brandHistory">
    <div class="brandHistoryBox" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
      <transition-group :name="change">
        <div class="brandHistoryPhoto" v-for="(image, index1) in brandHistory" :key="index1" v-show="index1==brandHistoryNum">
          <img v-if="image.image !== null" :src="image.image.min" alt="">
        </div>
        <div class="brandHistorywords" v-for="(image, index) in brandHistory" :key="index" v-show="index==brandHistoryNum">
          <div class="brandHistoryHead">
            {{ image.begin }} - {{ image.end }} (第 {{ index+1 }} 阶段)
          </div>
          <div class="brandHistoryBody">
            <div>
              <p class="brandHistoryTitle">
                {{ image.title }}
              </p>
              <p class="brandHistoryContent">
                {{ image.content }}
              </p>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
    <div class="brandHistoryNum">
      <ul>
        <li v-for="(a, index) in brandHistory" :key="index" :class="[{changeStyle: index==brandHistoryNum}]" @click="changeBrandHistory(index)">
          {{ index+1 }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../styles/main';
@import '../../styles/mixin';
.changeStyle {
  color: #1b1b1b !important;
  background-color: #ffdba1;
}
.brandHistory {
  height: 100%;
  .brandHistoryBox {
    width: 100%;
    height: 70%;
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
      .brandHistoryHead {
        width: px2rem(418);
        height: px2rem(63);
        background-color: #ffdba1;
        @include fontSize(30);
        @include lineHeight(63);
        text-align: center;
      }
      .brandHistoryBody {
        width: 100%;
        height: px2rem(187);
        background-color: rgba(18, 18, 18, 0.7);
        @include fj(center);
        align-items: center;
        div {
          width: px2rem(630);
          .brandHistoryTitle {
            color: #c79f62;
            @include fontSize(34);
          }
          .brandHistoryContent {
            color: #fffffe;
            margin-top: px2rem(24);
            @include fontSize(24);
          }
        }
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
      @include fj(space-around);
      align-items: center;
      li {
        width: px2rem(48);
        height: px2rem(48);
        @include fontSize(30);
        @include lineHeight(48);
        text-align: center;
        color: #ffdba1;
        border-right: 1px solid #c79f62;   
        border-left: 1px solid #c79f62;   
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
export default {
  name: 'brandHistory',
  data() {
    return {
      brandHistory: '',
      brandHistoryNum: 0,
      change: '',
      startX: 0,
      endX: 0,
      x: 0
    }
  },
  created() {
    this.$axios.get('/history')
      .then(res=>{
        this.brandHistory = res.data.data
      })
      .catch(error => {
        console.log(error);
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
		}
  }
}
</script>
