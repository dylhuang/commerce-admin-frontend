export const orderStatus = () => {
    let orderStatuses = [];
    orderStatuses[0] = {id: 0, desc: '未确认'};
    orderStatuses[1] = {id: 1, desc: '已确认'};
    orderStatuses[2] = {id: 2, desc: '已完成'};
    orderStatuses[3] = {id: 3, desc: '已取消'};
    return orderStatuses;
};

export const paymentStatus = () => {
    let paymentStatuses = [];
    paymentStatuses[0] = {id: 0, desc: '未支付', color: 'color:#F56C6C'};
    paymentStatuses[1] = {id: 1, desc: '部分支付', color: 'color:#E6A23C'};
    paymentStatuses[2] = {id: 2, desc: '已支付', color: 'color:#67C23A'};
    paymentStatuses[3] = {id: 3, desc: '部分退款', color: 'color:#909399'};
    paymentStatuses[4] = {id: 4, desc: '已退款', color: 'color:#409EFF'};
    paymentStatuses[5] = {id: 5, desc: '退款申请中', color: 'color:#E6A23C'};
    return paymentStatuses;
};

export const shippingStatus = () => {
    let shippingStatuses = [];
    shippingStatuses[0] = {id: 0, desc: '未发货'};
    shippingStatuses[1] = {id: 1, desc: '部分发货'};
    shippingStatuses[2] = {id: 2, desc: '已发货'};
    shippingStatuses[3] = {id: 3, desc: '退货申请中'};
    shippingStatuses[4] = {id: 4, desc: '部分退货'};
    shippingStatuses[5] = {id: 5, desc: '已退货'};
    shippingStatuses[6] = {id: 6, desc: '确认收货'};
    shippingStatuses[7] = {id: 7, desc: '部分收货'};
    return shippingStatuses;
};

export const tradeType = () => {
    let tradeTypes = [];
    tradeTypes[0] = {id: 'I00', desc: '一般贸易'};
    tradeTypes[1] = {id: 'I10', desc: '跨境直邮'};
    tradeTypes[2] = {id: 'I20', desc: '跨境保税'};
    tradeTypes[3] = {id: 'I30', desc: '海外直邮'};
    tradeTypes[4] = {id: 'I40', desc: '香港直邮'};
    tradeTypes[5] = {id: 'I50', desc: '免税商品'};
    return tradeTypes;
};

export const paymentMethod = () => {
    let paymentMethods = [];
    paymentMethods[0] = {id: 1, desc: '支付宝'};
    paymentMethods[1] = {id: 2, desc: '微信'};
    paymentMethods[2] = {id: 3, desc: '汇付宝'};
    paymentMethods[3] = {id: 4, desc: '积分兑换'};
    paymentMethods[4] = {id: 5, desc: '会员支付'};
    return paymentMethods;
};

export const roleTypes = () => {
    let roleTypes = [];
    roleTypes[0] = {id: 0, desc: '中台'};
    roleTypes[1] = {id: 1, desc: '商家'};
    roleTypes[2] = {id: 2, desc: '供应商'};
    roleTypes[3] = {id: 3, desc: '宇修前端平台'};
    roleTypes[4] = {id: 4, desc: '宇修前端商户'};
    return roleTypes;
};

export const returnStatus = () => {
    let returnStatuses = [];
    returnStatuses[0] = {id: 0, desc: '申请退货中'};
    returnStatuses[1] = {id: 1, desc: '同意退货'};
    returnStatuses[2] = {id: 2, desc: '拒绝退货'};
    returnStatuses[3] = {id: 3, desc: '确认收货'};
    return returnStatuses;
};

export const refundStatus = () => {
    let refundStatuses = [];
    refundStatuses[0] = {id: 0, desc: '未退款'};
    refundStatuses[1] = {id: 1, desc: '同意退款'};
    refundStatuses[2] = {id: 2, desc: '拒绝退款'};
    return refundStatuses;
};

export const feeMethod = () => {
    let feeMethods = [];
    feeMethods[0] = {id: 0, desc: '按订单金额', disable: false};
    feeMethods[1] = {id: 1, desc: '按件数（普通计费）', disable: false};
    feeMethods[2] = {id: 2, desc: '按重量', disable: false};
    feeMethods[3] = {id: 3, desc: '按件数（阶梯计费）', disable: false};
    feeMethods[4] = {id: 4, desc: '按体积', disable: true};
    feeMethods[5] = {id: 5, desc: '门店自提', disable: true};
    return feeMethods;
};

export const tplAppType = () => {
    let tplAppTypes = [];
    tplAppTypes[0] = {id: 0, desc: 'APP'};
    //tplAppTypes[1] = { id: 1, desc: 'PC' };
    return tplAppTypes;
};

export const tplType = () => {
    let tplTypes = [];
    tplTypes[0] = {id: 0, desc: '首页'};
    tplTypes[1] = {id: 1, desc: '活动页'};
    tplTypes[2] = {id: 2, desc: '分类页'};
    tplTypes[3] = {id: 3, desc: '详情页'};
    return tplTypes;
};

