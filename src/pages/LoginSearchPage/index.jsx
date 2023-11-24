import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Logo from "../../assets/images/logo.png";
import SearchComplete from "./SearchComplete";
import SearchTab from "./SearchTab";
import SearchForm from "./SearchForm";

function LoginSearchPage() {
  const { target } = useParams();
  const navigation = useNavigate();
  const [mode, setMode] = useState(target);
  const [completeSearch, setCompleteSearch] = useState(false);

  return (
    <PageContainer>
      <div className="flex justify-center mt-48 mb-12">
        <img
          src={Logo}
          className="h-9 cursor-pointer"
          alt="Mallang_Trip_Logo"
          onClick={() => navigation("/")}
        />
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
    </PageContainer>
  );
}

export default LoginSearchPage;
