<template>
    <div class="content">
        <div class="changePosition">
            <!-- <div class="topHouse"> -->
            <div class="topHouse">
                <img src="../../../assets/img/goHouseHistory/goHistory.png" @click="goHistory()">
            </div>
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
        <contact @haveCon='haveCon'></contact>
        <contact-content @closeInfo='closeInfo' :style='{display: conDisplay}'></contact-content>
    </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/navBar/bottomNavBar'
import right from "../components/navBar/rightNavBar"
import * as three from 'three';
import * as PhotoSphereViewer from 'photo-sphere-viewer-sa'
import contact from '../../../components/haveContact'
import contactContent from '../../../components/contactContent'

export default {
    data() {
        return {
            typeClassChangeTwo: "noActive",//传给bottom没有被点击的盒子样式
            typeClassChange: "active",//传给bottom被点击的盒子样式
            picUrl: "",
            // src: "http://47.106.120.37:8080/saleSystem/dist1/dist/static/vtour/tour.html",
            src: "",
            houseNum: 0,//户型号
            house: {},
            conDisplay: 'none'
            // src: "http://vr.justeasy.cn/view/1079664.html"
        }
    },
    created() {
        this.$axios.get("/house/houseType/get")
            .then(res => {
                this.house = res.data.data;
                if (this.house && this.house[0] && this.house[0].houseTypeVrUrl) {
                    this.src=this.house[0].houseTypeVrUrl;
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
                if(this.house[val].houseTypeVrUrl) {
                    this.$refs.bottom.$emit('checkVR', val, 3);
                    this.src = '';
                    this.src = this.house[val].houseTypeVrUrl;
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
                if(this.house[val].houseTypeVrUrl) {
                    this.$refs.bottom.$emit('checkVR', val, 3);
                    this.src = '';
                    this.src = this.house[val].houseTypeVrUrl;
                }else {
                    // alert(val);
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
            // var pano = document.getElementById('pano');
            // var config = {target: "pano", swf: "./static/vtour/tour.swf", xml: "./static/vtour/tour.xml", html5: "auto"}
            // embedpano(config);
        },
        //强制刷新
        shuaXin() {
            window.onload = () => {
               this.$router.replace("/index"); 
            }
        }  ,
        haveCon() {
            this.conDisplay = 'flex';
            this.$forceUpdate();
        },
        closeInfo() {
            this.conDisplay = 'none';
            this.$forceUpdate();
        },
    },
    components: {
        bottom,
        right,
        contact,
        contactContent
    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.content {
    width: 100%;
    height: 100%;
    background-color: #D7D7D7;
    background-image: url('../../../assets/img/goHouseHistory/houseBack.jpg');
    .changePosition {
        width: 100%;
        height: vertical(905);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        .topHouse {
            height: vertical(117);
            position: absolute;
            display: flex;
            align-items: flex-end;
            top: 0;
            right: px2rem(95);
            img {
                width: px2rem(63);
                height: px2rem(57);
                cursor: pointer;
            }
        }
        
            #pano {
                width: px2rem(1471);
                height: px2rem(720);
                margin-top: transverse(169);
                margin-left: transverse(95);
                // border: px2rem(2) solid $colorAll;
                background-repeat: no-repeat;
                background-size: percentage(1094 / 1098) percentage(761 / 765);
            }
    }
}
</style>
