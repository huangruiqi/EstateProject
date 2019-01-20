<template>
  <div class="top">
      <span class="index" @click="go()">首页</span>
      <span class="haveCon">我有意向></span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    go() {
        this.$router.push('/index');
    },
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/main.scss';
@import '../../styles/mixin.scss';
.top {
    width: 100%;
    height: 100%;
    padding-left: px2rem(45);
    padding-right: px2rem(45);
    @include fj();
    align-items: flex-end;
    span {
        @include sc(px2rem(30), #333333);
        line-height: px2rem(32);
    }
}

</style>
