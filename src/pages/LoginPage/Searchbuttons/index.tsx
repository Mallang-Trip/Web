import { memo } from "react";
import { useNavigate } from "react-router-dom";

function Searchbuttons() {
  const navigation = useNavigate();

  return (
    <div className="flex justify-center m-5 mx-auto text-sm text-darkgray">
      <button
        type="button"
        onClick={() => navigation("/login/search/id", { replace: true })}
      >
        아이디 찾기
      </button>
      <span className="mx-1">|</span>
      <button
        type="button"
        onClick={() => navigation("/login/search/password", { replace: true })}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}

export default memo(Searchbuttons);
