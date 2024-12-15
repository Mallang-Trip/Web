import { Dispatch, memo, SetStateAction, useMemo } from "react";
import clsx from "clsx";

interface Props {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
}

function SearchTab({ mode, setMode }: Props) {
  const SelectedStyle = useMemo(() => "bg-primary text-white", []);
  const NoneSelectedStyle = useMemo(
    () => "bg-white text-primary border border-primary",
    []
  );

  return (
    <div className="w-full max-w-[600px] mx-auto px-2">
      <button
        className={clsx(
          "w-1/2 h-12 rounded-l-lg",
          mode === "id" ? SelectedStyle : NoneSelectedStyle
        )}
        onClick={() => setMode("id")}
      >
        아이디 찾기
      </button>
      <button
        className={clsx(
          "w-1/2 h-12 rounded-r-lg",
          mode === "password" || mode === "NewPassword"
            ? SelectedStyle
            : NoneSelectedStyle
        )}
        onClick={() => setMode("password")}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}

export default memo(SearchTab);
