function Button({ name }) {
  return (
    <button className="rounded-full w-28 h-10 border border-primary text-lg text-primary bg-skyblue">
      {name}
    </button>
  );
}

export default Button;
