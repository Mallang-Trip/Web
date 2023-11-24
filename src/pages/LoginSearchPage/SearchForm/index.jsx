import React from "react";
import NewPassword from "../NewPassword";
import SearchAcount from "../SearchAcount";

function SearchForm(props) {
  return (
    <div className="w-full md:w-3/5 mx-auto mt-10 px-2">
      {props.mode === "NewPassword" ? (
        <NewPassword setCompleteSearch={props.setCompleteSearch} />
      ) : (
        <SearchAcount
          mode={props.mode}
          setMode={props.setMode}
          setCompleteSearch={props.setCompleteSearch}
        />
      )}
    </div>
  );
}

export default SearchForm;
