
<style lang="less">
@import "./player.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    平均游戏时长与次数
                </p>
                <div class="line-chart-con">
                    <avg-time-requests :parent-params="avgTimeRequests"></avg-time-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    游戏频次
                </p>
                <div class="line-chart-con">
                    <play-frequency-requests :parent-params="playFrequencyRequests"></play-frequency-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    游戏时长
                </p>
                <div class="line-chart-con">
                    <play-time-requests :parent-params="playTimeRequests"></play-time-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    游戏时段
                </p>
                <div class="line-chart-con">
                    <play-times-distribute-requests :parent-params="playTimesDistributeRequests"></play-times-distribute-requests>
                </div>
            </Card>
        </Row>
        
    </div>
</template>

<script>
// 多页签图表
import avgTimeRequests from "../my-components/echart-show/multiTabsChart.vue";
import playFrequencyRequests from "../my-components/echart-show/multiTabsChart.vue";
import playTimeRequests from "../my-components/echart-show/multiTabsChart.vue";
import playTimesDistributeRequests from "../my-components/echart-show/multiLinesChart.vue";
// 单页签图表
// import smallAccountRequests from "../my-components/echart-show/histogramChart.vue";
// import accountTypeRequests from "../my-components/echart-show/histogramChart.vue";
// import areaRequests from "../my-components/echart-show/histogramChart.vue";
// import operatorChannelRequests from "../my-components/echart-show/histogramChart.vue";
// import ageRequests from "../my-components/echart-show/histogramChart.vue";
// // 饼状图图表
// import genderRequests from "../my-components/echart-show/pieChart.vue";

export default {
  name: "playerActive",
  components: {
    avgTimeRequests,
    playFrequencyRequests,
    playTimeRequests,
    playTimesDistributeRequests
    // smallAccountRequests,
    // areaRequests,
    // ageRequests,
    // operatorChannelRequests,
    // accountTypeRequests,
    // genderRequests
  },
  data() {
    return {
      // 新增玩家图表
      avgTimeRequests: {
        requestId: "avgTimeRequests", //图表ID,ajax查询
        tabList: ["每日", "每周", "每月"], //图表tabs列表 和 linesList对应
        linesList: [["次数", "时长"], ["次数", "时长"], ["次数", "时长"]], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        xaxis: (function() {
          //x轴
          let list = [];
          for (let i = 1; i <= 7; i++) {
            list.push("2017-11-" + i);
          }
          return list;
        })(),
        yaxis: "value" //y轴
      },
      playFrequencyRequests: {
        requestId: "playFrequencyRequests", //图表ID,ajax查询
        tabList: ["月游戏天数", "周游戏天数", "周游戏次数", "日游戏次数"], //图表tabs列表 和 linesList对应
        linesList: [
          ["新玩家", "老玩家"],
          ["新玩家", "老玩家"],
          ["新玩家", "老玩家"],
          ["新玩家", "老玩家"]
        ], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        xaxis: (function() {
          //x轴
          let list = [];
          for (let i = 1; i <= 7; i++) {
            list.push("2017-11-" + i);
          }
          return list;
        })(),
        yaxis: "value" //y轴
      },
      playTimeRequests: {
        requestId: "playTimeRequests", //图表ID,ajax查询
        tabList: ["周游戏时长", "单日游戏时长", "单次游戏时长"], //图表tabs列表 和 linesList对应
        linesList: [["新玩家", "老玩家"], ["新玩家", "老玩家"], ["新玩家", "老玩家"]], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        xaxis: (function() {
          //x轴
          let list = [];
          for (let i = 1; i <= 7; i++) {
            list.push("2017-11-" + i);
          }
          return list;
        })(),
        yaxis: "value" //y轴
      },
      playTimesDistributeRequests: {
        requestId: "playTimesDistributeRequests", //图表ID,ajax查询
        linesList: ["新玩家", "老玩家"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        xaxis: (function() {
          //x轴
          let list = [];
          for (let i = 1; i <= 7; i++) {
            list.push("2017-11-" + i);
          }
          return list;
        })(),
        yaxis: "value" //y轴
      }
    };
  },
  mounted() {
    console.log("start..........");
    console.log("end..........");
  },
  computed: {},
  methods: {}
};
</script>
