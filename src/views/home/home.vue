<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row>
            <Col span="12">
                <Row>
                    <Card>
                        <Row type="flex" class="user-infor">
                            <Col span="8">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <img class="avator-img" :src="avatorPath" />
                                </Row>
                            </Col>
                            <Col span="16" style="padding-left:6px;">
                                <Row class-name="made-child-con-middle" type="flex" align="middle">
                                    <div>
                                        <b class="card-user-infor-name">Admin</b>
                                        <p>super admin</p>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <div class="line-gray" style="height:5px;"></div>
                        <Row class="margin-top-8">
                            <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                            <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                        </Row>
                        <Row class="margin-top-8">
                            <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                            <Col span="16" class="padding-left-8">北京</Col>
                        </Row>
                        <Row class="margin-top-8">
                            <Col span="8"><p class="notwrap">上次操作记录:</p></Col>
                            <Col span="16" class="padding-left-8">审批大磊道具发送...</Col>
                        </Row>
                    </Card>
                </Row>
            </Col>
            <Col span="12" class-name="padding-left-5">
                <Row>
                     <Card>
                        <p slot="title" class="card-title">
                            <Icon type="android-checkbox-outline"></Icon>
                            待办事项
                        </p>
                        <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                            <Icon type="plus-round"></Icon>
                        </a>
                        <Modal
                            v-model="showAddNewTodo"
                            title="添加新的待办事项"
                            @on-ok="addNew"
                            @on-cancel="cancelAdd">
                            <Row type="flex" justify="center">
                                <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                            </Row>
                            <Row slot="footer">
                                <Button type="text" @click="cancelAdd">取消</Button>
                                <Button type="primary" @click="addNew">确定</Button>
                            </Row>
                        </Modal>
                        <div class="to-do-list-con">
                            <div v-for="(item, index) in toDoList" :key="index" class="to-do-item">
                                <to-do-list-item :content="item.title"></to-do-list-item>
                            </div>
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col>
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        审批事项
                    </p>
                    <div class="data-source-row">
                        <visite-volume></visite-volume>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row class="margin-top-10">
            <Col span="12">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        操作记录
                    </p>
                    <div class="data-source-row">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </Col>
            <Col span="12" class="padding-left-5">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-wifi"></Icon>
                        登陆日志
                    </p>
                    <div class="data-source-row">
                        <user-flow></user-flow>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js';
import homeMap from './components/map.vue';
import dataSourcePie from './components/dataSourcePie.vue';
import visiteVolume from './components/visiteVolume.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';
import toDoListItem from './components/toDoListItem.vue';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        visiteVolume,
        serviceRequests,
        userFlow,
        countUp,
        inforCard,
        mapDataTable,
        toDoListItem
    },
    data () {
        return {
            toDoList: [
                {
                    title: '跟进系统内容'
                },
                {
                    title: '进行SN版本更新'
                },
                {
                    title: '进行ST版本更新'
                },
                {
                    title: '参加宣讲会'
                },
                {
                    title: '进行codereview'
                }
            ],
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            },
            cityData: cityData,
            showAddNewTodo: false,
            newToDoItemValue: ''
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        addNewToDoItem () {
            this.showAddNewTodo = true;
        },
        addNew () {
            if (this.newToDoItemValue.length !== 0) {
                this.toDoList.unshift({
                    title: this.newToDoItemValue
                });
                setTimeout(() => {
                    this.newToDoItemValue = '';
                }, 200);
                this.showAddNewTodo = false;
            } else {
                this.$Message.error('请输入待办事项内容');
            }
        },
        cancelAdd () {
            this.showAddNewTodo = false;
            this.newToDoItemValue = '';
        }
    }
};
</script>
