import Title from "../../../components/Title";
import PassCheck from "../../../components/PassCheck";

function PersonalInfo({ setStep, setImpUid }) {
  const completeHandler = (impUid) => {
    setImpUid(impUid);
    setStep(2);
  };

  return (
    <div className="w-full sm:w-3/4 mx-auto flex flex-col gap-8 mt-20">
      <Title
        title="회원가입을 위해 본인인증을 진행해 주세요"
        className="hidden md:block"
      />
      <PassCheck completeHandler={completeHandler} />
      <div className="h-56" />
    </div>
  );
}

export default PersonalInfo;
