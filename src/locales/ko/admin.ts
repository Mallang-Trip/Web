const admin = {
  metadata: {
    title: "관리자",
  },
  // 페이지 제목
  pageTitle: "관리자 - 예약 관리",

  // 페이지네이션
  pagination: {
    total: "총 {{count}}건",
    loading: "불러오는 중...",
    page: "페이지 {{number}}",
    previous: "이전",
    next: "다음",
  },

  // 테이블 헤더
  table: {
    id: "ID",
    reservationName: "예약명",
    reservedBy: "예약자",
    contact: "연락처",
    datetime: "일시",
    pickupReturn: "픽업/복귀",
    amount: "금액",
    status: "상태",
    action: "액션",
    noResults: "조회 결과가 없습니다.",
  },

  // 상태
  status: {
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    CANCELED: "CANCELED",
  },

  // 버튼
  button: {
    approve: "승인",
    reject: "반려",
    close: "닫기",
    cancel: "취소",
    add: "추가",
    remove: "삭제",
    fileSelect: "파일 선택",
    processing: "처리 중...",
  },

  // 상세 다이얼로그
  detail: {
    title: "예약 상세 정보",
    description: "예약 내역의 전체 정보를 확인할 수 있습니다.",
    reservationId: "예약 ID",
    reservationName: "예약명",
    email: "이메일",
    reservedBy: "예약자",
    contact: "연락처",
    people: "인원",
    meetingTime: "미팅 일시",
    pickupAddress: "픽업 주소",
    returnAddress: "복귀 주소",
    requests: "요청사항",
    amount: "금액",
    status: "상태",
    createdAt: "생성 일시",
    requestedAt: "예약 일시",
    approvedAt: "승인 일시",
    rejectedAt: "반려 일시",
    canceledAt: "취소 일시",
    adminMemo: "관리자 메모",
  },

  // 승인 다이얼로그
  approve: {
    title: "예약 승인",
    description: "드라이버 정보와 양조장 정보를 입력해주세요",
    adminMemo: "관리자 메모 (선택)",
    adminMemoPlaceholder: "관리자 메모를 입력하세요",
    driverInfo: "드라이버 정보",
    driverName: "드라이버 이름",
    driverNamePlaceholder: "드라이버 이름을 입력하세요",
    driverPhone: "드라이버 전화번호",
    driverPhonePlaceholder: "+821012345678 형식으로 입력하세요",
    vehicleNumber: "차량 번호",
    vehicleNumberPlaceholder: "12가3456",
    vehicleImage: "차량 이미지 (선택)",
    dragOrClick: "이미지를 드래그하거나 클릭하여 업로드",
    uploading: "업로드 중...",
    breweryInfo: "양조장 방문 정보",
    addBrewery: "양조장 추가",
    breweryOrder: "{{number}}번째 양조장",
    breweryName: "양조장 이름",
    breweryNamePlaceholder: "양조장 이름",
    breweryAddress: "양조장 주소",
    breweryAddressPlaceholder: "양조장 주소",
    noBreweries:
      "양조장 정보가 없습니다. 추가 버튼을 클릭하여 양조장을 추가하세요.",
    required: "*",
  },

  // 반려 다이얼로그
  reject: {
    title: "예약 반려",
    description: "반려 사유는 필수이며, 관리자 메모는 선택입니다.",
    reason: "반려 사유",
    reasonRequired: "반려 사유 *",
    adminMemo: "관리자 메모",
  },

  // 대기 화면
  waiting: {
    loadingData: "데이터 로딩 중...",
    checkingAuth: "인증 확인 중...",
  },

  // 토스트 메시지
  toast: {
    // 성공
    approveSuccess: "예약이 승인되었습니다.",
    rejectSuccess: "예약이 반려되었습니다.",
    uploadSuccess: "{{count}}개의 이미지가 업로드되었습니다.",

    // 에러
    driverNameRequired: "드라이버 이름을 입력해주세요.",
    driverPhoneRequired: "드라이버 전화번호를 입력해주세요.",
    vehicleNumberRequired: "차량 번호를 입력해주세요.",
    breweryInfoRequired: "모든 양조장의 이름과 주소를 입력해주세요.",
    rejectReasonRequired: "반려 사유를 입력해주세요.",
    notImageFile: "{{filename}}은(는) 이미지 파일이 아닙니다.",
    uploadError: "이미지 업로드 중 오류가 발생했습니다.",

    // 승인 실패
    approveFailed: "예약 승인 실패",
    reservationNotFound: "예약을 찾을 수 없습니다.",
    cannotApprove: "승인할 수 없는 상태입니다.",
    tryAgainLater: "잠시 후 다시 시도해주세요.",

    // 반려 실패
    rejectFailed: "예약 반려 실패",
    cannotReject: "반려할 수 없는 상태입니다.",
  },

  // Not Found 페이지
  notFound: {
    title: "접근 권한이 없습니다",
    description: "요청하신 페이지에 접근할 수 없습니다.",
    goHome: "홈으로 이동",
  },
};

export default admin;
