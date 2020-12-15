<template>
<div>
  <el-row :gutter="20">
    <!-- 开始时间 -->
    <el-col :span="8">
      <el-time-select
        placeholder="起始时间"
        v-model="createTime"
        :picker-options="{
          start: '08:00',
          step: '00:15',
          end: '18:30'
        }">
      </el-time-select>
    </el-col>
    <el-col :span="8">
      <el-time-select
        placeholder="结束时间"
        v-model="endTime"
        :picker-options="{
          start: '09:00',
          step: '00:15',
          end: '22:30',
          minTime: createTime
        }">
      </el-time-select>
    </el-col>
    <el-col :span="8">
      <!-- 教室选择 -->
      <el-select v-model="floorsV" placeholder="请选择楼层" @change="changeFloorsV" >
        <el-option
          v-for="(item,key) in floors"
          :key="key"
          :label="item[0]"
          :value="item[0]"
          >
        </el-option>
      </el-select>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    
    <!-- 开始时间 -->
    <el-col :span="8">
      <el-input v-model.number="studentNum"  minlength="10" maxlength="20" placeholder="请输入学号/工号"></el-input>
    </el-col>
    <el-col :span="8">
      <el-input v-model.number="name" minlength="3" max="20" placeholder="请输入姓名"></el-input>
    </el-col>

    <!-- 座位容量 -->
    <el-col :span="8" class="selectClassRoom">
      <!-- 教室选择 -->
      <el-select v-model="value" placeholder="请选择自修室" @change="selectToday">
        <el-option
          v-for="item in todayClassRoom"
          :key="item.id"
          :label="item.classroomName"
          :value="item.id"
          :disabled="item.state===1?true:false"
          >
        </el-option>
      </el-select>
      <el-tooltip class="item" effect="dark" content="预约数量/预约容量" placement="top">
        <el-tag >
          <span>{{subscribeNum}}</span><span>/{{todayNum}}</span>
        </el-tag>
      </el-tooltip>
    </el-col>
  </el-row>
          
<!-- 座位显示 -->
  <el-card class="box-card">
    <div class="box-card-seats">
      <img v-if="seatsList===null"  src="../../assets/img/kong.png" alt="">
      <div class="seatCs"  v-for="(item,index) in seatsList" :key="index">
        <span class="seatCs_title">第{{index+1}}排</span>
        <div v-for="(items,index) in item" :key="items.id" class="selectSeats">
          <span class="seatCs_y">{{index+1}}</span>
          <el-tag @click="clickSeats(index,items)" :style="items.sT?'':'color:#e31616'"  :type="items.sT?'info':'danger'">{{items.seatNumber}}</el-tag>
        </div>
      </div>
      
    </div>
  </el-card>
</div>
</template>

