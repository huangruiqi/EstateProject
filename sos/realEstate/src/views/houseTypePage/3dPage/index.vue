<template>
    <div class="content">
        <div class="changePosition">
            <!-- <div class="topHouse"> -->
                <img src="../../../assets/img/goHouseHistory/goHistory.png" @click="goHistory()">
            <!-- </div> -->
            <!-- <div class="middleHouse"> -->
                    <!-- <div id="pano"> -->
                    <iframe :src="src" frameborder="0" scrolling="no" id="pano" width="100%" height="100%" ></iframe>  
			        <!-- </div> -->
                <!-- <right @event='getPicUrl' :intial=3 ref="rightA"></right> -->
            <!-- </div> -->
        </div>
        <!-- 传给子组件值 -->
        <bottom ref="bottom" :typeClassChange='typeClassChangeTwo' :typeClassChangeThree='typeClassChange' :typeClassChangeTwo='typeClassChangeTwo' ></bottom>
    </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/navBar/bottomNavBar'
import right from "../components/navBar/rightNavBar"
import * as three from 'three';
import * as PhotoSphereViewer from 'photo-sphere-viewer-sa'


export default {
    data() {
        return {
            typeClassChangeTwo: "noActive",//传给bottom没有被点击的盒子样式
            typeClassChange: "active",//传给bottom被点击的盒子样式
            picUrl: "",
            // src: "http://47.106.120.37:8080/saleSystem/dist1/dist/static/vtour/tour.html",
            src: "",
            houseNum: 0,//户型号
            house: {}
            // src: "http://vr.justeasy.cn/view/1079664.html"
        }
    },
    created() {
        this.$axios.get("/house/housetype")
            .then(res => {
                this.house = res.data.data;
                if (this.house[0].houseType.vrUrl) {
                    this.src=this.house[0].houseType.vrUrl;
                    // this.numRight = res.data.data[this.houseNum].houseSampleRooms.length;
                    // this.imgSrc = res.data.data[this.houseNum].houseSampleRooms;
                    // this.clickUrl = this.imgSrc[this.houseNum].houseTypeImage.image.fileName;
                    // this.$emit('event', this.clickUrl);
                    // document.getElementById('typeClassThree').style.display = 'none';

                }
            })
            .catch(error => {
            console.log(error);
        });
    },
    mounted() {

        this.$refs.bottom.$emit('change');
        this.$on('bridge', (val, val2) => {
            // alert(this.house[val].houseType.vrUrl);
            if (this.house[val]) {
                if(this.house[val].houseType.vrUrl) {
                    this.$refs.bottom.$emit('checkVR', val, 3);
                    this.src = '';
                    this.src = this.house[val].houseType.vrUrl;
                }else {
                    // alert(val);
                    this.$refs.bottom.$emit('checkVR', val, 3);
                    // this.$router.push('/houseType/plan');
                    // this.$router.go(-1);
                    // this.$route.path = '/houseType'
                }
                // this.$emit('checkVR', val);
            }
            // this.upload();
            // this.$forceUpdate();
            // this.$router.go(0);
        });
        this.$on('bridgeTwo', (val) => {
            // console.log(val);
            if (this.house[val]) {
                if(this.house[val].houseType.vrUrl) {
                    this.$refs.bottom.$emit('checkVR', val, 3);
                    this.src = '';
                    this.src = this.house[val].houseType.vrUrl;
                }else {
                    // alert(val);
                    console.log(val);
                    this.$refs.bottom.$emit('checkVR', val, 3);
                    // this.$router.push('/houseType/plan');
                    // this.$router.go(-1);
                    // this.$route.path = '/houseType'
                }
                // this.$emit('checkVR', val);
            }
            // console.log(val);
            // this.$refs.rightA.$emit('changeHouse2', val);
            // this.$refs.bottom.$emit('checkVR', val, 1);
            // this.getPicUrl(this.dataAll[val].housePlans[0].houseTypeImage.image.url);
            // this.val = val;
        });
        // this.$on('bridgeTwo', (val) => {
        //     this.$refs.rightA.$emit('changeHouse2', val);
        // });
        // this.shuaXin();
        // let a = setInterval(() => {
        // this.upload();
        // },100);
    },
    methods: {
        //点击返回
        goHistory() {
            this.$router.push('/index') 
        },
        getPicUrl(clickUrl) {
            this.picUrl = clickUrl;
        },
        chuFa(val, val2) {
            this.upload();
        },
        //3D
        upload() {
            var pano = document.getElementById('pano');
            var config = {target: "pano", swf: "./static/vtour/tour.swf", xml: "./static/vtour/tour.xml", html5: "auto"}
            embedpano(config);
        },
        //强制刷新
        shuaXin() {
            window.onload = () => {
               this.$router.replace("/index"); 
            }
        }  
    },
    components: {
        bottom,
        right
    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.content {
    width: 100%;
    height: 100%;
    background-color: #1E1E1E;
    .changePosition {
        width: 100%;
        height: vertical(905);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
            img {
                width: px2rem(57);
                height: px2rem(50);
                position: absolute;
                top: px2rem(16);
                left: percentage(1503 / 1620);
                cursor: pointer;
            }
            #pano {
                width: 90%;
                height: 90%;
                margin-top: transverse(121);
                margin-left: transverse(80);
                border: px2rem(2) solid $colorAll;
                background-repeat: no-repeat;
                background-size: percentage(1094 / 1098) percentage(761 / 765);
            }
    }
}
</style>
