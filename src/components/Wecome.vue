<template>
  <div>
      <div>
          <TopSpace/>
      </div >
      <div class="webdata" style=" height:500px"> 
          <WebDataSpace/>       
      </div> 
     <div>
         
      </div >
     
  </div>
</template>

<script>

export default {
    components:{
        TopSpace:resolve=>{require(['@/components/home/module/TopSpace'],resolve)},
        WebDataSpace:resolve=>{require(['@/components/home/module/WebDataSpace'],resolve)},
        
    }
    
};



  
</script>

<style scoped lang="less">
.ft{
    width: 100%;
    height: 60px;

    background-color: #FFFFFF;
a{
   text-decoration:none;
   margin: 20px;
}

}


</style>
