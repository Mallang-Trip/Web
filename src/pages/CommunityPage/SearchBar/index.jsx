import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {
  const location = useLocation();
  const navigation = useNavigate();
  const [searchArticleKeyword, setSearchArticleKeyword] = useState("");

  const searchArticleHandler = (e) => {
    e.preventDefault();
    if (searchArticleKeyword === "") return;

    const replacePage = location.pathname.slice(0, 17) === "/community/search";
    setSearchArticleKeyword("");
    navigation(`/community/search/${searchArticleKeyword}`, {
      replace: replacePage,
    });
  };

  return (
    <div className="relative w-full ml-auto xl:w-96 my-2 max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-primary"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <form onSubmit={searchArticleHandler}>
        <input
          type="text"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border-2 rounded-full border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-30"
          placeholder="게시글을 검색해보세요"
          value={searchArticleKeyword}
          onChange={(e) => setSearchArticleKeyword(e.target.value)}
        />
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
}

export default SearchBar;
