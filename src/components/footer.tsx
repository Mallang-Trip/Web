export default function Footer() {
  return (
    <footer className="bg-gray-800 px-5 py-10 text-sm leading-relaxed text-gray-400">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-4">
          <p>
            <span>대표</span>: 김제윤 | <span>사업자등록번호</span>:
            399-51-00784
          </p>
          <p>주소: 경기도 안양시 동안구 시민대로327번길 11-41 310호</p>
          <p>고객문의: 공식 카카오톡 (실시간) / +82-507-1344-4159 (유선)</p>
        </div>

        <div className="mb-4">
          <p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-gray-300 hover:underline"
            >
              Instagram @mallang_trip
            </a>
          </p>
          <p>
            <a href="#" className="mx-2 text-gray-300 hover:underline">
              회사소개
            </a>{" "}
            ·{" "}
            <a href="#" className="mx-2 text-gray-300 hover:underline">
              이용약관
            </a>{" "}
            ·{" "}
            <a href="#" className="mx-2 text-gray-300 hover:underline">
              개인정보처리방침
            </a>
          </p>
          <p>
            통신판매업신고번호: 2024-안양동안-0716호 | 관광사업등록번호: 제
            2024-000003호
          </p>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          © 2025 MallangTrip. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
