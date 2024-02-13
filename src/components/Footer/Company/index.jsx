import { Link } from "react-router-dom";

function Company() {
  return (
    <div className="mb-10 flex justify-center flex-col sm:flex-row gap-6 sm:gap-12 md:gap-36 mx-5 sm:mx-12 pl-5 sm:pl-0">
      <div className="text-xs text-darkgray">
        <p className="text-sm text-boldgray font-bold mb-2.5">말랑트립</p>
        <p>대표: 김제윤</p>
        <p className="my-1">사업자등록번호: 399-51-00784</p>
        <p>경기도 의왕시 모락로 89-15 109동 403호</p>
      </div>
      <div className="text-xs text-darkgray">
        <p className="text-sm text-boldgray font-bold mb-2.5">고객문의</p>
        <p>실시간 고객상담: 말랑톡</p>
        <p className="my-1">유선 번호: 070-8080-2665</p>
        <p>기타문의: mallangtrip@gmail.com</p>
      </div>
      <div className="text-xs text-darkgray">
        <p className="text-sm text-boldgray font-bold mb-2.5">SNS</p>
        <p>
          INSTAGRAM:{" "}
          <Link
            to="https://www.instagram.com/mallang_trip/?hl=ko"
            target="_blank"
            className="hover:underline underline-offset-4"
          >
            @mallang_trip
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Company;
