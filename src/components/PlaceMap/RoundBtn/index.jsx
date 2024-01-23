function RoundBtn({ name, onClick }) {
  return (
    <button
      className="py-2 px-10 text-white bg-primary text-sm md:text-base rounded-full"
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}

export default RoundBtn;
