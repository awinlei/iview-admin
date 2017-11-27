
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
                    玩家
                </p>
                <div class="line-chart-con">
                    <player-requests></player-requests>
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
            <Col span="12" class="padding-left-5">
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
import playerRequests from "./components/newPlayerRequests.vue";
import smallAccountRequests from "./components/smallAccountRequests.vue";
import genderRequests from "./components/genderRequests.vue";
import ageRequests from "./components/ageRequests.vue";
import areaRequests from "./components/areaRequests.vue";
import operatorChannelRequests from "./components/operatorChannelRequests.vue";
import accountTypeRequests from "./components/accountTypeRequests.vue";

export default {
  name: "playerNew",
  components: {
    playerRequests,
    areaRequests,
    ageRequests,
    operatorChannelRequests,
    accountTypeRequests,
    genderRequests,
    smallAccountRequests
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
