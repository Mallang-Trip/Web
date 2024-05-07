function Head() {
  return (
    <div className="w-full px-5 py-4 flex gap-12 justify-between items-center text-sm text-black text-center font-bold bg-skyblue border-t-2 border-b border-mediumgray">
      <div className="w-8 flex-shrink-0">번호</div>
      <div className="w-full">제목</div>
      <div className="w-20 flex-shrink-0">작성일</div>
    </div>
  );
}

export default Head;
