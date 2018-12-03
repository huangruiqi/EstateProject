<template>
  <div class="loginIn">
    <div class="loginInTop">
      <img src="../../assets/img/loginIn/bgc.png" alt="">
    </div>
    <div class="loginInfo">
      <div class="loginWelcome">
        <p class="loginText1">欢迎使用</p>
        <p class="loginText2">售楼演示后台管理系统</p>
      </div>
      <form action="" id="loginUser" ref="loginForm">
        <input id="username" name="username" type="text" v-model.trim="userInfo.username" placeholder="请输入用户名">
        <input id="password" name="password" type="password" v-model="userInfo.password" placeholder="请输入密码" @keyup.enter="handleLogin">
      </form>
      <div class="loginInBottom">
        <input type="submit" value="登录" @click="handleLogin">
      </div>
    </div>
    <div class="loginBottom">
      <img src="../../assets/img/loginIn/logo.png" alt="">
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "../../styles/main";
@import "../../styles/mixin";
  .loginIn {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .loginInTop {
      width: 100%;
      height: px2rem(740);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .loginInfo {
      position: fixed;
      width: px2rem(450);
      height: px2rem(580);
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: #ffffff;
      box-shadow: 3px 5px 9px 0px 
        rgba(0, 0, 0, 0.06);
      border-radius: 2px;
      @include fj(center);
      flex-direction: column;
      align-items: center;
      .loginWelcome {
        width: px2rem(234);
        height: px2rem(90);
        @include fj(center);
        flex-direction: column;
        align-items: center;
        .loginText1 {
          font-size: px2rem(33);
          letter-spacing: 1px;
          color: #3aa7ff;
        }
        .loginText2 {
          font-size: px2rem(22);
          color: #5c5c5c;
        }
      }
      #loginUser {
        width: px2rem(360);
        height: px2rem(200);
        margin-top: px2rem(20);
        #username, #password {
          width: 100%;
          height: px2rem(65);
	        border: solid 2px #e5e5e5;
          margin-top: px2rem(28);
        }
        input:focus {
          border: solid 2px #3aa7ff;
        }
        label {
          width: px2rem(115);
          height: px2rem(20);
          margin-top: px2rem(28);
          display: block;
          float: right;
          text-align: right;
          font-size: px2rem(18);
          input {
            height: px2rem(22);
          }
        }
      }
      .loginInBottom {
        width: px2rem(360);
        height: px2rem(65);
        margin-top: px2rem(100);
        input {
          width: 100%;
          height: 100%;
          color: #fff;
          background-color: #3aa7ff;
	        border-radius: 2px;
        }
      }
    }
    .loginBottom {
      width: 100%;
      @include fj(center);
      img {
        width: px2rem(230);
        height: px2rem(45);
        position: fixed;
        bottom: px2rem(66);
      }
    }
  }
</style>
<script>
import qs from 'qs'
export default {
  name: 'login',
  data() {
    return {
      userInfo: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin() {
      if (this.userInfo.username == '') {
        alert('用户名不能为空！');
        return false
      }
      if (this.userInfo.password == '') {
        alert('密码名不能为空');
        return false
      }
      this.$axios.get('/login/status')
        .then(res => {
          this.$store.loginStatus = res.data.statue
          // console.log(this.$store.loginStatus, res.data)
        })
      this.$axios.post('/login', qs.stringify(
        {
          count: this.userInfo.username,
          password: this.userInfo.password
        }
      ))
        .then(res => {
          this.$store.state.user.loginStatus = res.data.statue
          console.log(this.$store.state.user.loginStatus = res.data.statue)
          if (res.data.statue == 1) {
            this.loading = true
            this.$store.dispatch('Login', this.userInfo).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
            // this.$store.commit('setToken', res.data);
            // localStorage.userName = this.userInfo.userName;
            // // localStorage.token_expire = res.data.expire;
            // localStorage.token = res.data.token;
            // this.$notify({
            //   title : '提示信息',
            //   message : '登录成功',
            //   type : 'success'
            // });
            // this.$router.push({path:'/'})
          }else {
            this.$notify({
              title : '提示信息',
              message : '账号或密码错误',
              type : 'error'
            });
          }
        })
    }
  }
}
</script>