<script>
export default {
  props:{
    //选择今天或者明天
      selecttabs:{
        type:String,
        default:'Today'
      }
  },
  data() {
    return {
      
      //教室列表
      todayClassRoom:[],
      //教室列表初始化
      todayClassRooms:[], 
      //选择
      value:'',
      //选择
      floorsV:'',
      row:'',
      line:'',
      
      //教室容量
      todayNum:200,
      //已经预约数量
      subscribeNum:0,
      seatsList:null,
   // 座位状态数组
      // 楼层
      floors:null,
      //开始时间createTime
      createTime: '8:00',
      //结束时间
      endTime: '22:30',
      //学号或工号
      studentNum:'',
      name:''
    }
  },
  components: {

  },
  component:{
    start(){
      if(selecttabs==='Today'){
        let date= new Date();
        return date.getHours+':'+date.getMinutes;
      }else{
        return '8:00'
      }
    }
  },
  //监听数据的变化
  watch: {
    selecttabs(newV,oldV){
    },
    // 开始时间变化监听
    createTime(newV,oldV){
      let ss=new Date();
      
      if(this.value!==''&&this.endTime!=='')
        this.selectToday(this.value)
    },
    // 结束时间的变化监听
    endTime(newV,oldV){
      if(this.createTime===''){
        this.$message.info("请选择开始时间！")
        this.endTime=''
      }
    },
    studentNum(newV,oldV){
      var reg=new RegExp(/^\+?[1-9][0-9]*$/) 
      
      if(!reg.test(newV)){
        this.studentNum = ''
      }
    }
  },
  //创建时加载
  created() {
    this.getTodayClassRoom()
   
  },
  beforeMount() {
    //  this.selectToday(this.value)
  },
  methods: {
    // 获取教室列表
    async getTodayClassRoom(){
      // 请求服务器
      const {data: res} =await this.$http.get("classRoom/findAllClassRoom")
      if(res.code!==200) return this.$message.error("获取数据失败！");
      
      //this.seatsList  = 
      //将数据放到一个初始值中
      this.todayClassRooms = res.data
      this.todayClassRoom = res.data

      //利用map 的key不能相同的原理，今天楼层获取
      let map= new Map();
      res.data.forEach(v=>{
        map.set(v.floor,v.floor)
      })
      this.floors=map 
    },
    // 选择的教室
    async selectToday(id){

      const index = this.todayClassRoom.findIndex( v => v.id===id)
      //进行赋值
      this.todayNum = this.todayClassRoom[index].classroomNumber
      this.row = this.todayClassRoom[index].x
      this.line = this.todayClassRoom[index].y

      //选时间进行查询
      let createTime=''
      if(this.createTime!=''){
        let date=new Date()
        //判断是今天 还是明天 （Today and Tomorrow)
        if(this.selecttabs==="Today")
          createTime=date.toLocaleDateString().split("/").join("-")+" "+this.createTime
        else{
          date.setTime(date.getTime() + 24*60*60*1000)
          createTime=date.toLocaleDateString().split("/").join("-")+" "+this.createTime
        }
      }
      
      //请求服务器接口 获取对应的座位列表
      const {data:res} = await this.$http.get("seats/classroomId/"+id+"/state/"+this.selecttabs,{params:{"createTime":createTime}})
      this.seatsList = res.data.seatsList
      this.subscribeNum = res.data.suNum
    },
    //选择楼层 floorNum 传的楼层号
    async changeFloorsV(floorNum){
      this.todayClassRoom = this.todayClassRooms
      this.todayClassRoom = this.todayClassRoom.filter(v => v.floor===floorNum)
      this.value=''
    },
    //点击座位预约
    async clickSeats(index,items){
      if (this.studentNum==='' || this.name==='') {
        this.$message.error("请填写学号/工号与姓名")
        return;
      }
      if(!items.sT) retuen;
      // 校验时间不能为空
      if (this.createTime===''&&this.endTime==='') {
        this.$message.error("请选择预约时间范围！");
        return;
      }
      //选中判断进行样式
      this.seatsList.findIndex((v,i) =>{
        if(i===index) {
          v.forEach(e => {
            if(e.id===items.id)
              e.sT=!e.sT
          });
        }
      })
      //异常处理
      try {
        const msg= await this.$confirm('此操作预约座位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        if(msg==='confirm')
          this.subscribeSeats(items.id)
      } catch (error) {
        this.$message.success("关闭该预约成功！")
      }
    },

    // 预约
    async subscribeSeats(id){
      let date=new Date()
      //定义初始变量
      let createTime=''
      let endTime=''



      //判断是今天预约还是明天预约（Today and Tomorrow)
      if(this.selecttabs==='Today'){
        createTime=date.toLocaleDateString().split("/").join("-")+" "+this.createTime
        endTime=date.toLocaleDateString().split("/").join("-")+" "+this.endTime
      }else{
        date.setTime(date.getTime() + 24*60*60*1000)
        createTime=date.toLocaleDateString().split("/").join("-")+" "+this.createTime
        endTime=date.toLocaleDateString().split("/").join("-")+" "+this.endTime
      }
      const {data: rel} = await this.$http.post("userinfo",this.$qs.stringify({
        "studentId": this.studentNum,
        "name": this.name
      }))
      
      if(rel.code!=200){
        this.studentNum = ''
        this.name = ""
        return this.$message.error("学号/工号和姓名 出错请重新输入"); 
      }
      // 请求后台接口 进行预约
      const {data:res} = await this.$http.post("subscribe",this.$qs.stringify({
          'createTime':createTime,
          'endTime':endTime,
          'classroomId':this.value,
          'seatsId':id,
          'studentId': this.studentNum
      }))
      //校验是否成功
      if(res.code!==200) return this.$message.error("预约失败请重新预约！")
      this.$message.success("预约成功！")
      // 重新渲染页面
      this.selectToday(this.value)
    },
  }
}
</script>

<style scoped lang="less">
  .selectClassRoom{
    display: flex;
  }
  .el-card{
    margin-top: 20px;
    .box-card-seats{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      .seatCs{
        margin: 15px;
        width: 45%;
        text-align: center;
       // width: 100%;
        display: flex;
        justify-content: center;
        margin: 10px;
        .seatCs_title{
          color:#ccc;
          width: 20px;
          text-align: center;
        }
        .selectSeats{
          cursor: pointer;
          .seatCs_y{
            color: #ccc;
            line-height: 0;
            font-size: 15px;
          }
          .el-tag{
            width: 40px;
            margin: 5px;
            color: #625e5e;
          }
          .el-tag:hover{
            background-color: #ccc;
          }
        }
        
      }
    
  }
  }
  .el-row{
    margin-top: 20px;
  }
  .el-row .el-input{ 
    width: 220px;
  }
  .row{
    flex-wrap: wrap;
  }
  
</style>
