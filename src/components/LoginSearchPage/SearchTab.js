import React from "react";

function SearchTab(props) {
  const [SelectedStyle, NoneSelectedStyle] = [
    "bg-primary text-white",
    "bg-white text-primary border border-primary",
  ];

  return (
    <div className="w-[656px] mx-auto">
      <button
        className={`w-1/2 h-12 rounded-l-lg ${
          props.mode === "id" ? SelectedStyle : NoneSelectedStyle
        }`}
        onClick={() => props.setMode("id")}
      >
        아이디 찾기
      </button>
      <button
        className={`w-1/2 h-12 rounded-r-lg ${
          props.mode === "password" || props.mode === "NewPassword"
            ? SelectedStyle
            : NoneSelectedStyle
        }`}
        onClick={() => props.setMode("password")}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}

export default SearchTab;
