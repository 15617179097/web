<template>
 <el-card>
   <!-- 面包屑导航 -->
    <Breadcrumb>
      <span slot="two">公告管理</span>
      <span slot="three">公告列表</span>
    </Breadcrumb>

    <!-- 主题内容 -->
   
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入标题" v-model="queryItem.query" clearable @clear="clearSearch">
          <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addNotice">添加公告</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="noticeList"
      style="width: 100%" border stripe>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="time" label="时间"> </el-table-column>
      <el-table-column  label="操作">
         <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editNotice(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="delNotice(scope.row)"></el-button>
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
    <edit-notice :nVisible="nVisible" :id="id" @noticeVisible="noticeVisible" @noticeSuccess="noticeSuccess"></edit-notice>
  </el-card>
</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
import EditNotice from './EditNotice.vue'
export default {
  data() {
    return {
      nVisible:false,
      noticeList:[],
      queryItem: {
        query: '',
        pagenum: 1,
        pagesize: 10, 
      },
      total:0,
      id:0
    }
    
  },
  components: {
    Breadcrumb,EditNotice
  },
  created() {
    this.getNoticeList()
  },
  methods: {
    //获取数据
    async getNoticeList(){
    const {data:res} = await this.$http.get("Notice/findNotice",{params:this.queryItem}) 
    if(res.code!==200) return this.$message.error("获取数据失败！")
 
    this.noticeList = res.data.noticeList
    this.total = res.data.total

    },
    // 模糊查询title
    clickSearch(){
      this.getNoticeList();
    },
    //清除查询数据
    clearSearch(){
      this.getNoticeList();
    },
    // 监听添加公告按钮
    addNotice(){
 
      this.nVisible = !this.nVisible
 
    },
    // 监听对话框是否关闭
    noticeVisible(item){
      this.nVisible = item
      this.id = 0
    },
    //添加或者修改成功
    noticeSuccess(item){
      if(item){
        this.getNoticeList()
      }
      
    },
    // 修改公告
    editNotice(row){
      this.id = row.id
      this.nVisible = !this.nVisible
    },
    // 删除公告
    delNotice(row){
        const msg = this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                const {data:res} = await this.$http.delete("Notice/deleteNotice/"+row.id)
                if(res.code!==200) return this.$message.error("删除失败!")
                this.getNoticeList()
                this.$message.success("删除成功!")
              }).catch(() => {
                this.$message.info("已取消删除!")
              })
    },
    //选择每页显示数量 
    handleSizeChange(num){
      this.queryItem.pagesize = num
      this.getNoticeList()
    },
    // 点击第几页
    handleCurrentChange(num){
      this.queryItem.pagenum = num
      this.getNoticeList()
    }
  },
}
</script>

<style scoped lang="less">
</style>
