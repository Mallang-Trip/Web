import { useNavigate, useParams } from "react-router-dom";

function PageButton() {
  const { step } = useParams();
  const navigation = useNavigate();

  return (
    <div className="w-full max-w-4xl flex justify-between my-24 mx-auto px-4">
      <button
        className="h-10 bg-white border rounded-full text-darkgray text-sm w-32 border-darkgray"
        onClick={() => navigation(-1)}
      >
        뒤로가기
      </button>
      <button
        className="h-10 text-white rounded-full text-sm w-32 bg-primary"
        onClick={() => navigation(`/party/new/${Number(step) + 1}`)}
      >
        다음
      </button>
    </div>
  );
}

export default PageButton;
