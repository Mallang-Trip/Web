import React, { useState } from "react";

function TravelerGreet() {
  const [content, setContent] = useState("");

  return (
    <textarea
      placeholder="(선택사항)파티원들에게 인사 또는 요청사항을 작성하세요."
      className="w-full h-[180px] rounded-2xl border-2 border-black text-black p-3 text-sm placeholder:text-[#6F6F6F] focus:outline-none resize-none"
      onChange={(e) => setContent(e.target.value)}
      value={content}
      name="content"
    />
  );
}

export default TravelerGreet;
