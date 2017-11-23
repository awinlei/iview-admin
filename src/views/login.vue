<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录-大侠游戏管理系统
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="gameId">
                            <span class="ivu-input-group-prepend" style="height: 32px;width: 27px;float: left;">
                                <Icon :size="16" type="ios-game-controller-a"></Icon>
                            </span>
                            <Select v-model="form.gameId" style="width:241px;float:right;" value ='1' placeholder="请选择游戏">
                                <Option v-for="item in gameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入您的用户名和密码</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import util from '@/libs/util';
import * as gameConfig from '../../build/games';

export default {
    data () {
        return {
            gameList: gameConfig.gameList,
            form: {
                userName: 'iview_admin',
                password: '1'
            },
            rules: {
                gameId: [
                    { required: true, message: '必须选择一款游戏', trigger: '' }
                ],
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    let gameApi = gameConfig.gameList[this.form.gameId].apiUrl;
                    if(gameApi == ''){
                        this.$Message.error({
                                content: "请检查游戏后台的请求配置......",
                                duration: 3
                            });
                    }
                    // 更新本地local Storage
                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    this.$store.commit('setGameId', this.form.gameId);
                    this.$store.commit('setGameApi', gameApi);
                    // 更新cookie
                    Cookies.set('user', this.form.userName);
                    Cookies.set('password', this.form.password);
                    if (this.form.userName === 'iview_admin') {
                        Cookies.set('access', 0);
                    } else {
                        Cookies.set('access', 1);
                    }
                    this.$router.push({
                        name: 'home_index'
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>
