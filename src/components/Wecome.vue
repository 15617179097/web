<template>
  <div>
      <div>
          <TopSpace/>
      </div>
      <div style="margin-top:px">
          <WebDataSpace/>
      </div>
  </div>
</template>

<script>
export default {
    components:{
        TopSpace:resolve=>{require(['@/components/home/module/TopSpace'],resolve)},
        WebDataSpace:resolve=>{require(['@/components/home/module/WebDataSpace'],resolve)}
    }
};



  
</script>

<style lang="scss" scoped>


</style>
