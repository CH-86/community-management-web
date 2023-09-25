<template>
  <div class="main-box">
    <el-button type="primary" icon="el-icon-plus" @click="dialogVisibleForAddCommunity = true ">创建新社团</el-button>
    <el-table
      :data="communityList"
      style="width: 100%">
      <el-table-column label="编号" prop="communityId"></el-table-column>
      <el-table-column label="简介" prop="communityDiscription"></el-table-column>
      <el-table-column label="LOGO">
        <template slot-scope="scope">
          <el-image :src="baseUrl + scope.row.communityLogo" style="width: 60%;height: 60%">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="负责人"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.userName }}</p>
            <p>电话: {{ scope.row.userTelephone }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{scope.row.userName}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip :content="scope.row.communityName + '状态: ' + approvalTag[scope.row.communityStatus]"
                      placement="top" style="margin-right: 2%">
            <el-switch
              v-model="scope.row.communityStatus"
              active-color="#13ce66"
              inactive-color="#c3ccc7"
              :active-value="1"
              :inactive-value="2"
              @change="approvalCommunityStatus(scope.row)">
            </el-switch>
          </el-tooltip>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class="pagination-box">
      <el-pagination
        :page-size="pageSize"
        :current-page="pageNum"
        :total="total"
        :page-sizes="[5, 10, 20, 50, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!--新增社团弹窗-->
    <el-dialog title="创建社团" :visible.sync="dialogVisibleForAddCommunity">
      <el-form :model="newCommunity" ref="addCommunityForm" :rules="rules">
        <el-form-item label="社团名称" prop="communityName">
          <el-input v-model="newCommunity.communityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="communityDiscription">
          <el-input type="textarea" v-model="newCommunity.communityDiscription"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="communityLogo">
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
        <el-button type="primary" @click="submitForm('addCommunityForm')">立即创建</el-button>
        <el-button @click="resetForm('addCommunityForm')">重置</el-button>
      </div>
    </el-dialog>


    <!--编辑弹窗-->
    <el-dialog title="修改社团信息" :visible.sync="dialogVisibleForModifyCommunity">
      <el-form :model="currentRow" ref="modifyCommunityForm" :rules="rules">
        <el-form-item label="社团名称" prop="communityName">
          <el-input v-model="currentRow.communityName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="communityDiscription">
          <el-input type="textarea" v-model="currentRow.communityDiscription"
                    :autosize="{ minRows: 6, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item label="LOGO" prop="communityLogo">
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
        <el-button
          type="primary"
          @click="submitFormByModify('modifyCommunityForm')">提交
        </el-button>
        <el-button @click="resetForm('modifyCommunityForm')">重置</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default {
        data() {
            return {
                approvalTag: ['未审核', '审核通过', '未通过审核'],
                communityList: [{
                    communityId: '',
                    communityName: '',
                    communityDiscription: '',
                    communityLogo: '',
                    communityStatus: ''
                }],
                /*新增社团弹窗控制是否显示*/
                dialogVisibleForAddCommunity: false,
                /*修改社团信息弹窗*/
                dialogVisibleForModifyCommunity: false,
                /*选中当前行的数据*/
                currentRow: {},
                /*新增社团*/
                newCommunity: {
                    communityId: '',
                    communityName: '',
                    communityDiscription: '',
                    communityLogo: '',
                    communityStatus: 1
                },
                /* 图片完整URL*/
                imageUrl: 'http://127.0.0.1:8888/community-management-service/static/images/',
                /* 图片上传地址*/
                action: 'http://127.0.0.1:8888/community-management-service/uploadImg/',
                /*基础请求路径*/
                baseUrl: 'http://127.0.0.1:8888/community-management-service/',
                /*后台返回的文件名称*/
                imageName: '',
                pageNum: 1,
                pageSize: 5,
                /* 总记录条数*/
                total: 10,
                rules: {
                    communityName: [
                        {required: true, message: '请输入社团名称', trigger: 'blur'},
                    ],
                    communityDiscription: [
                        {required: true, message: '请输入社团简介', trigger: 'change'}
                    ],
                    communityLogo: [
                        {required: true, message: '请设置社团LOGO', trigger: 'blur'}
                    ]
                },
            }
        },
        created() {
            this.fetchCommunities()
            this.findTotal()
        },
        methods: {
            /*
            拉取服务器社团信息
            * */
            fetchCommunities() {
                const params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    order: 'DESC'
                };
                this.$store.dispatch('community/findAllByPaging', params).then((res) => {
                    if (res.code === 200) {
                        this.communityList = res.data
                    }
                });
            },
            /* 获取社团总记录条数*/
            findTotal() {
                this.$store.dispatch('community/findTotal').then((res) => {
                    this.total = res.data
                })
            },
            handleEdit(index, row) {
                this.dialogVisibleForModifyCommunity = true
                this.currentRow = row
                /*更新当前的图片信息*/
                this.imageUrl = this.baseUrl + row.communityLogo
                this.imageName = 'default'
            },
            handleDelete(index, row) {
                this.$confirm(`确认删除用户 社团：${row.communityName} 吗？`)
                    .then(_ => {
                        this.$store.dispatch('community/removeById', row.communityId).then((res) => {
                            if (res.code === 200) {
                                this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                })
                            }
                        })
                    })
                    .catch(_ => {
                        this.$message({
                            showClose: true,
                            message: '已经取消'
                        })
                    });
                this.fetchCommunities()
            },
            handleAvatarSuccess(res, file) {
                this.imageName = file.raw.name;
                this.imageUrl = this.baseUrl + 'static/images/' + this.imageName
                /*更新图片信息*/
                this.currentRow.communityLogo = 'static/images/' + this.imageName
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
            /* 每页显示多少条改变时间*/
            handleSizeChange(val) {
                this.pageNum = 1;
                this.pageSize = val;
                this.fetchCommunities()
            },
            /* 页码发生改变时间*/
            handleCurrentChange(val) {
                this.pageNum = val;
                this.fetchCommunities()
            },
            // 创建社团
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('community/add', this.newCommunity).then((res) => {
                            if (res.code === 200) {
                                this.$message({
                                    message: '发布成功，等待管理员审核',
                                    type: 'success'
                                });
                            } else {
                                this.$message({
                                    message: '发布失败，服务器内部错误',
                                    type: 'error'
                                });
                            }
                            this.dialogVisibleForAddCommunity = false
                            this.$nextTick(() => {
                                this.$refs.addCommunityForm.resetFields()
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
            },
            /*社团审批*/
            approvalCommunityStatus(row) {
                let {communityId,communityStatus} = row
                let params = {
                    communityId: communityId,
                    communityStatus: communityStatus
                }
                this.$store.dispatch('community/approvalCommunity',params).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '修改已提交',
                            type: 'success'
                        });
                    }
                })
            },
            /*
            * 修改社团信息
            * */
            submitFormByModify() {
                this.$store.dispatch('community/modify', this.currentRow).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            showClose: true,
                            type: 'success',
                            message: '修改已提交'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            type: 'error',
                            message: '修改失败，服务器内部错误'
                        });
                    }

                    this.dialogVisibleForModifyCommunity = false
                })
            }
        }
    }
</script>

<style>
  .main-box {
    margin: 2% 2%;
  }

  .pagination-box {
    margin: 4% 30%;
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
