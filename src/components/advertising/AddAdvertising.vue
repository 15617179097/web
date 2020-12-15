<template>
<el-dialog
  title="添加/修改新闻"
  :visible.sync="advertisingVisible"
  width="50%"
  @close="handleClose">
  <el-form :model="advertisingForm" :rules="rules" ref="ruleForm" label-width="100px">
  <el-form-item label="标题" prop="title">
    <el-input v-model="advertisingForm.title"></el-input>
  </el-form-item>
  <el-form-item label="详情" prop="content">
    <el-input v-model="advertisingForm.content"></el-input>
  </el-form-item>
  <el-form-item label="广告图" prop="file" ref="uploadElement">
    <el-upload
      class="upload-demo"
      action="http://localhost:8000/uploading"
      :on-success="handleAvatarSuccess"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :limit="1"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
    </el-upload>
  </el-form-item>
  <!-- <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item> -->
</el-form>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="delFrom">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </span>
</el-dialog>

</template>

<script>
export default {
  props:{
    addAdvertisingVisible:Boolean,
    editAdvertising:Object
  },
  watch: {
    addAdvertisingVisible(newV,oldV){
      this.advertisingVisible = newV
    },
    editAdvertising(newV,oldV){
      if (newV) {
      this.file.name=newV.fileName
      this.file.url=newV.fileUrl
      this.fileList.push(this.file)
      this.advertisingForm=newV
      }
      
    }
  },
  data() {
    return {
      advertisingVisible:false,
      advertisingForm:{
        title: '',
        content:'',
        fileName:'',
        fileUrl:''
      },
      file:{
        name:'',
        url:''
      },
      rules: {
          title: [
            { required: true, message: '请输入标题名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          file: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ]
        },
    fileList: 
            [
            
            ]
    }
  },
  components: {

  },
  methods: {
    submitForm() {
      this.rules.file = [{ required: true, message: '请上传图片' , trigger: 'blur' }]
      if(this.fileList.length>0){
        this.rules.file = []
        this.$refs.uploadElement.clearValidate();
      }
      this.$refs.ruleForm.validate(async (valid) => {
          if (!valid) return;
          if (valid){
            if (this.advertisingForm.id) {
              let {data:res} = await this.$http.post("advertising/update",this.$qs.stringify(this.advertisingForm))
              if(res.code==200) {
                this.$emit("addSuccess",true)
                this.$message.success("修改成功！") 
              }else{
                this.$message.error("修改失败！")
              } 
              
            }else{
              let {data:res} = await this.$http.post("advertising",this.$qs.stringify(this.advertisingForm))
              if(res.code==200) {
                this.$emit("addSuccess",true)
                this.$message.success("添加成功！") 
              }else{
                this.$message.error("添加失败！")
              } 
              
            }      
          }
          this.advertisingVisible = !this.advertisingVisible;
        });
      },
    delFrom(){
      this.advertisingVisible = !this.advertisingVisible;
    },
    addFrom(){
      this.advertisingVisible = !this.advertisingVisible;
    },
    handleClose(){
      this.fileList=[]
      this.$refs.ruleForm.resetFields()
      this.advertisingForm={}
      this.$emit("addAdvertisingVisible",this.advertisingVisible)
    },
    //上传图片成功的回调
    handleAvatarSuccess(res, file){
      this.fileList.push(file)
      this.advertisingForm.fileName = res.data.name
      this.advertisingForm.fileUrl = res.data.url   
    },
     handleRemove(file, fileList) {
        this.fileList.pop(file)
      },
      handlePreview(file) {
      }
  },
}
</script>

<style scoped lang="less">
.el-form{
    height: 400px;
  }
</style>