export const tplModuleType = () => {
    let tplModuleTypes = [];
    tplModuleTypes[0] = {id: 0, desc: '搜索框'};
    tplModuleTypes[1] = {id: 1, desc: '图片轮播'};
    tplModuleTypes[2] = {id: 2, desc: '图文导航'};
    tplModuleTypes[3] = {id: 3, desc: '图片广告'};
    tplModuleTypes[4] = {id: 4, desc: '图片橱窗'};
    tplModuleTypes[5] = {id: 5, desc: '标题栏'};
    tplModuleTypes[6] = {id: 6, desc: '专区推荐'};
    tplModuleTypes[7] = {id: 7, desc: '定位菜单'};
    tplModuleTypes[8] = {id: 8, desc: '商品组'};
    tplModuleTypes[9] = {id: 9, desc: '公告'};
    tplModuleTypes[10] = {id: 10, desc: '分隔占位'};
    tplModuleTypes[11] = {id: 11, desc: '弹窗'};
    tplModuleTypes[12] = {id: 12, desc: '分类导航'};
    tplModuleTypes[13] = {id: 13, desc: '图片商品组'};
    return tplModuleTypes;
};

export const balanceType = () => {
    let balanceTypes = [];
    balanceTypes[0] = {id: 0, desc: '在线充值'};
    balanceTypes[1] = {id: 1, desc: '人工充值'};
    balanceTypes[2] = {id: 2, desc: '订单支付'};
    balanceTypes[3] = {id: 3, desc: '订单退款'};
    balanceTypes[4] = {id: 4, desc: '人工退款'};
    return balanceTypes;
};

export const appSide = () => {
    let appSides = [];
    appSides[0] = {id: 'WEIXIN-XCX', desc: '微信小程序'};
    appSides[1] = {id: 'ALIPAY-XCX', desc: '支付宝小程序'};
    appSides[2] = {id: 'UNION-XCX', desc: '联盟小程序'};
    appSides[3] = {id: 'BBH-GZH', desc: '贝贝汇公众号'};
    appSides[4] = {id: 'ADMIN-PC', desc: 'PC后台管理'};
    appSides[5] = {id: 'APP', desc: 'APP'};
    appSides[6] = {id: 'PC', desc: 'PC商城'};
    appSides[7] = {id: 'HQ-WEIXIN-XCX', desc: '淏齐微信小程序'};
    appSides[8] = {id: 'HQ-ALIPAY-XCX', desc: '淏齐支付宝小程序'};
    return appSides;
};

export const priceType = () => {
    let priceTypes = [];
    priceTypes[0] = {value: 0, label: '指定价格'};
    priceTypes[1] = {value: 1, label: '百分比上浮'};
    // priceTypes[2] = { value: 2, label: "减价" };
    // priceTypes[3] = { value: 3, label: "折扣" };
    return priceTypes;
};

export const accChannel = () => {
    let accChannels = [];
    accChannels[0] = {value: 0, label: '支付宝'};
    accChannels[1] = {value: 1, label: '银行卡'};
    accChannels[2] = {value: 2, label: '微信'};
    return accChannels;
};

export const accType = () => {
    let accTypes = [];
    accTypes[0] = {value: 0, label: '个人'};
    accTypes[1] = {value: 1, label: '企业'};
    return accTypes;
};

export const divideType = () => {
    let divideTypes = [];
    divideTypes[0] = {value: 0, label: '平台'};
    divideTypes[1] = {value: 1, label: '商家'};
    divideTypes[2] = {value: 2, label: '供应商'};
    divideTypes[3] = {value: 3, label: '会员'};
    divideTypes[4] = {value: 4, label: '平台分润'};
    divideTypes[5] = {value: 5, label: '支付服务商分润'};
    divideTypes[6] = {value: 6, label: '商家提现手续费'};
    divideTypes[7] = {value: 7, label: '服务商提现手续费'};
    divideTypes[8] = {value: 8, label: '红包'};
    divideTypes[9] = {value: 9, label: '免单'};
    return divideTypes;
};

export const settleStatus = () => {
    let settleStatuses = [];
    settleStatuses[0] = {value: 0, label: '待结算', color: 'color:#E6A23C'};
    settleStatuses[1] = {value: 1, label: '已结算', color: 'color:#67C23A'};
    settleStatuses[2] = {value: 2, label: '冻结中', color: 'color:#F56C6C'};
    settleStatuses[3] = {value: 3, label: '结算中', color: 'color:#409EFF'};
    return settleStatuses;
};

export const groupTypes = () => {
    let groupTypes = [];
    groupTypes[0] = {value: 0, label: '商城订单'};
    groupTypes[1] = {value: 1, label: '扫码付款'};
    groupTypes[2] = {value: 2, label: '快捷买单'};
    groupTypes[3] = {value: 3, label: 'VIP卡'};
    groupTypes[4] = {value: 4, label: '本地生活'};
    groupTypes[5] = {value: 5, label: '推广费'};
    groupTypes[6] = {value: 6, label: '免单奖励兑换'};
    return groupTypes;
};

export const billStatus = () => {
    let billStatuses = [];
    billStatuses[0] = {value: 0, label: '待付款'};
    billStatuses[1] = {value: 1, label: '付款成功'};
    billStatuses[2] = {value: 2, label: '交易处理中'};
    billStatuses[3] = {value: 3, label: '失败'};
    return billStatuses;
};

export const billCheckStatus = () => {
    let billCheckStatus = [];
    billCheckStatus[0] = {value: 0, label: '待审核'};
    billCheckStatus[1] = {value: 1, label: '审核通过'};
    billCheckStatus[2] = {value: 2, label: '未通过'};
    return billCheckStatus;
};

export const selfSale = () => {
    let selfSales = [
        {value: false, label: '直营'},
        {value: true, label: '自营'},
    ];
    return selfSales;
};

export const couponType = () => {
    let couponTypes = [
        {value: 0, label: '现金券'},
        {value: 1, label: '折扣券'},
    ];
    return couponTypes;
};

export const useType = () => {
    let couponTypes = [
        {value: 0, label: '普通优惠券'},
        {value: 1, label: '新人专享'},
        {value: 2, label: '后台专享'},
    ];
    return couponTypes;
};

