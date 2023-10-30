import React from "react";

function Footer() {
  return (
    <div className="grid">
      <div className="flex gap-3 justify-center items-center">
        <div className="font-medium text-xs text-slate-600">회사 소개</div>
        <div className="font-medium text-xs text-slate-600">|</div>
        <div className="font-medium text-xs text-slate-600">이용약관</div>
        <div className="font-medium text-xs text-slate-600">|</div>
        <div className="font-medium text-xs text-slate-600">
          개인정보처리방침
        </div>
        <div className="font-medium text-xs text-slate-600">|</div>
        <div className="font-medium text-xs text-slate-600">
          위치기반 서비스 이용약관
        </div>
        <div className="font-medium text-xs text-slate-600">|</div>
        <div className="font-medium text-xs text-slate-600">
          환불 및 위약금 정책
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center font-medium text-xs text-slate-600 pt-3">
          Copyright ⓒ 2023 mallangtrip. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
