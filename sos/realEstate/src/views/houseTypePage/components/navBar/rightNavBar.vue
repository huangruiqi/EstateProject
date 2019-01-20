<template>
    <div class="rightNavBar" >
        <div class="rightOnly" v-for="m in numRight">
            <div class="rightContent" @click="changeDivClass(m)">
                <div :class="click == m ? addArrowRight : arrowRight "></div>
                <div :class="click == m ? addSmallRight : smallRight ">
                    <img class="imgRight" v-if="imgSrc[m - 1]" :src="mini[m - 1]" alt="">
                    <div class="floatWords" v-if="imgSrc[m - 1]">
                        {{imgSrc[m - 1].roomTypeName}}样板间
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import no from '../../../../assets/img/no.jpg'
import getImage from '../../../../ultis/getImage.js'
export default {
    name: 'rightNavBar',
    data() {
        return {
            numRight: 4,//判断有几个样板间图
            click: 1,//用来判断是否被点击
            imgSrc: [],//获取图片地址
            addArrowRight: 'addArrowRight',//被点击样式
            arrowRight: 'arrowRight',//未被点击样式
            addSmallRight: 'addSmallRight',//被点击样式
            smallRight: 'smallRight',//未被点击样式
            clickUrl: "",//获取被点击的url
            dataAll: [],
            houseNum: 0,
            that: {},
            title: [],
            mini: []
        }
    },
    created() {
        this.$axios.get("/house/houseType/get")
        .then(res => {
            this.title = res.data.data;
            if(this.title[0]) {
                this.$axios.get("/house/sampleRoomImage/get?houseTypeId=" + this.title[0].id)
                .then(res => {           
                    this.dataAll = res.data.data;
                    if (this.dataAll && this.dataAll[0]) {
                        this.dataAll.forEach((data) => {
                            this.imgSrc.push(data);
                            this.mini.push(getImage(data.sampleRoomImageLocation, 5));
                        });
                        this.numRight = this.dataAll.length;
                        this.clickUrl = this.imgSrc[0].sampleRoomImageLocation;
                        this.$emit('event', this.clickUrl);
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
    mounted() {
        if (this.intial == 1) {
            //让父组件触发
            this.$on('changeHouse', (val, val2) => {
                if (this.houseNum != val && this.title[val]) {
                    this.houseNum = val;
                    this.$axios.get("/house/sampleRoomImage/get?houseTypeId=" + this.title[val].id)
                    .then(res => {           
                        this.dataAll = res.data.data;
                        this.imgSrc = [];
                        this.mini = [];
                        if (this.dataAll && this.dataAll[0]) {
                            this.dataAll.forEach((data) => {
                                this.imgSrc.push(data);
                                this.mini.push(getImage(data.sampleRoomImageLocation, 5));
                            });
                            this.numRight = this.dataAll.length;
                            this.clickUrl = this.imgSrc[0].sampleRoomImageLocation;
                            this.$emit('event', this.clickUrl);
                            this.$emit('haha');
                            this.changeDivClass(1);
                            this.$forceUpdate();//强制渲染
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            });
            //由bottom触发源
            this.$on('changeHouse2', (val) => {    
                if (this.houseNum != val && this.title[val]) {
                    this.houseNum = val;
                    this.$axios.get("/house/sampleRoomImage/get?houseTypeId=" + this.title[val].id)
                    .then(res => {           
                        this.dataAll = res.data.data;
                        this.imgSrc = [];
                        this.mini = [];
                        if (this.dataAll && this.dataAll[0]) {
                            this.dataAll.forEach((data) => {
                                this.imgSrc.push(data);
                                this.mini.push(getImage(data.sampleRoomImageLocation, 5));
                            });
                            this.numRight = this.dataAll.length;
                            this.clickUrl = this.imgSrc[0].sampleRoomImageLocation;
                            this.$emit('event', this.clickUrl);
                            this.$emit('haha');
                            // this.changeDivClass(1);
                            this.$forceUpdate();//强制渲染
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                }
            });
        }
    },
    methods: {
        //点击右边的框，样式发生变化
        changeDivClass(m) {
            this.click = m;
            this.clickUrl = this.imgSrc[m - 1].sampleRoomImageLocation;
            this.$emit('event', this.clickUrl);
        }
        //让大图变清晰
        // checkEffect() {
        //     that.$emit('eventB');
        //     that.clickUrl = imgUrl[0];
        //     that.$emit('event', this.clickUrl);
        // }
    },
    watch: {
        dataAll() {
            if (this.imgSrc && this.imgSrc[0]) {
                this.clickUrl = this.imgSrc[0].sampleRoomImageLocation;
                this.$emit('event', this.clickUrl);
            }
        },
        //进行模糊渲染
        imgSrc() {
            let that = this;
            let ele = document.getElementsByTagName('img');
            let imgUrl = [];
            let imgObject = [];
            for (let i = 0; i < this.imgSrc.length; i++) {
                if (screen.width > 1024){
                    imgUrl[i] = getImage(this.imgSrc[i].sampleRoomImageLocation, 1);
                }else {
                    imgUrl[i] = getImage(this.imgSrc[i].sampleRoomImageLocation, 2);
                }  
                // imgUrl[i] = this.imgSrc[i].houseTypeImage.image.fileName;
                imgObject[i] = new Image();
                imgObject[i].src = imgUrl[i];
            }

            for (let i = 0; i < this.imgSrc.length; i++) {
                imgObject[i].onload = function () {
                    imgUrl[i] ? ele[i + 2].src = imgUrl[i] : "";
                    ele[i + 2].setAttribute('class', 'imgRight complete');
                    if (i == 0) {
                        that.$emit('eventB');
                        // that.clickUrl = imgUrl[0];
                        // that.$emit('event', this.clickUrl);
                    }
                }
            }
        }
    },
    props: ['intial']
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/main.scss';
@import '../../../../styles/mixin.scss';
//适配平板
@media screen and (min-width: 1025px) {
    .floatWords {
        width: 100%;
        height: px2rem(32);
        background-color: #151515;
        opacity: 0.61;
        transform: translateY(-100%);
        @include fj(center);
        align-items: flex-start;
        @include sc(px2rem(19), white);
    }
}
@media screen and (max-width: 1024px) {
    .floatWords {
        width: 100%;
        height: px2rem(32);
        background-color: #151515;
        opacity: 0.61;
        transform: translateY(-100%);
        @include fj(center);
        align-items: flex-start;
        @include sc(px2rem(19), white);
    }
}
// ::-webkit-scrollbar-button:vertical:single-button:start {
//     width: 100%;
//     background: url("../../../../assets/img/top.png") -1.5px -1px no-repeat;
//     cursor: pointer;
//     border-bottom: 1px solid #1E1E1E;

//   }
// ::-webkit-scrollbar-button:vertical:single-button:end {
//     width: 100%;
//     background: url("../../../../assets/img/bottom.png") -1.5px -1px no-repeat;

//     cursor: pointer;
//     border-top: 1px solid #1E1E1E;

//   }
.rightNavBar{
    width: px2rem(304);
    height: px2rem(608);
    float: left;
    margin-left: px2rem(2);
    overflow: scroll;
    overflow-x: hidden;
    @include scrollBar;
    z-index: 1000;
    // background-color: black;
    height: 100%;
    .rightOnly {
        width: 100%;
        height: px2rem(185);
        @include fj();
        align-items: flex-start;
        cursor: pointer;
        .rightContent {
            width: 100%;
            height: px2rem(158);
            display: flex;
            align-items: center;
            .arrowRight {
                width: px2rem(36);
                height: px2rem(36);
                border: px2rem(18) solid transparent;
                border-right-color: transparent;
            }
            .addArrowRight {
                width: px2rem(36);
                height: px2rem(36);
                border: px2rem(18) solid transparent;
                border-right-color: white;
            }
            .smallRight {
                height: 100%;
                width: px2rem(235);
                border: px2rem(6) solid transparent;
                
                .imgRight {
                    width: 100%;
                    height: 100%;
                    filter: blur(4px);
                    transition: all 0.7s;
                }
                .complete {
                    filter: blur(0);
                }
            }
            .addSmallRight {
                height: 100%;
                width: px2rem(235);
                border: px2rem(6) solid white;
                .imgRight {
                    width: 100%;
                    height: 100%;
                    filter: blur(4px);
                    transition: all 0.7s;
                }
                .complete {
                    filter: blur(0);
                }               
            }
        }
    }
}
// .complete {
//   filter: blur(0);
// }
</style>
