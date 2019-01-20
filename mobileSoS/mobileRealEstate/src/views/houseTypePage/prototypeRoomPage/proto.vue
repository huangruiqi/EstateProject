<template>
    <div class="content">
        <div class="pic" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">
            <transition-group tag="ul" :name="change">
                <li v-for="(image, index) in img" :key='image'  v-show="index === imageNum">
                    <img :src="image" alt="">
                </li>
            </transition-group>
            <!-- <img class="conPic" v-show="check" v-for="a in img" @click="scale()" :src="a" alt="" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">         -->
        </div>
        <div class="intro">
            <!-- <img src='../../../assets/img/rightHouseNav/fullScreen.png' style="visibility: hidden;"> -->
            {{name}}展示图
            <!-- <img src='../../../assets/img/rightHouseNav/fullScreen.png' class="fullScreen"> -->
        </div>
        <div class="pageNum">
            <span>{{nowPage}}/{{houseSampleRoomsNum}}</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import getImage from '../../../utils/getImage.js'

export default {
    data() {
        return {
            house: {},
            houseSampleRoomsNum: 0,
            houseNum: 0,
            nowPage: 1,
            name: "",//样板间名字
            img: [1],
            check: 0,//为了检测是否改变了img的值以便渲染
            fullCheck: 1,
			imageNum: 0,
            timer: '',
            startX: 0,
            endX: 0,
            x: 0,
            change: '',
            wordRemind: true,
            title: ''
        }
    },
    created() {
        this.$axios.get("/house/houseType/get")
        .then(res => {
            this.title = res.data.data;
            if(this.title[0]) {
                this.$axios.get("/house/sampleRoomImage/get?houseTypeId=" + this.title[0].id)
                .then(res => {  
                    this.house = res.data.data;
                    if (this.house[this.houseNum] && this.house[this.houseNum].sampleRoomImageLocation) {
                        this.houseSampleRoomsNum = this.house.length;
                        this.imgSrc = this.house;
                        // console.log(this.imgSrc.length );
                        for (let i = 0; i < this.houseSampleRoomsNum; i++) {
                            this.img[i] = getImage(this.imgSrc[i].sampleRoomImageLocation, 3);
                        }
                        // this.img[0] = getImage(this.imgSrc[this.houseSampleRoomsNum - 1].sampleRoomImageLocation, 3);
                        // this.check = 1;
                        // this.name = this.imgSrc[0].roomTypeName;
                        // if (this.imgSrc.length > 1) {
                        //     this.imgLeft = window.innerWidth*(-1);
                        //     $('.conPic').eq(0).css('marginLeft', this.imgLeft + 'px');
                        // }else {
                        //     $('.conPic').eq(0).css('marginLeft', 0 + 'px');
                        // }              
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    mounted(){
        document.title = "样板间";
        this.imgLeft = window.innerWidth*(-1);
        //使得恢复原位
        // if (this.imgSrc.length > 1) {
        //     this.imgLeft = window.innerWidth*(-1);
        //     $('.conPic').eq(0).css('marginLeft', this.imgLeft + 'px');
        // }
        //获取户型内容
        this.$on('giveNum', (val) => { 
            this.$emit('checkVR', val, 1);
            if (this.houseNum != val && this.title[val]) {
                this.houseNum = val;
                this.$axios.get("/house/sampleRoomImage/get?houseTypeId=" + this.title[val].id)
                .then(res => {  
                    this.$forceUpdate();
                    this.house = res.data.data;
                    this.img = [];
                    this.nowPage = 1;
                    this.startX= 0 ;
                    this.endX = 0;
                    this.imageNum = 0;
                    this.x = 0;
                    this.change = '';
                    if (this.house && this.house[0].sampleRoomImageLocation) {
                        this.$forceUpdate();
                        this.houseSampleRoomsNum = this.house.length;
                        this.imgSrc = this.house;
                        // console.log(this.imgSrc.length );
                        for (let i = 0; i < this.houseSampleRoomsNum; i++) {
                            this.img[i] = getImage(this.imgSrc[i].sampleRoomImageLocation, 3);
                        }
                        this.check = 1;
                        this.name = this.imgSrc[0].roomTypeName;
                        this.$forceUpdate();
    
                        // console.log($('.conPic'));
                    }
                })
                .catch(error => {
                    console.log(error);
                });
                              
            }

        });       
    },
    methods: {
        autoPlay() {
            this.imageNum++;
                if (this.imageNum > this.img.length -1) {
                    this.imageNum = 0;
                    this.nowPage = 1;
                    this.name = this.imgSrc[this.imageNum].roomTypeName;;
                } else {
                    this.nowPage++;
                    this.name = this.imgSrc[this.imageNum].roomTypeName;
                    this.change = 'photoSlideLeft';
                }
        },
        left() {
            // clearInterval(this.timer);
            this.imageNum--; 
                if (this.imageNum < 0) {
                    this.imageNum = this.img.length-1;
                    this.nowPage = this.img.length;
                    this.name = this.imgSrc[this.imageNum].roomTypeName;;
                } else {
                    this.nowPage--;
                    this.name = this.imgSrc[this.imageNum].roomTypeName;;
                    this.change = 'photoSlideRight';
                }
        },
        touchstart(ev) {
            // clearInterval(this.timer);
            this.startX = parseInt(ev.touches[0].clientX);
            // var imageStyle = document.getElementsByClassName('brandIntroPhoto')[0].children[0];
        },
        touchmove(ev) {
            this.endX = parseInt(ev.touches[0].clientX);
        },
		touchend(ev) {
            this.x = this.endX - this.startX;
			if (this.x>0) {
				this.left()
				// this.timer = setInterval(() => {
				// 	this.autoPlay()
				// }, 4000);
			}else if(this.x<0) {
				this.autoPlay()
				// this.timer = setInterval(() => {
				// 	this.autoPlay()
				// }, 4000)
			}
		},
        //判断是否全屏
        isFullscreen(){
            return document.fullscreenElement    ||
                document.msFullscreenElement  ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement || false;
        },
        //退出全屏  
        exitFullscreen() {  
            if(this.isFullscreen() && $('.conPic').eq(1)) {
                
                $('.conPic').eq(1).click(() => {
                    if (document.exitFullscreen) {  
                        document.exitFullscreen();  
                    } else if (document.mozCancelFullScreen) {  
                        document.mozCancelFullScreen();  
                    } else if (document.webkitCancelFullScreen) {  
                        document.webkitCancelFullScreen();  
                    } 
                    
                //       WeixinJSBridge.invoke('imagePreview', {    
                //     'current': $(this).attr('src'),
                //     'urls': this.img
                // });    
                });
                // document.onclick = () => {
                //     document.getElementsByClassName('conPic')[1].click()
                // }
            }else {

            }
        },        
        scale() {
                if (document.getElementsByClassName('conPic')[1]) {
                    // document.getElementsByClassName('conPic')[1].onclick = () => {
                        let img = [];
                        for (let i = 0; i < this.img.length - 1; i++) {
                            img[i] = this.img[i + 1];
                        }
                        img[this.img.length - 1] = this.img[0];
                        // alert(778);
                        var agent = navigator.userAgent.toLowerCase();
                        if (agent.match(/MicroMessenger/i) == "micromessenger") {
                            // return true;
                            // setTimeout(() => {
                                WeixinJSBridge.invoke('imagePreview', {    
                                    'current': document.getElementsByClassName('conPic')[1].src,
                                    'urls': img
                                }); 
                            // },1000);
                        } else {
                            // alert(333);
                            // console.log(document.getElementsByClassName('conPic')[1].src);
                        }
                    // };
                }else if(document.getElementsByClassName('conPic')[0]){
                    // document.getElementsByClassName('conPic')[0].onclick = () => {
                        let img = [];
                        // for (let i = 0; i < this.img.length - 1; i++) {
                            img[0] = this.img[0];
                        // }
                        // img[this.img.length - 1] = this.img[0];
                        // alert(778);
                        var agent = navigator.userAgent.toLowerCase();
                        if (agent.match(/MicroMessenger/i) == "micromessenger") {
                            // return true;
                            // setTimeout(() => {
                                WeixinJSBridge.invoke('imagePreview', {    
                                    'current': document.getElementsByClassName('conPic')[0].src,
                                    'urls': img
                                }); 
                            // },1000);
                        } else {
                            // alert(333);
                            // console.log(document.getElementsByClassName('conPic')[0].src);
                        }
                    // }                   
                }           
        }

    },
    components: {

    },
    watch: {
        house() {
           
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';

.content {
    width: 100%;
    height: px2rem(592);
    @include fj();
    flex-direction: column;
    position: relative;
    // position: absolute;
    .pic {
        width: 100%;
        height: px2rem(540);
        position: relative;
        overflow: hidden;
        ul {
            width: 100%;
            height: 100%;
            li {
                position: absolute;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .intro {
        width: 100%;
        height: px2rem(50);
        margin-top: -0rem;
        transform: translateY(-100%);
        @include fj(center);
        align-items: center;
        
        background-color:rgba(62,62,62,0.8);
        @include fontSize(28);
        letter-spacing: px2rem(2);
        color: #dbdbdb;
        img {
            width: px2rem(64);
            height: px2rem(64);
        }
        // position: relative;
        // top: -100%;
    }
    .pageNum {
        width: 100%;
        height: px2rem(35);
            // background-color: #fff;
        position: relative;
        span {
            position: absolute;
            right: px2rem(30);
            @include fontSize(30);
            letter-spacing: px2rem(2);
            color: #717171;
        }
    }
}
.photoSlideLeft-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideLeft-leave-active {
  transition: all 1s ease;
  transform: translateX(-100%);
}
.photoSlideLeft-enter {
  transform: translateX(100%);
}
.photoSlideLeft-leave {
  transform: translateX(0);
}
.photoSlideRight-enter-to {
  transition: all 1s ease;
  transform: translateX(0);
}
.photoSlideRight-leave-active {
  transition: all 1s ease;
  transform: translateX(100%);
}
.photoSlideRight-enter {
  transform: translateX(-100%);
}
.photoSlideRight-leave {
  transform: translateX(200%);
}
</style>
