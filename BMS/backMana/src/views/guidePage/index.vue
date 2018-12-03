<template>
  <div class="guidePage">
    <div class="page" :style="{backgroundImage: 'url(' + imgBack + ')'}">
      <form action="/bootpage/image" name="formBack" method="post" enctype="multipart/form-data">
        <input type="file" name="file" id="imgGuideBack" style="display: none;">
      <!-- 　<input type="button" value="修改背景图片" onclick="document.formBack.file.click()">  -->
        <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subWord.png"></div>
        <!-- <input type="button" value="提交" @click='tiJiao' class="submit" > -->
        <div class="tijiao" id="gou1" @click='tiJiao'></div>
      </form>
      <div class="logo" :style="{backgroundImage: 'url(' + imgLogo + ')'}">
        <form action="" name="formLogo">
          <input type="file" name="file" id="imgGuideLogo" style="display: none;">
        <!-- 　<input type="button" value="修改项目logo" onclick="document.formLogo.file.click()">  -->
          <div id="gaiTwo" onclick="document.formLogo.file.click()" class="tijiao"><img src="../../assets/img/subLogo.png"></div>
          <!-- <input type="button" value="提交" @click="tijiaoTwo" class="submit" > -->
          <div class="tijiao" id="gou2" @click='tijiaoTwo'></div>
          <!-- <img src="../../assets/img/clickQian.png" alt="" id="gou2" class="tijiao" @click="tijiaoTwo"> -->
        </form>
      </div>
      <div class="word">
        <span :style="{display: appearCome}"><img src="../../assets/img/guidePage/bussiness.png" alt="" >&nbsp;&nbsp;{{word[0]}}</span>
        <span :style="{display: appearCome}"><img src="../../assets/img/guidePage/address.png" alt="">&nbsp;&nbsp;{{word[1]}}</span>
        <span :style="{display: appearCome}"><img src="../../assets/img/guidePage/tel.png" alt="">&nbsp;&nbsp;{{word[2]}}</span>
        <form action="" name="word" :style="{display: appear}">
          <input  type="text" style="width:30%" maxlength="50" class="modifyInput" >
          <input  type="text" style="width:30%" maxlength="50" class="modifyInput" >
          <input type="text" style="width:30%" maxlength="50" class="modifyInput" >
          <!-- <input type="button" class="submit" value="提交" @click="tijiaoThree"> -->
          <div class="tijiaoTwo" id="gou3" @click="tijiaoThree"></div>
        </form>
      </div>
      <!-- <input type="button" value="全部提交" class="allSub" disabled="disabled"> -->
    </div>
  </div>
</template>

