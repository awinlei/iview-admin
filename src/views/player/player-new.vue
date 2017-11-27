
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
                    新增玩家
                </p>
                <div class="line-chart-con">
                    <new-player-requests :tabs="newPlayerRequestsTabs"></new-player-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        单设备账户数量分析（小号分析）
                    </p>
                    <div class="line-chart-con">
                        <small-account-requests></small-account-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class="padding-left-5">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        玩家账户类型
                    </p>
                    <div class="line-chart-con">
                        <account-type-requests></account-type-requests>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        地区
                    </p>
                    <div class="line-chart-con">
                        <area-requests></area-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class="padding-left-5">
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        渠道
                    </p>
                    <div class="line-chart-con">
                        <operator-channel-requests></operator-channel-requests>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        性別
                    </p>
                    <div class="line-chart-con">
                        <gender-requests></gender-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class='padding-left-5'>
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        年齡
                    </p>
                    <div class="line-chart-con">
                        <age-requests></age-requests>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import newPlayerRequests from "../my-components/echart-show/multiTabsChart.vue";
import smallAccountRequests from "./components/smallAccountRequests.vue";
import genderRequests from "./components/genderRequests.vue";
import ageRequests from "./components/ageRequests.vue";
import areaRequests from "./components/areaRequests.vue";
import operatorChannelRequests from "./components/operatorChannelRequests.vue";
import accountTypeRequests from "./components/accountTypeRequests.vue";

export default {
  name: "playerNew",
  components: {
    newPlayerRequests,
    areaRequests,
    ageRequests,
    operatorChannelRequests,
    accountTypeRequests,
    genderRequests,
    smallAccountRequests
  },
  data() {
    return {
        // 新增玩家图表
      newPlayerRequestsTabs: {
        cardId: "new_player_request", //图表ID
        tabList: ["新增激活和账户", "玩家转化", "新用户转化", "老用户转化"], //图表tabs列表 和 linesList对应
        linesList: [
          [this.$t("retentionYesterday"),this.$t("retentionWeek"),this.$t("retentionMonth")],
          ["测试曲线", "内测曲线", "公测曲线"],
          [this.$t("retentionYesterday"),this.$t("retentionWeek"),this.$t("retentionMonth")],
          ["第一次", "第十次", "第百次"]
        ], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)","rgba(114, 203, 104, 0.9)","rgba(204, 204, 204, 0.9)"], //曲线颜色列表
        xaxis: (function() {
          //x轴
          let list = [];
          for (let i = 1; i <= 7; i++) {
            list.push("2017-11-" + i);
          }
          return list;
        })(),
        yaxis: "value", //y轴
        linesData: "value" //数据
      }
      //   testPlayerRequestsId: "test_player_request",
      //   testPlayerRequestsTabs: ["测试激活和账户", "测试玩家转化"]
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
