<template>
    <div class="reduceHouseType">
        <div class="houseTitle">
            减少房间类型
            <img :src="this.tankuang" id="chaHouse" @click='cancelReduceRoomType'>
        </div>
        <form action="" >
            <select name="houseTypeTwo" class="houseTypeTwo" ref='select'>
                <option v-for='room in roomType' :value="room.id" >{{ room.roomTypeName }}</option>
            </select>
            <input type="button" value="确定" id="delete" @click="reduceHouseType">
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs';
export default {
    data() {
        return {
            roomType: [],
            tankuang: require('../../../../assets/img/tankuang.png'),
        }
    },
    created() {
        //请求房间类型
        this.$axios.get('/house/roomType/get').then((res) => {
            this.roomType = res.data.data;
        }).catch((err) => {
            this.$message.error('获取房间类型失败！');
        });
    },
    components: {

    },
    mounted() {
        this.$on('changeRoomType', (name) => { 
            //得到新添加的房间名字
            this.$forceUpdate();
            this.roomType.push(name);
        });
    },
    methods: {
        //取消添加房间类型
        cancelReduceRoomType() {
            this.$emit('cancelReduceRoomType');
        },
        //减少房间类型
        reduceHouseType() {
            
            this.$refs.select.value ? this.$axios.delete('/house/roomType/delete?roomTypeInfoId=' + this.$refs.select.value).then((res) => {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.$forceUpdate();
                let deleteIndex;
                this.roomType.forEach((room, i) => {
                    room.id == this.$refs.select.value ? deleteIndex = i : "";
                });
                this.roomType.splice( deleteIndex, 1 ); 
                this.$emit('changeRoomTypeR', this.$refs.select.value);
            }).catch((err) => {
                this.$message.error('删除失败！');
            }) : this.$message({
                    message: '不能为空！',
                    type: 'warning'
                }) ;
            this.cancelReduceRoomType();
        }
    }
}
</script>

<style lang="scss">
@import "../../../../styles/main.scss";
@import "../../../../styles/mixin.scss";

.reduceHouseType {
    width: px2rem(235);
    height: px2rem(202);
        // border: px2rem(2) solid white;
    border-radius: px2rem(4);
    background-color: #fff;
    @include sc(px2rem(30), #304156);
    font-weight: 600;
    float: left;
    position: absolute;
    top: 28.8%;
    left: 63%;
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
