import logo from "../../../assets/images/logo.png";

function Complete() {
  return (
    <div className="w-96 my-24 mx-auto py-10 bg-skyblue rounded-lg shadow-lg">
      <p className="w-full text-center text-primary text-xl whitespace-pre">
        {
          "제출이 완료 되었습니다!\n\n드라이버 심사를 진행 중이며,\n추후 말랑트립에서 연락드리겠습니다.\n\n말랑트립의 드라이버로 지원해주셔서\n감사드립니다."
        }
      </p>
      <img src={logo} alt="mallangtrip" className="w-32 ml-auto mt-24 mr-10" />
    </div>
  );
}

export default Complete;
