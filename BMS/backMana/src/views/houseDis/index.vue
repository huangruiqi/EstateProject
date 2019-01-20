<template>
    <div class="housePage" v-loading="this.$store.state.loading.loading">
        <div class="page">
            <house-content ref='content' 
                @addSample='addSample' 
                @addHouseTypePic='addHouseTypePic'>
            </house-content>
            <house-bottom ref='bottom' 
                @deleteAll='deleteAll'
                @addHouseType='addHouseType' 
                @conveyIndex='conveyIndex'>
            </house-bottom>
        </div>
        <div class="mark" :style="{display: markVisibility}">
            <!-- 添加样板间弹框 -->
            <add-sample ref='sample' :style="{display: sampleFrame}" 
                @updataSuccess='updataSuccess'
                @reduceRoomType='reduceRoomType' 
                @addRoomType='addRoomType' 
                @cancelAddSample='cancelAddSample'>
            </add-sample>
            <!-- 添加户型图 -->
            <add-house-type-pic ref='houseType' :style="{display: houseTypePicFrame}" 
                @cancelAddHouseTypePic='cancelAddHouseTypePic' 
                @updataSuccessHouseTypePic='updataSuccessHouseTypePic'>
               
            </add-house-type-pic>
            <!-- 添加房型 -->
            <add-room-type :style="{display: roomTypeFrame}" 
                @changeRoomType='changeRoomType' 
                @cancelAddRoomType='cancelAddRoomType'>
            </add-room-type>
            <!-- 减少房型 -->
            <reduce-room-type ref='reduce' :style="{display: reduceTypeFrame}" 
                @changeRoomTypeR='changeRoomTypeR' 
                @cancelReduceRoomType='cancelReduceRoomType'>
            </reduce-room-type>
            <!-- 增加户型 -->
            <add-house-types :style="{display: houseTypeFrame}" 
                @cancelAddHouseType='cancelAddHouseType' 
                @displayHouseType='displayHouseType'>
            </add-house-types>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import houseContent from './components/houseContent.vue'
import houseBottom from './components/houseBottom.vue'
import addHouseTypes from './components/frames/addHouseType.vue'
import addSample from './components/frames/addSample.vue'
import addHouseTypePic from './components/frames/addHouseTypePic.vue'
import addRoomType from './components/frames/addRoomType.vue'
import reduceRoomType from './components/frames/reduceRoomType.vue'
import ip from '../../../static/ip'

    export default {
        name: 'homepage',
        components: {
            houseContent,
            houseBottom,
            addHouseTypes,
            addSample,
            addRoomType,
            reduceRoomType,
            addHouseTypePic
        },
        data() {
            return {
                yes: true,
                houseTypeFrame: 'none',//增加户型的弹框
                markVisibility: 'none',//遮罩层显现
                sampleFrame: 'none',//样板间显现
                roomTypeFrame: 'none',//增加房间类型显现
                reduceTypeFrame: 'none',//减少房间类型显现
                houseTypePicFrame: 'none',//户型图显现
                loading: this.$store.state.loading.loading
            }
        },

        methods: {
            //增加户型
            addHouseType() {
                this.$forceUpdate();
                this.markVisibility = 'block';//让遮罩层显现
                this.houseTypeFrame = 'block';//让增加户型弹框出现
            },
            //取消增加户型操作
            cancelAddHouseType() {
                this.$forceUpdate();
                this.markVisibility = 'none';//让遮罩层消失
                this.houseTypeFrame = 'none';//让增加户型弹框消失
            },
            //手动增加户型预览效果
            displayHouseType(newHouse) {
                this.$refs.bottom.$emit('displayHouseType', newHouse);
            },

            //点击切换户型内容
            conveyIndex(name, id) {
                this.$refs.content.$emit('conveyIndex', name, id);//给内容传户型索引
                this.$refs.sample.$emit('conveyIndex', name, id);//给样板间添加框提供索引
                this.$refs.houseType.$emit('conveyIndex', name, id);//给户型图添加框提供索引
            },

            //增加样板间图片
            addSample() {
                this.$forceUpdate();
                this.markVisibility = 'block';
                this.sampleFrame = 'block';
            },

            //增加户型图图片
            addHouseTypePic() {
                this.$forceUpdate();
                this.markVisibility = 'block';
                this.houseTypePicFrame = 'block';
            },

            //取消添加样板间
            cancelAddSample() {
                this.$forceUpdate();
                this.markVisibility = 'none';
                this.sampleFrame = 'none';
            },

            //取消添加户型图
            cancelAddHouseTypePic() {
                this.$forceUpdate();
                this.markVisibility = 'none';
                this.houseTypePicFrame = 'none';
            },

            //增加房间类型
            addRoomType() {
                this.$forceUpdate();
                this.roomTypeFrame = 'block';
                this.reduceTypeFrame = 'none';
            },

            //减少房间类型
            reduceRoomType() {
                this.$forceUpdate();
                this.roomTypeFrame = 'none';
                this.reduceTypeFrame = 'block';
            },

            //更新总房间类型
            changeRoomType(addContent) {
                this.$refs.sample.$emit('changeRoomType', addContent);
                this.$refs.reduce.$emit('changeRoomType', addContent);
            },
            //取消添加房间类型
            cancelAddRoomType() {
                this.$forceUpdate();
                this.roomTypeFrame = 'none';
            },
            //取消减少房间类型
            cancelReduceRoomType() {
                this.$forceUpdate();
                this.reduceTypeFrame = 'none';
            },
            //更新总房间类型减少
            changeRoomTypeR(deleteIndex) {
                this.$refs.sample.$emit('changeRoomTypeR', deleteIndex);
            },
            //添加样板间成功
            updataSuccess(newPic) {
                this.$forceUpdate();
                this.markVisibility = 'none';
                this.sampleFrame = 'none';
                this.$refs.content.$emit('updataSuccess', newPic);
            },

            //添加户型图成功
            updataSuccessHouseTypePic(newPic) {
                this.$forceUpdate();
                this.markVisibility = 'none';
                this.houseTypePicFrame = 'none';
                this.$refs.content.$emit('updataSuccessHouseTypePic', newPic);
            },
            //删除所有户型效果
            deleteAll() {
                this.$refs.content.$emit('deleteAll');
            }
        }
    }
</script>

<style lang="scss">
@import "../../styles/main.scss";
@import "../../styles/mixin.scss";

.housePage {
    width: 100%;
    height: px2rem(930);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #EDF0F5;
    .page {
        margin-top: -80px;
        width: px2rem(1455);
        height: px2rem(750);
        // border: px2rem(2) solid #304156;

        .Title {
            width: 100%;
            height: px2rem(70);
            border-bottom: px2rem(2) solid #dfdfdf;
            // background-color: black;
            @include sc(px2rem(24),#3d455a);
            font-weight: 500;
            @include fj();
            span {
                display: block;
                margin-left: px2rem(51);
                margin-top: px2rem(23);

            }
            img {
                width: px2rem(40);
                height: px2rem(40);
                cursor: pointer;
            }
        }
    }
    .mark {
        width: 100%;
        height: 100%;
        background: rgba(61,69,90,.6);
        position: absolute;
        top: 0;
        left: 0;
    }
}
.el-loading-parent--relative {
    position: initial!important;
}
</style>
