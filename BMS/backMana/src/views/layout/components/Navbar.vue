<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb> -->
    <div class="select">
      <span @click="displayPro">{{ nowPro }}<i :class="downIcon"></i></span>
      <div class="projectSelect" :style="{display: proSelectDisplay}">
        <el-autocomplete
          class="inline-input"
          v-model="project"
          :fetch-suggestions="querySearch"
          placeholder="项目名称"
          @select="handleSelect"
        ></el-autocomplete>
        <el-button class="inline-input" @click="clickChange">切换</el-button>
        <div class="content">
          <el-row :gutter="20" v-if="allProject[0]">
            <el-col :span="6" v-if="allProject[0]"><div class="grid-content bg-purple" @click="changePro(0)">{{ allProject[0].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[1]"><div class="grid-content bg-purple" @click="changePro(1)">{{ allProject[1].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[2]"><div class="grid-content bg-purple" @click="changePro(2)">{{ allProject[2].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[3]"><div class="grid-content bg-purple" @click="changePro(3)">{{ allProject[3].value }}</div></el-col>
          </el-row>
          <el-row :gutter="20" v-if="allProject[4]">
            <el-col :span="6" v-if="allProject[4]"><div class="grid-content bg-purple" @click="changePro(4)">{{ allProject[4].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[5]"><div class="grid-content bg-purple" @click="changePro(5)">{{ allProject[5].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[6]"><div class="grid-content bg-purple" @click="changePro(6)">{{ allProject[6].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[7]"><div class="grid-content bg-purple" @click="changePro(7)">{{ allProject[7].value }}</div></el-col>
          </el-row>
          <el-row :gutter="20" v-if="allProject[8]">
            <el-col :span="6" v-if="allProject[8]"><div class="grid-content bg-purple" @click="changePro(8)">{{ allProject[8].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[9]"><div class="grid-content bg-purple" @click="changePro(9)">{{ allProject[9].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[10]"><div class="grid-content bg-purple" @click="changePro(10)">{{ allProject[10].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[11]"><div class="grid-content bg-purple" @click="changePro(11)">{{ allProject[11].value }}</div></el-col>
          </el-row>
          <el-row :gutter="20" v-if="allProject[12]">
            <el-col :span="6" v-if="allProject[12]"><div class="grid-content bg-purple" @click="changePro(12)">{{ allProject[12].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[13]"><div class="grid-content bg-purple" @click="changePro(13)">{{ allProject[13].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[14]"><div class="grid-content bg-purple" @click="changePro(14)">{{ allProject[14].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[15]"><div class="grid-content bg-purple" @click="changePro(15)">{{ allProject[15].value }}</div></el-col>
          </el-row>
          <el-row :gutter="20" v-if="allProject[16]">
            <el-col :span="6" v-if="allProject[16]"><div class="grid-content bg-purple" @click="changePro(16)">{{ allProject[16].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[17]"><div class="grid-content bg-purple" @click="changePro(17)">{{ allProject[17].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[18]"><div class="grid-content bg-purple" @click="changePro(18)">{{ allProject[18].value }}</div></el-col>
            <el-col :span="6" v-if="allProject[19]"><div class="grid-content bg-purple" @click="changePro(19)">{{ allProject[19].value }}</div></el-col>
          </el-row>
        </div>
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
          <a class="user-head">后台管理系统</a>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="hambur">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <breadcrumb></breadcrumb>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import qs from 'qs'

export default {
  data() {
    return {
      proSelectDisplay: "none",
      downIcon: "el-icon-arrow-down",
      project: "",//model的内容
      projects: [],//为所有项目的内容
      allProject: [],//显示的所有项目
      selectPro: '',//选择的项目
      nowPro: "",//当前项目
      product: ""
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'projectA'
    ]),
  },
  created() {

    this.getAllProject();
  },
  methods: {
    getAllProject() {
      //获取所有的项目名称
      const projectName = [];
      this.projects = [];
      this.allProject = [];
      this.nowPro = "";
      this.$axios.get('/manage/project/get').then((res) => {
                    //存省
        res.data.data.forEach((data) => {
          this.projects.unshift({
            "value": data.projectName,
            "id": data.id
          });
        });      
        //获取当前项目
        this.$axios.post('/manage/concurrentProject/get').then((res) => {
          this.projects.forEach((project) => {
            if (project.id == res.data.data) {
              this.nowPro = project.value;
            }
          });
          if (this.nowPro == "") {
            const config = {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded' 
              }
            }
            this.$axios.post('/manage/concurrentProject/update', qs.stringify({projectId: this.allProject[0].id}), config).then((res) => {
              if (res.data.code == 1) {
                  // this.$message({
                  //   message: '切换成功！',
                  //   type: 'success'
                  // });
                  setTimeout(() => {
                    this.$router.go(0);
                  }, 500);
                  
              } else {
                this.$message.error('切换失败！');
              }
            }).catch((err) => {
              this.$message.error('切换失败！');
            });   
          }
        }).catch((err) => {
          this.$message.error('获取当前项目失败！');
        });
        this.allProject.length <= 20 && this.projects.forEach((data) => {
          this.allProject.push(data);
        })
      }).catch((err) => {
        this.$message.error('获取项目失败！');
      });   
    },
    //点击下拉框出现所有项目
    displayPro() {
      if (this.proSelectDisplay == 'none') {
        this.proSelectDisplay = 'block';
        this.downIcon = 'el-icon-close';
      } else {
        this.proSelectDisplay = 'none';
        this.downIcon = 'el-icon-arrow-down';       
      }
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        // location.reload() // 为了重新实例化vue-router对象 避免bug
        this.$store.state.user.loginStatus = 0
        router.push('/')
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.projects;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.selectPro = item.id;
    },
    //切换项目
    changePro(index) {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
          }
        }
        this.$axios.post('/manage/concurrentProject/update', qs.stringify({projectId: this.allProject[index].id}), config).then((res) => {
          if (res.data.code == 1) {
              this.$message({
                message: '切换成功！',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.go(0);
              }, 500);
              
          } else {
            this.$message.error('切换失败！');
          }
        }).catch((err) => {
          this.$message.error('切换失败！');
        });   
    },
    //点击切换项目
    clickChange() {
      if (!this.selectPro) {
        this.$message({
          message: '项目名称不能为空！',
          type: 'warning'
        });      
      } else {
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded' 
          }
        }
        this.$axios.post('/manage/concurrentProject/update', qs.stringify({projectId: this.selectPro}), config).then((res) => {
          if (res.data.code == 1) {
              this.$message({
                message: '切换成功！',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.go(0);
              }, 500);
          } else {
            this.$message.error('切换失败！');
          }
        }).catch((err) => {
          this.$message.error('切换失败！');
        });        
      }
    }
  },
  watch: {
    projectA(val) {
      if (val == true) {
        this.$forceUpdate();
        this.getAllProject();
        this.$store.dispatch('changePro', {project: false})
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .select {
    width: 100%;
    height: 50px;
    span {
      font-size: 15px;
      margin-left: 20px;
      font-weight: 600;
      cursor: pointer;
      i {
        margin-left: 5px;
      }
    }
    .projectSelect {
      position: absolute;
      width: 100%;
      height: 600px;
      margin-top: 0px;
      z-index: 1000;
      background-color: white;
      padding: 10px 20px;
      .inline-input {
        float: left;
      }
      button {
        margin-top: 4px;
        margin-left: 5px;
      }
      .content {
        width: 100%;
        height: 90%;
        margin-top: 5%;
        .el-row {
          margin-bottom: 50px;
          &:last-child {
            margin-bottom: 0;
          }
        }
        .el-col {
          border-radius: 4px;
        }
        .bg-purple-dark {
          // background: #99a9bf;
        }
        .bg-purple {
          // background: #d3dce6;
        }
        .bg-purple-light {
          // background: #e5e9f2;
        }
        .grid-content {
          border-radius: 4px;
          min-height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 15px;
          color: #409EFF;
          cursor: pointer;
        }
        .row-bg {
          padding: 10px 0;
          // background-color: #f9fafc;
        }
      }
    }
    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 35px;
      .avatar-wrapper {
        cursor: pointer;
        height: 50px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          margin-top: 5px;
          border-radius: 10px;
          float: left;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
  .hambur {
    width: 100%;
    height: 50px;
    background-color: #edf0f5;
    .hamburger-container {
      line-height: 58px;
      background-color: #edf0f5;
      height: 40px;
      float: left;
      padding: 0 10px;
    }
    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }
  }
}
</style>

