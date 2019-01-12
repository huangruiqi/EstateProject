<template>
    <div class="content" style="position:relative;overflow: hidden;">
        <img id="targetObj" class="target" style="position:relative;transform-origin:center" :src="map" />
        <img id="come" src="../../../assets/img/goHouseHistory/goHistory2.png" alt="" @click="goHistory()">
        <!-- <input type="button" value="重置" @click="reset()" > -->
    </div>  
</template>



<script type="text/ecmascript-6">
 
export default {
    data() {
        return {
            map: "",
            mapBig: ""
        }
    },
    created() {
        this.$axios.get("/landscape/images")
        .then(res => {
            if (screen.width > 1024){
                this.mapBig = res.data.data.nearDto.url;
            }else {
                this.mapBig = res.data.data.nearDto.middle;
            }   
            this.map = res.data.data.nearDto.url;
            // this.mapBig = res.data.data.nearDto.url;
        })
        .catch(error => {
            console.log(error);            
        });
    },
    mounted() {   
        // this.shuaXin();
        let $targetObj = $('#targetObj');
                //初始化设置
        cat.touchjs.init($targetObj, function (left, top, scale, rotate) {
        });
                //拖拽
        cat.touchjs.drag($targetObj, function (left, top) {
                
        });
                //缩放
        cat.touchjs.scale($targetObj, function (scale) {
            
        });
                //旋转
        // cat.touchjs.rotate($targetObj, function (rotate) {
                
        // });
    },
    methods: {
        //重置
        reset() { 
            // this.$router.replace("/index");
            document.getElementsByTagName('input').style.backgroundColor = 'red'
            this.$router.go(0); 
            // this.$forceUpdate();
            // this.$router.push('/nearBy/neighberhood');
        },
        shuaXin() {
            window.onload = () => {
                this.$router.push("/index"); 
            }
        },
        goHistory() {
            this.$router.push("/index"); 
        }
    },
    components: {

    },
    watch: {
        mapBig() {
            var ele = document.querySelector('#targetObj');
            var imgUrl = this.mapBig;
            var imgObject = new Image();

            imgObject.src = imgUrl;
            imgObject.onload = function () {
                this.map = imgUrl;
                // console.log(this.imgProjectBack);
                ele.src = this.map;
                // $('#muluguanli').css('background','url(res/skin/dist/img/zongheguanli_bg.png)  no-repeat');
                ele.setAttribute('class', 'target complete');
            }         
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
@import '../../../styles/common.scss';

.content {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    #targetObj {
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .target {
        filter: blur(4px);
        transition: all 0.7s;
    }
    .complete {
        filter: blur(0);
    }
    #come {
        width: px2rem(57);
        height: px2rem(50);
        z-index: 1000;
        position: absolute;
        right: px2rem(105);
        top: px2rem(49);
        cursor: pointer;
    }
    input {
        position: absolute;
        top: percentage(955 /1080);
        right: px2rem(105);
        width: px2rem(159);
        height: px2rem(35);
        border-radius: px2rem(17);
        border: px2rem(1) solid $colorAll;
        z-index: 1000;
        @include sc(px2rem(28), black);
        cursor: pointer;
    }
}
</style>
