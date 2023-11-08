function Footer() {
  return (
    <div className="grid my-5 font-medium text-xs text-slate-600">
      <div className="flex gap-3 justify-center items-center">
        <button>회사 소개</button>
        <div>|</div>
        <button>이용약관</button>
        <div>|</div>
        <button className="text-primary">개인정보처리방침</button>
        <div>|</div>
        <button>위치기반 서비스 이용약관</button>
        <div>|</div>
        <button>환불 및 위약금 정책</button>
      </div>
      <div className="flex justify-center items-center  pt-3">
        Copyright ⓒ 2023 mallangtrip. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
