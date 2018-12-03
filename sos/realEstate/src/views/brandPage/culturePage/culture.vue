<template>
	<div id="honor" class="honor">
    <img :src="background" alt="" class="back">
    <div class="content">
      <div>
        <div class="contentTop">
          <img :src="culturePicture" alt="" class="culture">
        </div>
        <div class="contentBottom">
          <div>
            <div class="line"></div>
              <ul>
                <li v-for="(title, index) in titles" :key="index">
                  <span class="spot"></span>
                </li>
              </ul>
              <div class="Intro">
                <div class="worldIntro" v-for="(title, index) in titles" :key="index">
                  <h3 v-if="title.content !== null">{{ title.content }}</h3>
                  <p v-if="contents[index].content !== null">{{ contents[index].content }}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { resetTime, Timeout } from "../../../ultis/timeOut.js";

export default {
  name: "honor",
  data() {
    return {
      background: '',
      titles: '',
      contents: '',
      culturePicture: '',
      backBig: '',
      culBig: ''
    }
   
  },
  created() {
    this.$axios.get("/culture")
			.then(res => {
        // console.log(res.data.culture.data)
				// this.background = res.data.backgroundImage.filePath;
				this.titles = res.data.data.title;
        this.contents = res.data.data.content;
        this.culturePicture = res.data.data.demonstrationImage.min;
        this.background = res.data.data.backgroundImage.min;
        // this.backBig = res.data.data.backgroundImage.fileName;
        // this.culBig = res.data.data.demonstrationImage.fileName;
        if (screen.width > 1024){
          this.backBig = res.data.data.backgroundImage.fileName;
          this.culBig = res.data.data.demonstrationImage.fileName;
        }else {
          this.backBig = res.data.data.backgroundImage.middle;
          this.culBig = res.data.data.demonstrationImage.middle;
        }
			})
			.catch(error => {
      console.log(error);
      })
  },
  methods: {
	},
  watch: {
    backBig() {
      var ele = document.querySelector('.honor');
      var imgUrl = this.backBig;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.background = imgUrl;
        // console.log(this.imgProjectBack);
        document.getElementsByClassName('back')[0].src = this.background;
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'honor complete');
        
      }
    },
    culBig() {
      var ele = document.querySelector('.culture');
      var imgUrl = this.culturePicture;
      var imgObject = new Image();

      imgObject.src = imgUrl;
      imgObject.onload = function () {
        this.culturePicture = imgUrl;
        // console.log(this.imgProjectBack);
        ele.src = this.culturePicture;
          // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
        ele.setAttribute('class', 'culture complete');
        
      }
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
#honor {
  width: transverse(1620);
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
        .culture {
          // filter: blur(4px);
          transition: all 2s;
        }
        .complete {
            // filter: blur(0);
        }
      }
      .contentBottom {
        width: 100%;
        height: 32%;
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
          ul {
            width:100%;
            position: absolute;
            top: px2rem(77);
            @include fj(space-around);
            li {
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
            @include fj(space-between);
            align-items: flex-end;
            .worldIntro {
              h3 {
                @include fj(center);
                color: #ffdaaa;
              }
              p {
                margin-top: 2%;
                text-align: center;
                @include fj(center);
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
}
.honor {
  // filter: blur(4px);
  transition: all 0.7s;
}
.complete {
    // filter: blur(0);
}
</style>
