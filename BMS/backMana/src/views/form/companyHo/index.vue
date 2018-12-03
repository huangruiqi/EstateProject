<template>
<div class="honorTop">
  <div class="honor_center">
    <div class="controlBox">
      <div class="control">
        <div id="upload">
          <form action="" enctype="multipart/form-data" method="post" id="imgform">    
            <div id="imglist">
              <div class="img" v-for="(photo, index) in honorPhoto" :key="index">
                <img :src="photo.image.fileName" alt="">
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
      <div id="honor">
        <button class="allSubmit" type="button" @click="submitForm" value="保存">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zhengque"></use>
          </svg>
        </button>
        <label class="changebgc" for="bFile" style="border-radius: 10px;">
          <img style="width: 100%;height:100%;" src="../../../assets/img/brandBGC/changeBGC.png">
        </label>
        <input type='file' id="bFile" style="position: absolute;clip:rect(0 0 0 0);" name='photos' class="upfile">
        <img v-if="background !== null" :src="background.fileName" alt="">
        <img v-if="background == null" src="../../../assets/img/default/2.jpg" alt="">
        <div class="content">
          <form action="" method="post">
            <ul class="worlds">
              <li v-for="(world, index) in worlds" v-if="index<8" :key="index">
                <img src="../../../assets/img/brandBGC/worldLogo.png" alt="">
                <span class="world" :class="[{hide: worldAuto}]" @click="changeworld(index)">{{ world.content }}</span>
                <input class="world" type="text" autofocus @blur="changeback(index)" :value="world.content" :class="[{hide: !worldAuto}]">
                <label for="shanchu" class="deleteword" @click="deleteWorld(index)">X</label>
                <input type="button" style="display: none" id="shanchu">
              </li>
              <button class="changeword" type="button" value="" @click="addWorld">
                <img style="width: 100%; height: 100%;" src="../../../assets/img/brandBGC/addHonor.png" alt="">
              </button>
            </ul>
          </form>
          <div class="picture">
            <div class="left" @click="leftChange">
              <img src="../../../assets/img/brandBGC/left.png" alt="">
            </div>
            <img v-if="photo.image !== null" class="hide" :src="photo.image.fileName" v-for="(photo, index) in honorPhoto" :key="index" alt="" :class="[{show: index==imageNum}]">
            <img v-if="photo.image == null" class="hide" src="../../../assets/img/default/2.jpg" v-for="(photo, index) in honorPhoto" :key="index" alt="" :class="[{show: index==imageNum}]">
            <div class="right" @click="rightRight">
              <img src="../../../assets/img/brandBGC/right.png" alt="">
            </div>  
          </div>
        </div>
      </div>
    </div>
</div>
</div>

