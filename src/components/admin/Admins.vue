<template>
  <div class="app-container">
    <!-- 面包屑导航 -->
    <el-card class="box-card">
    <Breadcrumb>
      <span slot="two">用户管理</span>
      <span slot="three">管理员列表</span>
    </Breadcrumb>

    <!-- 主题内容 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入用户名" v-model="queryItem.query" clearable @clear="clearSearch">
            <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addAdmin">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格内容 -->
      <el-table
        :data="admins" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
             <el-switch
              v-model="scope.row.status"
              @change="isSwitch(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="0"
              :inactive-value="1">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑用户" placement="top">
              <el-button type="primary" @click="editClick(scope.row)">
                <i class="el-icon-edit"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除该用户" placement="top">
              <el-button type="danger" @click="delAdmin(scope.row)">
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
    <!-- 添加用户 -->
    <add-admin :schoolId="schoolId" :addVisible="addVisible" @add-visible="addVisibles" @add-success="addSuccess"></add-admin>
   <!-- 修改用户 -->
    <edit-admin :adminRow="adminRow" :editVisible="editVisible" @add-visible="editVisbles" @add-success="addSuccess"></edit-admin>
      </el-card>
  </div>

</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
//弹框
import AddAdmin from './AddAdmin.vue'
import EditAdmin from './EditAdmin.vue'

export default {
  data() {
    return {
      username:[],
      adminRow:null,
      addVisible: false,
      editVisible: false,
      // 查询条件
      queryItem: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total:0,
      admins:[],
      schoolId:null

    }
  },
  computed: {

  },
  //加载组件
  components: {
    Breadcrumb,AddAdmin,EditAdmin
  },
  created() {
    this.getAdmins()
  },
  methods :{
    async getAdmins(){
      const {data:res} = await this.$http.get("admins",{params:this.queryItem})
      if(res.code!==200)
        this.$message.error("获取数据失败！")
      if (res.data.total>0) {
        this.schoolId= res.data.admins.list[0].schoolId
      }else
        this.schoolId = 0
      this.admins = res.data.admins.list
      this.total = res.data.total
    },
    // 添加用户
    addAdmin(){
      this.addVisible = !this.addVisible
    },
    //监听添加用户窗口关闭
    addVisibles(item) {
      this.addVisible = item
    },
    //监听修改用户窗口关闭
    editVisbles(item) {
      this.editVisible = item
    },

    //监听添加用户是否成功
    addSuccess(item){
      if(item)
        this.getAdmins();
    },

    // 查询
    clickSearch() {
      this.getAdmins()
    },

    //清除查询
    clearSearch() {
      this.getAdmins()
    },

    // 修改用户状态
    async isSwitch(row) {
      const {data: res} = await this.$http.put(`admins/${row.id}/status/${row.status}`)
       if(res.code!=200)
          return this.$message.error(res.msg)
        this.$message.success("用户状态修改成功！！")
       
    },
    // 编辑用户
    editClick(row) {
      
      this.adminRow = row
      this.editVisible = !this.editVisible

      
   },
    //删除用户
    delAdmin(row){
      const msg = this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                const {data:res} = await this.$http.delete("admins/"+row.id)
                if(res.code!==200) return this.$message.error("删除失败!")
                this.getAdmins()
                this.$message.success("删除成功!")
              }).catch(() => {
                this.$message.info("已取消删除!")
              })
              
    },
    //分页选择每页显示个数
    handleSizeChange(num) {
      this.queryItem.pagesize = num
      this.getAdmins()
    
    },

    //分页选择第几页
    handleCurrentChange(num) {
      this.queryItem.pagenum = num
      this.getAdmins()
      
    }

  }
}
</script>

<style scoped lang="less">
.app-container{
margin-top: 50px;
}
</style>
