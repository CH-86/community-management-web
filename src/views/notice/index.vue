<template>
  <div class="main-box">
    <el-table
      :data="newsList"
      style="width: 100%">
      <el-table-column
        label="编号"
        prop="newsId"
        align="center">
      </el-table-column>
      <el-table-column
        label="标题"
        prop="newsTitle"
        align="center">
      </el-table-column>
      <el-table-column
        label="图片"
        align="center">
        <template slot-scope="scope">
          <el-image :src="baseUrl + scope.row.newsImage">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        prop="newsContent"
        align="center">
      </el-table-column>
      <el-table-column
        label="单位"
        prop="communityName"
        align="center">
      </el-table-column>
      <el-table-column
        label="时间"
        align="center">
        <template slot-scope="scope">{{scope.row.newsCreateTime | formatDate}}</template>
      </el-table-column>
      <el-table-column
        align="center">
        <template slot-scope="scope">
          <el-tooltip :content="'主页是否显示: ' + approvalTag[scope.row.newsStatus]" placement="top">
            <el-switch
              v-model="scope.row.newsStatus"
              active-color="#13ce66"
              inactive-color="#c3ccc7"
              :active-value="1"
              :inactive-value="2"
            @change="approvalNewsStatus(scope.row)">
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
    import {formatDate} from '../../utils/date'

    export default {
        data() {
            return {
                newsList: [{
                    newsId: '',
                    newsTitle: '',
                    newsImage: '',
                    newsContent: '',
                    communityName: '',
                    newsCreateTime: '',
                    newsStatus: ''
                }],
                approvalTag: ['', '可见', '不可见'],
                pageNum: 1,
                pageSize: 10,
                /* 总记录条数*/
                total: 10,
                baseUrl: 'http://127.0.0.1:8888/community-management-service/'
            }
        },
        mounted() {
            this.fetchNews()
            this.findTotal()
        },
        filters: {
            /*时间过滤器*/
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
            }
        },
        methods: {
            /* 获取新闻总记录条数*/
            findTotal() {
                this.$store.dispatch('news/findTotal', 1).then((res) => {
                    this.total = res.data
                })
            },
            /* 每页显示多少条改变时间*/
            handleSizeChange(val) {
                this.pageNum = 1
                this.pageSize = val
                this.fetchNews()
            },
            /* 页码发生改变时间*/
            handleCurrentChange(val) {
                this.pageNum = val
                this.fetchNews()
            },
            fetchNews() {
                const params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    /*公告*/
                    newsType: 1,
                    order: 'desc'
                }
                this.$store.dispatch('news/findAll', params).then((res) => {
                    this.newsList = res.data
                })
            },
            handleDelete(index, row) {
                this.$confirm(`确认删除公告 编号：${row.newsId}: 标题：${row.newsTitle} 吗？`)
                    .then(_ => {
                        this.$store.dispatch('news/removeById', row.newsId).then((res) => {
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
                this.fetchNews()
            },
            /*公告审批*/
            approvalNewsStatus(row){
                let {newsId,newsStatus} = row
                let params = {
                    newsId: newsId,
                    newsStatus: newsStatus
                }
                this.$store.dispatch('news/approvalNews',params).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            message: '修改已提交',
                            type: 'success'
                        });
                    }
                })
            }
        },
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
