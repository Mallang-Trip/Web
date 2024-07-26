import { useNavigate } from "react-router-dom";

function PageButton({ region, member, date, driverId, driverInfo }) {
  const navigation = useNavigate();

  return (
    <div className="w-full flex justify-center gap-7 my-24 mx-auto px-4">
      <button
        className="h-12 bg-white rounded-full text-darkgray text-sm w-64 border border-darkgray"
        onClick={() => navigation(-1)}
      >
        뒤로가기
      </button>
      <button
        className={
          "h-12 rounded-full text-sm w-64 border text-white bg-primary border-primary"
        }
        onClick={() => {
          if (driverId < 0 || driverId === "null")
            navigation(
              `/party/new/3?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
            );
          else if (driverInfo.courses.length > 0)
            navigation(
              `/party/new/4?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
            );
          else
            navigation(
              `/party/new/5?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
            );
        }}
      >
        다음
      </button>
    </div>
  );
}

export default PageButton;
