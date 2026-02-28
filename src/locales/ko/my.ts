const my = {
  metadata: {
    title: "마이페이지",
  },
  profile: {
    metadata: {
      title: "회원탈퇴",
    },
    title: "회원탈퇴",
    phoneNumber: "전화번호",
    notice: {
      title: "회원탈퇴 안내사항",
      items: [
        "회원탈퇴 시 회원님의 모든 개인정보가 삭제됩니다.",
        "탈퇴 후에는 동일한 전화번호로 재가입이 가능합니다.",
        "진행 중인 예약이 있는 경우, 예약 완료 또는 취소 후 탈퇴가 가능합니다.",
        "탈퇴 후에는 기존 예약 내역 조회가 불가능합니다.",
        "탈퇴된 계정은 복구할 수 없으니 신중하게 결정해주세요.",
      ],
    },
    buttons: {
      cancel: "취소",
      withdraw: "탈퇴하기",
    },
    dialog: {
      title: "정말 탈퇴하시겠습니까?",
      description:
        "탈퇴하시면 모든 정보가 삭제되며, 복구가 불가능합니다. 정말로 탈퇴를 진행하시겠습니까?",
      cancel: "아니오",
      confirm: "예, 탈퇴합니다",
    },
    toast: {
      success: "회원탈퇴가 완료되었습니다.",
      error: "회원탈퇴 중 오류가 발생했습니다.",
      tryAgain: "잠시 후 다시 시도해주세요.",
    },
    loading: "탈퇴 처리 중...",
  },
};

export default my;
