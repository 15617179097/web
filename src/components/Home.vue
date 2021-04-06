<template>
      <el-container class="home-con">
        <el-aside :width="isCollapse? '70px':'215px'">
              <el-menu
                background-color="#304156"
                text-color="#fff"
                active-text-color="#409EFF"
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="$route.path"
                router
                :unique-opened="true">
      <el-menu-item index="/wecome">
        <i class="el-icon-s-home" ></i>
        <span slot="title" style="font-size:15px">主页</span>
      </el-menu-item>      
          <el-submenu :index="item.id+''" v-for="item in modularList" :key="item.id">                  
               <template slot="title" >
                <i :class="'iconfont '+item.icon"></i>
              <span>{{item.name}}</span>
              </template>
              <el-menu-item :index="'/'+itemchildren.path" v-for="itemchildren in item.children" :key="itemchildren.id">
                 <i class="el-icon-menu"></i>
                   <span>{{itemchildren.name}}</span>
              </el-menu-item>
                </el-submenu>
              </el-menu>
        </el-aside>
        <el-main>
          <el-header>
          <div class="stretch" @click="clickStretch"
            :class="aside_state==true?'el-icon-s-fold':'el-icon-s-unfold'"
            :style="{padding:'15px',cursor: 'pointer'}" />
            <div>图书馆座位预约管理系统</div>
              <div class="header_user">          
               
            </div> 
  <div class="right-menu">  
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fff"
        text-color="#fff"
       active-text-color="#ffd04b"
      :style="{float:'left'}"
        :default-active="$route.path"
                router
    >

      <el-menu-item index="/feedback"
      active-text-color="#409EFF"
      >
        <i class="el-icon-bell" :style="{width:'20px'}" />
        <el-badge is-dot class="item"></el-badge>
      </el-menu-item>

      </el-menu>



 <div class="right-menu-item hover-effect" @click="handleFullScreen"
            :class="aside_state==true?'iconfont icon-quanping':'iconfont icon-quanping'"
            :style="{float:'left',margin:'20px 20px',cursor: 'pointer'}" />



      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="../assets/img/user.gif" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link to="/wecome">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
         
          <el-dropdown-item divided @click.native="layout">
            <span style="display:block;">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

      </el-header>
          <router-view></router-view>
        </el-main>
  
      </el-container>

</template>

<script>

export default {
 name: 'Screenfull',
  data() {
    return {
       isFullscreen: false,
      aside_state: false,
      isCollapse:false,
      //左侧菜单列表
      modularList:[],
      username: window.sessionStorage.getItem('username')
    }
  },
 
  components: {
     
 
  },
   

  created() {
    this.getModular()
  },
  methods: {
   handleFullScreen(){
  let element = document.documentElement;
  if (this.fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  }
  this.fullscreen = !this.fullscreen;
},

    // 退出登陆
    layout(){
      window.sessionStorage.removeItem("token")
      this.$router.replace("/login")
    },
    
    //伸缩左菜单 
    clickStretch() {
      this.isCollapse = !this.isCollapse
    },

    //获取左侧菜单
    async getModular() {
      const {data:res} = await this.$http.get("modular")
      
      if(res.code !== 200) 
        return ;
      this.modularList = res.data
      
    }
    
  },
}
</script>

<style scoped lang="less">
.home-con{
  height: 100%;
}
  .header_user{
    display: flex;
    align-items: center;
    margin-right: -290px;
    h3{
      margin: 30px;
    }
  }
  .el-container{
  
  }
  
  .el-header{
    width: 100%;
    margin-top: -25px;
    float:left;
    color: #97A8BE;
    background-color: #FFFFFF;
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .el-aside{
    background-color: #304156;
    .stretch{
      
      letter-spacing: 0.2em;
      text-align: center;
      color: rgb(245, 243, 243);
      cursor: pointer;
      background-color: #636c75;
      //padding: 4px;
      line-height: 40px;
     
     
    }
   
  

     .iconfont{
      margin-right: 10px;
      font-size: 28px;
    }
    .icon_index{
      margin-right: 10px;
      font-size: 25px;
    }
  
    .el-icon-s-home{
      margin-right: 15px;
      font-size: 25px;
    }
    
  }
  .el-main{
      background-color: #F2F6FC;
      height: 100%;
  }
  .el-icon-s-unfold{
font-size: 26px;



  }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 12px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

     .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
      }
 
    }
</style>
