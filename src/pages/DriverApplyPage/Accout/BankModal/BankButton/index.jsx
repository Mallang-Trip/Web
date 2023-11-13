function BankButton({ name, bank, setBank }) {
  return (
    <button
      className={`h-12 text-sm rounded-lg text-center ${
        bank === name
          ? "text-primary bg-skyblue"
          : "text-darkgray bg-lightgray hover:bg-skyblue"
      }`}
      onClick={() => setBank(name)}
    >
      {name}
    </button>
  );
}

export default BankButton;
