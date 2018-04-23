<template>
    <div class="bigbk">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          logining: false,
          ruleForm2: {
            account: 'admin',
            checkPass: '123456'
          },
          rules2: {
            account: [
              { required: true, message: '请输入账号', trigger: 'blur' },
              //{ validator: validaePass }
            ],
            checkPass: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              //{ validator: validaePass2 }
            ]
          },
          checked:true
        }
      },
      methods:{
        handleSubmit2() {
          var _this = this
          //提交表单
          this.$refs.ruleForm2.validate((valid)=>{
            if(valid){
              this.logining = true;
              let loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
              //调用接口
//              this.$api.requestLogin(loginParams)
//                .then((data)=>{
//                  this.logining = false;
//                  let { msg, code, user } = data;
//                  if (code !== 200) {
//                    this.$message({
//                      message: msg,
//                      type: 'error'
//                    });
//                  } else {
//                    sessionStorage.setItem('user', JSON.stringify(user));
//                    this.$router.push({ path: '/Home' });
//                  }
//                });
              let user = {"id":1,"username":"admin","avatar":"https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png","name":"超级长的名字"}
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$router.push({ path: '/Home' });
            }else {
              console.log('error submit!!');
              return false;
            }
          })
        }
      },
      mounted() {
        let _this = this
        window.addEventListener('keydown',function (e) {
          if(e.keyCode == 13){
            _this.handleSubmit2()
          }
        })
      }

    }
</script>
<style lang="scss" scoped>
  .bigbk{
    height: 100%;
    width: 100%;
    background: url(../assets/loginbg.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
