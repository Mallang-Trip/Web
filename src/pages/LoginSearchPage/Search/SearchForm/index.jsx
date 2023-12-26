import { useState } from "react";
import NewPassword from "./NewPassword";
import SearchAcount from "./SearchAcount";

function SearchForm({ mode, setMode, setCompleteSearch, setLoginId }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="w-full md:w-3/5 mx-auto mt-10 px-2">
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

export default SearchForm;
