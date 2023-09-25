<template>
  <div class="main-box">
    <el-form ref="newsForm" :model="news" label-width="80px" :rules="rules">
      <el-form-item label="新闻标题" prop="newsTitle">
        <el-input v-model="news.newsTitle" ></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select placeholder="新闻" disabled value="新闻"></el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="newsCreateTime">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期"  v-model="news.newsDate" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker placeholder="选择时间" v-model="news.newsCreateTime" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="新闻内容" prop="newsContent">
        <el-input type="textarea" v-model="news.newsContent" :autosize="{ minRows: 6, maxRows: 10}"></el-input>
      </el-form-item>
      <el-form-item label="新闻图片" prop="newsImage">
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
      <el-form-item>
        <el-button type="primary" @click="submitForm('newsForm')">立即发布</el-button>
        <el-button @click="resetForm('newsForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import localStorageUtil from '../../../utils/localStorageUtil'

    export default {
        data() {
            return {
                /* 图片完整URL*/
                imageUrl: 'http://127.0.0.1:8888/community-management-service/static/images/',
                /* 图片上传地址*/
                action: 'http://127.0.0.1:8888/community-management-service/uploadImg/',
                /*后台返回的文件名称*/
                imageName: '',
                news: {
                    newsTitle: '',
                    newsImage: '',
                    newsContent: '',
                    newsType: 0,
                    newsCreateTime: '',
                    newsCommunityId: localStorageUtil.read('SET_USER').userCommunityId,
                    newsDate: ''
                },
                rules: {
                    newsTitle: [
                        { required: true, message: '请输入新闻标题', trigger: 'blur' },
                    ],
                    newsCreateTime: [
                        { required: true, message: '请选择时间', trigger: 'change' }
                    ],
                    newsContent: [
                        { required: true, message: '请输入新闻内容', trigger: 'blur' }
                    ],
                    newsImage: [
                        { required: true, message: '请上传新闻图片', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageName = file.raw.name;
                this.imageUrl = this.imageUrl + this.imageName
                this.news.newsImage = 'static/images/' + this.imageName
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
            // 发布新闻
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('news/add', this.news).then((res) => {
                            if (res.code === 200) {
                                this.$message({
                                    message: '发布成功，等待管理员审核',
                                    type: 'success'
                                });
                            }else {
                                this.$message({
                                    message: '发布失败，服务器内部错误',
                                    type: 'error'
                                });
                            }
                            this.$nextTick(() => {
                                this.$refs.newsForm.resetFields()
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            /*重置*/
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
  .main-box {
    margin: 2%;
  }

  .disabled .el-upload--picture-card {
    display: none;
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

</style>