export const couponSendType = () => {
    let couponSendTypes = [
        {value: 0, label: '根据用户发放'},
        {value: 1, label: '根据商品发放'},
        {value: 2, label: '根据订单金额发放'},
        {value: 3, label: '线下发放'},
        {value: 4, label: '套券发放'},
    ];
    return couponSendTypes;
};

export const couponLimitType = () => {
    let couponLimitTypes = [
        {value: 0, label: '全部商品'},
        {value: 1, label: '以下分类'},
        {value: 2, label: '以下品牌'},
        {value: 3, label: '以下商品'},
        {value: 4, label: '不参加商品'},
    ];
    return couponLimitTypes;
};

export const balanceLogType = () => {
    let balanceTypes = [
        {value: 0, label: '会员充值'},
        {value: 1, label: '会员支付'},
        {value: 2, label: '后台充值'},
        {value: 3, label: '后台扣费'},
        {value: 4, label: '后台支付'},
        {value: 5, label: '退款/退回'},
    ];
    return balanceTypes;
};

// 积分日志类型
export const integralLogType = [
    {value: 0, label: '会员注册'},
    {value: 1, label: '会员赠送'},
    {value: 2, label: '积分支付'},
    {value: 3, label: '后台充值'},
    {value: 4, label: '后台扣费'},
    {value: 5, label: '退款/退回'},
    {value: 6, label: 'API更新'},
    {value: 7, label: '下单获得积分'},
    {value: 8, label: '兑换'},
];

// 锁定余额日志类型
export const surplusLogType = [
    {value: 0, label: '新用户奖励'},
    {value: 1, label: '上级奖励'},
    {value: 2, label: '上级团队奖励'},
    {value: 3, label: '释放'},
    {value: 4, label: '下单赠送'},
    {value: 5, label: '生产线收益'},
    {value: 6, label: '任务奖励'},
    {value: 7, label: '充值'},
    {value: 8, label: '退款'},
    {value: 9, label: '轮循释放'},
];

export const gameOpType = [
    {value: 0, label: '交易'},
    {value: 1, label: '兑换'},
    {value: 2, label: '释放'},
    {value: 3, label: '生产'},
    {value: 4, label: '种植'},
    {value: 5, label: '购买'},
    {value: 6, label: '任务'},
    {value: 7, label: '订单'},
    {value: 8, label: '转赠'},
    {value: 9, label: '推广'},
    {value: 10, label: '身份晋升'},
    {value: 11, label: '星级晋升'},
    {value: 12, label: '签到'},
    {value: 13, label: '新增会员'},
    {value: 14, label: '商品结算'},
    {value: 15, label: '赠送'},
    {value: 16, label: '奖励'},
    {value: 17, label: '红包'},
    {value: 18, label: '提现'},
    {value: 19, label: '分润结算'},
];

export const gameAmountType = [
    {value: 0, label: '可用联盟券'},
    {value: 1, label: '锁仓联盟券'},
    {value: 2, label: '待结算联盟券'},
    {value: 3, label: '种植联盟券'},
    {value: 4, label: '锁定余额'},
    {value: 5, label: '贡献值'},
    {value: 6, label: '活跃度'},
    {value: 7, label: '积分'},
    {value: 8, label: '余额'},
    {value: 9, label: '消费金'},
    {value: 10, label: '免单积分'},
    {value: 11, label: '平台奖励'}
];

export const checkAnimalStatus = [
    {value: 0, label: '存活'},
    {value: 1, label: '死亡'},
    {value: 2, label: '全部'},
];

export const scaleTypes = [
    {value: 0, label: '百分比'},
    {value: 1, label: '固定值'},
];

export const gameBizType = [
    {value: 0, label: '默认'},
    {value: 1, label: '支出'},
    {value: 2, label: '收入'},
    {value: 3, label: '手续费'},
    {value: 4, label: '奖励'},
    {value: 5, label: '惩罚'},
    {value: 6, label: '投产'},
    {value: 7, label: '产出'},
    {value: 8, label: '退回'},
    {value: 9, label: '任务释放'},
    {value: 10, label: '轮循释放'},
    {value: 11, label: '待结算释放'},
    {value: 12, label: '兑换'},
    {value: 13, label: '下单收益'},
    {value: 14, label: '拉新奖励'},
    {value: 15, label: '注册奖励'},
    {value: 16, label: '推广奖励'},
    {value: 17, label: '上级奖励'},
    {value: 18, label: '团队奖励'},
    {value: 19, label: '券商求购补贴'},
    {value: 20, label: '后台充值'},
    {value: 21, label: '商品提成'},
    {value: 22, label: '会员赠送'},
    {value: 23, label: '释放余额奖励上级联锁定盟券'},
    {value: 24, label: '上级惩罚'},
    {value: 25, label: '帮扶奖励'},
    {value: 26, label: '交易分润'},
];

export const gameRewardType = [{value: 99, label: '奖励植物'}];

export const taskType = [
    {value: 0, label: '新增会员'},
    {value: 1, label: '求购联盟券次数'},
    {value: 2, label: '出售联盟券次数'},
    {value: 3, label: '求购出售联盟券次数'},
    {value: 4, label: '求购联盟券数量'},
    {value: 5, label: '解锁锁定余额'},
];

export const tradeStatus = [
    {value: 0, label: '已创建'},
    {value: 1, label: '已发布'},
    {value: 2, label: '进行中'},
    {value: 3, label: '已完成'},
    {value: 4, label: '已取消'},
];

export const tradeAppealStatus = [
    {value: 0, label: '申诉中'},
    {value: 1, label: '已处理'},
];

