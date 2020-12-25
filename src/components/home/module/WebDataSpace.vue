<template>
  <el-card shadow="never" class="card">
    <div slot="header" class="clearfix">
      <span>网站数据</span>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="16">
          <div id="myChart" style="width:100%;height:400px"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple" id="label_vist" style="width:100%;height:400px"></div>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import "echarts/theme/macarons.js";
export default {
  data() {
    return {};
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("myChart"),
        "macarons"
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "网站预约数据",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["预约次数", "访问人数"],
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "1月",
              "2月",
              "2月",
              "3月",
              "3月",
              "4月",
              "4月",
              "5月",
              "5月",
              "6月",
              "6月",
              "7月",
              "7月",
              "8月",
              "8月",
              "9月",
              "9月",
              "10月",
              "10月",
              "11月",
              "11月",
              "12月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "预约次数",
            type: "bar",
            data: [
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
              Math.ceil(Math.random() * 1000),
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "访问人数",
            type: "bar",
            data: [
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
              Math.ceil(Math.random() * 100),
            ],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 800, xAxis: 11, yAxis: 3 },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
        ],
      });
    },
    label_vist() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("label_vist"),
        "macarons"
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "座位签到",
          subtext: "admin",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["签到", "未签到"],
        },
        series: [
          {
            name: "用户类别",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
             
             
              { value: Math.ceil(Math.random() * 1000), name: "签到" },
              { value: Math.ceil(Math.random() * 1000), name: "未签到" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
  mounted() {
    this.drawLine();
    this.label_vist()
  },
};
</script>
<style scoped>
.card {
  min-height: 70vh;
}
.el-card{
  margin-top:10px;
}
</style>