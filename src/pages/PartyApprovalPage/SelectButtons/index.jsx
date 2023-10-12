import { useNavigate, useParams } from "react-router-dom";

function SelectButtons() {
  const { partyId, type } = useParams();
  const navigation = useNavigate();

  return (
    <div className="flex justify-center gap-5">
      <button className="h-12 bg-white border rounded-full text-darkgray text-md w-64 md:w-80 border-darkgray">
        {type === "reservation" ? "예약 취소" : "제안 취소"}
      </button>
      <button
        className="h-12 text-white rounded-full text-md w-64 md:w-80 bg-primary"
        onClick={() => navigation(`/party/course/suggest/${partyId}`)}
      >
        다시 제안하기
      </button>
    </div>
  );
}

export default SelectButtons;
