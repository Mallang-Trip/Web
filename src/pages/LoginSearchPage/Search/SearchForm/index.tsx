import { Dispatch, memo, SetStateAction, useState } from "react";
import NewPassword from "./NewPassword";
import SearchAcount from "./SearchAcount";

interface Props {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  setCompleteSearch: Dispatch<SetStateAction<boolean>>;
  setLoginId: Dispatch<SetStateAction<string>>;
}

function SearchForm({ mode, setMode, setCompleteSearch, setLoginId }: Props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="w-full max-w-[600px] mx-auto mt-10 px-2">
      {mode === "NewPassword" ? (
        <NewPassword
          setCompleteSearch={setCompleteSearch}
          phoneNumber={phoneNumber}
          code={code}
        />
      ) : (
        <SearchAcount
          mode={mode}
          setMode={setMode}
          setCompleteSearch={setCompleteSearch}
          setLoginId={setLoginId}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          code={code}
          setCode={setCode}
        />
      )}
    </div>
  );
}

export default memo(SearchForm);
