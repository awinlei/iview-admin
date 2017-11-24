<template>
    <div style="width:100%;height:100%;" id="gender_request_con"></div>
</template>

<script>
const echarts = require("echarts");
require("@/libs/echarts/macarons");
import util from "@/libs/util";

export default {
  name: "genderRequests",
  data() {
    return {
      queryParams: {
        cmdId: "getGenderRequest", //获取关键数据指标
        gameId: localStorage.gameId
      },
      chartObj: null,
      optionLenged: ["男", "女"],
      optionData: [
        {
          name: "访问来源",
          type: "pie",
          radius: "66%",
          data: [
            {
              value: 2103456,
              name: "ios",
              itemStyle: { normal: { color: "#9bd598" } }
            },
            {
              value: 1305923,
              name: "android",
              itemStyle: { normal: { color: "#ffd58f" } }
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  },
  methods: {
    // 初始化数据
    init() {
      this.mockChartData();
    },
    // 分页数据(ajax异步获取，一次性获取完毕)
    mockChartData() {
      let ajaxData = [];
      console.log(this.optionData.data);
      // for (let index = 0; index < 2; index++) {
      //   let element = Math.floor(Math.random() * 1000 + Math.random() * 10);
      //   this.optionData[0].data.push(element);
      // }
      for (let index = 0; index < this.optionLenged.length; index++) {
        this.optionData[0].data[index].name = this.optionLenged[index];
      }
      // //异步获取数据
      //   util
      //     .ajaxPost("", params)
      //     .then(
      //       function(response) {
      //         // 遍历结果数据
      //         if (response.data.data.length > 0) {
      //           response.data.data.forEach(function(item) {
      //             ajaxData.push({
      //               name: item.name + Math.floor(Math.random() * 7 + 1),
      //               site: item.site,
      //               api_url: item.api_url,
      //               status: Math.floor(Math.random() * 3 + 1),
      //               portrayal: [
      //                 "City",
      //                 "People",
      //                 "Cost",
      //                 "Life",
      //                 "Entertainment"
      //               ],
      //               people: [{}],
      //               time: Math.floor(Math.random() * 7 + 1),
      //               update: new Date()
      //             });
      //           });
      //         }
      //         // 赋值给当前的表格
      //         this.optionData = ajaxData;
      //       }.bind(this)
      //     )
      //     .catch(function(error) {
      //       console.log(error);
      //     });
      this.showChart();
    },
    // 图表展示
    showChart() {
      const option = {
        color: ["rgba(109, 197, 253, 0.5)", "rgba(204, 204, 204, 0.9)"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          data: this.optionLenged //标注
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar", "stack", "tiled"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        grid: {
          left: "1.2%",
          right: "1%",
          bottom: "3%",
          containLabel: true
        },
        series: this.optionData //核心数据
      };

      let chartId = "gender_request_con";

      this.chartObj = echarts.init(
        document.getElementById(chartId),
        "macarons"
      );
      // 3.0版本里的加载图示
      this.chartObj.showLoading({
        text: this.$t("loadingDataText"),
        effect: "default", //'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble',
        maskColor: "#E0E0E0",
        color: "#c23531",
        textColor: "#000"
      });

      setTimeout(() => {
        this.chartObj.hideLoading();
        this.chartObj.setOption(option);
        this.chartObj.resize();
      }, 2000);
    }
  },
  mounted() {
    //初始化
    this.init();

    console.log(this.optionLenged);
  }
};
</script>