<template>
  <div class="honorTop">
    <div class="honor_center">
      <div class="controlBox">
        <div class="control">
          <div id="upload">
            <form action="" enctype="multipart/form-data" method="post" id="imgform">
              <div id="imglist">
                <div v-loading='photo.loading || false' element-loading-text="上传中" class="img" v-for="(photo, index) in honorPhoto" :key="index">
                  <img :src="photo.image" alt="">
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
                  <input type='file' name='photos' id="upfile" style="position: absolute;clip:rect(0 0 0 0);">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="box" v-loading="bgcLoading" element-loading-text="背景图片上传中">
        <div id="honor">
          <button class="allSubmit" type="button" @click="submitForm" value="全部提交">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhengque"></use>
            </svg>
          </button>
          <label class="changebgc" for="bFile" style="border-radius: 10px;">
            <img style="width: 100%;height:100%;" src="../../../assets/img/brandBGC/changeBGC.png">
          </label>
          <input type='file' id="bFile" style="position: absolute;clip:rect(0 0 0 0);" name='photos' class="upfile">
          <img v-if="background !== null" :src="background.image" alt="">
          <img v-if="background == null" src="../../../assets/img/default/2.jpg" alt="">
          <div class="content">
            <form action="" method="post">
              <ul class="worlds">
                <div class="word-line">
                </div>
                <li v-for="(world, index) in worlds" v-if="index < 8" :key="index">
                  <span class="honor-spot"></span>
                  <span class="world" :class="[{hide: worldAuto}]"
                        @click="changeworld(index)">{{ world.enterpriseHonorInfo }}</span>
                  <input class="world" type="text" autofocus @blur="changeback(index)"
                         :value="world.enterpriseHonorInfo"
                         :class="[{hide: !worldAuto}]">
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
              <img v-if="photo.image !== null" class="hide" :src="photo.image"
                   v-for="(photo, index) in honorPhoto" :key="index" alt="" :class="[{show: index==imageNum}]">
              <img v-if="photo.image == null" class="hide" src=""
                   v-for="(photo, index) in honorPhoto" :key="photo.id" alt="" :class="[{show: index==imageNum}]">
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
  import ip from '../../../../static/ip'
  export default {
    name: 'honor',
    data() {
      return {
        background: {},
        honorPhoto: [],
        honorPhotoListen: [],
        worldLogo: '../../../img/brandBgc/worldLogo.png',
        left: '../../../img/brandBgc/left.png',
        right: '../../../img/brandBgc/right.png',
        worlds: [],
        worldNum: 0,
        worldlisten: [],
        photo: [],
        photoNum: 0,
        imageNum: 0,
        worldAuto: false,
        head: ip + ':8080/static/image/',
        bgcLoading: false
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      var honorImg = document.getElementById('upfile')
      honorImg.onchange = () => {
        if (honorImg.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else if (this.honorPhoto.length <= 5) {
          var oimage = {
            imageFile: honorImg.files[0],
            image: this.getUrl(honorImg.files[0]),
            loading: false
          }
          this.$forceUpdate()
          this.honorPhoto.push(oimage)
          console.log(this.honorPhoto)
        } else {
          this.$message({
            message: '上传图片达到上限',
            type: 'warning'
          })
        }
      }
      var backgroundImg = document.getElementById('bFile')
      backgroundImg.onchange = () => {
        if (backgroundImg.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else {
          var img = this.getUrl(backgroundImg.files[0])
          this.$forceUpdate()
          this.$set(this.background, 'image', img)
        }
      }
    },
    methods: {
      getData() {
        this.$axios.get('/brand/enterpriseHonor/get')
          .then(res => {
            // 接收文字
            if (res.data.data) {
              this.worldNum = res.data.data
              this.worlds = res.data.data
              this.worldlisten = JSON.parse(JSON.stringify(res.data.data))
            }
          })
          .catch(error => {
            console.log(error)
          })
        this.$axios.get('/brand/enterpriseHonor/honorImage/get')
          .then(res => {
            if (res.data.data) {
              this.photoNum = res.data.data.length
              this.honorPhoto = res.data.data
              this.honorPhoto.map(item => {
                if (item.imageLocation) {
                  item.image = this.getImage(item.imageLocation, 2)
                }
              })
              this.honorPhotoListen = JSON.parse(JSON.stringify(this.honorPhoto))
            }
          })
          .catch(error => {
            console.log(error)
          })
        this.$axios.get('/brand/enterpriseHonor/backHonorImage/get')
          .then(res => {
            if (res.data.data) {
              this.background = res.data.data
              if (this.background.imageLocation) {
                this.background.image = this.getImage(this.background.imageLocation, 2)
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      clickBack: function() {
        this.$router.push({ path: '/index' })
      },
      leftChange() {
        this.imageNum--
        if (this.imageNum < 0) {
          this.imageNum = this.honorPhoto.length - 1
        }
      },
      rightRight() {
        this.imageNum++
        if (this.imageNum > this.honorPhoto.length - 1) {
          this.imageNum = 0
        }
      },
      addWorld() {
        if (this.worlds.length < 8) {
          var setWorld = {
            'enterpriseHonorInfo': '请编辑文字'
          }
          this.$set(this.worlds, this.worlds.length, setWorld)
        } else {
          this.$message({
            message: '数量达到上限值',
            type: 'warning'
          })
        }
      },
      deleteWorld(index) {
        if (this.worlds[index].id) {
          var result = confirm('确定要删除?')
          if (result) {
            this.$axios({
              method: 'DELETE',
              url: '/brand/enterpriseHonor/delete',
              params: {
                honorInfoId: this.worlds[index].id
              },
              data: {}
            }).then(res => {
              if (res.status === 200) {
                this.getData()
                this.$message({
                  message: '文字删除成功',
                  type: 'success'
                })
              }
            })
          }
        } else {
          this.worlds.splice(index, 1)
        }
      },
      getUrl(file) {
        var url = null
        if (window.createObjectURL !== undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file)
        }
        return url
      },
      deleteImg(index) {
        var result = confirm('确定要删除?')
        if (result) {
          if (this.honorPhoto[index].id) {
            this.$axios({
              method: 'delete',
              url: '/brand/enterpriseHonor/honorImage/delete',
              params: {
                honorImageInfoId: this.honorPhoto[index].id
              },
              data: {}
            }).then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '荣誉图片删除成功',
                  type: 'success'
                })
                this.honorPhoto.splice(index, 1)
              }
            })
          } else {
            this.honorPhoto.splice(index, 1)
          }
          this.imageNum = 0
        }
      },
      changeworld(index) {
        var world = document.getElementsByClassName('world')
        for (let i = 0; i < this.worlds.length; i++) {
          if (i === index) {
            world[2 * index].style.display = 'none'
            world[2 * index + 1].style.display = 'block'
          }
        }
      },
      changeback(index) {
        var world = document.getElementsByClassName('world')
        for (let i = 0; i < this.worlds.length; i++) {
          if (i === index) {
            world[2 * index + 1].style.display = 'none'
            world[2 * index].style.display = 'block'
          }
        }
        this.worlds[index].enterpriseHonorInfo = world[2 * index + 1].value
      },
      submitForm() {
        // var iconStyle = document.getElementsByClassName('allSubmit')[0]
        // iconStyle.firstChild.style.color = '#3aa7ff'
        // iconStyle.firstChild.style.backgroundColor = '#edf0f5'
        var bgc = document.getElementById('bFile').files[0]
        var config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        // 上传背景图片
        if (bgc) {
          var upbgc = new FormData()
          upbgc.append('imageFile', bgc)
          this.bgcLoading = true
          this.$axios.post('/brand/enterpriseHonor/backHonorImage/update', upbgc, config)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '背景图片更换成功',
                  type: 'success'
                })
                bgc = null
                this.bgcLoading = false
              }
            })
        }

        // 上传文字
        this.worlds.map((item, index) => {
          if (!item.id) {
            this.$axios({
              method: 'post',
              url: '/brand/enterpriseHonor/update',
              data: {
                enterpriseHonorInfo: item.enterpriseHonorInfo
              }
            })
              .then((res) => {
                if (res.status === 200) {
                  this.worlds[index] = res.data.data
                  this.$message({
                    message: '文字上传成功',
                    type: 'success'
                  })
                }
              })
          } else {
            this.worldlisten.map((item1, index1) => {
              if (item.id === item1.id && item.enterpriseHonorInfo !== item1.enterpriseHonorInfo) {
                this.$axios({
                  method: 'post',
                  url: '/brand/enterpriseHonor/update',
                  data: {
                    id: item.id,
                    enterpriseHonorInfo: item.enterpriseHonorInfo
                  }
                })
                  .then(res => {
                    if (res.status === 200) {
                      this.$message({
                        message: '文字修改成功',
                        type: 'success'
                      })
                      this.worldlisten[index1] = this.worlds[index]
                    }
                  })
              }
            })
          }
        })
        // 上传荣耀照片
        for (let i = 0; i < this.honorPhoto.length; i++) {
          if (!this.honorPhoto[i].id) {
            var fd = new FormData()
            var imageFile = this.honorPhoto[i].imageFile
            fd.append('imageFile', imageFile)
            this.honorPhoto[i].loading = true
            this.upHonorImage(fd, config)
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '荣耀图片上传成功',
                    type: 'success'
                  })
                  this.honorPhoto[i].id = res.data.data.id
                  this.honorPhoto[i].loading = false
                }
              })
          }
        }
      },
      upHonorImage(fd, config) {
        console.log(fd, config)
        return new Promise(resolve => {
          this.$axios.post('/brand/enterpriseHonor/honorImage/add', fd, config)
            .then(res => {
              resolve(res)
            })
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
    color: #54b3ff;
    background-color: #d3ecfd;
  }

  .honorTop {
    width: 100%;
    height: px2rem(scale(1550));
    background-color: #edf0f5;
    padding-bottom: 60px;
  }

  #updiv {
    width: 15%;
    height: 100%;
    border: 1px dotted #9da4ae;
    background-color: #f8f9fb;
    text-align: center;
    @include fj(space-between);

    > div {
      width: 40%;
      height: 100%;

      > label, input {
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
        width: px2rem(25);
        height: px2rem(25);
      }

      > p {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        margin-top: .5rem;

        > span {
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
    margin-left: 1rem;
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

        > #imglist {
          width: 100%;
          height: 80%;
          float: left;
          overflow-y: scroll;

          > .img {
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
              > .deleteimg {
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

        > #world {
          width: 40%;
          height: 80%;
          float: left;

          > .nav {
            width: 15%;
            float: left;

            > span {
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

    > img {
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
      flex-direction: row-reverse;
      > form {
        .worlds {
          width: px2rem(600);
          height: vertical(560);
          float: left;
          @include fj(space-between);
          flex-direction: column;
          padding: 0;
          margin: 0;
          position: relative;
          .word-line {
            position: absolute;
            left: px2rem(7);
            bottom: 0;
            width: px2rem(1);
            height: calc(100% - 17px);
            background-color: #999999;
          }
          li {
            width: px2rem(600);
            font-size: px2rem(22);
            line-height: 33px;
            @include fj(flex-start);
            align-items: center;
            .honor-spot {
              width: px2rem(15);
              height: px2rem(15);
              background-color: #c7ad8c;
              border-radius: 50%;
            }

            > .world {
              width: px2rem(500);
              margin-left: 1em;
              color: #ffffff;
              text-align: left;
              margin-top: 1px;
              border: 1px dotted #fff;
            }

            > .deleteword {
              cursor: pointer;
              padding-left: 1rem;
              color: #3aa7ff;

              > &:hover {
                color: #e00;
              }
            }

            > input {
              color: #000 !important;
            }

            > img {
              width: px2rem(20);
              height: px2rem(16);
            }
          }
        }
      }

      .picture {
        width: transverse(600);
        height: px2rem(450);
        float: left;
        position: relative;
        @include fj(center);
        align-items: center;
        overflow: hidden;

        .left, .right {
          width: transverse(120);
          height: vertical(200);
          position: absolute;
          background-color: rgba(101, 101, 101, 0.26);
          @include fj(center);
          align-items: center;

          > img {
            width: px2rem(12);
            height: px2rem(32);
          }
        }

        .left {
          left: 0;
        }

        .right {
          right: 0;
        }

        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
