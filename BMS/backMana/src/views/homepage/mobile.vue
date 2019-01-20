<template>
  <div class="homeMobile">
    <div class="homePage" v-loading="bgcLoading"
        element-loading-text="背景图片上传中"
        :style="{backgroundImage: 'url(' + homeBgc.url + ')'}">
      <label class="change changebgc" for="bFile">
          <img class="imgstyle" src="../../assets/img/brandBGC/changeBGC.png" alt="">
        </label>
        <input type='file' id="bFile" style="position: absolute;clip:rect(0 0 0 0);" name='photos' class="upfile">
      <!-- <div class="homeHead">
        <div class="homeLogo" v-loading="logoLoading" element-loading-text="logo上传中">
         
          <img :src="homeLogo.url" alt="">
        </div>
      </div>
      <div class="projectList">
        <ul class="homeModule">
          <li  v-loading="module.loading" element-loading-text="logo上传中" v-for="(module, index) in moduleIndex" :key="index">
           
            <img :src="module.icon" alt="">
            <span>
              {{ module.description }}
            </span>
          </li>
        </ul>
      </div>
      <div class="companyLogo">
        <img src="../../assets/img/loginIn/logo.png" alt="">
      </div> -->
      <div class="allSub" id="allSub" @click="allSub"></div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/mixin";
