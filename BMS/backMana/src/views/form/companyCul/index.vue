<template>
<div class="honorAll">
  <div class="honorbox">
    <!-- <div class="control">
      <div id="upload">
        <form action="" enctype="multipart/form-data" method="post" id="imgform">    
          <div id="updiv">
            
            <input type="submit" name="" id="submit" style="display: none">
          </div>
        </form>
      </div>
    </div> -->
    <div id="honor">
      <button class="allSubmit" type="button" @click="submitForm" value="保存">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhengque"></use>
        </svg>
      </button>
      <label class="change changebgc" for="bFile">
        <img class="imgstyle" src="../../../assets/img/brandBGC/changeBGC.png" alt="">        
      </label>
      <input type='file' id="bFile" style="position: absolute;clip:rect(0 0 0 0);" name='photos' class="upfile">
            
      <img :src="backgroundImage" alt="">
      <div class="content">
        <div>
          <div class="contentTop">
            <label class="change changephoto" for="upfile">
              <img class="imgstyle" src="../../../assets/img/brandBGC/change.png" alt="">              
            </label>
            <input type='file'  name='photos' id="upfile" style="position: absolute;clip:rect(0 0 0 0);">
            <img :src="cultureImage" alt="">
          </div>
          <div class="contentBottom">
            <button class="change changeword" type="button" value="" @click="addWorld">
              <img class="imgstyle" src="../../../assets/img/brandBGC/addculture.png" alt="">
            </button>
            <div>
              <div class="line"></div>
                <ul class="dotted">
                  <li v-for="(world, index) in title" v-if="index<6" :key="index">
                    <span class="spot"></span>
                  </li>
                </ul>
                <form class="Intro">
                  <div class="worldIntro" v-for="(title, index) in title" v-if="index<6" :key="index">
                    <div class="titleFather" style="height: 50%">
                       <p v-if="title.content !== null" class="title" @click="changeTitle(index)" :class="[{hide: titleAuto}]">{{ title.content }}</p>
                    
                      <input v-if="title.content !== null" class="title" type="text" autofocus @blur="changeBack(index)" :value="title.content" :class="[{hide: !titleAuto}]">
                    </div>
                    <div class="content1Father" style="height: 50%">
                      <p class="content1" v-if="content[index].content !== null"  @click="changeContent(index)" :class="[{hide: contentAuto}]">{{ content[index].content }}</p>
                      
                      <input class="content1" v-if="content[index].content !== null" type="text" autofocus @blur="changeContentBack(index)" :value="content[index].content" :class="[{hide: !contentAuto}]">
            
                    </div>
                  </div>
                  <input type="submit" id="submit2" style="display: none">
                </form>
                <ul class="deleteT">
                  <li v-for="(world, index) in title" v-if="index<6" :key="index">
                    <span class="delete" @click="deleteWorld(index)">X</span>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
