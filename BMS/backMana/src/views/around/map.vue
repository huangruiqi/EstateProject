<template>
<div class="around">
  <div class="page" :style="{backgroundImage: 'url(' + imgBack + ')'}">
        <form action="" name="formBack" >
            <input type="file" name="file" id="imgGuideBack" style="display: none;">
            <!-- <input type="button" value="修改地图" onclick="document.formBack.file.click()"> -->
            <div class="tijiao" id="gai" onclick="document.formBack.file.click()"><img src="../../assets/img/subWord.png"></div>
            <div class="tijiao" id="gou1" @click='tiJiao'></div>
            <!-- <input type="button" value="提交"  @click='tiJiao' class="submit" > -->
        </form>
  </div>
</div>  
</template>
<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
import {checkChange} from '../../utils/urlGet.js'
import {modify} from '../../utils/urlGet.js'
import {modifyCome} from '../../utils/urlGet.js'
export default {
    data() {
        return {
            imgBack: ""
        }
    },
    created() {
        this.$axios.get("/landscape/images")
            .then(res => {
                // console.log(res.data.data.landscapeDto);
                this.imgBack = res.data.data.nearDto.url;
            })
            .catch(error => {
                console.log(error);
        });
    },
    mounted() {
      let inputOne = document.getElementById('imgGuideBack');
      inputOne.onchange = () => {
       this.imgBack = getUrl(inputOne.files[0]);
      };
    },
    methods: {
      tiJiao() {   
        let formdata = new FormData();
        formdata.append('file', document.getElementById('imgGuideBack').files[0]);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  
          }
        }
        this.$axios.post('/facility', formdata, config).then( (res) => {alert("提交成功");
        // this.$router.replace('/around/map');
        this.$router.go(0);
        }).catch((error) =>{
        });
                // }
                // this.$router.push('/guidePage/index');
        return false; 
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
    align-items: center;
    .page {
        width: px2rem(1400);
        height: px2rem(scale(1500));
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
    }
}


</style>
