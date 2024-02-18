import { useNavigate, useParams } from "react-router-dom";

function PageButton({ region, member, date, driverId, nextOK }) {
  const { step } = useParams();
  const navigation = useNavigate();

  if (step !== "2" && step !== "3") return null;
  return (
    <div className="w-full flex justify-center gap-7 my-24 mx-auto px-4">
      <button
        className="h-12 bg-white rounded-full text-darkgray text-sm w-64 border border-darkgray"
        onClick={() => navigation(-1)}
      >
        뒤로가기
      </button>
      <button
        className={`h-12 rounded-full text-sm w-64 border ${
          nextOK
            ? "text-white bg-primary border-primary"
            : "text-darkgray bg-lightgray border-lightgray"
        }`}
        disabled={!nextOK}
        onClick={() =>
          navigation(
            `/party/new/${
              Number(step) + 1
            }?region=${region}&member=${member}&date=${date}&driverId=${driverId}`
          )
        }
      >
        다음
      </button>
    </div>
  );
}

export default PageButton;