.homeMobile {
  width: 100%;
  height: px2rem(860);
  @include fj(center);
  align-items: center;
  background-color: #edf0f5;
}
.homePage {
  width: 30%;
  height: 100%;
  background-size: cover;
  position: relative;
  .homeHead {
    width: 100%;
    height: 55%;
    @include fj(flex-end);
    flex-direction: column;
    align-items: center;
    // margin-top: px2rem(220);
    .homeLogo {
      width: px2rem(260);
      // height: px2rem(300);
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .projectList {
    width: 100%;
    height: 35%;
    @include fj(center);
    align-items: center;
    margin: px2rem(60) 0;
    .homeModule {
      width: 60%;
      height: px2rem(180);
      @include fj(center);
      align-items: space-between;
      flex-wrap: wrap;
      margin-top: 4%;
      padding: 0;
      li {
        width: 40%;
        height: px2rem(80);
        background-color: rgba(98, 98, 100, 0.53);
        @include fj(space-around);
        align-items: center;
        position: relative;
        opacity: 0.53;
        margin-left: px2rem(10);
        >img {
          width: px2rem(30);
          height: px2rem(30);
        }
        span {
          color: #ffdba1;
          font-size: px2rem(20);
        }
      }
    }
  }
  .companyLogo {
    width: 100%;
    height: 100%;
    @include fj(center);
    align-items: flex-start;
    margin-bottom: px2rem(30);
    img {
      width: px2rem(130);
      height: px2rem(24);
    }
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
.imgstyle {
  width: 100%;
  height: 100%;
}
.changebgc {
  left: .3rem;
  top: .3rem;
}
.changeLogo {
  top: px2rem(-34);
  left: 0;
}
</style>

<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
import ip from '../../../static/ip'
export default {
  data() {
    return {
      imgIndexBack: "",
      imgProject: "",
      homeLogo: {},
      homeBgc: {},
      moduleIndex: [],
      icon: [require('../../assets/img/icon1.png'),require('../../assets/img/icon2.png'),require('../../assets/img/icon3.png'),require('../../assets/img/icon4.png')],
      moduleIndex: [
        {
          url: '/projectIntroduce',
          description: "项目介绍",
          icon: require('../../assets/img/icon1.png')
        },{
          url: '/brand',
          description: "品牌概况",
          icon: require('../../assets/img/icon2.png')
        },{
          url: '/houseType',
          description: "户型展示",
          icon: require('../../assets/img/icon3.png')
        },{
          url: '/nearBy',
          description: "楼盘周边",
          icon: require('../../assets/img/icon4.png')
        },
      ],
      head: ip + ':8080/static/image/',
      bgcLoading: false,
      logoLoading: false
    }
  },
  created() {
    this.getdate()
  },
  mounted() {
    var bgcFile = document.getElementById('bFile')
    var headLogo = document.getElementById('upfile')
    // var logo = new Map()
    // this.moduleIndex.map((item, index) => {
    //   item.domNode = eval('document.getElementById("logo' + index + '")')
    //   item.domNode.onchange = () => {
    //     if (item.domNode.files[0].size > 10485760) {
    //       this.$message({
    //         message: '图片不能大于10M',
    //         type: 'warning'
    //       })
    //     } else {
    //       this.moduleIndex[index].icon = getUrl(item.domNode.files[0])
    //       this.moduleIndex[index].image = item.domNode.files[0]
    //       this.moduleIndex[index].loading = false
    //     }
    //   }
    // })
    bgcFile.onchange = () => {
      if (bgcFile.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else {
          this.$forceUpdate();
          this.homeBgc.url = getUrl(bgcFile.files[0]);
          this.homeBgc.image = bgcFile.files[0];
        }
    };
    // headLogo.onchange = () => {
    //   if (headLogo.files[0].size > 10485760) {
    //       this.$message({
    //         message: '图片不能大于10M',
    //         type: 'warning'
    //       })
    //   } else {
    //     this.$forceUpdate()
    //     this.homeLogo.url = getUrl(headLogo.files[0]);
    //     this.homeLogo.image = headLogo.files[0];
    //   }
    // };
  },
  methods: {
    getdate: function () {
      this.$axios.get('/basic/guidePage/get')
        .then(res => {
          if (res.data.data !== null) {
            this.$forceUpdate()
            this.homeLogo.url = this.getImage(res.data.data.projectLogoLocation, 2)
          }
        })
      this.$axios.get('/basic/mainPage/get')
        .then(res => {
          if (res.data.data !== null) {
            this.homeBgc = res.data.data
            console.log(res.data.data)
            this.homeBgc.url = this.getImage(this.homeBgc.mobileBackgroundImageLocation, 2)
            // this.homeLogo.url = this.getImage(this.homeBgc.projectLogoLocation, 3)
            this.moduleIndex[0].icon = this.getImage(this.homeBgc.projectIntroductionBar, 1)
            this.moduleIndex[1].icon = this.getImage(this.homeBgc.brandOverviewBar, 1)
            this.moduleIndex[2].icon = this.getImage(this.homeBgc.unitDisplayBar, 1)
            this.moduleIndex[3].icon = this.getImage(this.homeBgc.projectAroundBar, 1)
          }
        })
    },
        getImage(data, i) {
            const imgSplit = data.split(/\_|\./g)
            let index = i;
            while (imgSplit.length - 1 <= index) {
                index--;
            }
            return this.head + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];
        },
    allSub: async function () {
      if (this.homeBgc.image) {
        this.bgcLoading = true
        await this.update(this.homeBgc.image, 7)
          .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: '背景图片上传成功',
                  type: 'success'
                })
                this.homeBgc.image = null;
                this.bgcLoading = false;
              }
            })
      }
      if (this.homeLogo.image) {
        this.logoLoading = true
        await this.update(this.homeLogo.image, 2)
          .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: 'logo上传成功',
                  type: 'success'
                })
                this.homeLogo.image = null
                this.logoLoading = false
              }
            })
      }
      this.moduleIndex.map(async (item, index) => {
        if (item.image) {
          item.loading = true
          await this.update(item.image, index + 3)
            .then(res => {
              if (res.data.code === 1) {
                this.$message({
                  message: '图标上传成功',
                  type: 'success'
                })
                item.loading = false
                this.moduleIndex[index].image = null
              }
            })
        }
      })
    },
    update: function (data, type) {
      return new Promise(resolve => {
        var fd = new FormData()
        fd.append('imageFile', data)
        fd.append('imageType', type)
        this.$axios({
          method: 'POST',
          url: '/basic/mainPage/update',
          headers: {
            'Content-Type': 'multipart/form-data'  
          },
          data: fd
        })
          .then(res => {
            resolve(res)
          })
      })
    }
  }
}
</script>

