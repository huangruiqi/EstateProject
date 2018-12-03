<template>
    <div class="content">
        <div class="header">
            <img src="../../../assets/img/goHouseHistory/back.png" alt="" @click="go()">
        </div>
        <div class="middle" >
            <div class="pic">
                <img class="conPic" style="width:100%;" v-show="check" @click="scale()" v-for="a in img" :src="a" alt="" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">        
            </div>
            <div class="intro">
                <!-- <img src='../../../assets/img/rightHouseNav/fullScreen.png' style="visibility: hidden;"> -->
                {{name}}展示图
                <!-- <img src='../../../assets/img/rightHouseNav/fullScreen.png' class="fullScreen"> -->
            </div>
            <div class="pageNum">
                <span>{{nowPage}}/{{numAll}}</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/bottomNavBar'
// import right from "../components/rightNavBar";

export default {
    data() {
        return {
            park: {},
            common: [],
            garden: [],
            nowPage: 1,
            numAll: 0,
            img: [1],
            check: 0,
            name: "",
            nameAll: [],
            fullCheck: 1,
			startX: 0,//手触摸开始位置
			endX: 0,//手结束位置
            x: 0,//滑动位置距离
            control: 0,//控制left不变
            imgLeft: -400,              
        }
    },
    created() {
        
        this.$axios.get("/landscape/images")
            .then(res => {
                this.park = res.data.data;
                this.common = this.park.landscapeDto.common;
                this.garden = this.park.landscapeDto.park;
                this.numAll = this.common.length + this.garden.length;
                //装2个类型的图片
                if (this.common[0] && this.garden[0]) {
                    for (let i = 1; i < this.common.length + 1; i++) {
                        if (this.common[i - 1]) {
                            this.img[i] = this.common[i - 1].landscapeTypeImage.image.min;
                        }
                    }
                    let commonL = this.common.length + 1
                    for (let i = this.common.length + 1; i < this.numAll; i++) {
                        if (this.garden[i - commonL]) {
                            this.img[i] = this.garden[i - commonL].landscapeTypeImage.image.min;
                        }
                    }
                    this.img[0] = this.garden[this.garden.length - 1].landscapeTypeImage.image.min; 
                    // console.log(this.img);
                    this.check = 1;                 
                }
                // this.check = 1;
                //装2个类型的名字
                if (this.common[0] && this.garden[0]) {
                    for (let i = 1; i <= this.common.length; i++) {
                        if (this.common[i - 1]) {
                            this.nameAll[i] = this.common[i - 1].placeTypeName;
                        }
                    }
                    let commonL = this.common.length + 1;
                    for (let i = this.common.length + 1; i < this.numAll; i++) {
                        if (this.garden[i - commonL]) {
                            this.nameAll[i] = this.garden[i - commonL].placeTypeName;
                        }
                    }
                    this.nameAll[0] = this.garden[this.garden.length - 1].placeTypeName;              
                    this.name = this.nameAll[1];
                      
                }
                
                if (this.img.length > 1) {
                    this.imgLeft = window.innerWidth*(-1);
                    $('.conPic').eq(0).css('marginLeft', this.imgLeft + 'px');
                }else {
                    $('.conPic').eq(0).css('marginLeft', 0 + 'px');
                } 
            
            })
            .catch(error => {
                console.log(error);
            });
        },
    mounted(){
        document.title = "园林美景";
        // this.imgLeft = window.innerWidth*(-1);
        // $('.conPic').eq(0).css('marginLeft', this.imgLeft + 'px');
    },
    methods: {
        //返回
        go() {
            this.$router.push('/index');
        },
        isFullscreen(){
            return document.fullscreenElement    ||
                document.msFullscreenElement  ||
                document.mozFullScreenElement ||
                document.webkitFullscreenElement || false;
        },
        touchstart(ev) {
            if (!this.isFullscreen() && this.img.length > 1) {
                this.startX = parseInt(ev.touches[0].clientX);
                this.imgLeft = window.innerWidth * (-1);
                this.control = this.imgLeft;

            }else {
                this.startX = parseInt(ev.touches[0].clientX);
            }
        },
        touchmove(ev) {
            if (!this.isFullscreen() && this.img.length > 1) {
                this.endX = parseInt(ev.touches[0].clientX);
                this.x = this.endX - this.startX;
                this.imgLeft = this.control + this.x;
                document.getElementsByClassName('conPic')[0].style.marginLeft = this.imgLeft + 'px';
            } else {
                this.endX = parseInt(ev.touches[0].clientX);
            }
        },
        touchend(ev) {
            if (!this.isFullscreen() && this.img.length > 1) {
                this.x = this.endX - this.startX;
                if (this.x > 0 && this.x < window.innerWidth && this.endX != 0) {
                    let l = this.img.length - 1;
                    let b = document.getElementsByClassName('conPic')[0];
                    let c = document.getElementsByClassName('conPic')[l];
                    // c.parentNode.removeChild(c);
                    let e = document.getElementsByClassName('pic')[0];
                    b.style.marginLeft = 0;
                    let d = c;
                    c.parentNode.removeChild(c);
                    e.insertBefore(c, b);
                    c.style.marginLeft = window.innerWidth * (-1) + 'px';
                    if (this.nowPage == 1) {
                        this.nowPage = this.numAll;
                    } else {
                        this.nowPage--;
                    }
                    this.name = this.nameAll[this.nowPage - 1];
                }else if(this.x < 0 && this.x>window.innerWidth * (-1) && this.endX != 0) {
                    let b = document.getElementsByClassName('conPic')[0];
                    b.style.marginLeft = window.innerWidth * (-2) + 'px';
                    let d = b;
                    b.parentNode.removeChild(b);
                    d.style.marginLeft = 0;
                    let c = document.getElementsByClassName('conPic')[0];
                    c.style.marginLeft = window.innerWidth * (-1) + 'px';
                    let e = document.getElementsByClassName('pic')[0];
                    e.appendChild(d);
                    if (this.nowPage == this.numAll) {
                        this.nowPage = 1;
                    } else {
                        this.nowPage++;
                    }
                    this.name = this.nameAll[this.nowPage - 1];
                }
                if (this.endX == 0) {
                    document.getElementsByClassName('conPic')[1].click()
                }
                this.endX = 0;
            } else {
                this.x = this.endX - this.startX;
                // console.log(this.x < 0);
                if (this.x < 0) {
                    // alert(555);
                    document.getElementsByClassName('conPic')[0].click()
                }
            }
        },
        scale() {
                if (document.getElementsByClassName('conPic')[1]) {
                    // document.getElementsByClassName('conPic')[1].onclick = () => {
                        let img2 = [];
                        for (let i = 0; i < this.img.length - 1; i++) {
                            img2[i] = this.img[i + 1];
                        }
                        img2[this.img.length - 1] = this.img[0];
                        // console.log(document.getElementsByClassName('conPic')[1].src);
                        var agent = navigator.userAgent.toLowerCase();
                        if (agent.match(/MicroMessenger/i) == "micromessenger") {
                            // return true;
                            // setTimeout(() => {
                                WeixinJSBridge.invoke('imagePreview', {    
                                    'current': document.getElementsByClassName('conPic')[1].src,
                                    'urls': img2
                                }); 
                            // },1000);

                        } else {
                            // return false;
                        }               
                    // }
                }else if (document.getElementsByClassName('conPic')[0]) {
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
                        }
                    // }                   
                }
        }      
    },
    components: {
       
    },
    watch: {
        park() {
            // if (document.getElementsByClassName('conPic')[1]) {
                // alert(444);
            // let timer = setInterval(() => {
                // if (document.getElementsByClassName('conPic')[1]) {
                //     // document.getElementsByClassName('conPic')[1].onclick = () => {
                //         let img2 = [];
                //         for (let i = 0; i < this.img.length - 1; i++) {
                //             img2[i] = this.img[i + 1];
                //         }
                //         img2[this.img.length - 1] = this.img[0];
                //         // console.log(document.getElementsByClassName('conPic')[1].src);
                //         var agent = navigator.userAgent.toLowerCase();
                //         if (agent.match(/MicroMessenger/i) == "micromessenger") {
                //             // return true;
                //             setTimeout(() => {
                //                 WeixinJSBridge.invoke('imagePreview', {    
                //                     'current': document.getElementsByClassName('conPic')[1].src,
                //                     'urls': img2
                //                 }); 
                //             },1000);

                //         } else {
                //             // return false;
                //         }               
                //     // }
                // }else if (document.getElementsByClassName('conPic')[0]) {
                //     // document.getElementsByClassName('conPic')[0].onclick = () => {
                //         let img = [];
                //         // for (let i = 0; i < this.img.length - 1; i++) {
                //             img[0] = this.img[0];
                //         // }
                //         // img[this.img.length - 1] = this.img[0];
                //         // alert(778);
                //         var agent = navigator.userAgent.toLowerCase();
                //         if (agent.match(/MicroMessenger/i) == "micromessenger") {
                //             // return true;
                //             setTimeout(() => {
                //                 WeixinJSBridge.invoke('imagePreview', {    
                //                     'current': document.getElementsByClassName('conPic')[0].src,
                //                     'urls': img
                //                 }); 
                //             },1000);
                //         } else {
                //             // alert(333);
                //         }
                //     // }                   
                // }
            // }, 100);
        }           
        // }
    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';

.content {
    width: 100%;
    height: 100%;
    // background-color: #1E1E1E;
    background-color: #202020;
    @include fj(center);
    flex-direction: column;
    align-items: center;
    position: relative;
    .header {
        width: 100%;
        height: px2rem(93);
        position: absolute;
        top: 0;
        img {
          width: px2rem(64);
          height: px2rem(64);
          position: absolute;
          top: px2rem(29);
          right: px2rem(27);
        }
    }
    .middle {
        width: 100%;
        height: px2rem(641);
        // margin-top: px2rem(163);
        @include fj();
        flex-direction: column;
        .pic {
            width: 100%;
            height: px2rem(562);
        //   background-color: #fff;
            overflow: hidden;
            // display: flex;
            margin: 0 auto;
            white-space:nowrap;
            // position: relative;
            img {
                // position: absolute;
                width: 100%;
                height: px2rem(562);
                // float: left;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        .intro {
            width: 100%;
            height: px2rem(73);
            margin-top: -7.0rem;
            @include fj(center);
            align-items: center;
            @include fontSize(24);
            color: white;
            background-color: black;
            opacity: 0.7;
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
                right: px2rem(61);
                @include fontSize(23);
                color: #c9c9c9;;
            }
        }
    }
}

</style>