<script>
import {getUrl} from '../../utils/urlGet.js'
import {checkChange} from '../../utils/urlGet.js'
import {modify} from '../../utils/urlGet.js'
import {modifyCome} from '../../utils/urlGet.js'
import qs from 'qs'
export default {
  data() {
    return {
      "imgBack": "",
      "imgLogo": "",
      "word": [],
      "appear": "none",
      "appearCome": "block"
    }
  },
  created() {
    //请求公园类型
    this.$axios.get("/bootpage")
    .then(res => {
      // console.log(res.data.data.image.fileName);
      this.imgBack = res.data.data.backgroundImage.fileName;
      this.imgLogo = res.data.data.logo.fileName;
      // for (let a = 0; a < 3; a++) {
      //   this.word[a] = res.data.data.title[a].content;
      // }
      // console.log(res.data.data.host);
      this.word[0] = res.data.data.host;
      this.word[1] = res.data.data.address;
      this.word[2] = res.data.data.hotline;
      // this.word = res.data.word;
      // console.log(res.data);
      // this.houseType = res.data;
    })
    .catch(error => {
      console.log(error);
    });
  },
  mounted() {
    //背景图预览
    let inputOne = document.getElementById('imgGuideBack');
    let inputTwo = document.getElementById('imgGuideLogo');
    inputOne.onchange = () => {
        this.imgBack = getUrl(inputOne.files[0]);
    };
    inputTwo.onchange = () => {
        this.imgLogo = getUrl(inputTwo.files[0]);
    };
    this.modifyWord();
    // this.allSubmit();
  },
  methods: {
    tiJiao() {   
      let formdata = new FormData();
      if ($('#imgGuideBack')) {
        // alert(666);
        formdata.append('file', document.getElementById('imgGuideBack').files[0]);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  
          }
        }
        this.$axios.post('/bootpage/image', formdata, config).then( (res) => {alert("提交成功！");this.$router.go(0);
        }).catch((error) =>{
        });
      }
      return false; 
    },
    tijiaoTwo() {
      let formdata = new FormData();
      if ($('#imgGuideLogo')) {
        formdata.append('file', document.getElementById('imgGuideLogo').files[0]);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  
          }
        }
        this.$axios.post('/bootpage/logo', formdata, config).then( (res) => {alert("提交成功");this.$router.go(0);
        }).catch((error) =>{
        });
      }
      return false; 
    },
    tijiaoThree() {
        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
          }
        }
        this.$axios.post('/bootpage/text',qs.stringify({
          host: $('.modifyInput').eq(0).val(),
          address: $('.modifyInput').eq(1).val(),
          hotline: $('.modifyInput').eq(2).val()
        }) , config).then( (res) => {alert("提交成功！");this.$router.go(0);
        }).catch((error) =>{
          alert(error);
        });
      // }
      return false; 
    },
    //全部提交
    // allSubmit() {
    //   document.getElementsByClassName('allSub')[0].onclick = () => {
    //     let length = $('input:submit').length;
    //     for (let i = 0; i < 3; i++) {
    //       document.getElementsByClassName('submit')[i].click();
    //     }
    //   }
    // },
    //修改引导页文字
    modifyWord() {
      let spanWord = document.getElementsByTagName('span');
      let modifyInput = document.getElementsByClassName('modifyInput');
      let page = document.getElementsByClassName('page')[0];
      for (let i = 0; i < spanWord.length; i++) {
        spanWord[i].onclick = () => {
          this.appearCome = 'none';
          this.appear = 'block';
          for (let j = 0; j < spanWord.length && modifyInput[j]; j++) {
            modifyInput[j].value = this.word[j];
          }
        };
        page.onclick = (ev) => {
          if(ev.target != page) return;
          else {
            this.appear = 'none';
            this.appearCome = 'block';
            for (let j = 0; j < spanWord.length; j++) {
              this.word[j] = modifyInput[j].value;
            }
          }
        }
      }
    }
  },
  computed: {
  },
  watch: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
@import "../../styles/main.scss";
@import "../../styles/mixin.scss";
.allSub {
  cursor:not-allowed;
}
.allSub {
  position: absolute;
  top: px2rem(900);
  left: px2rem(1700);
}
.guidePage {
  width: 100%;
  height: px2rem(930);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #edf0f5;
  .page {
    // background-color: black;
    width: px2rem(1455);
    height: px2rem(818);
    #gai {
      width: px2rem(103);
      height: px2rem(34);
      img {
        width: 100%;
        height: 100%;
      }
    }
    #gou1 {
      width: px2rem(34);
      height: px2rem(34);
      background-image: url('../../assets/img/clickQian.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    #gou1:active {
      background-image: url('../../assets/img/clickHou.png');
    }
    #gou2,#gou3 {
      width: px2rem(34);
      height: px2rem(34);
      background-image: url('../../assets/img/clickQian.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    #gou3 {
      width: px2rem(26);
      height: px2rem(26);
      cursor: pointer;
    }
    #gou2:active,#gou3:active {
      background-image: url('../../assets/img/clickHou.png');
    }
    .tijiao {
      float: left;
      margin-top: px2rem(4);
      margin-left: px2rem(4);
      cursor: pointer;
    }
    .tijiaoTwo {
      // float: left;
      // margin-top: px2rem(4);
      // margin-left: px2rem(4);
      float: right;
      margin-right: px2rem(65);
    }
    .logo {
      width: transverse(680);
      height: vertical(405);
      margin: 10% auto;
      // background-color: #fff;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      #gaiTwo {
        width: px2rem(116);
        height: px2rem(34);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .word {
      width: 80%;
      height: px2rem(24);
      margin: 13% auto;
      // background-color: #fff;
      @include fj();
      align-items: center;
      span {
        cursor: pointer;
        @include sc(px2rem(18));
        img {
          width: px2rem(18);
        }
        border: px2rem(1) dashed white;
      }
      span:hover {
        border: 1px solid $colorAll;
      }
      form {
        width: 100%;
        @include fj();
      }
    }
  }
}
</style>
