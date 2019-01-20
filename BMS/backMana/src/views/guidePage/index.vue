<template> 
  <div class="guidePage" v-loading="this.$store.state.loading.loading">
    <div class="page" :style="{backgroundImage: 'url(' + imgBack + ')'}">
      <form action="/bootpage/image" name="formBack" method="post" enctype="multipart/form-data">
        <input type="file" name="file" id="imgGuideBack" style="display: none;">
      <!-- 　<input type="button" value="修改背景图片" onclick="document.formBack.file.click()">  -->
        <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subWord.png"></div>
        <!-- <input type="button" value="提交" @click='tiJiao' class="submit" > -->
        <div class="tijiao" id="gou1" @click='tiJiao' style="display: none"></div>
      </form>
      <div class="logo" :style="{backgroundImage: 'url(' + imgLogo + ')'}">
        <form action="" name="formLogo">
          <input type="file" name="file" id="imgGuideLogo" style="display: none;">
        <!-- 　<input type="button" value="修改项目logo" onclick="document.formLogo.file.click()">  -->
          <div id="gaiTwo" onclick="document.formLogo.file.click()" class="tijiao"><img src="../../assets/img/subLogo.png"></div>
          <!-- <input type="button" value="提交" @click="tijiaoTwo" class="submit" > -->
          <div class="tijiao" id="gou2" @click='tijiaoTwo' style="display: none"></div>
          <!-- <img src="../../assets/img/clickQian.png" alt="" id="gou2" class="tijiao" @click="tijiaoTwo"> -->
        </form>
      </div>
      <colorPicker v-model="color" v-on:change="headleChangeColor"></colorPicker>
      <!-- <div class="click">
        <img src="../../assets/img/guidePage/click.png"/>
        <span>·点击探索·</span>
      </div> -->
      <div class="word">
        <span :style="{display: appearCome}"><img src="../../assets/img/guidePage/bussiness.png" alt="" >&nbsp;&nbsp;{{word[0]}}</span>
        <span :style="{display: appearCome}"><img src="../../assets/img/guidePage/address.png" alt="">&nbsp;&nbsp;{{word[1]}}</span>
        <span :style="{display: appearCome}"><img src="../../assets/img/guidePage/tel.png" alt="">&nbsp;&nbsp;{{word[2]}}</span>
        <form action="" name="word" :style="{display: appear}">
          <input  type="text" style="width:30%" maxlength="50" class="modifyInput" >
          <input  type="text" style="width:30%" maxlength="50" class="modifyInput" >
          <input type="text" style="width:30%" maxlength="50" class="modifyInput" >
          <!-- <input type="button" class="submit" value="提交" @click="tijiaoThree"> -->
          <div class="tijiaoTwo" id="gou3" @click="tijiaoThree" style="display: none"></div>
        </form>
      </div>
      <!-- <input type="button" value="全部提交" class="allSub" disabled="disabled"> -->
          <div class="allSub" id="allSub" @click="allSub"></div>
    </div>
  </div>
</template>

