<template>
<div class="controlEnterprise">
	<div class="enterprise_center">
		<div class="controlBox">
			<div class="control">
				<div id="upload">
					<form action="introduce/image" enctype="multipart/form-data" method="post" id="imgform">
						<div id="imglist" v-if="worlds !== null">
							<div class="img" v-for="(image, index) in images" :key="index">
								<img v-if="image.image !== null" :src="image.image.fileName" alt="">
								<img v-if="image.image == null" src="../../../assets/img/default/2.jpg" alt="">
								<div class="deleteimg" @click="deleteImg(index)">X</div>
							</div>
							<div id="updiv">
								<label for="upfile" class="addAll">
									<img class="addImg" src="../../../assets/img/add1.png" alt="">
                  <p>
                    <span>添加荣誉图片</span><br>
                    <span style="font-size: 1rem">支持 JPG/PNG</span><br>
                    <span style="font-size: .5rem">不超过10M</span>
                  </p>
								</label>
								<input type='file'  name='photos' id="upfile" style="position: absolute;clip:rect(0 0 0 0);">
								<!-- <input type="submit" style="display: none" id="submit2">
								<input type="button" @click="submitForm" value="保存"> -->
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="box">
			<div id="enterprise">
				<div class="enterpriseImage" v-if="worlds !== null">
					<img v-if="image.image !== null" class="hide"  :src="image.image.fileName" alt="" v-for="(image, index) in images" :key="index" :class="[{show: index==imageNum}]">
					<img v-if="image.image == null" class="hide"  src="" alt="" v-for="(image, index) in images" :key="index" :class="[{show: index==imageNum}]">
				</div>
				<ul class="spot">
					<li v-for="(image, index) in images" :key="index" :class="[{changeStyle: index==imageNum}]"></li>
				</ul>
				<div class="introduce">
					<img src="../../../assets/img/brandBGC/worldBgc.png" alt="">
					<div class="worldFather">
						<div class="worldIntro">
							<div class="worldTitle">
								<p v-if="!worlds.title" class="title" @click="changeTitle" :class="[{hide: titleAuto}]">输入企业名称</p>
								<p v-if="worlds.title" class="title" @click="changeTitle" :class="[{hide: titleAuto}]">{{ worlds.title }}</p>
								<form action="introduction/title">
									<input class="title" placeholder="输入企业名称" type="text" autofocus @blur="changeTitle" :value="worlds.title" :class="[{hide: !titleAuto}]">
									<input type="submit" id="submit2" style="display:none">
								</form>
							<div></div>
							</div>
							<div class="contentWorld">
								<p v-if="!worlds.content" class="content" @click="changeContent" :class="[{hide: contentAuto}]">输入企业介绍</p>
								<p v-if="worlds.content" class="content" @click="changeContent" :class="[{hide: contentAuto}]">{{ worlds.content }} </p>
								<form action="introduction/text">
									<textarea rows="15" type="text" placeholder="输入企业介绍" class="content" autofocus @blur="changeContent" :value="worlds.content" :class="[{hide: !contentAuto}]">
									</textarea>
									<input type="submit" id="submit2" style="display:none">
								</form>
								</div>
						</div>
						<div class="videoIntro">
							<div>
								<input type="text" id="video" placeholder="输入视频链接">
								<label class="filestyle" @click="videoChange">
									<img src="../../../assets/img/input.png" alt="">
								</label>
							</div>
						</div>
					</div>
					
					<button class="allSubmit" type="button" @click="submitForm" value="保存">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-zhengque"></use>
						</svg>
					</button>
				</div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import { iconfont } from '../../../utils/iconfont.js'
