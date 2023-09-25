<template>
    <div class="update-password-box">
      <fieldset style="border-color: #ffb278;border-bottom-style: dashed">
        <legend>重置密码</legend>
        <el-form :model="resetForm" status-icon  ref="resetForm" label-width="100px" class="demo-resetForm">
          <el-form-item label="账号">
            <el-input type="text"
                      v-model="resetForm.userId"
                      autocomplete="off"
                      style="width: 60%;margin-top: 4%;"
                      clearable
                      placeholder="请输入账号"/>
            <el-button type="danger" plain @click="resetPass()" style="margin-left: 40%;margin-top: 2%;">重置密码</el-button>
          </el-form-item>
        </el-form>
      </fieldset>

    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                resetForm: {
                    userId: '',
                    userPassword: ''
                }
            };
        },
        methods: {
            resetPass() {
                if (this.resetForm.userId) {
                    let userInfo;
                    // 获取用户信息
                    this.$store.dispatch('user/findById',this.resetForm.userId).then((res) => {
                        let data = res.data;
                        if (data === null || data === '' || data === 'undefined') {
                            this.$message({
                                message: '未查询到该用户',
                                type: 'error'
                            });
                        }else {
                            let {userId, userName} = data
                            userInfo = `
                    账号：${userId},
                    姓名：${userName},
                    `;
                            this.$confirm(`确认重置 ${userInfo}用户的密码吗？`)
                                .then(_ => {
                                    this.$store.dispatch('user/updateUserInfo',
                                        {
                                            userId: this.resetForm.userId, userPassword: '123456'
                                        }
                                    ).then((res) => {
                                        if (res.code === 200){
                                            this.$message({
                                                message: '密码初始化成功，新密码为：123456',
                                                type: 'success'
                                            });
                                        }
                                    })
                                })
                                .catch(_ => {});
                        }
                    });
                }else {
                    this.$message({
                        message: '请输入账号',
                        type: 'error'
                    });
                }

            }
        }
    }
</script>

<style scoped>
  .update-password-box {
    margin: 4% 4%;
  }
</style>
