import React from "react";
import NewPassword from "./NewPassword";
import SearchAcount from "./SearchAcount";

function SearchForm({ mode, setMode, setCompleteSearch, setLoginId }) {
  return (
    <div className="w-full md:w-3/5 mx-auto mt-10 px-2">
      {mode === "NewPassword" ? (
        <NewPassword setCompleteSearch={setCompleteSearch} />
      ) : (
        <SearchAcount
          mode={mode}
          setMode={setMode}
          setCompleteSearch={setCompleteSearch}
          setLoginId={setLoginId}
        />
      )}
    </div>
  );
}

export default SearchForm;