import qs from 'qs'
export default {
  name: 'enterprise',
  data() {
		return {
			images: [],
			changeImage: [],
			imageNum: 0,
			worldBgc: '',
			worlds: '',
			title: '',
			content: '',
			videoMp4: '',
			btnCount: 0,
			checkChange: '',
			titleAuto: false,
			contentAuto: false,
			changeImageNum: 0
		}
	},
	created() {
		this.getData()
		this.$nextTick(() => {
			this.timer = setInterval(() => {
				this.autoPlay()
			}, 2000)
		})
	},
	mounted() {
		let b = document.getElementsByTagName('input')[0];
		b.onchange = () => {
			this.changeImage.push(b.files[0])
			var a = this.getUrl(b.files[0])
      let oimage = {}
      oimage.image = {}
      oimage.image.fileName = a
      this.images.push(oimage)
			console.log(this.images)
		};
	},
	methods: {
		clickBack: function() {
			this.$router.push({path: '/index'})
		},
		getData() {
			this.$axios.get('/introduction')
				.then(res => {
					this.worlds = res.data.data
					this.title = res.data.data.title
					this.content = res.data.data.content
					this.changeImageNum = res.data.data.images.length
					this.images = res.data.data.images
					this.videoMp4 = res.data.data.videoUrl
				})
				.catch(error => {
					console.log(error)
				});
		},
		autoPlay() {
			this.imageNum++
			if (this.imageNum > this.images.length - 1) {
				this.imageNum = 0
			}
		},
		bigVideo() {
			this.$router.push({path: '/mp4'})
		},
		left() {
			clearInterval(this.timer)
			this.imageNum--
			autoPlay()
		},
		getUrl(file) {
      var url = null;
      if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
      }
      return url;
		},
		changeTitle() {
			this.titleAuto = !this.titleAuto
			let title1 = document.getElementsByClassName('title')
			this.worlds.title = title1[1].value
			if (!this.titleAuto) {
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 2000)
			} else {
				clearInterval(this.timer)
			}
		},
		changeContent() {
			this.contentAuto = !this.contentAuto;
			let content1 = document.getElementsByClassName('content');
			this.worlds.content = content1[1].value;
			// let content = document.getElementById('content');
			// let parent = content.parentNode;
			// let textInput = document.createElement('textarea');
			// textInput.innerHTML = parent.innerText;
			// textInput.id = content.id;
			// parent.removeChild(content);
			// parent.appendChild(textInput);
			if (!this.contentAuto) {
				this.timer = setInterval(() => {
					this.autoPlay()
				}, 2000)
			} else {
				clearInterval(this.timer)
			}
		},
		deleteImg(index) {
			if(this.images[index].id) {
				let result = confirm('确定要删除?')
        var date = this.images[index].image.id
        if (result) {
          this.$axios({
            method: 'delete',
            url: '/introduction/image/' + date,
            data: {
            }
          }).then( res => {
						if (res.status == 200) {
							this.getData()
							alert("删除成功")
						}
					})
        }
			}else{
				this.changeImage.splice(index - this.changeImageNum, 1)
				this.images.splice(index, 1)
			}
		},
		videoChange() {
			let video = document.getElementById(video)
			console.log(video.value)
			if (video.value !== null) {
				this.videoMp4 = video.value
				this.$axios.post('/introduction/video', qs.stringify({
					url: this.videoMp4
				})).then(res => {
					if (res.status == 200) {
						alert("视频链接上传成功")
						this.getData()
						}
				})
			}
		},
		buttonChange() {
			this.images
		},
		submitForm() {
			var iconStyle = document.getElementsByClassName('allSubmit')[0];
			iconStyle.firstChild.style.color = '#3aa7ff';
			iconStyle.firstChild.style.backgroundColor = '#edf0f5';	
			let submit2 = document.getElementById('submit2')
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
			for(let i = 0; i < submit2.length; i++) {
				submit2[i].submit()
			}
			// 上传图片
			for(let i = 0; i < this.changeImage.length; i++) {
				let upImage = new FormData()
				upImage.append('file', this.changeImage[i])
				this.$axios.post('/introduction/image', upImage, config)
					.then( res => {
						if (res.status == 200) {
							this.getData()
							alert("图片上传成功")
						}
					}).catch( res => {
						console.log(res)
					})
			}
		// 上传标题
			let changeWorld1 = this.worlds.title
			if (changeWorld1 !== this.title) {
				this.$axios.post('/introduction/title', qs.stringify({
					title: changeWorld1
				})).then(res => {
					if (res.status == 200) {
						this.getData()
						alert("标题上传成功")
					}
				})
			}
			
			let changeWorld2 = this.worlds.content
			if (changeWorld2 !== this.content) {
				this.$axios.post('/introduction/text', qs.stringify({
					introduction: changeWorld2
				})
				).then(res => {
					if (res.status == 200) {
						alert("文本上传成功")
						this.getData()
					}
				})
			}
		}
	}
}

