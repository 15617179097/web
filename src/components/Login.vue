<template>
  <div class="login_context">
    <div class="login_box">
      <div class="img_box">
        <img src="../assets/logo.jpg" alt="">
      </div>
      <el-form :model="loginFrom" :rules="loginFromRules" ref="loginFromRulesRef">
        <el-form-item  prop="username">
          <el-input v-model="loginFrom.username" prefix-icon="iconfont icon-yonghu" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input v-model="loginFrom.password" type="password" prefix-icon="iconfont icon-password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="but_box">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button  @click="loginResetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        username: '',
        password: ''
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
    background-color: #6f89A2;
    height: 100%;

    .login_box{
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      padding: 5px;
      width: 450px;
      height: 300px;
      background-color: #fff;

      .img_box{
        position: absolute;
        top: -30%;
        left: 50%;
        transform: translate(-50%);
        border: 5px solid #ccc;
        width: 130px;
        height: 130px;
        border-radius: 50%;
        img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        }
      }
      .el-form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 15px;
        box-sizing:border-box;
      }
      .but_box{
        display: flex;
        justify-content:flex-end;
      }
    }
  }
  
</style>
