import CheckModal from "../../../components/CheckModal";

function StepButton({
  activeNext,
  setActiveNext,
  step,
  setStep,
  showModal,
  setShowModal,
  submitHandler,
}) {
  const prevHandler = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  const nextHandler = () => {
    if (step === 5) return setShowModal(true);
    setStep(step + 1);
    setActiveNext(false);
  };

  if (step > 5) return null;
  return (
    <>
      <div className="flex justify-center mt-16 gap-12">
        <button
          type="button"
          className="h-10 bg-white border rounded-full text-darkgray text-sm w-28 border-darkgray"
          onClick={prevHandler}
        >
          이전
        </button>
        <button
          type="button"
          className={`${
            activeNext
              ? "h-10 text-white rounded-full text-sm w-28 bg-primary"
              : "h-10 bg-[#F4F4F4] border rounded-full text-darkgray text-sm w-28 border-[#F4F4F4]"
          }`}
          disabled={!activeNext}
          onClick={nextHandler}
        >
          {step === 5 ? "제출" : "다음"}
        </button>
      </div>

      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"드라이버 등록을 위해\n작성하신 내용을 제출하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={submitHandler}
      />
    </>
  );
}

export default StepButton;
