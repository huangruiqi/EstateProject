<template>
  <div class="boxAll">
    <div class="developAll" v-loading="bgcLoading" element-loading-text="背景图片上传中">
      <div id="develop">
        <button class="allSubmit" type="button" @click="submitForm" value="全部提交">
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
              <label class="change changephoto" for="upfile">
                <img class="imgstyle" src="../../../assets/img/brandBGC/change.png" alt="">
              </label>
              <input type='file' name='photos' id="upfile" style="position: absolute;clip:rect(0 0 0 0);">
              <div v-loading="image.loading" element-loading-text="荣耀图片上传中" v-for="(image, index) in content" class="hide" :key="index"
                   style="float: left" :class="[{show: index==number}]">
                <img v-if="image.image" :src="image.image" alt="">
              </div>
            </div>
            <div class="worldIntro">
              <div>
                <div class="worldIntroTop">
                  <div class="world hide" v-for="(item, index) in content" :key="index"
                       :class="[{show: index==number}]">
                    <div>
                      <div class="title" @click="changeTitle(index)" :class="[{hide1: titleAuto}]">
                        {{ item.step }}
                      </div>
                      <input class="title" style="float: left" type="text" autofocus @blur="changeTitle(index)"
                             :value="item.step" :class="[{hide1: !titleAuto}]">
                      <input class="title" style="width: 50%;float: left;display: none;" type="text" autofocus
                             @blur="changeTitle(index)"
                             :value="item.step" :class="[{hide1: !titleAuto}]">
                      <div class="head" @click="changeHead(index)" :class="[{hide1: headAuto}]">
                        {{ item.developTitle }}
                      </div>
                      <input class="head" type="text" autofocus @blur="changeHead(index)" :value="item.developTitle"
                             :class="[{hide1: !headAuto}]">
                    </div>
                    <div>
                      <p class="content2" @click="changeContent(index)" :class="[{hide1: contentAuto}]">
                        {{ item.enterpriseDevelopInfo}}
                      </p>
                      <textarea style="color: #000;" type="text" class="content2" autofocus @blur="changeContent(index)"
                                :value="item.enterpriseDevelopInfo" :class="[{hide1: !contentAuto}]">
                      </textarea>
                    </div>
                  </div>
                </div>
                <ul class="worldIntroBottom">
                  <li v-for="(Image,index) in content" :key="index" :class="[{changeStyle: index == number}]"
                      @click="changeAll(index)">
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button class="change changeAdd" type="button" value="增加页面" @click="addpage">
            <img class="imgstyle" src="../../../assets/img/brandBGC/addpage.png" alt="">
          </button>
          <button class="change changeDelete" type="button" value="删除页面" @click="deletepage">
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
  import ip from '../../../../static/ip'
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
        listen: [],
        changeImageNum: 0,
        button: true,
        titleAuto: false,
        headAuto: false,
        contentAuto: false,
        id: 0,
        head: ip + ':8080/static/image/',
        bgcLoading: false
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      var developImg = document.getElementById('upfile')
      developImg.onchange = () => {
        if (developImg.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else {
          var imageInfo = JSON.parse(JSON.stringify(this.content[this.number]))
          imageInfo.image = developImg.files[0]
          this.changeImage.push(imageInfo)
          var oDevelopImage = this.getUrl(developImg.files[0])
          this.$forceUpdate()
          this.$set(this.content[this.number], 'image', oDevelopImage)
          this.$set(this.content[this.number], 'loading', false)
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
          this.background = img
        }
      }
    },
    methods: {
      getData() {
        this.$axios.get('/brand/enterpriseDevelop/get')
          .then(res => {
            if (res.data.data) {
              this.content = res.data.data
              for (let i = 0; i < this.content.length; i++) {
                if (this.content[i].enterpriseDevelopImageLocation !== null) {
                  this.content[i].image = this.getImage(this.content[i].enterpriseDevelopImageLocation, 2)
                } else {
                  this.content[i].image = ''
                }
              }
              this.listen = JSON.parse(JSON.stringify(this.content))
            }
          })
          .catch(error => {
            console.log(error)
          })
        this.$axios.get('/brand/enterpriseDevelop/backgroundImage/get')
          .then(res => {
            if (res.data.data) {
              this.background = this.getImage(res.data.data.imageLocation, 2)
            }
          })
      },
      clickBack: function() {
        this.$router.push({ path: '/index' })
      },
      changeAll(index) {
        this.number = index
        this.titleAuto = this.headAuto = this.contentAuto = false
      },
      addpage() {
        var defaultContent = {
          'developTitle': '默认标题',
          'enterpriseDevelopInfo': '默认内容',
          'step': '时间自定义'
        }
        this.$axios({
          method: 'post',
          url: '/brand/enterpriseDevelop/text/update',
          data: defaultContent
        }).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.content.push(res.data.data)
            this.listen.push(res.data.data)
          }
        })
      },
      deletepage() {
        var result = confirm('确定要删除?')
        if (result) {
          this.$axios({
            method: 'delete',
            url: '/brand/enterpriseDevelop/delete',
            params: {
              developInfoId: this.content[this.number].id
            },
            data: {}
          }).then(res => {
            if (res.status === 200) {
              this.getData()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.number = 0
            } else {
              console.log(res)
            }
          })
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
      changeTitle(index) {
        this.titleAuto = !this.titleAuto
        var title1 = document.getElementsByClassName('title')
        this.content[index].step = title1[3 * index + 1].value
      },
      changeHead(index) {
        this.headAuto = !this.headAuto
        var head1 = document.getElementsByClassName('head')
        this.content[index].developTitle = head1[2 * index + 1].value
      },
      changeContent(index) {
        this.contentAuto = !this.contentAuto
        var content1 = document.getElementsByClassName('content2')
        this.content[index].enterpriseDevelopInfo = content1[2 * index + 1].value
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
        // 提交背景图
        if (bgc) {
          var upbgc = new FormData()
          this.bgcLoading = true
          upbgc.append('imageFile', bgc)
          this.$axios.post('/brand/enterpriseDevelop/backgroundImage/update', upbgc, config)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  message: '背景图上传成功',
                  type: 'success'
                })
                bgc = null
                this.bgcLoading = false
              }
            })
        }
        for (let i = 0; i < this.content.length; i++) {
          // 上传文字
          if (this.content[i].step !== this.listen[i].step || this.content[i].developTitle !== this.listen[i].developTitle || this.content[i].enterpriseDevelopInfo !== this.listen[i].enterpriseDevelopInfo) {
            this.$axios({
              method: 'post',
              url: '/brand/enterpriseDevelop/text/update',
              data: this.content[i]
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '历程信息上传成功',
                    type: 'success'
                  })
                  this.listen = JSON.parse(JSON.stringify(this.content))
                }
              })
          }
          // 上传图片
          for (let j = 0; j < this.changeImage.length; j++) {
            var fd = new FormData()
            fd.append('imageFile', this.changeImage[j].image)
            fd.append('infoId', this.changeImage[j].id)
            if (this.content[i].id === this.changeImage[j].id) {
              this.number = i
              this.content[i].loading = true
              this.$axios.post('/brand/enterpriseDevelop/image/update', fd, config)
                .then(res => {
                  if (res.status === 200) {
                    this.$message({
                      message: '历程图片上传成功',
                      type: 'success'
                    })
                    this.changeImage = []
                    this.content[i].loading = false
                  }
                })
                .catch(res => {
                })
            }
          }
        }
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
    height: px2rem(scale(1450));
    @include fj(center);
    align-items: center;
  }

  .allSubmit {
    position: absolute;
    z-index: 99;
    right: 0;
    bottom: 0;
    color: #54b3ff;
    background-color: #d3ecfd;
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

  #develop {
    width: 100%;
    height: 80%;
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
      @include fj(center);
      align-items: center;

      .content1 {
        width: transverse(1250);
        height: vertical(850);
        position: relative;

        .pictureIntro {
          width: 100%;
          height: 100%;
          float: left;
          overflow: hidden;
          border: 1px dotted #fff;

          > div {
            width: 100%;
            height: 100%;

            > img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .worldIntro {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 40%;
          background-color: rgba(38, 38, 42, 0.78);

          div {
            width: 100%;
            height: 100%;
            float: left;
            .worldIntroTop {
              width: 100%;
              height: 70%;
              @include fj(center);
              align-items: center;
              .world {
                width: 90%;
                height: 100%;
                > div {
                  width: 50%;
                  height: 100%;
                  float: left;
                  @include fj(center);
                  align-items: center;
                  flex-direction: column;
                  .title {
                    display: inline-block;
                    width: 100%;
                    height: 30%;
                    color: #ffffff;
                    background-color: transparent;
                    font-size: px2rem(25);
                    border: 1px dotted #fff;
                  }

                  .head {
                    display: inline-block;
                    width: 100%;
                    height: 30%;
                    font-size: px2rem(25);
                    color: #e2e2e2;
                    background-color: transparent;
                    margin: 1rem 0;
                    border: 1px dotted #fff;
                  }
                  .content2 {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    margin-top: 1px;
                    line-height: px2rem(30);
                    font-size: px2rem(20);
                    @include fj(center);
                    align-items: flex-start;
                    color: #fffffe;
                    border: 1px dotted #fff;
                  }
                }


                > textarea {
                  color: #000 !important;
                }
              }
            }

            .worldIntroBottom {
              width: 100%;
              height: 20%;
              @include fj(center);
              align-items: flex-end;

              li {
                width: px2rem(15);
                height: px2rem(15);
                float: left;
                @include fj(center);
                align-items: center;
                background-color: #e2e2e2;
                border: solid 1px #c79f62;
                cursor: pointer;
                margin-left: px2rem(10);
              }

              .changeStyle {
                width: px2rem(30);
                border-radius: 5px;
                background-color: #e2e2e2;
              }
            }
          }
        }
      }
    }
  }
</style>
