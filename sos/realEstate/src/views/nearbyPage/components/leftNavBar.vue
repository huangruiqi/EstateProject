<template>
    <div id="leftNavBar">
        <div class="leftLogo">
            <img :src="imgLogo" alt=""/>
        </div>
        <div id="leftWorld">
            <router-link tag="div" @mouseover.native="hover" v-for="(word, index) in words" :key="index" :to="word.toUrl" >
            {{ word.name }}
            </router-link>
        </div>
        <div class="leftEat">
            <!-- <img src="@/assets/img/leftNav/eat.png" alt=""> -->
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
            words: [
                {
                    name: '园林景观',
                    toUrl: '/nearBy/park'
                },
                {
                    name: '周边设施',
                    toUrl: '/nearBy/neighberhood'
                }
            ],
            changeIndex: 1,
            imgLogo: ""
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
        // this.$axios.get("/landscape/images")
        // .then(res => {
        //     this.words = res.data.data;
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    },
    methods: {
        changeColor: function (index) {
            this.changeIndex = index;
            this.$emit('ievent', index, this.intial);
        },
    },
    watch: {

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
        div {
            width: 100%;
            height: px2rem(110);
            text-align: center;
            @include fj(center);
            @include sc(px2rem(36), #666666);
            align-items: center;
            cursor: pointer;
        }
        .router-link-active {
            background-color: #c7ad8c;
            color: white;
        }
        .changeColor{
            background-color: #c7ad8c;
            color: white;
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
