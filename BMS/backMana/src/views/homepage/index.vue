<template>
<div class="homepage">
    <div class="page" :style="{backgroundImage: 'url(' + imgBack + ')'}">
        <form action="" name="formBack" >
            <input type="file" name="file" id="imgGuideBack" style="display: none;">
        <!-- 　  <input type="button" value="修改背景图片" onclick="document.formBack.file.click()"> -->
            <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subWord.png"></div>
            <!-- <input type="button" value="提交"  @click='tiJiao' class="submit" > -->
            <div class="tijiao" id="gou1" @click='tiJiao'></div>
        </form>
        <div class="projectLogo" :style="{backgroundImage: 'url(' + projectLogo + ')'}">
            <form action="" name="formLogo" >
                <input type="file" name="file" id="imgprojectLogo" style="display: none;">
                <!-- <input type="button" value="修改项目logo" onclick="document.formLogo.file.click()">  -->
                <div id="gaiTwo" onclick="document.formLogo.file.click()" class="tijiao"><img src="../../assets/img/subLogo.png"></div>
                <!-- <input type="button" value="提交"  @click="tijiaoTwo" class="submit"> -->
                <div class="tijiao" id="gou2" @click='tijiaoTwo'></div>

            </form>
        </div>
        <div class="bottomDiv">
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
    export default {
        name: 'homepage',
        data() {
            return {
                "imgBack": "",
                "projectLogo": "",
                "word": [],
                "icon": [require('../../assets/img/icon1.png'),require('../../assets/img/icon2.png'),require('../../assets/img/icon3.png'),require('../../assets/img/icon4.png')]
            }
        },
        created() {
            //请求类型
            this.$axios.get("/mainpage")
            .then(res => {
            this.imgBack = res.data.data.backgroundImage.fileName;
            this.projectLogo = res.data.data.projectImage.fileName;
            })
            .catch(error => {
            console.log(error);
            });
            //请求模块
            this.$axios.get("/module/main", {params:{'select':'true'}})
            .then(res => {
                this.word = res.data.data;
            })
            .catch(error => {
            console.log(error);
            });
            
        },
        mounted() {
            let inputOne = document.getElementById('imgGuideBack');
            let inputTwo = document.getElementById('imgprojectLogo');
            inputOne.onchange = () => {
                this.imgBack = getUrl(inputOne.files[0]);
            };
            inputTwo.onchange = () => {
                this.projectLogo = getUrl(inputTwo.files[0]);
            };
            // this.allSubmit();
        },
        methods: {
            addModule() {
                let addContent = "";
                let a = 0;
                if(this.word) {
                    for (let m of this.word) {
                        addContent += '<div class="word"><img src="' + this.icon[a] + '" alt=""><div class="wordTitle">' + m.description + '</div></div>';
                        a++;
                    }
                    document.getElementsByClassName('bottomDiv')[0].innerHTML = addContent;
                }
            },
            tiJiao() {   
                let formdata = new FormData();
                // if ($('#imgGuideBack')) {
                //    alert(document.getElementById('imgGuideBack').files[0]);
                    formdata.append('file', document.getElementById('imgGuideBack').files[0]);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/mainpage/background', formdata, config).then( (res) => {alert("提交成功！");this.$router.go(0);
                    }).catch((error) =>{
                    });
                return false; 
            },
            tijiaoTwo() {   
                let formdata = new FormData();
                    formdata.append('file', document.getElementById('imgprojectLogo').files[0]);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/mainpage/project', formdata, config).then( (res) => {alert("修改成功");this.$router.go(0);
                    }).catch((error) =>{
                    });
                return false; 
            },
            //全部提交
            // allSubmit() {
            //     $('.allSub').click(() => {
            //         let length = $('.submit').length;
            //         for (let i = 0; i < 2; i++) {
            //             document.getElementsByClassName('submit')[i].click();
            //         }
            //     });
            // }
        },
        watch : {
            word() {
                this.addModule();
            }
        }
    }
</script>

<style lang="scss">
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
.homepage {
    width: 100%;
    height: px2rem(930);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #edf0f5;
    .page {
        width: px2rem(1454);
        height: px2rem(818);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        #gai,#gaiTwo {
            width: px2rem(103);
            height: px2rem(34);
            img {
                width: 100%;
                height: 100%;
            }
        }
        #gaiTwo {
            width: px2rem(116)
        }
        #gou1,#gou2 {
            width: px2rem(34);
            height: px2rem(34);
            background-image: url('../../assets/img/clickQian.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            }
        #gou1:active,#gou2:active {
            background-image: url('../../assets/img/clickHou.png');
        }
        .tijiao {
            float: left;
            margin-top: px2rem(4);
            margin-left: px2rem(4);
            cursor: pointer;
        }
        .projectLogo {
            width: transverse(601);
            height: vertical(437);
            margin: 10% auto;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .bottomDiv {
            width: transverse(1064);
            height: px2rem(scalePx(181));
            margin: -30px auto;
            @include fj();
            cursor: pointer;
            .word {
                width: px2rem(scalePx(158));
                height: 100%;
                @include fj();
                flex-direction: column;
                align-items: center;
                img {
                    width: px2rem(scalePx(92));
                    height: px2rem(scalePx(94));
                }
                .wordTitle {
                    width: px2rem(scalePx(158));
                    height: px2rem(scalePx(39));
                    @include sc(px2rem(scalePx(39)));
                }
            }
        }
    }

}
   
</style>
