<style>

</style>
<template>
    <div class="echart_tab_style">
<!-- <span>{{dateRange}}</span> -->
        <Tabs type="card" :animated="true" @on-click="handleTabChange">
            <TabPane label="新增激活和账户" v-if="tab0"><div style="width:100%;height:100%;" id="key_request_con"></div></TabPane>
            <TabPane label="活跃玩家" v-if="tab1"><div style="width:100%;height:100%;" id="key_request_con1"></div></TabPane>
            <TabPane label="付费玩家" v-if="tab2"><div style="width:100%;height:100%;" id="key_request_con2"></div></TabPane>
            <TabPane label="收入" v-if="tab3"><div style="width:100%;height:100%;" id="key_request_con3"></div></TabPane>
        </Tabs>
    </div>
</template>

<script>
const echarts = require("echarts");
require("@/libs/echarts/macarons");
import util from "@/libs/util";

export default {
  name: "keyRequests",
  data() {
    return {
      tab0: true,
      tab1: true,
      tab2: true,
      tab3: true,
      tabId: 0,
      queryParams: {
        cmdId: "getKeyRequest", //获取关键数据指标
        keyType: 0, //获取指标类型
        gameId: localStorage.gameId
      },
      chartObj: null,
      optionLenged: [
        this.$t("activeDriverNumText"),
        this.$t("activePlayerNumText")
      ],
      optionXAxis: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      optionyAxis: "value",
      optionData: [
        {
          name: "",
          type: "line",
          stack: "总量",
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: [],
          markPoint: {
            data: [{ type: "max", name: "最大值" }, { type: "min", name: "最小值" }]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          }
        },
        {
          name: "",
          type: "line",
          stack: "总量",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: [],
          markPoint: {
            data: [{ type: "max", name: "最大值" }, { type: "min", name: "最小值" }]
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }]
          }
        }
      ]
    };
  },
  props: ["dateRange"],
  methods: {
    // 初始化数据
    init() {
      this.mockChartData();
    },
    // 分页数据(ajax异步获取，一次性获取完毕)
    mockChartData() {
      let ajaxData = [];
      //   this.optionData[0].data = [520, 532, 601, 534, 790, 830, 310];
      for (let index = 0; index < 7; index++) {
        let element = Math.floor(Math.random() * 1000 + Math.random() * 10);

        this.optionData[0].data.push(element);
      }
      for (let index = 0; index < this.optionLenged.length; index++) {
        this.optionData[index].name = this.optionLenged[index];
      }

      this.optionData[1].data = [820, 645, 546, 745, 872, 624, 258];
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
        color: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ],
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
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.optionXAxis //x轴
          }
        ],
        yAxis: [
          {
            type: this.optionyAxis //y轴
          }
        ],
        series: this.optionData //核心数据
      };

      let chartId = "key_request_con";
      if (this.tabId > 0) {
        chartId = "key_request_con" + this.tabId;
      }
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
    },
    // 处理tab切换
    handleTabChange(name) {
      let chartId = "key_request_con";
      if (name > 0) {
        this.tabId = name;
      }
      switch (this.tabId) {
        case 0:
          this.optionLenged = [
            this.$t("oldPlayerText"),
            this.$t("newPlayerText")
          ];
          break;
        case 1:
          this.optionLenged = [
            this.$t("oldPlayerText"),
            this.$t("newPlayerText")
          ];
          break;
        case 2:
          this.optionLenged = [
            this.$t("oldChargePlayerText"),
            this.$t("newChargePlayerText")
          ];
          break;
        case 3:
          this.optionLenged = [
            this.$t("oldMoneyPlayerText"),
            this.$t("newMoneyPlayerText")
          ];
          break;

        default:
          break;
      }
      console.log(this.optionLenged);
      this.queryParams.keyType = this.tabId;
      this.mockChartData();
    }
  },
  mounted() {
    console.log('keyRequests start');
    console.log(this.dateRange); // 组件之间传递数据 命名方式，数据绑定都要注意
    console.log('keyRequests end');
    //初始化
    this.init();

    console.log(this.optionLenged);
  }
};
</script>