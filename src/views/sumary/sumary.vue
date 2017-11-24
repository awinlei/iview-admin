
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
                        <DatePicker large :value="date_range" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
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
                    <key-requests></key-requests>
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
import dataSourcePie from './components/dataSourcePie.vue';
import onlineRequests from './components/onlineRequests.vue';
import keyRequests from './components/keyRequests.vue';
import chargeRequests from './components/chargeRequests.vue';
import retentionRequests from './components/retentionRequests.vue';
import serviceRequests from './components/serviceRequests.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';

export default {
    name: 'home',
    components: {
        dataSourcePie,
        onlineRequests,
        keyRequests,
        chargeRequests,
        retentionRequests,
        serviceRequests,
        countUp,
        inforCard,
    },
    data () {
        return {
            count: {
                createUser: 496,
                cashedUser: 302,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            showAddNewTodo: false,
            newToDoItemValue: '',
            date_range: ['2017-01-01', '2017-02-15']
        };
    },
    computed: {
    },
    methods: {
    }
};
</script>
