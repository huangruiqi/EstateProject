<template>
    <div id="leftNavBar">
        <div class="leftLogo">
            <img src="@/assets/img/leftNav/logo.png" alt="">
        </div>
        <div id="leftWorld">
            <router-link tag="div" v-for="(word, index) in words" :key="index" :to="word.toUrl" >
            {{ word.name }}
            </router-link>
        </div>
        <div class="leftEat">
            <!-- <img src="@/assets/img/leftNav/eat.png" alt=""> -->
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
            words: [],
            changeIndex: 1
        }
    }, 
    created() {
        this.$axios.get("/bootpage")
        .then(res => {
        })
        .catch(error => {
            console.log(error);
        });
        this.$axios.get("/landscape/images")
        .then(res => {
            this.words = res.data.data;
            console.log( this.words);
        })
        .catch(error => {
            console.log(error);
        });
    },
    methods: {
        changeColor: function (index) {
            this.changeIndex = index;
            this.$emit('ievent', index, this.intial);
        }
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
    background-color: #121212;
    border-right: px2rem(2) solid #c79f62;
    .leftLogo {
        width: 100%;
        height: px2rem(259);
        @include fj(center);
        align-items: flex-end;
        img {
            width: px2rem(157);
            height: px2rem(172);
        }
    }
    #leftWorld {
        width: 100%;
        height: vertical(380);
        margin-top: px2rem(106);
        @include fj(flex-start);
        flex-direction: column;
        align-items: center;
        border-top: px2rem(2) solid #c79f62;
        div {
            width: 100%;
            height: px2rem(82);
            border-bottom: px2rem(2) solid #c79f62;
            text-align: center;
            @include fj(center);
            align-items: center;
            cursor: pointer;
            @include sc(px2rem(30));
        }
        .router-link-active {
            background-color: #ffdaaa;
            color: #121212;
        }
        .changeColor{
            background-color: #ffdaaa;
            color: #121212;
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
