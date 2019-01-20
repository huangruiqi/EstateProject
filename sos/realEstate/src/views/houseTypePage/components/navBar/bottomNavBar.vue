<template>
    <div class="bottomNav" id="chooseType">
        <!-- :style="{backgroundColor: bottomNavColor}" -->
        <div class="chooseType" >
            <div class="chooseSmall">
                <div :class="typeClassOne"  id="typeClass" :style="{display: vrDisplay}"><router-link to='/houseType/prototype'>样板间</router-link></div>
                <div :class="typeClassTwo"  id="typeClassTwo" :style="{display: vrDisplay}"><router-link to='/houseType/plan'>平面图</router-link></div>
                <div :class="typeClassThree"  id="typeClassThree" :style="{display: vrDisplay}"><router-link to='/houseType/three'>全景展示</router-link></div>
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
        "house": {},
        "vrDisplay": "none"
      }
  },
  created() {
        this.$axios.get("/house/houseType/get")
        .then(res => {
            this.house = res.data.data;
        //     if (!this.house[0].houseTypeVrUrl) {
        //         document.getElementById('typeClassThree').style.display = 'none';
        //         document.getElementsByClassName('chooseSmall')[0].style.width = '20%';
        //     }
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
            if(this.house[val] && this.house[val].houseTypeVrUrl) {
                $('#typeClassThree').css('display', 'flex');
                $('#typeClassTwo').css('display', 'flex');
                $('#typeClass').css('display', 'flex');
                // document.getElementsByClassName('chooseSmall')[0].style.width = '32.06%';
            }else if (this.house[val] && !this.house[val].houseTypeVrUrl) {
                if (cate == 2) {

                }else if (cate == 1) {

                }else {
                    $('#typeClassTwo').click();
                    this.$router.push({
                        name:'plan',
                        params: {
                            houseNum: val
                        }
                    });  
                }
                $('#typeClassTwo').css('display', 'flex');
                $('#typeClass').css('display', 'flex');
                $('#typeClassThree').css('display', 'none');
                // document.getElementsByClassName('chooseSmall')[0].style.width = '20%';
            }
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
