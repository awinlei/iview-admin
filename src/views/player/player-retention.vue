
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
                    留存率
                </p>
                <div class="line-chart-con">
                    <retention-player-requests :tabs="retentionPlayerRequestsTabs"></retention-player-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    留存用户分析
                </p>
                <div class="line-chart-con">
                    <retention-analysis-requests :parent-params="retentionAnalysisRequests"></retention-analysis-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
// 多页签图表
import retentionPlayerRequests from "../my-components/echart-show/multiTabsChart.vue";
// 单页签图表
import retentionAnalysisRequests from "../my-components/echart-show/histogramChart.vue";

export default {
  name: "playerActive",
  components: {
    retentionPlayerRequests,
    retentionAnalysisRequests
  },
  data() {
    return {
      // 新增玩家图表
      retentionPlayerRequestsTabs: {
        requestId: "active_player_request", //图表ID,ajax查询
        tabList: ["新增账户留存", "激活设备留存"], //图表tabs列表 和 linesList对应
        linesList: [["次日留存率", "7日留存率", "30日留存率"], ["次日留存率", "7日留存率", "30日留存率"]], //图表分类->曲线列表
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
      retentionAnalysisRequests: {
        requestId: "small_account_request", //图表ID,ajax查询
        linesList: ["Day1 留存用户", "Day7 留存用户", "Day30 留存用户"], //图表分类->曲线列表
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
  mounted() {
    console.log("start..........");
    console.log("end..........");
  },
  computed: {},
  methods: {}
};
</script>
