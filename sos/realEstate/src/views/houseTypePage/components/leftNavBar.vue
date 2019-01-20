<template>
    <div id="leftNavBar">
        <div class="leftLogo">
            <img :src="imgLogo" alt=""/>
        </div>
        <div id="leftWorld">
            <div name='houseTypeChoose' v-for="(world,index) in worlds" :key="index" @click="changeColor(index)" :class="[{changeColor: index==changeIndex}]" >
                {{world.houseTypeName}}
            </div>
        </div>
        <div class="leftEat">
            <!-- <img src="../../../assets/img/leftNav/eat.png" alt=""> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import getImage from '../../../ultis/getImage.js'
    export default {
    name: 'leftNavBar',
    data() {
        return{
            logo: '',
            eat: '',
            worlds: [],
            irrow: '',
            irrow1: '',
            irrow2: '',
            Num: 0,
            changeIndex: 0,
            leftBottom: 'leftBottom',
            intial: 1,//为点击一次户型使得有边框在0上
            houseNum: 0,
            imgLogo: "",
            numHanzi: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八"]
        }
    }, 
    created() {
        this.$axios.get("/basic/guidePage/get")
        .then((res) => {
        
            res.data.data && res.data.data.projectLogoLocation ? this.imgLogo = getImage(res.data.data.projectLogoLocation, 1) : "";
            // console.log(this.imgLogo);
        })
        .catch(error => {
            console.log(error);
        });
        this.$axios.get("/house/houseType/get")
        .then(res => {
            this.worlds = res.data.data.reverse();
        })
        .catch(error => {
            console.log(error);
        });
    },
    mounted() {
        this.$on('haha', () => {
            let houseTypeChoose = document.getElementsByName('houseTypeChoose');
            for (let i = 0; i < houseTypeChoose.length; i++) {
                if (houseTypeChoose[i].className == 'changeColor') {
                    this.houseNum = i;
                    this.$emit('eventC', this.houseNum);
                }
            }
        });
    },
    methods: {
        changeColor: function (index) {
            this.changeIndex = index;
            this.irrow = this.irrow1;
            this.irrow1 = this.irrow2;
            this.irrow2 = this.irrow;
            this.$emit('ievent', index, this.intial);
        },
        //随时监控左边栏的位置
        watch() {
            let timer = setInterval(() => {
                let houseTypeChoose = document.getElementsByName('houseTypeChoose');
                for (let i = 0; i < houseTypeChoose.length; i++) {
                    if (houseTypeChoose[i].className == 'changeColor') {
                        this.houseNum = i;
                        this.$emit('eventC', this.houseNum);
                    }
                }
            }, 0);
        }
    },  
    watch: {
        worlds() {
            this.Num = this.worlds.length-1;
            this.watch();
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
@import '../../../styles/common.scss';

#leftNavBar {
    width: 100%;
    height: 100%;
    background-color: white;
    .leftLogo {
        width: 100%;
        height: px2rem(223);
        @include fj(center);
        align-items: flex-end;
        img {
            width: px2rem(179);
        }
    }
    #leftWorld {
        width: 100%;
        margin-top: px2rem(110);
        height: vertical(500);
        // background-color: #fff;
        // @include fj(space-around);
        // flex-direction: column;
        // align-items: center;
        overflow-x: hidden;
        overflow-y: scroll;
        @include scrollBarTwo();
        div {
            width: 100%;
            height: px2rem(110);
            text-align: center;
            @include sc(px2rem(36), #666666);
            @include fj(center);
            align-items: center;
            cursor: pointer;
            margin-top: 0;
        }
        .changeColor{
            background-color:  #c7ad8c;
            color: white;
            >img{
                background-image: url();
            }
        }
        >div:hover {
            background-color: #dfc29d;
            color: white;
        }
        >div:active {
            background-color: #c1a077;
            color: white;
        }
    }
    .leftEat{
        width: 100%;
        height: px2rem(195);
        @include fj(center);
        align-items: center;
        img{
            width: px2rem(106);
            cursor: pointer;
        }
    }
}
</style>
