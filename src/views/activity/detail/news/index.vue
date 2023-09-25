<template>
  <div style="margin: 4%;">
    <p align="center"><span class="title-one">{{ news.newsTitle}}</span></p>
    <table align="center">
      <tr>
        <td><span class="title-two">{{news.communityName}}</span></td>
      </tr>
    </table>
    <hr/>
    <el-image :src="baseUrl + news.newsImage" style="margin-left: 30%"></el-image>
    <p>
      {{news.newsContent}}
    </p>

    <p align="right">
      {{news.newsCreateTime | formatDate}}
    </p>


  </div>
</template>

<script>
    import {formatDate} from '../../../../utils/date'
    export default {
        name: "detail",
        data(){
            return{
                news: this.$route.query.news,
                baseUrl: 'http://127.0.0.1:8888/community-management-service/',
            }
        },
        filters: {
            /*时间过滤器*/
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
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
