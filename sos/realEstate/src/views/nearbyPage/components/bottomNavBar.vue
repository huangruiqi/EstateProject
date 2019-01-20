<template>
    <div class="bottomNav" >
        <!-- :style="{backgroundColor: bottomNavColor}" -->
        <div class="chooseType">
            <div class="chooseSmall">
                <div :class="typeClassOne"><router-link to='/nearBy/park/common'>公共设施</router-link></div>
                <div :class="typeClassTwo"><router-link to='/nearBy/park/parkView'>园林美景</router-link></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'bottomNavBar',
  data() {
      return {
        "typeClassOne": this.typeClassChange,
        "typeClassTwo": this.typeClassChangeTwo
      }
  },
  mounted() {

  },
  methods: {
      
  },
  props: ['typeClassChange', "typeClassChangeTwo"]
}
</script>
<style lang="scss" scoped>
@import '../../../styles/main.scss';
@import '../../../styles/mixin.scss';
.bottomNav {
    width: 100%;
    height: vertical(175);
    // @include fj(center);
    margin-left: transverse(95);
    // background-color: #fff;
    .chooseType {
        width: px2rem(1098);
        height: px2rem(84);
        margin-top: px2rem(56);
        // margin-left: transverse(121);
        // @include fj(center);
        // background-color: black;
        .chooseSmall {
            // width: 32.06%;
            height: 100%;
            // @include fj();
            // align-items: flex-end;
            // background-color: white;
            div {
                float: left;
                width: px2rem(180);
                height: px2rem(63);
                @include fj(center);
                align-items: center;
                cursor: pointer;
                // background-color: #c1c1c1;
	            border: solid px2rem(2) #666666;
                margin-left: px2rem(123);
                a {
                    width: 100%;
                    height: 100%;
                    @include fj(center);
                    align-items: center;
                }
            }
            div:first-of-type {
                margin-left: 0;
            }
            .noActive {
                border: solid px2rem(2) #666666;
                // background-color: #c1c1c1;
                a {
                    @include sc(px2rem(30), #666666);
                    text-decoration: none;
                }
            }
            .noActiveTwo {
                border: solid px2rem(2) #666666;
                // background-color: #c1c1c1;
                a {
                    @include sc(px2rem(30), #666666);
                    text-decoration: none;
                }
            }
            .active {
                background-color: #c7ad8c;
                // border: px2rem(1) solid #121212;
                border: px2rem(1) solid #c7ad8c;
                a {
                    @include sc(px2rem(30), white);
                    text-decoration: none;
                }    
            }
            .activeTwo {
                background-color: #c7ad8c;
                border: px2rem(1) solid #c7ad8c;
                // border: px2rem(1) solid #757575;
                a {
                    @include sc(px2rem(30), white);
                    text-decoration: none;
                } 
            }
        }
    }
}      
</style>
