import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import SearchComplete from "./SearchComplete";
import SearchTab from "./SearchTab";
import SearchForm from "./SearchForm";

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
        <SearchComplete
          mode={mode}
          setMode={setMode}
          setCompleteSearch={setCompleteSearch}
        />
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
