function RoundBtn({ name, onClick }) {
  return (
    <button
      className="py-2 px-4 text-white bg-primary text-sm md:text-lg rounded-full hover:bg-sky-700"
      onClick={() => onClick()}
    >
      {name}
    </button>
  );
}

export default RoundBtn;
