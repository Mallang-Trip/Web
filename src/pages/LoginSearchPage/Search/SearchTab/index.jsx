function SearchTab({ mode, setMode }) {
  const SelectedStyle = "bg-primary text-white";
  const NoneSelectedStyle = "bg-white text-primary border border-primary";

  return (
    <div className="w-full md:w-3/5 mx-auto px-2">
      <button
        className={`w-1/2 h-12 rounded-l-lg ${
          mode === "id" ? SelectedStyle : NoneSelectedStyle
        }`}
        onClick={() => setMode("id")}
      >
        아이디 찾기
      </button>
      <button
        className={`w-1/2 h-12 rounded-r-lg ${
          mode === "password" || mode === "NewPassword"
            ? SelectedStyle
            : NoneSelectedStyle
        }`}
        onClick={() => setMode("password")}
      >
        비밀번호 찾기
      </button>
    </div>
  );
}

export default SearchTab;
