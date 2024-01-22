function Status({ ready, agreement }) {
  if (agreement === "WAITING")
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-[#B4B4B4] bg-[#F4F4F4]">
        확인 전
      </div>
    );
  if (agreement === "ACCEPT")
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-[#196B3A] bg-[#D7F8D9]">
        제안 승인
      </div>
    );
  if (agreement === "REFUSE")
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-[#E30000] bg-[#FFEAEA]">
        제안 거절
      </div>
    );
  if (agreement === "CANCELED")
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-[#E30000] bg-[#FFEAEA]">
        제안 취소
      </div>
    );
  if (agreement === "EXIT")
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-[#E30000] bg-[#FFEAEA]">
        가입 탈퇴
      </div>
    );
  if (agreement === "PROPOSER")
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-primary bg-skyblue">
        제안자
      </div>
    );
  if (ready)
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-primary bg-skyblue">
        말랑레디 ON
      </div>
    );
  else
    return (
      <div className="w-[104px] mt-3 py-1.5 rounded-full text-xs font-medium text-[#B4B4B4] bg-[#F4F4F4]">
        말랑레디 OFF
      </div>
    );
}

export default Status;
