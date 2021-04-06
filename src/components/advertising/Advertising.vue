<template>
 <el-card class="box-card">
  <Breadcrumb>
    <span slot="two">广告模块</span>
    <span slot="three">广告列表</span>
  </Breadcrumb>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-input placeholder="请输入标题" v-model="queryItem.query" clearable @clear="clearSearch">
        <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addAdvertising">添加广告</el-button>
    </el-col>
  </el-row>
  <el-table :data="listData" style="width: 100%"  border stripe>
    <el-table-column prop="id" label="序号"></el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column  label="图像" width="180">
      <template slot-scope="scope">
        <el-image  :src="scope.row.fileUrl" fit="contain"></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="content" label="描述" width="180"></el-table-column>
    <el-table-column prop="createTime" label="日期" width="180"></el-table-column>
    <el-table-column prop="state" label="状态" width="180"></el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editAdvertising(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="delAdvertising(scope.row)"></el-button>
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
  <AddAdvertising :editAdvertising="editItem" :addAdvertisingVisible="addVisible" @addAdvertisingVisible="addAdvertisingVisible" @addSuccess="addSuccess"></AddAdvertising>
</el-card>
</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
import AddAdvertising from './AddAdvertising.vue'
export default {
  data() {
    return {
      editItem:null,
      addVisible: false,
      listData: [],
      // 查询条件
      queryItem: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total:0,
      
    }
  },
  components: {
    Breadcrumb,AddAdvertising
  },
  created() {
    this.getAdvertising()
  },
  methods: {
    
    //获取列表
    async getAdvertising(){
      let {data:res} = await this.$http.get("advertising",{params: this.queryItem})
      if(res.code!=200) return this.$message.error("获取列表失败");
      
      this.listData = res.data.advertisingList
      this.total = res.data.total
    },
    //监听 对话框
    addAdvertising(){
      this.addVisible = !this.addVisible
      this.editItem=null
      
    },
    // 成功 刷新
    addSuccess(item){
      this.getAdvertising();
    },
       //分页选择
    handleSizeChange(num){
      this.queryItem.pagesize = num
      this.getAdvertising()
    },
    handleCurrentChange(num){
      this.queryItem.pagenum = num
      this.getAdvertising()
    },
    // 模糊查询title
    clickSearch(){
      this.getAdvertising ();
    },
    //清除查询数据
    clearSearch(){
      this.getAdvertising();
    },
    addAdvertisingVisible(item){
      this.editItem=null
      this.addVisible = item
    },
    //编辑
    editAdvertising(row){
      this.editItem= row
      this.addVisible = !this.addVisible

    },
    //删除
    delAdvertising(row){
       const msg = this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                let {data:res} = await this.$http.get("advertising/"+row.id)
                if(res.code!==200) return this.$message.error("删除失败!")
                this.getAdvertising()
                this.$message.success("删除成功!")
              }).catch(() => {
                this.$message.info("已取消删除!")
              })

    }
  },
}
</script>

<style scoped lang="less">
.el-upload-list__item-thumbnail{
  width: 100px;
}
.box-card{
  margin-top: 50px;
}
</style>
