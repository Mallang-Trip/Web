import { useParams } from "react-router-dom";

function JoinButton({ joinHandler }) {
  const { type } = useParams();

  return (
    <div className="flex justify-center mt-20">
      <button
        className="h-14 text-white rounded-full text-lg font-bold w-64 md:w-80 bg-primary"
        onClick={joinHandler}
      >
        {type === "detail" ? "파티 가입하기" : "가입 완료하기"}
      </button>
    </div>
  );
}

export default JoinButton;
