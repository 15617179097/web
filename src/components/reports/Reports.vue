<template>
  <div>
    <el-card class="box-card">
    <!-- 面包屑导航 -->
    <Breadcrumb>
      <span slot="two">数据统计</span>
      <span slot="three">数据报表</span>
    </Breadcrumb>
    
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <div id="main" style="width: 600px;height:400px;left:20%;"></div>
    </el-card>
  </div>

  
</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
import echarts from 'echarts'
export default {
  data() {
    return {
      month:'',
      value:''
    }
  },
  
  watch: {
    value(newV,oldV){
      this.getReports()
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    
    async getReports(){
      var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        const {data:res} =await this.$http.get("reports",{params:{"month":this.value}})
        if(res.code!==200)  return this.$message.error("获取数据失败!")
          // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(res.data)
    }
  },
  //页面所以元素 ，渲染完毕 
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        const {data:res} =await this.$http.get("reports",{params:{"month":this.value}})
        if(res.code!==200)  return this.$message.error("获取数据失败!")

        // 使用刚指定的配置项和数据显示图表。
         myChart.setOption(res.data)
        //myChart.setOption(option)
   
  },
}
</script>

<style scoped lang="less">
.box-card{
  margin-top: 50px;
}
.el-card{
  text-align: center;
}
.el-row{
  margin-bottom: 30px;
}
</style>
