<template>
  <div class="app-container"> 
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <Breadcrumb>
        <span slot="two">用户管理</span>
        <span slot="three">用户列表</span>
      </Breadcrumb>
       <!-- 主题内容 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入学号" v-model="queryItem.query" clearable @clear="clearSearch">
            <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格内容 -->
      <el-table
        :data="users" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column prop="avatarUrl" label="头像">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.avatarUrl"
              fit="contain">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="province" label="省市"></el-table-column>
        <el-table-column prop="country" label="国家"></el-table-column>
        <el-table-column prop="creditScore" label="信誉值"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
             <el-switch
              v-model="scope.row.state"
              @change="isSwitch(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="0"
              :inactive-value="1">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <!-- <el-tooltip class="item" effect="dark" content="编辑用户" placement="top">
              <el-button size="mini" type="primary" @click="editClick(scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip> -->
            <el-tooltip class="item" effect="dark" content="删除该用户绑定信息" placement="top">
              <el-button size="mini" type="danger" @click="delUser(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryItem.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryItem.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </el-card>
  </div>

</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'

export default {
  data() {
    return {
      // 查询条件
      queryItem: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      //users
      users:[],
      total:0
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers(){
      const {data:res} = await this.$http.get("users",{params:this.queryItem})

      
      if(res.code!==200) return;

      this.users = res.data.infoList
      this.total = res.data.total

    },
    // 查询
    clickSearch() {
      this.getUsers()
    },

    //清除查询
    clearSearch() {
      this.getUsers()
    },

    //分页选择
    handleSizeChange(num){
      this.queryItem.pagesize = num
      this.getUsers()
    },
    handleCurrentChange(num){
      this.queryItem.pagenum = num
      this.getUsers()
    },
     // 修改用户状态
    async isSwitch(row) {
      const {data: res} = await this.$http.put(`users/${row.id}/state/${row.state}`)
       if(res.code!=200)
          return this.$message.error(res.msg)
        this.$message.success("用户状态修改成功！！")
       
    },
    //删除用户
    delUser(row){
      const msg = this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                const {data:res} = await this.$http.delete("users/"+row.id,{params:{"studentId":row.studentId}})
                if(res.code!==200) return this.$message.error("删除失败!")
                this.getUsers()
                this.$message.success("删除成功!")
              }).catch(() => {
                this.$message.info("已取消删除!")
              })
            
    },
  },
}
</script>

<style scoped lang="less">
.app-container{
margin-top: 50px;
}
</style>
