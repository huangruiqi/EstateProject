<template>
  <div id="enterprise" class="honor">
  	<div class="enterpriseImage">
			<transition-group tag="ul" :name="change">
  			<li v-for="(image, index) in images" :key="index" v-show="index == imageNum">
					<img :src="image.image.min" alt="">
				</li>
				<!-- <img :src="image.image.min" alt="" v-for="(image, index) in images" :key="index" v-show="index==imageNum"> -->
			</transition-group>
		</div>
		
		<transition-group tag="ul" class="spot">
			<li v-for="(image, index) in images" :key="index" :class="[{changeStyle: index==imageNum}]"></li>
		</transition-group>
		<div class="introduce">
			<img src="../../../assets/img/brandBGC/worldBgc.png" alt="">
			<div class="worldIntro">
				<div><p>{{ worlds.title }}</p> <div></div></div>
				<p>{{ worlds.content }} </p>
			</div>
			<div class="videoIntro">
			<!-- 	<video id="videoPlay" width="100%" height="65" :src="videoMp4" type="video/mp4">
				</video> -->
				<div @click="bigVideo">
					<!-- <div class="controlVideo"> -->
						<img src="../../../assets/img/leftNav/video.png" alt="">			
					<!-- </div> -->
				</div>
				<!-- <p @click="bigVideo">点击播放视频</p> -->
			</div>
		</div>
		<div class="touchevent" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
		</div>
		<router-view></router-view>
  </div>
</template>
<script>
export default {
	name: "enterprise",
	data() {
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
			change: ''
		}
	},
	created() {
		this.$axios.get("/introduction")
			.then(res => {
				// console.log(res.data.enterprise)
				this.images = res.data.data.images;
				this.worlds = res.data.data;
			})
			.catch(error => {
		console.log(error);
		});
		this.$nextTick(() => {
			this.timer = setInterval(() => {
			this.autoPlay()
			}, 4000);
		})
	},
	methods: {
		clickBack: function() {
			this.$router.push({path: '/index'});
		},
		autoPlay() {
			this.imageNum++;
			this.change = 'photoSlideLeft';
			if (this.imageNum > this.images.length -1) {
				this.imageNum = 0;
			}
		},
		bigVideo() {
			this.$router.push({path: '/mp4'});
		},
		left() {
			clearInterval(this.timer);
			this.imageNum--;
      this.change = 'photoSlideRight';
			if (this.imageNum < 0) {
				this.imageNum = this.images.length-1;
			}
		},
		touchstart(ev) {
			this.startX = parseInt(ev.touches[0].clientX);
		},
		touchmove(ev) {
			this.endX = parseInt(ev.touches[0].clientX);
		},
		touchend(ev) {
			this.x = this.endX - this.startX;
			if (this.x>0) {
				clearInterval(this.timer)
				this.left()
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 4000);
			}else if(this.x<0) {
				clearInterval(this.timer)
				this.autoPlay()
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 4000)
			}
		}
	},
	watch: {
        images() {
            let that = this;
            let ele = document.getElementsByTagName('img');
            let imgUrl = [];
			let imgObject = [];
			let num = 0;
            for (let i = 0; i < this.images.length; i++) {
				// console.log(screen.width);
                if (screen.width > 1024){
					imgUrl[i] = this.images[i].image.fileName;
					// alert(334);
                }else {
                    imgUrl[i] = this.images[i].image.middle;
                } 
                // imgUrl[i] = this.images[i].image.fileName;
                imgObject[i] = new Image();
                imgObject[i].src = imgUrl[i];
            }

            for (let i = 0; i < this.images.length; i++) {
                imgObject[i].onload = function () {
					num++;
                    ele[i + 2].src = imgUrl[i];
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
	width: transverse(1620);
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
		z-index: 2;
		@include fj(center);
		li {
			width: px2rem(14);
			height: px2rem(14);
			border-radius: 50%;
			margin-left: px2rem(5);
			background-color: #bfbfbf;
		}
		.changeStyle {
			width: px2rem(30);
			height: px2rem(14);
			border-radius: 5px;
			background-color: #ffdaaa;
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
			right: vertical(90);
			top: vertical(260);
			width: transverse(1200);
			>div {
				float: right;
				width: px2rem(270);
				height: px2rem(57);
				@include fj(space-between);
				align-items: center;
				>p {
					width: 90%;
					height: 100%;
					font-size: px2rem(60);
					text-align: right;
					line-height: px2rem(57);
					color: #ffdba1;
					float: left;
				}
				>div {
					width: transverse(80);
					height: vertical(880);
					float: right;
					background-color: #ffdba1;
				}
			}
			>p {
				width: 100%;
				height: px2rem(308);
				line-height: px2rem(26);
				float: right;
				text-indent: 2em;
				margin-top: vertical(72);
				color: #fffffe;
			}
		}
		>.videoIntro {
			position: absolute;
			width: 22%;
			height: 15%;
			right: 1.8rem;
			bottom: 10.5%;
			opacity: 0.7;
			z-index: 99;
			#videoPlay {
				width: 100%;
				height: 75%;
			}
			>div {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				@include fj(center);
				align-items: center;
				cursor: pointer;
				>img {
					width: 100%;
					height: 100%;
				}
			}
			>p {
				width: 100%;
				height: 20%;
				border-radius: 17px;
				opacity: 1;
				color: #ffdaaa;
				@include fj(center);
				align-items: center;
				border: solid 1px #ffdaaa;
				cursor: pointer;
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
