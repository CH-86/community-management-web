<template>
  <div style="margin: 2%;">
    <!-- 柱状图 -->
    <div id="newsChart" style="width:100%; height:400px"></div>
    <div id="activityChart" style="width:100%;height:400px">></div>
    <div id="memberChart" style="width:100%; height:400px">></div>
  </div>

</template>

<script>
    export default {
        name: "Char",

        data(){
            return{
                chartNewsData:{
                    title:{
                        text:'社团风采'
                    },
                    tooltip:{},
                    legend:{
                        data:['']
                    },
                    xAxis:{
                        type: 'category',
                        axisLabel: {
                            interval: 0,    //强制文字产生间隔
                            rotate: 0,     //文字逆时针旋转45°
                            textStyle: {    //文字样式
                                color: "black",
                                fontSize: 16,
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                        data:[]
                    },
                    yAxis:{
                        type: 'value',
                    },
                    series:[{
                        name:'',
                        type:'bar', //设置图表主题
                        itemStyle: {
                            normal: {
                                color: '#46a5f5'
                            }
                        },
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        },
                        data:[]
                    }]
                },
                chartActivityData:{
                    title:{
                        text:'活动'
                    },
                    tooltip:{},
                    legend:{
                        data:['']
                    },
                    xAxis:{
                        type: 'category',
                        axisLabel: {
                            interval: 0,    //强制文字产生间隔
                            rotate: 0,     //文字逆时针旋转45°
                            textStyle: {    //文字样式
                                color: "black",
                                fontSize: 16,
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                        data:[]
                    },
                    yAxis:{
                        type: 'value',
                        data: []
                    },
                    series:[{
                        name:'',
                        type:'bar', //设置图表主题
                        itemStyle: {
                            normal: {
                                color: '#417505'
                            }
                        },
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        },
                        data:[]
                    }]
                },
                chartMemberData:{
                    title:{
                        text:'社团人员'
                    },
                    tooltip:{},
                    legend:{
                        data:['']
                    },
                    xAxis:{
                        type: 'category',
                        axisLabel: {
                            interval: 0,    //强制文字产生间隔
                            rotate: 0,     //文字逆时针旋转45°
                            textStyle: {    //文字样式
                                color: "black",
                                fontSize: 16,
                                fontFamily: 'Microsoft YaHei'
                            }
                        },
                        data:[]
                    },
                    yAxis:{
                        type: 'value',
                        data: []
                    },
                    series:[{
                        name:'',
                        type:'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        },
                        data:[]
                    }]
                },
            }
        },
        mounted() {
            this.fetchStatisticsData();

        },
        methods: {
            fetchStatisticsData(){
                this.$store.dispatch('statistics/newsStatistics').then((res) => {
                    if (res.code === 200){
                        this.chartNewsData.xAxis.data = res.data.name
                        this.chartNewsData.series[0].data = res.data.value
                        this.$store.dispatch('statistics/activitiesStatistics').then((res) => {
                            if (res.code === 200){
                                this.chartActivityData.xAxis.data = res.data.name
                                this.chartActivityData.series[0].data = res.data.value
                                this.$store.dispatch('statistics/membersStatistics').then((res) => {
                                    if (res.code === 200){
                                        this.chartMemberData.xAxis.data = res.data.name
                                        this.chartMemberData.series[0].data = res.data.value
                                        this.drawLine()
                                    }
                                })

                            }
                        })
                    }
                })

            },
            drawLine: function () {
                //基于准本好的DOM，初始化echarts实例
                let newsChart = this.$echarts.init(document.getElementById("newsChart"));
                let activityChart = this.$echarts.init(document.getElementById("activityChart"));
                let memberChart = this.$echarts.init(document.getElementById("memberChart"));
                //绘制图表
                newsChart.setOption(this.chartNewsData);
                activityChart.setOption(this.chartActivityData);
                memberChart.setOption(this.chartMemberData);
            }
        }
    }
</script>

<style scoped>

</style>
