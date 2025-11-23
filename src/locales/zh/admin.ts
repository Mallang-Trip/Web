const admin = {
  metadata: {
    title: `管理员`,
  },
  // Page title
  pageTitle: `管理员 - 预订管理`,

  // Pagination
  pagination: {
    total: `共{{count}}项`,
    loading: `加载中...`,
    page: `第{{number}}页`,
    previous: `上一页`,
    next: `下一页`,
  },

  // Table headers
  table: {
    id: `ID`,
    reservationName: `预订名称`,
    reservedBy: `预订人`,
    contact: `联系方式`,
    datetime: `日期/时间`,
    pickupReturn: `接送/返回`,
    amount: `金额`,
    status: `状态`,
    action: `操作`,
    noResults: `未找到结果。`,
  },

  // Status
  status: {
    PENDING: `等待中`,
    APPROVED: `已批准`,
    REJECTED: `已拒绝`,
    CANCELED: `已取消`,
  },

  // Buttons
  button: {
    approve: `批准`,
    reject: `拒绝`,
    close: `关闭`,
    cancel: `取消`,
    add: `添加`,
    remove: `删除`,
    fileSelect: `选择文件`,
    processing: `处理中...`,
  },

  // Detail dialog
  detail: {
    title: `预订详情`,
    description: `查看完整的预订信息。`,
    reservationId: `预订ID`,
    reservationName: `预订名称`,
    email: `电子邮箱`,
    reservedBy: `预订人`,
    contact: `联系方式`,
    people: `人数`,
    meetingTime: `见面时间`,
    pickupAddress: `接送地址`,
    returnAddress: `返回地址`,
    requests: `特殊要求`,
    amount: `金额`,
    status: `状态`,
    createdAt: `创建时间`,
    requestedAt: `申请时间`,
    approvedAt: `批准时间`,
    rejectedAt: `拒绝时间`,
    canceledAt: `取消时间`,
    adminMemo: `管理员备忘录`,
  },

  // Approve dialog
  approve: {
    title: `批准预订`,
    description: `请输入司机信息和酒厂详情`,
    adminMemo: `管理员备忘录（可选）`,
    adminMemoPlaceholder: `输入管理员备忘录`,
    driverInfo: `司机信息`,
    driverName: `司机姓名`,
    driverNamePlaceholder: `输入司机姓名`,
    driverPhone: `司机电话`,
    driverPhonePlaceholder: `以+821012345678格式输入`,
    vehicleNumber: `车辆号码`,
    vehicleNumberPlaceholder: `12가3456`,
    vehicleImage: `车辆图片（可选）`,
    dragOrClick: `拖拽图片或点击上传`,
    uploading: `上传中...`,
    breweryInfo: `酒厂参观信息`,
    addBrewery: `添加酒厂`,
    breweryOrder: `酒厂 #{{number}}`,
    breweryName: `酒厂名称`,
    breweryNamePlaceholder: `酒厂名称`,
    breweryAddress: `酒厂地址`,
    breweryAddressPlaceholder: `酒厂地址`,
    noBreweries:
      `无酒厂信息。点击添加按钮以添加酒厂。`,
    required: `*`,
  },

  // Reject dialog
  reject: {
    title: `拒绝预订`,
    description: `拒绝原因为必填项，管理员备忘录为可选项。`,
    reason: `拒绝原因`,
    reasonRequired: `拒绝原因 *`,
    adminMemo: `管理员备忘录`,
  },

  // Waiting screen
  waiting: {
    loadingData: `正在加载数据...`,
    checkingAuth: `正在检查身份验证...`,
  },

  // Toast messages
  toast: {
    // Success
    approveSuccess: `预订已批准。`,
    rejectSuccess: `预订已拒绝。`,
    uploadSuccess: `成功上传{{count}}张图片。`,

    // Errors
    driverNameRequired: `请输入司机姓名。`,
    driverPhoneRequired: `请输入司机电话号码。`,
    vehicleNumberRequired: `请输入车辆号码。`,
    breweryInfoRequired: `请输入所有酒厂的名称和地址。`,
    rejectReasonRequired: `请输入拒绝原因。`,
    notImageFile: `{{filename}}不是图片文件。`,
    uploadError: `上传图片时发生错误。`,

    // Approve failure
    approveFailed: `批准预订失败`,
    reservationNotFound: `未找到预订。`,
    cannotApprove: `当前状态下无法批准。`,
    tryAgainLater: `请稍后再试。`,

    // Reject failure
    rejectFailed: `拒绝预订失败`,
    cannotReject: `当前状态下无法拒绝。`,
  },

  // Not Found page
  notFound: {
    title: `访问被拒绝`,
    description: `您没有访问此页面的权限。`,
    goHome: `返回首页`,
  },
};

export default admin;