<script>
import {getUrl} from '../../utils/urlGet.js'
import {checkChange} from '../../utils/urlGet.js'
import {modify} from '../../utils/urlGet.js'
import {modifyCome} from '../../utils/urlGet.js'
import qs from 'qs'
import ip from '../../../static/ip'
export default {
  data() {
    return {
      "imgBack": "",
      "imgLogo": "",
      "id": 0,
      "word": [],
      "appear": "none",
      "appearCome": "block",
      "success": [],
      head: ip + ':8080/static/image/',
      color: ''
    }
  },
  created() {
    this.$axios.get("/basic/guidePage/get")
    .then(res => {
      // 切块图片
      if (res.data.data && res.data.data.backgroundImageLocation) {
        const backImgSplit = res.data.data.backgroundImageLocation.split(/\_|\./g);
        this.imgBack = this.getImage(res.data.data.backgroundImageLocation, 3);
        //  this.head + backImgSplit[0] + "_" + backImgSplit[3] + "." + backImgSplit[backImgSplit.length - 1];
      }
      if (res.data.data && res.data.data.projectLogoLocation) {
        const logoImgSplit = res.data.data.projectLogoLocation.split(/\_|\./g);
        this.imgLogo = this.getImage(res.data.data.projectLogoLocation, 3);
        // this.imgLogo = this.head + logoImgSplit[0] + "_" + logoImgSplit[3] + "." + logoImgSplit[logoImgSplit.length - 1];
      }
      //获取文字
      if (res.data.data && res.data.data.projectHost && res.data.data.projectLocation && res.data.data.projectHotline) {
        this.word[0] = res.data.data.projectHost;
        this.word[1] = res.data.data.projectLocation;
        this.word[2] = res.data.data.projectHotline;
      }

      res.data.data && res.data.data.id ? this.id = res.data.data.id : "";
    })
    .catch(error => {
      this.$message.error('获取失败，请上传内容！');
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
  },
  methods: {
      getImage(data, i) {
        const imgSplit = data.split(/\_|\./g)
        let index = i;
        while (imgSplit.length - 1 <= index) {
            index--;
        }
          return this.head + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];
      },
    tiJiao() {   
      let formdata = new FormData();
      if ($('#imgGuideBack') && document.getElementById('imgGuideBack').files[0]) {
        formdata.append('imageFile', document.getElementById('imgGuideBack').files[0]);
        formdata.append('isLogo', 'false');
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  
          }
        }
        this.$axios.post('/basic/guidePage/image/update', formdata, config).then( (res) => {
                this.$message({
                    message: '背景上传成功！',
                    type: 'success'
                });
                res.data.data && res.data.data.id ? this.id = res.data.data.id : "";
                this.tijiaoTwo();
                
        }).catch((error) =>{
          this.$message.error('图片太大，提交失败！');
          this.tijiaoTwo();
        });
      } else {
        this.tijiaoTwo();
      }
    },
    tijiaoTwo() {
      let formdata = new FormData();
      if ($('#imgGuideLogo') && document.getElementById('imgGuideLogo').files[0]) {
        formdata.append('imageFile', document.getElementById('imgGuideLogo').files[0]);
        formdata.append('isLogo', 'true');
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  
          }
        }
        this.$axios.post('/basic/guidePage/image/update', formdata, config).then( (res) => {
                this.$message({
                    message: 'LOGO上传成功！',
                    type: 'success'
                });
                this.tijiaoThree();
        }).catch((error) =>{
          this.$message.error('提交失败！');
          this.tijiaoThree();
        });
      } else {
        this.tijiaoThree();
      }
    },
    tijiaoThree() {
        let config = {
          headers: {
            'Content-Type': 'application/json' 
          }
        }
        if (this.appear == 'none' && this.id) {
          this.$axios.post('/basic/guidePage/text/update',{
            id: this.id,
            projectHost: this.word[0],
            projectLocation: this.word[1],
            projectHotline: this.word[2]
          }, config).then( (res) => {
                  this.$message({
                      message: '文字上传成功！',
                      type: 'success'
                  });
          }).catch((error) =>{
            this.$message.error('提交失败！');
            return;
          });
        } else if (this.appear == 'none' && !this.id) {
          this.$axios.post('/basic/guidePage/text/update',{
            projectHost: this.word[0],
            projectLocation: this.word[1],
            projectHotline: this.word[2]
          }, config).then( (res) => {
                  this.$message({
                      message: '文字上传成功！',
                      type: 'success'
                  });
          }).catch((error) =>{
            this.$message.error('提交失败！');
            return;
          });
        } else {
          this.$message({
            message: '请确定修改好的文字（点击旁侧）',
            type: 'warning'
          });          
        }

    },
    allSub() {
        this.tiJiao();
      // this.tijiaoTwo();
      // this.tijiaoThree();
      // 注释是因为拍提早被loading 消失
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
      let guidePage = document.getElementsByClassName('guidePage')[0];
      let spanWord = guidePage.getElementsByTagName('span');
      let modifyInput = document.getElementsByClassName('modifyInput');
      let page = document.getElementsByClassName('page')[0];
      for (let i = 0; i < spanWord.length; i++) {
        spanWord[i].onclick = () => {
          this.appearCome = 'none';
          this.appear = 'block';
          for (let j = 0; j < spanWord.length && modifyInput[j]; j++) {
            if (this.word[j]) {
              modifyInput[j].value = this.word[j];
            } else {
              modifyInput[j].value = '';
            }
            
          }
        };
        page.onclick = (ev) => {
          if(ev.target != page) return;
          else {
            
            if (this.appear == 'block') {
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
    headleChangeColor(e) {
      console.log(e);
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
  position: absolute;
  top: px2rem(900);
  left: px2rem(1700);
}
.guidePage {
  width: 100%;
  height: px2rem(930);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #edf0f5;
  .page {
    // background-color: black;
    width: px2rem(1455);
    height: px2rem(818);
    position: relative;
    top: px2rem(20);
    background-repeat: no-repeat;
  background-size: 100% 100%;
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
      width: transverse(403);
      height: vertical(286);
      margin: 13% auto;
      // background-color: #fff;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      #gaiTwo {
        width: px2rem(116);
        height: px2rem(34);
        img {
          width: 100%;
          height: 100%;
          margin-left: px2rem(-80);
          margin-top: px2rem(-30);
        }
      }
    }
    .click {
      width: transverse(161);
      height: vertical(140);
      @include fj();
      flex-direction: column;
      align-items: center;
      margin: 0 auto;
      img {
        width: px2rem(73);
      }
      span {
        @include sc(px2rem(20), #b1b1b1);
      }
    }
    .word {
      width: 80%;
      height: px2rem(24);
      margin: 23% auto;
      // background-color: #fff;
      @include fj();
      align-items: center;
      span {
        cursor: pointer;
        @include sc(px2rem(22));
        img {
          width: px2rem(22);
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
    #allSub {
      width: px2rem(34);
      height: px2rem(34);
      background-image: url('../../assets/img/clickQian.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;      
      position: absolute;
      top: 100%;
      left: 100%;
      transform: translate(-100%, -100%);
    }
  }
}
.el-loading-parent--relative {
    position: initial!important;
}  
// .m-colorPicker .box.open[data-v-11842410] {
//   width: px2rem(1000);
// }
</style>
