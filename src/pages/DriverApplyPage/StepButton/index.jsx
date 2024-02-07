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
  const prevHandler = () => setStep(step - 1);

  const nextHandler = () => {
    if (step === 5) return setShowModal(true);
    setStep(step + 1);
    setActiveNext(false);
  };

  if (step > 5) return null;
  return (
    <>
      <div className="w-full flex justify-center gap-7 mt-16 mx-auto px-4">
        <button
          type="button"
          className={`${
            step !== 1
              ? "h-12 bg-white border rounded-full text-darkgray text-sm w-64 border-darkgray"
              : "h-12 bg-lightgray border rounded-full text-darkgray text-sm w-64 border-lightgray"
          }`}
          disabled={step === 1}
          onClick={prevHandler}
        >
          이전
        </button>
        <button
          type="button"
          className={`${
            activeNext
              ? "h-12 text-white rounded-full text-sm w-64 bg-primary"
              : "h-12 bg-lightgray border rounded-full text-darkgray text-sm w-64 border-lightgray"
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
