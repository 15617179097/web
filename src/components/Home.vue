<template>
  
    <el-container>
      <el-header>
        <div>图书馆座位预约管理系统</div>
        <div class="header_user">
          <h3>{{username}}</h3>
          <el-button type="info" @click="layout">退出</el-button>
        </div>
        
      </el-header>
      <el-container>
        <el-aside :width="isCollapse? '64px':'200px'">
          <div class="stretch" @click="clickStretch">|||</div>
              <el-menu
                background-color="#3a4046"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="$route.path"
                router
                :unique-opened="true">
                <el-submenu :index="item.id+''" v-for="item in modularList" :key="item.id">
                  <template slot="title">
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
          <router-view></router-view>
        </el-main>
      </el-container>
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
    color: #fff;
    height: 100%;
    background-color: #222c36;
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .el-aside{
    background-color: #3a4046;
    .stretch{
      letter-spacing: 0.2em;
      text-align: center;
      color: #fff;
      cursor: pointer;
      background-color: #636c75;
      //padding: 4px;
      line-height: 35px;
    }
    .el-menu{
      border-right: 0;
    }
     .iconfont{
      margin-right: 10px;
    }
    
  }
  .el-main{
      background-color: #eaedf1;
   
  }
</style>
