import cross from "../../../../../assets/svg/cross.svg";

function SearchBar({
  submitHandler,
  keyword,
  setKeyword,
  setShowNewPlaceModal,
  getAllMarkersFunc,
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="relative flex w-1/2 my-4">
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
            placeholder="여행지 검색"
            value={keyword}
            onChange={({ target }) => setKeyword(target.value)}
          ></input>
          <button type="submit" className="hidden" />
        </form>
        {keyword && (
          <button
            className="absolute inset-y-0 right-1 items-center pr-3 hover:cursor-pointer"
            onClick={() => {
              setKeyword("");
              getAllMarkersFunc();
            }}
          >
            <img src={cross} />
          </button>
        )}
      </div>
      <button
        className="h-10 px-4 text-sm text-white bg-primary rounded-full"
        onClick={() => setShowNewPlaceModal(true)}
      >
        여행지 추가
      </button>
    </div>
  );
}

export default SearchBar;
