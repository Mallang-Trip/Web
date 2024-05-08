function Button({ name, onClick, type }) {
  return (
    <button
      className={`w-24 h-10 rounded-full border text-base ${type === "red" ? "text-[#FF0000] border-[#FF0000] bg-[#FFEAEA]" : "text-primary border-primary bg-skyblue"}`}
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}

export default Button;
