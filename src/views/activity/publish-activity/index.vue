<template>
  <div class="main-box">
    <el-form :model="activityForm" :rules="rules" ref="activityForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="activityName">
        <el-input v-model="activityForm.activityName"></el-input>
      </el-form-item>
      <el-form-item label="活动类型" prop="activityType">
        <el-radio-group v-model="activityForm.activityType">
          <el-radio :label="1">招新</el-radio>
          <el-radio :label="0">其他活动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动地点" prop="activityAddress">
        <el-input v-model="activityForm.activityAddress"></el-input>
      </el-form-item>
      <el-form-item label="主办方" prop="activitySponser">
        <el-input v-model="activityForm.activitySponser"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="activityDescription">
        <el-input type="textarea" v-model="activityForm.activityDescription"
                  :autosize="{ minRows: 6, maxRows: 10}"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="activityImage">
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
      <el-form-item label="开始时间" required>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期"
                            style="width: 100%;" v-model="date1"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="activityStartTime">
            <el-time-picker placeholder="选择时间" v-model="activityForm.activityStartTime"
                            style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="结束时间" required>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" placeholder="选择日期"
                            style="width: 100%;" v-model="date2"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="activityEndTime">
            <el-time-picker placeholder="选择时间" v-model="activityForm.activityEndTime"
                            style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="所属社团" prop="userCommunityId">
        <el-select v-model="activityForm.activityCommunityId" placeholder="请选择" value="">
          <el-option
            v-for="community in communities"
            :key="community.communityId"
            :label="community.communityName"
            :value="community.communityId"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('activityForm')">立即发布</el-button>
        <el-button @click="resetForm('activityForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                activityForm: {
                    activityId: '',
                    activityCommunityId: '',
                    activityName: '',
                    activityType: '',
                    activityStartTime: '',
                    activityEndTime: '',
                    activityImage: '',
                    activityAddress: '',
                    activitySponser: '',
                    activityDescription: ''
                },
                date1: '',
                date2: '',
                communities: [],
                /*基础请求路径*/
                baseUrl: 'http://127.0.0.1:8888/community-management-service/',
                /* 图片上传地址*/
                action: 'http://127.0.0.1:8888/community-management-service/uploadImg/',
                imageName: '',
                imageUrl: '',
                rules: {
                    activityName: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    activityAddress: [
                        {required: true, message: '请输入活动地点', trigger: 'blur'}
                    ],
                    activitySponser: [
                        {required: true, message: '请输入主办方信息', trigger: 'blur'}
                    ],
                    activityDescription: [
                        {required: true, message: '请输入活动简介', trigger: 'blur'}
                    ],
                    activityType: [
                        {required: true, message: '请选择活动类型', trigger: 'change'}
                    ],
                    activityStartTime: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    activityEndTime: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ]
                }
            };
        },
        created() {
            this.fetchCommunities()
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('activity/add', this.activityForm).then((res) => {
                            if (res.code === 200) {
                                this.$message({
                                    message: '发布成功',
                                    type: 'success'
                                });
                            }
                            this.resetForm(formName)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.imageName = file.raw.name;
                this.imageUrl = this.baseUrl + 'static/images/' + this.imageName
                /*更新图片信息*/
                this.activityForm.activityImage = 'static/images/' + this.imageName
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
            /*获取社团信息*/
            fetchCommunities() {
                this.$store.dispatch('community/findAll').then((res) => {
                    this.communities = res.data
                })
            }
        }
    }
</script>

<style>

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

  .main-box {
    margin: 2%;
  }
</style>
