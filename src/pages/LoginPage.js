import React, { useState } from "react";
import LoginForm from "../components/LoginPage/LoginForm";
import Searchbuttons from "../components/LoginPage/Searchbuttons";
import SearchTab from "../components/LoginPage/SearchTab";
import SearchForm from "../components/LoginPage/SearchForm";
import SearchComplete from "../components/LoginPage/SearchComplete";

function LoginPage() {
  const [mode, setMode] = useState("LOGIN");
  const [completeSearch, setCompleteSearch] = useState(false);

  return (
    <div>
      {completeSearch ? (
        <>
          <SearchComplete
            mode={mode}
            setMode={setMode}
            setCompleteSearch={setCompleteSearch}
          />
        </>
      ) : mode === "LOGIN" ? (
        <>
          <LoginForm />
          <Searchbuttons setMode={setMode} />
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

export default LoginPage;
