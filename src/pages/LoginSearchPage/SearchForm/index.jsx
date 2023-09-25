import React from "react";
import NewPassword from "../NewPassword";
import SearchAcount from "../SearchAcount";

function SearchForm(props) {
  return (
    <div className="w-3/5 mx-auto mt-10">
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
