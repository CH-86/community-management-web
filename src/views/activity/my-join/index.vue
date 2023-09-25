<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-guide"></i> 招新</span>
        <activity-card :activityType="1" type="join" flag="view"></activity-card>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-news"></i> 其他活动</span>
        <activity-card :activityType="0" type="join" flag="view"></activity-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ActivityCard from "../../../layout/components/ActivityCard";
    export default {
        name: "index",
        components: {
            ActivityCard
        }
    }
</script>

<style scoped>

</style>
