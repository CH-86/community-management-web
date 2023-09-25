<template>
  <div class="main-box">
    <el-table
      :data="activityList"
      border
      style="width: 100%">
      <el-table-column
        fixed prop="activityId" label="编号" align="center" width="60">
      </el-table-column>
      <el-table-column prop="activityName" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="activityAddress" label="地址" align="center"></el-table-column>
      <el-table-column prop="activitySponser" label="举办方" align="center"></el-table-column>
      <el-table-column prop="activityDescription" label="描述信息" align="center" width="260"></el-table-column>
      <el-table-column prop="communityName" label="所属社团" align="center"></el-table-column>
      <el-table-column label="开始时间" align="center" width="200">
        <template slot-scope="scope">{{scope.row.activityStartTime | formatDate}}</template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" width="200">
        <template slot-scope="scope">{{scope.row.activityEndTime | formatDate}}</template>
      </el-table-column>
      <el-table-column prop="activityStatus" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="typeTag[scope.row.activityStatus]" effect="dark">{{approvalTag[scope.row.activityStatus]}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="activityStatus" label="活动类型" align="center">
        <template slot-scope="scope">
          <el-tag :type="tagStyle[scope.row.activityType]" effect="dark">{{activityTag[scope.row.activityType]}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center" label="操作">
        <template slot-scope="scope">
          <el-tooltip :content="'审核结果: ' + approvalTag[scope.row.activityStatus]" placement="top">
            <el-switch
              v-model="scope.row.activityStatus"
              active-color="#13ce66"
              inactive-color="#c3ccc7"
              :active-value="1"
              :inactive-value="2"
              @change="approvalActivityStatus(scope.row)">
            </el-switch>
          </el-tooltip>
          <el-button
            size="mini"
            type="danger"
            style="margin-left: 10%;"
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
  </div>
</template>

<script>
    import localStorageUtil from "../../../utils/localStorageUtil";
    import {formatDate} from '../../../utils/date'
    export default {
        methods: {
            approvalActivityStatus(row) {
                let {activityId,activityStatus} = row;
                let data = {
                    activityId: activityId,
                    activityStatus: activityStatus
                }
                this.$store.dispatch('activity/approval',data).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '修改已提交',
                            type: 'success'
                        });
                    }
                })
            },
            fetchActivities() {
                let params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                };
                this.$store.dispatch('activity/findAllByPaging', params).then((res) => {
                    this.activityList = res.data
                })
            },
            handleDelete(index, row) {
                this.$confirm(`确认删除：${row.activityName}活动吗？`)
                    .then(_ => {
                        this.$store.dispatch('activity/removeById', row.activityId).then((res) => {
                            if (res.code === 200) {
                                this.$message({
                                    showClose: true,
                                    message: '删除成功',
                                    type: 'success'
                                })
                            }
                            this.fetchActivities()
                        })
                    })
                    .catch(_ => {
                        this.$message({
                            showClose: true,
                            message: '已经取消'
                        })
                    });
            },
            /* 获取总记录条数*/
            fetchTotal() {
                this.$store.dispatch('activity/findTotal').then((res) => {
                    this.total = res.data
                })
            },
            /* 每页显示多少条改变时间*/
            handleSizeChange(val) {
                this.pageNum = 1;
                this.pageSize = val;
                this.fetchActivities()
            },
            /* 页码发生改变时间*/
            handleCurrentChange(val) {
                this.pageNum = val
                this.fetchActivities()
            },
        },
        created() {
            this.fetchActivities()
            this.fetchTotal()
        },
        filters: {
            /*时间过滤器*/
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
            }
        },
        data() {
            return {
                activityList: [
                    {
                        activityId: '',
                        activityName: '',
                        activityType: '',
                        activityStartTime: '',
                        activityEndTime: '',
                        activityAddress: '',
                        activitySponser: '',
                        activityDescription: '',
                        communityName: '',
                        activityStatus: ''
                    }
                ],
                genderList: ['男', '女'],
                approvalTag: ['审核中', '通过审核', '未通过审核', '活动已经结束'],
                activityTag: ['普通活动', '招新活动'],
                typeTag: ['', 'success', 'info'],
                pageNum: 1,
                pageSize: 5,
                total: 5,
                tagStyle: ['success','danger']
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

</style>
