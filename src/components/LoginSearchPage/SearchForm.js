import React from "react";
import SearchPassword from "./SearchPassword";
import SearchEmail from "./SearchEmail";
import NewPassword from "./NewPassword";

function SearchForm(props) {
  return (
    <div className="w-[656px] mx-auto mt-10">
      {props.mode === "email" ? (
        <SearchEmail setCompleteSearch={props.setCompleteSearch} />
      ) : props.mode === "password" ? (
        <SearchPassword setMode={props.setMode} />
      ) : (
        <NewPassword setCompleteSearch={props.setCompleteSearch} />
      )}
    </div>
  );
}

export default SearchForm;
