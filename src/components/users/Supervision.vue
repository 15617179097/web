<template>
<el-card class="box-card">
      <!-- 面包屑导航 -->
      <Breadcrumb>
        <span slot="two">用户管理</span>
        <span slot="three">监督占位列表</span>
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
        :data="supervisionList" style="width: 100%" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="studentId" label="监督学号"></el-table-column>
        <el-table-column prop="classroomName" label="教室名称"></el-table-column>
        <el-table-column prop="seatsNum" label="座位号"></el-table-column>
        <el-table-column prop="createTime" label="监督时间"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state===0" type="success">未处理</el-tag>
            <el-tag v-if="scope.row.state===1" type="error">已处理</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击完成监督占位处理" placement="top">
              <el-button size="mini" type="success" icon="el-icon-edit" @click="updataSupervision(scope.row)"></el-button>
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
        pagesize: 10
      },
      //users
      supervisionList:[],
      total:0
    }
  },
  watch: {
    state(newV,oldV){
      this.queryItem.state = newV
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    this.getSupervisionList()
  },
  methods: {
    //获取列表
    async getSupervisionList(){
      const {data:res} = await this.$http.get("supervision",{params:this.queryItem})
      if(res.code!=200) return;
      this.supervisionList = res.data.supervisionList
      this.total = res.data.total
    },
    //完成监督占位
    updataSupervision(row){
        const msg = this.$confirm('此操作将完成该工作吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                const {data:res} = await this.$http.put("supervision/"+row.id)
                if(res.code!==200) return this.$message.error("确定失败!")
                this.getSupervisionList()
                this.$message.success("确完成公监督占位工作成功!")
              }).catch(() => {
                this.$message.info("已取消!")
              })
    },
       // 查询
    clickSearch() {
      this.getSupervisionList()
    },

    //清除查询
    clearSearch() {
      this.getUserFeedback()
    },
    //分页选择
    handleSizeChange(num){
      this.queryItem.pagesize = num
      this.getSupervisionList()
    },
    handleCurrentChange(num){
      this.queryItem.pagenum = num
      this.getSupervisionList()
    },
  },
}
</script>

<style scoped lang="less">
</style>
