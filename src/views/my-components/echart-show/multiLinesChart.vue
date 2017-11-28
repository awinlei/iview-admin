<style lang="less">
@import "./charts.less";
@import "../../../styles/common.less";
</style>

<template>
    <div class="echart_tab_style">
      <!-- <span>父组件的参数{{tabList}}</span> -->
      <!-- <span>渲染出动态的tabs {{requestId}}</span> -->
        <Tabs type="card" :animated="true" @on-click="handleTabChange">
            <TabPane v-for="(tab,index) in tabs.tabList" :key="tab" :label="tab"><div style="width:100%;height:100%;" v-bind:id="tabs.requestId + index"></div></TabPane>
        </Tabs>
    </div>
</template>
 
<script>
const echarts = require("echarts");
require("@/libs/echarts/macarons");
import util from "@/libs/util";

export default {
  name: "tabsChart",
  data() {
    return {
      tabList: [], //页签列表
      optionColor: [], //颜色列表
      requestId: "", //图表名称
      tabId: 0, //默认的页签选择
      queryParams: {
        requestId: "getDataRequest", //api查询接口制定
        requestType: 0, //api查询接口参数制定
        gameId: localStorage.gameId //游戏的ID
      },
      chartObj: null, //chart对象
      optionLenged: [], //单页面显示的线条数量
      optionXAxis: [], //x轴分类
      optionyAxis: "value", //Y轴值
      optionData: {}, //数据
      optionDataFormat: {
        //单项数据格式化
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
      }
    };
  },
  props: ["tabs"], // 父组件传递过来的参数
  methods: {
    // 初始化数据
    init() {
      this.tabList = this.tabs.tabList;
      this.requestId = this.tabs.requestId;
      this.optionLenged = this.tabs.linesList[this.tabId]; //曲线的数据分类
      this.optionColor = this.tabs.linesColor;
      this.optionXAxis = this.tabs.xaxis; //x轴数据
      this.optionYAxis = this.tabs.yaxis; //y轴数据
      this.mockChartData();
    },
    // 分页数据(ajax异步获取，一次性获取完毕)
    mockChartData() {
      let ajaxData = [];
      // 格式化数据项
      let optionInit = new Array();
      for (let index = 0; index < this.optionLenged.length; index++) {
        // 获取数值[可从ajax获取]
        // 这里重新定义对象数组 optionInitdata，目的是防止js中的数组循环覆盖，导致最后所有的值都被最后一个值覆盖问题
        let optionInitdata = Array();
        for (let i = 0; i < this.optionXAxis.length; i++) {
          let element = Math.floor(
            Math.random() * 10000 + Math.random() * 1000
          );
          optionInitdata.push(element);
        }
        // 数据格式定义
        // 这里重新定义对象数组 optionInitTmp，目的是防止js中的数组循环覆盖，导致最后所有的值都被最后一个值覆盖问题
        let optionInitTmp = {
          name: this.optionLenged[index],
          name: this.optionLenged[index],
          type: this.optionDataFormat.type,
          stack: this.optionDataFormat.stack,
          itemStyle: this.optionDataFormat.itemStyle,
          data: optionInitdata,
          markPoint: this.optionDataFormat.markPoint,
          markLine: this.optionDataFormat.markLine
        };
        optionInit.push(optionInitTmp);
      }
      this.optionData = optionInit;

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
      // 显示图表
      this.showChart();
    },
    // 图表展示
    showChart() {
      // 图表选项
      const option = {
        color: this.optionColor, // 颜色列表
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

      let chartId = this.requestId + this.tabId;
      // 设定图表的样式主题
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
      // 设置超时，这里可以在ajax中做好效果
      setTimeout(() => {
        this.chartObj.hideLoading();
        this.chartObj.setOption(option);
        this.chartObj.resize();
      }, 2000);
    },
    // 处理tab切换
    handleTabChange(name) {
      this.tabId = name;
      this.optionLenged = this.tabs.linesList[this.tabId];
      // 组装参数
      this.queryParams.requestId = this.requestId;
      this.queryParams.requestType = this.tabId;
      // 获取数据并渲染
      this.mockChartData();
    }
  },
  mounted() {
    console.log("multiTabs start");
    console.log(this.tabs); // 组件之间传递数据 命名方式，数据绑定都要注意
    console.log("multiTabs end");
    //初始化
    this.init();
  }
};
</script>