import { useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import HeadLogo from "./HeadLogo";
import SearchComplete from "./SearchComplete";
import Search from "./Search";

function LoginSearchPage() {
  const { target } = useParams();
  const [mode, setMode] = useState(target);
  const [completeSearch, setCompleteSearch] = useState(false);
  const [loginId, setLoginId] = useState("");

  return (
    <PageContainer>
      <HeadLogo />
      {completeSearch ? (
        <SearchComplete
          mode={mode}
          setMode={setMode}
          setCompleteSearch={setCompleteSearch}
          loginId={loginId}
        />
      ) : (
        <Search
          mode={mode}
          setMode={setMode}
          setCompleteSearch={setCompleteSearch}
          setLoginId={setLoginId}
        />
      )}
    </PageContainer>
  );
}

export default LoginSearchPage;
