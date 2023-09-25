<template>
  <div style=" min-height: 100%;width: 100%; overflow: hidden;background-color: #2d3a4b;">
    <!--登录开始-->
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">登录</h3>
        </div>
        <el-form-item prop="userId">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="userId"
            v-model="loginForm.userId"
            placeholder="账号"
            name="userId"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.userPassword"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登录
        </el-button>
        <el-link type="success" style="margin-left: 60%" @click="dialogFormVisible = true">还没有账号，点击注册</el-link>

      </el-form>
    </div>
    <!--登录结束-->

    <!--注册开始-->
    <div class="register-container">
      <el-dialog title="注册" :visible.sync="dialogFormVisible">
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
          <el-form-item label="账号" :label-width="formLabelWidth" prop="userId">
            <el-input v-model="registerForm.userId" autocomplete="off" placeholder="学号或工号" name="userId" />
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="registerForm.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="registerForm.userGender" placeholder="请选择" value="">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-select v-model="registerForm.userClazzId" placeholder="请选择" value="">
              <el-option v-for="clazz in clazzs" :key="clazz.clazzId" :label="clazz.clazzName" :value="clazz.clazzId" />
            </el-select>
          </el-form-item>
          <el-form-item label="QQ" :label-width="formLabelWidth" prop="userQq">
            <el-input v-model="registerForm.userQq" autocomplete="off" />
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="userTelephone">
            <el-input v-model="registerForm.userTelephone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" prop="userPassword">
            <el-input v-model="registerForm.userPassword" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmUserPassword">
            <el-input v-model="registerForm.confirmUserPassword" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRegister">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--注册结束-->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUserId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度必须大于等于6位'))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.userPassword) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    const validateCUserTelephone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('电话号码不能为空'))
      } else {
        const telephoneReg = /^1[3-578]\d{9}$/
        if (telephoneReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的电话号码'))
        }
      }
    }
    const validateUserNameThis = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userId: '88888888', userPassword: '123456'
      },
      loginRules: {
        userId: [{ required: true, trigger: 'blur', validator: validateUserId }],
        userPassword: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      registerForm: {
        userId: '',
        userName: '',
        userPassword: '',
        userClazzId: '',
        userDepartment: '',
        userImage: '',
        userQq: '',
        userTelephone: '',
        userGender: '',
        userType: '',
        userCommunityId: '',
        confirmUserPassword: ''
      },
      registerRules: {
        userId: [{ required: true, trigger: 'blur', validator: validateUserId }],
        userName: [{ required: true, trigger: 'blur', validator: validateUserNameThis }],
        userPassword: [{ required: true, trigger: 'blur', validator: validatePassword }],
        confirmUserPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }],
        userTelephone: [{ required: true, trigger: 'blur', validator: validateCUserTelephone }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      clazzs: []
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.fetchClazzs()
  },
  methods: {
    fetchClazzs() {
      this.$store.dispatch('clazz/findAll').then(res => {
        this.clazzs = res.data
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then((res) => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((e) => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/register', this.registerForm).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '恭喜你，注册成功',
                type: 'success'
              })
              this.dialogFormVisible = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  $bg: #283443;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
