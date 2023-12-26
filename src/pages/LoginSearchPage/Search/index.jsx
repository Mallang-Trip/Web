import SearchForm from "./SearchForm";
import SearchTab from "./SearchTab";

function Search({ mode, setMode, setCompleteSearch, setLoginId }) {
  return (
    <>
      <SearchTab mode={mode} setMode={setMode} />
      <SearchForm
        mode={mode}
        setMode={setMode}
        setCompleteSearch={setCompleteSearch}
        setLoginId={setLoginId}
      />
    </>
  );
}

export default Search;
