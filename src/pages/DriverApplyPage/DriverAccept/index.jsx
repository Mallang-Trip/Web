import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";

function DriverAccept() {
  const navigation = useNavigate();

  return (
    <>
      <div className="w-96 mt-24 mx-auto py-10 bg-skyblue rounded-lg shadow-lg">
        <p className="w-full text-center text-black text-lg whitespace-pre">
          {
            "축하드립니다!\n\n드라이버 등록 심사가 완료되었으며,\n성공적으로 등록이 승인되었습니다.\n\n이제 말랑트립의 드라이버로 활동이 가능합니다.\n\n지원해주셔서 감사합니다."
          }
        </p>
        <img
          src={logo}
          alt="mallangtrip"
          className="w-32 ml-auto mt-16 mr-10"
        />
      </div>

      <div className="flex justify-center mt-16 mx-auto">
        <button
          type="button"
          className="h-12 bg-skyblue border rounded-full text-primary text-sm w-64 border-primary"
          onClick={() => navigation(-1)}
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </>
  );
}

export default DriverAccept;
