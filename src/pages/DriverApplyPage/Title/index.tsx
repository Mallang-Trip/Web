import { memo, useMemo } from "react";

interface Props {
  step: number;
}

function Title({ step }: Props) {
  const stepTitle = useMemo(
    () => [
      "드라이버 등록 전에 약관에 동의해주세요",
      "차량의 정보를 입력해주세요",
      "활동 가능한 지역을 선택해주세요",
      "본인의 입금 계좌와 운행 가격을 입력해주세요",
      "필요한 자료들을 업로드해주세요",
      "마지막으로 자기소개를 입력해주세요",
      "제출이 완료되었습니다!",
      "드라이버 등록 심사가 완료되었습니다!",
      "드라이버 등록 심사가 완료되었습니다!",
    ],
    []
  );

  return (
    <div className="text-2xl text-black font-bold mb-9">{stepTitle[step]}</div>
  );
}

export default memo(Title);
