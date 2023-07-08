import React from "react";

function Searchbuttons() {
  return (
    <div className="text-sm text-[#666666] mx-auto m-5 flex justify-center">
      <button type="button">아이디 찾기</button>
      <span className="mx-1">|</span>
      <button type="button">비밀번호 찾기</button>
    </div>
  );
}

export default Searchbuttons;
