<template>
  <div class="main-box">
    <el-row>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table
      stripe
      border
      :data="colleges"
      style="width: 100%">
      <el-table-column
        prop="collegeId"
        label="编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="collegeName"
        label="名称"
        align="center">
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="primary">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="add-box">
      <el-dialog title="新增学院信息" :visible.sync="dialogAddFormVisible">
        <el-form :model="college">
          <el-form-item label="学院编号">
            <el-input v-model="college.collegeId" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="学院名称">
            <el-input v-model="college.collegeName" autocomplete="off" value=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCollege">确 定</el-button>
        </div>
      </el-dialog>
    </div>


    <div class="exit-box">
      <el-dialog title="编辑学院信息" :visible.sync="dialogEditFormVisible">
        <el-form :model="college">
          <el-form-item label="学院编号">
            <el-input v-model="currentRow.collegeId" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="学院名称">
            <el-input v-model="currentRow.collegeName" autocomplete="off" value=""></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editCollegeInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                college: {
                    collegeId: '系统自动分配',
                    collegeName: ''
                },
                dialogAddFormVisible: false,
                dialogEditFormVisible: false,
                currentRow: {}
            }
        },
        created() {
            this.fetchColleges()
        },
        computed: {
            ...mapGetters(['colleges'])
        },
        methods: {
            fetchColleges() {
                // 加载学院数据
                this.$store.dispatch('college/findAll')
            },
            handleEdit(index, row) {
                this.currentRow = row
                this.dialogEditFormVisible = true
            },
            handleAdd() {
                this.dialogAddFormVisible = true
            },
            addCollege() {
                this.college.collegeId = null
                this.$store.dispatch('college/add', this.college).then((res => {
                    if (res.code === 200) {
                        this.$message(
                            {
                                message: '添加成功',
                                type: 'success'
                            }
                        )
                        this.fetchColleges()
                    }
                }))
                this.dialogAddFormVisible = false
            },
            editCollegeInfo() {
                this.$store.dispatch('college/update', this.currentRow).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                    }
                    this.dialogEditFormVisible = false
                    this.fetchColleges()
                })
            },
        }
    }
</script>

<style>
  .main-box {
    margin: 2% 2%;
  }
</style>