var listentitle, listencontent
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";
import { iconfont } from '../../../utils/iconfont.js'
import qs from 'qs'
export default {
  name: 'honor',
  data() {
    return {
      content: '',
      titleAuto: false,
      world: [],
      worldNum: 0,
      contentAuto: false,
      backgroundImage: '',
      cultureImage: '',
      title: [],
      listen: {
        title: '',
        content: ''
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    let cultureImage = document.getElementById('upfile')
    cultureImage.onchange = () => {
      let a = this.getUrl(cultureImage.files[0])
      this.cultureImage = a
    };

    let backgroundImage = document.getElementById('bFile')
    backgroundImage.onchange = () => {
      let img = this.getUrl(backgroundImage.files[0])
      this.backgroundImage = img;
    };
  },
  methods: {
    getData() {
      this.$axios.get('/culture')
        .then(res => {
          this.worldNum = res.data.data.title.length
          this.title = res.data.data.title
          this.content = res.data.data.content
          this.listen.title = res.data.data.title
          this.listen.content = res.data.data.content
          listentitle = res.data.data.title
          listencontent = res.data.data.content
          console.log(listentitle, listencontent)
          this.backgroundImage = res.data.data.backgroundImage.fileName
          this.cultureImage = res.data.data.demonstrationImage.fileName
        })
        .catch(error => {
          console.log(error)
        })
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
    changeTitle(index) {
      let title1 = document.getElementsByClassName('title')
      for (let i = 0; i < title1.length; i++) {
        if(i == index) {
          title1[2*index].style.display = 'none'
          title1[2*index+1].style.display = 'flex'
        }
      }
    },
    changeBack(index) {
      let title1 = document.getElementsByClassName('title')
      for (let i = 0; i < title1.length; i++) {
        if(i == index) {
          title1[2*index].style.display = 'flex'
          title1[2*index+1].style.display = 'none'
        }
      }
      this.title[index].content = title1[2*index+1].value
    },
    changeContent(index) {
      let content1 = document.getElementsByClassName('content1')
      for (let i = 0; i < content1.length; i++) {
        if(i == index) {
          content1[2*index].style.display = 'none'
          content1[2*index+1].style.display = 'flex'
        }
      }
    },
    changeContentBack(index) {
      let content1 = document.getElementsByClassName('content1')
      for (let i = 0; i < content1.length; i++) {
        if(i == index) {
          content1[2*index].style.display = 'flex'
          content1[2*index+1].style.display = 'none'
        }
      }
      this.content[index].content = content1[2*index+1].value
    },
    addWorld() {
      if (this.title.length < 6 && this.content.length < 6) {
        let setWorld = {
          sequence: this.title.length + 1,
          'content': '请编辑文字'
        }
        let setWorld1 = {
          sequence: this.content.length + 1,
          'content': '请编辑文字'
        }
        this.title.push(setWorld)
        this.content.push(setWorld1)
      }
      // this.$set(this.title, this.title.length, setWorld)
      // this.$set(this.content, this.title.length, setWorld)
    },
    deleteWorld(index) {
      if(this.title[index].id) {
        let result = confirm('确定要删除?')
        let date = this.title[index].id
        let date1 = this.content[index].id
        if (result) {
          this.$axios({
            method: 'DELETE',
            url: '/culture/title/' + date,
            data: {
            }
          }).then( res => {
          })
          this.$axios({
            method: 'DELETE',
            url: '/culture/content/' + date1,
            data: {
            }
          }).then( res => {
            if (res.status == 200) {
              this.title.splice(index, 1)
              this.content.splice(index, 1)
              this.worldNum = this.worldNum - 1
              alert("删除成功")
            }
          })
        }
      }else{
        // this.world.title.splice(index - this.worldNum, 1)
        // this.world.content.splice(index - this.worldNum, 1)
        this.title.splice(index, 1)
        this.content.splice(index, 1)
      }
    },
    submitForm() {
			// let fd = new FormData()
			var iconStyle = document.getElementsByClassName('allSubmit')[0];
			iconStyle.firstChild.style.color = '#3aa7ff';
			iconStyle.firstChild.style.backgroundColor = '#edf0f5';	
      let submit2 = document.getElementById('submit2')
      let bgc = document.getElementById('bFile').files[0]
      let culture = document.getElementById('upfile').files[0]
			for(let i = 0; i < submit2.length; i++) {
				submit2[i].submit()
      }
      let config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
      }
      // 文字添加、修改
      for (let i = 0; i < this.title.length; i++) {
        console.log(this.title[i].id, listentitle[i].content)
        if (this.title[i].content !== listentitle[i].content) {
          let uptitle = this.title[i].content
          let uptitleID = this.title[i].id
          this.$axios.put('/culture/title/' + uptitleID, qs.stringify({
            title: uptitle
          })).then( res => {
            this.getData()
            alert('文化标题修改成功')
          })
        } else if (!this.title[i].id) {
          let uptitle = this.title[i].content
          this.$axios.post('/culture/title/' + this.title[i].sequence, qs.stringify({
            title: uptitle
          })).then( res => {
            alert('文化标题上传成功')
          })
        }
        if (this.content[i].content !== listencontent[i].content) {
          let upcontent = this.content[i].content
          let upcontentID = this.content[i].id
          this.$axios.put('/culture/content/' + upcontentID, qs.stringify({
            content: upcontent
          })).then( res => {
            this.getData()
            alert('文化内容修改成功')
          })
        } else if (!this.content[i].id) {
          let upcontent = this.content[i].content
          this.$axios.post('/culture/content/' + this.content[i].sequence, qs.stringify({
            content: upcontent
          })).then( res => {
            this.getData()
            alert('文化内容上传成功')
          })
        }
      }
      // 上传背景图
      if (bgc) {
        let fd = new FormData()
        fd.append('file', bgc)
        this.$axios.post('/culture/backgroundimage', fd, config)
          .then( res => {
            this.getData()
            alert('背景图修改成功')
          }).catch( res => {
            console.log(res)
          })  
      }
      // 上传文化图
      if (culture) {
        let fd1 = new FormData()
        fd1.append('file', culture)
        this.$axios.post('/culture/demonstrationimage', fd1, config)
          .then( res => {
            this.getData()
            alert('文化图修改成功')
          }).catch( res => {
            console.log(res)
          })
      }
		}
	} 
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.imgstyle {
  width: 100%;
  height: 100%;
}
ul {
  padding: 0;
}
li {
  list-style: none;
}
.hide {
  display: none;
}
.honorAll {
  width: 100%;
  background-color: #edf0f5;
	height: px2rem(scale(1450));
  @include fj(center);
  align-items: center;
}
.honorbox {
  width: 80%;
  height: 80%;
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
  top: .3rem;
}
.changephoto {
  width: px2rem(150);
  top: 5rem;
}
.changeword {
  top: 1rem;
  right: 0;
  border: 0;
  padding: 0;
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
.delete {
  float: right;
  color: #e01;
  cursor: pointer;
}
.control {
	width: 100%;
	height: 5%;
  color: #fff;
  background-color: #a8a8a8;
  position: relative;
	#upload {
		height: 100%;
		#imgform {
			width: 100%;
			height: 100%;
      float: left;
			#updiv {
        width: 100%;
        height: 100%;
        float: left;
        position: absolute;
        @include fj(space-between);
        align-items: center;
			}
		}
	}
}
#honor {
  width: 100%;
	height: 100%;
	float: left;
  position: relative;
  >img {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .content {
    position: absolute;
    top: vertical(125);
    width: 100%;
    height: vertical(955);
    @include fj(center);
    div {
      width: 81%;
      height: 100%;
      .contentTop {
        width: 100%;
        height: 58%;
        @include fj();
        align-items: flex-end;
        >img {
          width: 100%;
          height: 78%;
        }
      }
      .contentBottom {
        width: 100%;
        height: 30%;
        position: relative;
        @include fj(center);
        align-items: flex-end;
        >div {
          width: 100%;
          height: 50%;
          .line {
            width: 100%;
            height: 0;
            position: absolute;
            top: px2rem(88);
            border: 1px solid #ffdaaa;
          }
          .deleteT {
            width: 100%;
            position: absolute;
            top: px2rem(200);
            @include fj(space-around);
          }
          .dotted {
            width:100%;
            position: absolute;
            top: px2rem(63);
            @include fj(space-around);
            >li {
              width: px2rem(22);
              height: px2rem(22);
              border-radius: 50%;
              background-color: #ffdaaa;
              float: left;
            }
          }
          .Intro {
            width: 100%;
            height: 80%;
            margin-top: 1rem;
            @include fj(space-between);
            align-items: flex-end;
            .worldIntro {
              // @include fj(center);
              // flex-direction: column;
              // align-items: center;
              .titleFather {
                >p.title {
                  @include fj(center);
                  align-items: center;
                  color: #ffdaaa;
                  border: 1px dotted #fff;
                }
              }
              .content1Father {
                >p.content1 {
                  margin-top: 2%;
                  text-align: center;
                  @include fj(center);
                  align-items: center;
                  border: 1px dotted #fff;
                  color: #ffffff;
                }
              }
              
            }
          }
        }
      }
    }
  }
}
</style>
