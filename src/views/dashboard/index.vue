<template>
  <div class="dashboard-container">
    <!--录播图部分-->
    <div class="banner">
      <template>
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="image in images" :key="image.id">
            <el-image
              :src="image.src"
              style="width: 100%; height: 100%"
            ></el-image>
            <h3 class="medium">{{ image.name }}</h3>
          </el-carousel-item>
        </el-carousel>
      </template>
    </div>

    <h3></h3>
    <el-tag style="font-size: 20px"> 社团风采 </el-tag>
    <div class="news">
      <el-row>
        <el-card class="box-card">
          <div v-for="news in newsList" :key="news.newsId" class="text item">
            <div @click="newsGoDetail(news)" style="font-size: 30px">
              <!--              <el-link type="primary">{{news.newsId}}、</el-link>-->
              <el-link>{{ news.newsTitle }} {{ news.communityName }}</el-link>
              <el-link type="danger">{{
                news.newsCreateTime | formatDate
              }}</el-link>
            </div>
          </div>
        </el-card>
        <el-tag style="font-size: 20px"> 公告 </el-tag>
        <el-card class="box-card">
          <div
            v-for="notice in noticeList"
            :key="notice.newsId"
            class="text item"
          >
            <div @click="newsGoDetail(notice)" style="font-size: 30px">
              <!--              <el-link type="primary">{{notice.newsId}}、</el-link>-->
              <el-link
                >{{ notice.newsTitle }} {{ notice.communityName }}</el-link
              >
              <el-link type="danger">{{
                notice.newsCreateTime | formatDate
              }}</el-link>
            </div>
          </div>
        </el-card>
      </el-row>
    </div>
    <el-tag style="font-size: 20px"> 活动 </el-tag>
    <activity-card
      :activityType="1"
      type="publish"
      flag="dashboard"
    ></activity-card>

    <el-tag style="font-size: 20px"> 统计 </el-tag>
    <div>
      <char></char>
    </div>

    <el-tag style="font-size: 20px"> 优秀社团评选 </el-tag>

    <div style="margin: 2%">
      <el-table :data="rankList" border style="width: 100%">
        <el-table-column fixed prop="rankId" label="排名" align="center">
        </el-table-column>
        <el-table-column prop="name" label="社团" align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../utils/date";
import localStorageUtil from "../../utils/localStorageUtil";
import ActivityCard from "../../layout/components/ActivityCard";
import Banner01 from "../../assets/banner/banner01.jpg";
import Banner02 from "../../assets/banner/banner02.jpg";
import Banner03 from "../../assets/banner/banner03.jpg";
import Banner04 from "../../assets/banner/banner04.jpg";
import Char from "../../layout/components/Chart";
export default {
  name: "Dashboard",
  components: {
    ActivityCard,
    Char,
  },
  data() {
    return {
      userName: localStorageUtil.read("SET_USER").userName,
      images: [
        {
          id: "1",
          name: "banner",
          src: Banner01,
        },
        {
          id: "2",
          name: "banner",
          src: Banner02,
        },
        {
          id: "3",
          name: "banner",
          src: Banner03,
        },
        {
          id: "4",
          name: "banner",
          src: Banner04,
        },
      ],
      newsList: [],
      noticeList: [],
      rankList: [],
    };
  },
  created() {
    this.fetchNews();
    this.fetchRankList();
  },
  mounted() {},
  filters: {
    /*时间过滤器*/
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日 hh:mm:ss");
    },
  },
  methods: {
    /*拉取社团排名信息*/
    fetchRankList() {
      this.$store.dispatch("statistics/ranking").then((res) => {
        if (res.code === 200) {
          this.rankList = res.data;
        }
      });
    },
    /*拉取新闻公告信息*/
    fetchNews() {
      this.$store.dispatch("news/findTotal", 0).then((res) => {
        let total = res.data;
        const newsParams = {
          pageNum: 1,
          pageSize: total,
          /*新闻*/
          newsType: 0,
          order: "desc",
          /*管理员审核通过的*/
          newsStatus: 1,
        };
        const noticeParams = {
          pageNum: 1,
          pageSize: total,
          /*公告*/
          newsType: 1,
          order: "desc",
          /*管理员审核通过的*/
          newsStatus: 1,
        };
        this.$store.dispatch("news/findAll", newsParams).then((res) => {
          this.newsList = res.data;
        });
        this.$store.dispatch("news/findAll", noticeParams).then((res) => {
          this.noticeList = res.data;
        });
      });
    },
    newsGoDetail(news) {
      this.$router.push({ path: "/detail/news", query: { news: news } });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  /*width: 480px;*/
  margin: 4%;
}
</style>
