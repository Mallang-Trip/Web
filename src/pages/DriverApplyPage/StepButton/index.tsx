import { Dispatch, memo, SetStateAction, useCallback, useEffect } from "react";
import { CheckModal, Loading } from "@/components";
import clsx from "clsx";

interface Props {
  activeNext: boolean;
  setActiveNext: Dispatch<SetStateAction<boolean>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  submitHandler: () => void;
  submitLoading: boolean;
  autoSave: boolean;
  setAutoSave: Dispatch<SetStateAction<boolean>>;
}

function StepButton({
  activeNext,
  setActiveNext,
  step,
  setStep,
  showModal,
  setShowModal,
  submitHandler,
  submitLoading,
  autoSave,
  setAutoSave,
}: Props) {
  const prevHandler = useCallback(() => setStep(step - 1), [step]);

  const nextHandler = useCallback(() => {
    if (step === 5) return setShowModal(true);
    setStep(step + 1);
    setActiveNext(false);
  }, [step]);

  useEffect(() => {
    if (autoSave) return;
    setTimeout(() => setAutoSave(true), 2000);
  }, [autoSave]);

  if (step > 5) return null;
  return (
    <div className="w-full mt-16">
      <p className="flex justify-center items-center mb-2 text-sm text-primary font-medium">
        {autoSave ? (
          "임시 저장 완료"
        ) : (
          <>
            <svg
              aria-hidden="true"
              className="w-4 h-4 me-2 text-gray-200 animate-spin fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            임시 저장 중...
          </>
        )}
      </p>
      <div className="w-full flex justify-center gap-7 mx-auto px-4">
        <button
          type="button"
          className={clsx(
            step !== 0
              ? "h-12 bg-white border rounded-full text-darkgray text-sm w-64 border-darkgray"
              : "h-12 bg-lightgray border rounded-full text-darkgray text-sm w-64 border-lightgray"
          )}
          disabled={step === 0}
          onClick={prevHandler}
        >
          이전
        </button>
        <button
          type="button"
          className={clsx(
            activeNext
              ? "h-12 text-white rounded-full text-sm w-64 bg-primary"
              : "h-12 bg-lightgray border rounded-full text-darkgray text-sm w-64 border-lightgray"
          )}
          disabled={!activeNext}
          onClick={nextHandler}
        >
          {step === 5 ? "제출" : "다음"}
        </button>
      </div>

      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={
          submitLoading ? (
            <Loading full={false} />
          ) : (
            "드라이버 등록을 위해\n작성하신 내용을 제출하시겠습니까?"
          )
        }
        noText="취소"
        yesText="확인"
        yesHandler={submitHandler}
      />
    </div>
  );
}

export default memo(StepButton);
