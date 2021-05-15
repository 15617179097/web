<template>
  <div class="login_context" align="center">  
       <img width="100%" height="100%" src="../assets/img/b1.jpg" alt="">      
  <div class="box" align="center">  
      <div class="login_box" align="">
        <div style="width:580px; height:575px ;position: fixed; overflow: hidden;margin-left:-18px">
         <img width="%" height="%" src="../assets/img/login.png">
         </div>
          <el-form :model="loginFrom" :rules="loginFromRules" 
          ref="loginFromRulesRef"  
          style="height:590px;width:420px">
          <div class="user">
             <div class="big" align="center">
  <!-- <fieldset><legend><span>欢迎登陆</span></legend></fieldset>   -->
  <div class="title">欢迎登陆</div>
          </div>
          <div></div>
          <p>用户名</p> 
            <el-form-item  prop="username" >     
              <el-input v-model.trim="loginFrom.username"
               prefix-icon="iconfont icon-denglu" 
               placeholder="请输入用户名"
               >
               </el-input>
            </el-form-item>
             <p>密码</p> 
            <el-form-item  prop="password">
              <el-input
              v-model.trim="loginFrom.password"
               :type="flag?'test':'password'" 
               prefix-icon="iconfont icon-mima" 
               placeholder="请输入密码" >
              <i slot="suffix" :class="[flag?'el-icon-minus':'el-icon-view']" style="margin-top:8px;font-size:18px;" autocomplete="auto" @click="flag=!flag" />
               </el-input>
            </el-form-item>
            <el-form-item class="but_box"  style="width: 100%">
              <el-button type="primary" @click="login" style="width: 400px ;height: 55px ;border-radius:50px; margin-top:5%">登陆</el-button> 
            </el-form-item>  
            </div>         
          </el-form> 
      </div>
      </div>
  </div>
</template>
<script type="text/javascript">
//禁止滚轮缩放
document.addEventListener('mousewheel', function (e) {
e = e || window.event;
if ((e.wheelDelta && event.ctrlKey) || e.detail) {
event.preventDefault();
}
}, {passive: false}
);
export default {
  data () {  
    return {
       flag: false,
    remember_password: false,
      loginFrom: {
        username: '',
        password: '',
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
   height: 100%;
   background-size: 100% 100%;
   background-color: #BFDBFE;
.box{    
    .login_box{
      position: fixed;
      background-color:#fff ;
      left: 50%;
      top:45%;
      transform: translate(-50%,-50%);
      width: 1000px;
      height: 500px;
      border-radius:20px;
    overflow: hidden;
        .el-form{
        padding: 0px 30px;
        float:right;
        height: 575px;
        .user{
          p
        .el-input{
       height: 50px;
      font-size: 50px;
        background-color: #fff; 
        }
        /deep/ .el-input__inner{
    padding: 0 38px;
    height: 52px;
     font-size: 20px;
     border-top-width: 0px;
	border-left-width: 0px;
	border-right-width: 0px;
	border-bottom-width: 2px;
 }
  }
      }
    p {
  color: rgb(16, 16, 19);
  font-size: 23px;
  float:left;
  margin: 15px 0 0 0;
  font-weight: 700;
  font-family: "楷体";
}
span{
  color: rgb(17, 14, 14);
  font-size: 35px;
  float:left;
  margin: 0 ;
 font-weight: 900;
 font-family: "楷体";
}

// fieldset{
// border: none;
// border-top: 2px rgb(11, 11, 12) solid;
// text-align: center;
// width: 450px;
// margin-top: 17%;
// }
// legend{padding: 0 10px;font-size: 16px;color: rgb(16, 16, 19);}
      }
} 
/*第二种方法*/
.title{color: rgb(5, 5, 5);
text-align: center;
font-size: 35px;
font-weight: 900;
font-family: "楷体";
margin-top: 15%;
}
.title:before,.title:after{
  content: "";
  width: 120px;
  border-top: 2px rgb(187, 159, 159) solid;
  display: inline-block;
  vertical-align: middle;
  background-clip:padding-box,border-box;
background-origin:padding-box,border-box;
background-image:linear-gradient(135deg,rgb(238, 228, 228),#000),linear-gradient(135deg,#3f3e3e,#484749);
border:1px transparent solid;
}
.title:before{margin-right: 10px;}
.title:after{margin-left: 10px;}
 .big{
   margin-bottom: 5%;
 }
    }
</style>
