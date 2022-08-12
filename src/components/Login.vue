<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="../assets/image/logo.png" alt="">
            </div>
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item class="login_item" prop="email">
                    <el-input v-model="loginForm.email" prefix-icon="iconfont icon-yonghu"></el-input>
                </el-form-item>
                <el-form-item class="login_item" prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password"></el-input>
                </el-form-item>
                <el-form-item class="login_item">
                    <el-button type="danger" class="btns" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        email: 'lisi@qq.com',
        password: '123456'
      },
      loginFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // const sendParam = { khbzlx: 'Z', khbz: this.loginForm.username, jymm: this.loginForm.password, sessionid: '0', yybdm: '5042', token: '0', lhxx: 'aaaaaaaaa', lhxxn: 'aaaaaaaaa', lhxxnVer: '1', rzfs: '1', rzxx: '', rznr: '' }
      const sendParam = { 
        user: {
          email: this.loginForm.email, 
          password: this.loginForm.password
        }
      }
      this.$refs.loginFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('users/login', sendParam)
        if (res.status !== 1) return this.$message.error('登录失败')
        const ActivePTJYUser = {
          body: res,
          head: sendParam
        }
        // console.log(ActivePTJYUser)
        window.localStorage.setItem('ActivePTJYUser', JSON.stringify(ActivePTJYUser))
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    .login_box {
        background-color: #FFFFFF;
        width: 300px;
        height: 220px;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .avatar_box {
            width: 50px;
            height: 50px;
            border: 1px solid #EEEEEE;
            border-radius: 50%;
            padding: 5px;
            box-shadow: 0 0 10px #DDDDDD;
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #FFFFFF;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #EEEEEE;
            }
        }
    }
    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .login_item {
        padding: 0 10%;
        margin-bottom: 20px;
    }
    .btns {
        width: 80%;
        margin-left: 10%;
    }
}
</style>
