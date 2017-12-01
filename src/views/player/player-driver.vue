
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
                    机型
                </p>
                <div class="line-chart-con">
                    <play-driver-requests :parent-params="playDriverRequests"></play-driver-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        分辨率
                    </p>
                    <div class="line-chart-con">
                        <device-resolution-requests :parent-params="deviceResolutionRequests"></device-resolution-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class="padding-left-5">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        操作系统
                    </p>
                    <div class="line-chart-con">
                        <device-os-requests :parent-params="deviceOsRequests"></device-os-requests>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        联网方式分布
                    </p>
                    <div class="line-chart-con">
                        <device-network-requests :parent-params="deviceNetworkRequests"></device-network-requests>
                    </div>
                </Card>
            </Col>
            <Col span="12" class='padding-left-5'>
                 <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-shuffle-strong"></Icon>
                        运营商
                    </p>
                    <div class="line-chart-con">
                        <device-carrier-requests :parent-params="deviceCarrierRequests"></device-carrier-requests>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
// 单页签图表
import playDriverRequests from "../my-components/echart-show/histogramChart.vue";
import deviceResolutionRequests from "../my-components/echart-show/histogramChart.vue";
import deviceOsRequests from "../my-components/echart-show/histogramChart.vue";
import areaRequests from "../my-components/echart-show/histogramChart.vue";
import operatorChannelRequests from "../my-components/echart-show/histogramChart.vue";
import deviceCarrierRequests from "../my-components/echart-show/histogramChart.vue";
// 饼状图图表
import deviceNetworkRequests from "../my-components/echart-show/pieChart.vue";

export default {
  name: "playerActive",
  components: {
    playDriverRequests,
    deviceResolutionRequests,
    areaRequests,
    deviceCarrierRequests,
    operatorChannelRequests,
    deviceOsRequests,
    deviceNetworkRequests
  },
  data() {
    return {
      //单设备账户数量分析（小号分析）
      playDriverRequests: {
        requestId: "playDriverRequests", //图表ID,ajax查询
        linesList: ["新增玩家", "活跃玩家", "付费玩家"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["Iphone 6s", "OPPO R11", "华为 Mate9"];
          //   for (let i = 1; i <= 7; i++) {
          //     list.push("2017-11-" + i);
          //   }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //单设备账户数量分析（小号分析）
      deviceResolutionRequests: {
        requestId: "deviceResolutionRequests", //图表ID,ajax查询
        linesList: ["新增玩家", "活跃玩家", "付费玩家"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(204, 204, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["1080*1920", "1640*1200"];
          //   for (let i = 1; i <= 7; i++) {
          //     list.push("2017-11-" + i);
          //   }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //操作系统
      deviceOsRequests: {
        requestId: "deviceOsRequests", //图表ID,ajax查询
        linesList: ["新增玩家", "活跃玩家", "付费玩家"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(104, 214, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["Android", "IOS", "Other"];
          //   for (let i = 1; i <= 7; i++) {
          //     list.push("2017-11-" + i);
          //   }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //运营商
      deviceCarrierRequests: {
        requestId: "deviceCarrierRequests", //图表ID,ajax查询
        linesList: ["新增玩家", "活跃玩家", "付费玩家"], //图表分类->曲线列表
        linesColor: [
          "rgba(109, 197, 253, 0.5)",
          "rgba(114, 203, 104, 0.9)",
          "rgba(104, 214, 204, 0.9)"
        ], //曲线颜色列表
        yaxis: (function() {
          //y轴
          let list = ["中国移动", "中国联通","中国电信"];
        //   let deviceCarrier = 0;
        //   for (let i = 10; i <= 60; ) {
        //     i += 5;
        //     deviceCarrier += 5;
        //     let deviceCarrier_name = deviceCarrier + " ~ " + i + " 岁";
        //     list.push(deviceCarrier_name);
        //   }
          return list;
        })(),
        xaxis: "value" //x轴
      },
      //访问来源
      deviceNetworkRequests: {
        requestId: "deviceNetworkRequests", //图表ID,ajax查询
        lineName: "访问来源", //图表分类->曲线列表
        linesList: ["WIFI", "4G","3G"], //图表分类->曲线列表
        linesColor: ["rgba(109, 197, 253, 0.5)", "rgba(204, 204, 204, 0.9)", "rgba(184, 224, 204, 0.9)"] //曲线颜色列表
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