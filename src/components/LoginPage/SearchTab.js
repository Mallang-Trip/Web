import React from "react";

function SearchTab(props) {
  const [SelectedStyle, NoneSelectedStyle] = [
    "bg-primary text-white",
    "bg-[#D9D9D9] text-black",
  ];

  return (
    <div className="w-[656px] mx-auto mt-10">
      <button
        className={`w-1/2 h-[48px] rounded-l-lg ${
          props.mode === "SEARCH_EMAIL" ? SelectedStyle : NoneSelectedStyle
        }`}
        onClick={() => props.setMode("SEARCH_EMAIL")}
      >
        이메일 찾기
      </button>
      <button
        className={`w-1/2 h-[48px] rounded-r-lg ${
          props.mode === "SEARCH_PASSWORD" ? SelectedStyle : NoneSelectedStyle
        }`}
        onClick={() => props.setMode("SEARCH_PASSWORD")}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}

export default SearchTab;
