<template>
  <div class="main-box">
    <el-table
      :data="memberList"
      border
      style="width: 100%">
      <el-table-column
        fixed prop="userId" label="编号" align="center">
      </el-table-column>
      <el-table-column prop="userName" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="userDepartment" label="部门" width="100" align="center"></el-table-column>
      <el-table-column label="性别" prop="userGender" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ genderList[scope.row.userGender] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="clazzName" label="班级" width="300" align="center"></el-table-column>
      <el-table-column prop="userQq" label="QQ" align="center"></el-table-column>
      <el-table-column prop="userTelephone" label="电话"align="center" ></el-table-column>
      <el-table-column
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 10%;"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import localStorageUtil from "../../../utils/localStorageUtil";
    export default {
        methods: {
            fetchMembers(){
                let params = {
                    status: 1,
                    communityId: localStorageUtil.read('SET_USER').userCommunityId
                }
                this.$store.dispatch('user/findByCommunityId',params).then((res) => {
                    this.memberList = res.data
                })
            },
            handleDelete(index, row) {
                let params = {
                    communityId: localStorageUtil.read('SET_USER').userCommunityId,
                    userId: row.userId
                };
                this.$confirm(`确认踢除用户：${row.userId}:${row.userName} 吗？`)
                    .then(_ => {
                        this.$store.dispatch('user/memberRemoveById', params).then((res) => {
                            if (res.code === 200) {
                                this.$message({
                                    showClose: true,
                                    message: '踢除成功',
                                    type: 'success'
                                })
                            }
                            this.fetchMembers()
                        })
                    })
                    .catch(_ => {
                        this.$message({
                            showClose: true,
                            message: '已经取消'
                        })
                    });
            }
        },
        created(){
            this.fetchMembers()
        },
        data() {
            return {
                memberList: [
                    {
                        userId: '',
                        userName: '',
                        userDepartment: '',
                        userQq: '',
                        userTelephone: '',
                        userGender: '',
                        clazzName: ''
                    }
                ],
                genderList: ['男', '女'],
            }
        }
    }
</script>

<style>
  .main-box {
    margin: 2% 2%;
  }
</style>
