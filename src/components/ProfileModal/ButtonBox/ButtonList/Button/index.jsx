function Button({ name, onClick }) {
  return (
    <button
      className="rounded-full py-2 px-5 border border-primary text-base text-primary bg-skyblue"
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}

export default Button;
