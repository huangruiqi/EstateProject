<template>
    <div class="content">
        <div class="pic">
            <img class="conPic" v-show="check" v-for="a in img" @click="scale()" :src="a" alt="" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove" @touchend.stop.prevent="touchend">        
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
			startX: 0,//手触摸开始位置
			endX: 0,//手结束位置
            x: 0,//滑动位置距离
            control: 0,//控制left不变
            imgLeft: -400,           
            numA: 0
        }
    },
    created() {
        this.$axios.get("/house/housetype")
        .then(res => {
            this.house = res.data.data;
            if (this.house[this.houseNum].houseSampleRooms) {
                this.houseSampleRoomsNum = this.house[this.houseNum].houseSampleRooms.length;
                this.imgSrc = this.house[this.houseNum].houseSampleRooms;
                // console.log(this.imgSrc.length );
                for (let i = 0; i < this.houseSampleRoomsNum - 1; i++) {
                    this.img[i + 1] = this.imgSrc[i].houseTypeImage.image.min;
                }
                // alert(444);
                this.img[0] = this.imgSrc[this.houseSampleRoomsNum - 1].houseTypeImage.image.min;
                this.check = 1;
                this.name = this.imgSrc[0].roomTypeName;
                if (this.imgSrc.length > 1) {
                    this.imgLeft = window.innerWidth*(-1);
                    $('.conPic').eq(0).css('marginLeft', this.imgLeft + 'px');
                }else {
                    $('.conPic').eq(0).css('marginLeft', 0 + 'px');
                }              
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
            if (this.houseNum != val) {
                this.houseNum = val;
                if(this.house[val]) {
                    if(this.house[val].houseSampleRooms) {
                        if (this.numA > 0) {
                            for (let i = 0; i < this.numA; i++) {
                                // alert(556);
                                this.x = 1;
                                this.touchen();
                            }
                            this.x = 0;
                            this.numA = 0;
                        }else if (this.numA < 0) {
                            for (let i = this.numA; i < 0; i++) {
                                this.x = -1;
                                this.touchen();
                            }     
                            this.x = 0;    
                            this.numA = 0;                   
                        }else if (this.img.length == 1) {
                            this.imgLeft = window.innerWidth*(-1);
                            $('.conPic').eq(0).css('marginLeft', this.imgLeft + 'px');                           
                        }

                        this.check = 0;
                        this.img = [];
                        this.houseSampleRoomsNum = this.house[val].houseSampleRooms.length;
                        this.imgSrc = this.house[val].houseSampleRooms;
                        // console.log(this.imgSrc);
                        for (let i = 0; i < this.houseSampleRoomsNum - 1; i++) {
                            this.img[i + 1] = this.imgSrc[i].houseTypeImage.image.min;
                        }
                        this.img[0] = this.imgSrc[this.houseSampleRoomsNum - 1].houseTypeImage.image.min;
                        // console.log(this.img);
                        // this.check = 1;
                        this.name = this.imgSrc[0].roomTypeName;  
                        this.nowPage = 1; 
                        this.imgLeft = window.innerWidth*(-1);
                        // console.log(this.img);
                        if (this.imgSrc.length > 1) {
                            for (let i = 0; i <  this.imgSrc.length && document.getElementsByClassName('conPic')[i]; i++) {
                                document.getElementsByClassName('conPic')[i].src = this.img[i];
                            }
                            // console.log(document.getElementsByClassName('conPic')[1].src);
                            this.imgLeft = window.innerWidth*(-1);
                            $('.conPic').eq(0).css('marginLeft', this.imgLeft + 'px');
                            this.check = 1;
                        }else {
                            $('.conPic').eq(0).css('marginLeft', 0 + 'px');
                            this.check = 1;
                        }   
    
                    }else {
                        console.log("没有这类照片！");             
                    }  
                }
                // if (this.house[val]) {
                    // if(this.house[val].houseType.vrUrl) {
                        this.$emit('checkVR', val, 1);
                    // this.src = this.dataAll[val].houseType.vrUrl;
                    // }else {
                    //     this.$emit('checkVR', val, 1);
                    // }
                // }               
            }
            // console.log(document.getElementsByClassName('conPic')[1].src);

            
        });       
    },
    methods: {
        requestFullScreen() {  
            // let de = document.getElementsByClassName('conPic')[1];  
            // if (de.requestFullscreen) {  
            //     de.requestFullscreen();  
            // } else if (de.mozRequestFullScreen) {  
            //     de.mozRequestFullScreen();  
            // } else if (de.webkitRequestFullScreen) {  
            //     de.webkitRequestFullScreen();  
            // }  
            
            
            $('.conPic').eq(1).click(() => {
                // if (document.exitFullscreen) {  
                //     document.exitFullscreen();  
                // } else if (document.mozCancelFullScreen) {  
                //     document.mozCancelFullScreen();  
                // } else if (document.webkitCancelFullScreen) {  
                //     document.webkitCancelFullScreen();  
                // }  
       
            });
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
                    this.numA--;
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
                        this.nowPage = this.houseSampleRoomsNum;
                    } else {
                        this.nowPage--;
                    }
                    this.name = this.imgSrc[this.nowPage - 1].roomTypeName;
                }else if(this.x < 0 && this.x>window.innerWidth * (-1) && this.endX != 0) {
                    this.numA++;
                    let b = document.getElementsByClassName('conPic')[0];
                    b.style.marginLeft = window.innerWidth * (-2) + 'px';
                    let d = b;
                    b.parentNode.removeChild(b);
                    d.style.marginLeft = 0;
                    let c = document.getElementsByClassName('conPic')[0];
                    c.style.marginLeft = window.innerWidth * (-1) + 'px';
                    let e = document.getElementsByClassName('pic')[0];
                    e.appendChild(d);
                    if (this.nowPage == this.houseSampleRoomsNum) {
                        this.nowPage = 1;
                    } else {
                        this.nowPage++;
                    }
                    this.name = this.imgSrc[this.nowPage - 1].roomTypeName;
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
        touchen() {
            // alert(44);
            if (!this.isFullscreen() && this.img.length > 1) {
                // this.x = this.endX - this.startX;
                if (this.x > 0 && this.x < window.innerWidth ) {
                    // this.numA--;
                    // alert(556);
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
                        this.nowPage = this.houseSampleRoomsNum;
                    } else {
                        this.nowPage--;
                    }
                    this.name = this.imgSrc[this.nowPage - 1].roomTypeName;
                }else if(this.x < 0 && this.x>window.innerWidth * (-1)) {
                    // this.numA++;
                    let b = document.getElementsByClassName('conPic')[0];
                    b.style.marginLeft = window.innerWidth * (-2) + 'px';
                    let d = b;
                    b.parentNode.removeChild(b);
                    d.style.marginLeft = 0;
                    let c = document.getElementsByClassName('conPic')[0];
                    c.style.marginLeft = window.innerWidth * (-1) + 'px';
                    let e = document.getElementsByClassName('pic')[0];
                    e.appendChild(d);
                    if (this.nowPage == this.houseSampleRoomsNum) {
                        this.nowPage = 1;
                    } else {
                        this.nowPage++;
                    }
                    this.name = this.imgSrc[this.nowPage - 1].roomTypeName;
                }
            } else {
                // this.x = this.endX - this.startX;
                // if (this.endX == 0) {
                //     document.getElementsByClassName('conPic')[1].click()
                // }
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
            // let timer = setInterval(() => {
                // if (document.getElementsByClassName('conPic')[1]) {
                //     // document.getElementsByClassName('conPic')[1].onclick = () => {
                //         let img = [];
                //         for (let i = 0; i < this.img.length - 1; i++) {
                //             img[i] = this.img[i + 1];
                //         }
                //         img[this.img.length - 1] = this.img[0];
                //         alert(778);
                //         var agent = navigator.userAgent.toLowerCase();
                //         if (agent.match(/MicroMessenger/i) == "micromessenger") {
                //             // return true;
                //             setTimeout(() => {
                //                 WeixinJSBridge.invoke('imagePreview', {    
                //                     'current': document.getElementsByClassName('conPic')[1].src,
                //                     'urls': img
                //                 }); 
                //             },1000);
                //         } else {
                //             // alert(333);
                //             console.log(document.getElementsByClassName('conPic')[1].src);
                //         }
                //     // };
                // }else if(document.getElementsByClassName('conPic')[0]){
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
                //             console.log(document.getElementsByClassName('conPic')[0].src);
                //         }
                //     // }                   
                // }
            // }, 100);
        }
    }
}
</script>

<style scoped lang="scss">
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';

.content {
    width: 100%;
    height: px2rem(641);
    @include fj();
    flex-direction: column;
    position: relative;
    // position: absolute;
    .pic {
        width: 100%;
        height: px2rem(562);
        // background-color: #fff;
        overflow: hidden;
        // display: flex;
        white-space:nowrap;
        margin: 0 auto;
        img {
            width: 100%;
            height: px2rem(562);
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
        // top: -15px;
        span {
            position: absolute;
            right: px2rem(61);
            @include fontSize(23);
            color: #c9c9c9;
        }
    }
}

</style>
