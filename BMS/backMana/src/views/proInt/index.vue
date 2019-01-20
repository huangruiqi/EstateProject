<template>
    <div class="projectPage" v-loading="this.$store.state.loading.loading">
        <div class="page" :style="{backgroundImage: 'url(' + imgProjectBack + ')'}">
            
            <div class="introduce">
                <div class="title">项目介绍</div>
                <div class="content" :style="{display: appearCome}" @click="change">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{projectWord}}
                </div>
                <form action=""  :style="{display: appear}" class="text">
                    <textarea></textarea>
                    <!-- <input type="button" value="提交" class="submit" @click="tijiaoTwo"> -->
                    <div class="submit" id="gou2" @click='tijiaoTwo' style='display:none'></div>
                </form>
            </div>
            <form action="" name="formBack" id="form">
                <input type="file" name="file" id="imgGuideBack" style="display: none;">
            <!-- 　  <input type="button" value="修改背景图片" onclick="document.formBack.file.click()"> <br> -->
                <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subShapan.png"></div>
                <!-- <input type="button" value="提交" @click='tiJiao' class="submit" > -->
                <div class="tijiao" id="gou1" @click='tiJiao' style='display:none'></div>
            </form>
            <!-- <input type="button" value="全部提交" class="allSub" disabled="disabled"> -->
            <div class="allSub" id="allSub" @click="allSub"></div>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
import {checkChange} from '../../utils/urlGet.js'
import {modify} from '../../utils/urlGet.js'
import {modifyCome} from '../../utils/urlGet.js'
import qs from "qs";
import ip from '../../../static/ip'
export default {
    data() {
        return {
            imgProjectBack: "",
            projectWord: "",
            "appear": "none",
            "appearCome": "block",
            head: ip + ':8080/static/image/',
        }
    },
    created() {
        //请求公园类型
        this.$axios.get("/project/info/get")
        .then((res) => {
            res.data.data && res.data.data.backgroundImageLocation ? this.imgProjectBack = this.getImage(res.data.data.backgroundImageLocation, 2) : "";
            res.data.data && res.data.data.content ? this.projectWord = res.data.data.content : "";
        })
        .catch((error) => {
            this.$message.error('获取失败,请上传内容！');
        });
    },
    mounted() {
        let inputTwo = document.getElementById('imgGuideBack');
            inputTwo.onchange = () => {
                this.imgProjectBack = getUrl(inputTwo.files[0]);
            };
        this.modifyWord();
    },
    methods: {
        //切图片地址
        getImage(data, i) {
            const imgSplit = data.split(/\_|\./g);
            return this.head + imgSplit[0] + "_" + imgSplit[i] + "." + imgSplit[imgSplit.length - 1];
        },
        tiJiao() {   
            let formdata = new FormData();
            // if ($('#imgGuideBack')) {
                // alert(666);
            if(document.getElementById('imgGuideBack').files[0]) {
                formdata.append('imageFile', document.getElementById('imgGuideBack').files[0]);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  
                    }
                }
                this.$axios.post('/project/image/update', formdata, config).then( (res) => {
                    this.$message({
                        message: '背景上传成功！',
                        type: 'success'
                    });
                    this.tijiaoTwo();
                }).catch((error) =>{
                    this.$message.error('背景上传失败！');
                    this.tijiaoTwo();
                });                
            }
        },
        tijiaoTwo() {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            }
            if (this.appear == 'none') {
                this.$axios.post('/project/info/update',qs.stringify({
                    introductionContent: $('textarea').val(),
                }) , config).then( (res) => {
                    this.$message({
                        message: '文字上传成功！',
                        type: 'success'
                    });
                }).catch((error) =>{
                    this.$message.error('文字上传失败！');
                });
            }else {
                this.$message({
                    message: '请确定修改好的文字（点击旁侧）',
                    type: 'warning'
                });          
            }
        },
        //全部提交
        allSub() {
            if (document.getElementById('imgGuideBack').files[0]) {
                this.tiJiao();
            } else {
                this.tijiaoTwo();
            }
            
            // this.tijiaoTwo();      //注释是因为防止文字提交后提早把Loading编false      
        },
        //修改引导页文字
        modifyWord() {
            let spanWord = document.getElementsByClassName('content')[0];
            let modifyInput = document.getElementsByTagName('textarea')[0];
            let page = document.getElementsByClassName('page')[0];
                spanWord.onclick = () => {
                    this.appearCome = 'none';
                    this.appear = 'block';
                    modifyInput.value = this.projectWord;
                };
                page.onclick = (ev) => {
                    
                    if(ev.target != page) return;
                    else {
                        if (this.appear == 'block') {
                            this.appear = 'none';
                            this.appearCome = 'block';
                            this.projectWord = modifyInput.value;
                        }

                    }
                }
        },
        change() {
            let modifyInput = document.getElementsByTagName('textarea')[0];
            this.appearCome = 'none';
            this.appear = 'block';
            modifyInput.value = this.projectWord;
        }
    }

}
</script>

<style lang="scss">
@import "../../styles/main";
@import "../../styles/mixin";

.projectPage {
    width: 100%;
    height: px2rem(930);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #edf0f5;
    .page {
        width: px2rem(1500);
        height: px2rem(scale(1500));
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
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
            width: transverse(509);
            height: vertical(924);
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
                height: px2rem(90*930/1080);
                background-color: #c7ad8c;
                margin-top: px2rem(scale(134));
                @include sc(px2rem(40*930/1080), black);
                @include fj(center);
                align-items: center;
            }
            .content {
                width: px2rem(392*930/1080);
                height: px2rem(500*930/1080);
                margin: px2rem(57*930/1080) auto;
                @include sc(24*930/1080, white);
                line-height: px2rem(48*930/1080);
                letter-spacing: -1;
                border: px2rem(1) dashed white;
                // overflow: hidden;
            }
            textarea {
                width: px2rem(392*930/1080);
                height: px2rem(500*930/1080);
                margin: px2rem(57*930/1080) auto;
                @include sc(24*930/1080, black);
                line-height: px2rem(48*930/1080);
                letter-spacing: -1;
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
