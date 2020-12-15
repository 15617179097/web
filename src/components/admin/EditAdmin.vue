<template>
  <el-dialog
    title="编辑用户"
    :visible.sync="visible"
    width="50%"
    @close='dialogClose'>
    <el-form :model="adminr" status-icon :rules="adminRules" ref="adminRef" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名">
        <el-input v-model="adminr.username" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="adminr.email" ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="phone" v-model="adminr.phone" ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="editAdmin">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name:'adminRow',
 
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
      adminr : this.adminRow,
      visible : false,
      adminFrom:{
        username:'',
        // password:'',
        // checkPassword:'',
        email:'',
        phone:''
      },
      adminRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
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
  watch: {
      adminRow(newV,oldV){
        this.adminr = newV
      },
      editVisible(newV,oldV){
        this.visible=newV
      }
  },
  props:{
    editVisible:Boolean,
    adminRow:Object
  },
  computed: {

  },
  components: {

  },
  methods: {
    editAdmin(){
      this.$refs.adminRef.validate(async val =>{
        //表单检验
        if (!val) return;
        //添加用户请求
        const {data:res} = await this.$http.post("admins/"+this.adminr.id,this.$qs.stringify(this.adminr))
        //判断是否成功
        if (res.code!=200) return this.$message.error("修改失败！")
        this.visible = !this.visible
        this.$message.success("修改成功！")
        // 子传父 值 校验是否成功
        const result = true
        this.$emit("add-success",result)
      })
    
      
    },

     // 监听弹出框关闭
    dialogClose(){
      //this.$refs.adminRef.resetFields()
      this.addAdminVisible()
    },

    // 子传父 值
    addAdminVisible(){
      this.$emit("add-visible",this.visible)
    }

  },
}
</script>

<style scoped lang="less">
</style>
