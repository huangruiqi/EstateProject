<template>
  <div class="content" style="position:relative;overflow: hidden;">
    <img draggable="true" id="targetObj" class="target" :src="map">
    <img id="come" src="../../../assets/img/goHouseHistory/goHistory.png" alt @click="goHistory()">
    <contact @haveCon='haveCon'></contact>
    <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
    <!-- <input type="button" value="重置" @click="reset()" > -->
  </div>
</template>



<script type="text/ecmascript-6">
import getImage from "../../../ultis/getImage.js";
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'
export default {
  data() {
    return {
      map: "../../../assets/img/default/2.jpg",
      mapBig: "",
      conDisplay: 'none'
    };
  },
  created() {
    this.$axios
      .post("/surround/surroundingFacilities/get")
      .then(res => {
				if (res.data.data) {
					if (screen.width > 1024) {
						this.mapBig = getImage(res.data.data.imageLocation, 1);
					} else {
						this.mapBig = getImage(res.data.data.imageLocation, 2);
					}
					this.map = getImage(res.data.data.imageLocation, 5 );
				}
        // this.mapBig = res.data.data.nearDto.url;
      })
      .catch(error => {
        console.log(error);
      });
  },
  mounted() {
    // this.shuaXin();
    var targetObj = document.getElementById("targetObj");
		var rate = 1; // 初始比例
		var rage = {
			xStart: targetObj.offsetWidth,
			yStart: targetObj.offsetHeight
		}; // 边界
		var oMouseMove = {};
		// 滑轮
    targetObj.addEventListener("wheel", event => {
      var wheelDirect = event.deltaY;
      if (wheelDirect > 0) {
        rate = rate > 1 ? rate/1.2 : 1;
        targetObj.style.width = rate * 100 + "%";
        targetObj.style.height = rate * 100 + "%";
        targetObj.style.left = - event.clientX * (rate - 1) + "px";
        targetObj.style.top = - event.clientY * (rate - 1) + "px";
      }

      if (wheelDirect < 0) {
        rate = rate > 3 ? 3 : rate*1.2;
        targetObj.style.width = rate * 100 + "%";
        targetObj.style.height = rate * 100 + "%";
        targetObj.style.left = - event.clientX * (rate - 1) + "px";
				targetObj.style.top = - event.clientY * (rate - 1) + "px";
      }
    });
		// 拖拽
		targetObj.addEventListener('dragstart', event => {
			event.preventDefault();
		})
		targetObj.addEventListener('drag', event => {
			rage.xEnd = targetObj.scrollWidth
			rage.yEnd = targetObj.scrollHeight
			event.preventDefault();
			if (rate > 1) {
				var left = Number(targetObj.style.left.replace('px', '')) + event.detail.distanceX
				var top = Number(targetObj.style.top.replace('px', '')) + event.detail.distanceY
				rage.x = rage.xEnd - rage.xStart
				rage.y = rage.yEnd - rage.yStart
				left = left > 0 ? 0 : left
				top = top > 0 ? 0 : top
				left = left < - rage.x ? - rage.x : left
				top = top < - rage.y ? - rage.y : top
        targetObj.style.left = left + "px";
        targetObj.style.top = top + "px";
			}
		})
		targetObj.addEventListener('dragend', event => {
			event.preventDefault();
		})

		// 双击
		targetObj.addEventListener("dblclick", event => {
			rate = rate > 3 ? 3 : rate*1.4;
			targetObj.style.width = rate * 100 + "%";
			targetObj.style.height = rate * 100 + "%";
			targetObj.style.left = - event.clientX * (rate - 1) + "px";
			targetObj.style.top = - event.clientY * (rate - 1) + "px";
		})
  },
  methods: {
    //重置
    reset() {
      // this.$router.replace("/index");
      document.getElementsByTagName("input").style.backgroundColor = "red";
      this.$router.go(0);
      // this.$forceUpdate();
      // this.$router.push('/nearBy/neighberhood');
    },
    shuaXin() {
      window.onload = () => {
        this.$router.push("/index");
      };
    },
    goHistory() {
      this.$router.push("/index");
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
    mapBig() {
      var ele = document.querySelector("#targetObj");
      var imgUrl = this.mapBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function() {
        this.map = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.map;
        // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute("class", "target complete");
      };
    }
  }
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
  background-size: 100% 100%;
  #targetObj {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
  }
  .target {
    filter: blur(4px);
    transition: all 0.7s;
  }
  .complete {
    filter: blur(0);
  }
  #come {
    width: px2rem(57);
    height: px2rem(50);
    z-index: 1000;
    position: absolute;
    right: px2rem(105);
    top: px2rem(49);
    cursor: pointer;
  }
  input {
    position: absolute;
    top: percentage(955 /1080);
    right: px2rem(105);
    width: px2rem(159);
    height: px2rem(35);
    border-radius: px2rem(17);
    border: px2rem(1) solid $colorAll;
    z-index: 1000;
    @include sc(px2rem(28), black);
    cursor: pointer;
  }
}
</style>
