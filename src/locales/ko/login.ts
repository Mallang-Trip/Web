const login = {
  metadata: {
    title: "로그인",
  },
  // 로그인 페이지
  page: {
    title: "로그인",
    description: "전화번호 인증으로 로그인을 진행해주세요.",
    loadingText: "로딩 중...",
  },
  // 전화번호 입력
  phoneNumber: {
    label: "국제 전화번호 *",
    placeholder: "'-' 제외 숫자만 입력",
    customInput: "직접 입력",
    customInputAriaLabel: "국가 번호 직접 입력",
    sendButton: "인증번호 전송",
    sendingButton: "전송 중...",
  },
  // OTP 입력
  otp: {
    label: "인증번호",
    verifyButton: "인증하기",
    verifyingButton: "인증 중...",
  },
  // 약관 동의 다이얼로그
  termsDialog: {
    title: "약관 동의",
    description: "서비스 이용을 위해 아래 필수 약관에 동의해 주세요.",
    agreeAll: "아래 약관에 모두 동의합니다.",
    required: "[필수]",
    confirmButton: "동의하고 계속하기",
    terms: {
      service: "말랑트립 투어 서비스 이용약관",
      travel: "말랑트립 투어 국내여행 표준약관",
      privacy: "개인정보 수집·이용 동의",
      thirdparty: "개인정보 제3자 제공 동의",
    },
  },
  // 토스트 메시지
  toast: {
    // 인증번호 전송
    invalidCountryCode: "국가 번호를 '+숫자' 형식으로 입력해주세요. 예: +82",
    codeSent: "인증번호가 전송되었습니다.",
    codeSendFailed: "인증번호 전송 실패",
    codeSendFailedDescription: "인증번호 전송에 실패했습니다.",
    // 인증 실패
    verificationFailed: "인증번호가 올바르지 않습니다.",
    verificationFailedDescription: "다시 확인해주세요.",
    sessionNotFound:
      "인증 세션을 찾을 수 없습니다. 인증번호를 다시 요청해주세요.",
    maxAttemptsExceeded:
      "최대 시도 횟수를 초과했습니다. 새로운 인증번호를 요청해주세요.",
    codeNotMatch: "인증코드가 일치하지 않습니다. 다시 입력해주세요.",
    // 신규 사용자
    firstTimeLogin: "최초 로그인입니다. 약관 동의가 필요합니다.",
    // 로그인 성공
    verificationSuccess: "인증이 완료되었습니다.",
    verificationSuccessDescription: "로그인이 성공적으로 완료되었습니다.",
    // 약관 동의
    agreeToTerms: "약관에 모두 동의해주세요.",
    agreeToTermsDescription: "[필수] 항목들을 확인 후 체크해주세요.",
    cannotFindLoginInfo: "로그인 정보를 확인할 수 없습니다.",
    signupAndLoginSuccess: "회원가입 및 로그인 완료",
    signupAndLoginSuccessDescription: "약관 동의가 완료되어 로그인되었습니다.",
    // 기타 에러
    tokenError: "토큰 정보를 확인할 수 없습니다.",
  },
};

export default login;
