import React from "react";
import SearchPassword from "./SearchPassword";
import SearchEmail from "./SearchEmail";

function SearchForm(props) {
  return (
    <div className="w-[656px] mx-auto mt-10">
      {props.mode === "email" ? (
        <SearchEmail setCompleteSearch={props.setCompleteSearch} />
      ) : (
        <SearchPassword setCompleteSearch={props.setCompleteSearch} />
      )}
    </div>
  );
}

export default SearchForm;
