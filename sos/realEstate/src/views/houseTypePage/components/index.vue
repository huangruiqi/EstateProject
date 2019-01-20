<template>
  <div id="houseType">
      <div class="leftContent">
        <left-nav  @ievent='getHouseNum' @eventC='getHouseNumTwo' ref="left"></left-nav>
      </div>
      <div class="rightContent">
        <router-view @changeCate='changeCate' @haha='haha' :intial='intial' ref="house"/>
      </div>
  </div>
</template>
<script>

import leftNav from './leftNavBar';

export default {
  name: 'houseType',
  data() {
    return {
      houseNum: 0,
      intial: 1
    }
  },
  methods: {
    //获取户型
    getHouseNum(index, intial) {
      this.$refs.house.$emit('bridge', index, intial);
    },
    getHouseNumTwo(index) {
      this.$refs.house.$emit('bridgeTwo', index);
    },
    //初始有边框
    changeCate() {

      this.$refs.left.$emit('changeCate');
    },
    haha() {
      this.$refs.left.$emit('haha');
    }
  },
  components: {
    leftNav
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
@import '../../../styles/common.scss';

#houseType{
  width: 100%;
  height: 100%;
  display: flex;
  .leftContent {
    width: transverse(260);
    height: 100%;
  }
  .rightContent {
    width: transverse(1920 - 260);
    height: 100%;
  }
}
</style>
