import { useNavigate } from "react-router-dom";

function SearchComplete({ mode, setMode, setCompleteSearch, loginId }) {
  const navigation = useNavigate();

  const goLogin = () => navigation("/login", { replace: true });
  const goHome = () => navigation("/", { replace: true });
  const goSearchPassword = () => {
    setMode("password");
    setCompleteSearch(false);
  };

  return (
    <div className="w-[656px] mx-auto mt-10">
      <div className="h-[200px] text-center flex flex-col justify-center">
        {mode === "NewPassword" ? (
          <div>
            비밀번호 재설정이 완료되었습니다. <br />
            새로 설정된 비밀번호로 로그인 해주세요.
          </div>
        ) : (
          <div>
            회원님의 아이디는 <span className="text-primary">{loginId}</span>{" "}
            (으)로 등록되어 있습니다.
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-3 mt-12">
        <button
          type="button"
          className="h-12 text-white rounded-full text-md w-80 bg-primary"
          onClick={goLogin}
        >
          로그인
        </button>
        {mode !== "NewPassword" && (
          <button
            type="button"
            className="h-12 text-white rounded-full text-md w-80 bg-primary"
            onClick={goSearchPassword}
          >
            비밀번호 찾기
          </button>
        )}
        <button
          type="button"
          className="h-12 bg-white border rounded-full text-darkgray text-md w-80 border-darkgray"
          onClick={goHome}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default SearchComplete;
