<template>
    <div class="projectManage">
        <div class="page">
            <div class="title">项目查找</div>
            <div class="selectAdd">
                <div class="select">
                    <el-cascader
                        :options="province"
                        change-on-select
                        size= "mini"
                        placeholder="省/市"
                        clearable
                        @change="handleProvince"
                    ></el-cascader> 
                    <el-cascader
                        :options="city"
                        change-on-select
                        size= "mini"
                        placeholder="市/区"
                        clearable
                        @change="handleCity"
                    ></el-cascader> 
                    <el-cascader
                        :options="projectName"
                        change-on-select
                        size= "mini"
                        placeholder="项目名称"
                        clearable
                        @change="handleProjectName"
                    ></el-cascader> 
                    <el-button 
                        type="primary" 
                        size='mini'
                        @click="selectInfo"
                    >确定</el-button>
                </div>
                <div class="add">
                    <el-button @click='addNewPro' type="primary" size='mini'>新增项目</el-button>
                </div>
            </div>
            <div class="contentTable">
                <el-table
                    ref="multipleTable"
                    :data="tableContent"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @cell-click="modifyPro"
                    @select='selectDelet'
                    @select-all='selectAll'>
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    prop="id"
                    label="项目标识"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="province"
                    label="省/市"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="city"
                    label="市/区"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    label="项目"
                    width="130"
                    type=5>
                        <template slot-scope="scope"><a href='javascript:;'>{{scope.row.projectName}}</a></template>
                    </el-table-column>
                    <el-table-column
                    prop="contact"
                    label="联系电话"
                    show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                    prop="projectDes"
                    label="二维码描述"
                    width="130"
                    type=7>
                    </el-table-column>
                    <el-table-column
                    prop="projectPic"
                    label="二维码"
                    width="130"
                    type=7>
                        <template slot-scope="scope"><a href='javascript:;'>点击查看</a></template>
                    </el-table-column>

                </el-table>
                <el-pagination
                    layout="prev, pager, next"
                    :total="totalNum"
                    :page-size.sync="pageSize"
                    @current-change="jumpPage">
                </el-pagination>
            </div>
            <div class="sureSub">
                <el-button @click="deleteProject" type="danger"  plain>确认删除</el-button>
            </div>
        </div>
        <div class="markPro" :style="{display: markVisibility}">
            <add-project @updateNew='updateNew' @cancelAdd='cancelAdd' :style="{display: addProVisibility}"></add-project>
            <modify-project @updateModify='updateModify' @cancelModify='cancelModify' ref='modify' :style="{display: modifyProVisibility}"></modify-project>
        </div>
        <!-- 查看二维码 -->
        <el-dialog width='30%' :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import getImage from '../../utils/getImage.js'
