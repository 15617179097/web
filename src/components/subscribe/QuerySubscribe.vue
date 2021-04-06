<template>
<el-card class="box-card">
   <!-- 面包屑导航 -->
    <Breadcrumb>
      <span slot="two">预约管理</span>
      <span slot="three">查询预约</span>
    </Breadcrumb>

    <!-- 主题内容 -->
   
          <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入学号" v-model="queryItem.query" clearable @clear="clearSearch">
            <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
          </el-input>
        </el-col>
      </el-row>
    <el-table
      :data="subscribeList"
      style="width: 100%" border stripe>
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="studentId" label="学号"> </el-table-column>
      <el-table-column prop="classroomName" label="自修室名称"></el-table-column>
      <el-table-column prop="floor" label="楼层"> </el-table-column>
      <el-table-column prop="seatNumber" label="座位号"> </el-table-column>
      <el-table-column prop="createTime" label="日期"> </el-table-column>
      <el-table-column  label="操作">
         <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="取消" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="delSubscribe(scope.row)"></el-button>
            </el-tooltip>
          </template>
      </el-table-column>
    </el-table>
  <!-- 分页 -->
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="queryItem.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryItem.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- <edit-notice :nVisible="nVisible" :id="id" @noticeVisible="noticeVisible" @noticeSuccess="noticeSuccess"></edit-notice> -->
  </el-card>
</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
export default {
  data() {
    return {
      subscribeList:[],
      queryItem:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      total:0
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    this.querySubscribe()
  },
  methods: {
    //获取预约列表
    async querySubscribe(){
      const {data:res} = await this.$http.get("subscribe",{params: this.queryItem})
      if(res.code!==200) return;
      
      this.subscribeList = res.data.subscribeList
      this.total = res.data.total
      
    },
    //清空搜索框
    clearSearch(){
      this.querySubscribe()
    },
    //搜索具体的预约
    clickSearch(){
      this.querySubscribe()
    },
    //取消预约
    async delSubscribe(row){
      const {data:res} = await this.$http.put("subscribe/"+row.id)
      if(res.code!==200) return this.$message.error("取消预约失败！");
      this.$message.success("取消预约成功！");
      this.querySubscribe()
    },
    //分页选择第几页
    handleCurrentChange(num) {
      this.queryItem.pagenum = num
      this.querySubscribe()
      
    }
  },
}
</script>

<style scoped lang="less">
.box-card{
  margin-top: 50px;
}
</style>
