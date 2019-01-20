<template>
    <div class="addProjectPage">
        <div class="title">
            <p>编辑项目</p>
            <i class="el-icon-close" @click="cancelModify"></i>
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
                        <input type="file" id="qrFileModify" @change="sureQr" style="display:none"/>
                        <div class="qrCode row" :style="{ backgroundImage: 'url(' + qrCodeImage + ')'}"></div>
                        <el-button @click="uploadQr" icon="el-icon-refresh" class="row" :style="{left: addQr}">更改图片</el-button>
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
            <el-button @click="cancelModify">取消</el-button>
            <el-button type='primary' @click='addNewProject'>确定</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getUrl} from '../../utils/urlGet.js'
import getImage from '../../utils/getImage.js'
import qs from 'qs'
export default {
    data() {
        return {
            qrCodeDisplay: 'none',//二维码显现
            qrCodeImage: '',//二维码图片
            province: '',
            city: '',
            projectName: '',
            identity: '',
            contact: '',
            qrDes: "",
            idReal: 0,
            addQr: '25%',//上传按钮的位置
            qrFiles: {},
        }
    },
    components: {

    },
    mounted() {
        this.$on('modifyPro', (modifyInfo) => {
            //将默认值附上
            this.province = modifyInfo.province;
            this.city = modifyInfo.city;
            this.projectName = modifyInfo.projectName;
            this.identity = modifyInfo.id;
            this.contact = modifyInfo.contact;
            this.idReal = modifyInfo.idReal;
            this.qrDes = modifyInfo.projectDes;
            setTimeout(() => {
                modifyInfo.qrCode ? this.qrCodeImage = getImage(modifyInfo.qrCode, 1) : "" ;
            }, 30);
           
        })
    },
    methods: {
        //点击上传二维码按钮
        uploadQr() {
            document.getElementById('qrFileModify').click();
        },
        //二维码选定之后
        sureQr() {
            if (document.getElementById('qrFileModify').files[0]) {
                this.qrCodeImage = getUrl(document.getElementById('qrFileModify').files[0]);
                this.qrFiles = document.getElementById('qrFileModify').files[0];
                this.$forceUpdate();
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
            if (this.province && this.city && this.projectName && this.identity && this.contact && this.qrDes) {
                this.$axios.post('/manage/project/update', {
                    city: this.city,
                    customerPhone: this.contact,
                    projectIdentification: this.identity,
                    projectName: this.projectName,
                    province: this.province,
                    id: this.idReal,
                    qrDescription: this.qrDes
                }, config).then((res) => {
                    if (res.data.code == 1) {
                        //再提交图片
                        if (this.qrFiles.size) {
                            const id = this.idReal;
                            formdata.append('imageFile', this.qrFiles);
                            formdata.append('projectInfoId', id);
                            this.$axios.post('/manage/project/image/update', formdata, configNoJson).then((respond) => {
                                this.$message({
                                    message: '提交成功！',
                                    type: 'success'
                                });       
                                //更新修改的信息
                                this.$emit('updateModify', {
                                    city: this.city,
                                    contact: this.contact,
                                    id: this.identity,
                                    projectName: this.projectName,
                                    province: this.province,   
                                    qrDescription: this.qrDes                             
                                }, {
                                    id: this.idReal,
                                    projectPic: respond.data.data
                                });        
                                this.cancelModify();//弹框消失   
                                // this.router.go(0);          
                                this.$store.dispatch('changePro', {project: true})      
                                     
                            }).catch((err1) => {
                                this.$message.error('提交失败！');
                            });
                        } else {
                            this.$message({
                                message: '提交成功！',
                                type: 'success'
                            });           
                            //更新修改的信息
                            this.$emit('updateModify', {
                                city: this.city,
                                contact: this.contact,
                                id: this.identity,
                                projectName: this.projectName,
                                province: this.province,    
                                qrDescription: this.qrDes                                 
                            }, {}); 
                            this.cancelModify();//弹框消失   
                            // this.router.go(0);      
                            this.$store.dispatch('changePro', {project: true})                       
                        }
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
        cancelModify() {
            this.$emit('cancelModify');
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
                    width: 10%;
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
