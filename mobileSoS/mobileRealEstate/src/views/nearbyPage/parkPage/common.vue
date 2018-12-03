<template>
    <div class="content" style="position:relative;overflow: hidden;">
        <img id="targetObj" style="position:relative;transform-origin:center" :src="map" />
        <img src="../../../assets/img/goHouseHistory/back.png" alt="" id="come" @click="go()">
        <!-- <img id="come" src="../../../assets/img/goHouseHistory/goHistory2.png" alt="" @click="goHistory()"> -->
        <!-- <input type="button" value="重置" @click="reset()" > -->
    </div>  
</template>



<script type="text/ecmascript-6">
 
export default {
    data() {
        return {
            map: ""
        }
    },
    created() {
        this.$axios.get("/landscape/images")
        .then(res => {
            this.map = res.data.data.nearDto.min;
        })
        .catch(error => {
            console.log(error);            
        });
    },
    mounted() {   
        // this.shuaXin();
        document.title = "周边设施";
        // console.log(document.title);
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
        //返回
        go() {
            this.$router.push('/index');
        },
    },
    components: {

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
    #come {
        width: px2rem(64);
        height: px2rem(64);
        z-index: 1000;
        position: absolute;
        right: px2rem(27);
        top: px2rem(29);
        cursor: pointer;
    }
    input {
        position: absolute;
        top: percentage(955 /1080);
        right: px2rem(105);
        width: px2rem(159);
        height: px2rem(35);
        border-radius: px2rem(17);
        border: px2rem(2) solid $colorAll;
        z-index: 1000;
        @include sc(px2rem(28), black);
        cursor: pointer;
    }
}
</style>
