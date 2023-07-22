import React from "react";

function Searchbuttons(props) {
  return (
    <div className="text-sm text-[#666666] mx-auto m-5 flex justify-center">
      <button type="button" onClick={() => props.setMode("SEARCH_EMAIL")}>
        이메일 찾기
      </button>
      <span className="mx-1">|</span>
      <button type="button" onClick={() => props.setMode("SEARCH_PASSWORD")}>
        비밀번호 찾기
      </button>
    </div>
  );
}

export default Searchbuttons;
