import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

function Policy() {
  const navigation = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const roleURL = useMemo(
    () => (user.role === "ROLE_DRIVER" ? "driver" : "user"),
    [user.role]
  );

  return (
    <div className="pt-5 pb-24 lg:pb-5 px-3 font-medium text-xs text-darkgray">
      <div className="flex gap-3 justify-center items-center flex-wrap">
        <button
          className="hover:underline underline-offset-2 focus:outline-none"
          onClick={() => navigation("/intro")}
        >
          회사소개
        </button>
        <span>|</span>
        <button
          className="hover:underline underline-offset-2 focus:outline-none"
          onClick={() => navigation(`/policy/${roleURL}/service`)}
        >
          이용약관
        </button>
        <span>|</span>
        <button
          className="hover:underline underline-offset-2 font-bold focus:outline-none"
          onClick={() => navigation(`/policy/${roleURL}/privacy`)}
        >
          개인정보처리방침
        </button>
        <span>|</span>
        <button
          className="hover:underline underline-offset-2 focus:outline-none"
          onClick={() => navigation(`/policy/${roleURL}/location`)}
        >
          위치기반 서비스 이용약관
        </button>
        <span>|</span>
        <button
          className="hover:underline underline-offset-2 focus:outline-none"
          onClick={() => navigation(`/policy/${roleURL}/refund`)}
        >
          환불 및 위약금 정책
        </button>
        <span>|</span>
        <span>통신판매업신고번호 2024-안양동안-0716호</span>
        <span>|</span>
        <span>관광사업등록번호 제 2024-000003호</span>
      </div>
      <div className="pt-3 text-center">
        Copyright ⓒ 2024 mallangtrip. All rights reserved.
      </div>
    </div>
  );
}

export default memo(Policy);