</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.hide {
	display: none;
}
.show {
	display: block;
}
li {
	list-style: none;
}
.allSubmit {
	position: absolute;
	right: 0;
	bottom: 0;
  &:hover {
  	color: #54b3ff;
    background-color: #d3ecfd;
	}
}
#updiv {
	width: 15%;
	height: 100%;
	border: 1px dotted #9da4ae;
	background-color: #f8f9fb;
	text-align: center;
	@include fj(space-between);
	>div {
		width: 40%;
		height: 100%;
		>label, input {
			width: 50%;
			height: 100%;
			float: left;
		}
	}
	.addAll {
		width: 100%;
		height: 100%;
		@include fj(center);
		align-items: center;
		flex-direction: column;
		.addImg {
			width: px3rem(25);
			height: px2rem(25);
		}
		>p {
			margin: 0;
			padding: 0;
			font-size: 1rem;
			margin-top: .5rem;
			>span {
				color: #9da4ae;
			}
		}
	}
	
	.filestyle {
		// width: 20%;
		// height: 100%;
		// @include fj(center);
		// align-items: center;
		// background-color: #0f6191;
		// color: #ffffff;
		// &:hover {
		// 	color: #f00a0a;
		// }
	}
}
.controlEnterprise {
	width: 100%;
	height: px2rem(scale(1450));
	background-color: #edf0f5;
}
.enterprise_center {
	width: 100%;
	height: 100%;
}
.video {
	width: 30%;
}
.controlBox {
	width: 100%;
	height: 30%;
	@include fj(center);
}
.control {
	width: 80%;
	height: 100%;
	border-top: 30px solid #edf0f5;
	border-bottom: 30px solid #edf0f5;
	background-color: #fff;
	#upload {
		height: 100%;
		#imgform {
			width: 100%;
			height: 100%;
			float: left;
			@include fj(center);
			align-items: center;
			>#imglist {
				width: 100%;
				height: 80%;
				float: left;
				overflow-y: scroll;
				>.img {
					width: 15%;
					border: 1px solid #ccc;
					margin-left: 2px;
					height: 100%;
					float: left;
					position: relative;
					img {
						width: 100%;
						height: 100%;
					}
					&:hover {
						>.deleteimg {
							color: #f00a0a;
						}
						border-color: rgb(255, 45, 8);
					}
					.deleteimg {
						width: 15px;
						height: 15px;
						position: absolute;
						@include fj(center);
						align-items: center;
						cursor: pointer;
						color: #3da2f6;
						right: 0;
						top: 0;
					}
				}
			}
			>#world {
				width: 40%;
				height: 80%;
				float: left;
				>.nav {
					width: 15%;
					float: left;
					>span {
						display: inline-block;
						line-height: 20px;
						height: 20%;
					}
				}
			}
			#updiv {
				float: left;
			}
		}
	}
}
.box {
	width: 100%;
	height: 70%;
	@include fj(center);
	align-items: center;
}
#enterprise {
	width: 80%;
	height: 100%;
	float: left;
	overflow: hidden;
	position: relative;
	.enterpriseImage {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 1;
		img {
			width: 100%;
			height: 100%;
			float: left;
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
		width: transverse(1000);
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
		>.worldFather {
			width: 100%;
			float: right;
			height: 100%;
			position: absolute;
			@include fj(flex-end);
			align-items: baseline;
			height: 80%;
		}
		.worldIntro {
			position: absolute;
			right: vertical(90);
			top: vertical(110);
			width: transverse(1200);
			>.worldTitle {
				float: right;
				width: 60%;
				height: 50%;
				@include fj(space-between);
				align-items: center;
				.title {
					width: 100%;
					height: px2rem(30);
					text-align: center;
					font-size: px2rem(30);
					line-height: px2rem(26);
					color: #ffdba1;
					border: 1px dotted #fff;
					float: left;
					margin: 0;
					-webkit-appearance: none;
					-moz-appearance: none;
				}
				>div {
					width: transverse(80);
					height: vertical(880);
					float: right;
					background-color: #ffdba1;
				}
			}
			>.contentWorld {
				width: 80%;
				height: 60%;
				line-height: px2rem(26);
				float: right;
				margin-top: vertical(72);
				color: #fffffe;
				.content {
					width: 100%;
					text-indent: 2em;
					border: 1px dotted #fff;
					height: px2rem(300);
					overflow-y: scroll;
				}
				>p {
					margin: 0;
				}
			}
		}
		.videoIntro {
			position: absolute;
			width: 100%;
			height: 10%;
			right: 9%;
			bottom: 0;
			opacity: 0.7;
			>div {
				width: 55%;
				height: 100%;
				float: right;
				input {
					width: 85%;
					height: 100%;
					// outline: none;
					border: 2px solid gray;
					border-right-width: 0;
				}
				>label {
					width: 15%;
					height: 100%;
					float: right;
					border: 2px solid gray;
					border-left-width: 0;
					cursor: pointer;
					>img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
}
</style>
