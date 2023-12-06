import { useNavigate } from "react-router-dom";

function Footer() {
  const navigation = useNavigate();

  return (
    <div className="grid mt-5 mb-24 md:mb-5 px-3 font-medium text-xs text-slate-600">
      <div className="hidden sm:flex gap-3 justify-center items-center flex-wrap">
        <button
          className="hover:underline underline-offset-2"
          onClick={() => navigation("/intro")}
        >
          회사 소개
        </button>
        <div>|</div>
        <button
          className="hover:underline underline-offset-2"
          onClick={() => navigation("/policy/user/service")}
        >
          이용약관
        </button>
        <div>|</div>
        <button className="hover:underline underline-offset-2 text-primary">
          개인정보처리방침
        </button>
        <div>|</div>
        <button className="hover:underline underline-offset-2">
          위치기반 서비스 이용약관
        </button>
        <div>|</div>
        <button className="hover:underline underline-offset-2">
          환불 및 위약금 정책
        </button>
      </div>
      <div className="sm:hidden">
        <div className="flex gap-3 justify-center items-center flex-wrap">
          <button
            className="hover:underline underline-offset-2"
            onClick={() => navigation("/intro")}
          >
            회사 소개
          </button>
          <div>|</div>
          <button className="hover:underline underline-offset-2">
            이용약관
          </button>
          <div>|</div>
          <button className="hover:underline underline-offset-2 text-primary">
            개인정보처리방침
          </button>
        </div>
        <div className="mt-2 flex gap-3 justify-center items-center flex-wrap">
          <button className="hover:underline underline-offset-2">
            위치기반 서비스 이용약관
          </button>
          <div>|</div>
          <button className="hover:underline underline-offset-2">
            환불 및 위약금 정책
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center pt-3">
        Copyright ⓒ 2023 mallangtrip. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
