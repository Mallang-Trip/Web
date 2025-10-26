const result = {
  metadata: {
    title: `我的预订`,
  },
  // Page loading
  loading: {
    preparing: `正在准备预订信息...`,
    fetching: `正在加载预订信息...`,
    general: `加载中...`,
    canceling: `正在取消...`,
    saving: `正在保存...`,
    issuing: `正在发放...`,
  },

  // Reservation info card
  reservationInfo: {
    title: `预订信息`,
    canceled: `已取消`,
    tourName: `旅游名称`,
    booker: `预订人`,
    phone: `电话号码`,
    participants: `参加人数`,
    people: `人`,
    tourDate: `旅游日期`,
    pickupLocation: `接送地点`,
    dropLocation: `下车地点`,
    requests: `特殊要求`,
    tourFee: `旅游费用`,
    noRequests: `-`,
  },

  // Driver info card
  driverInfo: {
    title: `分配的司机`,
    vehicleNumber: `车辆号码`,
    phoneNumber: `电话号码`,
    phoneCopied: `电话号码已复制。`,
    copyFailed: `复制失败。`,
    vehiclePhotos: `车辆照片`,
    photoCount: `张`,
    vehicleImage: `车辆图片`,
    copyPhone: `复制电话号码`,
    breweries: `酒厂参观`,
    breweriesCount: `个`,
    notAssigned: `尚未分配司机`,
    notAssignedDesc:
      `预订确认后将为您分配司机。`,
    notAssignedCanceledDesc:
      `您的预订已被取消。未分配司机。`,
  },

  // Payment info card
  paymentInfo: {
    title: `支付信息`,
    status: `支付状态`,
    approvalDate: `批准时间`,
    refundDate: `退款时间`,
    paymentMethod: `支付方式`,
    paymentAmount: `支付金额`,
    card: `信用卡`,
    issueStatement: `发放交易明细`,
    statementTitle: `交易明细`,
    onsitePaymentTitle: `额外支付通知`,
    onsitePaymentDesc:
      `基本旅游费用以外的额外服务费用（如额外的接送地点）将在预订确认前由MallangTrip通过电子邮件和电话单独通知。`,
    statusCompleted: `支付完成`,
    statusRefunded: `已退款`,
    statusPending: `等待批准`,
  },

  // Transaction statement
  transactionStatement: {
    errorLoading: `加载交易明细失败。`,
    invoiceNo: `发票编号`,
    date: `日期`,
    to: `收件人`,
    dear: `先生/女士`,
    supplier: `供应商`,
    customer: `客户`,
    businessName: `公司名称`,
    businessNumber: `营业执照号码`,
    representative: `代表人`,
    address: `地址`,
    contact: `联系方式`,
    email: `电子邮箱`,
    bookerName: `姓名`,
    passengers: `乘客人数`,
    peopleCount: `人`,
    totalAmount: `总金额`,
    transactionDetails: `交易明细`,
    transactionDate: `日期`,
    itemName: `项目`,
    specification: `说明（旅游日期）`,
    quantity: `数量`,
    pricePerPerson: `每人价格`,
    supplyAmount: `金额`,
    taxAmount: `税费`,
    total: `合计`,
    remarks: `备注`,
    inclusions: `1. 包含项目：`,
    inclusionsList: {
      vehicle: `私人车辆和专业司机（门到门服务）`,
      fuel: `所有燃料、停车和通行费`,
      // guide: `专业英语导游服务`,
      brewery:
        `由Mallangtrip精选的2个酒厂的参观和体验费用（含品尝）`,
      // water: `车内瓶装水`,
      lunch: `午餐`,
    },
    exclusions: `2. 不包含项目：`,
    exclusionsList: {
      meals: `所有餐饮费用（午餐、晚餐等）`,
      lunch: `包含午餐，不包含晚餐`,
      personal: `个人费用和旅游保险`,
      additional:
        `指定接送区域外的额外移动费用`,
    },
    paymentInformation: `3. 支付信息：`,
    paymentMethod: `支付方式：信用卡`,
    paymentDateTime: `支付日期：`,
    cancellationPolicy: `4. 取消和退款政策：`,
    cancellationList: {
      fullRefund: `旅游日期前4天取消：全额退款`,
      noRefund:
        `旅游日期前3天内取消：不可退款`,
    },
    confirmation: `本明细确认上述交易。`,
    companyName: `Mallangtrip`,
    supplierInfo: {
      businessName: `Mallangtrip`,
      businessNumber: `399-51-00784`,
      representative: `Jeyoon Kim`,
      address:
        `大韩民国京畿道安养市东安区市民大路327号街11-41，310号`,
      contact: `+82-507-1344-4159`,
      email: `mallangtrip@mallangtrip.com`,
    },
  },

  // Reservation actions
  actions: {
    cancel: `取消预订`,
    edit: `编辑预订`,
    viewAllReservations: `查看所有预订`,
    cancelDialogTitle: `取消此预订？`,
    cancelDialogDesc: `您确定要取消此预订吗？`,
    cancelDialogWarning: `已取消的预订无法恢复。`,
    cancelDialogNo: `否`,
    cancelDialogYes: `取消预订`,
    authRequiredTitle: `需要电话验证`,
    authRequiredDesc:
      `您需要登录（电话验证）才能继续。是否继续？`,
    authRequiredNo: `否`,
    authRequiredYes: `是，继续`,
  },

  // Edit dialog
  editDialog: {
    title: `编辑预订信息`,
    pendingOnly: `只能在等待状态下编辑。`,
    pendingOnlyFull: `只能在等待批准状态下编辑。`,
    reservationName: `预订名称`,
    meetingDate: `见面日期`,
    meetingTime: `见面时间`,
    participants: `参加人数`,
    participantPlaceholder: `选择参加人数`,
    people2: `2人`,
    people3: `3人`,
    people4: `4人`,
    people5: `5人`,
    people6: `6人`,
    people7: `7人`,
    people8: `8人`,
    people9Plus: `9人以上（请联系我们）`,
    totalAmount: `总金额（$）`,
    pickupAddress: `接送地址`,
    returnAddress: `返回地址`,
    requests: `特殊要求`,
    cancel: `取消`,
    save: `保存`,
    saving: `正在保存...`,
    groupContactError:
      `9人或以上的团体，请联系客服。`,
    updateSuccess: `预订更新成功。`,
    updateError: `预订更新失败。`,
    notFound: `未找到预订。`,
    cannotModify: `当前状态下无法修改。`,
    tryAgain: `请稍后再试。`,
  },

  // Reservation list drawer
  listDrawer: {
    title: `我的预订`,
    description: `查看您的预订记录并选择查看详情。`,
    empty: `未找到预订`,
    emptyDesc: `立即预订新旅程！`,
    canceled: `已取消`,
    paymentDate: `支付日期：`,
    meetingPlace: `见面地点：`,
    dropPlace: `下车地点：`,
  },

  // Not Found
  notFound: {
    title: `未找到预订`,
    noReservations: `您还没有预订。立即预订新旅程！`,
    invalidAccess: `无效的预订ID或您没有访问权限。`,
    viewReservations: `查看我的预订`,
    goHome: `返回首页`,
  },

  // Reservation hero
  hero: {
    reservationDate: `预订日期：`,
    cancelDate: `取消时间：`,
    statusBadgeLabel: `状态`,
    receiptMessage: {
      pending: `预订信息已发送到您的电子邮箱。`,
      approved: `您的预订已获批准。请查看您的电子邮箱。`,
      rejected:
        `您的预订已被拒绝。请查看您的电子邮箱了解详情。`,
      canceled:
        `您的预订已被取消。请查看您的电子邮箱了解退款信息。`,
      default: `预订信息已发送到您的电子邮箱。`,
    },
  },

  // Toast messages
  toast: {
    cancelSuccess: `预订取消成功。`,
    cancelSuccessDesc:
      `已取消的预订可以在您的预订记录中查看。`,
    cancelError: `取消时发生错误。`,
    noPermission: `您没有取消权限。`,
    notFound: `未找到预订。`,
    cannotCancel: `当前状态下无法取消。`,
    tryAgain: `请稍后再试。`,
  },

  // Reservation status
  status: {
    pending: {
      title: `🎉 预订申请已提交！`,
      label: `等待确认`,
      message:
        `我们将在24小时内（工作日）确认您的预订。`,
    },
    approved: {
      title: `✅ 预订已批准`,
      label: `已批准`,
      message: `您的预订已获批准。`,
    },
    rejected: {
      title: `❌ 预订被拒绝`,
      label: `已拒绝`,
      message:
        `您的预订已被拒绝。款项将在3个工作日内退还。`,
    },
    canceled: {
      title: `❌ 预订已取消`,
      label: `已取消`,
      message:
        `您的预订已被取消。款项将在3个工作日内退还。`,
    },
    default: {
      title: `🎉 预订状态`,
      label: `状态`,
      message: `祝您旅途愉快！`,
    },
  },
};

export default result;
