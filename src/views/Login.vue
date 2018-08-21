<template>
    <div class="login">
        <el-form class="container" :model="myForm" :rules="rules" ref="myForm">
            <el-form-item>
                <img src="../assets/logo.png" class="avatar">
            </el-form-item>
            <el-form-item label="" prop="username">
                <el-input prefix-icon="el-icon-edit" v-model="myForm.username" placeholder="账户">用户名</el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input type="password" prefix-icon="el-icon-view" v-model="myForm.password" placeholder="密码" @keydown.native.enter="loginSubmit('myForm')">密码</el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="login-btn" type="primary" @click="loginSubmit('myForm')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {checkUser} from '@/api'
export default {
    data() {
        return {
            myForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        loginSubmit(formName) {
            // 在前端进行表单验证，只有通过验证才去发送ajax请求
            this.$refs[formName].validate(valid => {
                if(valid) {
                    checkUser(this.myForm).then(res =>  {
                        if(res.meta.status === 200) {
                            // 登录成功，在本地存储token
                            localStorage.setItem('myToken', res.data.token)
                            // 并且将用户名username保存到vuex状态管理(中介)中   中介调用一下setUsername方法,保存username
                            this.$store.commit('setUsername', res.data.username)
                            this.$router.push({name: 'Home'})
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.meta.msg
                            })
                        }
                    })
                }else {
                    console.log('校验不通过')
                }
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

