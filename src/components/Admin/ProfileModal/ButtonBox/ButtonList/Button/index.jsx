function Button({ name, onClick, type }) {
  return (
    <button
      className={`w-28 h-10 rounded-full border text-lg text-bold ${type === "red" ? "text-[#F00] border-[#F00] bg-[#FFEAEA]" : "text-primary border-primary bg-skyblue"}`}
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}

export default Button;
