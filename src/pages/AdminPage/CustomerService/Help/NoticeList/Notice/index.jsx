import { useNavigate } from "react-router-dom";

function Notice({ index, announcementId, title, createdAt }) {
  const navigation = useNavigate();

  return (
    <div className="w-full px-5 py-4 flex gap-12 justify-between items-center text-sm text-black text-center bg-white border-b border-mediumgray">
      <div className="w-8 flex-shrink-0">{index}</div>
      <div className="w-full flex">
        <button
          className="text-left whitespace-normal hover:underline focus:outline-none"
          onClick={() =>
            navigation(`/admin/help?mode=detail&article_id=${announcementId}`)
          }
        >
          {title}
        </button>
      </div>
      <div className="w-20 flex-shrink-0">
        {createdAt.slice(0, 10).replaceAll("-", ".")}
      </div>
    </div>
  );
}

export default Notice;
