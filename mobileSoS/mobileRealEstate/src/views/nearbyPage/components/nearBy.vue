<template>
  <div id="nearType">
    <div class="header">
      <router-view/>
      <!-- <img src="../../../assets/img/goHouseHistory/goHistory.png" alt=""> -->
    </div>
    <!-- <div class="middle">
      <router-view/>
    </div> -->
    <div class="bottom">
      <bottom></bottom>
    </div>
      <!-- <div class="leftContent">
        <left-nav></left-nav>
      </div>
      <div class="rightContent">
        <router-view  ref="park"/>
      </div> -->

  </div>
</template>
<script>
import bottom from './bottomNavBar';

export default {
  name: 'nearBy',
  data() {
    return {
      nearNum: 0
    }
  },
  methods: {
    
  },
  components: {
    bottom
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
@import '../../../styles/common.scss';

#nearType{
  width: 100%;
  height: 100%;
  // background-color: #202020;
  @include fj(space-between);
  flex-direction: column;
  align-items: center;
  .header {
    width: 100%;
    // flex: 1;
    height: 92.2%;
    position: relative;
    // img {
    //   width: px2rem(64);
    //   height: px2rem(64);
    //   position: absolute;
    //   top: px2rem(29);
    //   right: px2rem(27);
    // }
  }
  // .middle {
  //   width: 100%;
  //   height: px2rem(641);
  //   background-color: #fff;
  // }
  .bottom {
 
    width: 100%;
    height: 7.8%;
    background-color: #ffffff;
    box-shadow: 0px px2rem(11) px2rem(36) px2rem(3) rgba(29, 35, 40, 0.2);
    z-index: 1;
  }
}
</style>
