function Chatting() {
  return (
    <div className="max-w-[550px] mx-auto py-5 flex flex-col items-center gap-6 bg-skyblue rounded-xl">
      <div className="text-xl text-black font-bold">1:1 채팅상담</div>
      <div className="text-sm text-darkgray font-medium">
        채팅상담은 공휴일을 제외한 평일 10:00~18:00에 운영됩니다.
      </div>
      <button className="w-[120px] py-2.5 rounded-full text-sm text-white font-bold bg-primary">
        문의하기
      </button>
    </div>
  );
}

export default Chatting;