export const wxPushTypes = [
    {label: '下单', value: 0},
    {label: '支付', value: 1},
    {label: '发货', value: 2},
    {label: '退款', value: 3},
    {label: '退货', value: 4},
    {label: '活动', value: 5},
    {label: '优惠券', value: 6},
];

export const gameOrderStatus = [
    {value: 0, label: '未确认'},
    {value: 1, label: '已确认'},
    {value: 2, label: '已匹配'},
    {value: 3, label: '已完成'},
    {value: 4, label: '已取消'},
    {value: 5, label: '申诉中'},
];

export const gamePaymentStatus = [
    {value: 0, label: '未支付'},
    {value: 1, label: '已支付'},
];

export const gameShippingStatus = [
    {value: 0, label: '未发货'},
    {value: 1, label: '已发货'},
];

export const delayLevels = [
    {value: 1, label: '1秒'},
    {value: 2, label: '5秒'},
    {value: 3, label: '10秒'},
    {value: 4, label: '30秒'},
    {value: 5, label: '1分钟'},
    {value: 6, label: '2分钟'},
    {value: 7, label: '3分钟'},
    {value: 8, label: '4分钟'},
    {value: 9, label: '5分钟'},
    {value: 10, label: '6分钟'},
    {value: 11, label: '7分钟'},
    {value: 12, label: '8分钟'},
    {value: 13, label: '9分钟'},
    {value: 14, label: '10分钟'},
    {value: 15, label: '20分钟'},
    {value: 16, label: '30分钟'},
    {value: 17, label: '1小时'},
    {value: 18, label: '2小时'},
    {value: 19, label: '24小时'},
    {value: 20, label: '48小时'},
    {value: 21, label: '72小时'},
    {value: 22, label: '96小时'},
    {value: 23, label: '120小时'},
    {value: 24, label: '144小时'},
    {value: 25, label: '168小时'},
    {value: 26, label: '192小时'},
    {value: 27, label: '216小时'},
    {value: 28, label: '240小时'},
    {value: 29, label: '264小时'},
    {value: 30, label: '288小时'},
    {value: 31, label: '312小时'},
    {value: 32, label: '336小时'},
    {value: 33, label: '360小时'},
];

export const dateType = [
    {value: 0, label: '秒'},
    {value: 1, label: '分'},
    {value: 2, label: '小时'},
];

export const productionStatus = [
    {value: 0, label: '生产中'},
    {value: 1, label: '生产完成'},
    {value: 2, label: '未收取'},
    {value: 3, label: '已收取'},
];

// 0-直推，1-间推，2-平级奖，3-帮扶奖，4-分红，5-免单，6-红包
export const profitTypeList = [
    {value: 0, label: '直推'},
    {value: 1, label: '间推'},
    {value: 2, label: '平级奖'},
    {value: 3, label: '帮扶奖'},
    {value: 4, label: '分红'},
    {value: 5, label: '免单'},
    {value: 6, label: '红包'},
];

// 进件状态
// 0-待审核,1-审核中,2-驳回,3-通过
export const merchantStatus = [
    {value: 0, label: '待审核'},
    {value: 1, label: '审核中'},
    {value: 2, label: '驳回'},
    {value: 3, label: '通过'},
];

