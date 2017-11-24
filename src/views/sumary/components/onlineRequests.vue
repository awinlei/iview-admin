<template>
  <div style="width:100%;height:100%;" id="online_request_con"></div>
</template>

<script>
const echarts = require('echarts');
require('@/libs/echarts/macarons');
export default {
    name: 'onlineRequests',
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
            legend: {
                data:['运营商/网络服务','银行/证券','游戏/视频','餐饮/外卖','快递/电商']
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line','bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            grid: {
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
                    name: '运营商/网络服务',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#2d8cf0'
                    }},
                    data: [120, 132, 101, 134, 90, 230, 310]
                },
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
                    name: '游戏/视频',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#0C17A6'
                    }},
                    data: [379, 268, 354, 269, 310, 478, 358]
                },
                {
                    name: '餐饮/外卖',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {
                        color: '#4608A6'
                    }},
                    data: [320, 332, 301, 334, 390, 330, 320]
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
                    data: [820, 645, 546, 745, 872, 624, 258],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        };
        const serviceRequestCharts = echarts.init(document.getElementById('online_request_con'),'macarons');
        serviceRequestCharts.setOption(option);


        window.addEventListener('resize', function () {
            serviceRequestCharts.resize();
        });
    }
};
</script>