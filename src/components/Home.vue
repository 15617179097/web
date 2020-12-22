<template>
      <el-container>
        <el-aside :width="isCollapse? '80px':'250px'">
              <el-menu
                background-color="#304156"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="$route.path"
                router
                :unique-opened="true">
      
      <el-menu-item index="/wecome">
        <i class="el-icon-s-home" ></i>
        <span slot="title">主页</span>
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

                
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#fff"
        text-color="#fff"
       active-text-color="#ffd04b"
      :style="{float:'right'}"
        :default-active="$route.path"
                router
    >
      <el-menu-item index="/feedback">
        <i class="el-icon-bell" :style="{}" />
        <el-badge is-dot class="item"></el-badge>
      </el-menu-item>


      </el-menu>
                <h3>{{username}}</h3>
                <el-button type="info" @click="layout">退出</el-button>
               
              </div>
              
      </el-header>
          <router-view></router-view>
        </el-main>
      </el-container>
 
</template>

<script>

export default {
  
  data() {
    return {
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
  .header_user{
    display: flex;
    align-items: center;
    h3{
      margin: 30px;
    }
  }
  .el-container{
    height: 100%;
  }
  .el-header{
    width: 100%;
    margin-top: -18px;
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
    .el-menu{
      border-right: 0;
       
    }
    
     .iconfont{
      margin-right: 10px;
      font-size: 25px;
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
      
  }


</style>
