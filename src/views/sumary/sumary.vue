
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
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日新增用户"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="user_cashed_count"
                            :end-val="count.cashedUser"
                            iconType="person-stalker"
                            color="#7A889B"
                            intro-text="今日付费玩家"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="cash"
                            color="#ffd572"
                            intro-text="今日收入"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="ios-eye"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="今日最高在线"
                        ></infor-card>
                    </Col>
                    <Col span="4" class-name="padding-left-5">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="shuffle"
                            color="#f25e43"
                            intro-text="今日服务调用量"
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
                    <online-requests></online-requests>
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
                    <key-requests :date-range-list="date_range"></key-requests>
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
                    <charge-requests></charge-requests>
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
                    <retention-requests></retention-requests>
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
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row>
    </div>
</template>

<script>
import dataSourcePie from "./components/dataSourcePie.vue";
import onlineRequests from "./components/onlineRequests.vue";
import keyRequests from "./components/keyRequests.vue";
import chargeRequests from "./components/chargeRequests.vue";
import retentionRequests from "./components/retentionRequests.vue";
import serviceRequests from "./components/serviceRequests.vue";
import countUp from "./components/countUp.vue";
import inforCard from "./components/inforCard.vue";

export default {
  name: "sumary",
  //   注册子组件
  components: {
    dataSourcePie,
    onlineRequests,
    keyRequests,
    chargeRequests,
    retentionRequests,
    serviceRequests,
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