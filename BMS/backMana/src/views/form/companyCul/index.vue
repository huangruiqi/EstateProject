<template>
  <div class="honorAll">
    <div class="honorbox" v-loading="bgcLoading" element-loading-text="背景图片上传中">
      <div id="honor">
        <button class="allSubmit" type="button" @click="submitForm" value="全部提交">
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
            <div class="contentTop" v-loading="cultureLoading" element-loading-text="文化图片上传中">
              <label class="change changephoto" for="upfile">
                <img class="imgstyle" src="../../../assets/img/brandBGC/change.png" alt="">
              </label>
              <input type='file' name='photos' id="upfile" style="position: absolute;clip:rect(0 0 0 0);">
              <img :src="cultureImage" alt="">
            </div>
            <div class="contentBottom">
              <button class="change changeword" type="button" value="" @click="addWorld">
                <img class="imgstyle" src="../../../assets/img/brandBGC/addculture.png" alt="">
              </button>
              <div>
                <form class="Intro">
                  <div class="worldIntro" v-for="(item, index) in cultureText" v-if="index<4 || cultureText" :key="index">
                    <div class="word-logo">
                      <img :src="item.image" alt="">
                    </div>
                    <div class="word-all">
                      <div class="titleFather">
                        <p v-if="item.title !== null" class="title" @click="changeTitle(index)"
                           :class="[{hide: item.titleB}]">{{ item.title }}</p>

                        <textarea v-if="item.title !== null" class="title" type="text" autofocus @blur="changeBack(index)"
                               :value="item.title" :class="[{hide: !item.titleB}]">
                        </textarea>
                      </div>
                      <div class="content1Father">
                        <p class="content1" v-if="item.content !== null" @click="changeContent(index)"
                           :class="[{hide: item.contentB}]">{{ item.content }}</p>

                        <textarea class="content1" v-if="item.content !== null" type="text" autofocus
                               @blur="changeContentBack(index)" :value="item.content"
                               :class="[{hide: !item.contentB}]">
                        </textarea>

                      </div>
                    </div>

                    <ul class="deleteT">
                      <li v-if="index<4" >
                        <span class="delete" @click="deleteWorld(index)">X</span>
                      </li>
                    </ul>
                  </div>
                  <input type="submit" id="submit2" style="display: none">
                </form>
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
        titleAuto: false,
        world: [],
        worldNum: 0,
        contentAuto: false,
        backgroundImage: '',
        cultureImage: '',
        cultureText: [],
        listen: [],
        head: ip + ':8080/static/image/',
        bgcLoading: false,
        cultureLoading: false,
        logo: [require('@/assets/img/dingwei.png'), require('@/assets/img/tuoguan.png'), require('@/assets/img/zerenxin.png'), require('@/assets/img/zuanshi.png')],
      }
    },
    created() {
      this.getData()
    },
    mounted() {
      var cultureImage = document.getElementById('upfile')
      cultureImage.onchange = () => {
        if (cultureImage.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else {
          var oFile = this.getUrl(cultureImage.files[0])
          this.cultureImage = oFile
        }
      }
      var backgroundImage = document.getElementById('bFile')
      backgroundImage.onchange = () => {
        if (backgroundImage.files[0].size > 10485760) {
          this.$message({
            message: '图片不能大于10M',
            type: 'warning'
          })
        } else {
          var img = this.getUrl(backgroundImage.files[0])
          this.backgroundImage = img
        }
      }
    },
    methods: {
      getData() {
        this.$axios.get('/brand/enterpriseCulture/image/get')
          .then(res => {
            if (res.data.data) {
              this.backgroundImage = this.getImage(res.data.data.backgroundImageLocation, 2)
              this.cultureImage = this.getImage(res.data.data.mainImageLocation, 2)
            }
          })
        this.$axios.get('/brand/enterpriseCulture/get')
          .then(res => {
            if (res.data.data) {
              this.cultureText = res.data.data
              this.listen = JSON.parse(JSON.stringify(res.data.data))
              this.worldNum = res.data.data.length
              this.cultureText.map((item, index) => {
                item.image = this.logo[index]
                item.contentB = false
                item.titleB = false
              })
            }
          })
          .catch(error => {
            console.log(error)
          })
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
        let title1 = document.getElementsByClassName('title')
        for (let i = 0; i < title1.length; i++) {
          if (i === index) {
            title1[2 * index].style.display = 'none'
            title1[2 * index + 1].style.display = 'flex'
          }
        }
        this.cultureText[index].titleB = !this.cultureText[index].titleB
      },
      changeBack(index) {
        let title1 = document.getElementsByClassName('title')
        for (let i = 0; i < title1.length; i++) {
          if (i === index) {
            title1[2 * index].style.display = 'flex'
            title1[2 * index + 1].style.display = 'none'
          }
        }
        this.cultureText[index].title = title1[2 * index + 1].value
        this.cultureText[index].titleB = !this.cultureText[index].titleB
      },
      changeContent(index) {
        let content1 = document.getElementsByClassName('content1')
        for (let i = 0; i < content1.length; i++) {
          if (i === index) {
            content1[2 * index].style.display = 'none'
            content1[2 * index + 1].style.display = 'flex'
          }
        }
        this.cultureText[index].contentB = !this.cultureText[index].contentB
      },
      changeContentBack(index) {
        let content1 = document.getElementsByClassName('content1')
        for (let i = 0; i < content1.length; i++) {
          if (i === index) {
            content1[2 * index].style.display = 'flex'
            content1[2 * index + 1].style.display = 'none'
          }
        }
        this.cultureText[index].content = content1[2 * index + 1].value
        this.cultureText[index].contentB = !this.cultureText[index].contentB
      },
      addWorld() {
        if (this.cultureText.length < 4) {
          this.cultureText.push({
            'id': 0,
            'title': '请编辑文字',
            'content': '请编辑文字'
          })
        } else {
          this.$message({
            'message': '达到上限',
            'type': 'warning'
          })
        }
        // this.$set(this.title, this.title.length, setWorld)
        // this.$set(this.content, this.title.length, setWorld)
      },
      deleteWorld(index) {
        if (this.cultureText[index].id) {
          let result = confirm('确定要删除?')
          if (result) {
            this.$axios({
              method: 'DELETE',
              url: '/brand/enterpriseCulture/delete',
              params: {
                cultureInfoId: this.cultureText[index].id
              },
              data: {}
            }).then(res => {
              if (res.status === 200) {
                this.cultureText.splice(index, 1)
                this.worldNum = this.worldNum - 1
                this.$message({
                  message: '删除成功',
                  type: 'success'
                })
              }
            })
          }
        } else {
          this.cultureText.splice(index, 1)
        }
      },
      submitForm() {
        // let fd = new FormData()
        // var iconStyle = document.getElementsByClassName('allSubmit')[0]
        // iconStyle.firstChild.style.color = '#3aa7ff'
        // iconStyle.firstChild.style.backgroundColor = '#edf0f5'
        let submit2 = document.getElementById('submit2')
        var bgc = document.getElementById('bFile').files[0]
        var culture = document.getElementById('upfile').files[0]
        for (let i = 0; i < submit2.length; i++) {
          submit2[i].submit()
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        // 文字添加、修改
        for (let i = 0; i < this.cultureText.length; i++) {
          if (this.cultureText[i].id === 0) {
            this.$axios({
              method: 'POST',
              url: '/brand/enterpriseCulture/add/',
              data: this.cultureText[i],
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
                  this.cultureText[i].id = res.data.data.id
                  this.listen[i] = res.data.data
                }
              })
          } else if (this.cultureText[i].title !== this.listen[i].title || this.cultureText[i].content !== this.listen[i].content) {
            this.$axios({
              method: 'POST',
              url: '/brand/enterpriseCulture/update/',
              data: this.cultureText[i],
              headers: {
                'Content-Type': 'application/json; charset=utf-8'
              }
            })
              .then(res => {
                if (res.status === 200) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                }
              })
          }
        }
        // 上传背景图
        if (bgc) {
          let fd = new FormData()
          fd.append('imageFile', bgc)
          fd.append('isBack', 'yes')
          this.bgcLoading = true
          this.$axios.post('/brand/enterpriseCulture/image/update/', fd, config)
            .then(res => {
              this.$message({
                message: '背景图修改成功',
                type: 'success'
              })
              document.getElementById('upfile').value = ''
              this.bgcLoading = false
            }).catch(res => {
              console.log(res)
            })
        }
        if (culture) {
          let fd = new FormData()
          fd.append('imageFile', culture)
          fd.append('isBack', 'no')
          this.cultureLoading = true
          this.$axios.post('/brand/enterpriseCulture/image/update/', fd, config)
            .then(res => {
              this.$message({
                message: '文化图片修改成功',
                type: 'success'
              })
              document.getElementById('upfile').value = null
              this.cultureLoading = false
            }).catch(res => {
              console.log(res)
            })
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
  }

  .changeword {
    bottom: 0;
    right: 0;
    border: 0;
    padding: 0;
  }

  .allSubmit {
    position: absolute;
    z-index: 99;
    right: 0;
    bottom: 0;
    color: #54b3ff;
    background-color: #d3ecfd;
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

    > img {
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
          height: 50%;
          @include fj();

          > img {
            width: 100%;
            height: 100%;
          }
        }

        .contentBottom {
          width: 100%;
          height: 40%;
          position: relative;
          @include fj(center);
          align-items: flex-end;

          > div {
            width: 100%;
            height: 100%;
            @include fj(center);

            .line {
              width: 100%;
              height: 0;
              position: absolute;
              top: px2rem(88);
              border: 1px solid #ffdaaa;
            }

            .deleteT {
              position: absolute;
              right: px2rem(-22);
            }

            .dotted {
              width: 100%;
              position: absolute;
              top: px2rem(63);
              @include fj(space-around);

              > li {
                width: px2rem(22);
                height: px2rem(22);
                border-radius: 50%;
                background-color: #ffdaaa;
                float: left;
              }
            }

            .Intro {
              width: 80%;
              height: 100%;
              margin-top: 1rem;
              margin-left: -5%;

              .worldIntro {
                width: 45%;
                height: 50%;
                float: left;
                @include fj(space-between);
                position: relative;
                margin-left: 5%;
                >div {
                  width: 50%;
                }
                .word-logo {
                  width: px2rem(64);
                  height: px2rem(64);
                  float: left;
                  img {
                    width: 100%;
                    height: 100%;
                    float: right;
                  }
                }
                .word-all {
                  float: left;
                  width: calc(100% - 3rem);
                  margin-left: 1rem;
                  height: 100%;
                  overflow: hidden;
                  .titleFather {
                    width: 100%;
                    height: auto;
                    > p.title {
                      width: 100%;
                      font-size: px2rem(28);
                      word-wrap: break-word;
                      color: #ffdaaa;
                      margin: 0;
                      border: 1px dotted #fff;
                      letter-spacing: .2em;
                    }
                  }

                  .content1Father {
                    width: 100%;
                    height: auto;
                    > p.content1 {
                      margin: 0;
                      font-size: px2rem(22);
                      word-wrap: break-word;
                      border: 1px dotted #fff;
                      color: #ffffff;
                      letter-spacing: .1em;
                    }
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
