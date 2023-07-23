import React from "react";
import { useNavigate } from "react-router-dom";

function Searchbuttons() {
  const navigation = useNavigate();

  return (
    <div className="text-sm text-[#666666] mx-auto m-5 flex justify-center">
      <button type="button" onClick={() => navigation("/login/search/email")}>
        이메일 찾기
      </button>
      <span className="mx-1">|</span>
      <button
        type="button"
        onClick={() => navigation("/login/search/password")}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}

export default Searchbuttons;
