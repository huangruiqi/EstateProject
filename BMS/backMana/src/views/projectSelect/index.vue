<template>
    <div class="projectSelect">
        <div class="page">
            <div class="nowDiv">
                <div class="title">当前编辑项目</div>
                <div class="content">
                    <el-cascader
                        :options="province"
                        change-on-select
                        placeholder="省/市"
                        :value='defaultProvince'
                        clearable
                        @change="handleProvince"
                    ></el-cascader> 
                    <el-cascader
                        :options="city"
                        change-on-select
                        placeholder="市/区"
                        :value='defaultCity'
                        clearable
                        @change="handleCity"
                    ></el-cascader> 
                    <el-cascader
                        :options="projectName"
                        change-on-select
                        placeholder="项目名称"
                        :value='defaultPro'
                        clearable
                        @change="handleProjectName"
                    ></el-cascader> 
                </div>
                <div class="foot">
                    <el-button 
                        type="primary" 
                        @click="selectInfo"
                    >提交</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script type="text/ecmascript-6">
import qs from 'qs'
export default {
    data() {
        return {
            province: [],
            city: [],
            projectName: [],
            selectProvince: "安徽",
            selectCity: "六安",
            selectProName: '房地产',
            allInfo: {},
            defaultProvince: ["安徽"],
            defaultCity: ["六安"],
            defaultPro: ["房地产"],
        }
    },
    components: {

    },
    created() {
        this.updateSelectDown();
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
                this.allInfo = res.data.data.info;
                //存省
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
         
            }).catch((err) => {
                this.$message.error('获取省市失败！');
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
        selectInfo() {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' 
                }
            }
            let id = 0;
            for (let i in this.allInfo) {
                if (i == this.selectProvince) {
                    for (let j in this.allInfo[i]) {
                        if (j == this.selectCity) {
                            for (let z in this.allInfo[i][j]) {
                                if (z == this.selectProName) {
                                    id = this.allInfo[i][j][z];
                                }
                            }
                        }
                    }
                }
            }
            if (id) {
                this.$axios.post('/manage/concurrentProject/update', qs.stringify({projectId: id}), config).then((res) => {
                    if (res.data.code == 1) {
                        this.$message({
                            message: '切换成功！',
                            type: 'success'
                        });
                    } else {
                        console.log(res);
                    }
                }).catch((err) => {
                    this.$message.error('切换失败！');
                });
            } else {
                this.$message({
                    message: '该项目不存在！',
                    type: 'warning'
                });
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../styles/main";
@import "../../styles/mixin";

.projectSelect {
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
        @include fj(center);
        align-items: center;
        .nowDiv {
            width: 70%;
            height: 60%;
            .title {
                width: 100%;
                height: 30%;
                @include sc(px2rem(25), black);
                @include fj();
                align-items: center;
            }
            .content {
                width: 100%;
                height: 60%;
                @include fj();
                align-items: flex-start;
            }
            .foot {
                width: 100%;
                height: 13%;
                @include fj(flex-end);
                button {
                    width: px2rem(200);
                }
            }
        }
    }
}
.el-loading-parent--relative {
    position: initial!important;
}
</style>
