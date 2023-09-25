<template>
  <div>
    <el-row>
      <el-col
        :key="activity.activityId"
        :span="8"
        v-for="activity in activities"
      >
        <div style="margin: 4% 4%">
          <el-card
            shadow="hover"
            :body-style="{ padding: '0px', margin: '8%' }"
            style="height: 600px"
          >
            <p class="card-title-one">{{ activity.activityName }}</p>
            <p class="card-title-two">---{{ activity.communityName }}</p>
            <img
              :src="baseUrl + activity.activityImage"
              class="image"
              style="width: 100%; height: 300px"
            >
            <div style="padding: 4%">
              <div class="ellipsis">{{ activity.activityDescription }}</div>
              <div class="bottom clearfix">
                <time class="time">{{ activity.activityStartTime }}</time>

                <el-button type="text" class="button" @click="more(activity)">
                  更多
                  <i class="el-icon-arrow-right"></i>
                  <i class="el-icon-arrow-right"></i>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import localStorageUtil from "../../utils/localStorageUtil";

export default {
  name: "ActivityCard",
  data() {
    return {
      baseUrl: "http://127.0.0.1:8888/community-management-service/",
      activities: [],
    };
  },
  props: {
    activityType: Number,
    type: String,
    flag: String,
  },
  created() {
    this.fetchFindActivitiesByUser();
    this.fetchActivities();
  },
  methods: {
    /*更多信息*/
    more(activity) {
      this.$router.push({
        path: "/detail/activity",
        query: { activity: activity, flag: this.flag },
      });
    },
    fetchFindActivitiesByUser: function () {
      let { userId, userType, userCommunityId } =
        localStorageUtil.read("SET_USER");
      let params = {
        userId: userId,
        userType: userType,
        userCommunityId: userCommunityId,
        activityType: this.activityType,
      };
      this.$store
        .dispatch("activity/findActivitiesByUser", params)
        .then((res) => {
          if (res.code === 200) {
            let { userType } = localStorageUtil.read("SET_USER");
            if (userType === 1) {
              if (this.type === "publish") {
                this.activities = res.data.adminPublish;
              } else {
                debugger;
                this.activities = res.data.adminJoin;
              }
            } else {
              this.activities = res.data.commonJoin;
            }
          }
        });
    },
    fetchActivities() {
      this.$store.dispatch("activity/findTotal").then((res) => {
        let total = res.data;

        let params = {
          pageNum: 1,
          pageSize: total,
          /*管理员审核通过的*/
          activityStatus: 1,
        };
        this.$store.dispatch("activity/findAllByPaging", params).then((res) => {
          if (this.flag === "dashboard") {
            this.activities = res.data;
          }
        });
      });
    },
  },
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-bottom: 0;
  margin-top: 6%;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card-title-one {
  font-size: 20px;
  font-family: 微软雅黑;
  text-align: center;
  font-weight: bold;
}

.card-title-two {
  font-size: 16px;
  font-family: 微软雅黑;
  text-align: right;
  font-weight: bold;
}

.ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
