import { Dispatch, memo, SetStateAction } from "react";
import SearchForm from "./SearchForm";
import SearchTab from "./SearchTab";

interface Props {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  setCompleteSearch: Dispatch<SetStateAction<boolean>>;
  setLoginId: Dispatch<SetStateAction<string>>;
}

function Search({ mode, setMode, setCompleteSearch, setLoginId }: Props) {
  return (
    <>
      <SearchTab mode={mode} setMode={setMode} />
      <SearchForm
        mode={mode}
        setMode={setMode}
        setCompleteSearch={setCompleteSearch}
        setLoginId={setLoginId}
      />
    </>
  );
}

export default memo(Search);
