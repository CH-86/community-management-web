<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="community in communities" :key="community.communityId">
        <div style="margin: 4% 4%;">
          <el-card shadow="hover" :body-style="{ padding: '0px', margin: '8%'}" style="height: 800px">
            <p>{{community.communityName}}</p>
            <img :src="baseUrl + community.communityLogo" class="image" style="width: 100%;height: 300px;">
            <div style="padding: 4%;margin: 2%;">
              <div>{{community.communityDiscription}}</div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                baseUrl: 'http://127.0.0.1:8888/community-management-service/',
                communities: [],
            }
        },
        created() {
            this.fetchCommunities()
        },
        methods:{
            fetchCommunities(){
                this.$store.dispatch('community/findAll').then((res) => {
                    if (res.code === 200){
                        this.communities = res.data
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
