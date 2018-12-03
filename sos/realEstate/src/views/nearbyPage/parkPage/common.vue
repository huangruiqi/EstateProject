<template>
    <div class="content">
        <div class="changePosition">
            <div class="topHouse">
                <img src="../../../assets/img/goHouseHistory/goHistory.png" @click="goHistory()">
            </div>
            <div class="middleHouse">
                <div class="bigPic" :style="{backgroundImage: 'url(' + picUrl + ')'}">

                </div>
                <right @event='getPicUrl' @eventB='checkEffect' :intial=1 ref="rightA"></right>
            </div>
        </div>
        <!-- 传给子组件值 -->
        <bottom :typeClassChange='typeClassChange' :typeClassChangeTwo='typeClassChangeTwo'></bottom>
    </div>
</template>

<script type="text/ecmascript-6">
import bottom from '../components/bottomNavBar';
import right from "../components/rightNavBar";

export default {
    data() {
        return {
            typeClassChangeTwo: "noActive",//传给bottom没有被点击的盒子样式
            typeClassChange: "active",//传给bottom被点击的盒子样式
            picUrl: "",
            houseNum: 0,//户型号
            housePlans: [],
            intial: 1
        }
    },
    mounted(){
        // this.$on('bridge', (val, val2) => {
        //     this.chuFa(val, val2);
        // });
        // this.$on('bridgeTwo', (val) => {
        //     this.$refs.rightA.$emit('changeHouse2', val);
        // });
        // this.shuaXin();
    },
    methods: {
        //点击返回
        goHistory() {
            this.$router.push('/index'); 
        },
        getPicUrl(clickUrl) {
            this.picUrl = clickUrl;
        },
        chuFa(val, val2) {
            this.$refs.rightA.$emit('changeHouse', val, val2);
        },
        checkEffect() {
            document.getElementsByClassName('bigPic')[0].setAttribute('class', 'bigPic complete');
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
        .topHouse {
            width: 100%;
            height: percentage(140 / 905);
            z-index: 1;
            img {
                width: px2rem(57);
                height: px2rem(50);
                margin-top: px2rem(48);
                margin-left: percentage(1503 / 1620);
                cursor: pointer;
            }
        }
        .middleHouse {
            width: 100%;
            height: percentage(765 / 905);
            display: flex;
            align-items: center;
            .bigPic {
                width: px2rem(1098);
                height: 100%;
                margin-left: transverse(121);
                border: px2rem(2) solid $colorAll;
                background-repeat: no-repeat;
                background-size: percentage(1094 / 1098) percentage(761 / 765);
                filter: blur(4px);
                transition: all 0.7s;
            }
            .complete {
                filter: blur(0);
            }  
        }
    }
}

</style>
