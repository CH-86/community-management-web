<template>
  <!--用户列表-->
  <div class="main-box">
    <el-row class="topRow">
      <el-button type="danger" @click="batchDelete">批量删除</el-button>
    </el-row>

    <!--用户表格-->
    <el-table stripe fit :data="userList" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="账号" prop="userId" width="100" align="center" />
      <el-table-column label="用户名" prop="userName" align="center" />
      <el-table-column label="性别" prop="userGender" align="center">
        <template slot-scope="scope">
          <span>{{ genderList[scope.row.userGender] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" prop="clazzName" width="160" align="center" />
      <el-table-column label="部门" prop="userDepartment" width="100" align="center" />
      <el-table-column label="QQ" prop="userQq" width="160" align="center" />
      <el-table-column label="电话" prop="userTelephone" width="160" align="center" />
      <el-table-column label="电话" prop="userTelephone" width="160" align="center" />
      <el-table-column label="社团" prop="communityName" width="160" align="center" />
      <el-table-column label="角色" width="100" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover"placement="top">
            <p>角色代码: {{ scope.row.userType }}</p>
            <p>角色名称: {{ roleList[scope.row.userType].name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" :type="tagList[scope.row.userType]">{{ roleList[scope.row.userType].name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="头像" prop="userImage" width="200" align="center" />
      <el-table-column fixed="right" align="right" width="260">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="handlePermissions(scope.$index, scope.row)">授权
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑弹窗-->
    <div class="exit-box">
      <el-dialog title="编辑" :visible.sync="dialogEditFormVisible">
        <el-form ref="userInfoForm" :model="row">
          <el-form-item label="账号" :label-width="formLabelWidth" prop="userId">
            <el-input v-model="row.userId" autocomplete="off" placeholder="学号或工号" name="userId" disabled />
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="row.userName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="QQ" :label-width="formLabelWidth" prop="userQq">
            <el-input v-model="row.userQq" autocomplete="off" />
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth" prop="userTelephone">
            <el-input v-model="row.userTelephone" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!--授权弹窗-->
    <div class="Permissions-box">
      <el-dialog title="授权" :visible.sync="dialogPermissionsVisible">
        <el-form ref="userInfoForm" :model="row">
          <el-form-item label="账号" :label-width="formLabelWidth" prop="userId">
            <el-input v-model="row.userId" autocomplete="off" name="userId" disabled />
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="userName">
            <el-input v-model="row.userName" autocomplete="off" disabled />
          </el-form-item>

          <el-form-item label="社团" :label-width="formLabelWidth" prop="userCommunityId">
            <el-select v-model="row.userCommunityId" placeholder="请选择" value="">
              <el-option
                v-for="community in communities"
                :key="community.communityId"
                :label="community.communityName"
                :value="community.communityId"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="角色" :label-width="formLabelWidth" prop="userType">
            <el-select v-model="row.userType" placeholder="请选择" value="普通用户">
              <el-option v-for="role in roleList" :key="role.id" :label="role.name" :value="role.id" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPermissionsVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>

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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      /* 用户列表数据*/
      userList: [],
      /* 姓名查找*/
      search: '',
      roleList: [
        {
          id: 0,
          name: '普通用户'
        },
        {
          id: 1,
          name: '社团管理员'
        },
        {
          id: 2,
          name: '系统管理员'
        }
      ],
      tagList: ['success', 'info', 'danger'],
      genderList: ['男', '女'],
      /* 批量操作时选中的数据信息*/
      multipleSelection: [],
      /* 当前选中这一行的数据*/
      row: {},
      /* 授权弹窗控制*/
      dialogPermissionsVisible: false,
      /* 编辑弹窗控制*/
      dialogEditFormVisible: false,
      /* label 宽度*/
      formLabelWidth: '120px',
      /* 社团信息列表*/
      communities: [
        {
          communityId: '',
          communityName: ''
        }
      ],
      /* 默认每页显示五条*/
      pageSize: 5,
      /* 默认显示第一页数据*/
      pageNum: 1,
      /* 用户列表总记录条数*/
      total: 10

    }
  },
  watch: {
    /* 监听用户的搜索 根据姓名去后台查找用户*/
    search(oldVal, newVal) {
      if (oldVal !== newVal && this.search !== '') {
        this.$store.dispatch('user/findAllByLikeUserName', this.search).then((res) => {
          this.userList = res.data
        })
      } else {
        this.fetchUsers()
      }
    }
  },
  created() {
    this.fetchUsers()
    this.fetchCommunities()
    this.fetchTotal()
  },
  methods: {
    /* 获取用户总记录条数*/
    fetchTotal() {
      this.$store.dispatch('user/getTotal').then((res) => {
        this.total = res.data
      })
    },
    /* 每页显示多少条改变时间*/
    handleSizeChange(val) {
      this.pageNum = 1
      this.pageSize = val
      this.fetchUsers()
    },
    /* 页码发生改变时间*/
    handleCurrentChange(val) {
      this.pageNum = val
      this.fetchUsers()
    },
    /* 加载社团数据*/
    fetchCommunities() {
      this.$store.dispatch('community/findAll').then(res => {
        this.communities = res.data
      })
    },
    /* 加载用户数据*/
    fetchUsers() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        order: 'desc'
      }
      this.$store.dispatch('user/users', params).then((res) => {
        this.userList = res.data
      }
      )
    },
    // 批量操作时的选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /* 编辑触发弹窗*/
    handleEdit(index, row) {
      this.row = row
      this.dialogEditFormVisible = true
    },
    /* 授权触发弹窗*/
    handlePermissions(index, row) {
      this.row = row
      this.dialogPermissionsVisible = true
    },
    /* 删除处理*/
    handleDelete(index, row) {
      this.$confirm(`确认删除用户 账号：${row.userId}: 用户名：${row.userName} 吗？`)
        .then(_ => {
          this.$store.dispatch('user/deleteById', row.userId).then((res) => {
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
        })
      this.fetchUsers()
    },
    /* 修改用户信息*/
    updateUserInfo() {
      this.$store.dispatch('user/updateUserInfo', this.row).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
        this.dialogEditFormVisible = false
        this.dialogPermissionsVisible = false
        this.fetchUsers()
      })
    },
    /* 批量删除*/
    batchDelete() {
      const ids = []
      this.multipleSelection.forEach(element => {
        ids.push(element.userId)
      })
      this.$confirm(`确认删除选中的用户吗？`)
        .then(_ => {
          this.$store.dispatch('user/batchDeleteById', ids).then((res) => {
            if (res.code === 200) {
              this.$message({
                showClose: true,
                message: `删除成功,共${res.data}条记录`,
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
        })
    }
  }
}
</script>
<style scoped>
  .main-box {
    margin: 2% 2%;
  }
  .pagination-box {
    margin: 4% 30%;
  }
</style>
