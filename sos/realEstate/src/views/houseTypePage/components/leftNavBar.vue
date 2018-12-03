<template>
    <div id="leftNavBar">
        <div class="leftLogo">
            <img src="../../../assets/img/leftNav/logo.png" alt="">
        </div>
        <div id="leftWorld">
            <div name='houseTypeChoose' v-for="(world,index) in worlds" :key="index" @click="changeColor(index)" :class="[{changeColor: index==changeIndex}]" >
                户型{{numHanzi[index]}}
            </div>
        </div>
        <div class="leftEat">
            <!-- <img src="../../../assets/img/leftNav/eat.png" alt=""> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
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
            numHanzi: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八"]
        }
    }, 
    created() {
        this.$axios.get("/house/housetype")
        .then(res => {
        })
        .catch(error => {
        console.log(error);
        });
        this.$axios.get("/house/housetype")
        .then(res => {
            this.worlds = res.data.data;
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
            },100);
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
    background-color: #121212;
    border-right: px2rem(2) solid #c79f62;
    .leftLogo {
        width: 100%;
        height: px2rem(274);
        @include fj(center);
        align-items: flex-end;
        img {
            width: px2rem(167);
            height: px2rem(180);
        }
    }
    #leftWorld {
        width: 100%;
        height: vertical(500);
        // background-color: #fff;
        @include fj(space-around);
        flex-direction: column;
        align-items: center;
        div {
            width: px2rem(180);
            height: px2rem(60);
            border: 0.05rem solid #c79f62;
            text-align: center;
            @include sc(px2rem(30));
            @include fj(center);
            align-items: center;
            cursor: pointer;
        }
        .changeColor{
            background-color: #ffdaaa;
            color: #121212;
            >img{
                background-image: url();
            }
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
