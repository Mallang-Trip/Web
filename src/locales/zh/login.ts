const login = {
  metadata: {
    title: `登录`,
  },
  // Login page
  page: {
    title: `登录`,
    description: `请使用电话号码验证登录。`,
    loadingText: `加载中...`,
  },
  // Phone number input
  phoneNumber: {
    label: `国际电话号码 *`,
    placeholder: `只输入数字（不含'-'）`,
    customInput: `自定义`,
    customInputAriaLabel: `直接输入国家代码`,
    sendButton: `发送验证码`,
    sendingButton: `发送中...`,
  },
  // OTP input
  otp: {
    label: `验证码`,
    verifyButton: `验证`,
    verifyingButton: `验证中...`,
  },
  // Terms dialog
  termsDialog: {
    title: `条款同意`,
    description: `请同意以下必需条款以使用服务。`,
    agreeAll: `同意以下所有条款。`,
    required: `[必填]`,
    confirmButton: `同意并继续`,
    terms: {
      service: `MallangTrip旅游服务条款`,
      travel: `MallangTrip旅游国内旅行标准条款`,
      privacy: `个人信息收集和使用协议`,
      thirdparty: `第三方个人信息提供协议`,
    },
  },
  // Toast messages
  toast: {
    // Code sending
    invalidCountryCode:
      `请以'+数字'格式输入国家代码。例：+82`,
    codeSent: `验证码已发送。`,
    codeSendFailed: `发送验证码失败`,
    codeSendFailedDescription: `未能发送验证码。`,
    // Verification failed
    verificationFailed: `验证码不正确。`,
    verificationFailedDescription: `请重新检查。`,
    sessionNotFound:
      `未找到验证会话。请请求新验证码。`,
    maxAttemptsExceeded:
      `超过最大尝试次数。请请求新验证码。`,
    codeNotMatch: `验证码不匹配。请重试。`,
    // New user
    firstTimeLogin: `这是您的首次登录。需要同意条款。`,
    // Login success
    verificationSuccess: `验证完成。`,
    verificationSuccessDescription: `登录成功。`,
    // Terms agreement
    agreeToTerms: `请同意所有条款。`,
    agreeToTermsDescription: `请勾选所有[必填]项目。`,
    cannotFindLoginInfo: `找不到登录信息。`,
    signupAndLoginSuccess: `注册和登录完成`,
    signupAndLoginSuccessDescription:
      `条款同意完成并已登录。`,
    // Other errors
    tokenError: `无法验证令牌信息。`,
  },
};

export default login;
