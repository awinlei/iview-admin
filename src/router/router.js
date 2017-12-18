import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'order/:order_id', title: '订单详情', name: 'order_info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } },  // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } },  // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/sumary',
        icon: 'stats-bars',
        name: 'sumary',
        title: '游戏概览',
        component: Main,
        children: [
            { path: 'index', title: '游戏概览', name: 'sumary_index', component: resolve => { require(['@/views/sumary/sumary.vue'], resolve); } }
        ]
    },
    {
        path: '/player',
        icon: 'person',
        name: 'player',
        title: '玩家分析',
        component: Main,
        children: [
            {
                path: 'playerNew',
                icon: 'person-add',
                name: 'playerNew',
                title: '新增玩家',
                component: resolve => { require(['@/views/player/player-new.vue'], resolve); }
            },
            {
                path: 'playerActive',
                icon: 'person-stalker',
                name: 'playerActive',
                title: '活跃玩家',
                component: resolve => { require(['@/views/player/player-active.vue'], resolve); }
            },
            {
                path: 'playerRetention',
                icon: 'ios-people',
                name: 'playerRetention',
                title: '玩家留存',
                component: resolve => { require(['@/views/player/player-retention.vue'], resolve); }
            },
            {
                path: 'playerConvertion',
                icon: 'social-usd',
                name: 'playerConvertion',
                title: '付费转化',
                component: resolve => { require(['@/views/player/player-convertion.vue'], resolve); }
            },
            {
                path: 'playerChurned',
                icon: 'ios-people-outline',
                name: 'playerChurned',
                title: '玩家流失',
                component: resolve => { require(['@/views/player/player-churned.vue'], resolve); }
            },
            {
                path: 'playerBehavior',
                icon: 'ios-camera',
                name: 'playerBehavior',
                title: '游戏习惯',
                component: resolve => { require(['@/views/player/player-behavior.vue'], resolve); }
            },
            {
                path: 'playerDriver',
                icon: 'ios-game-controller-b',
                name: 'playerDriver',
                title: '设备相关',
                component: resolve => { require(['@/views/player/player-driver.vue'], resolve); }
            }
        ]
    },
    {
        path: '/revenue',
        icon: 'cash',
        name: 'revenue',
        title: '收入分析',
        component: Main,
        children: [
            {
                path: 'revenueIncomeData',
                icon: 'person-add',
                name: 'revenueIncomeData',
                title: '收入数据',
                component: resolve => { require(['@/views/revenue/revenue-incomeData.vue'], resolve); }
            },
            {
                path: 'revenuePayPermeate',
                icon: 'ios-people',
                name: 'revenuePayPermeate',
                title: '付费渗透',
                component: resolve => { require(['@/views/revenue/revenue-payPermeate.vue'], resolve); }
            },
            {
                path: 'revenueNewPlayerValue',
                icon: 'crop',
                name: 'revenueNewPlayerValue',
                title: '新玩家价值',
                component: resolve => { require(['@/views/revenue/revenue-newPlayerValue.vue'], resolve); }
            },
            {
                path: 'revenuePayHabit',
                icon: 'arrow-move',
                name: 'revenuePayHabit',
                title: '付费习惯',
                component: resolve => { require(['@/views/revenue/revenue-payHabit.vue'], resolve); }
            }
        ]
    },
    {
        path: '/level',
        icon: 'levels',
        name: 'level',
        title: '等级分析',
        component: Main,
        children: [
            {
                path: 'levelDetails',
                icon: 'person-add',
                name: 'levelDetails',
                title: '等级详解',
                component: resolve => { require(['@/views/level/level-details.vue'], resolve); }
            },
            {
                path: 'levelDistribute',
                icon: 'ios-people',
                name: 'levelDistribute',
                title: '等级分布',
                component: resolve => { require(['@/views/level/level-distribute.vue'], resolve); }
            },
            {
                path: 'levelSchedule',
                icon: 'crop',
                name: 'levelSchedule',
                title: '新玩家进度',
                component: resolve => { require(['@/views/level/level-schedule.vue'], resolve); }
            }
        ]
    },
    {
        path: '/task',
        icon: 'podium',
        name: 'task',
        title: '任务分析',
        component: Main,
        children: [
            {
                path: 'taskDetails',
                icon: 'person-add',
                name: 'taskDetails',
                title: '任务和关卡',
                component: resolve => { require(['@/views/task/task-details.vue'], resolve); }
            },
            {
                path: 'taskNew',
                icon: 'person-add',
                name: 'taskNew',
                title: '新手任务',
                component: resolve => { require(['@/views/task/task-new.vue'], resolve); }
            },
            {
                path: 'taskMain',
                icon: 'person-add',
                name: 'taskMain',
                title: '主线任务',
                component: resolve => { require(['@/views/task/task-main.vue'], resolve); }
            }
        ]
    },
    {
        path: '/system',
        icon: 'ios-gear',
        name: 'system',
        title: '系统管理',
        component: Main,
        children: [
            {
                path: 'systemGame',
                icon: 'ios-game-controller-b',
                name: 'systemGame',
                title: '游戏管理',
                component: resolve => { require(['@/views/system/game.vue'], resolve); }
            },
            {
                path: 'systemOperator',
                icon: 'compass',
                name: 'operator',
                title: '部门管理',
                component: resolve => { require(['@/views/system/operator.vue'], resolve); }
            },
            {
                path: 'admin',
                icon: 'person-add',
                name: 'admin',
                title: '用户管理',
                component: resolve => { require(['@/views/system/admin.vue'], resolve); }
            },
            {
                path: 'permission',
                icon: 'locked',
                name: 'permission',
                title: '权限管理',
                component: resolve => { require(['@/views/system/permission.vue'], resolve); }
            }
        ]
    },
    // {
    //     path: '/maintenance',
    //     icon: 'person',
    //     name: 'maintenance',
    //     title: '运维管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '游戏区服管理',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '游戏GM节点管理',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '参数管理',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '批量操作',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         }
    //     ]
    // },
    // {
    //     path: '/game',
    //     icon: 'person',
    //     name: 'game',
    //     title: '游戏管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '活动管理',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '公告管理',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         }
    //     ]
    // },
    // {
    //     path: '/account',
    //     icon: 'person',
    //     name: 'account',
    //     title: '玩家管理',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '玩家查询',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'text-editor',
    //             icon: 'person-add',
    //             name: 'text-editor',
    //             title: '奖励发放',
    //             component: resolve => { require(['@/views/my_components/text-editor/text-editor.vue'], resolve); }
    //         }
    //     ]
    // },
    {
        path: '/access',
        icon: 'key',
        name: 'access',
        title: '权限管理',
        component: Main,
        children: [
            { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
        ]
    },
    {
        path: '/access-test',
        icon: 'lock-combination',
        title: '权限测试页',
        name: 'accesstest',
        access: 0,
        component: Main,
        children: [
            { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/views/access/access-test.vue'], resolve); } }
        ]
    },
    {
        path: '/international',
        icon: 'earth',
        title: {i18n: 'international'},
        name: 'international',
        component: Main,
        children: [
            { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: resolve => { require(['@/views/international/international.vue'], resolve); } }
        ]
    },
    {
        path: '/component',
        icon: 'social-buffer',
        name: 'component',
        title: '组件',
        component: Main,
        children: [
            {
                path: 'text-editor',
                icon: 'compose',
                name: 'text-editor',
                title: '富文本编辑器',
                component: resolve => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve); }
            },
            {
                path: 'md-editor',
                icon: 'pound',
                name: 'md-editor',
                title: 'Markdown编辑器',
                component: resolve => { require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve); }
            },
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: resolve => { require(['@/views/my-components/image-editor/image-editor.vue'], resolve); }
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component: resolve => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve); }
            },
            {
                path: 'area-linkage',
                icon: 'ios-more',
                name: 'area-linkage',
                title: '城市级联',
                component: resolve => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve); }
            },
            {
                path: 'file-upload',
                icon: 'android-upload',
                name: 'file-upload',
                title: '文件上传',
                component: resolve => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve); }
            },
            {
                path: 'count-to',
                icon: 'arrow-graph-up-right',
                name: 'count-to',
                title: '数字渐变',
                component: resolve => { require(['@/views/my-components/count-to/count-to.vue'], resolve); }
            }
            // {
            //     path: 'clipboard-page',
            //     icon: 'clipboard',
            //     name: 'clipboard-page',
            //     title: '一键复制',
            //     component: resolve => { require(['@/views/my-components/clipboard/clipboard.vue'], resolve); }
            // }
        ]
    },
    {
        path: '/form',
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: Main,
        children: [
            { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: resolve => { require(['@/views/form/article-publish/article-publish.vue'], resolve); } },
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['@/views/form/work-flow/work-flow.vue'], resolve); } }

        ]
    },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    {
        path: '/tables',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: Main,
        children: [
            { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: resolve => { require(['@/views/tables/dragable-table.vue'], resolve); } },
            { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => { require(['@/views/tables/editable-table.vue'], resolve); } },
            { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: resolve => { require(['@/views/tables/searchable-table.vue'], resolve); } },
            { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: resolve => { require(['@/views/tables/exportable-table.vue'], resolve); } },
            { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => { require(['@/views/tables/table-to-image.vue'], resolve); } }
        ]
    },
    {
        path: '/advanced-router',
        icon: 'ios-infinite',
        name: 'advanced-router',
        title: '高级路由',
        component: Main,
        children: [
            { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => { require(['@/views/advanced-router/mutative-router.vue'], resolve); } },
            { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: resolve => { require(['@/views/advanced-router/argument-page.vue'], resolve); } }
        ]
    },
    {
        path: '/error-page',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: Main,
        children: [
            { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
