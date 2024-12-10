import { Dispatch, memo, SetStateAction } from "react";
import cross from "../../../../../assets/svg/cross.svg";

interface Props {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  regionId: string | null;
}

function SearchBar({ keyword, setKeyword, regionId }: Props) {
  if (regionId) return null;
  return (
    <div className="relative flex w-1/2">
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
      <div className="w-full">
        <input
          type="text"
          className="block w-full h-11 pl-10 text-sm text-gray-900 border-2 rounded-full border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-30"
          placeholder="지역 검색"
          value={keyword}
          onChange={({ target }) => setKeyword(target.value)}
        ></input>
        <button type="submit" className="hidden" />
      </div>
      {keyword && (
        <button
          className="absolute inset-y-0 right-1 items-center pr-3 hover:cursor-pointer"
          onClick={() => setKeyword("")}
        >
          <img src={cross} />
        </button>
      )}
    </div>
  );
}

export default memo(SearchBar);
