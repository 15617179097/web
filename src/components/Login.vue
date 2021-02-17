<template>
  <div class="login_context" >  
        <img src="../assets/img/d.png" alt="">
  <div class="box">  
      <div class="login_box">
         <img src="../assets/img/box.png" alt="">
            <div align="center" style="width:380px;height:200px;margin: -405px -260px -400px 280px" >
            <h1>西亚斯 · 内部登陆系统</h1>
            <h2>员工登陆 </h2>
            <p>{{ login_adress }}</p>
          </div>
          <el-form :model="loginFrom" :rules="loginFromRules" ref="loginFromRulesRef">
            <el-form-item  prop="username">
              <el-input v-model="loginFrom.username" prefix-icon="iconfont icon-yonghu" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input v-model="loginFrom.password" type="password" prefix-icon="iconfont icon-password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <div align="right" style="width:288px; height:32px; margin:" >
            <p>忘记密码？</p>
            </div>
            <el-form-item class="but_box" style="width: 94%; margin-bottom:60px;">
              <el-button type="primary" @click="login" style="width: 280px">登陆</el-button> 
            </el-form-item>
          </el-form>
          </div>
      </div>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
    
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
    
  },
  components: {

  },
  methods: {
    async login() {

      const {data :res} = await this.$http.post("login",this.$qs.stringify(this.loginFrom))
      if (res.code!==200)
        return this.$message.error(res.msg)

      // token存入ssionStorage
      window.sessionStorage.setItem("token",res.data.token)
      window.sessionStorage.setItem("username",res.data.username)
      window.sessionStorage.setItem("schoolId",res.data.schoolId)
      
      //路由跳转
      this.$router.push('/home')
      this.$message.success("登陆成功！！")
    },
    loginResetForm(){
      this.$refs.loginFromRulesRef.resetFields();
    }
  },
}
</script>

<style scoped lang="less">

  .login_context{
   position: fixed;
.box{  
      width: 660px;
      height: 420px;
      top:50%;
      left: 50%;

    .login_box{
      position: fixed;
      background-color:#fff ;
      left: 50%;
      top:45%;
      transform: translate(-50%,-50%);
      width: 660px;
      height: 420px;
    h1 {
  color: rgb(121, 117, 117);
  height: 220px;
  font-size: 20px;
  
}
  h2 {
  color: rgb(121, 117, 117);
  height: 220px;
  font-size: 13px;
  margin: -200px;
}
p {
color: rgb(121, 117, 117);
  height: 25px;
  font-size: 13px;
  left: 75%;
  
}
     }
    
     
} 
    /*   .left_box{
      position: absolute;
      left: 38%;
      top:50%;
      transform: translate(-50%,-50%);
      width: 280px;
      height: 420px;
     
      }
    .login_box{
     
      position: absolute;
      left: 58%;
      top:50%;
      transform: translate(-50%,-50%);
      width: 380px;
      height: 420px;

      background-color: #fff;
      
     }
    */

      .el-form{
        position: fixed;
        bottom: 0;
        width: 360px;
        padding: 0 30px;
        box-sizing:border-box;
        left: 45%;
        top: 40%;
      }
     
      .but_box{
        display: flex;
        justify-content:flex-end;
        width: 50%;
      }
     
      
    }
  
  
</style>
