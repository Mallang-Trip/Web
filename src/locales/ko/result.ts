const result = {
  metadata: {
    title: "예약 내역",
  },
  // 페이지 로딩
  loading: {
    preparing: "예약 정보를 준비하는 중...",
    fetching: "예약 정보를 불러오는 중...",
    general: "로딩 중...",
    canceling: "취소 처리 중...",
    saving: "저장 중...",
    issuing: "발급 중...",
  },

  // 예약 정보 카드
  reservationInfo: {
    title: "예약 정보",
    canceled: "취소됨",
    tourName: "투어 이름",
    booker: "예약자",
    phone: "전화번호",
    participants: "참가 인원",
    people: "명",
    tourDate: "투어 일자",
    pickupLocation: "출발 위치",
    dropLocation: "도착 위치",
    requests: "요청 사항",
    tourFee: "투어 요금",
    noRequests: "-",
  },

  // 드라이버 정보 카드
  driverInfo: {
    title: "담당 드라이버",
    vehicleNumber: "차량 번호",
    phoneNumber: "전화번호",
    phoneCopied: "전화번호가 복사되었습니다.",
    copyFailed: "복사에 실패했습니다.",
    vehiclePhotos: "차량 사진",
    photoCount: "장",
    vehicleImage: "차량 이미지",
    copyPhone: "전화번호 복사",
    breweries: "방문 양조장",
    breweriesCount: "곳",
    notAssigned: "담당 드라이버 미배정",
    notAssignedDesc: "예약이 확정되면 담당 드라이버가 배정됩니다.",
    notAssignedCanceledDesc:
      "예약이 취소되었습니다. 담당 드라이버가 배정되지 않았습니다.",
  },

  // 결제 정보 카드
  paymentInfo: {
    title: "결제 정보",
    status: "결제 상태",
    approvalDate: "승인 일시",
    refundDate: "환불 일시",
    paymentMethod: "결제 수단",
    paymentAmount: "결제 금액",
    card: "카드",
    issueStatement: "거래명세서 발급",
    statementTitle: "거래명세서 (Transaction Statement)",
    onsitePaymentTitle: "현장 결제 안내",
    onsitePaymentDesc:
      "기본 투어 요금 외 픽업/드랍 추가 등으로 발생하는 부가 비용은 예약 확정 전 말랑트립이 이메일과 전화번호를 통해 따로 안내해드립니다.",
    statusCompleted: "결제 완료",
    statusRefunded: "환불 완료",
    statusPending: "승인 대기",
  },

  // 거래명세서
  transactionStatement: {
    errorLoading: "거래명세서를 불러오지 못했습니다.",
    invoiceNo: "문서번호 (Invoice No.)",
    date: "작성일자 (Date)",
    to: "수신 (To)",
    dear: "귀하",
    supplier: "공급자 (Supplier)",
    customer: "공급받는 자 (Customer)",
    businessName: "상호",
    businessNumber: "사업자등록번호",
    representative: "대표",
    address: "주소",
    contact: "연락처",
    email: "이메일",
    bookerName: "예약자명",
    passengers: "탑승 인원",
    peopleCount: "인",
    totalAmount: "합계 금액 (Total Amount)",
    transactionDetails: "거래 상세 내역 (Transaction Details)",
    transactionDate: "거래일자",
    itemName: "품명",
    specification: "규격 (투어일자)",
    quantity: "수량",
    pricePerPerson: "인당 가격",
    supplyAmount: "공급가액",
    taxAmount: "세액",
    total: "합계",
    remarks: "비고 (Remarks)",
    inclusions: "1. 포함 내역 (Inclusions):",
    inclusionsList: {
      vehicle: "프라이빗 전용 차량 및 전문 드라이버 (Door-to-Door 서비스)",
      fuel: "유류비, 주차비, 통행료 일체",
      // guide: "전문 통역 안내 서비스",
      brewery:
        "말랑트립이 큐레이션 해드리는 양조장 2곳 투어 및 체험비 (시음 포함)",
      // water: "차량 내 생수 제공",
      lunch: "점심 식사",
    },
    exclusions: "2. 불포함 내역 (Exclusions):",
    exclusionsList: {
      meals: "모든 식사 비용 (점심, 저녁 등)",
      lunch: "점심 식사 포함, 저녁 식사 불포함",
      personal: "개인 경비 및 여행자 보험",
      additional: "안내된 픽업/드랍 권역 외 추가 이동 비용",
    },
    paymentInformation: "3. 결제 정보 (Payment Information):",
    paymentMethod: "결제수단: 신용카드",
    paymentDateTime: "결제일시:",
    cancellationPolicy: "4. 취소 및 환불 규정 (Cancellation & Refund Policy):",
    cancellationList: {
      fullRefund: "투어일 기준 4일 전까지 취소 시: 전액 환불",
      noRefund: "투어일 기준 3일 전부터 취소 시: 환불 불가",
    },
    confirmation: "위와 같이 거래하였음을 확인합니다.",
    companyName: "말랑트립",
    supplierInfo: {
      businessName: "말랑트립",
      businessNumber: "399-51-00784",
      representative: "김제윤",
      address: "경기도 안양시 시민대로327번길 11-41, 310호",
      contact: "0507-1344-4159 (+82-507-1344-4159)",
      email: "mallangtrip@mallangtrip.com",
    },
  },

  // 예약 액션
  actions: {
    cancel: "예약 취소",
    edit: "예약 수정",
    viewAllReservations: "나의 모든 예약 보기",
    cancelDialogTitle: "예약을 취소하시겠습니까?",
    cancelDialogDesc: "정말로 예약을 취소하시겠습니까?",
    cancelDialogWarning: "취소된 예약은 복구할 수 없습니다.",
    cancelDialogNo: "아니오",
    cancelDialogYes: "예약 취소하기",
    authRequiredTitle: "전화번호 인증이 필요합니다",
    authRequiredDesc:
      "해당 작업을 진행하려면 로그인(전화번호 인증)이 필요합니다. 진행하시겠습니까?",
    authRequiredNo: "아니오",
    authRequiredYes: "예, 진행할게요",
  },

  // 예약 수정 다이얼로그
  editDialog: {
    title: "예약 정보 수정",
    pendingOnly: "승인 대기 상태에서만 수정할 수 있습니다.",
    pendingOnlyFull: "승인 대기(PENDING) 상태에서만 수정할 수 있습니다.",
    reservationName: "예약명",
    meetingDate: "미팅 날짜",
    meetingTime: "미팅 시간",
    participants: "인원",
    participantPlaceholder: "인원을 선택하세요",
    people2: "2인",
    people3: "3인",
    people4: "4인",
    people5: "5인",
    people6: "6인",
    people7: "7인",
    people8: "8인",
    people9Plus: "9인 이상 (별도 문의)",
    totalAmount: "총 금액(₩)",
    pickupAddress: "픽업 주소",
    returnAddress: "복귀 주소",
    requests: "요청사항",
    cancel: "취소",
    save: "저장",
    saving: "저장 중...",
    groupContactError: "9인 이상 단체는 고객센터로 문의해주세요.",
    updateSuccess: "예약이 수정되었습니다.",
    updateError: "예약 수정에 실패했습니다.",
    notFound: "예약을 찾을 수 없습니다.",
    cannotModify: "현재 상태에서는 수정할 수 없습니다.",
    tryAgain: "잠시 후 다시 시도해주세요.",
  },

  // 예약 목록 드로어
  listDrawer: {
    title: "나의 예약 내역",
    description: "예약 내역을 확인하고 상세를 선택하세요.",
    empty: "예약 내역이 없습니다",
    emptyDesc: "새로운 여행을 예약해보세요!",
    canceled: "취소됨",
    paymentDate: "결제 일시:",
    meetingPlace: "미팅 장소:",
    dropPlace: "하차 장소:",
  },

  // Not Found
  notFound: {
    title: "예약 정보를 찾을 수 없습니다",
    noReservations: "아직 예약 내역이 없습니다. 새로운 여행을 예약해보세요!",
    invalidAccess: "잘못된 예약 번호이거나 접근 권한이 없습니다.",
    viewReservations: "나의 예약 내역 보기",
    goHome: "홈으로 돌아가기",
  },

  // 예약 히어로
  hero: {
    reservationDate: "예약 일시:",
    cancelDate: "취소 일시:",
    statusBadgeLabel: "상태",
    receiptMessage: {
      pending: "예약 정보가 이메일로 전송되었습니다.",
      approved: "예약이 승인되었습니다. 확인 메일을 확인해주세요.",
      rejected: "예약이 거절되었습니다. 자세한 내용은 이메일을 확인해주세요.",
      canceled: "예약이 취소되었습니다. 환불 정보는 이메일을 확인해주세요.",
      default: "예약 정보가 이메일로 전송되었습니다.",
    },
  },

  // 토스트 메시지
  toast: {
    cancelSuccess: "예약이 성공적으로 취소되었습니다.",
    cancelSuccessDesc: "취소된 예약은 나의 예약 내역에서 확인할 수 있습니다.",
    cancelError: "예약 취소 중 오류가 발생했습니다.",
    noPermission: "취소 권한이 없습니다.",
    notFound: "예약을 찾을 수 없습니다.",
    cannotCancel: "현재 상태에서는 취소할 수 없습니다.",
    tryAgain: "잠시 후 다시 시도해주세요.",
  },

  // 예약 상태
  status: {
    pending: {
      title: "🎉 예약 신청 완료!",
      label: "예약 확인 중",
      message: "영업일 기준 24시간 내로 확정 여부를 안내드리겠습니다.",
    },
    approved: {
      title: "✅ 예약 승인됨",
      label: "예약 승인",
      message: "예약이 승인되었습니다.",
    },
    rejected: {
      title: "❌ 예약 반려됨",
      label: "예약 반려",
      message: "예약이 반려되었습니다. 3영업일 이내에 결제금액이 환불됩니다.",
    },
    canceled: {
      title: "❌ 예약 취소됨",
      label: "예약 취소",
      message: "예약이 취소되었습니다. 3영업일 이내에 결제금액이 환불됩니다.",
    },
    default: {
      title: "🎉 예약 상태",
      label: "예약 상태",
      message: "즐거운 여행 되세요!",
    },
  },
};

export default result;
