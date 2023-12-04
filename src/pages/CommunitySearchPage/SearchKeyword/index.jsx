import { useParams } from "react-router-dom";

function SearchKeyword() {
  const { keyword } = useParams();

  return (
    <div className="mt-2 mb-9 text-xl text-black font-bold text-center">
      <span>"</span>
      <span className="text-primary">{keyword}</span>
      <span>" 검색 결과</span>
    </div>
  );
}

export default SearchKeyword;
