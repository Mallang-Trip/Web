function JoinGreeting({ content, setContent }) {
  return (
    <div className=" h-[180px] overflow-hidden mb-7 rounded-xl border-2 border-black">
      <textarea
        placeholder="(선택 사항) 파티원들에게 인사 또는 요청 사항을 작성해 주세요."
        className="w-full h-full text-black p-3 text-sm placeholder:text-[#6F6F6F] focus:border-primary focus:outline-none resize-none custom-scrollbar"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
    </div>
  );
}

export default JoinGreeting;
