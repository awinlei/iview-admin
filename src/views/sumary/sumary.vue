
<style lang="less">
@import "./sumary.less";
@import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
                <Row>
                    <Col span="4">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="iphone"
                            color="#2d8cf0"
                            intro-text="设备激活"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="user_cashed_count"
                            :end-val="count.cashedUser"
                            iconType="ios-personadd"
                            color="#7A889B"
                            intro-text="新增玩家"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="ios-people-outline"
                            color="#64d572"
                            intro-text="付费玩家"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.visit"
                            iconType="cash"
                            color="#ffd572"
                            :iconSize="50"
                            intro-text="收入"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.transfer"
                            iconType="stats-bars"
                            color="#f25e43"
                            intro-text="今日最高在线"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <Date-picker size="large" v-model="date_range" :value="date_range" type="daterange" :options="date_option" placement="bottom-end" @on-change="handleChangeDate" placeholder="选择日期" style="width: 250px"></Date-picker>
                    </Col>
            </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    在线趋势
                </p>
                <div class="line-chart-con">
                    <online-requests :parent-params="onlineRequests"></online-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    关键指标
                </p>
                <div class="line-chart-con">
                    <key-requests :parent-params="keyRequests"></key-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    付费渗透
                </p>
                <div class="line-chart-con">
                    <charge-requests :parent-params="chargeRequests"></charge-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    玩家留存
                </p>
                <div class="line-chart-con">
                    <retention-requests :parent-params="retentionRequests"></retention-requests>
                </div>
            </Card>
        </Row>
        <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    平均时长和次数
                </p>
                <div class="line-chart-con">
                    <indicator-requests :parent-params="indicatorRequests"></indicator-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
// 单页签多线条图表
import onlineRequests from "../my-components/echart-show/multiLinesChart.vue";
import indicatorRequests from "../my-components/echart-show/multiLinesChart.vue";

// 多标签图表
import keyRequests from "../my-components/echart-show/multiTabsChart.vue";
import chargeRequests from "../my-components/echart-show/multiTabsChart.vue";
import retentionRequests from "../my-components/echart-show/multiTabsChart.vue";

//
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";

export default {
  name: "sumary",
  //   注册子组件
  components: {
    onlineRequests,
    keyRequests,
    chargeRequests,
    retentionRequests,
    indicatorRequests,
    countUp,
    inforCard
  },
  data() {
    return {
      count: {
        createUser: 496,
        cashedUser: 302,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      date_range: [new Date(), new Date()],
      showcodeall: true,
      open: false,
      date_option: {
        disabledDate(date) {
          //return date && date.valueOf() < Date.now() - 86400000;
        },
        shortcuts: [
          {
            text: "今天",
            value() {
              const end = new Date();
              const start = new Date();
              return [start, end];
            },
            onClick: picker => {
              this.$Message.info("选择了今天");
            }
          },
          {
            text: "昨天",
            value() {
              const end = new Date();
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              return [start, end];
            },
            onClick: picker => {
              this.$Message.info("选择了昨天");
            }
          },
          {
            text: "最近3天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              return [start, end];
            },
            onClick: picker => {
              this.$Message.info("选择了最近3天");
            }
          },
          {
            text: "最近7天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "最近30天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "最近90天",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      // 新增玩家图表
      onlineRequests: {
        requestId: "onlineRequests", //图表ID,ajax查询
        linesList: ["ACU", "PCU"], //图表分类->曲线列表
        linesColor: ["rgba(109, 197, 253, 0.5)", "rgba(114, 203, 104, 0.9)"], //曲线颜色列表
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
      indicatorRequests: {
        requestId: "indicatorRequests", //图表ID,ajax查询
        linesList: ["平均时长", "登陆次数"], //图表分类->曲线列表
        linesColor: ["rgba(109, 197, 253, 0.5)", "rgba(114, 203, 104, 0.9)"], //曲线颜色列表
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
      keyRequests: {
        requestId: "keyRequests", //图表ID,ajax查询
        tabList: ["新增激活和账户", "活跃玩家", "付费玩家", "收入"], //图表tabs列表 和 linesList对应
        linesList: [
          ["设备激活", "新增玩家"],
          ["新玩家", "老玩家"],
          ["老付费玩家", "新付费玩家"],
          ["收入"]
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
      chargeRequests: {
        requestId: "chargeRequests", //图表ID,ajax查询
        tabList: ["日付费率", "日ARPU", "日ARPPU"], //图表tabs列表 和 linesList对应
        linesList: [["日付费率"], ["日ARPU"], ["日ARPPU"]], //图表分类->曲线列表
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
      retentionRequests: {
        requestId: "retentionRequests", //图表ID,ajax查询
        tabList: ["新增账户留存", "激活设备留存"], //图表tabs列表 和 linesList对应
        linesList: [["30日留存率", "7日留存率", "次日留存率"], ["30日留存率", "7日留存率", "次日留存率"]], //图表分类->曲线列表
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
  computed: {},
  methods: {
    handleChangeDate() {
      console.log("handleChangeDate start ...");
      console.log(this.date_range);
      console.log("handleChangeDate end ...");
    }
  }
};
</script>