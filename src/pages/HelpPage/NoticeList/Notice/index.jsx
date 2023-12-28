import { useNavigate } from "react-router-dom";

function Notice({ index, noticeId, title, date }) {
  const navigation = useNavigate();

  return (
    <div className="w-full px-5 py-4 flex gap-12 justify-between items-center text-sm text-black text-center bg-white border-b border-[#D9D9D9]">
      <div className="w-8 flex-shrink-0">{index}</div>
      <div className="w-full flex">
        <button
          className="text-left whitespace-normal hover:underline focus:outline-none"
          onClick={() => navigation(`/help/${noticeId}`)}
        >
          {title}
        </button>
      </div>
      <div className="w-20 flex-shrink-0">{date}</div>
    </div>
  );
}

export default Notice;
