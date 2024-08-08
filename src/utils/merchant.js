const validatorCustomer = (rule, value, callback) => {
    let tel = /^0\d{2,3}-?\d{7,8}$/;
    let phone = /^1(3\d|4[0-9]|5[0-35-9]|6[0-9]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    if (phone.test(value) || tel.test(value)) {
        callback();
    }
    callback(new Error('客服号码格式错误'));
};

export default {
    licenceInfo: [
        {
            type: 'select',
            label: '客户类型',
            key: 'customerType',
            role: [1, 2, 3],
            selectOptions: [
                {
                    label: '企业',
                    value: 1,
                },
                {
                    value: 2,
                    label: '个体',
                },
                {
                    value: 3,
                    label: '个人',
                },
            ],
        },
        {
            type: 'radio',
            label: '账户类型',
            key: 'bankAccountType',
            disabled: true,
            role: [1, 2, 3],
            radioOptions: [
                {
                    label: '对公',
                    value: 1,
                },
                {
                    label: '对私',
                    value: 2,
                },
            ],
            validate: [
                {
                    required: true,
                    message: '请选择账户类型',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: 'input',
            label: '营业执照注册地址',
            key: 'licenceAddress',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请填写营业执照注册地址',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者姓名',
            key: 'manageName',
            type: 'input',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写经营者姓名',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/,
                    message: '经营者姓名格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            label: '经营类目编码',
            key: 'businessCategoryCode',
            type: 'selectIndustry',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请选择经营类目编码',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者手机号',
            key: 'manageMobile',
            type: 'input',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写经营者手机号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^1(3\d|4[0-9]|5[0-35-9]|6[0-9]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                    message: '经营者手机号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            label: '营业执照编码',
            key: 'licenceCode',
            type: 'input',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请填写营业执照编码',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者证件号',
            key: 'manageIdCard',
            type: 'input',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写经营者证件号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^\d{17}[\d|x|X]|\d{15}$/,
                    message: '经营者证件号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            label: '营业执照区划编码',
            key: 'licenceRegionCode',
            type: 'area',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请选择营业执照区划编码',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者区划编码',
            key: 'manageRegionCode',
            type: 'area',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请选择经营者区划编码',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '营业执照有效期类型',
            key: 'licenceValidType',
            type: 'radio',
            role: [1, 2],
            radioOptions: [
                {
                    value: 1,
                    label: '定期',
                },
                {
                    value: 2,
                    label: '长期',
                },
            ],
            validate: [
                {
                    required: true,
                    message: '请选择营业执照有效期类型',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者所在详细地址',
            key: 'manageDetailAddress',
            type: 'input',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写经营者所在详细地址',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '营业执照有效日期',
            key: 'licenceValidBegin',
            key2: 'licenceValidEnd',
            isShowEndKey: 'licenceValidType',
            type: 'date',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请选择营业执照有效日期',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者证件有效期类型',
            key: 'manageIdCardValidType',
            type: 'radio',
            role: [1, 2, 3],
            radioOptions: [
                {
                    value: 1,
                    label: '定期',
                },
                {
                    value: 2,
                    label: '长期',
                },
            ],
            validate: [
                {
                    required: true,
                    message: '请选择经营者证件有效期类型',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            role: [1, 2, 3],
        },
        {
            label: '经营者证件有效日期',
            key: 'manageIdCardValidBegin',
            key2: 'manageIdCardValidEnd',
            isShowEndKey: 'manageIdCardValidType',
            type: 'date',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请选择经营者证件有效日期',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '营业执照',
            key: 'licenceImg',
            fileType: '01',
            type: 'upload',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请上传营业执照',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '开户许可证',
            key: 'regCertificateImg',
            fileType: '02',
            type: 'upload',
            role: [1, 2],
            bankAccountType: 1,
            // validate: [
            //     {
            //         required: true,
            //         message: '请上传开户许可证',
            //         trigger: ['change', 'blur'],
            //     },
            // ],
        },
        {
            role: [3],
        },
        {
            label: '经营者身份证正面',
            key: 'manageIdCardFrontImg',
            type: 'upload',
            fileType: '15',
            role: [2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传经营者身份证正面',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者身份证国徽面',
            key: 'manageIdCardBackImg',
            type: 'upload',
            fileType: '16',
            role: [2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传经营者身份证国徽面',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者手持身份证正面',
            key: 'manageHoldIdCardFrontImg',
            fileType: '17',
            type: 'upload',
            role: [2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传经营者手持身份证正面',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '经营者手持银行卡卡号面',
            key: 'manageHoldBankFrontImg',
            fileType: '18',
            type: 'upload',
            role: [2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传经营者手持银行卡卡号面',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '公司大楼图片',
            key: 'companyBuildImg',
            fileType: '10',
            type: 'upload',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请上传公司大楼图片',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '门头照',
            key: 'shopFrontImg',
            fileType: '03',
            type: 'upload',
            role: [2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传门头照',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '公司前台图片',
            key: 'companyFrontImg',
            fileType: '11',
            type: 'upload',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请上传公司前台图片',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '店内场景照',
            key: 'shopEnvImg',
            fileType: '04',
            type: 'upload',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传店内场景照',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '收银台图片',
            key: 'shopCashierImg',
            fileType: '05',
            type: 'upload',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传收银台图片',
                    trigger: ['change', 'blur'],
                },
            ],
        },
    ],
    personInfo: [
        {
            type: 'input',
            label: '法人名称',
            key: 'legalName',
            role: [1],
            validate: [
                {
                    required: true,
                    message: '请填写法人名称',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/,
                    message: '法人名称格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: 'input',
            label: '联系人名称',
            key: 'contactName',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写联系人名称',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFF]+$/,
                    message: '联系人名称格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: 'input',
            label: '法人手机号',
            key: 'legalMobile',
            role: [1],
            validate: [
                {
                    required: true,
                    message: '请填写法人手机号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^1(3\d|4[0-9]|5[0-35-9]|6[0-9]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                    message: '法人手机号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: 'input',
            label: '联系人手机号',
            key: 'contactMobile',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写联系人手机号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^1(3\d|4[0-9]|5[0-35-9]|6[0-9]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
                    message: '联系人手机号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: 'input',
            label: '法人证件号',
            key: 'legalIdCard',
            role: [1],
            validate: [
                {
                    required: true,
                    message: '请填写法人证件号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^\d{17}[\d|x|X]|\d{15}$/,
                    message: '法人证件号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: 'input',
            label: '联系人证件号',
            key: 'contactIdCard',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写联系人证件号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^\d{17}[\d|x|X]|\d{15}$/,
                    message: '联系人证件号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        // {
        //   type: "radio",
        //   label: "法人证件类型",
        //   key: "legalIdCardType",
        //   role: [1],
        //   radioOptions: [
        //     {
        //       value: 1,
        //       label: "身份证",
        //     },
        //   ],
        // },
        // {
        //   type: "radio",
        //   label: "联系人证件类型",
        //   key: "contactIdCardType",
        //   radioOptions: [
        //     {
        //       value: 1,
        //       label: "身份证",
        //     },
        //   ],
        // },
        {
            type: 'radio',
            label: '法人证件有效期类型',
            key: 'legalIdCardValidType',
            role: [1],
            radioOptions: [
                {
                    // 1=定期,2=长期
                    value: 1,
                    label: '定期',
                },
                {
                    value: 2,
                    label: '长期',
                },
            ],
            validate: [
                {
                    required: true,
                    message: '请选择法人证件有效期类型',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'radio',
            label: '联系人证件有效期类型',
            key: 'contactIdCardValidType',
            role: [1, 2, 3],
            radioOptions: [
                {
                    // 1=定期,2=长期
                    value: 1,
                    label: '定期',
                },
                {
                    value: 2,
                    label: '长期',
                },
            ],
            validate: [
                {
                    required: true,
                    message: '请选择联系人证件有效期类型',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'date',
            label: '法人证件日期',
            key: 'legalIdCardValidBegin',
            key2: 'legalIdCardValidEnd',
            isShowEndKey: 'legalIdCardValidType',
            role: [1],
            validate: [
                {
                    required: true,
                    message: '请选择法人证件有效日期',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'date',
            label: '联系人证件有效期',
            key: 'contactIdCardValidBegin',
            key2: 'contactIdCardValidEnd',
            isShowEndKey: 'contactIdCardValidType',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请选择联系人证件有效日期',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'input',
            label: '客户名称',
            key: 'customerName',
            role: [1, 2, 3],
            placeholder: '请填写客户名称',
            validate: [
                {
                    required: true,
                    message: '请填写客户名称',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^(?!\s*$)[A-Za-z0-9._\-\(\)\u4e00-\u9fa5\（）\s-]+$/,
                    message: '客户名称格式错误',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'input',
            label: '联系人邮箱/汇付宝账号',
            key: 'contactEmail',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写联系人邮箱/汇付宝账号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                    message: '联系人邮箱/汇付宝账号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            type: 'input',
            label: '客服电话',
            key: 'customerPhone',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请填写客服电话',
                    trigger: ['change', 'blur'],
                },
                {
                    validator: validatorCustomer,
                    trigger: 'blur',
                },
            ],
        },
        {
            type: 'input',
            label: '客户简称',
            key: 'customerShortName',
            role: [1, 2],
            validate: [
                {
                    required: true,
                    message: '请填写客户简称',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^[\u4e00-\u9fa5]{0,}$/,
                    message: '客户简称格式错误',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '法人身份证人像面',
            key: 'legalIdCardFrontImg',
            type: 'upload',
            fileType: '06',
            role: [1],
            validate: [
                {
                    required: true,
                    message: '请上传法人身份证人像面',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            label: '法人身份证国徽面',
            key: 'legalIdCardBackImg',
            type: 'upload',
            fileType: '07',
            role: [1],
            validate: [
                {
                    required: true,
                    message: '请上传法人身份证国徽面',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            role: [2, 3],
        },
        {
            label: '联系人身份证人像面',
            key: 'contactIdCardFrontImg',
            fileType: '08',
            type: 'upload',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传联系人身份证人像面',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        {
            label: '联系人身份证国徽面',
            key: 'contactIdCardBackImg',
            fileType: '09',
            type: 'upload',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请上传联系人身份证国徽面',
                    trigger: ['blur', 'change'],
                },
            ],
        },
    ],
    bankInfo: [
        {
            type: 'input',
            label: '结算银行账户名称',
            key: 'bankAccountName',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写结算银行账户名称',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^(?!\s*$)[A-Za-z0-9._\-\(\)\u4e00-\u9fa5\（）\s-]+$/,
                    message: '银行账户名称格式错误',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'area',
            label: '结算银行所属区划编码',
            key: 'bankRegionCode',
            role: [1, 2, 3],

            validate: [
                {
                    required: true,
                    message: '请选择结算银行所属区划编码',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        // {
        //   type: "input",
        //   label: "结算银行支行联行号",
        //   key: "bankBranchCode",
        // },
        {
            type: 'input',
            label: '结算银行卡号/账号',
            key: 'bankCardNo',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写结算银行卡号/账号',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^[0-9]{9,20}$/,
                    message: '银行卡号/账号格式错误',
                    trigger: ['blur', 'change'],
                },
            ],
        },
        // {
        //   type: "input",
        //   label: "银行城市代码",
        //   key: "bankCityCode",
        // },
        {
            type: 'selectFilter',
            label: '结算开户行名称',
            key: 'bankName',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请选择结算开户行名称',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'input',
            label: '微信公众号appid',
            key: 'wechatMchAppId',
            role: [1, 2, 3],
        },
        {
            type: 'input',
            label: '微信小程序appid',
            key: 'wechatSmallAppId',
            placeholder: '微信小程序appid，最多支持10个，中间用逗号分隔',
            role: [1, 2, 3],
            // validate: [
            //   {
            //     required: true,
            //     message: "请填写微信小程序appid",
            //     trigger: ["change", "blur"],
            //   },
            // ],
        },
        {
            type: 'input',
            label: '店铺名称',
            key: 'shopName',
            role: [1, 2, 3],
            validate: [
                {
                    required: true,
                    message: '请填写店铺名称',
                    trigger: ['change', 'blur'],
                },
                {
                    pattern: /^[\u00B7\u3007\u3400-\u4DBF\u4E00-\u9FFF\uE000-\uF8FF\uD840-\uD8C0\uDC00-\uDFFF\uF900-\uFAFFA-Za-z0-9]{0,}$/,
                    message: '店铺名称格式错误',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            type: 'select',
            label: '提现类型',
            key: 'withdrawType',
            disabled: true,
            role: [1, 2, 3],
            selectOptions: [
                {
                    label: '手动提现',
                    value: 1,
                },
                {
                    value: 2,
                    label: '自动提现',
                },
            ],
        },
        // {
        //   role: [2, 3],
        // },
        {
            label: '银行卡卡号面图片',
            key: 'bankFrontImg',
            fileType: '12',
            type: 'upload',
            role: [2, 3],
            bankAccountType: 2,
            validate: [
                {
                    required: true,
                    message: '请上传银行卡卡号面图片',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '银行卡磁条面图片',
            key: 'bankBackImg',
            fileType: '13',
            type: 'upload',
            role: [2, 3],
            bankAccountType: 2,
            validate: [
                {
                    required: true,
                    message: '请上传银行卡磁条面图片',
                    trigger: ['change', 'blur'],
                },
            ],
        },
        {
            label: '手持银行卡正面照',
            key: 'bankOwnerHoldImg',
            fileType: '14',
            type: 'upload',
            role: [2, 3],
            bankAccountType: 2,
            validate: [
                {
                    required: true,
                    message: '请上传手持银行卡正面照',
                    trigger: ['change', 'blur'],
                },
            ],
        },
    ],
};
