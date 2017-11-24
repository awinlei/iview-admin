<template>
  <div style="width:100%;height:100%;" id="online_request_con"></div>
</template>

<script>
const echarts = require("echarts");
require("@/libs/echarts/macarons");
export default {
  name: "onlineRequests",
  mounted() {
    const option = {
      // title: {
      //   text: "ACU & PCU",
      //   left: "center"
      // },
      color: ["rgba(109, 197, 253, 0.5)", "rgba(114, 203, 104, 0.9)"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {
        data: ["ACU", "PCU"]
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
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
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "ACU",
          type: "line",
          stack: "总量",
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: [520, 532, 601, 534, 790, 830, 310]
        },
        {
          name: "PCU",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: [820, 645, 546, 745, 872, 624, 258],
          markPoint: {
            data: [{ type: "max", name: "最大值" }, { type: "min", name: "最小值" }]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          }
        }
      ]
    };

    const serviceRequestCharts = echarts.init(
      document.getElementById("online_request_con"),
      "macarons"
    );
    // 3.0版本里的加载图示
    serviceRequestCharts.showLoading({
      text: this.$t("loadingDataText"),
      effect: "default", //'spin' | 'bar' | 'ring' | 'whirling' | 'dynamicLine' | 'bubble',
      maskColor: "#E0E0E0",
      color: "#c23531",
      textColor: "#000"
    });
    let loadingTicket = 0;
    clearTimeout(loadingTicket);
    loadingTicket = setTimeout(function() {
      serviceRequestCharts.hideLoading();
      serviceRequestCharts.setOption(option);

      window.addEventListener("resize", function() {
        serviceRequestCharts.resize();
      });
    }, 2000);
  }
};
</script>