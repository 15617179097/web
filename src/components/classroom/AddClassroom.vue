<template>
  <div>
     <!-- 弹框 -->
      <el-dialog
        title="添加/修改自修室"
        :visible.sync="classroomVisible"
        width="50%"
        @close='dialogClose'>
        <el-form :model="classroom" :rules="classroomRules" ref="classroomRef" label-width="100px">
          <el-form-item label="自修室名称" prop="classroomName">
            <el-input v-model="classroom.classroomName"></el-input>
          </el-form-item>
          <el-form-item label="楼层" prop="floor">
            <el-input   v-model.number="classroom.floor"></el-input>
          </el-form-item>
          <el-form-item label="容量(座位数)" prop="classroomNumber">
            <el-input   v-model.number="classroom.classroomNumber"></el-input>
          </el-form-item>
          <el-form-item label="排数" prop="x">
            <el-input   v-model.number="classroom.x"></el-input>
          </el-form-item>
          <el-form-item label="列数" prop="y">
            <el-input   v-model.number="classroom.y"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="classroomVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClassroom">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props:{
    addClassroomVisible: Boolean,
    id: Number
  },
  watch: {
    addClassroomVisible(newV,oldV){
      this.classroomVisible = newV
      if(this.id!==0){
        this.editClassroom(this.id)
      }

      
    },
  },
  data() {

    return {
      classroomVisible:false,
      classroom:{
        classroomName:'',
        floor:'',
        classroomNumber:'',
        x:'',
        y:''
      },
      editClassroomState:false,
      classroomRules:{
          classroomName: [
            { required: true, message: '请输入自修室名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          floor: [
            { required: true, message: '请输入楼层号', trigger: 'blur' },
            {type:'number', message: '只能为数字', trigger: 'blur' }
          ],
          classroomNumber: [
            { required: true, message: '请输入自修室容量', trigger: 'blur' },
             {type:'number', message: '只能为数字', trigger: 'blur' }
          ],
          x: [
            { required: true, message: '请输入排数', trigger: 'blur' },
            {type:'number',  message: '只能为数字', trigger: 'blur' }
            // {validator: validateX, message: '请输入正确的排数', trigger: 'blur' }
          ],
          y: [
            { required: true, message: '请输入列数', trigger: 'blur' },
            {type:'number',  message: '只能为数字', trigger: 'blur' }
          ]
        }
      
    }
  },
  components: {

  },
  methods: {
    // 监听弹出框关闭
    dialogClose(){

      this.$refs.classroomRef.resetFields()
      this.$emit("classroomVisible",this.classroomVisible)
     
      
      this.editClassroomState = false
    },
    // 修改自修室内容
    async editClassroom(id){
      let {data:res} =await this.$http.get("classRoom/findAllClassRoom",{params:{"id":id}})
      if(res.code!==200) return this.$message.error("编辑失败！");
      this.classroom = res.data[0]

    },
    // 添加/修改自修室
    addClassroom(){
      
      this.$refs.classroomRef.validate( async val =>{
        if(!val) return;
        if(this.id===0){
        const {data:res} = await this.$http.post("classRoom/insert",this.$qs.stringify(this.classroom))
        if(res.code!=200) return this.$message.error("添加自修室失败！");
        this.$message.success("添加自修室成功！");
        }else{
          const {data:res} = await this.$http.post("classRoom/updateClassroom/"+this.id,this.$qs.stringify(this.classroom))
          if(res.code!==200) return this.$message.error("修改信息失败！")
          this.$message.success("修改信息成功！");
        }
        this.classroomVisible = ! this.classroomVisible
        this.$emit("classroomVisible",this.classroomVisible)
        // 子传父 值 校验是否成功
        const result = true
        this.$emit("add-success",result)
      })
    }
  },
}
</script>

<style scoped lang="less">
</style>
