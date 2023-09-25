<template>
  <div class="main-box">
    <el-row>
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
    </el-row>
    <el-table
      stripe
      border
      :data="clazzs"
      style="width: 100%">
      <el-table-column
        prop="clazzId"
        label="编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="clazzName"
        label="名称"
        align="center">
      </el-table-column>
      <el-table-column
        prop="collegeName"
        label="所属学院"
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
      <el-dialog title="新增班级信息" :visible.sync="dialogAddFormVisible">
        <el-form :model="clazz">
          <el-form-item label="班级编号">
            <el-input v-model="clazz.clazzId" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级名称">
            <el-input v-model="clazz.clazzName" autocomplete="off" value=""></el-input>
          </el-form-item>
          <el-form-item label="所属学院" prop="collegeId">
            <el-select v-model="clazz.collegeId" placeholder="请选择" value="">
              <el-option v-for="college in colleges" :key="college.collegeId" :label="college.collegeName"
                         :value="college.collegeId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addClazz">确 定</el-button>
        </div>
      </el-dialog>
    </div>


    <div class="exit-box">
      <el-dialog title="编辑班级信息" :visible.sync="dialogEditFormVisible">
        <el-form :model="clazz">
          <el-form-item label="班级编号">
            <el-input v-model="currentRow.clazzId" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="班级名称">
            <el-input v-model="currentRow.clazzName" autocomplete="off" value=""></el-input>
          </el-form-item>
          <el-form-item label="所属学院" prop="collegeId">
            <el-select v-model="currentRow.collegeId" placeholder="请选择" value="">
              <el-option v-for="college in colleges" :key="college.collegeId" :label="college.collegeName"
                         :value="college.collegeId"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editClazzInfo">确 定</el-button>
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
                clazz: {
                    clazzId: '系统自动分配',
                    clazzName: '',
                    collegeId: ''
                },
                dialogAddFormVisible: false,
                dialogEditFormVisible: false,
                currentRow: {}
            }
        },
        created() {
            this.fetchColleges()
            this.fetchClazzs()
        },
        computed: {
            ...mapGetters(['clazzs', 'colleges'])
        },
        methods: {
            fetchColleges() {
                // 加载学院数据
                this.$store.dispatch('college/findAll')
            },
            fetchClazzs() {
                // 加载班级数据
                this.$store.dispatch('clazz/findAll')
            },
            handleEdit(index, row) {
                this.currentRow = row
                this.dialogEditFormVisible = true
            },
            handleAdd() {
                this.dialogAddFormVisible = true
            },
            addClazz() {
                this.clazz.clazzId = null
                this.$store.dispatch('clazz/add', this.clazz).then((res => {
                    if (res.code === 200) {
                        this.$message(
                            {
                                message: '添加成功',
                                type: 'success'
                            }
                        )
                        this.fetchClazzs()
                    }
                }))
                this.dialogAddFormVisible = false
            },
            editClazzInfo() {
                this.$store.dispatch('clazz/update', this.currentRow).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        })
                    }
                    this.fetchClazzs()
                    this.dialogEditFormVisible = false
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

