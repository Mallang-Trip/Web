import React from "react";
import { useNavigate } from "react-router-dom";

function SearchComplete(props) {
  const navigation = useNavigate();

  const goLogin = () => navigation("/login", { replace: true });
  const goHome = () => navigation("/", { replace: true });

  return (
    <div className="w-[656px] mx-auto mt-10">
      <div className="h-[50px] rounded-lg bg-primary text-white text-center flex flex-col justify-center">
        {props.mode === "password" ? "비밀번호 찾기" : "이메일 찾기"}
      </div>
      <div className="h-[200px] text-center flex flex-col justify-center text-[#666666]">
        {props.mode === "password" ? (
          <div>
            메일 발송이 완료되었습니다.
            <br />
            메일을 확인하고 새로운 비밀번호로 재설정해 주세요.
          </div>
        ) : (
          <div>
            회원님의 아이디는{" "}
            <span className="text-primary">malangtrip@ajou.ac.kr</span> (으)로
            등록되어 있습니다.
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={goLogin}
        className="w-full h-[30px] text-sm text-white bg-primary rounded-lg"
      >
        로그인
      </button>
      <button
        type="button"
        onClick={goHome}
        className="w-full mt-3 h-[30px] text-sm text-black bg-[#D9D9D9] rounded-lg"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default SearchComplete;
