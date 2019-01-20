<template>
    <div class="form">
        <div class="markTitle" v-if="houseName">{{ houseName }}</div>
        <form action="">
            <label style="display:none">户型：</label>
            <input style="display:none" type="text" name="houseTypeId" v-if="houseName" :value="houseName" disabled="disabled"/>
            <label>房间类型：</label>
            <select class="houseType" name="roomTypeId" ref='select'>
                <option v-for='room in roomType' :value="room.id" >{{ room.roomTypeName }}</option>
            </select>
            <img :src="addHouse" class="addHouse" @click="addRoomType" /><img class="addHouse" :src="decrease" @click="reduceRoomType"/><br>
            <label>文件上传:</label><input type="file" name="pic" @change="showSelect" style="display:none" /><br>
            <img :src="addPic" ref="putOn" class="shangchuan" @click='selectPic'><br>
            <span><img :src="star">支持jpg / png，图片大小不超过10M</span>
            <div class="button">
                <input type="button" value="取消" class="addPic" id="cancel" @click="cancelAddSample">
                <input type="button" value="确定" class="addPic" id="addPic" @click='submitSample'>
            </div>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
import {getUrl} from '../../../../utils/urlGet.js'//获取预览图片地址

export default {
    data() {
        return {
            houseName: "",//获取户型名字
            roomType: [],//获取房间名字
            filePic: {},//上传文件
            addHouse: require('../../../../assets/img/addHouse.png'),
            decrease: require('../../../../assets/img/decrease.png'),
            addPic: require('../../../../assets/img/addPic2.png'),
            star: require('../../../../assets/img/star.png'),
            id: 0,//户型id
        }
    },
    created() {
        //请求户类型
        this.$axios.get("/house/houseType/get").then(res => {
            if (res.data.data[0]) {
                this.houseName = res.data.data[0].houseTypeName;
                this.id = res.data.data[0].id;
            }
 
        }).catch(error => {
            this.$message.error('获取户型失败！');
        });
        //请求房间类型
        this.$axios.get('/house/roomType/get').then((res) => {

            this.roomType = res.data.data;
        }).catch((err) => {
            this.$message.error('获取房间类型失败！');
        });
    },
    mounted() {
        this.$on('conveyIndex', (name, id) => { 
            //得到户型名字
            this.houseName = name;
            this.id = id;
        });
        this.$on('changeRoomType', (name) => { 
            //得到新添加的房间名字
            this.$forceUpdate();
            this.roomType.push(name);
        });
        this.$on('changeRoomTypeR', (id) => { 
            //得到新减少的房间名字
            this.$forceUpdate();
            let deleteIndex;
            this.roomType.forEach((room, i) => {
                room.id == id ? deleteIndex = i : "";
            });
            this.roomType.splice( deleteIndex, 1 ); 
        });
    },
    components: {

    },
    methods: {
        //取消添加
        cancelAddSample() {
            this.$emit('cancelAddSample');
        },
        //选择样板间图片
        selectPic() {
            document.getElementsByName('pic')[0].click();
        },
        //展示预览
        showSelect(e) {
            if (e.target.files[0]) {
                this.$refs.putOn.src = getUrl(e.target.files[0]);
                this.filePic = e.target.files[0];
            }
        },
        //增加房间类型，给父亲传信息
        addRoomType() {
            this.$emit('addRoomType');
        },
        //减少房间类型，给父亲传信息
        reduceRoomType() {
            this.$emit('reduceRoomType');
        },
        //提交样板间
        submitSample() {
            if (this.filePic && this.$refs.select.value) {
                let formdata = new FormData();
                let options = this.filePic;
                formdata.append('houseTypeId', this.id);
                formdata.append('roomTypeId', this.$refs.select.value);
                formdata.append('imageFile', this.filePic);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  
                    }
                }
                this.$axios.post('/house/sampleRoomImage/add', formdata, config).then((res) => {
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                    this.$emit('updataSuccess', res.data.data);
                }).catch((error) =>{
                    this.$message.error('上传失败！');
                });
            } else {
                this.$message({
                    message: '不能留空！',
                    type: 'warning'
                });
            }
        }
    }
}
</script>

<style lang="scss">
@import "../../../../styles/main.scss";
@import "../../../../styles/mixin.scss";

.form {
    width: px2rem(400);
    height: px2rem(447);
    border-radius: px2rem(4);
    background-color: white;
    @include sc(px2rem(30), #304156);
    font-weight: 600;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .markTitle {
        width: 100%;
        height: px2rem(50);
        background-color: #565d6d;
        border-top-left-radius: px2rem(4);
        border-top-right-radius: px2rem(4);
        @include fj(center);
        align-items: center;
        @include sc(px2rem(18), white);
    }
    form {
        width: px2rem(280);
        height: px2rem(315);
        margin: px2rem(36) auto;
            // background-color: black;
        span {
            font-size: px2rem(12);
            color: #9ea6b1;
            line-height: 21px;
	        letter-spacing: 0px;
            display: block;
            margin-top: -6px;
            img {
                width: px2rem(8);
                height: px2rem(7);
            }
        }
            
        label {
            @include sc(px2rem(20), #565d6d);
        }
        select {
            width: px2rem(105);
            height: px2rem(26);
            @include sc(px2rem(14), #565d6d);
            border-radius: px2rem(4);
            border: 0;
            background-color: #edf0f5;
            option {
                background-color: #D8DDE7;
                width: px2rem(105);
                height: px2rem(26);
                border: px2rem(1) solid black;
            }
        }
    }
    input {
        border: px2rem(2) solid #304156;
    }
        // input[type=button] {
        //     margin: px2rem(25) px2rem(300);
        // }
    .shangchuan {
        width: px2rem(280);
        height: px2rem(170);
        margin-top: px2rem(10);
    }
    .addHouse {
        width: px2rem(26);
        height: px2rem(26);
        margin-left: px2rem(1);
        position: relative;
        top: px2rem(8);
        cursor: pointer;
        border: 0;
    }
    .button {
        width: 100%;
        height: px2rem(34);
        margin-top: px2rem(20);
        @include fj();
        .addPic {
            width: px2rem(126);
            height: px2rem(34);
            @include sc(px2rem(16), #565d6d);
            background-color: #edf0f5;
            border-radius: px2rem(4);
            border: 0;
            cursor: pointer;
        }
        .addPic:hover {
            background-color: #565d6d;
            @include sc(px2rem(16), white);
        }
    }
}
</style>
