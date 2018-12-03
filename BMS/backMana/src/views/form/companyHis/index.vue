<template>
<div class="boxAll">
<div class="developAll">
  <div class="controlBox">
      <div class="control">
        <div id="upload">
          <form action="" enctype="multipart/form-data" method="post" id="imgform">    
            <div id="imglist">
              <div class="img" v-for="(photo, index) in content" :key="index">
                <img v-if="photo.image !== null" :src="photo.image.fileName" alt="">
                <img v-if="photo.image == null" src="../../../assets/img/default/2.jpg" alt="">
                <div class="deleteimg" @click="deleteImg(index)">X</div>
              </div>
              <div id="updiv">
                <label for="upfile" class="addAll">
                  <img class="addImg" src="../../../assets/img/add1.png" alt="">
                  <p>
                    <span>添加发展图片</span><br>
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
  <!-- <div id="updiv">
    <input type="submit" id="submit2" style="display: none">
  </div> -->
  
	<div id="develop">
    <button class="allSubmit" type="button" @click="submitForm" value="保存">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhengque"></use>
      </svg>
    </button>
    <label class="change changebgc" for="bFile">
      <img class="imgstyle" src="../../../assets/img/brandBGC/changeBGC.png" alt="">      
    </label>
    <input type='file' id="bFile" style="position: absolute;clip:rect(0 0 0 0);" name='photos' class="upfile">
    <img :src="background" alt="">
    <div class="content">
      <div class="content1">
        <div class="pictureIntro">
          <div v-if="content[index].image !== null" v-for="(image, index) in content" class="hide" :key="index" style="float: left" :class="[{show: index==number}]">
            <img v-if="content[index].image !== null" :src="image.image.fileName" alt="">
            <img v-if="content[index].image == null" src="../../../assets/img/default/2.jpg" alt="">
          </div>
        </div>
        <div class="worldIntro">
          <div>
            <div class="worldIntroTop">
              <div class="world hide" v-for="(world, index) in content" :key="index" :class="[{show: index==number}]">
                <div class="title" @click="changeTitle(index)" :class="[{hide1: titleAuto}]">
                  {{ world.begin }} - {{ world.end }} (第{{ index+1 }}阶段)
                </div>
                <input class="title" style="width: 50%;float: left" type="text" autofocus @blur="changeTitle(index)" :value="world.begin" :class="[{hide1: !titleAuto}]">
                <input class="title" style="width: 50%;float: left" type="text" autofocus @blur="changeTitle(index)" :value="world.end" :class="[{hide1: !titleAuto}]">
                <p class="head" @click="changeHead(index)" :class="[{hide1: headAuto}]">
                  {{ world.title }}
                </p>
                <input class="head" type="text" autofocus @blur="changeHead(index)" :value="world.title" :class="[{hide1: !headAuto}]">
                <p class="content2" @click="changeContent(index)" :class="[{hide1: contentAuto}]">
                  {{ world.content}}
                </p>
                  <textarea style="color: #000;" type="text" class="content2" autofocus @blur="changeContent(index)" :value="world.content" :class="[{hide1: !contentAuto}]">
                  </textarea>
              </div>
            </div>
            <ul class="worldIntroBottom">
              <li v-for="(Image,index) in content" :key="index" :class="[{changeStyle: index == number}]" @click="changeAll(index)">
                {{ index+1 }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <button class="change changeAdd" type="button" value="增加页面" @click="addpage">
        <img class="imgstyle" src="../../../assets/img/brandBGC/addpage.png" alt="">
      </button>
      <button class="change changeDelete" type="button" value="删除页面" @click="deletepage(index)">
        <img class="imgstyle" src="../../../assets/img/brandBGC/reducepage.png" alt="">        
      </button>
    </div>
  </div>
</div>
</div>
</template>
<script>
import { iconfont } from '../../../utils/iconfont.js'
import qs from 'qs'
export default {
  name: 'develop',
  data() {
    return {
      background: '',
      content: [],
      changeContent1: '',
      number: 0,
      changeImage: [],
      changeImageId: [],
      // 监听数据是否改变
      beginlisten: [],
      endlisten: [],
      titlelisten: [],
      contentlisten: [],
      changeImageNum: 0,
      button: true,
      titleAuto: false,
      headAuto: false,
      contentAuto: false,
      id: 0
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    let developImg = document.getElementById('upfile')
    developImg.onchange = () => {
      let id = this.content[this.number].id
      this.changeImage.push({
        id: id,
        data: developImg.files[0]
      })
      
      let a = this.getUrl(developImg.files[0])
      // this.content.splice(this.number, 1, a)
      if (this.content[this.number].image == null) {
        this.content[this.number].image={}
        this.content[this.number].image.fileName = a
      }else {
        this.content[this.number].image.fileName = a
      }
    }

    let backgroundImg = document.getElementById('bFile')
    backgroundImg.onchange = () => {
      let img = this.getUrl(backgroundImg.files[0])
      this.background = img
    }
	},
  methods: {
    getData() {
      this.$axios.get('/history')
        .then(res => {
          this.content = res.data.data
          for (let i = 0; i < this.content.length; i++) {
            this.beginlisten.push(this.content[i].begin)
            this.endlisten.push(this.content[i].end)
            this.titlelisten.push(this.content[i].title)
            this.contentlisten.push(this.content[i].content)
          }
          this.background = res.data.data[0].backgroundImage.fileName
          this.changeImageNum = res.data.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },
		clickBack: function() {
			this.$router.push({path: '/index'})
    },
    changeAll(index) {
      this.number = index
      if (this.content.length < 3) {

      }
    },
    addpage() {
      this.$axios({
        method: 'post',
        url: '/history/',
        data: {
        }
      }).then(res => {
        if (res.status === 200) {
          this.getData()
          alert('页面添加成功')
          this.id = res.data.data
        }
        this.adddefault()
      })
    },
    adddefault() {
      this.number = this.content.length
      var oimage = {
        image: {
          fileName: ''
        },
        begin: 9999,
        end: 1998,
        title: '自定义',
        content: '自定义'
      }
      console.log(this.content)
      for (let i = 0; i < this.content.length; i++) {
        console.log(this.content[i].id, this.id)
        if (this.content[i].id == this.id) {
          this.$set(this.content, i, oimage)
        }
      }
    },
    deletepage() {
      if (this.content[this.number].id == null) {
        this.content.splice(this.number, 1)
      } else {
        let result = confirm('确定要删除?')
        var date = this.content[this.number].id
        if (result) {
          this.$axios({
            method: 'delete',
            url: '/history/' + date,
            data: {
            }
          }).then( res => {
            if (res.status == 200) {
              this.getData()
              alert('删除成功')
              // this.$router.go(0);
              this.number = 0
            } else {
              console.log(res)
            }
          })
        }
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
			if(this.content[index].image.id) {
				let result = confirm('确定要删除?')
        let imagedate = this.content[index].id
        if (result) {
          this.$axios({
            method: 'delete',
            url: '/history/image/' + imagedate,
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
        this.changeImage.splice(index - this.changeImageNum, 1)
        this.content[index].image.fileName = ''
			}
		},
    changeTitle(index) {
			this.titleAuto = !this.titleAuto;
      let title1 = document.getElementsByClassName('title')
      this.content[index].begin = title1[3 * index + 1].value
      this.content[index].end = title1[3 * index + 2].value
    },
    changeHead(index) {
			this.headAuto = !this.headAuto;
			let head1 = document.getElementsByClassName('head');
      this.content[index].title = head1[2*index+1].value;
    },
    changeContent(index) {
			this.contentAuto = !this.contentAuto;
			let content1 = document.getElementsByClassName('content2');
      this.content[index].content = content1[2*index+1].value;
    },
    submitForm() {
			var iconStyle = document.getElementsByClassName('allSubmit')[0];
			iconStyle.firstChild.style.color = '#3aa7ff';
			iconStyle.firstChild.style.backgroundColor = '#edf0f5';	
      let submit2 = document.getElementById('submit2')
      let bgc = document.getElementById('bFile').files[0]
      let number = this.changeImageNum
      let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}
      // 提交背景图
      if (bgc) {
        let upbgc = new FormData()
        upbgc.append('file', bgc)
        this.$axios.post('/history/background', upbgc, config)
          .then( res => {
            if(res.status === 200) {
              alert('背景图片上传成功')
            }
          })
      }
			for (let i = 0; i < this.content.length; i++) {
        // 上传文字
        let imagedate = this.content[i].id
        if (this.beginlisten[i] !== this.content[i].begin) {
          this.$axios.post('/history/begin/' + imagedate, qs.stringify({
            begin: this.content[i].begin
          })).then( res => {
            if (res.status === 200) {
              alert('开始时间上传成功')
            }
          })
        }
        if (this.endlisten[i] !== this.content[i].end) {
          this.$axios.post('/history/end/' + imagedate, qs.stringify({
            end: this.content[i].end
          })).then( res => {
            if (res.status === 200) {
              alert('结束时间上传成功')
            }
          })
        }
        if (this.titlelisten[i] !== this.content[i].title) {
          this.$axios.post('/history/title/' + imagedate, qs.stringify({
            title: this.content[i].title
          })).then( res => {
            if (res.status === 200) {
              alert('标题上传成功')
            }
          })
        }
        if (this.contentlisten[i] !== this.content[i].content) {
          this.$axios.post('/history/content/' + imagedate, qs.stringify({
            content: this.content[i].content
          })).then( res => {
            if (res.status === 200) {
              alert('内容上传成功')
            }
          })
        }
        // 上传图片
        for (let j = 0; j < this.changeImage.length; j++) {
          let fd = new FormData()
          let imagedate = this.changeImage[j].id
          fd.append('file', this.changeImage[j].data)
          if (this.content[i].id == this.changeImage[j].id) {
            this.$axios.post('/history/image/' + imagedate, fd, config)
              .then( res => {
                if(res.status == 200) {
                  this.getData()
                  alert('历程图片上传成功')
                }
              })
              .catch( res => {
              })
          }
        }
      }
    }
	}
}
</script>
<style type="text/css" lang="scss" scoped>
@import "../../../styles/main.scss";
@import "../../../styles/mixin.scss";
.imgstyle {
  width: 100%;
  height: 100%;
  }
.boxAll {
  width: 100%;
  height: 100%;
	@include fj(center);
	align-items: center;
  background-color: #edf0f5;
}
.show {
  display: block !important;
}
.hide {
  display: none;
}
.hide1 {
  display: none !important;
}
ul {
  padding: 0;
  margin: 0;
}
.developAll {
  width: 80%;
	height:  px2rem(scale(1450));
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
.change {
  width: px2rem(120);
  height: px2rem(34);
  background-color: #edf0f5;
  border-radius: px2rem(4);
  position: absolute;
  z-index: 99;
  @include fj(center);
  align-items: center;
}
.changebgc {
   left: .3rem;
   right: .3rem;
}
.changeAdd {
  left: 20rem;
  bottom: 2rem;
  border: 0;
  padding: 0;
}
.changeDelete {
  left: 30rem;
  bottom: 2rem;
  border: 0;
  padding: 0;
}
.controlBox {
	width: 100%;
	height: 30%;
	@include fj(center);
}
.control {
	width: 100%;
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
#develop {
  width: 100%;
	height: 70%;
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
    @include fj(center);
    align-items: center;
    .content1 {
      width: transverse(1200);
      height: vertical(800);
      position: absolute;
      .pictureIntro {
        width: 55.5%;
        height: 100%;
        float: left;
        overflow: hidden;
        border: 1px dotted #fff;
        >div {
          width: 100%;
          height: 100%;
          >img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .worldIntro {
        width: 44.5%;
        float: left;
        height: 100%;
        @include fj(center);
        align-items: center;
        background-color: rgba(38, 38, 42, 0.78);
        div {
          width: 70%;
          height: 80%;
          .worldIntroTop {
            width: 100%;
            height: 80%;
            // overflow: hidden;
            .world {
              width: 100%;
              height: 100%;
              float: left;
              .title {
                width: 100%;
                height: 15%;
                @include fj(center);
                align-items: center;
                background-color: #ffdba1;
                color: #121212;
                font-size: px2rem(25);
                border: 1px dotted #fff;
              }
              .head {
                width: 100%;
                height: 20%;
                font-size: px2rem(25);
                @include fj(space-between);
                align-items: center;
                color: #c79f62;
                margin: 1rem 0;
                border: 1px dotted #fff;
              }
              .content2 {
                width: 100%;
                height: 55%;
                margin-top: 1px;
                line-height: px2rem(30);
                font-size: px2rem(20);
                @include fj(center);
                align-items: flex-start;
                color: #fffffe;
                border: 1px dotted #fff;
              }
              >textarea {
                color: #000 !important;
              }
            }
          }
          .worldIntroBottom {
            width: 100%;
            height: 20%;
            @include fj(space-between);
            align-items: flex-end;
            li {
              width: px2rem(48);
              height: px2rem(48);
              color: #ffdaaa;
              float: left;
              @include fj(center);
              align-items: center;
              border: solid 1px #c79f62;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .changeStyle{
    background-color: #ffdaaa;
    color: #121212 !important;
  }
}
</style>
