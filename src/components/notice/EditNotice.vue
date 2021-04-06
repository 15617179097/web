<template>
  <div>
    <el-dialog
      title="添加/修改公告"
      :visible.sync="noticeVisible"
      width="50%"
      @close="handleClose">
      <el-form ref="noticeListRef" style="height: 400px;" :model="noticeList" :rules="noticeListRules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="noticeList.title"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="state" placeholder="请选择">
          <el-option
              v-for="item in statuItem"
              :key="item.state"
              :label="item.title"
              :value="item.state">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="省份" v-if="this.schoolState">
        <el-select v-model="value" placeholder="请选择省份" @change="changeProvince">
          <el-option
            v-for="(item,index) in from.province"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校名称"  v-if="this.schoolState"> 
        <el-select v-model="schoolNameV" placeholder="请选择省份" @change="changeSchoolName" @focus="focusSchoolName">
          <el-option
            v-for="item in schoolNames"
            :key="item.id"
            :label="item.schoolName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="内容"  prop="content">
          <quill-editor style="height:100px" ref="text" v-model="noticeList.content" class="myQuillEditor" :options="editorOption" />
          <!-- <el-input v-model="noticeList.content" type="textarea"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="zin">
        <el-button @click="noticeVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickFrom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  props:{
    nVisible:Boolean,
    id:Number
  },
  // 监听数据的变化
  watch: {
    async nVisible(newV,oldV){
      this.noticeVisible = this.nVisible
      let state= window.sessionStorage.getItem("schoolId")
      
      if(this.id!=0&&state!=null){
        this.getNoticeItem(this.id)
      }else if(state!=null){

      } else{
        const {data:res} = await this.$http.get("school/city")
        this.cityAndSchool = res.data.city
        this.from.province = res.data.province
        this.schoolState =  !this.schoolState
      }
      
    },
  },
  data() {
    return {
      statuItem:[
        {
          state:0,
          title:"通知公告"
        },
        {
          state:1,
          title:"资源动态"
        },
        {
          state:2,
          title:"2活动信息"
        },
        {
          state:3,
          title:"初来乍到"
        },
        {
          state:4,
          title:"跃跃欲试"
        },
        {
          state:5,
          title:"渐入佳境"
        }
        ],
        state:0,
        // 0:通知公告 1:资源动态 2活动信息 3 初来乍到 4 跃跃欲试 5 渐入佳境)
      schoolNames:[],
      schoolNameV:'',
      value:'',
      schoolState:false,
      cityAndSchool:[],
      from:{
        province:[]
      },
      schoolIdState:[],
      content: '',
    editorOption: {} ,
      noticeVisible:false,
      noticeList:{
        title: '',
        content: ''
      },
      noticeListRules:{
        title: [
            { required: true, message: '请输入公告标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
        content: [
            { required: true, message: '请输入公告内容', trigger: 'blur' }
          ]
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    // 根据id 获取公告
    async getNoticeItem(id){
      const {data:res} = await this.$http.get("Notice/selectANotice/"+id)
      if(res.code!==200){
        this.noticeVisible = false
        this.handleClose() 
        return this.$message.error("编辑打开失败！")
      }
      //初始化内容 
      this.noticeList = res.data[0]
    },
    //监听对话框是否关闭
    handleClose(){
      this.$refs.noticeListRef.resetFields()
      this.$emit("noticeVisible",this.noticeVisible)
    },
    //提交表单
    clickFrom(){
      this.$refs.noticeListRef.validate(async val =>{
        if(!val) return;
        
        // 判断是编辑还是添加
        if(this.id===0){
          const {data:res} = await this.$http.post("Notice/addNotice",this.$qs.stringify(this.noticeList))
          if(res.code!==200)  return this.$message.error("添加失败！")
          this.$message.success("添加成功！")
        }else{
          const {data:res} = await this.$http.post("Notice/updateNotice/"+this.id,this.$qs.stringify(this.noticeList))
          if(res.code!==200)  return this.$message.error("修改失败！")
          this.$message.success("修改成功！")
        }
        this.noticeVisible = !this.noticeVisible
        this.$emit("noticeVisible",this.noticeVisible)
        // 子传父 值 校验是否成功
        const result = true
        this.schoolState = false
        this.$emit("noticeSuccess",result)
      })
    },
    //选择省份
    changeProvince(item){
      let list = []
      this.schoolNames = list
      this.cityAndSchool.forEach(v =>{
        if (v.province===item) {
          list.push(v)
        }
      })
      this.schoolNames = list
    },
    focusSchoolName(){
      
      if(!this.value){
        this.$message.error("请选择省市")
      }
    },
    changeSchoolName(item){
      this.adminFrom.schoolId = item
      
    }
  },
}
</script>

<style scoped lang="less">
  .el-form{
    height: 300px;
  }
  .el-dialog__body{
    height: 400px;
  }
</style>
