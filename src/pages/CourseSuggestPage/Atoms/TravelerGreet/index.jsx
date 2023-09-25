import React, { useState } from "react";

function TravelerGreet() {
  const [content, setContent] = useState("");

  const handleContent = (e) => {
    const contValue = e.target.value;
    setContent(contValue);
    console.log(content);
  };
  return (
    <textarea
      placeholder="(선택사항)파티원들에게 인사 또는 요청사항을 작성하세요."
      className="w-full h-[180px] rounded-[20px] border-2 border-gray text-gray p-3 text-[14px]"
      onChange={handleContent}
      value={content}
      name="content"
    />
  );
}

export default TravelerGreet;
