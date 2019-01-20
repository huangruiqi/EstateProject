<template>
<div class="around" v-loading="this.$store.state.loading.loading">
  <div class="page" :style="{backgroundImage: 'url(' + imgBack + ')'}">
        <form action="" name="formBack" >
            <input type="file" name="file" id="imgGuideBack" style="display: none;">
            <!-- <input type="button" value="修改地图" onclick="document.formBack.file.click()"> -->
            <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subWord.png"></div>
            <div class="tijiao" id="gou1" @click='tiJiao' style="display:none"></div>
            <!-- <input type="button" value="提交"  @click='tiJiao' class="submit" > -->
        </form>
        <div class="allSub" id="allSub" @click="allSub"></div>
  </div>
</div>  
</template>
<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
import {checkChange} from '../../utils/urlGet.js'
import {modify} from '../../utils/urlGet.js'
import {modifyCome} from '../../utils/urlGet.js'
import ip from '../../../static/ip'
export default {
    data() {
        return {
            imgBack: "",
            head: ip + ':8080/static/image/',
        }
    },
    created() {
        this.$axios.post("/surround/surroundingFacilities/get")
            .then(res => {
                res.data.data && res.data.data.imageLocation ? this.imgBack = this.getImage(res.data.data.imageLocation, 1) : "";
            })
            .catch(error => {
                this.$message.error('获取失败,请上传内容！');
        });
    },
    mounted() {
        let inputOne = document.getElementById('imgGuideBack');
        inputOne.onchange = () => {
            this.imgBack = getUrl(inputOne.files[0]);
        };
    },
    methods: {
        //切图片地址
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
            if (document.getElementById('imgGuideBack').files[0]) {
                formdata.append('imageFile', document.getElementById('imgGuideBack').files[0]);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  
                    }
                }
                this.$axios.post('/surround/surroundingFacilities/update', formdata, config).then( (res) => {
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                }).catch((error) =>{
                    this.$message.error('上传失败！');
                });
            }
      },
      allSub() {
          this.tiJiao();
      }
    },
    components: {

    }
}
</script>

<style scoped lang="scss">
@import '../../styles/main.scss';
@import '../../styles/mixin.scss';
.around {
    width: 100%;
    height: px2rem(900);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #EDF0F5;
    .page {
        width: px2rem(1400);
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
