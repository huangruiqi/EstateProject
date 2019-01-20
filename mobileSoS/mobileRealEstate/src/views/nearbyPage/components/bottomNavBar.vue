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
    // box-shadow: 0px px2rem(11) px2rem(36) px2rem(3) rgba(29, 35, 40, 0.2);
    .choose {
        width: 36.7%;
        height: 59.2%;
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
                @include fontSize(30);
                color: #666666;
            }

        }
        .active {
            a {
                color: #c7ad8b;
            }
        }
        .noActive {
            a {
                color: #666666;
            }
        }
        #around {
            border-right: px2rem(2) solid #c9c9c9;;
        }
    }

}     
</style>
