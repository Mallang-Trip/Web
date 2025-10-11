const common = {
  // 루트 메타데이터
  metadata: {
    title: "말랑트립",
    description:
      "버스보다 빠르고, 택시보다 저렴하게! 택시 카풀 여행 플랫폼 말랑트립",
  },
  // 공통 버튼
  button: {
    login: "로그인",
    logout: "로그아웃",
    signup: "회원가입",
    submit: "제출",
    cancel: "취소",
    confirm: "확인",
    close: "닫기",
    save: "저장",
    edit: "수정",
    delete: "삭제",
    search: "검색",
    viewMore: "더보기",
    bookNow: "지금 예약",
    viewReservation: "예약 조회",
    admin: "관리자",
  },
  // 공통 레이블
  label: {
    name: "이름",
    email: "이메일",
    phone: "전화번호",
    password: "비밀번호",
    date: "날짜",
    time: "시간",
    message: "메시지",
    price: "가격",
    startingPrice: "시작가",
    duration: "소요시간",
    rating: "평점",
    reviews: "리뷰",
    language: "언어",
  },
  // 공통 메시지
  message: {
    loading: "로딩 중...",
    noData: "데이터가 없습니다",
    error: "오류가 발생했습니다",
    success: "성공했습니다",
    confirm: "확인하시겠습니까?",
  },
  // 통화
  currency: {
    krw: "원",
    usd: "$",
  },
  // UI 컴포넌트
  ui: {
    datePicker: {
      placeholder: "날짜를 선택하세요",
      prevMonth: "이전 달",
      nextMonth: "다음 달",
      monthFormat: (year: number, month: number) => `${year}년 ${month}월`,
      weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    },
    timePicker: {
      placeholder: "시간을 선택하세요",
    },
  },
  // Detail 공통 컴포넌트
  detail: {
    // 픽업/드랍 지역 안내
    pickupDropoff: {
      title: "픽업/드랍 가능 지역 안내",
      description: "어디서든 편안하게 투어를 시작하고 마무리하세요.",
      availableAreas: "서비스 가능 지역",
      incheonSeoul: "📍 인천 & 서울:",
      incheonSeoulDesc: "전 지역",
      daejeonSejong: "📍 대전/세종/충남:",
      daejeonSejongDesc: "🚕 예약 전 별도 문의",
      gyeonggiSouth: "📍 경기 남부",
      gyeonggiSouthCities:
        "광명시, 과천시, 군포시, 광주시, 김포시, 부천시, 성남시, 수원시, 시흥시, 안산시, 안성시, 안양시, 여주시, 오산시, 용인시, 의왕시, 이천시, 평택시, 하남시, 화성시",
      noticeTitle: "픽업/드랍 유의사항",
      noticeAlertTitle: "원활한 투어 진행을 위한 안내",
      notice1:
        "픽업 및 드랍 장소는 횟수 제한 없이 지정 가능하지만, 반드시 위에 안내된 ",
      notice1Bold: "서비스 가능 지역 내",
      notice1End: "여야 합니다.",
      notice2: "평일 출퇴근 시간 및 주말 오전의 교통 체증을 고려하여, 가급적 ",
      notice2Bold: "여러 장소를 경유하는 픽업/드랍은 2회 이하",
      notice2End: "로 진행하시는 것을 적극적으로 권장합니다.",
      notice3:
        "계획된 경로를 크게 벗어나는 다회 픽업/드랍의 경우, 추가 이동에 대한 요금이 발생할 수 있습니다. 해당 요금은 예약 확정 전 저희가 별도 연락을 드려 사전 안내드리며, 이에 따라 추가 결제를 부탁드립니다.",
      included: "포함 내역",
      excluded: "불포함 내역",
    },
    // 예약 사이드바/하단바
    booking: {
      baseRate: "기본",
      rate: "요금",
      bookNow: "예약하기",
      unavailable: "현재 예약 불가능",
      approvalRequired: "예약 승인 후 확정",
    },
    // 리뷰 섹션
    reviews: {
      title: "생생한 이용 후기",
      photoAlt: "후기 사진",
    },
    // 가격 안내 섹션
    pricing: {
      title: "합리적인 요금 안내",
      item: "항목",
      description: "상세 내용",
      paymentMethod: "결제 방식",
      amount: "금액",
    },
    // 사진 섹션
    pictures: {
      title: "생생한 투어 사진",
      imageAlt: "이미지",
    },
    // 특징 섹션
    features: {
      title: "말랑트립",
      titleSuffix: " 택시투어만의 특별함",
    },
    // 예약 폼
    bookingForm: {
      title: "예약하기",
      name: "이름",
      phone: "국제 전화번호",
      email: "이메일",
      people: "참여 인원",
      meetDate: "미팅 날짜",
      meetTime: "픽업 시간",
      meetAddress: "픽업 주소",
      returnAddress: "복귀 주소",
      requests: "요청사항",
      required: "*",
      namePlaceholder: "홍길동",
      phonePlaceholder: "'-' 제외 숫자만 입력",
      emailPlaceholder: "example@email.com",
      peoplePlaceholder: "인원을 선택하세요",
      meetAddressPlaceholder: "정확한 호텔명 또는 주소를 입력하세요.",
      returnAddressPlaceholder: "정확한 호텔명 또는 주소를 입력하세요.",
      requestsPlaceholder:
        "식단 제한, 알러지 등 특이사항이 있으실 경우 반드시 입력해주세요",
      totalAmount: "총 결제 금액",
      inquiry: "별도 문의",
      agreeAll: "아래 약관에 모두 동의합니다.",
      agreeService: "말랑트립 투어 서비스 이용약관",
      agreeTravel: "말랑트립 투어 국내여행 표준약관",
      agreePrivacy: "개인정보 수집·이용 동의",
      agreeThirdparty: "개인정보 제3자 제공 동의",
      requiredLabel: "[필수]",
      submitButton: "결제하기",
      submitting: "결제 처리 중...",
      requiredNotice: "표시는 필수 입력 항목입니다",
      directInput: "직접 입력",
      // 유효성 검사 메시지
      validation: {
        nameRequired: "이름을 입력해주세요.",
        phoneRequired: "전화번호를 입력해주세요.",
        phonePrefixInvalid:
          "국가 번호를 '+숫자' 형식으로 입력해주세요. 예: +82",
        emailRequired: "이메일을 입력해주세요.",
        peopleRequired: "참여 인원을 선택해주세요.",
        dateRequired: "미팅 날짜를 선택해주세요.",
        timeRequired: "픽업 시간을 선택해주세요.",
        meetAddressRequired: "픽업 주소를 입력해주세요.",
        returnAddressRequired: "복귀 주소를 입력해주세요.",
        agreeServiceRequired: "서비스 이용약관에 동의해주세요.",
        agreeTravelRequired: "국내여행 표준약관에 동의해주세요.",
        agreePrivacyRequired: "개인정보 수집·이용에 동의해주세요.",
        agreeThirdpartyRequired: "개인정보 제3자 제공에 동의해주세요.",
      },
      // 토스트 메시지
      toast: {
        validationError: "입력 정보를 확인해주세요.",
        reservationSuccess: "예약이 완료되었습니다!",
        reservationSuccessDesc: "결제가 확인되어 예약이 생성되었습니다.",
        paymentFailed: "결제가 실패했습니다.",
        paymentFailedDesc: "다시 시도해 주세요.",
        paymentError: "결제 후 처리 중 오류가 발생했습니다.",
        paymentErrorDesc: "문제가 지속되면 고객���터로 문의해주세요.",
        paymentConfirmFailed: "결제 승인 확인에 실패했습니다.",
        paymentConfirmFailedDesc: "잠시 후 다시 시도해주세요.",
        paymentCancelled: "결제가 취소되었거나 창이 닫혔습니다.",
        paymentWindowOpened: "결제창이 열렸습니다. 결제를 완료해 주세요.",
        groupContactRequired: "9인 이상 단체는 고객센터로 문의해주세요.",
        groupContactPhone: "Tel: +82-507-1344-4159",
        invalidPaymentInfo: "결제 준비 정보가 올바르지 않습니다.",
        reservationError: "예약 처리 중 오류가 발생했습니다.",
        reservationConflict: "이미 활성 예약이 있거나 예약 불가 상태입니다.",
        destinationNotFound: "여행지를 찾을 수 없습니다.",
      },
    },
  },
};

export default common;
