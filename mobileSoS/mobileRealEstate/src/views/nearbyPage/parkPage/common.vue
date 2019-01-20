<template>
  <div class="content" style="position:relative;overflow: hidden;">
    <div class="header">
            <!-- <img src="../../../assets/img/goHouseHistory/back.png" alt="" @click="go()"> -->
      <top/>
    </div>
    <img id="targetObj" style="position:absolute;transform-origin:center" :src="map">
    <!-- <img src="../../../assets/img/goHouseHistory/back.png" alt id="come" @click="go()"> -->
    <!-- <img id="come" src="../../../assets/img/goHouseHistory/goHistory2.png" alt="" @click="goHistory()"> -->
    <!-- <input type="button" value="重置" @click="reset()" > -->
  </div>
</template>

<script type="text/ecmascript-6">
import getImage from "../../../utils/getImage.js";
import top from '../../../components/top'
export default {
  data() {
    return {
      map: "../../../assets/img/index/3DMAP.jpg"
    };
  },
  created() {
    this.$axios
      .post("/surround/surroundingFacilities/get")
      .then(res => {
        if (res.data.data) {
          this.map = getImage(res.data.data.imageLocation, 3);
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  components: {
      top
  },
  mounted() {
    // this.shuaXin();
    document.title = "周边设施";
    // console.log(document.title);
    var targetObj = document.getElementById('targetObj')
    var initSize = {
      width: targetObj.offsetWidth,
      height: targetObj.offsetHeight
    }
    var startSize = {
      x: Number,
      y: Number
    }
    var endSize = 1, doubleClickNum = 0
    targetObj.addEventListener('touchstart', event => {
      startSize.x = event.touches[0].clientX
      startSize.y = event.touches[0].clientY
      if (event.touches.length < 2) {
        doubleClickNum++
        setTimeout(() => {
          doubleClickNum = 0
        }, 500)
        if (doubleClickNum > 1) {
          endSize = 1.5 * endSize
          if (endSize > 3) {
            endSize = 2
          }
          targetObj.style.width = 100 * endSize + '%'
          targetObj.style.height = 100 * endSize + '%'
          let border = {
            x: - startSize.x / initSize.width * event.target.scrollWidth ,
            y: - startSize.y / initSize.height * event.target.scrollHeight
          }
          console.log(border.x, event.target.scrollWidth - initSize.width)
          if (border.x > 0) {
            targetObj.style.left = 0
          } else if (border.x > - event.target.scrollWidth + initSize.width){
            targetObj.style.left = border.x + 'px'
          } else {
            targetObj.style.left = initSize.width - event.target.scrollWidth + 'px'
          }
          if (border.y > 0) {
            targetObj.style.top = 0
          } else if (border.y > - event.target.scrollHeight + initSize.height) {
            targetObj.style.top = border.y + 'px'
          } else {
            targetObj.style.top = initSize.height - event.target.scrollHeight + 'px'
          }
        }
      }
    })
    targetObj.addEventListener('touchmove', event => {
      doubleClickNum = 0
      if (event.touches.length > 1) {

      let clientArray = {
          x: [],
          y: []
        }

        Object.keys(event.touches).forEach(key => {
          let item = event.touches[key]
          if (item.clientX) {
            clientArray.x.push(item.clientX - startSize.x)
            clientArray.y.push(item.clientY - startSize.y)
          }
        })
        let endPositionX = clientArray.x[clientArray.x.length - 1]
        let endPositionY = clientArray.y[clientArray.y.length - 1]
        let comX = Math.abs(endPositionX)
        let comY = Math.abs(endPositionY)
        let finalNum = Math.max(comX, comY)

        if (finalNum === comX) {

          endSize = (-endPositionX + initSize.width)/(initSize.width)
        } else if (finalNum === comY) {

          endSize = (-endPositionY + initSize.height)/(initSize.height)
        }
        if (endSize < 1) {

          endSize = 1
          targetObj.style.left = 0 + 'px'
          targetObj.style.top = 0 + 'px'

        } else if (endSize > 3) {

          endSize = 3
        }
        targetObj.style.width = endSize * 100 + '%'
        targetObj.style.height = endSize * 100 + '%'

      } else if (event.touches.length === 1 && endSize !== 1) {

        let targetObjScrollWidth = event.target.scrollWidth
        let targetObjScrollHeight = event.target.scrollHeight
        let eventMoveX = (event.touches[0].clientX - startSize.x)/10
        let eventMoveY = (event.touches[0].clientY - startSize.y)/10
        let targetObjLeft = Number(targetObj.style.left.replace('px', ''))
        let targetObjTop = Number(targetObj.style.top.replace('px', ''))
        eventMoveX += targetObjLeft
        eventMoveY += targetObjTop
        targetObjLeft = eventMoveX
        targetObjTop = eventMoveY

        if (targetObjLeft > 0) {
          targetObjLeft = 0
        } else if (targetObjLeft < initSize.width - targetObjScrollWidth) {
          targetObjLeft = - targetObjScrollWidth + initSize.width
        }
        if (targetObjTop > 0) {
          targetObjTop = 0
        } else if (targetObjTop < initSize.height - targetObjScrollHeight) {
          targetObjTop = - targetObjScrollHeight + initSize.height
        }
        targetObj.style.left = targetObjLeft + 'px'
        targetObj.style.top = targetObjTop + 'px'

      }
    })
  },
  methods: {
    //返回
    go() {
      this.$router.push("/index");
    }
  },
};
</script>

<style scoped lang="scss">
@import "../../../styles/main.scss";
@import "../../../styles/mixin.scss";
@import "../../../styles/common.scss";

.content {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-image: url('../../../assets/img/index/background.jpg');
  @include fj(center);
  align-items: center;
  .header {
    width: 100%;
    height: px2rem(61);
    position: absolute;
    top: 0;
        // img {
        //   width: px2rem(64);
        //   height: px2rem(64);
        //   position: absolute;
        //   top: px2rem(29);
        //   right: px2rem(27);
        // }
  }
  #targetObj {
    width: 100%;
    height: px2rem(541);
    z-index: 1;
  }
  #come {
    width: px2rem(64);
    height: px2rem(64);
    z-index: 1000;
    position: absolute;
    right: px2rem(27);
    top: px2rem(29);
    cursor: pointer;
  }
  input {
    position: absolute;
    top: percentage(955 /1080);
    right: px2rem(105);
    width: px2rem(159);
    height: px2rem(35);
    border-radius: px2rem(17);
    border: px2rem(2) solid $colorAll;
    z-index: 1000;
    @include sc(px2rem(28), black);
    cursor: pointer;
  }
}
</style>
