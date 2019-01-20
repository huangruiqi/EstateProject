<template>
    <div class="addRoomType">
        <div class="houseTitle">
            增加房间类型
            <img :src="this.tankuang" id="chaHouse" @click='cancelAddRoomType'>
        </div>
        <form action="">
            <input type="text" name="house1" id="addI" ref="addContent" maxlength="8" class="addType">
            <input type="button" value="确定" id="add" @click='addRoomType'>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
export default {
    data() {
        return {
            tankuang: require('../../../../assets/img/tankuang.png'),
        }
    },
    components: {

    },
    methods: {
        //增加房间类型
        addRoomType() {
            const addContent = this.$refs.addContent;
            if (addContent.value) {
                const config = {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
                this.$axios.post('/house/roomType/add', qs.stringify({roomTypeName: addContent.value}) , config).then((res) => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '添加房间类型已经存在！',
                            type: 'warning'
                        });
                    } else if (res.data.code == 1) {
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        this.$emit('changeRoomType', res.data.data);
                    }
                }).catch((err) => {
                    this.$message.error('添加失败！');
                });
            } else {
                this.$message({
                    message: '添加房间类型不可为空！',
                    type: 'warning'
                });
            }
            this.cancelAddRoomType();//确定后让弹框消失
        },
        //取消添加房间类型
        cancelAddRoomType() {
            this.$emit('cancelAddRoomType');
        }
    }
}
</script>

<style lang="scss">
@import "../../../../styles/main.scss";
@import "../../../../styles/mixin.scss";

.addRoomType {
    width: px2rem(235);
    height: px2rem(202);
        // border: px2rem(2) solid white;
    border-radius: px2rem(4);
    background-color: #fff;
    @include sc(px2rem(30), #304156);
    font-weight: 600;
    position: absolute;
    top: 28.8%;
    left: 63%;
    // transform: translate(0, -70%);
    .houseTitle {
        width: 100%;
        height: px2rem(50);
        background-color: #565d6d;
        border-top-left-radius: px2rem(4);
        border-top-right-radius: px2rem(4);
        @include sc(px2rem(18), white);
        letter-spacing: px2rem(1);
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
            width: px2rem(14);
            height: px2rem(14);
            cursor: pointer;
        }
    }
    select {
        width: px2rem(199);
        height: px2rem(26);
        @include sc(px2rem(16), #565d6d);
        border-radius: px2rem(4);
        border: 0;
        background-color: #edf0f5;
        margin: px2rem(42) px2rem(18);
        option {
            background-color: #D8DDE7;
        }   
    }
    #addI {
        width: px2rem(199);
        height: px2rem(26);
        background-color: #edf0f5;
        border-radius: px2rem(4);
        border: 0;
        margin: px2rem(42) px2rem(18);
        @include sc(px2rem(16), #565d6d);
    }
    input[type=button] {
        border-radius: px2rem(4);
        border: 0;
        width: px2rem(80);
        height: px2rem(34);
        background-color: #565d6d;
        @include sc(px2rem(14), white);
        position: relative;
        top: -20px;
        left: 50px;
    }
}
</style>
