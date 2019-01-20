<template>
    <div class="addHouseType">
        <div class="houseTitle">
            增加户型
            <img :src="houseTypeCha" id="chaHouse" @click="cancelAddHouseType">
        </div>
        <form action="">
            <input type="text" name="house" id="addII" maxlength="10" class="addType">
            <input type="button" value="确定" id="add" @click='checkSubmit'>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'

export default {
    data() {
        return {
            houseTypeCha: require('../../../../assets/img/tankuang.png'),
            addNew: {}
        }
    },
    components: {

    },
    methods: {
        //取消操作
        cancelAddHouseType() {
            this.$emit('cancelAddHouseType');
        },
        //点击确定
        checkSubmit() {
            const addI = document.getElementById('addII');
            if (addI.value) {
                const config = {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
                this.$axios.post('/house/houseType/add', qs.stringify({houseTypeName: addI.value}), config).then((res) => {
                    // console.log(res);
                    if(res.data.code == 0) {
                        this.$message({
                            message: '户型名重复，上传失败',
                            type: 'warning'
                        });
                    }else if (res.data.code == 1) {
                        this.$message({
                            message: '上传成功！',
                            type: 'success'
                        });
                        
                        this.$emit('displayHouseType', res.data.data);//预览效果手动加入户型
                        this.$emit('cancelAddHouseType');
                        
                    }
                }).catch((err) => {
                    this.$message.error('上传失败！');
                });
            } else {
                this.$message({
                    message: '户型名不能为空！',
                    type: 'warning'
                });
            }
        },
       
    }
}
</script>

<style lang="scss">
@import "../../../../styles/main.scss";
@import "../../../../styles/mixin.scss";
.addHouseType {
    width: px2rem(235);
    height: px2rem(202);
        // border: px2rem(2) solid white;
    border-radius: px2rem(4);
    background-color: #fff;
    @include sc(px2rem(30), #304156);
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    #addII {
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
