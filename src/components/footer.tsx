import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 px-5 py-10 text-sm leading-relaxed text-gray-400">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-5">
          <p className="mb-2">
            <span>상호명</span>: 말랑트립 | <span>대표</span>: 김제윤 |{" "}
            <span>사업자등록번호</span>: 399-51-00784
          </p>
          <p className="mb-2">
            우편번호: 14055 | 주소: 경기도 안양시 동안구 시민대로327번길 11-41
            310호
          </p>
          <p>
            고객문의: 공식 카카오톡 채널 | 이메일: mallangtrip@mallangtrip.com
          </p>
        </div>

        <div className="mb-5">
          <p className="mb-2">
            <Link
              href="https://www.instagram.com/mallang_trip/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-gray-300 hover:underline"
            >
              Instagram @mallang_trip
            </Link>
          </p>
          <p className="mb-2">
            <Link
              href="/policy/service"
              className="mx-2 text-gray-300 hover:underline"
            >
              서비스 이용약관
            </Link>{" "}
            ·{" "}
            <Link
              href="/policy/travel"
              className="mx-2 text-gray-300 hover:underline"
            >
              국내여행 표준약관
            </Link>{" "}
            ·{" "}
            <Link
              href="/policy/privacy"
              className="mx-2 text-gray-300 hover:underline"
            >
              개인정보 수집·이용
            </Link>{" "}
            ·{" "}
            <Link
              href="/policy/thirdparty"
              className="mx-2 text-gray-300 hover:underline"
            >
              개인정보 제3자 제공
            </Link>
          </p>
          <p>
            통신판매업신고번호: 2024-안양동안-0716호 | 관광사업등록번호: 제
            2024-000003호
          </p>
        </div>

        <p className="mt-7 text-xs text-gray-500">
          © 2025 MallangTrip. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
