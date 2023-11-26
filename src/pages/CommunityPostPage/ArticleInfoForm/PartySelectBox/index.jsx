function PartySelectBox({ selectedParty, setSelectedParty }) {
  return (
    <>
      <button
        className="w-[200px] h-[50px] border border-[#D9D9D9] rounded-lg py-4 px-5 text-sm text-black flex items-center"
        onClick={() => console.log("modal")}
      >
        {selectedParty}
      </button>
    </>
  );
}

export default PartySelectBox;
