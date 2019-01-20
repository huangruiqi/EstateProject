<template>
    <div class="contentPage" >
        <div class="info" :style='{display: infoDisplay}'>
            <div class="close">
                <img src='../../assets/img/default/close.png' @click='closeInfo'/>
            </div>
            
            <div class="allInfo">
                <div class="companyInfo">
                    <span>
                        {{qrWord}}
                    </span>
                    <div>
                        <img :src='qrCode'/>
                    </div>
                    <span>客服电话：{{qrTel}}</span>
                </div>
                <div class="customerInfo">
                    <img src='../../assets/img/default/must.png'/>
                    <table border="0">
                        <tr>
                            <td><span>电话：</span></td>
                            <td><input class="tel con" v-model="tel" placeholder="请输入您的手机号"/></td>
                        </tr>
                        <tr>
                            <td><span>价格：</span></td>
                            <td>
                                <div class="price con"  @click='priceDis'>
                                    {{selectPrice}}
                                    <span :style='{display: placeholder}'>请选择理想价位</span>
                                    <img src='../../assets/img/default/down.png'/>
                                </div>
                                <div class="priceSelect" :style='{display: priceDisplay}'>
                                    <li @click="getPrice">1万元以下/平</li>
                                    <li @click="getPrice">1.0-1.5万元/平</li>
                                    <li @click="getPrice">1.5-2.0万元/平</li>
                                    <li @click="getPrice">2.0-2.5万元/平</li>
                                    <li @click="getPrice">2.5-3.0万元/平</li>
                                    <li @click="getPrice">3.0-3.5万元/平</li>
                                    <li @click="getPrice">3.5-4.0万元/平</li>
                                    <li @click="getPrice">4.0-4.5万元/平</li>
                                    <li @click="getPrice">4.5-5.0万元/平</li>
                                    <li @click="getPrice">5万元以上/平</li>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><span>户型：</span></td>
                            <td class="house">
                                <div class="houseType">
                                    <li><input class="houseContent" type="checkbox" @click='selectHouse(0)' value="一居室"/>&nbsp;&nbsp;<span>一居室</span></li>
                                    <li><input class="houseContent" type="checkbox" @click='selectHouse(1)' value="二居室"/>&nbsp;&nbsp;<span>二居室</span></li>
                                    <li><input class="houseContent" type="checkbox" @click='selectHouse(2)' value="三居室"/>&nbsp;&nbsp;<span>三居室</span></li>
                                    <li><input class="houseContent" type="checkbox" @click='selectHouse(3)' value="四居室"/>&nbsp;&nbsp;<span>四居室</span></li>
                                    <li><input class="houseContent" type="checkbox" @click='selectHouse(4)' value="五居室"/>&nbsp;&nbsp;<span>五居室</span></li>
                                    <li><input class="houseContent" type="checkbox" @click='selectHouse(5)' value="五居室以上"/>&nbsp;&nbsp;<span>五居室以上</span></li>
                                </div>
                            </td>
                        </tr>
                    </table>
                    <div class="submit" @click='infoSubmit'>
                        提交
                    </div>
                </div>
            </div>

        </div>
        <div class="success" :style='{display: successDisplay}'>
            <img :src='imgSub'/>
            {{infoSub}}
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import getImage from '../../ultis/getImage.js'
import success from '../../assets/img/default/success.png'
import fail from '../../assets/img/default/fail.png'
export default {
  data() {
    return {
        selectPrice: '',
        priceDisplay: 'none',
        checkPrice: 0,
        qrWord: '',
        qrCode: '',
        qrTel: '',
        tel: '',
        houseType: '',
        proName:'',
        infoDisplay: 'block',
        infoSub: '',
        successDisplay: 'none',
        imgSub: success,
        placeholder: 'block',
        code: ''
    }
  },
  components: {

  },
  created() {
      this.$axios.post('/manage/concurrentProject/get').then((res) => {
          this.id = res.data.data;
          this.$axios.get('/manage/project/get').then((respond) => {
              respond.data.data.forEach(data => {
                  if (data.id == res.data.data) {
                      this.code = data.projectIdentification;
                      this.qrWord = data.qrDescription;
                      this.qrTel = data.customerPhone;
                      this.qrCode = getImage(data.qrCode, 1);
                      this.proName = data.projectName;
                  }
              });
          }).catch(err => {
              console.log(err);
          });
      }).catch((err) => {
          console.log(err);
      });
  },
  methods: {
      closeInfo() {
          this.$emit('closeInfo');
      },
      //选择户型
      selectHouse(i) {
        const houseType = document.getElementsByClassName('houseType')[0];
        if (houseType.getElementsByClassName('houseContent')[i].checked) {
            houseType.getElementsByTagName('li')[i].style = 'color: #c7ad8c';
        } else {
            houseType.getElementsByTagName('li')[i].style = 'color: #999999';
        }
      },
      priceDis() {
          if (this.priceDisplay == 'block') {
              this.priceDisplay = 'none';
          } else {
              this.priceDisplay = 'block';
          }
      },
      getPrice(e) {
          this.selectPrice = e.target.innerHTML;
          this.priceDisplay = 'none';
          this.$forceUpdate();
      },
      infoSubmit() {
        this.houseType = '';
        const houseType = document.getElementsByClassName('houseType')[0];
        const houseContent = houseType.getElementsByClassName('houseContent');
        for (let i = 0; i < houseContent.length; i++) {
            if(houseContent[i].checked) {
                this.houseType += houseType.getElementsByTagName('span')[i].innerHTML + '&';
            }
        }
        if (this.tel) {
            let formdata = new FormData();
            formdata.append('item_code', this.code);
            formdata.append('item_name', this.proName);
            formdata.append('customer_phone', this.tel);
            formdata.append('customer_price', this.selectPrice);
            formdata.append('house_type', this.houseType);
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'  
                        }
                    }
            this.$axios.post('https://xymind.net:3000/api/sales_management/customer_information', formdata, config).then((res) => {
                if (res.data.status == 200) {
                    this.infoDisplay = 'none';
                    this.infoSub = '提交成功'
                    this.successDisplay = 'flex';
                    this.$forceUpdate();
                    this.imgSub = success;
                    setTimeout(() => {
                        this.tel = '';
                        this.infoDisplay = 'block';
                        this.successDisplay = 'none';
                        this.$emit('closeInfo');
                    }, 3000);
                } else {
                    this.infoDisplay = 'none';
                    this.infoSub = '提交失败';
                    this.successDisplay = 'flex';
                    this.$forceUpdate();
                    this.imgSub = fail;
                    setTimeout(() => {
                        this.tel = '';
                        this.infoDisplay = 'block';
                        this.successDisplay = 'none';
                        this.$emit('closeInfo');
                    }, 3000);
                }
            }).catch((err) => {
                // alert('提交失败!');
                this.infoDisplay = 'none';
                this.infoSub = '提交失败';
                this.successDisplay = 'flex';
                this.$forceUpdate();
                this.imgSub = fail;
                setTimeout(() => {
                        this.tel = '';
                        this.infoDisplay = 'block';
                        this.successDisplay = 'none';
                        this.$emit('closeInfo');
                    }, 3000);
            });
        } else {
                this.infoDisplay = 'none';
                this.infoSub = '提交失败';
                this.successDisplay = 'flex';
                this.$forceUpdate();
                this.imgSub = fail;
                setTimeout(() => {
                        this.tel = '';
                        this.infoDisplay = 'block';
                        this.successDisplay = 'none';
                        this.$emit('closeInfo');
                    }, 3000);
        }
        
      }
  },
  watch: {
      selectPrice(value) {
          if(value) {
              this.placeholder = 'none';
          } else {
              this.placeholder = 'block';
          }
      }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/main";
@import "../../styles/common";
@import "../../styles/mixin";
.contentPage {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.43);
    @include fj(center);
    align-items: center;
    z-index: 10000;
    .success {
        width: px2rem(773);
        height: px2rem(490);
        background-color: #fff;
        padding: px2rem(124) px2rem(181) px2rem(124) px2rem(181);
        @include fj();
        align-items: center;
        flex-direction: column;
        @include sc(px2rem(50), #666666);
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: px2rem(5);
        img {
            width: px2rem(98);
            height: px2rem(98);
        }
    }
    .info {
        width: px2rem(1185);
        height: px2rem(776);
        background-color: #fff;
        position: relative;
        opacity: 1;
        .close {
            height: px2rem(74);
            width: 100%;
            position: relative;
            img {
                width: px2rem(25);
                height: px2rem(25);
                position: absolute;
                top: px2rem(23);
                right: px2rem(23);
            }
        }
        .allInfo {
            width: 100%;
            height: px2rem(654);
            @include fj();
            .companyInfo {
                width: px2rem(520);
                height: px2rem(532);
                border-right: px2rem(2) solid #e7e7e7;
                margin-top: px2rem(17);
                @include fj(space-around);
                flex-direction: column;
                align-items: center;
                padding-top: px2rem(10);
                padding-bottom: px2rem(10);
                span:first-of-type {
                    display: block;
                    @include sc(px2rem(36), #333333);
                    line-height: px2rem(36);
                    letter-spacing: px2rem(1);
                }
                div {
                    width: px2rem(312);
                    height: px2rem(312);
                    border: solid px2rem(2) #b2b2b2;
                    padding: px2rem(10);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                span:last-of-type {
                    display: block;
                    line-height: px2rem(29);
                    letter-spacing: px2rem(1);
                    @include sc(px2rem(29));
                    color: rgba(51,51,51,0.82) ;         
                }
            }
            .customerInfo {
                height: 100%;
                width: px2rem(665);
                padding-left: px2rem(100);
                padding-right: px2rem(67);
                position: relative;
                .submit {
                    width: px2rem(179);
                    height: px2rem(69);
                    background-color: #c7ad8c;
                    letter-spacing: px2rem(3);
                    @include sc(px2rem(36), #fff);
                    @include fj(center);
                    align-items: center;
                    margin-right: 0;
                    margin-top: px2rem(10);
                    margin-left: px2rem(318);
                    cursor: pointer;
                }
                >img {
                    width: px2rem(12);
                    height: px2rem(13);
                    position: absolute;
                    top: px2rem(25);
                    left: px2rem(73);
                }
                table {
                    width: 100%;
                    height: px2rem(544);
                    tr {
                        width: 100%;
                        height: px2rem(112);
                        td:first-of-type {
                            height: px2rem(65);
                            @include fj();
                            align-items: center;
                            span {
                                @include sc(px2rem(30), #333333);
                                line-height: px2rem(34);
                                letter-spacing: px2rem(3);
                            }
                        }
                        td:last-of-type {
                            width: px2rem(391);
                            .con {
                                background-color: #f0f0f0;
                                width: 100%;
                                height: px2rem(65);
                                border-radius: px2rem(9);
                                margin-top: 0;
                                @include sc(px2rem(29), #333333);
                                letter-spacing: px2rem(1);
                                padding: px2rem(22);
                                position: relative;
                                top: px2rem(-20);
                            }
                            .con::-webkit-input-placeholder{
                                @include sc(px2rem(29));
                                color: #c1c1c1;
                            }
                            .con::-moz-placeholder{  //不知道为何火狐的placeholder的颜色是粉红色，怎么改都不行，希望有大牛路过帮忙指点
                                @include sc(px2rem(29));
                                color: #c1c1c1;        
                            }
                            .con:-ms-input-placeholder{  //由于我的IE刚好是IE9，支持不了placeholder，所以也测试不了(⊙﹏⊙)，有IE10以上的娃可以帮我试试
                                @include sc(px2rem(29));
                                color: #c1c1c1;        
                            }
                            .price {
                                @include fj();
                                align-items: center;
                                padding-top: 0;
                                padding-bottom: 0;
                                img {
                                    width: px2rem(35);
                                    height: px2rem(19);
                                }
                                cursor: pointer;
                                span {
                                    @include sc(px2rem(29), #c1c1c1);
                                    letter-spacing: px2rem(1);
                                }
                            }
                            .priceSelect {
                                width: px2rem(391);
                                height: px2rem(382);
                                position: absolute;
                                top: px2rem(177);
                                right: px2rem(67);
                                background-color: #ffffff;
                                box-shadow: 0px px2rem(5) px2rem(18) 0px 
                                    rgba(0, 0, 0, 0.1);
                                border-radius: px2rem(6);
                                overflow: auto;
                                @include scrollBarTwo;
                                li {
                                    width: 100%;
                                    height: px2rem(64);
                                    @include fj(center);
                                    align-items: center;
                                    @include sc(px2rem(30), #666666);
                                    letter-spacing: px2rem(1);
                                    cursor: pointer;
                                }
                                li:hover {
                                    background-color: rgba(199, 173, 140, 0.4);
                                }
                            }
                        }
                        
                        
                    }
                    tr:last-of-type {
                        width: 100%;
                        height: px2rem(305);
                            .houseType {
                                height: px2rem(355);
                                width: px2rem(235);
                                padding-top: px2rem(22);
                                li {
                                    margin-top: px2rem(29);
                                    @include sc(px2rem(29), #999999);
                                    line-height: px2rem(29);
                                    letter-spacing: px2rem(2);
                                    cursor: pointer;
                                    input {
                                        -webkit-appearance: none;  //这个属性是将input标签变成一个可修改样式的普通标签，目前有谷歌和火狐浏览器支持
                                        -moz-appearance: none;
                                        width: px2rem(22);
                                        height: px2rem(22);
                                        background-color: #fff;
	                                    border: solid px2rem(2) #b7b7b7;
                                        cursor: pointer;
                                    }
                                    input[type=checkbox]:checked {
                                        background-image: url('../../assets/img/default/select.png');
                                        background-size: 100%;
                                        background-repeat: no-repeat;
                                        border: 0;
                                    }
                                }
                                .selectBox {
                                    color: #c7ad8c;
                                }
                                li:first-of-type {
                                    margin-top: 0;
                                }
                            }
                        
                    }
                }
            }
        }
 
    }
}
</style>
