<template>
  <div>
    
   
    <el-card class="box-card">
       <!-- 面包屑导航 -->
      <Breadcrumb>
        <span slot="two">预约管理</span>
        <span slot="three">预约座位</span>
      </Breadcrumb>
      <!-- tabs页 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 今日预约 -->
        <el-tab-pane label="今天预约" name="Today">
          <subscribe-item :selecttabs="activeName"></subscribe-item>
        </el-tab-pane>
        <!-- 明日预约 -->
        <el-tab-pane label="明天预约" name="Tomorrow">
          <subscribe-item :selecttabs="activeName"></subscribe-item>   
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
// 面包屑组件
import Breadcrumb from '../common/Breadcrumb.vue'
import SubscribeItem from './SubscribeItem.vue'
export default {
  data() {
    return {
      activeName: 'Today',
    }
  },
  computed: {
   
  },
  components: {
    Breadcrumb,SubscribeItem
  },

  methods: {
    
    //监听tabs 点击
    handleClick(tab, event) {
    this.activeName=tab._props.name;
      }
  }
}
</script>

<style scoped lang="less">
.box-card{
  margin-top: 50px;
}

</style>
