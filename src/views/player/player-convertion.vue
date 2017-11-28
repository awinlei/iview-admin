
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
                    付费转化
                </p>
                <div class="line-chart-con">
                    <convertion-player-requests :tabs="convertionPlayerRequestsTabs"></convertion-player-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    新玩家付费
                </p>
                <div class="line-chart-con">
                    <convertion-new-player-requests :tabs="convertionNewPlayerRequestsTabs"></convertion-new-player-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        玩家首付周期
                    </p>
                    <div class="line-chart-con">
                        <small-account-requests :parent-params="smallAccountRequests"></small-account-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class="padding-left-5">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        玩家首付等级
                    </p>
                    <div class="line-chart-con">
                        <account-type-requests :parent-params="accountTypeRequests"></account-type-requests>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        玩家首付金额
                    </p>
                    <div class="line-chart-con">
                        <area-requests :parent-params="areaRequests"></area-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class="padding-left-5">
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        首付充值包类型
                    </p>
                    <div class="line-chart-con">
                        <operator-channel-requests :parent-params="operatorChannelRequests"></operator-channel-requests>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
// 多页签图表
import convertionPlayerRequests from "../my-components/echart-show/multiTabsChart.vue";
import convertionNewPlayerRequests from "../my-components/echart-show/multiTabsChart.vue";
// 单页签图表
import smallAccountRequests from "../my-components/echart-show/histogramChart.vue";
import accountTypeRequests from "../my-components/echart-show/histogramChart.vue";
import areaRequests from "../my-components/echart-show/histogramChart.vue";
import operatorChannelRequests from "../my-components/echart-show/histogramChart.vue";

export default {
  name: "playerConvertion",
  components: {
    convertionPlayerRequests,
    convertionNewPlayerRequests,
    smallAccountRequests,
    areaRequests,
    operatorChannelRequests,
    accountTypeRequests
  },
  data() {
    return {
      // 新增玩家图表
      convertionPlayerRequestsTabs: {
        requestId: "convertionPlayerRequestsTabs", //图表ID,ajax查询
        tabList: ["新增付费玩家", "累计付费玩家", "总体付费玩家"], //图表tabs列表 和 linesList对应
        linesList: [["新增付费玩家"], ["累计付费玩家"], ["总体付费玩家"]], //图表分类->曲线列表
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
      // 新增玩家图表
      convertionNewPlayerRequestsTabs: {
        requestId: "convertionNewPlayerRequestsTabs", //图表ID,ajax查询
        tabList: ["首日付费率", "首周付费率", "首月付费率"], //图表tabs列表 和 linesList对应
        linesList: [["首日付费率", "首日付费数"], ["首周付费率", "首周付费数"], ["首月付费率", "首月付费数"]], //图表分类->曲线列表
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
      smallAccountRequests: {
        requestId: "smallAccountRequests", //图表ID,ajax查询
        linesList: ["2011年", "2012年", "2013年"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["巴西", "印尼", "美国", "印度", "中国", "世界人口(万)"];
          //   for (let i = 1; i <= 7; i++) {
          //     list.push("2017-11-" + i);
          //   }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //玩家账户类型
      accountTypeRequests: {
        requestId: "accountTypeRequests", //图表ID,ajax查询
        linesList: ["官网", "联运", "其他"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(104, 214, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["自有账号", "微博账号", "QQ帐号", "匿名账号", "其他"];
          //   for (let i = 1; i <= 7; i++) {
          //     list.push("2017-11-" + i);
          //   }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //地区
      areaRequests: {
        requestId: "areaRequests", //图表ID,ajax查询
        linesList: ["中国", "美国", "台湾"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(104, 214, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["新增激活玩家", "新增充值玩家"];
          //   for (let i = 1; i <= 7; i++) {
          //     list.push("2017-11-" + i);
          //   }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //渠道
      operatorChannelRequests: {
        requestId: "operatorChannelRequests", //图表ID,ajax查询
        linesList: ["中国"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(104, 214, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["appstore", "91助手", "安卓市场", "360手机助手"];
          //   for (let i = 1; i <= 7; i++) {
          //     list.push("2017-11-" + i);
          //   }
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
