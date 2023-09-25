<template>
  <div style="margin: 4%;">
    <p align="center"><span class="title-one">{{ activity.activityName}}</span></p>
    <table align="center">
      <tr>
        <td><span class="title-two">{{activity.communityName}}</span></td>
      </tr>
    </table>
    <hr/>
    <h4>一、社团简介</h4>
    <p>
      {{activity.communityDiscription}}
    </p>

    <h4>二、活动简介</h4>
    <p>
      {{activity.activityDescription}}
    </p>

    <h4>三、地址</h4>
    <p>
      {{activity.activityAddress}}
    </p>

    <p align="right">
      {{activity.activityStartTime | formatDate}} -  {{activity.activityEndTime | formatDate}}
    </p>

    <el-button v-if="flag !== 'view'" style="margin: 0 60%" type="primary" @click="join">点击报名</el-button>

  </div>
</template>

<script>
    import {formatDate} from '../../../../utils/date'
    import localStorageUtil from "../../../../utils/localStorageUtil";
    export default {
        name: "detail",
        data(){
            return{
                activity: this.$route.query.activity,
                flag: this.$route.query.flag,
                currentUser: localStorageUtil.read('SET_USER')
            }
        },
        filters: {
            /*时间过滤器*/
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
            }
        },
        methods:{
            join(){
                this.$alert(this.currentUser.userName + '确认报名参加吗？', this.activity.activityName, {
                    confirmButtonText: '确定',
                    callback: action => {
                        if (action === 'cancel') {
                            this.$message({
                                type: 'info',
                                message: `已取消`
                            });
                        }else {

                            if (this.activity.activityType === 0) {
                                // 其他活动
                                this.joinActivity()
                            }else if (this.activity.activityType === 1){
                                // 招新
                                this.joinCommunity()
                            }


                        }

                    }
                });
            },
            /*报名参加普通活动*/
            joinActivity(){
                let data = {
                    userId: this.currentUser.userId,
                    activityId: this.activity.activityId,
                    /*报名参加活动不需要审核，直接参加*/
                    status: 3
                };
                this.$store.dispatch('activity/joinActivity',data).then((res) => {
                    if (res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: `报名成功`
                        });
                    }else {
                        this.$message({
                            type: 'info',
                            message: `您已经报名`
                        });
                    }
                })
            },
            joinCommunity(){
                console.log(this.activity)
                let data = {
                    userId: this.currentUser.userId,
                    communityId: this.activity.communityId,
                    /*报名参加活动不需要审核，直接参加*/
                    status: 0
                };
                this.$store.dispatch('community/joinCommunity',data).then((res) => {
                    if (res.code === 200){
                        this.$message({
                            type: 'success',
                            message: `报名成功,等待管理员审核`
                        });
                    }else {
                        this.$message({
                            type: 'info',
                            message: `您已经报名`
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
  .title-one {
    font-size: 18px;
    font-style: normal;
    line-height: 40px;
    font-weight: bolder;
    font-variant: normal;
    color: #000;
    text-align: center;
  }

  .title-two {
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    color: #CCC;
  }

  p {
    text-indent: 2em;
  }
</style>
