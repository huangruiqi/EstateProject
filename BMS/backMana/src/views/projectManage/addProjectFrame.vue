<template>
    <div class="addProjectPage">
        <div class="title">
            <p>新增项目</p>
            <i class="el-icon-close" @click="cancelAdd"></i>
        </div>
        <div class="content">
            <table border='0' cellspacing='10' cellpadding='0'>
                <tr>
                    <td>基本信息</td>
                    <td>
                        <el-input
                            placeholder="省/市"
                            v-model="province"
                            clearable>
                        </el-input>
                    </td>
                    <td>
                        <el-input
                            placeholder="市/区"
                            v-model="city"
                            clearable>
                        </el-input>
                    </td>
                    <td>
                        <el-input
                            placeholder="项目名"
                            v-model="projectName"
                            clearable>
                        </el-input>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>项目标识</td>
                    <td>
                        <el-input
                            placeholder="项目ID"
                            v-model="identity"
                            clearable>
                        </el-input>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>项目客服</td>
                    <td>
                        <el-input
                            placeholder="客服电话"
                            v-model="contact"
                            clearable>
                        </el-input>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>二维码描述</td>
                    <td>
                        <el-input
                            placeholder="二维码描述"
                            v-model="qrDes"
                            clearable>
                        </el-input>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td rowspan="3"> 二维码</td>
                    <td rowspan="3" colspan="2" class="buttonCode">
                        <input type="file" @change="sureQr" id="qrFile" style="display:none"/>
                        <div class="qrCode row" :style="{display: qrCodeDisplay, backgroundImage: 'url(' + qrCodeImage + ')'}"></div>
                        <el-button @click="uploadQr" :icon="icon" class="row" :style="{left: addQr}">{{buttonWords}}</el-button>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
        <div class="foot">
            <el-button @click="cancelAdd">取消</el-button>
            <el-button type='primary' @click='addNewProject'>确定</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
import qs from 'qs'
export default {
    data() {
        return {
            icon: 'el-icon-upload2',
            qrCodeDisplay: 'none',//二维码显现
            qrCodeImage: '',//二维码图片
            province: '',
            city: '',
            projectName: '',
            identity: '',
            contact: '',
            addQr: '',//上传按钮的位置
            qrFiles: {},//为上传的图片文件
            qrDes: "",//二维码描述
            buttonWords: "上传图片",//
        }
    },
    components: {

    },
    methods: {
        //点击上传二维码按钮
        uploadQr() {
            document.getElementById('qrFile').click();
        },
        //二维码选定之后
        sureQr() {
            //防止点取消
            if (document.getElementById('qrFile').files[0]) {
                this.icon = 'el-icon-refresh';
                this.buttonWords = '更改图片';
                this.qrCodeDisplay = 'block';
                this.addQr = '25%';
                this.$forceUpdate();
                this.qrCodeImage = getUrl(document.getElementById('qrFile').files[0]);
                this.qrFiles = document.getElementById('qrFile').files[0];
            }
        },
        //点击增加新项目
        addNewProject() {
            const config = {
                headers: {
                    'Content-Type': 'application/json' 
                }
            }
            const configNoJson = {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                }
            }
            let formdata = new FormData();
            //先提交文字
            if (this.province && this.city && this.projectName && this.identity && this.contact && this.qrDes && this.qrFiles.size) {
                this.$axios.post('/manage/project/add', {
                    city: this.city,
                    customerPhone: this.contact,
                    projectIdentification: this.identity,
                    projectName: this.projectName,
                    province: this.province,
                    qrDescription: this.qrDes
                }, config).then((res) => {
                    if (res.data.code == 1) {
                        //再提交图片
                        const id = res.data.data.id;
                        formdata.append('imageFile', this.qrFiles);
                        formdata.append('projectInfoId', id);
                        this.$axios.post('/manage/project/image/update', formdata, configNoJson).then((respond) => {
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });
                            //更新表格信息
                            this.$emit('updateNew', {
                                city: this.city,
                                contact: this.contact,
                                id: this.identity,
                                projectName: this.projectName,
                                province: this.province,
                                projectDes: this.qrDes                           
                            }, {
                                id: id,
                                projectPic: respond.data.data
                            });
                            this.cancelAdd();//弹框消失   
                            // this.router.go(0);    
                            this.$store.dispatch('changePro', {project: true})                      
                        }).catch((err1) => {
                            this.$message.error('提交失败！');
                        });
                    } else {
                        this.$message({
                            message: '项目标识以及项目名称不能重复！',
                            type: 'warning'
                        });                            
                    }

                }).catch((err) => {
                    this.$message.error('提交失败！');
                });
            } else {
                this.$message({
                    message: '提交不能为空',
                    type: 'warning'
                });                   
            }
        },
        //取消提交
        cancelAdd() {
            this.$emit('cancelAdd');
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../styles/main";
@import "../../styles/mixin";
.addProjectPage {
    width: 70%;
    height: 60%;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: px2rem(15);
    .title {
        width: 100%;
        height: 15%;
        padding: px2rem(30);
        @include fj();
        align-items: center;
        border-bottom: px2rem(1) solid black;
        p {
            @include sc(px2rem(25), black);
        }
        i {
            font-size: px2rem(30);
            cursor: pointer;
        }
    }
    .content {
        width: 100%;
        height: 70%;
        @include fj(center);
        align-items: center;
        table {
            width: 90%;
            height: 95%;
            @include sc(px2rem(20), black);
            tr {
                height: 13.7%;
                >td {
                    width: 30%;
                    align-items: center;
                }
                .buttonCode {
                    position: relative;
                    .qrCode {
                        width: px2rem(120);
                        height: px2rem(120);
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                    }
                    .row {
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                    .el-button {
                        transition: all 0;
                        // transform: translateY(80%);
                        
                    }
                }
                >td:first-of-type {
                    width: 12%;
                }
                >td:last-of-type {
                    width: 5%;
                }
            }

        }
    }
    .foot {
        width: 100%;
        height: 15%;
        @include fj(center);
        .el-button {
            height: 65%;
            @include fj(center);
            align-items: center;
            span {
                width: 30%;
                height: 50%;
                @include fj(center);
                align-items: center;
            }
        }
    }
}
</style>
