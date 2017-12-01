
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
                    活跃玩家
                </p>
                <div class="line-chart-con">
                    <active-player-requests :parent-params="activePlayerRequests"></active-player-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        活跃玩家 已玩天数
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
                        活跃玩家 等级
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
                        活跃玩家 地区
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
                        活跃玩家 渠道
                    </p>
                    <div class="line-chart-con">
                        <operator-channel-requests :parent-params="operatorChannelRequests"></operator-channel-requests>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        活跃玩家 性別
                    </p>
                    <div class="line-chart-con">
                        <gender-requests :parent-params="genderRequests"></gender-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class='padding-left-5'>
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        活跃玩家 年齡
                    </p>
                    <div class="line-chart-con">
                        <age-requests :parent-params="ageRequests"></age-requests>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
// 多页签图表
import activePlayerRequests from "../my-components/echart-show/multiTabsChart.vue";
// 单页签图表
import smallAccountRequests from "../my-components/echart-show/histogramChart.vue";
import accountTypeRequests from "../my-components/echart-show/histogramChart.vue";
import areaRequests from "../my-components/echart-show/histogramChart.vue";
import operatorChannelRequests from "../my-components/echart-show/histogramChart.vue";
import ageRequests from "../my-components/echart-show/histogramChart.vue";
// 饼状图图表
import genderRequests from "../my-components/echart-show/pieChart.vue";

export default {
  name: "playerActive",
  components: {
    activePlayerRequests,
    smallAccountRequests,
    areaRequests,
    ageRequests,
    operatorChannelRequests,
    accountTypeRequests,
    genderRequests
  },
  data() {
    return {
      // 新增玩家图表
      activePlayerRequests: {
        requestId: "activePlayerRequests", //图表ID,ajax查询
        tabList: ["DAU", "WAU", "MAU", "DAU/MAU"], //图表tabs列表 和 linesList对应
        linesList: [["DAU"], ["WAU"], ["MAU"], ["新玩家", "老玩家"]], //图表分类->曲线列表
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
      },
      //年龄分布
      ageRequests: {
        requestId: "ageRequests", //图表ID,ajax查询
        linesList: ["男", "女"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(104, 214, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = [];
          let age = 0;
          for (let i = 10; i <= 60; ) {
            i += 5;
            age += 5;
            let age_name = age + " ~ " + i + " 岁";
            list.push(age_name);
          }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //性别来源
      genderRequests: {
        requestId: "genderRequests", //图表ID,ajax查询
        lineName: "访问来源", //图表分类->曲线列表
        linesList: ["男", "女"], //图表分类->曲线列表
        linesColor: ["rgba(109, 197, 253, 0.5)", "rgba(204, 204, 204, 0.9)"] //曲线颜色列表
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
