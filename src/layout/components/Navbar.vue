<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="baseUrl + userInfoForm.userImage" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <router-link to="">
            <el-dropdown-item>
              <div @click="dialogCenterFormVisible = true">个人中心</div>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item class="clearfix">
            <div @click="viewMessage">
              <el-badge value="new" class="item">
                <span>留言板</span>
              </el-badge>
            </div>
          </el-dropdown-item>
          <router-link to="">
            <el-dropdown-item>
              <div @click="dialogPassFormVisible = true">密码修改</div>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!--个人中心-->
    <div class="user-center-container">
      <el-dialog title="个人中心" :visible.sync="dialogCenterFormVisible">
        <el-form ref="userInfoForm" :model="userInfoForm">
          <el-form-item label="账号" :label-width="formLabelWidth" prop="userId">
            <el-input v-model="userInfoForm.userId" autocomplete="off" placeholder="学号或工号" name="userId" disabled/>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="userInfoForm.userName" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="QQ" :label-width="formLabelWidth" prop="userQq">
            <el-input v-model="userInfoForm.userQq" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="userTelephone">
            <el-input v-model="userInfoForm.userTelephone" autocomplete="off"/>
          </el-form-item>

          <el-form-item label="修改头像" :label-width="formLabelWidth" style="margin-left: 4%;">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageName" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>

            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogCenterFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!--修改密码-->
    <div class="update-pass-container">
      <el-dialog title="修改密码" :visible.sync="dialogPassFormVisible">
        <el-form ref="passForm" :model="passForm" status-icon :rules="rules" label-width="100px" class="demo-passForm">
          <el-form-item label="原密码" prop="pass">
            <el-input v-model="passForm.pass" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input v-model="passForm.newPass" type="password" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="passForm.checkPass" type="password" autocomplete="off"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPassFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePass">确 定</el-button>
        </div>
      </el-dialog>
    </div>


    <!--新发起留言-->
    <div class="message">
      <el-drawer
        title="留言板"
        :visible.sync="drawerVisible"
        direction="rtl"
        :before-close="handleClose">
        <el-tabs type="card">
          <el-tab-pane label="发起新留言">
            <div class="message-send">
              <el-form ref="newMessageForm" label-width="80px" v-model="newMessage">
                <el-form-item label="收信人">
                  <el-select v-model="newMessage.messageRecv" placeholder="请选择" value="" clearable filterable>
                    <el-option v-for="user in userOptions" :user="user.userId" :label="user.userName" :value="user.userId" />
                  </el-select>
                </el-form-item>
                <el-form-item label="留言内容">
                  <el-input type="textarea" v-model="newMessage.messageContent" :autosize="{ minRows: 6, maxRows: 10}"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('newMessageForm')">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="查看留言">
            <div class="message-content" v-for="message in messageList" :key="message.messageId">
              <p>{{message.messageSendName}}</p>
              <div>
               {{message.messageContent}}
              </div>
              <span>{{message.messageTime | formatDate}}</span>
              <el-button type="primary" icon="el-icon-message" style="margin-left: 70%;margin-top: 6%;" @click="replyMessageHandle(message)">回复</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>

    <!--回复-->
    <div class="reply">
      <el-dialog title="回复留言" :visible.sync="dialogReplyFormVisible">
        <el-form :model="replyMessage">
          <el-form-item label="收信人" :label-width="formLabelWidth">
            <el-input v-model="replyMessage.messageRecvName" autocomplete="off"  :value="replyMessage.messageRecvName" disabled></el-input>
          </el-form-item>
          <el-form-item label="回复内容" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="replyMessage.messageContent" :autosize="{ minRows: 6, maxRows: 10}"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogReplyFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="recvMessage">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import {formatDate} from '../../utils/date'
    import {mapGetters} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import localStorageUtil from '../../utils/localStorageUtil'

    export default {
        components: {
            Breadcrumb,
            Hamburger
        },
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    const currentUserPassword = localStorageUtil.read('SET_USER').userPassword;
                    if (currentUserPassword !== value) {
                        callback(new Error('原密码输入错误'))
                    } else {
                        callback()
                    }
                }
            };
            const validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'))
                } else {
                    callback()
                }
            };
            const validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.passForm.newPass) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            };
            return {
                userInfoForm: localStorageUtil.read('SET_USER'),
                dialogCenterFormVisible: false,
                dialogPassFormVisible: false,
                formLabelWidth: '120px',
                clazzs: [],
                passForm: {
                    pass: '',
                    newPass: '',
                    checkPass: ''
                },
                rules: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    newPass: [
                        {validator: validateNewPass, trigger: 'blur'}
                    ]
                },
                /* 图片完整URL*/
                imageUrl: 'http://127.0.0.1:8888/community-management-service/static/images/',
                /* 图片上传地址*/
                action: 'http://127.0.0.1:8888/community-management-service/uploadImg/',
                /*上传成功之后服务器返回的图片名称*/
                imageName: '',
                baseUrl: 'http://127.0.0.1:8888/community-management-service/',
                /*是否显示留言*/
                drawerVisible: false,
                /*是否显示留言回复表单*/
                dialogReplyFormVisible: false,
                /*当前收到的留言*/
                message: {
                    messageContent: '',
                    messageSend: '',
                    messageSendName: '',
                    messageRecv: '',
                    messageRecvName: '',
                    messageStatus: '',
                    messageTime: ''
                },
                messageList: [

                ],
                /*回复的留言*/
                replyMessage: {
                },
                /*新发起的留言*/
                newMessage: {
                    messageContent: '',
                    messageRecv: '',
                    messageSend: localStorageUtil.read('SET_USER').userId,
                    messageStatus: 0,
                    messageTime: new Date().getTime()
                },
                /*用户选项下拉框数据集合*/
                userOptions: [],
            }
        },
        created() {
            this.fetchClazzs();
            this.fetchUserOptions();
            this.fetchMessageList();
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ])
        },
        filters: {
            /*时间过滤器*/
            formatDate(time) {
                if (time === '' || time === 'undefined'){
                    time = new Date().getTime()
                }
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
            }
        },
        methods: {
            /*获取当前登录用户的留言信息*/
            fetchMessageList(){
                this.$store.dispatch('message/findMessage',localStorageUtil.read('SET_USER').userId).then((res => {
                    if (res.code === 200){
                        this.messageList = res.data;
                    }
                }))
            },
            /*获取所有用户列表*/
            fetchUserOptions(){
                this.$store.dispatch('user/findAllUserForOption').then((res) => {
                    if (res.code === 200){
                        this.userOptions = res.data
                    }
                })
            },
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                await this.$store.dispatch('user/logout');
                this.$router.push(`/login?redirect=${this.$route.fullPath}`);
            },
            fetchClazzs() {
                this.$store.dispatch('clazz/findAll').then(res => {
                    this.clazzs = res.data
                })
            },
            updateUserInfo() {
                this.$store.dispatch('user/updateUserInfo', this.userInfoForm).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '修改已提交,下次登录生效',
                            type: 'success'
                        })
                    }
                    this.dialogCenterFormVisible = false
                })
            },
            updatePass() {
                this.$store.dispatch('user/updateUserInfo',
                    {
                        userId: localStorageUtil.read('SET_TOKEN'),
                        userPassword: this.passForm.newPass
                    }).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '修改已提交,下次登录生效',
                            type: 'success'
                        })
                    }
                    this.dialogPassFormVisible = false
                })
            },
            /*头像上传成功*/
            handleAvatarSuccess(res, file) {
                this.imageName = file.raw.name;
                this.imageUrl = this.imageUrl + this.imageName;
                this.userInfoForm.userImage = 'static/images/' + this.imageName
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M
            },
            /*查看留言*/
            viewMessage(){
                this.drawerVisible = true;
            },
            /*是否关闭留言抽屉*/
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            /*留言表单显示处理*/
            replyMessageHandle(message){
                this.dialogReplyFormVisible = true;
                this.replyMessage.messageRecvName = message.messageSendName;
                this.replyMessage.messageRecv = message.messageSend;
                // 利用此ID修改原留言的状态
                this.replyMessage.messageId = message.messageId;
                this.replyMessage.messageSend = localStorageUtil.read('SET_USER').userId;
            },
            /*提交留言信息*/
            submitForm(formName){
                this.$store.dispatch('message/newMessage',this.newMessage).then((res) => {
                    if (res.code === 200){
                        this.$message({
                            type: 'success',
                            showClose: true,
                            message: '成功'
                        });
                        this.$refs[formName].resetFields();
                    }
                })
            },
            /*回复留言信息*/
            recvMessage(){
                // 修改留言状态
                this.$store.dispatch('message/replyMessage',this.replyMessage).then((res) => {
                    if (res.code === 200){
                        this.$message({
                            type: 'success',
                            showClose: true,
                            message: '成功'
                        });
                    }
                    this.dialogReplyFormVisible = false;
                })

            },


        }
    }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .message-content{
    margin: 4%;
  }
  .message-content div{
    margin: 8%;
  }
  .message-content span{
    margin-left: 60%;
  }
  .message-send{
    margin: 4%;
  }

</style>
