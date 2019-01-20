<template>
    <div class="pageOne">
        <div class="content" name="proto">
            <div class="Title"><span>样板间</span></div>
            <div class="pic">
                <div class="add" ref="add" v-for="(house, i) in sampleRoomImage">
                    <img :src="getImage(house.sampleRoomImageLocation, 2)" @click='handlePictureCardPreview(getImage(house.sampleRoomImageLocation, 1))'>
                    <img :src="chaPic" id="cha" class="chaOne" @click='deleteSample(i, house)'>
                    <div class="bottomDiv">{{ house.roomTypeName }}展示图</div>
                </div>
                <div class="add" @click='addSample'><img :src="addBig"></div>
            </div>
        </div>
        <div class="content" name="plan">
            <div class="Title"><span>户型图</span></div>
            <div class="pic">
                <div class="addThree">
                    <img @click='addHouseTypePic' :src='houseTypeImage && houseTypeImage.houseTypeImageLocation ? getImage(houseTypeImage.houseTypeImageLocation,1) : addBig' id="ha" class="duTe">
                    <img :src="chaPic" id="cha" class="chaOne" :style="{display: chaDisplay}" @click='deleteHouseTypePic'>
                </div>
            </div>
            <div class="VR">是否需要全景图展示<input type="checkbox" ref='vr' @change='changeVr' class="checkBox"></div>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
