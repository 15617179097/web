
<template>
  <div class="login_context" align="center">  
        <img width="100%" height="100%" src="../assets/img/login-bg.jpg" alt="">       
  <div class="box" align="center">  
      <div class="login_box" align="center">
        <img src="../assets/img/sias1.jpg" alt="">
            <div class="big" align="center">
       <p>欢迎您！</p>     
          </div>
          <el-form :model="loginFrom" :rules="loginFromRules" 
          ref="loginFromRulesRef"       
          >
            <el-form-item  prop="username" >             
              <el-input v-model.trim="loginFrom.username"
               prefix-icon="iconfont icon-denglu" 
               placeholder="请输入用户名"
             
               >
               </el-input>
               
            </el-form-item>
            <el-form-item  prop="password"  style="height:40px">
              <el-input 
              v-model.trim="loginFrom.password"
              
               :type="flag?'test':'password'" 
               prefix-icon="iconfont icon-mima" 
               placeholder="请输入密码"
 
               >
              <i slot="suffix" :class="[flag?'el-icon-minus':'el-icon-view']" style="margin-top:8px;font-size:18px;" autocomplete="auto" @click="flag=!flag" />
—
               </el-input>
               
            </el-form-item>
           <el-form-item align="left" style="height:18px">
            <el-checkbox v-model="remember_password">记住密码</el-checkbox>
          </el-form-item>
            <el-form-item class="but_box"  style="width: 100%">
              <el-button type="primary" @click="login" style="width: 520px ;height: 50px">登陆</el-button> 
            </el-form-item>           
          </el-form> 
          </div>   
          
      </div>
 <a href="https://beian.miit.gov.cn/"  target="_blank"><center>备案编号：豫ICP备2021003442号</center></a>
  </div>
  
</template>

<script type="text/javascript">

export default {
  data () {  
    return {
     
       flag: false,
      
    remember_password: false,
    
      loginFrom: {
        username: 'admin',
        password: '123456',
      
      },
      
      loginFromRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
      
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
    //判断渲染，true:暗文显示，false:明文显示
  },

  
}
</script>

<style scoped lang="less">

  .login_context{
   position: fixed;
   width: 100%;
   background-size: 100% 100%;

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
      width: 608px;
      height: 420px;
      border-radius:10px;
        .el-form{
        padding: 0px 30px;
        float:left;
        .el-input{
       width: 530px;
       height: 50px;
         font-size: 50px;
        }
        /deep/ .el-input__inner{
    padding: 0 38px;
    height: 52px;
     font-size: 20px;
 }
  
      }
       
    
    
    p {
  color: rgb(75, 66, 66);
  height: 20px;
  font-size: 20px;
  margin:0px 2px 10px 2px
  
}
 


     }
    
     
} 
 

     
      
    }
  
  
</style>
