import CheckIcon from "./CheckIcon";

function Stepper({ step }) {
  return (
    <ol className="flex items-center w-full mb-20 text-sm text-[#D9D9D9]">
      <li
        className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
          step > 1 ? "after:border-blue-100" : "after:border-lightgray"
        }`}
      >
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 relative ${
            step >= 1 ? "bg-blue-100" : "bg-lightgray"
          }`}
        >
          {step > 1 ? (
            <CheckIcon />
          ) : (
            <span className={`${step === 1 && "text-blue-600"}`}>1</span>
          )}
          <span
            className={`absolute top-14 -left-1 w-24 ${
              step >= 1 ? "text-black" : "text-darkgray"
            }`}
          >
            차량 등록
          </span>
        </span>
      </li>
      <li
        className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
          step > 2 ? "after:border-blue-100" : "after:border-lightgray"
        }`}
      >
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 relative ${
            step >= 2 ? "bg-blue-100" : "bg-lightgray"
          }`}
        >
          {step > 2 ? (
            <CheckIcon />
          ) : (
            <span className={`${step === 2 && "text-blue-600"}`}>2</span>
          )}
          <span
            className={`absolute top-14 -left-1 w-24 ${
              step >= 2 ? "text-black" : "text-darkgray"
            }`}
          >
            지역 선택
          </span>
        </span>
      </li>
      <li
        className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
          step > 3 ? "after:border-blue-100" : "after:border-lightgray"
        }`}
      >
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 relative ${
            step >= 3 ? "bg-blue-100" : "bg-lightgray"
          }`}
        >
          {step > 3 ? (
            <CheckIcon />
          ) : (
            <span className={`${step === 3 && "text-blue-600"}`}>3</span>
          )}
          <span
            className={`absolute top-14 -left-1 w-24 ${
              step >= 3 ? "text-black" : "text-darkgray"
            }`}
          >
            정보 입력
          </span>
        </span>
      </li>
      <li
        className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block ${
          step > 4 ? "after:border-blue-100" : "after:border-lightgray"
        }`}
      >
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 relative ${
            step >= 4 ? "bg-blue-100" : "bg-lightgray"
          }`}
        >
          {step > 4 ? (
            <CheckIcon />
          ) : (
            <span className={`${step === 4 && "text-blue-600"}`}>4</span>
          )}
          <span
            className={`absolute top-14 -left-2 w-24 ${
              step >= 4 ? "text-black" : "text-darkgray"
            }`}
          >
            서류 업로드
          </span>
        </span>
      </li>
      <li className="flex items-center w-10">
        <span
          className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 relative ${
            step >= 5 ? "bg-blue-100" : "bg-lightgray"
          }`}
        >
          {step > 5 ? (
            <CheckIcon />
          ) : (
            <span className={`${step === 5 && "text-blue-600"}`}>5</span>
          )}
          <span
            className={`absolute top-14 -left-4 w-24 ${
              step >= 5 ? "text-black" : "text-darkgray"
            }`}
          >
            드라이버 소개
          </span>
        </span>
      </li>
    </ol>
  );
}

export default Stepper;
