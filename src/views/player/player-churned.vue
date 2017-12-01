
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
                    每日流失
                </p>
                <div class="line-chart-con">
                    <churned-player-requests :parent-params="churnedPlayerRequests"></churned-player-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    流失用户分析
                </p>
                <div class="line-chart-con">
                    <churned-analysis-requests :parent-params="churnedAnalysisRequests"></churned-analysis-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
// 多页签图表
import churnedPlayerRequests from "../my-components/echart-show/multiTabsChart.vue";
// 单页签图表
import churnedAnalysisRequests from "../my-components/echart-show/histogramChart.vue";

export default {
  name: "playerActive",
  components: {
    churnedPlayerRequests,
    churnedAnalysisRequests
  },
  data() {
    return {
      // 新增玩家图表
      churnedPlayerRequests: {
        requestId: "churnedPlayerRequests", //图表ID,ajax查询
        tabList: ["每日流失", "每月流失"], //图表tabs列表 和 linesList对应
        linesList: [
          ["连续7日不登陆", "连续14日不登陆", "连续30日不登陆"],
          ["连续7日不登陆", "连续14日不登陆", "连续30日不登陆"]
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
      //单设备账户数量分析（小号分析）
      churnedAnalysisRequests: {
        requestId: "churnedAnalysisRequests", //图表ID,ajax查询
        linesList: ["流失等级", "付费金额", "付费次数"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = [];
          for (let i = 1; i <= 10; i++) {
            list.push(i);
          }
          return list;
        })(),
        xaxis: "value" //x轴
      }
    };
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>
