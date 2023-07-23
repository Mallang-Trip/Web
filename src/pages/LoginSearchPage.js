import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SearchComplete from "../components/LoginSearchPage/SearchComplete";
import SearchTab from "../components/LoginSearchPage/SearchTab";
import SearchForm from "../components/LoginSearchPage/SearchForm";

function LoginSearchPage() {
  const { target } = useParams();
  const [mode, setMode] = useState(target);
  const [completeSearch, setCompleteSearch] = useState(false);

  return (
    <div>
      {completeSearch ? (
        <>
          <SearchComplete mode={mode} />
        </>
      ) : (
        <>
          <SearchTab mode={mode} setMode={setMode} />
          <SearchForm mode={mode} setCompleteSearch={setCompleteSearch} />
        </>
      )}
    </div>
  );
}

export default LoginSearchPage;