import ip from '../../../../static/ip'
export default {
    name: 'houseContent',
    data() {
        return {
            addBig: require('../../../assets/img/addPic.png'),
            chaPic: require('../../../assets/img/cha.png'),//叉图片
            sampleRoomImage: [],
            houseTypeImage: {},
            head: ip + ':8080/static/image/',
            chaDisplay: 'none',//户型图的叉叉是否显现
            dialogImageUrl: '',
            dialogVisible: false,
            houseTypeVrUrl: '',
            title: ''
        }
    },
    components: {

    },
    created() {
        //首先呈现户型一的相关内容
        this.$axios.get("/house/houseType/get")
        .then(res => {
            this.title = res.data.data;
            if(this.title[0]) {
                if (this.title[0].houseTypeVrUrl) {
                    this.$refs.vr.checked = true;
                } else {
                    this.$refs.vr.checked = false;
                }
                
                //请求样板间
                this.$axios.get('/house/sampleRoomImage/get?houseTypeId=' + this.title[0].id).then((res) => {
                    this.sampleRoomImage = res.data.data;
                }).catch((err) => {
                    this.$message.error('获取样板间失败！');
                });
                //请求户型图
                this.$axios.get('/house/houseTypeImage/get?houseTypeId=' + this.title[0].id).then((res) => {
                    this.houseTypeImage = res.data.data;
                    if (this.houseTypeImage) {
                        this.chaDisplay = 'block';
                    } else {
                        this.chaDisplay = 'none';
                    }
                }).catch((err) => {
                    this.$message.error('获取户型图失败！');
                });        
            }
        }).catch((err) => {
            this.$message.error('获取户型名失败！');
        });   
    },
    mounted() {
        this.$on('conveyIndex', (name, id) => { 
            //请求有无VR
            this.$axios.get('/house/houseType/get').then((res) => {
                res.data.data.forEach((data) => {
                    if (data.houseTypeName == name && data.houseTypeVrUrl) {
                        this.$refs.vr.checked = true;
                    } else if ((data.houseTypeName == name && !data.houseTypeVrUrl)) {
                        this.$refs.vr.checked = false;
                    }
                });
            }).catch((err) => {
                this.$message.error('获取失败！');
            });
            //请求样板间
            this.$axios.get('/house/sampleRoomImage/get?houseTypeId=' + id).then((res) => {
                this.sampleRoomImage = res.data.data;
                this.$forceUpdate();
            }).catch((err) => {
                this.$message.error('获取样板间失败！');
            });
            //请求户型图
            this.$axios.get('/house/houseTypeImage/get?houseTypeId=' + id).then((res) => {
                
                this.houseTypeImage = res.data.data;
                if (this.houseTypeImage) {
                    this.chaDisplay = 'block';
                } else {
                    this.chaDisplay = 'none';
                }
                this.$forceUpdate();
            }).catch((err) => {
                this.$message.error('获取户型图失败！');
            });
        });
        this.$on('updataSuccess', (newPic) => { 
            this.sampleRoomImage.push(newPic);
            this.$forceUpdate();
        });
        this.$on('updataSuccessHouseTypePic', (newPic) => { 
            this.houseTypeImage = newPic;
            this.$forceUpdate();
        });
        this.$on('deleteAll', () => { 
            this.sampleRoomImage = [];
            this.houseTypeImage = {};
            this.$forceUpdate();
        });
    },
    methods: {
        //切图片地址
        getImage(data, i) {
            const imgSplit = data.split(/\_|\./g)
            let index = i;
            while (imgSplit.length - 1 <= index) {
                index--;
            }
            return this.head + imgSplit[0] + "_" + imgSplit[index] + "." + imgSplit[imgSplit.length - 1];
        },
        //增加样板间
        addSample() {
            this.$axios.get('/house/houseType/get').then((res) => {
                //设计没有户型的时候的情况
                if(res.data.data.length > 0) {
                    this.$emit('addSample');
                } else {
                    this.$message({
                        message: '请添加户型！',
                        type: 'warning'
                    });
                }
            }).catch((err) => {
                this.$message.error('获取失败！');
            })
            
        },
        //删除样板间
        deleteSample(i, house) {
            this.$axios.post('/house/sampleRoomImage/delete?sampleRoomInfoId=' + house.id).then((res) => {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.sampleRoomImage.splice(i, 1);
                this.$forceUpdate();
            }).catch((err) => {
                this.$message.error('删除失败！');
            })
        },
        //增加户型图
        addHouseTypePic(e) {
            if (e.target.src == this.addBig) {
                this.$axios.get('/house/houseType/get').then((res) => {
                //设计没有户型的时候的情况
                    if(res.data.data.length > 0) {
                        this.$emit('addHouseTypePic');
                    } else {
                        this.$message({
                            message: '请添加户型！',
                            type: 'warning'
                        });
                    }
                }).catch((err) => {
                    this.$message.error('获取失败！');
                })
            } else {
                //不为空的时候放大
                this.handlePictureCardPreview(e.target.src);
            }
            
        },
        //删除户型图
        deleteHouseTypePic() {
            this.$axios.post('/house/houseTypeImage/delete?houseTypeName=' + this.houseTypeImage.houseTypeName).then((res) => {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.houseTypeImage = {};
                this.$forceUpdate();
            }).catch((err) => {
                this.$message.error('删除失败！');
            })     
        },
        //点击放大
        handlePictureCardPreview(url) {
            this.dialogImageUrl = url;
            this.dialogVisible = true;
        },
        //改变VR
        changeVr(e) {
            this.$message({
                message: '改动无效，请联系管理员！',
                type: 'warning'
            });
            e.target.click();
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../../styles/main.scss";
@import "../../../styles/mixin.scss";
.pageOne {
    width: 100%;
    height: 100%;
    display: flex;
            // background-color:black;
    flex-direction: column;
    justify-content: space-between;
    .content {
        width: 100%;
        height: px2rem(360);
        background-color: #fff;
        display: flex;
        flex-wrap: wrap;
        overflow: scroll;
        overflow-x: hidden;
        .VR {
            position: relative;
            left: 86%;
            color: #9ea6b1;
            font-weight: 600;
            input {
                position: relative;
                top: px2rem(5)
            }
        }
        .pic {
            width: px2rem(1342);
            height: px2rem(199);
            margin-left: px2rem(25);
                    // margin-top: px2rem(42);
                    // background-color: black;
            .add {
                width: px2rem(245);
                height: px2rem(199);
                float: left;
                margin-left: px2rem(20);
                @include fj(center);
                align-items: center;
                        // border: px2rem(2) solid #304156;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 100%;
                }
                #cha {
                    width: px2rem(25);
                    height: px2rem(25);
                    float: left;
                    margin-top: -110px;
                    margin-left: -20px;
                    visibility: hidden;
                }
                .bottomDiv {
                    width: 100%;
                    height: px2rem(40);
                    background-color: #3d455a;
                    float: left;
                    margin-left: -98%;
                    margin-top: px2rem(160);
                    opacity: 0.8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    @include sc(px2rem(16), white);
                    visibility: hidden;
                }
                    
            }
            .add:hover {
                        // border: px2rem(4) solid red;
                #cha {
                    visibility: visible;
                }
                #dui {
                    visibility: visible;
                }
                .bottomDiv {
                    visibility: visible;
                }
            }
            .addTwo:hover {
                        // border: px2rem(4) solid red;
                #cha {
                    visibility: visible;
                }
                #dui {
                    visibility: visible;
                }
            }
            .addThree:hover {
                        // border: px2rem(4) solid red;
                #cha {
                    visibility: visible;
                }
                #dui {
                    visibility: visible;
                }
            }
            .addThree {
                width: px2rem(245);
                height: px2rem(199);
                margin-left: px2rem(20);
                @include fj(center);
                align-items: center;
                        // border: px2rem(2) solid #304156;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 100%;
                }
                #cha {
                    width: px2rem(25);
                    height: px2rem(25);
                    float: left;
                    margin-top: -110px;
                    margin-left: -20px;
                    visibility: hidden;
                }
            }
        }
    }
}
</style>
