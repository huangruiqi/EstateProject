<template>
    <div class="houseChoose">
        <ul>
        <li v-for="(house, index) in houseType"  :key='index'>
            <div class="clickType" @click="clickHouseType(index)" @dblclick="update(index)"  :style="{backgroundColor: clickColor[index]}">
                {{ house.houseTypeName }}
            </div>
            <img :src="chachaPic" class="chaHouse" :style="{display: visibility[index]}" @click='deleteHouseType(index)'>     
        </li>
        </ul>
        <img class="clickType addPicAll" id="addHouseType" :src="addHouseTypes" @click='addHouseType'>   
    </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
import ip from '../../../../static/ip'
var time = null;  //  在这里定义time 为null 
export default {
    data() {
        return {
            chachaPic: require('../../../assets/img/chacha.png'),
            addHouseTypes: require('../../../assets/img/addHouseType.png'),
            houseType: [],
            visibility: [],
            clickColor: [],
            doubleClickNum: 0,
            clickNum: 0,
            time: ""
        }
    },
    created() {
        //请求房间类型
        this.$axios.get("/house/houseType/get").then(res => {
            this.houseType = res.data.data.reverse();
            this.houseType.forEach((house) => {
                this.visibility.push('none');
                this.clickColor.push('#9ea6b1');
            });
        }).catch(error => {
            console.log(error);
        });
    },
    mounted() {
        //初始化效果
        this.comeIn();
        //手动实现增加户型的预览效果
        this.$on('displayHouseType', (newHouse) => { 
            this.$forceUpdate();
            this.houseType.push(newHouse);
            this.visibility.push('none');
            this.clickColor.push('#9ea6b1');
            setTimeout(() => {
                const clickType = document.getElementsByClassName('clickType');
                clickType[ clickType.length - 2 ].click();//增加一个户型之后点到这个户型
            }, 100);
            
        });
    },
    
    methods: {
        //初始化效果
        //必须要等一会要不然交互的还没有渲染好
        comeIn() {
            // const clickBottomDiv = document.getElementsByClassName('clickType');
            // setTimeout(() => {
            //     if (clickBottomDiv.length > 1) {
            //         clickBottomDiv[0].click();
            //     }
            // }, 200) 
            this.visibility[0] = 'block';//让小叉叉出现
            this.clickColor[0] = '#304156';//让点击盒子变色
        },
        //点击相关户型盒子
        clickHouseType(index) {
            clearTimeout(time);  //首先清除计时器
            time = setTimeout(() => {
                this.$forceUpdate();
                this.houseType.forEach((house, i) => {
                    this.visibility[i] = 'none';
                    this.clickColor[i] = '#9ea6b1';
                });
                this.visibility[index] = 'block';//让小叉叉出现
                this.clickColor[index] = '#304156';//让点击盒子变色
                this.clickNum = index;
                this.$emit('conveyIndex', this.houseType[index].houseTypeName, this.houseType[index].id);
            }, 300);   //大概时间300ms
        },
        //增加户型
        addHouseType() {
            this.$emit('addHouseType');
        },
        //删除户型
        deleteHouseType(index) {
            const config = {
                'Content-Type': 'application/x-www-form-urlencoded' 
            };
            this.$axios.post('/house/houseType/delete', qs.stringify({houseTypeInfoId: this.houseType[index].id}, config)).then((res) => {
                if (res.data.code == 1) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.$forceUpdate();
                    this.houseType.splice(index, 1);//删除预览效果的
                    //删除之后跳转到哪一户型
                    setTimeout(() => {
                        const clickType = document.getElementsByClassName('clickType');
                        if (clickType.length > 1) {
                            clickType[index - 1].click()
                        } else {
                            this.$emit('deleteAll');
                        }
                    }, 100);              
                } else if(res.data.code == 0) {
                    this.$message({
                        message: '该户型有VR，请联系管理员删除！',
                        type: 'warning'
                    });
                }
            }).catch((err) => {
                this.$message.error('删除失败！');
                console.log(err);
            });
        },
        //双击修改户型名
        update(index) {
            clearTimeout(time);  //清除
            if (this.doubleClickNum == 0) {
                document.getElementsByClassName('clickType')[index].innerHTML = "<input id='houseTypeUpdate' style='width: 65px' value=" + document.getElementsByClassName('clickType')[index].innerHTML.trim() + ">";
                this.doubleClickNum = 1;
                document.onkeydown=(event) => {
                    const eventKey = event || window.event || arguments.callee.caller.arguments[0];
                    if(eventKey && eventKey.keyCode == 13){ // enter 键
                        const updateInput = document.getElementById('houseTypeUpdate');
                        const config = {
                            'Content-Type': 'application/x-www-form-urlencoded' 
                        };
                        const updateData = {
                            id: this.houseType[index].id,
                            houseTypeName: updateInput.value     
                        };
                        this.$axios.post('/house/houseType/update', updateData, config).then((res) => {
                            if (res.data.code == 1) {
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                                document.getElementsByClassName('clickType')[index].innerHTML = updateInput.value;
                            } else {
                                this.$message({
                                    message: '户型名不能重复！',
                                    type: 'warning'
                                });
                            }
                        }).catch((err) => {
                            this.$message.error('修改失败！');
                        });
                    }
                    this.doubleClickNum = 0;
                };
            } else {
                this.$message({
                    message: '先确认其他户型名是否修改！',
                    type: 'warning'
                });
            }
            
        }
    }
}
</script>

<style lang="scss">
@import "../../../styles/main.scss";
@import "../../../styles/mixin.scss";
.houseChoose {
    width: 70%;
    height: px2rem(80);
    @include fj();
    align-items: center;
    cursor: pointer;
    position: absolute;
    top: 87%;
    left: 50%;
    transform: translateX(-50%);
        // left: 300px;
    #addHouseType {
        width: px2rem(34);
        height: px2rem(34);
    }
    ul {
        width: 90%;
        height: 100%;
        overflow-x: auto;
        @include scrollBarTwo();
        @include fj(center);
        align-items: center;
    }
    li {
        position: relative;
        .chaHouse {
            width: px2rem(20);
            height: px2rem(20);
            position: absolute;
            top: 0;
            left: 100%;
            transform: translateX(-60%) translateY(-20%)
        }
    }
    
    .clickType {
        height: px2rem(34);
        width: px2rem(100);
        background-color: #9ea6b1;
        font-size: px2rem(16);
        @include sc(px2rem(16), white);
        font-weight: 500;
        @include fj(center);
        align-items: center;
        border-radius: px2rem(4);
        margin-left: px2rem(16);

    }
    .addPicAll {
        // position: relative;
        // left: px2rem(500);
        // z-index: 1000;
    }
    div:hover {
        background-color: #304156;
        color: #fff;
    }
}
</style>
