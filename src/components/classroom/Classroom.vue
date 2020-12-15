<template>
   <div> 
    <el-card class="box-card">
      <!-- 面包屑导航 -->
      <Breadcrumb>
        <span slot="two">自修室管理</span>
        <span slot="three">自修室列表</span>
      </Breadcrumb>

      <!-- 搜索内容 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入教室名称" v-model="queryItem.query" clearable @clear="clearSearch">
            <el-button slot="append" icon="el-icon-search" @click="clickSearch"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="clickAddClassroom">添加教室</el-button>
        </el-col>
      </el-row>
      <!-- 表格内容 -->
        <!--
          ref="refTable"  
        @expand-change="expandSelect" //一次只能打开一个 expand
        -->
      <el-table
        :data="classroomList" style="width: 100%" border stripe
        ref="refTable" 
        @expand-change="expandSelect"
       >  
        <el-table-column type="expand"  label="座位"  width="60px">

          <template slot-scope="scope">
            <!-- 座位状态 -->
            <el-row>
              <el-col :span="6">
                <div class="grid-content bg-purple one">
                  <h2>座位详情</h2>
                </div>
              </el-col>
              <el-col :span="6">
                <span>自修室名称</span>
                <div class="grid-content bg-purple-light">
                  {{scope.row.classroomName}}
                </div>
              </el-col>
              <el-col :span="6">
                <span>座位编号</span>
                <div class="grid-content bg-purple">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in scope.row.children"
                      :key="item.id"
                      :label="item.seatNumber+'号'"
                      :value="index">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
              <el-col :span="6">
                <span>座位状态</span>
                <div class="grid-content bg-purple-light">
                  <el-switch
                    v-model="scope.row.children[value].state"
                    @change="isSwitchSeats(scope.row.children[value])"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="0"
                    :inactive-value="1">
                  </el-switch>
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" ></el-table-column>
        <el-table-column prop="classroomName" label="自修室名称"></el-table-column>
        <el-table-column prop="floor" label="楼层"></el-table-column>
        <el-table-column prop="classroomNumber" label="容量"></el-table-column>
        <el-table-column prop="x" label="排数"></el-table-column>
        <el-table-column prop="y" label="列数"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- 开关按钮 -->
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
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="editClassroom(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="delClassroom(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="生成该教师座位上的二维码" placement="top">
              <el-button size="mini" type="info" icon="el-icon-download" @click="sendQrCode(scope.row)"></el-button>
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
      <add-classroom :addClassroomVisible="addClassroomVisible"   :id="id" @classroomVisible="cleaClassroomrVisible"  @add-success="addSuccess"></add-classroom>
    </el-card>
  </div>
</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
import AddClassroom from './AddClassroom.vue'
export default {
  data() {
    return {
      //教室列表
      classroomList:null,
      //教室总数
      total:0,
      //查询参数
      queryItem:{
        query:'',
        pagenum:1,
        pagesize:5
      },
      addClassroomVisible:false,
      classroom:{
        id:'',
        classroomName:'',
        floor:'',
        classroomNumber:'',
        x:'',
        y:''
      },
      // 座位下拉选择
      value:0,
      id:0,
      
      expands:[]
    }
  },
  components: {
    Breadcrumb,AddClassroom
  },
  created() {
    this.getClassroomList()
  },
  computed: {
    getClass(){
      return this.classroom;
    }
  },
  methods: {
    //设置 table 一次只能展开一个
    // row 当前行的值 expandedRows 打开的row集合
    expandSelect:function (row, expandedRows) {
        var that = this
        if (expandedRows.length>1) {
          this.$refs.refTable.toggleRowExpansion(expandedRows[0]);
        }
     
        // 初始化座位
        this.value=0
    },
    checkExpand(row, rowList){
      var that = this
      if(rowList.length){
        that.expands = []
        if(row){
          this.expands.push(row.id)
        }
      }else{
        that.expands = []
      }
      this.value =0
      
    },
    // 获取教室列表
    async getClassroomList(){
      const {data: res} =await this.$http.get("classRoom/selectAllClassRoom",{params:this.queryItem})
    
      if(res.code!==200)  return this.$message.error("获取数据失败!");

      //赋值
      this.classroomList = res.data.classroomList
      this.total = res.data.total
    },
    // 添加查询
    clickSearch(){
      this.getClassroomList()
    },
    //清除查询条件
    clearSearch(){
      this.queryItem.query=''
      this.getClassroomList()
    },
    // 监听添加教室按钮
    clickAddClassroom(){
      this.addClassroomVisible = !this.addClassroomVisible
    },
    //状态修改
    async isSwitch(row){
    
      const {data:res} = await this.$http.put("classRoom/updateState/"+row.id+"/state/"+row.state)
      if(res.code!==200) return this.$message.error("状态修改失败")
      this.$message.success("状态修改成功！")
    },
    async isSwitchSeats(row){
      const {data:res} = await this.$http.put("seats/"+row.id+"/"+row.state)
      if(res.code!==200)  return this.$message.error("状态修改失败！")
      this.$message.success("状态修改成功！")
    },
    // 添加自修室成功
    addSuccess(item){
      if(item){
        this.getClassroomList()
      }
    },
    // 修改自修室内容
    async editClassroom(item){

      // let {data:res} =await this.$http.get("classRoom/findAllClassRoom",{params:{id:item.id}})
      // if(res.code!==200) return this.$message.error("编辑失败！");

      // this.classroom = res.data[0]
      this.id=item.id
      this.clickAddClassroom()
      
    },
    //删除自修室
    delClassroom(item){
      const msg = this.$confirm('此操作将永久删除该自修室以及座位, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(async () => {
                const {data:res} = await this.$http.delete("classRoom/"+item.id)
                if(res.code!==200) return this.$message.error("删除失败!")
                this.getClassroomList()
                this.$message.success("删除成功!")
              }).catch(() => {
                this.$message.info("已取消删除!")
              })
    },
    //获取二维码
    async sendQrCode(item){
      const loading = this.$loading({
        lock: true,
        text: '获取中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    
      let {data:res} = await this.$http.get("qrCode/"+item.id)
      loading.close();
      if(res.code!==200) return this.$message.error("获取失败!")
      this.$message.success("获取二维码成功，默认在桌面!")
    },
    // 监听子组件 弹框关闭
    cleaClassroomrVisible(item){
      
      this.addClassroomVisible=item;
      this.id= 0
    },

    //选择每页显示数量 
    handleSizeChange(num){
      this.queryItem.pagesize = num
      this.getClassroomList()
    },
    // 点击第几页
    handleCurrentChange(num){
      this.queryItem.pagenum = num
      this.getClassroomList()
    }
  },
}
</script>

<style scoped lang="less">
  .el-row{
    .el-col{
      text-align: center;
      line-height: 40px;
      span{
        color: #909399;
        font-weight: 510;
        font-size: 14px;
        text-align: center;
        margin: 15px;
      }
    }
  }
</style>
