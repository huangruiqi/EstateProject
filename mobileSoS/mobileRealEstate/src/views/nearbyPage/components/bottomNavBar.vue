<template>
    <div class="bottomNav" >
        <!-- :style="{backgroundColor: bottomNavColor}" -->
        <!-- <div class="chooseType">
            <div class="chooseSmall">
                <div :class="typeClassOne"><router-link to='/nearBy/park/common'>公共设施</router-link></div>
                <div :class="typeClassTwo"><router-link to='/nearBy/park/parkView'>园林美景</router-link></div>
            </div>
        </div> -->
        <div class="choose">
            <div id="around" :class="typeClassOne" @click="changeOne">
                <router-link to='/nearBy/park/around' >周边设施</router-link>
            </div>
            <div :class="typeClassTwo" @click="changeTwo">
                <router-link to='/nearBy/park/parkView' >园林美景</router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'bottomNavBar',
  data() {
      return {
        "typeClassOne": "active",
        "typeClassTwo": "noActive"
      }
  },
  mounted() {
      if (this.$route.path == '/nearBy/park/around') {
          this.typeClassOne = 'active';
          this.typeClassTwo = 'noActive';
      }else if (this.$route.path == '/nearBy/park/parkView') {
          this.typeClassOne = 'npActive';
          this.typeClassTwo = 'active';
      }
  },
  methods: {
      changeOne() {
          this.typeClassOne = "active";
          this.typeClassTwo = "noActive";
      },
      changeTwo() {
          this.typeClassTwo = "active";
          this.typeClassOne = "noActive";
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.bottomNav {
    width: 100%;
    height: 100%;
    @include fj(center);
    align-items: center;
    .choose {
        width: px2rem(350);
        height: px2rem(40);
        // background-color: red;
        @include fj();
        div {
            width: 50%;
            height: 100%;
            // background-color: blue;
            @include fj(center);
            align-items: center;
            cursor: pointer;
            a {
                @include fontSize(28);
                color: white;
            }

        }
        .active {
            a {
                color: #ffdaaa;
            }
        }
        .noActive {
            a {
                color: white;
            }
        }
        #around {
            border-right: px2rem(2) solid #c9c9c9;;
        }
    }
    // .chooseType {
    //     width: px2rem(1098);
    //     height: px2rem(86);
    //     margin-left: transverse(121);
    //     @include fj(center);
    //     .chooseSmall {
    //         width: px2rem(250);
    //         height: 100%;
    //         @include fj();
    //         align-items: flex-end;
    //         div {
    //             width: px2rem(110);
    //             height: px2rem(40);
    //             @include fj(center);
    //             align-items: center;
    //             cursor: pointer;
    //         }
    //         .noActive {
    //             border: px2rem(1) solid #fdbAAA;
    //             background-color: #121212;
    //             a {
    //                 @include sc(px2rem(20));
    //             }
    //         }
    //         .active {
    //             background-color: #FFDAAA;
    //             border: px2rem(1) solid #121212;
    //             a {
    //                 @include sc(px2rem(20), #121212);
    //             }    
    //         }
    //     }
    // }
}     
</style>
