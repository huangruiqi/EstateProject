<template> 
  <div class="contactPage" @click='haveCon'>
      <span>我有意向</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'contact',
    data() {
        return {

        }
    },
    components: {

    },
    methods: {
        haveCon() {
            this.$emit('haveCon');
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";
.contactPage {
    width: px2rem(80);
    height: px2rem(214);
    position: absolute;
    bottom: px2rem(40);
    right: px2rem(0);
	background-color: rgba(199, 173, 140, 0.9);
    // padding-top: px2rem(32);
    // padding-left: px2rem(27);
    @include fj(center);
    align-items: center;
    z-index: 10000;
    cursor: pointer;
    span {
        display: block;
        width: px2rem(30);
        height: px2rem(155);
        @include sc(px2rem(30), #333333);
        line-height: px2rem(40);
    }
}
.contactPage:hover {
    span {
        @include sc(px2rem(30), #ffffff);
    }
}
.contactPage:active {
    background-color: rgba(179,159,132,0.9);
    span {
        @include sc(px2rem(30), #ffffff);
    }
}
</style>
