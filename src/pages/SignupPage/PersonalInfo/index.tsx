import { Dispatch, memo, SetStateAction, useCallback } from "react";
import PassCheck from "../../../components/PassCheck";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
  setImpUid: Dispatch<SetStateAction<string>>;
}

function PersonalInfo({ setStep, setImpUid }: Props) {
  const completeHandler = useCallback((impUid: string | null) => {
    setImpUid(impUid || "");
    setStep(2);
  }, []);

  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col gap-8 mt-20">
      <div className="block mb-2 text-base font-medium text-black">
        회원가입을 위해 본인인증을 진행해 주세요.{" "}
        <span className="text-red-600 font-bold">*</span>
      </div>
      <PassCheck completeHandler={completeHandler} />
      <div className="h-56" />
    </div>
  );
}

export default memo(PersonalInfo);
