import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import SearchComplete from "../components/LoginSearchPage/SearchComplete";
import SearchTab from "../components/LoginSearchPage/SearchTab";
import SearchForm from "../components/LoginSearchPage/SearchForm";

function LoginSearchPage() {
  const { target } = useParams();
  const [mode, setMode] = useState(target);
  const [completeSearch, setCompleteSearch] = useState(false);

  return (
    <div className="h-screen">
      <div className="flex justify-center mt-48 mb-12">
        <img src={Logo} className="h-9" alt="Mallang_Trip_Logo" />
      </div>
      {completeSearch ? (
        <SearchComplete mode={mode} />
      ) : (
        <>
          <SearchTab mode={mode} setMode={setMode} />
          <SearchForm
            mode={mode}
            setMode={setMode}
            setCompleteSearch={setCompleteSearch}
          />
        </>
      )}
    </div>
  );
}

export default LoginSearchPage;
