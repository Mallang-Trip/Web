import { Dispatch, FormEvent, memo, SetStateAction } from "react";
import cross from "../../../assets/svg/cross.svg";

interface Props {
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  submitHandler: (
    event: FormEvent<HTMLFormElement> | undefined,
    keyword?: string
  ) => void;
  getAllMarkersFunc: () => void;
  isAllMarker: boolean;
}

function SearchBox({
  searchKeyword,
  setSearchKeyword,
  submitHandler,
  getAllMarkersFunc,
  isAllMarker,
}: Props) {
  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center">
      <div className="relative flex w-64 mt-4">
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
        <form onSubmit={submitHandler} className="w-full">
          <input
            type="text"
            className="block w-full h-10 md:h-12 pl-10 text-sm text-gray-900 border-2 rounded-full border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-30"
            placeholder="여행지를 검색해보세요"
            value={searchKeyword}
            onChange={({ target }) => setSearchKeyword(target.value)}
          ></input>
          <button type="submit" className="hidden" />
        </form>
        {searchKeyword && (
          <button
            className="absolute inset-y-0 right-1 items-center pr-3 hover:cursor-pointer"
            onClick={() => {
              setSearchKeyword("");
              if (!isAllMarker) getAllMarkersFunc();
            }}
          >
            <img src={cross} />
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(SearchBox);
