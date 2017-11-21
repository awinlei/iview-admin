<template>
    <Tabs type="card" closable @on-tab-remove="handleTabRemove">
        <TabPane label="新增激活和账户" v-if="tab0"><div style="width:100%;height:100%;" id="key_request_con"></div></TabPane>
        <TabPane label="活跃玩家" v-if="tab1"><div style="width:100%;height:100%;" id="key_request_con1"></div></TabPane>
        <TabPane label="付费玩家" v-if="tab2"><div style="width:100%;height:100%;" id="key_request_con2"></div></TabPane>
        <TabPane label="收入" v-if="tab2"><div style="width:100%;height:100%;" id="key_request_con3"></div></TabPane>
    </Tabs>
</template>

<script>
const echarts = require('echarts');
export default {
    name: 'keyRequests',
    data () {
            return {
                tab0: true,
                tab1: true,
                tab2: true
            }
        },
    methods: {
            handleTabRemove (name) {
                console.log(name);
                this['tab' + name] = false;
            }
        },
    mounted () {
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            grid: {
                top: '3%',
                left: '1.2%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '银行/证券',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#10A6FF'
                    }},
                    data: [257, 358, 278, 234, 290, 330, 310]
                },
                {
                    name: '快递/电商',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {
                        color: '#398DBF'
                    }},
                    data: [820, 645, 546, 745, 872, 624, 258]
                }
            ]
        };
        const keyRequestCharts = echarts.init(document.getElementById('key_request_con'));
        keyRequestCharts.setOption(option);

        window.addEventListener('resize', function () {
            keyRequestCharts.resize();
        });
    }
};
</script>