import qs from 'qs'
import addProject from './addProjectFrame'
import modifyProject from './modifyProFrame'
export default {
    data() {
        return {
            province: [],//省的名字
            provinceData: [],//省的具体内容
            city: [],//市的名字
            cityData: [],//市的具体内容
            projectName: [],//项目名称
            tableContent: [],//为查找项目内容 
            tableExtra: [],//查找项目的其他信息
            totalNum: 0,
            pageSize: 7,//一页显示的数据数
            selectProvince: "",//级联选取的省
            selectCity: "",
            selectProName: "",
            dataAll: [],//所有查询的信息
            dataAllExtra: [],
            isClickSelect: 0,//确定有没有点击条件查询
            markVisibility: 'none', //为遮罩层的显现
            addProVisibility: 'none',//新增项目弹框
            modifyProVisibility: 'none',//修改项目弹框
            index: 0,//为修改的行索引
            dialogVisible: false,
            dialogImageUrl: '',
            selectDelete: [],//选择删除的框
            deleteIndex: [],//删除的id
            contentIndex: [],//删除的content的索引
            currentPage: 0,//当前页码
        }
    },
    created() {
        this.updateSelectDown();//存省市
        //获取第一页数据
        this.getPageInfo(1);
        //获取总数
        this.$axios.get('/manage/project/get').then((res) => {
            if (res.data.data && res.data.data.length) {
                this.totalNum = res.data.data.length;//让页码总数增加
            }
            
        }).catch((err) => {
            this.$message.error('获取信息失败！');
        });
    },
    components: {
        addProject,
        modifyProject

    },
    methods: {
        //存省市
        updateSelectDown() {
            this.province = [];
            this.provinceData = [];
            this.city = [];
            this.cityData = [];
            this.projectName = [];
            this.$axios.get('/manage/project/tree/get').then((res) => {
                //存省
                if (res.data.data && res.data.data.info) {
                    for (let i in res.data.data.info) {
                        this.province.push({
                            value: i,
                            label: i
                        });
                        //存内容
                        this.provinceData.push(res.data.data.info[i]);
                    }
                    
                    //存市
                
                    this.provinceData.forEach((province) => {
                        for (let i in province) {
                            this.city.push({
                                value: i,
                                label: i
                            });
                            //存内容
                            this.cityData.push(province[i])
                        }                             
                    });     

                    
                    //存项目,具有查重的需求
                
                    this.cityData.forEach((city) => {
                        for (let i in city) {
                            let sameNum = 0;//记录是否项目名称重复
                            this.projectName.forEach((project) => {
                                if (project.value && project.value == i) {
                                    sameNum++;
                                }
                            });
                            if (!sameNum) {
                                this.projectName.push({
                                    value: i,
                                    label: i
                                });
                            }
                        }
                    });  
                }
         
            }).catch((err) => {
                this.$message.error('获取省市失败！');
            });
        },
        //获取某页的信息
        getPageInfo(page) {
            //存所有表格
            const config = {
                headers: {
                    'Content-Type': 'application/json'  
                }
            }; 
            this.$axios.post('/manage/project/page/get', {
                concurrentPage: page, 
                pageSize: 7
            }, config).then((res) => {
                this.tableContent = [];//清空
                this.tableExtra = [];
                res.data.data.pageData.forEach((data) => {
                    this.tableContent.push({
                        id: data.projectIdentification,
                        province: data.province,
                        city: data.city,
                        projectName: data.projectName,
                        contact: data.customerPhone,
                        projectDes: data.qrDescription
                    });
                    this.tableExtra.push({
                        id: data.id,
                        projectPic: data.qrCode
                    });
                });
            }).catch((err) => {
                this.$message.error('获取信息失败！');
            });
        },
        //级联省改变时
        handleProvince(province) {
            this.selectProvince = province[0];
            if (this.selectProvince) {
                this.$forceUpdate();
                let index = 0;//选择省的索引
                this.province.forEach((data, i) => {
                    if (data.label == this.selectProvince) {
                        index = i;
                    }
                });
                this.city = [];
                this.cityData = [];
                
                //存市
                for (let i in this.provinceData[index]) {
                    this.city.push({
                        value: i,
                        label: i
                    });
                    //存内容
                    for (let j in this.provinceData[index][i]) {
                        this.cityData.push(j)
                   }
                    
                }
            }
        },
        //级联市改变时
        handleCity(city) {
            this.selectCity = city[0];
        },
        //级联项目名改变时
        handleProjectName(name) {
            this.selectProName = name[0];
        },
        //提交查询
        selectInfo() {
            this.isClickSelect = 1;//点击查询
            const config = {
                headers: {
                    'Content-Type': 'application/json'  
                }
            }; 
            this.$axios.post('/manage/project/search', {
                city: this.selectCity,
                province: this.selectProvince,
                projectName: this.selectProName
            }, config).then((res) => {
                this.dataAll = [];//清空
                res.data.data.forEach((data) => {
                    this.dataAll.push({
                        id: data.projectIdentification,
                        province: data.province,
                        city: data.city,
                        projectName: data.projectName,
                        contact: data.customerPhone,
                        projectDes: data.qrDescription
                    });
                    this.dataAllExtra.push({
                        id: data.id,
                        projectPic: data.qrCode                       
                    });
                });
                this.getSelectPage(1);
            }).catch((err) => {
                this.$message.error('获取信息失败！');
            });            
        },
        //查询信息分页
        getSelectPage(page) {
            //修改表格内容
            const start = (page - 1) * 7;//起始行
            const end = start + 6;//终止行
            this.tableContent = [];//清空
            this.tableExtra = [];
            this.dataAll.forEach((data, i) => {
                if (i >= start && i <= end) {
                    this.tableContent.push(data);
                }
            });
            this.dataAllExtra.forEach((data, i) => {
                    this.tableExtra.push(data);
            });
            this.$forceUpdate();
            //修改分页标
            this.totalNum = this.dataAll.length;
        },
        //跳转某一页
        jumpPage(page) {
            //判断是否为条件查询以后内容的跳转，都怪后台只写了一个分页情况
            this.currentPage = page;
            if (this.isClickSelect == 0) {
                this.getPageInfo(page);
            } else {
                this.getSelectPage(page);
            }
        },
        //新增项目
        addNewPro() {
            this.$forceUpdate();
            this.markVisibility = 'block';
            this.addProVisibility = 'block';
            this.updateSelectDown();//存省市
        },
        //取消新增项目
        cancelAdd() {
            this.$forceUpdate();
            this.markVisibility = 'none';
            this.addProVisibility = 'none';            
        },
        //更新新加的项目
        updateNew(newContent, newExtra) {
            this.$forceUpdate();
            this.totalNum++;
            this.tableContent.push(newContent);
            this.tableExtra.push(newExtra);
            this.updateSelectDown();//存省市
        },
        //更新修改的项目
        updateModify(newContent, newExtra) {
            this.$forceUpdate();
            this.tableContent[this.index].id = newContent.id;
            this.tableContent[this.index].province = newContent.province;
            this.tableContent[this.index].city = newContent.city;
            this.tableContent[this.index].projectName = newContent.projectName;
            this.tableContent[this.index].contact = newContent.contact;
            this.tableContent[this.index].projectDes = newContent.qrDescription
            // newExtra.id ? {this.tableExtra[this.index] = newExtra : "";
            if (newExtra && newExtra.id) {
                this.tableExtra[this.index].id = newExtra.id;
                this.tableExtra[this.index].projectPic = newExtra.projectPic;
            }
            this.updateSelectDown();//存省市
        },
        //修改项目
        modifyPro(row, column, cell, event) {
            this.modifyReal(row, column, cell, event);
            this.checkQr(row, column, cell, event);
        },
        modifyReal(row, column, cell, event) {
            if (column.type == 5) {
                this.$forceUpdate();
                this.markVisibility = 'block';
                this.modifyProVisibility = 'block';  
                this.tableContent.forEach((data, i) => {
                    row.id == data.id ? this.index = i : "" ;
                })
                //带上所有信息
                let modifyInfo = row;
                modifyInfo.idReal = this.tableExtra[this.index].id;
                modifyInfo.qrCode = this.tableExtra[this.index].projectPic;
                this.$refs.modify.$emit('modifyPro', modifyInfo);
            } 
        },
        //查看二维码
        checkQr(row, column, cell, event) {
            if (column.type == 7) {
                let index = 0;//第几行索引
                this.tableContent.forEach((data, i) => {
                    row.id == data.id ? index = i : "" ;
                })               
                this.dialogVisible = true;
                this.dialogImageUrl = getImage(this.tableExtra[index].projectPic, 1);
            }
        },
        //取消修改项目
        cancelModify() {
            this.$forceUpdate();
            this.markVisibility = 'none';
            this.modifyProVisibility = 'none';   
        },
        //选择删除框
        selectDelet(selection, row) {
            this.selectDelete = selection;
            this.deleteIndex = [];
            this.contentIndex = [];
            selection.forEach((select, i) => {
                this.tableContent.forEach((data, j) => {
                    if (select.id == data.id) {
                        this.deleteIndex.push(this.tableExtra[j].id)
                        this.contentIndex.push(j);
                    }
                });
            });
        },
        selectAll(selection) {
            this.deleteIndex = [];
            this.selectDelete = selection;
            selection.length && this.tableExtra.forEach((data) => {
                this.deleteIndex.push(data.id);
            });
        },
        //删除项目
        deleteProject() {
            this.deleteIndex.forEach((data) => {
                this.$axios.delete('/manage/project/delete?projectInfoId='+data).then((res) => {
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });     
                    this.$forceUpdate();
                    this.totalNum--;
                    this.isClickSelect ? this.getSelectPage(this.currentPage) : this.getPageInfo(this.currentPage);
                    this.updateSelectDown();//存省市
                    // this.router.go(0);     
                    this.$store.dispatch('changePro', {project: true})
                }).catch((err) => {
                    this.$message.error('删除失败！');
                });
            });
            // this.contentIndex.forEach((data) => {
            //     this.$forceUpdate();
            //     this.tableContent.splice(data, 1);
            //     this.tableExtra.splice(data, 1);
            // });
        }

    }
}
</script>

<style scoped lang="scss">
@import "../../styles/main";
@import "../../styles/mixin";

.projectManage {
    width: 100%;
    height: px2rem(930);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #edf0f5;
    .page {
        width: px2rem(1500);
        height: px2rem(scale(1500));
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        background-color: white;
        padding: px2rem(30);
        .title {
            width: 100%;
            height: 5%;
            @include sc(px2rem(25), black);
        }
        .selectAdd {
            width: 100%;
            height: 7%;
            @include fj();
        }
        .contentTable {
            width: 100%;
            height: 80%;
            @include fj();
            flex-direction: column;
            align-items: center;
            a {
                color: #409EFF;
            }
        }
        .sureSub {
            width: 100%;
            height: 8%;
            @include fj(flex-end);
        }
    }

    .markPro {
        width: 100%;
        height: 100%;
        background: rgba(61,69,90,.6);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }
}
.el-loading-parent--relative {
    position: initial!important;
}

</style>