export const memberSortOption = [
    {
        value: 'identityId',
        label: '联盟身份',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'gameRankId',
        label: '星级等级',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'coupon',
        label: '可用联盟券',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'lockCoupon',
        label: '锁定联盟券',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'unsettleCoupon',
        label: '待结算联盟券',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'breedCoupon',
        label: '种植联盟券',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'balance',
        label: '现金',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'integral',
        label: '积分',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'surplus',
        label: '锁定余额',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'contribution',
        label: '贡献值',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'livens',
        label: '活跃度',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'grade',
        label: '层级',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'loginDate',
        label: '登录时间',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
    {
        value: 'createDate',
        label: '创建时间',
        children: [
            {
                value: 'Asc',
                label: '升序',
            },
            {
                value: 'Desc',
                label: '降序',
            },
        ],
    },
];

export const profitTypes = [
    {label: '直推奖', value: 0},
    {label: '间推奖', value: 1},
    {label: '平级奖', value: 2},
    {label: '帮扶奖励', value: 3},
    {label: '分红奖', value: 4},
    {label: '免单奖励', value: 5},
    {label: '红包', value: 6},
    {label: '直推+间推', value: 7},
    {label: '商品分润', value: 10},
];
export const bankNameOptions = [
    '工商银行',
    '建设银行',
    '农业银行',
    '邮政储蓄银行',
    '中国银行',
    '交通银行',
    '招商银行',
    '光大银行',
    '浦发银行',
    '华夏银行',
    '广东发展银行',
    '中信银行',
    '兴业银行',
    '民生银行',
    '杭州银行',
    '上海银行',
    '宁波银行',
    '平安银行',
    '东亚银行',
    '上海农村商业银行',
    '南京银行',
    '广州银行',
    '渤海银行',
    '大连银行',
    '徽商银行',
    '江苏银行',
    '齐鲁银行',
    '渣打银行',
    '深圳农村商业银行',
    '温州银行',
    '厦门银行',
    '浙商银行',
    '北京银行',
    '哈尔滨银行',
    '湖北银行',
    '潍坊银行',
    '贵阳银行',
    '浙江泰隆商业银行',
    '济宁银行',
    '台州银行',
    '汉口银行',
    '安徽省农村信用社联合社',
    '郑州银行',
    '中原银行',
    '宜宾商业银行',
    '莱商银行',
    '日照银行',
    '常熟农商银行',
    '北京农商银行',
    '福建省农村信用社联合社',
    '齐商银行',
    '云南省农村信用社联合社',
    '山东省农村信用社联合社',
    '广东华兴银行',
    '江西银行',
    '东营银行',
    '浙江稠州商业银行',
    '重庆农村商业银行',
    '晋城银行',
    '秦农银行',
    '长安银行',
    '成都银行',
    '恒丰银行',
    '承德银行',
    '绍兴银行',
    '广东南粤银行',
    '青岛银行',
    '江苏长江商行',
    '包商银行',
    '富滇银行',
    '自贡市商业银行',
    '湖北农信',
    '浙江农信',
    '葫芦岛银行',
    '昆仑银行',
    '苏州银行',
    '湖州银行',
    '泉州银行',
    '广州农村商业银行',
    '太仓农村商业银行',
    '烟台银行',
    '上饶银行',
    '绵阳市商业银行',
    '德州银行',
    '广西农村信用社',
    '柳州银行',
    '新韩银行中国',
    '长沙银行',
    '黄河农村商业银行',
    '鞍山银行',
    '龙江银行',
    '河北银行',
    '内蒙古银行',
    '吉林农村信用社',
    '浙江三门银座村镇银行',
    '东莞银行',
    '泰安银行',
    '桂林银行股份有限公司',
    '昆山农村商业银行',
    '攀枝花市商业银行',
    '西安银行',
    '营口银行',
    '江苏省农村信用社联合社',
    '顺德农村商业银行',
    '张家港农村商业银行',
    '重庆黔江银座村镇银行',
    '临商银行',
    '洛阳银行',
    '邢台银行',
    '韩亚银行',
    '广西北部湾银行',
    '张家口市商业银行',
    '珠海华润银行',
    '天津银行',
    '阜新银行',
    '吴江农村商业银行',
    '友利银行',
    '北京顺义银座村镇银行',
    '晋商银行',
    '赣州银行',
    '鄞州银行',
    '兰州银行',
    '锦州银行',
    '邯郸市商业银行',
    '深圳福田银座村镇银行',
    '东莞农村商业银行',
    '乌鲁木齐市商业银行',
    '浙江景宁银座村镇银行',
    '威海市商业银行',
    '海南省农村信用社',
    '商丘银行',
    '鄂尔多斯银行',
    '江西赣州银座村镇银行',
    '天津农商银行',
    '重庆银行',
    '宁夏银行',
    '浙江民泰商业银行',
    '长城华西银行',
    '廊坊银行',
    '沧州银行',
    '福建海峡银行',
    '嘉兴银行',
    '吉林银行',
    '青海银行',
    '重庆渝北银座村镇银行',
    '枣庄银行',
    '武汉农村商业银行',
    '重庆三峡银行',
    '南洋商业银行',
    '恒生银行',
    '集友银行',
    '大众银行',
    '永亨银行',
    '上海商业银行',
    '永隆银行',
    '中信嘉华银行',
    '华南商业银行',
    '保定银行',
    '上海华瑞银行',
    '九江银行',
    '江西省农村信用社',
    '广东省农村信用社',
    '河南省农村信用社',
    '辽宁省农村信用社',
    '黑龙江省农村信用社',
    '湖南省农村信用社',
    '河北省农村信用社',
    '甘肃省农村信用社',
    '山西省农村信用社',
    '陕西省农村信用社',
    '贵州省农村信用社',
    '内蒙古自治区农村信用社',
    '新疆自治区农村信用社',
    '四川省农村信用社',
    '成都农商银行',
    '长沙农商银行',
    '三亚农商银行',
    '浙江温州瓯海农村商业银行',
    '广东揭西农村商业银行',
    '吉安农村商业银行',
    '广西银海国民村镇银行',
    '宁夏中宁青银村镇银行',
    '湖南宁乡农村商业银行',
    '南宁市区农村信用合作联社',
    '雷山县农村信用合作联社西江信用社',
    '保亭黎族苗族自治县农村信用合作联社营业部',
    '湖南星沙农村商业银行',
    '新野县农村信用合作联社',
    '杭州联合银行',
    '赤壁农村商业银行',
    '甘肃陇西农村商业银行',
    '大理市农村商业银行',
    '广东翁源农村商业银行',
    '洛阳农村商业银行',
    '广东南海农村商业银行',
    '佛山市三水区农村信用社合作联社西南信用社',
    '贵州遵义汇川农村商业银行',
    '哈尔滨农村商业银行',
    '宁明县农村商业银行',
    '六盘水农村商业银行',
    '江西武宁农村商业银行',
    '勐海县农村信用合作联社',
    '浙江安吉农村商业银行',
    '贵州凯里农村商业银行',
    '台山市白沙农村信用合作联社白沙信用社',
    '韶关市新丰县农村信用合作联社',
    '青岛农村商业银行',
    '宣威市农村信用合作联社',
    '许昌农村商业银行',
    '河北高碑店农村商业银行',
    '四川峨眉山农村商业银行',
    '南宁市邕宁区农村信用合作联社五象信用社',
    '江苏江南农村商业银行股份公司',
    '雷山县农村信用合作联社',
    '江苏江阴农村商业银行股份有限公司',
    '华融湘江银行',
    '国家开发银行',
    '江苏泗阳农村商业银行',
    '温州民商银行',
    '汇丰银行',
    '创兴银行',
    '三菱日联银行(中国)有限公司',
    '大华银行(中国)有限公司',
    '星展银行',
    '厦门国际银行',
    '韶山光大村镇银行',
    '泸州市商业银行',
    '贵州银行',
    '中山农村商业银行股份有限公司',
    '山东临沂兰山农村合作银行',
    '苏州农村商业银行',
    '山东招远农村商业银行',
    '江西安义农村商业银行',
    '江苏紫金农村商业银行',
    '网商银行',
    '浙江衢州柯城农村商业银行',
    '甘肃银行',
    '山东威海农村商业银行',
    '四川天府银行',
    '山西临猗农村商业银行',
    '盛京银行',
    '武汉众邦银行',
    '焦作中旅银行',
    '江苏句容农村商业银行',
    '无锡农村商业银行',
    '姜堰农村商业银行',
    '宜兴农村商业银行',
    '邳州农村商业银行',
    '平顶山市新华区农村信用合作联社',
    '广西全州农村合作银行',
    '海南银行',
    '广西来宾桂中农村合作银行',
    '河北武强农村商业银行',
    '河南杞县农村商业银行',
    '安徽凤阳农村商业银行',
    '江苏宝应农村商业银行',
    '湖南常宁农村商业银行',
    '江苏滨海农村商业银行',
    '江苏阜宁农村商业银行',
    '贵州平塘农村商业银行',
    '湖南江永农村商业银行',
    '河南卢氏农村商业银行',
    '山西灵石农村商业银行',
    '浙江龙游农村商业银行',
    '广东阳山农村商业银行',
    '黄龙县农村信用合作联社',
    '贵阳观山湖富民村镇银行',
    '贵州普定农村商业银行',
    '贵州遵义农村商业银行',
    '徐州农商银行',
    '济南农村商业银行',
    '贵州瓮安农村商业银行',
    '石狮农村商业银行',
    '蒙商银行',
    '浙江舟山普陀农村商业银行',
    '内蒙古伊金霍洛农村商业银行',
    '郑州农村商业银行',
    '浙江长兴农村商业银行',
    '鄂尔多斯农村商业银行',
    '贵州修文农村商业银行',
    '四川南部农村商业银行',
    '巴彦淖尔河套农村商业银行',
    '眉山农村商业银行',
    '衡阳农村商业银行',
    '广西贵港荷城农村商业银行',
    '贵州龙里农村商业银行',
    '湖南三湘银行',
    '贵阳农村商业行',
    '洪洞县洪都村镇银行',
    '唐山银行',
    '南昌银行',
    '珠海农村商业银行',
    '中信百信银行',
    '江苏东台农村商业银行',
    '湖南临湘农村商业银行',
    '阿拉善右旗农村信用合作联社',
    '四川阆中农村商业银行股份有限公司',
    '泸州银行股份有限公司',
    '广西柳江农村合作银行',
    '福建晋江农村商业银行股份有限公司',
    '浙江平阳浦发村镇银行股份有限公司',
    '邯郸银行股份有限公司',
    '宁波通商银行股份有限公司',
    '辽宁大石桥隆丰村镇银行股份有限公司',
    '浙江温州龙湾农村商业银行股份有限公司',
    '中国农业发展银行',
    '亳州药都农村商业银行股份有限公司',
    '内江农村商业银行股份有限公司',
    '河南偃师农村商业银行股份有限公司',
    '合肥科技农村商业银行股份有限公司',
    '宁夏中宁农村商业银行股份有限公司',
    '包头农村商业银行股份有限公司',
    '湖北咸宁农村商业银行股份有限公司',
    '广东怀集农村商业银行股份有限公司',
    '平坝鼎立村镇银行有限责任公司',
    '陕西秦农农村商业银行股份有限公司',
    '河南宝丰农村商业银行股份有限公司',
    '山东青州农村商业银行',
    '宁夏盐池农村商业银行股份有限公司',
    '安徽泾县农村商业银行股份有限公司',
    '天津滨海农村商业银行股份有限公司',
    '大连农村商业银行',
    '青海省农村信用社联合社',
    '江苏丹阳农村商业银行股份有限公司',
    '山西太谷农村商业银行股份有限公司',
    '环县农村信用合作联社',
    '雅安市商业银行股份有限公司',
    '山东沂水农村商业银行',
    '贵州织金农村商业银行股份有限公司',
    '辉县珠江村镇银行股份有限公司',
    '福建南安农村商业银行股份有限公司',
    '河南正阳农村商业银行股份有限公司',
    '湖北监利农村商业银行股份有限公司',
    '内蒙古呼和浩特金谷农村商业银行股份有限公司',
    '河南叶县农村商业银行股份有限公司',
    '湖南汨罗农村商业银行股份有限公司',
    '江苏扬州农村商业银行股份有限公司',
    '江苏江都农村商业银行股份有限公司',
    '泰安泰山农村商业银行',
    '河南沁阳农村商业银行股份有限公司',
    '重庆市武隆融兴村镇银行有限责任公司',
    '湖北宜城农村商业银行股份有限公司',
    '南阳村镇银行股份有限公司',
    '重庆九龙坡民泰村镇银行股份有限公司',
    '山东高唐农村商业银行',
    '陕西宝鸡渭滨农村商业银行股份有限公司',
    '江西余干农村商业银行股份有限公司',
    '山东莘县农村商业银行',
    '湖南耒阳农村商业银行股份有限公司',
    '盘锦银行股份有限公司',
    '哈密市商业银行股份有限公司',
    '新疆银行股份有限公司',
    '辽宁大洼农村商业银行股份有限公司',
    '浙江禾城农村商业银行股份有限公司',
    '茂名电白长江村镇银行股份有限公司',
    '江苏泰兴农村商业银行股份有限公司',
    '福建漳州农村商业银行股份有限公司',
    '库尔勒银行股份有限公司',
    '太原市城区农村信用合作联社',
    '金华银行股份有限公司',
    '浙江义乌联合村镇银行股份有限公司',
    '本溪银行股份有限公司',
    '江西芦溪农村商业银行股份有限公司',
    '中银富登村镇银行股份有限公司',
    '湖南通道农村商业银行股份有限公司',
    '宁城蒙商村镇银行有限责任公司',
    '宣城皖南农村商业银行股份有限公司',
    '石嘴山银行股份有限公司',
    '广东廉江农村商业银行股份有限公司',
    '长治银行',
    '正蓝旗汇泽村镇银行有限责任公司',
    '盘锦农村商业银行股份有限公司',
    '浙江东阳农村商业银行股份有限公司',
    '广西巴马农村商业银行股份有限公司',
    '云南勐腊农村商业银行股份有限公司',
    '泉州农村商业银行股份有限公司',
    '广西贺州桂东农村合作银行',
    '新疆阿克苏农村商业银行股份有限公司',
    '遂宁农村商业银行股份有限公司',
    '广东罗定农村商业银行股份有限公司',
    '江苏兴化农村商业银行股份有限公司',
    '辽宁义县锦银村镇银行股份有限公司',
    '河南安阳商都农村商业银行股份有限公司',
    '黑龙江方正农村商业银行股份有限公司',
    '朝阳银行股份有限公司',
    '贵州天柱农村商业银行股份有限公司',
    '湘西长行村镇银行股份有限公司',
    '诏安县农村信用合作联社',
    '辽阳银行股份有限公司',
    '广西岑溪农村商业银行股份有限公司',
    '石家庄鹿泉农村商业银行股份有限公司',
    '湖南炎陵农村商业银行股份有限公司',
    '云南易门农村商业银行股份有限公司',
    '乐山嘉州民富村镇银行有限责任公司',
    '阆中市农村信用合作联社',
    '湖北襄阳农村商业银行股份有限公司',
    '宁波市市区农村信用合作联社',
    '湖北枣阳农村商业银行股份有限公司',
    '安徽旌德农村商业银行股份有限公司',
    '山西繁峙农村商业银行股份有限公司',
    '湖北当阳农村商业银行股份有限公司',
    '贵州玉屏农村商业银行股份有限公司',
    '河南镇平农村商业银行股份有限公司',
    '额敏县农村信用合作联社',
    '潍坊农村商业银行',
    '泰安岱岳农村商业银行',
    '山东肥城农村商业银行',
    '海南文昌农村商业银行股份有限公司',
    '湖南洞口农村商业银行股份有限公司',
    '河南扶沟农村商业银行股份有限公司',
    '抚顺银行股份有限公司',
    '晋中银行股份有限公司',
    '深圳宝安桂银村镇银行股份有限公司',
    '西藏银行股份有限公司',
    '新疆汇和银行股份有限公司',
    '富邦华一银行有限公司',
    '乐山市商业银行股份有限公司',
    '广东陆河农村商业银行股份有限公司',
    '佛山农村商业银行股份有限公司',
    '江西赣昌农村商业银行股份有限公司',
    '江苏镇江农村商业银行股份有限公司',
    '台安县农村信用合作社联合社',
    '山西洪洞农村商业银行股份有限公司',
    '贵州三穗农村商业银行股份有限公司',
    '乌鲁木齐银行股份有限公司',
    '深圳前海微众银行股份有限公司',
    '山东张店农村商业银行',
    '东营莱商村镇银行股份有限公司',
    '山东利津农村商业银行',
    '山东滕州农村商业银行',
    '枣庄农村商业银行',
    '山东高密农村商业银行',
    '山东平邑农村商业银行',
    '菏泽农村商业银行',
    '山东嘉祥农村商业银行',
    '山东邹城农村商业银行',
    '四川广汉农村商业银行股份有限公司',
    '驻马店农村商业银行股份有限公司',
    '德州农村商业银行',
    '山东茌平农村商业银行',
    '舒兰吉银村镇银行股份有限公司',
    '烟台农村商业银行',
    '聊城农村商业银行',
    '郓城北海村镇银行股份有限公司',
    '潮州农村商业银行股份有限公司',
    '山东宁阳农村商业银行',
    '贵州乌当农村商业银行股份有限公司',
    '河南长葛农村商业银行股份有限公司',
    '贵州独山农村商业银行股份有限公司',
    '广东新兴农村商业银行股份有限公司',
    '广西田阳农村商业银行股份有限公司',
    '江苏盐城农村商业银行股份有限公司',
    '江西裕民银行股份有限公司',
    '定兴县农村信用联社股份有限公司',
    '云南云县农村商业银行股份有限公司',
    '山东曹县农村商业银行',
    '江苏淮安农村商业银行股份有限公司',
    '西华县农村信用合作社联合社',
    '广西桂林漓江农村合作银行',
    '贵州三都农村商业银行股份有限公司',
    '广西宜州农村合作银行',
    '厦门农村商业银行股份有限公司',
    '鞍山农村商业银行股份有限公司',
    '浙江杭州余杭农村合作银行',
    '吉林省农村信用社联合社',
    '江苏丰县农村商业银行股份有限公司',
    '北京中关村银行股份有限公司',
    '大同银行股份有限公司',
    '正阳玉川村镇银行股份有限公司',
    '丹东银行股份有限公司',
    '福建华通银行股份有限公司',
    '海口联合农村商业银行股份有限公司',
    '衡水银行股份有限公司',
    '吉林亿联银行股份有限公司',
    '平顶山银行股份有限公司',
    '秦皇岛银行股份有限公司',
    '四川新网银行股份有限公司',
    '遂宁银行股份有限公司',
    '天津金城银行股份有限公司',
    '铁岭银行股份有限公司',
    '阳泉市商业银行股份有限公司',
    '营口沿海银行股份有限公司',
    '榆次融信村镇银行',
    '云南红塔银行股份有限公司',
    '长葛轩辕村镇银行',
    '重庆富民银行股份有限公司',
    '山西忻州农村商业银行股份有限公司',
    '江苏高邮农村商业银行股份有限公司',
    '山西尧都农村商业银行股份有限公司',
    '浙江台州椒江农村商业银行股份有限公司',
    '宜章长行村镇银行股份有限公司',
    '深圳宝安融兴村镇银行有限责任公司',
    '甘肃临泽农村商业银行股份有限公司',
    '福建莆田农村商业银行股份有限公司',
    '自贡农村商业银行股份有限公司',
    '安徽霍邱农村商业银行股份有限公司',
    '庆城县农村信用合作联社',
    '湖北孝感农村商业银行股份有限公司',
    '安徽利辛农村商业银行股份有限公司',
    '贵州花溪农村商业银行股份有限公司',
    '贵州湄潭农村商业银行股份有限公司',
    '东方市农村信用合作联社',
    '湖南新宁潭农商村镇银行股份有限公司',
    '湖南新宁农村商业银行股份有限公司',
    '宁波慈溪农村商业银行股份有限公司',
    '湛江农村商业银行股份有限公司',
    '固安恒升村镇银行股份有限公司',
    '东营农村商业银行',
    '广东清远农村商业银行股份有限公司',
    '蒙自沪农商村镇银行股份有限公司',
    '福建福清泰隆村镇银行有限责任公司',
    '济宁儒商村镇银行股份有限公司',
    '广东揭东农村商业银行股份有限公司',
    '福建仙游农村商业银行股份有限公司',
    '樟树顺银村镇银行股份有限公司',
    '云南凤庆农村商业银行股份有限公司',
    '施秉县农村信用合作联社',
    '湖北谷城农村商业银行股份有限公司',
    '山东郓城农村商业银行',
    '曲靖市商业银行',
    '湖南岳阳巴陵农村商业银行股份有限公司',
    '济宁农村商业银行',
    '湖州吴兴农村商业银行股份有限公司',
    '河北香河农村商业银行股份有限公司',
    '河南汴京农村商业银行股份有限公司',
    '浙江桐乡农村商业银行股份有限公司',
    '浙江桐庐农村商业银行股份有限公司',
    '云南玉龙农村商业银行股份有限公司',
    '江西安福农村商业银行股份有限公司',
    '湖北红安长江村镇银行股份有限公司',
    '湖北鹤峰农村商业银行股份有限公司',
    '湖北红安农村商业银行股份有限公司',
    '河南武陟农村商业银行股份有限公司',
    '巨野中银富登村镇银行',
    '禄劝彝族苗族自治县农村信用合作联社',
    '湖南蓝山农村商业银行股份有限公司',
    '湖南浏阳农村商业银行股份有限公司',
    '肇庆农村商业银行股份有限公司',
    '福建政和泰隆村镇银行有限责任公司',
];

export const industryOptions = [
    {
        id: 1,
        label: '企业',
        children: [
            {
                code: '1000',
                category: '游戏、网络虚拟（在线图书/视频/音乐、游戏、网络直播、门户论坛、网络广告及推广、软件开发）、电商团购、财经资讯/荐股、众筹、电信运营商/宽带收费、机票/机票代理、共享服务、网购平台、在线信息服务平台、O2O平台、信用还款',
            },
            {
                code: '1016',
                category: '保险公司、保险代理公司',
            },
            {
                code: '1017',
                category: '餐饮、零售批发、交通出行、生活娱乐服务、民营医疗机构、缴费、加油、物流快递等业务',
            },
            {
                code: '1067',
                category: '民办中小学、幼儿园业务',
            },
            {
                code: '1069',
                category: '水电煤暖气民生缴费、交通罚款、公交/高速',
            },
            {
                code: '1072',
                category: '电商及游戏行业',
            },
        ],
    },
    {
        id: 2,
        label: '个体',
        children: [
            {
                code: '1074',
                category: '电商团购、电信运营商/宽带收费、机票/机票代理',
            },
            {
                code: '1077',
                category: '餐饮、零售批发、交通出行、生活娱乐服务、民营医疗机构、缴费等业务',
            },
        ],
    },
    {
        id: 3,
        label: '个人',
        children: [
            {
                code: '1000',
                category: '游戏、网络虚拟（在线图书/视频/音乐、游戏、网络直播、门户论坛、网络广告及推广、软件开发）、电商团购、财经资讯/荐股、众筹、电信运营商/宽带收费、机票/机票代理、共享服务、网购平台、在线信息服务平台、O2O平台、信用还款',
            },
            {
                code: '1016',
                category: '保险公司、保险代理公司',
            },
            {
                code: '1017',
                category: '餐饮、零售批发、交通出行、生活娱乐服务、民营医疗机构、缴费、加油、物流快递等业务',
            },
            {
                code: '1067',
                category: '民办中小学、幼儿园业务',
            },
            {
                code: '1069',
                category: '水电煤暖气民生缴费、交通罚款、公交/高速',
            },
            {
                code: '1072',
                category: '电商及游戏行业',
            },
            {
                code: '1074',
                category: '电商团购、电信运营商/宽带收费、机票/机票代理',
            },
            {
                code: '1077',
                category: '餐饮、零售批发、交通出行、生活娱乐服务、民营医疗机构、缴费等业务',
            },
        ],
    },
];
