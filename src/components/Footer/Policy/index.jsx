import { useNavigate } from "react-router-dom";

function Policy() {
  const navigation = useNavigate();

  return (
    <div className="mt-5 mb-24 lg:mb-5 px-3 font-medium text-xs text-darkgray">
      <div className="hidden sm:flex gap-3 justify-center items-center flex-wrap">
        <button
          className="hover:underline underline-offset-2 focus:outline-none"
          onClick={() => navigation("/intro")}
        >
          회사 소개
        </button>
        <span>|</span>
        <button
          className="hover:underline underline-offset-2 focus:outline-none"
          onClick={() => navigation("/policy/user/service")}
        >
          이용약관
        </button>
        <span>|</span>
        <button
          className="hover:underline underline-offset-2 text-primary focus:outline-none"
          onClick={() => navigation("/policy/user/privacy")}
        >
          개인정보처리방침
        </button>
        <span>|</span>
        <button
          className="hover:underline underline-offset-2 focus:outline-none"
          onClick={() => navigation("/policy/user/location")}
        >
          위치기반 서비스 이용약관
        </button>
        <span>|</span>
        <span>통신판매업신고번호 2024-경기의왕-0056호</span>
      </div>
      <div className="sm:hidden">
        <div className="flex gap-3 justify-center items-center flex-wrap">
          <button
            className="hover:underline underline-offset-2 focus:outline-none"
            onClick={() => navigation("/intro")}
          >
            회사 소개
          </button>
          <span>|</span>
          <button
            className="hover:underline underline-offset-2 focus:outline-none"
            onClick={() => navigation("/policy/user/service")}
          >
            이용약관
          </button>
          <span>|</span>
          <button
            className="hover:underline underline-offset-2 text-primary focus:outline-none"
            onClick={() => navigation("/policy/user/privacy")}
          >
            개인정보처리방침
          </button>
        </div>
        <div className="mt-2 flex gap-3 justify-center items-center flex-wrap">
          <button
            className="hover:underline underline-offset-2 focus:outline-none"
            onClick={() => navigation("/policy/user/location")}
          >
            위치기반 서비스 이용약관
          </button>
          <span>|</span>
          <span>통신판매업신고번호 2024-경기의왕-0056호</span>
        </div>
      </div>
      <div className="pt-3 text-center">
        Copyright ⓒ 2024 mallangtrip. All rights reserved.
      </div>
    </div>
  );
}

export default Policy;
