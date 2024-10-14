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
      <div className="flex flex-col justify-center h-real-screen absolute top-0 left-0 w-full">
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
      </div>
    </PageContainer>
  );
}

export default LoginSearchPage;
