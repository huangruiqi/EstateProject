<template>
    <div class="bottomNav" id="chooseType">
        <!-- :style="{backgroundColor: bottomNavColor}" -->
        <div class="chooseType" >
            <div class="chooseSmall">
                <div :class="typeClassOne" @click="changePic()" id="typeClass"><router-link to='/houseType/prototype'>样板间</router-link></div>
                <div :class="typeClassTwo" @click="changePicA()" id="typeClassTwo"><router-link to='/houseType/plan'>平面图</router-link></div>
                <div :class="typeClassThree" @click="changePicA()"  id="typeClassThree"><router-link to='/houseType/three'>全景展示</router-link></div>
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
        "typeClassTwo": this.typeClassChangeTwo,
        "typeClassThree": this.typeClassChangeThree,
        "bottomNavColor": this.bottomNavColorChange,
        "house": {}
      }
  },
  created() {
      this.$axios.get("/house/housetype")
            .then(res => {
                this.house = res.data.data;
                if (!this.house[0].houseType.vrUrl) {
                    document.getElementById('typeClassThree').style.display = 'none';
                    document.getElementsByClassName('chooseSmall')[0].style.width = '28%';

                }
            })
            .catch(error => {
            console.log(error);
        });
  },
  mounted() {
        this.$on('change', () => {   
            document.getElementById('typeClassThree').click();
        });
        this.$on('change2', () => {   
            document.getElementById('typeClassTwo').click();
        });
        this.$on('checkVR', (val, cate) => { 
            // console.log(cate);
            if(this.house[val] && !this.house[val].houseType.vrUrl) {
                $('#typeClassThree').css('display', 'none');
                if (cate == 2) {
                // $('#typeClassTwo').click();
                // this.$router.push({path:'/houseType/plan', 
                // });
                // this.$router.push('/houseType/plan');
                }else if (cate == 1) {
                // $('#typeClass').click();
                // this.$router.push({path:'/houseType/protoType', 
                // });
                // this.$router.push('/houseType/protoType');
                }else {
                $('#typeClassTwo').click();
                this.$router.push({path:'/houseType/plan', 
                });    
                // this.$router.push('/houseType/plan');      
                }
                // $('.houseEvery').eq(val).click();
                // this.$router.push('/houseType/plan');
                document.getElementsByClassName('chooseSmall')[0].style.width = '20%';
            }else {
                $('#typeClassThree').css('display', 'flex');
                document.getElementsByClassName('chooseSmall')[0].style.width = '32.06%';
            }
            // alert(val);
            // if(this.house[val].houseType.vrUrl) {
            //     document.getElementById('typeClassThree').style.display = 'block';
            //     document.getElementsByClassName('chooseSmall')[0].style.width = '32.06%';
            // }else {
            //     document.getElementById('typeClassThree').style.display = 'none';
            //     document.getElementsByClassName('chooseSmall')[0].style.width = '20%';
            // }
        });

  },
  methods: {
      //切换图的类型
      changePic() {
          document.getElementById('chooseType').style.display = 'block';
          this.$emit('changeCate');
      },
      changePicA() {
          document.getElementById('chooseType').style.display = 'flex';
          document.getElementsByClassName('chooseType')[0].style.marginLeft = 0;
          document.getElementById('chooseType').style.justifyContent = 'center';
          this.$emit('changeCate');
      }
  },
  props: ['typeClassChange', 'bottomNavColorChange', "typeClassChangeTwo", "typeClassChangeThree"]
}
</script>
<style lang="scss">
@import '../../../../styles/main.scss';
@import '../../../../styles/mixin.scss';

// .bottomNavA {
//     width: 100%;
//     height: vertical(175);
//     @include fj(center);
// }
.bottomNav {
    width: 100%;
    height: vertical(175);
    // background-color: #fff;
    .chooseType {
        width: px2rem(1098);
        height: px2rem(86);
        margin-left: transverse(121);
        @include fj(center);
        // background-color: black;
        .chooseSmall {
            width: 32.06%;
            height: 100%;
            @include fj();
            align-items: flex-end;
            // background-color: white;
            div {
                width: px2rem(90);
                height: px2rem(40);
                @include fj(center);
                align-items: center;
                cursor: pointer;
                a {
                    width: 100%;
                    height: 100%;
                    @include fj(center);
                    align-items: center;
                }
            }
            .noActive {
                border: px2rem(1) solid #fdbAAA;
                background-color: #121212;
                a {
                    @include sc(px2rem(20));
                }
            }
            .noActiveTwo {
                border: px2rem(1) solid #757575;
                a {
                    @include sc(px2rem(20), #757575);
                }
            }
            .active {
                background-color: #FFDAAA;
                border: px2rem(1) solid #121212;
                a {
                    @include sc(px2rem(20), #121212);
                }    
            }
            .activeTwo {
                background-color: #757575;
                border: px2rem(1) solid #757575;
                a {
                    @include sc(px2rem(20), white);
                } 
            }
        }
    }
}     
</style>