</template>
<script>
import { iconfont } from '../../../utils/iconfont.js'
import qs from 'qs'
export default {
  name: 'honor',
  data() {
    return {
      background: {},
      honorPhoto: [],
      worldLogo: '../../../img/brandBgc/worldLogo.png',
      left: '../../../img/brandBgc/left.png',
      right: '../../../img/brandBgc/right.png',
      worlds: [],
      worldNum: 0,
      worldlisten: [],
      photo: [],
      photoNum: 0,
      imageNum: 0,
      worldAuto: false
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    let honorImg = document.getElementsByTagName('input')[0]
    honorImg.onchange = () => {
      let a = this.getUrl(honorImg.files[0])
      let oimage = {}
      oimage.image = {}
      oimage.image.fileName = a
      this.honorPhoto.push(oimage)
      this.photo.push(honorImg.files[0])
    };
    let backgroundImg = document.getElementById('bFile')
    backgroundImg.onchange = () => {
      let img = this.getUrl(backgroundImg.files[0])
      this.background = {fileName: img}
    }
	},
  methods: {
    getData() {
      this.$axios.get('/honor')
      .then(res => {
        this.background = res.data.data.backgroundImage
        // 接收文字
        this.worldNum = res.data.data.texts.length
        this.worlds = res.data.data.texts
        // 接收图片
        this.photoNum = res.data.data.images.length
        this.honorPhoto = res.data.data.images
        })
        .catch(error => {
          console.log(error)
        })
    },
		clickBack: function() {
			this.$router.push({path: '/index'});
    },
    leftChange() {
      this.imageNum--;
      if (this.imageNum < 0) {
        this.imageNum = this.honorPhoto.length-1;
      }
    },
    rightRight() {
      this.imageNum++;
      if (this.imageNum > this.honorPhoto.length-1) {
        this.imageNum = 0;
      }
    },
    addWorld() {
      if (this.worlds.length < 8) {
        let setWorld = { 'content': '请编辑文字' }
        this.$set(this.worlds, this.worlds.length, setWorld)
      }
    },
    deleteWorld(index) {
      if(this.worlds[index].id) {
        let result = confirm('确定要删除?');
        var date = this.worlds[index].id;
        if (result) {
          this.$axios({
            method: 'DELETE',
            url: '/honor/text/' + date,
            data: {
            }
          }).then( res => {
            if (res.status == 200) {
              this.getData()
              alert("文字删除成功")
            }
          })
        }
      }else{
        this.worlds.splice(index, 1)
      }
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
    deleteImg(index) {
      if (this.honorPhoto[index].id) {
        let result = confirm('确定要删除?')
        let date = this.honorPhoto[index].image.id
        if (result) {
          this.$axios({
            method: 'delete',
            url: '/honor/image/' + date,
            data: {
            }
          }).then(res => {
            if (res.status == 200) {
              this.getData()
              alert('图片删除成功')
            }
          })
        }
      }else{
        this.photo.splice(index - this.photoNum, 1)
        this.honorPhoto.splice(index, 1)
      }
		},
    changeworld(index) {
      // this.worldAuto = !this.worldAuto;
      let world = document.getElementsByClassName('world');
      for (let i = 0; i < this.worlds.length; i++) {
        if(i == index) {
          world[2*index].style.display = 'none';
          world[2*index+1].style.display = 'block';
        }
      }
      // world[2*index].value = world[2*index+1].value;
			// this.worlds[index] = world[2*index+1].value;
    },
    changeback(index) {
      // this.worldAuto = !this.worldAuto;
      let world = document.getElementsByClassName('world');
      for (let i = 0; i < this.worlds.length; i++) {
        if(i == index) {
          world[2*index+1].style.display = 'none';
          world[2*index].style.display = 'block';
        }
      }
      this.worlds[index].content = world[2 * index + 1].value
      let id = this.worlds[index].id
      this.worldlisten.push({
        id: id,
        content: world[2 * index + 1].value
      })
    },
    submitForm() {
			var iconStyle = document.getElementsByClassName('allSubmit')[0];
			iconStyle.firstChild.style.color = '#3aa7ff';
			iconStyle.firstChild.style.backgroundColor = '#edf0f5';	
      let submit2 = document.getElementById('submit2')
      let bgc = document.getElementById('bFile')
      let world1 = document.getElementsByClassName('world')
      let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
      // 上传背景图片
      let upbgc = new FormData()
      if (bgc.files.length !== 0) {
        upbgc.append('file', bgc.files[0])
        this.$axios.post('/honor/backgroundimage', upbgc, config)
          .then( res => {
            if (res.status == 200) {
              this.getData()
              alert('背景图片更换成功')
            }
          })
          .catch( res => {
          })
      }
      
      // 上传文字
      for (let i = 0; i < this.worlds.length; i++) {
        let date = this.worlds[i].id
        let date2 = this.worlds[i].content
        for (let j = 0; j < this.worldlisten.length; j++) {
          let date1 = this.worldlisten[j].content
          if (this.worlds[i].id && this.worldlisten[j].id == this.worlds[i].id) {
            this.$axios.put('/honor/text/' + date, qs.stringify({
              introduction: date1
            })).then(res => {
              if (res.status == 200 ) {
                this.getData()
                alert('文字修改成功')
              }
            })
            break;
          } else if (!this.worlds[i].id) {
            this.$axios.post('/honor/text', qs.stringify({
              introduction: this.worlds[i].content
            })).then( (res) => {
              if (res.status == 200) {
                this.getData()
                alert('文字上传成功')
              }
            }).catch((error) => {
              alert(error)
            })
            break;
          }
        }
      }
      // 上传荣耀照片
      console.log(this.photo)
      for (let i = 0; i < this.photo.length; i++) {
        let upImage = new FormData()
        upImage.append('file', this.photo[i])
        this.$axios.post('/honor/image', upImage, config)
          .then( res => {
            if (res.status == 200) {
              this.getData()
              alert('图片上传成功')
            }
          }).catch( res => {
          })
      }
		}
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.show {
  display: block !important;
}
.hide {
  display: none;
}
.allSubmit {
	position: absolute;
  z-index: 99;
	right: 0;
	bottom: 0;
  &:hover {
  	color: #54b3ff;
    background-color: #d3ecfd;
	}
}
.honorTop {
  width: 100%;
	height:  px2rem(scale(1450));
  background-color: #edf0f5;
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
		width: 20%;
		height: 100%;
		@include fj(center);
		align-items: center;
		background-color: #0f6191;
		color: #ffffff;
		&:hover {
			color: #f00a0a;
		}
	}
}
.honor_center {
  width: 100%;
  height: 100%;
}
.controlBox {
	width: 100%;
	height: 30%;
	@include fj(center);
}
.changeword {
  width: px2rem(120);
  height: px2rem(34);
  background-color: #edf0f5;
  border-radius: px2rem(4);
  margin-top: .5rem;
  border: 0;
  padding: 0;
}
.changebgc {
  width: px2rem(120);
  height: px2rem(34);
  background-color: #edf0f5;
  border-radius: px2rem(4);
  position: absolute;
  z-index: 99;
  @include fj(center);
  align-items: center;
  left: .3rem;
  top: .3rem;
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
#honor {
  width: 80%;
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
    height: 100%;
    position: absolute;
    @include fj(space-around);
    align-items: center;
    >form {
      .worlds {
        width: 100%;
        height: vertical(560);
        float: left;
        @include fj(space-between);
        flex-direction: column;
        padding: 0;
        margin: 0;
        li {
          font-size: px2rem(22);
          line-height: 33px;
          @include fj(flex-start);
          align-items: center;
          >.world {
            width: px2rem(500);
            margin-left: 1em;
            color: #ffffff;
            text-align: left;
            margin-top: 1px;
            border: 1px dotted #fff;
          }
          >.deleteword {
            cursor: pointer;
            padding-left: 1rem;
            color: #3aa7ff;
            >&:hover {
              color: #e00;
            }
          }
          >input {
            color: #000 !important;
          }
          >img {
            width: px2rem(20);
            height: px2rem(16);
          }
        }
      }
    }
    .picture {
      width: transverse(460);
      float: left;
      position: relative;
      @include fj(center);
      align-items: center;
      overflow: hidden;
      .left,.right {
        width: transverse(120);
        height: vertical(200);
        position: absolute;
        background-color: rgba(101, 101, 101, 0.26);
        @include fj(center);
        align-items: center;
        >img {
          width: px2rem(12);
          height: px2rem(32);
        }
      }
      .left {
        left: 0;
      }
      .right{
        right: 0;
      }
      >img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
