<template>
    <div class="content">
        <div class="pic">
            <iframe :src="src" frameborder="0" scrolling="no" id="pano" width="100%" height="100%" ></iframe>
        </div>
        <!-- <div class="changePosition"> -->
            <!-- <div class="topHouse"> -->
                <!-- <img src="../../../assets/img/goHouseHistory/goHistory.png" @click="goHistory()"> -->
            <!-- </div> -->
            <!-- <div class="middleHouse"> -->
                    <!-- <div id="pano"> -->
                    <!-- <iframe :src="src" frameborder="0" scrolling="no" id="pano" width="100%" height="100%" ></iframe>   -->
			        <!-- </div> -->
                <!-- <right @event='getPicUrl' :intial=3 ref="rightA"></right> -->
            <!-- </div> -->
        <!-- </div> -->
        <!-- 传给子组件值 -->
        <!-- <bottom ref="bottom" :typeClassChange='typeClassChangeTwo' :typeClassChangeThree='typeClassChange' :typeClassChangeTwo='typeClassChangeTwo' ></bottom> -->
    </div>
</template>

<script type="text/ecmascript-6">

export default {
    data() {
        return {
            typeClassChangeTwo: "noActive",//传给bottom没有被点击的盒子样式
            typeClassChange: "active",//传给bottom被点击的盒子样式
            picUrl: "",
            src: "",
            houseNum: 0,//户型号
            house: {}
        }
    },
    created() {
        if (this.$route.query.houseNum) {
            this.houseNum = this.$route.query.houseNum;
        }
        this.$axios.get("/house/houseType/get")
            .then(res => {
                this.house = res.data.data;
                if (this.house && this.house[this.houseNum] && this.house[this.houseNum].houseTypeVrUrl) {
                    this.src=this.house[this.houseNum].houseTypeVrUrl;
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
        document.title = '全景展示';
        this.$on('giveNum', (val) => { 
            // console.log(val);
            if (this.house[val]) {
                if(this.house[val].houseTypeVrUrl) {
                    this.$emit('checkVR', val, 3);
                    this.src = '';
                    this.src = this.house[val].houseTypeVrUrl;
                }else {
                    // alert(val);
                    this.$emit('checkVR', val, 3);
                    // this.$router.push('/houseType/plan');
                    // this.$router.go(-1);
                    // this.$route.path = '/houseType'
                }
                // this.$emit('checkVR', val);
            }
        });
        // this.$refs.bottom.$emit('change');
        // this.$on('bridge', (val, val2) => {
            // alert(this.house[val].houseType.vrUrl);
            // if(this.house[val].houseType.vrUrl) {
                // this.src = this.house[val].houseType.vrUrl;
                // document.getElementById('pano').src = '';
                // document.getElementById('pano').src = this.src;
            // }else {
                // this.$router.push('/houseType');
            // }
            // this.$refs.bottom.$emit('checkVR', val);
            // this.upload();
            // this.$forceUpdate();
            // this.$router.go(0);
        // });

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

    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.content {
    width: 100%;
    height: 100%;
    .pic {
        width: 100%;
        height: px2rem(540);
    }
}
</style>
