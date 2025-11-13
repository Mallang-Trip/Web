const common = {
  // Root metadata
  metadata: {
    title: "Mallangtrip",
    description: "比巴士快，比出租车便宜！出租车拼车旅行平台Mallangtrip",
  },
  // Common buttons
  button: {
    login: "登录",
    logout: "退出",
    signup: "注册",
    submit: "提交",
    cancel: "取消",
    confirm: "确认",
    close: "关闭",
    save: "保存",
    edit: "编辑",
    delete: "删除",
    search: "搜索",
    viewMore: "查看更多",
    bookNow: "立即预订",
    viewReservation: "查看预订",
    admin: "管理员",
  },
  // Common labels
  label: {
    name: "姓名",
    email: "电子邮箱",
    phone: "电话",
    password: "密码",
    date: "日期",
    time: "时间",
    message: "消息",
    price: "价格",
    startingPrice: "起价",
    duration: "时长",
    rating: "评分",
    reviews: "评价",
    language: "语言",
  },
  // Common messages
  message: {
    loading: "加载中...",
    noData: "暂无数据",
    error: "发生错误",
    success: "成功",
    confirm: "确定吗？",
  },
  // Currency
  currency: {
    krw: "₩",
    usd: "$",
  },
  // UI Components
  ui: {
    datePicker: {
      placeholder: "选择日期",
      prevMonth: "上个月",
      nextMonth: "下个月",
      monthFormat: (year: number, month: number) => {
        const monthNames = [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ];
        return `${year}年${monthNames[month - 1]}`;
      },
      weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    },
    timePicker: {
      placeholder: "选择时间",
    },
  },
  // Detail common components
  detail: {
    // Pickup/Dropoff areas guide
    pickupDropoff: {
      title: "接送服务区域",
      description: "在任何地方舒适地开始和结束您的旅程。",
      availableAreas: "服务可用区域",
      incheonSeoul: "📍 仁川和首尔：",
      incheonSeoulDesc: "全境",
      daejeonSejong: "📍 大田/世宗/忠南：",
      daejeonSejongDesc: "🚕 预订前请联系我们",
      gyeonggiSouth: "📍 京畿南部",
      gyeonggiSouthCities:
        "光明市、果川市、军浦市、广州市、金浦市、富川市、城南市、水原市、始兴市、安山市、安城市、安养市、骊州市、乌山市、龙仁市、义王市、利川市、平泽市、河南市、华城市",
      noticeTitle: "接送注意事项",
      noticeAlertTitle: "顺利进行旅游的重要信息",
      notice1:
        "接送地点可以无限制指定，但如果大幅偏离计划路线或涉及多次接送的情况，",
      notice1Bold: "可能会产生额外的移动费用",
      notice1End: "。",
      notice2:
        "为避免工作日上下班高峰时段和周末上午的交通拥堵，我们强烈建议将多次接送地点限制在",
      notice2Bold: "2个地点以内",
      notice2End: "。",
      included: "包含项目",
      excluded: "不包含项目",
    },
    // Booking sidebar/bottom bar
    booking: {
      baseRate: "基本",
      rate: "费用",
      bookNow: "立即预订",
      unavailable: "目前无法预订",
      approvalRequired: "批准后确认",
    },
    // Reviews section
    reviews: {
      title: "客户评价",
      photoAlt: "评价照片",
    },
    // Pricing section
    pricing: {
      title: "透明定价",
      item: "项目",
      description: "说明",
      paymentMethod: "付款方式",
      amount: "金额",
    },
    // Pictures section
    pictures: {
      title: "旅游图库",
      imageAlt: "图片",
    },
    // Features section
    features: {
      title: "Mallangtrip",
      titleSuffix: " 出租车旅游特色",
    },
    // Booking form
    bookingForm: {
      title: "预订",
      name: "姓名",
      phone: "电话",
      email: "电子邮箱",
      people: "人数",
      meetDate: "接送日期",
      meetTime: "接送时间",
      meetAddress: "接送地址",
      returnAddress: "送达地址",
      requests: "特殊要求 & 旅行码",
      required: "*",
      namePlaceholder: "张三",
      phonePlaceholder: "仅输入数字（不含连字符）",
      emailPlaceholder: "example@email.com",
      peoplePlaceholder: "选择人数",
      meetAddressPlaceholder: "请输入准确的酒店名称或地址",
      returnAddressPlaceholder: "请输入准确的酒店名称或地址",
      requestsPlaceholder: "请输入任何特殊要求，如饮食限制或过敏等",
      totalAmount: "总金额",
      inquiry: "联系咨询价格",
      agreeAll: "我同意以下所有条款。",
      agreeService: "Mallangtrip旅游服务条款",
      agreeTravel: "Mallangtrip国内旅行标准条款",
      agreePrivacy: "个人信息收集和使用协议",
      agreeThirdparty: "第三方信息共享协议",
      requiredLabel: "[必填]",
      submitButton: "前往支付",
      submitting: "支付处理中...",
      requiredNotice: "表示必填项",
      directInput: "自定义输入",
      // Validation messages
      validation: {
        nameRequired: "请输入您的姓名。",
        phoneRequired: "请输入您的电话号码。",
        phonePrefixInvalid: "请以'+数字'格式输入国家代码。例如：+82",
        emailRequired: "请输入您的电子邮箱。",
        peopleRequired: "请选择人数。",
        dateRequired: "请选择会面日期。",
        timeRequired: "请选择接送时间。",
        meetAddressRequired: "请输入接送地址。",
        returnAddressRequired: "请输入送达地址。",
        agreeServiceRequired: "请同意服务条款。",
        agreeTravelRequired: "请同意旅行标准条款。",
        agreePrivacyRequired: "请同意个人信息收集和使用。",
        agreeThirdpartyRequired: "请同意第三方信息共享。",
      },
      // Toast messages
      toast: {
        validationError: "请检查您的输入信息。",
        reservationSuccess: "预订完成！",
        reservationSuccessDesc: "支付确认后，您的预订已创建。",
        paymentFailed: "支付失败。",
        paymentFailedDesc: "请重试。",
        paymentError: "支付处理过程中发生错误。",
        paymentErrorDesc: "如果问题持续存在，请联系客服。",
        paymentConfirmFailed: "支付确认失败。",
        paymentConfirmFailedDesc: "请稍后重试。",
        paymentCancelled: "支付已取消或窗口已关闭。",
        paymentWindowOpened: "支付窗口已打开。请完成支付。",
        groupContactRequired: "9人及以上团体，请联系客服。",
        groupContactPhone: "电话：+82-507-1344-4159",
        invalidPaymentInfo: "支付准备信息无效。",
        reservationError: "预订处理过程中发生错误。",
        reservationConflict: "已存在活动预订或预订不可用。",
        destinationNotFound: "未找到目的地。",
        popupBlocked: "弹窗被拦截。",
        popupBlockedDesc: "请禁用弹窗拦截器后重试。",
      },
    },
  },
};

export default common;
