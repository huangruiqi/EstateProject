<template>
<div class="homepage" v-loading="this.$store.state.loading.loading">
    <div class="page" :style="{backgroundImage: 'url(' + imgBack + ')'}">
        <form action="" name="formBack" >
            <input type="file" name="file" id="imgGuideBack" style="display: none;">
        <!-- 　  <input type="button" value="修改背景图片" onclick="document.formBack.file.click()"> -->
            <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subWord.png"></div>
            <!-- <input type="button" value="提交"  @click='tiJiao' class="submit" > -->
            <div class="tijiao" id="gou1" @click='tiJiao' style="display:none"></div>
        </form>
        <div class="projectLogo" :style="{backgroundImage: 'url(' + projectLogo + ')'}">
            <form action="" name="formLogo" >
                <input type="file" name="file" id="imgprojectLogo" style="display: none;">
                <!-- <input type="button" value="修改项目logo" onclick="document.formLogo.file.click()">  -->
                <div id="gaiTwo" onclick="document.formLogo.file.click()" class="tijiao2"><img src="../../assets/img/subLogo.png"></div>
                <!-- <input type="button" value="提交"  @click="tijiaoTwo" class="submit"> -->
                <div class="tijiao" id="gou2" @click='tijiaoTwo' style="display:none"></div>

            </form>
        </div>
        <div class="bottomDiv">
            <div class="word" v-for="(m, a) in word">
                <input @change='fileChange(a)' type="file" name="modifyIcon" class="modifyIcon" style="display: none">
                <img @click='iconFile(a)' src='../../assets/img/modifyIcon.jpg'>
                <img :src="icon[a]" alt="">
                <div class="wordTitle">{{m}}</div>
            </div>
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
import getImage from '../../utils/getImage.js'
    export default {
        name: 'homepage',
        data() {
            return {
                "imgBack": "",
                "projectLogo": "",
                "word": ["项目介绍", "品牌概况", "户型展示", "楼盘周边"],
                "modifyIcon": require('../../assets/img/modifyIcon.jpg'),
                // "icon": [require('../../assets/img/icon1.png'),require('../../assets/img/icon2.png'),require('../../assets/img/icon3.png'),require('../../assets/img/icon4.png')],
                "icon": [],
                "head": 'http://192.168.43.127:80/'
            }
        },
        created() {
            //请求类型
            this.$axios.get("/basic/mainPage/get")
            .then(res => {
                res.data.data && res.data.data.backgroundImageLocation ? this.imgBack = getImage(res.data.data.backgroundImageLocation, 3) : "";
                    // const logoImgSplit = res.data.data.projectLogoLocation.split(/\_|\./g);
                    // this.projectLogo = this.head + logoImgSplit[0] + "_" + logoImgSplit[3] + "." + logoImgSplit[6];
                res.data.data && res.data.data.projectLogoLocation ? this.projectLogo = getImage(res.data.data.projectLogoLocation, 3) : "";
                res.data.data && res.data.data.projectIntroductionBar ? this.icon[0] = getImage(res.data.data.projectIntroductionBar, 3) : "";
                res.data.data && res.data.data.brandOverviewBar ? this.icon[1] = getImage(res.data.data.brandOverviewBar, 3) : "";
                res.data.data && res.data.data.unitDisplayBar ? this.icon[2] = getImage(res.data.data.unitDisplayBar, 3) : "";
                res.data.data && res.data.data.projectAroundBar ? this.icon[3] = getImage(res.data.data.projectAroundBar, 3) : "";
                
                // const backImgSplit = res.data.data.backgroundImageLocation.split(/\_|\./g);
                // this.imgBack = this.head + backImgSplit[0] + "_" + backImgSplit[3] + "." + backImgSplit[6];

                // this.addModule();
            })
            .catch(error => {
                this.$message.error('获取失败，请上传内容！');
            });
            
        
            
        },
        mounted() {
            //预览功能
            let inputOne = document.getElementById('imgGuideBack');
            let inputTwo = document.getElementById('imgprojectLogo');
            inputOne.onchange = () => {
                this.imgBack = getUrl(inputOne.files[0]);
            };
            inputTwo.onchange = () => {
                this.projectLogo = getUrl(inputTwo.files[0]);
            };
            // this.addModule();
            // this.allSubmit();
        },
        methods: {
            //点击修改改file
            iconFile(index) {
                // console.log(document.getElementsByClassName('modifyIcon')[0]);
                document.getElementsByClassName('modifyIcon')[index].click();
            },
            //file改变时预览
            fileChange(index) {
                this.$forceUpdate();
                this.icon[index] = getUrl(document.getElementsByClassName('modifyIcon')[index].files[0]);
            },
            tiJiao() {   
                let formdata = new FormData();
                    if (document.getElementById('imgGuideBack').files[0]) {
                        formdata.append('imageFile', document.getElementById('imgGuideBack').files[0]);
                        formdata.append('imageType', 1);
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'  
                            }
                        }
                        this.$axios.post('/basic/mainPage/update', formdata, config).then( (res) => {
                            this.$message({
                                message: '背景上传成功！',
                                type: 'success'
                            });
                            this.tijiaoTwo()
                        }).catch((error) =>{
                            this.$message.error('提交失败！');
                            this.tijiaoTwo();
                        });
                    } else {
                        this.tijiaoTwo();
                    }
            },
            tijiaoTwo() {   
                let formdata = new FormData();
                if (document.getElementById('imgprojectLogo').files[0]) {
                    formdata.append('imageFile', document.getElementById('imgprojectLogo').files[0]);
                    formdata.append('imageType', 2);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/basic/mainPage/update', formdata, config).then( (res) => {
                        this.$message({
                            message: 'LOGO上传成功！',
                            type: 'success'
                        });
                        this.subIcon();
                    }).catch((error) =>{
                        this.$message.error('LOGO提交失败！');
                        this.subIcon();
                    });
                } else {
                    this.subIcon();
                    // if (subIcon) {
                        // this.subIcon(1);
                    // }
                    // this.subIcon(2);
                    // this.subIcon(3);
                }
            },
            //提交iconlet subIndex = 0;
            subIcon() {
                const modifyIcon = document.getElementsByClassName('modifyIcon');
                if (modifyIcon[0].files[0])  {
                    let formdata = new FormData();
                    formdata.append('imageFile', modifyIcon[0].files[0]);
                    formdata.append('imageType', 3);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/basic/mainPage/update', formdata, config).then( (res) => {
                        this.$message({
                            message: this.word[0] + '上传成功！',
                            type: 'success'
                        });
                        this.subIcon1();
                    }).catch((error) =>{
                        this.$message.error(this.word[0] + '提交失败！');
                        this.subIcon1();
                    });
                } else {
                    this.subIcon1();
                }
            },
            subIcon1() {
                const modifyIcon = document.getElementsByClassName('modifyIcon');
                if (modifyIcon[1].files[0])  {
                    let formdata = new FormData();
                    formdata.append('imageFile', modifyIcon[1].files[0]);
                    formdata.append('imageType', 4);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/basic/mainPage/update', formdata, config).then( (res) => {
                        this.$message({
                            message: this.word[1] + '上传成功！',
                            type: 'success'
                        });
                        this.subIcon2();
                    }).catch((error) =>{
                        this.$message.error(this.word[1] + '提交失败！');
                        this.subIcon2();
                    });
                } else {
                    this.subIcon2();
                }
            },
            subIcon2() {
                const modifyIcon = document.getElementsByClassName('modifyIcon');
                if (modifyIcon[2].files[0])  {
                    let formdata = new FormData();
                    formdata.append('imageFile', modifyIcon[2].files[0]);
                    formdata.append('imageType', 5);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/basic/mainPage/update', formdata, config).then( (res) => {
                        this.$message({
                            message: this.word[2] + '上传成功！',
                            type: 'success'
                        });
                        this.subIcon3();
                    }).catch((error) =>{
                        this.$message.error(this.word[2] + '提交失败！');
                        this.subIcon3();
                    });
                } else {
                    this.subIcon3();
                }
            },
            subIcon3() {
                const modifyIcon = document.getElementsByClassName('modifyIcon');
                if (modifyIcon[3].files[0])  {
                    let formdata = new FormData();
                    formdata.append('imageFile', modifyIcon[3].files[0]);
                    formdata.append('imageType', 6);
                    let config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
                    this.$axios.post('/basic/mainPage/update', formdata, config).then( (res) => {
                        this.$message({
                            message: this.word[3] + '上传成功！',
                            type: 'success'
                        });

                    }).catch((error) =>{
                        this.$message.error(this.word[3] + '提交失败！');
                    });
                }
            },
            allSub() {
                // const modifyIcon = getElementsByClassName('modifyIcon');
                // if (document.getElementById('imgGuideBack').files[0]) {
                //     this.tiJiao();
                // } else if (document.getElementById('imgprojectLogo').files[0]) {
                //     this.tijiaoTwo();
                // }
                this.tiJiao();
            }
            //全部提交
            // allSubmit() {
            //     $('.allSub').click(() => {
            //         let length = $('.submit').length;
            //         for (let i = 0; i < 2; i++) {
            //             document.getElementsByClassName('submit')[i].click();
            //         }
            //     });
            // }
        }
    }
</script>

<style lang="scss">
@import "../../styles/main.scss";
@import "../../styles/mixin.scss";
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
    align-items: flex-start;
    background-color: #edf0f5;
    .page {
        width: px2rem(1454);
        height: px2rem(818);
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: px2rem(20);
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
            margin-top: 0;
            margin-left: 0;
            cursor: pointer;
        }
        .tijiao2 {
            float: left;
            margin-top: px2rem(-30);
            margin-left: px2rem(-80);
            cursor: pointer;
        }
        .projectLogo {
            width: transverse(357);
            height: vertical(246);
            margin: 10% auto;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .bottomDiv {
            width: transverse(1409);
            height: px2rem(scalePx(210));
            margin: 15% auto;
            @include fj();
            cursor: pointer;
            .word {
                width: px2rem(scalePx(158));
                height: 100%;
                @include fj();
                flex-direction: column;
                align-items: center;
                img:first-of-type {
                    width: 100%;
                    // height: px2rem(scalePx(94));
                }
                img:last-of-type {
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
</style>
