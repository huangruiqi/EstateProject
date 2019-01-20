<template>
    <div class="parkPage" v-loading="this.$store.state.loading.loading">
        <div class="page">
            <div class="pageOne">
                <div class="content" name="proto">
                    <div class="Title"><span>公共设施</span></div>
                    <div class="pic">
                        <div class="add" ref="add" v-for="(content, i) in public">
                            <img :src="getImage(content.imageLocation, 2)" @click='handlePictureCardPreview(getImage(content.imageLocation, 1))'>
                            <img :src="chaPic" id="cha" class="chaOne" @click='deletePublic(i, content)'>
                            <div class="bottomDiv">{{ content.placeTypName }}</div>
                        </div>
                        <div class="add" ><img :src="addBig" @click="addPublic"></div>
                    </div>
                </div>
                <div class="content" name="plan">
                    <div class="Title"><span>园林景观</span></div>
                    <div class="pic">
                        <div class="add" ref="add" v-for="(content, i) in parkView">
                            <img :src="getImage(content.imageLocation, 2)" @click='handlePictureCardPreview(getImage(content.imageLocation, 1))'>
                            <img :src="chaPic" id="cha" class="chaOne" @click='deleteParkview(i, content)'>
                            <div class="bottomDiv">{{ content.placeTypName }}</div>
                        </div>
                        <div class="add"><img :src="addBig" @click='addParkview'></div>
                    </div>
                </div>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </div>
        <div class="markI" :style="{display: markVisibility}">
            <div class="upload" :style="{display: uploadPublicVisibility}">
                <div class="markTitle"> 公共设施 </div>
                <form action="">
                    <label>图片内容：</label>
                    <select class="placeType" ref='selectA'>
                        <option v-for='place in placeType' :value="place.id" >{{ place.placeTypeName }}</option>
                    </select>
                    <img :src="addHouse" class="addPark" @click="addParkType" /><img class="addPark" :src="decrease" @click="reduceParkType"/><br>
                    <label>文件上传:</label><input type="file" ref="picA" @change="showSelectPublic" style="display:none" /><br>
                    <img :src="addPic" ref="putOnA" class="shangchuan" @click='selectPicPublic'><br>
                    <span><img :src="star">支持jpg / png，图片大小不超过10M</span>
                    <div class="button">
                        <input type="button" value="取消" class="addPic" id="cancel" @click="cancelAddPublic">
                        <input type="button" value="确定" class="addPic" id="addPic" @click='submitPublic'>
                    </div>
                </form>
            </div>
            <div class="upload" :style="{display: uploadParkVisibility}">
                <div class="markTitle"> 园林景观 </div>
                <form action="">
                    <label>图片内容：</label>
                    <select class="placeType" ref='selectB'>
                        <option v-for='place in placeType' :value="place.id" >{{ place.placeTypeName }}</option>
                    </select>
                    <img :src="addHouse" class="addPark" @click="addParkType" /><img class="addPark" :src="decrease" @click="reduceParkType"/><br>
                    <label>文件上传:</label><input type="file" ref="picB" @change="showSelectPark" style="display:none" /><br>
                    <img :src="addPic" ref="putOnB" class="shangchuan" @click='selectPicPark'><br>
                    <span><img :src="star">支持jpg / png，图片大小不超过10M</span>
                    <div class="button">
                        <input type="button" value="取消" class="addPic" id="cancel" @click="cancelAddPark">
                        <input type="button" value="确定" class="addPic" id="addPic" @click='submitPark'>
                    </div>
                </form>
            </div>        
            <div class="addPlaceType" :style="{display: placeTypeVisibility}">
                <div class="placeTitle">
                    增加类型
                    <img :src="this.tankuang" id="chaHouse" @click='cancelAddPlaceType'>
                </div>
                <form action="">
                    <input type="text" name="house" id="addI" ref="addContentA" maxlength="8" class="addType">
                    <input type="button" value="确定" id="add" @click='addPlaceType'>
                </form>
            </div>   
            <div class="addPlaceType" :style="{display: placeReduceTypeVisibility}">
                <div class="placeTitle">
                    减少类型
                    <img :src="this.tankuang" id="chaHouse" @click='cancelReducePlaceType'>
                </div>
                <form action="" >
                    <select ref='selectC'>
                        <option v-for='place in placeType' :value="place.id" >{{ place.placeTypeName }}</option>
                    </select>
                    <input type="button" value="确定" id="delete" @click="reducePlaceType">
                </form>
            </div>             
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'//获取预览图片地址
import qs from 'qs';
import ip from '../../../static/ip'
export default {
    data() {
        return {
            addBig: require('../../assets/img/addPic.png'),
            chaPic: require('../../assets/img/cha.png'),//叉图片
            addHouse: require('../../assets/img/addHouse.png'),
            decrease: require('../../assets/img/decrease.png'),
            addPic: require('../../assets/img/addPic2.png'),
            star: require('../../assets/img/star.png'),
            tankuang: require('../../assets/img/tankuang.png'),
            placeType: [],
            markVisibility: 'none',//遮罩层显现
            uploadPublicVisibility: 'none',
            uploadParkVisibility: 'none',
            placeTypeVisibility: 'none',
            placeReduceTypeVisibility: 'none',
            public: [],//公共设施
            parkView: [],//园林景观
            head: ip + ':8080/static/image/',
            dialogImageUrl: '',
            dialogVisible: false,
            filePicPublic: {},
            filePicPark: {}
        }
    },
    created() {
        this.$axios.get("/surround/publicUtilities/get")
        .then(res => {
            res.data.data.forEach((content, i) => {
                if (content.imageType == 1) {
                    this.public.push(content);
                } else {
                    this.parkView.push(content);
                }
            });
        })
        .catch(error => {
            this.$message.error('获取失败！');
        });   
        
        this.$axios.get('/surround/placeType/get').then((res) => {
            this.placeType = res.data.data;
        }).catch((err) => {
            this.$message.error('获取失败！');
        })
    },
    components: {

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
        //增加公共设施
        addPublic() {
            this.$forceUpdate();
            this.markVisibility = 'block';//遮罩层显现
            this.uploadPublicVisibility = 'block';           
        },
        //删除公共设施
        deletePublic(i, content) {
            this.$axios.delete('/surround/publicUtilities/delete?utilitiesInfoId=' + content.id).then((res) => {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.public.splice(i, 1);
                this.$forceUpdate();
            }).catch((err) => {
                this.$message.error('删除失败！');
            })
        },
        //增加园林景观
        addParkview() {
            this.$forceUpdate();
            this.markVisibility = 'block';//遮罩层显现
            this.uploadParkVisibility = 'block';   
        },
        //删除园林景观
        deleteParkview(i, content) {
            this.$axios.delete('/surround/publicUtilities/delete?utilitiesInfoId=' + content.id).then((res) => {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.parkView.splice(i, 1);
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
        //增加公园类型
        addParkType() {
            this.$forceUpdate();
            this.placeTypeVisibility = 'block'; 
            this.placeReduceTypeVisibility = 'none';
        },
        //减少公园类型
        reduceParkType() {
            this.$forceUpdate();
            this.placeTypeVisibility = 'none'; 
            this.placeReduceTypeVisibility = 'block';
        },
        //file改变时
        showSelectPublic(e) {
            if (e.target.files[0]) {
                this.$refs.putOnA.src = getUrl(e.target.files[0]);
                this.filePicPublic = e.target.files[0];
            }
        },
        //点击增加图片
        selectPicPublic() {
            this.$refs.picA.click();
        },
        //取消增加公共设施
        cancelAddPublic() {
            this.$forceUpdate();
            this.markVisibility = 'none';//遮罩层显现
            this.uploadPublicVisibility = 'none';      
        },
        //提交公共设施
        submitPublic() {
            if (this.filePicPublic && this.$refs.selectA.value) {
                let formdata = new FormData();
                formdata.append('placeTypeId', this.$refs.selectA.value);
                formdata.append('imageType', 1);
                formdata.append('imageFile', this.filePicPublic);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  
                    }
                }
                this.$axios.post('/surround/publicUtilities/add', formdata, config).then((res) => {
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                    //改变预览
                    this.$forceUpdate();
                    this.public.push(res.data.data);
                    this.cancelAddPublic();    
                }).catch((error) =>{
                    this.$message.error('上传失败！');
                });
            } else {
                this.$message({
                    message: '不能留空！',
                    type: 'warning'
                });
            }       
        },
        showSelectPark(e) {
            if (e.target.files[0]) {
                this.$refs.putOnB.src = getUrl(e.target.files[0]);
                this.filePicPark = e.target.files[0];
            }
        },
        selectPicPark() {
            this.$refs.picB.click();
        },
        //取消
        cancelAddPark() {
            this.$forceUpdate();
            this.markVisibility = 'none';//遮罩层显现
            this.uploadPublicVisibility = 'none';     
        },
        submitPark() {
            if (this.filePicPark && this.$refs.selectB.value) {
                let formdata = new FormData();
                formdata.append('placeTypeId', this.$refs.selectB.value);
                formdata.append('imageType', 0);
                formdata.append('imageFile', this.filePicPark);
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'  
                    }
                }
                this.$axios.post('/surround/publicUtilities/add', formdata, config).then((res) => {
                    this.$message({
                        message: '上传成功！',
                        type: 'success'
                    });
                    //改变预览
                    this.$forceUpdate();
                    this.parkView.push(res.data.data);
                    this.cancelAddPark();    
                }).catch((error) =>{
                    this.$message.error('上传失败！');
                });
            } else {
                this.$message({
                    message: '不能留空！',
                    type: 'warning'
                });
            }  
        },
        //取消增加类型
        cancelAddPlaceType() {
            this.$forceUpdate();
            this.placeTypeVisibility = 'none'; 
        },
        //提交修改的类型
        addPlaceType() {
            const addContent = this.$refs.addContentA;
            if (addContent.value) {
                const config = {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
                this.$axios.post('/surround/placeType/add', qs.stringify({placeTypeName: addContent.value}) , config).then((res) => {
                    if (res.data.code == 0) {
                        this.$message({
                            message: '添加类型已经存在！',
                            type: 'warning'
                        });
                    } else if (res.data.code == 1) {
                        this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                        this.$forceUpdate();
                        this.placeType.push(res.data.data);
                    }
                }).catch((err) => {
                    this.$message.error('添加失败！');
                });
            } else {
                this.$message({
                    message: '添加类型不可为空！',
                    type: 'warning'
                });
            }
            this.cancelAddPlaceType();//确定后让弹框消失           
        },
        //取消减少类型
        cancelReducePlaceType() {
            this.$forceUpdate();
            this.placeReduceTypeVisibility = 'none';
        },
        //提交减少类型
        reducePlaceType() {
            this.$refs.selectC.value ? this.$axios.delete('/surround/placeType/delete?placeTypeInfoId=' + this.$refs.selectC.value).then((res) => {
                this.$message({
                    message: '删除成功！',
                    type: 'success'
                });
                this.$forceUpdate();
                let deleteIndex;
                this.placeType.forEach((place, i) => {
                    place.id == this.$refs.selectC.value ? deleteIndex = i : "";
                });
                this.placeType.splice( deleteIndex, 1 ); 
                this.cancelReducePlaceType();
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
@import "../../styles/main.scss";
@import "../../styles/mixin.scss";

.parkPage {
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
        .pageOne {
            width: 100%;
            height: 100%;
            display: flex;
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
                   
                }
            }
        }
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
    .markI {
        width: 100%;
        height: 100%;
        background: rgba(61,69,90,.6);
        position: absolute;
        top: 0;
        left: 0;
        .upload {
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
            .addPark {
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
        .addPlaceType {
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
            .placeTitle {
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
    }
}
.el-loading-parent--relative {
    position: initial!important;
}
</style>
