<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="two"></slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="three"></slot></el-breadcrumb-item>
    </el-breadcrumb>
    
</template>

<script>
export default {
  data() {
    return {
      props:{
        paths: String
      }
    }
  },
  components: {

  }
}
</script>

<style scoped lang="less">
</style>
