<template>
  <el-dialog
    title="添加用户"
    :visible.sync="adVisible"
    width="50%"
    @close='dialogClose'>
    <el-form :model="adminFrom" status-icon :rules="adminRules" ref="adminRef" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="adminFrom.username" ></el-input>
      </el-form-item>
      
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="adminFrom.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="adminFrom.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
       <el-form-item label="省份" v-if="this.schoolIdState">
        <el-select v-model="value" placeholder="请选择省份" @change="changeProvince">
          <el-option
            v-for="(item,index) in from.province"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学校名称"  v-if="this.schoolIdState"> 
        <el-select v-model="schoolNameV" placeholder="请选择省份" @change="changeSchoolName" @focus="focusSchoolName">
          <el-option
            v-for="item in schoolName"
            :key="item.id"
            :label="item.schoolName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="adminFrom.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="phone" v-model="adminFrom.phone" ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="adVisible = false">取 消</el-button>
      <el-button type="primary" @click="addAdmin">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props:{
    addVisible:Boolean,
    schoolId:Number
  },
  watch: {
    addVisible(newV,oldV){
      this.adVisible = newV
    },
    async schoolId(newV,oldV){
      
      if (newV===0) {
        
         const {data:res} = await this.$http.get("school/city")
         this.cityAndSchool = res.data.city
         this.from.province = res.data.province
         this.schoolIdState =  true
         
        
      }
      
     // = newV
    }
  },
  data() {
    // 自定义校验规则
      let valsidate = (rule, value, callback) => {
         const checkPhone = /^1(3|4|5|6|7|8|9)\d{9}$/
        if (!checkPhone.test(value)) {
           callback(new Error('请输入正确的手机号'));
        } 
          callback();
        };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.adminFrom.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      schoolIdStatus:false,
      schoolNameV:'',
      value:'',
      adVisible:false,
      province:[],
      cityAndSchool:[],
      schoolName:[],
      schoolIdState:false,
      from:{
        province:[],
      },
      adminFrom:{
        username:'',
        password:'',
        checkPassword:'',
        email:'',
        phone:'',
        schoolId:null
      },
      adminRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
        ,
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15,message: '请输入密码,长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass,min: 6, max: 15,message: '两次输入密码不一致!',  trigger: 'blur' }
        ],
        email:[  
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: valsidate, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      }
    }
  },
  components: {

  },
  created() {
    
    
  },
  methods: {
    async getSchoolIdStatus(){
      const {data:res} = await this.$http.get("admins/schoolId")
      if (res.code!=200) {
        return this.getSchoolIdStatus()
      }
      
      this.schoolIdStatus = res.data
      
    },
    addAdmin(){
      this.$refs.adminRef.validate(async val =>{
        //表单检验
        if (!val) return;
        //添加用户请求
        const {data:res} = await this.$http.post("admins",this.$qs.stringify(this.adminFrom))
        //判断是否成功
        if (res.code!=200){
          this.$message.error(res.msg)
        } else{
          this.$message.success("添加成功！")
        }
         this.adVisible = !this.adVisible
        // 子传父 值 校验是否成功
        const result = true
        this.$emit("add-success",result)
      })
    
      
    },

     // 监听弹出框关闭
    dialogClose(){
      this.$refs.adminRef.resetFields()
      this.addAdminVisible()
    },

    // 子传父 值
    addAdminVisible(){
      this.$emit("add-visible",this.adVisible)
    },
    //选择省份
    changeProvince(item){
      let list = []
      this.schoolName = list
      this.cityAndSchool.forEach(v =>{
        if (v.province===item) {
          list.push(v)
        }
      })
      this.schoolName = list
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
</style>
