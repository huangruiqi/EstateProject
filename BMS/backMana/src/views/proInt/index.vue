<template>
    <div class="projectPage">
        <div class="page" :style="{backgroundImage: 'url(' + imgProjectBack + ')'}">
            
            <div class="introduce">
                <div class="title">项目介绍</div>
                <div class="content" :style="{display: appearCome}">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{projectWord}}
                </div>
                <form action=""  :style="{display: appear}" class="text">
                    <textarea></textarea>
                    <!-- <input type="button" value="提交" class="submit" @click="tijiaoTwo"> -->
                    <div class="submit" id="gou2" @click='tijiaoTwo'></div>
                </form>
            </div>
            <form action="" name="formBack" id="form">
                <input type="file" name="file" id="imgGuideBack" style="display: none;">
            <!-- 　  <input type="button" value="修改背景图片" onclick="document.formBack.file.click()"> <br> -->
                <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subShapan.png"></div>
                <!-- <input type="button" value="提交" @click='tiJiao' class="submit" > -->
                <div class="tijiao" id="gou1" @click='tiJiao'></div>
            </form>
            <!-- <input type="button" value="全部提交" class="allSub" disabled="disabled"> -->
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
import {checkChange} from '../../utils/urlGet.js'
import {modify} from '../../utils/urlGet.js'
import {modifyCome} from '../../utils/urlGet.js'
import qs from "qs";

export default {
    data() {
        return {
            imgProjectBack: "",
            projectWord: "",
            "appear": "none",
            "appearCome": "block"
        }
    },
    created() {
        //请求公园类型
        this.$axios.get("/project")
        .then((res) => {
            this.imgProjectBack = res.data.data.image.fileName;
            this.projectWord = res.data.data.introduction;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    mounted() {
        let inputTwo = document.getElementById('imgGuideBack');
            inputTwo.onchange = () => {
                this.imgProjectBack = getUrl(inputTwo.files[0]);
            };
        this.modifyWord();
        this.allSubmit();
    },
    methods: {
        tiJiao() {   
            let formdata = new FormData();
            // if ($('#imgGuideBack')) {
                // alert(666);
                formdata.append('file', document.getElementById('imgGuideBack').files[0]);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  
                    }
                }
                this.$axios.post('/project/image', formdata, config).then( (res) => {alert("提交成功！");
                // this.$router.push('/proInt/index');
                this.$router.go(0);
                }).catch((error) =>{
                });
            // }
            // this.$router.push('/guidePage/index');
            return false; 
        },
        tijiaoTwo() {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            }
            this.$axios.post('/project/text',qs.stringify({
                introduction: $('textarea').val(),
            }) , config).then( (res) => {alert("修改成功");this.$router.go(0);
            }).catch((error) =>{
                alert(error);
            });
            return false; 
        },
        //全部提交
        allSubmit() {
            $('.allSub').click(() => {
            // let length = $('input:submit').length;
                for (let i = 0; i < 2; i++) {
                    $('.submit').eq(i).click();
                    // window.location.href = 'http://localhost:8080/proInt/index';
                }
            });
        // document.getElementsByClassName('.allSub')[0].onclick = () => {
        //   // let length = $('input:submit').length;
        //   // console.log(length);
        // }
        },
        //修改引导页文字
        modifyWord() {
            let spanWord = document.getElementsByClassName('content')[0];
            let modifyInput = document.getElementsByTagName('textarea')[0];
            let page = document.getElementsByClassName('page')[0];
            // for (let i = 0; i < spanWord.length; i++) {
                spanWord.onclick = () => {
                    this.appearCome = 'none';
                    this.appear = 'block';
                    // for (let j = 0; j < spanWord.length; j++) {
                        modifyInput.value = this.projectWord;
                    // }
                };
                page.onclick = (ev) => {
                    if(ev.target != page) return;
                    else {
                        this.appear = 'none';
                        this.appearCome = 'block';
                        // for (let j = 0; j < spanWord.length; j++) {
                            this.projectWord = modifyInput.value;
                        // }
                    }
                }
            // }
        }
    }

}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/mixin";
.allSub {
  cursor:not-allowed;
}
.allSub {
  position: absolute;
  top: px2rem(900);
  left: px2rem(1700);
}
.projectPage {
    width: 100%;
    height: px2rem(930);
    display: flex;
    justify-content: center;
    align-items: center;
    .page {
        width: px2rem(1500);
        height: px2rem(scale(1500));
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        #gai {
            width: px2rem(103);
            height: px2rem(34);
            img {
                width: 100%;
                height: 100%;
            }
        }
        #gou1,#gou2 {
            width: px2rem(34);
            height: px2rem(34);
            background-image: url('../../assets/img/clickQian.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
            cursor: pointer;
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
        #form {
            z-index: 100;
            position: absolute;
            left: 0;
        }
        .introduce {
            width: px2rem(scale(388));
            height: px2rem(scale(724));
            background-color: black;
            float: left;
            margin-left: px2rem(scale(90));
            opacity: 0.8;
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: -1;
            .title {
                width: 100%;
                height: px2rem(scale(63));
                background-color: $colorAll;
                margin-top: px2rem(scale(90));
                @include sc(px2rem(scale(36)), black);
                @include fj(center);
                align-items: center;
            }
            .content {
                width: px2rem(scale(249));
                height: px2rem(scale(430));
                margin: px2rem(scale(71)) auto;
                @include sc(px2rem(scale(20)), white);
                line-height: px2rem(scale(32));
                border: px2rem(1) dashed white;
                // overflow: hidden;
            }
            textarea {
                width: px2rem(scale(249));
                height: px2rem(scale(371));
                margin: px2rem(scale(71));
                @include sc(px2rem(scale(20)), black);
                line-height: px2rem(scale(32));
            }
        }
    }
}
</style>
