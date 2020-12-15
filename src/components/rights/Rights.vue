<template>
 <div> 
     <!-- 面包屑导航 -->
    <Breadcrumb>
      <span slot="two">权限管理</span>
      <span slot="three">权限列表</span>
    </Breadcrumb>
    <el-card class="box-card"> 
      <!-- 表格内容 -->
      <el-table
        :data="modularList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="权限id"></el-table-column>
        <el-table-column prop="name" label="权限名称"></el-table-column>
        <el-table-column prop="mId" label="对应权限"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="icon" label="图标"></el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.lever===0" type="success">一级</el-tag>
            <el-tag v-if="scope.row.lever===1" type="error">二级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>

</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
export default {
  data() {
    return {
      modularList:null

    }
  },
  components: {
    Breadcrumb
  },
  created() {
    this.getRighitsList()
  },
  methods: {
    async getRighitsList(){
      const {data : res} = await this.$http.get("modular/list")
      if(res.code!==200) return this.$message.error("获取数据失败！")
      this.modularList = res.data
    }
    
  },
}
</script>

<style scoped lang="less">
</style>
