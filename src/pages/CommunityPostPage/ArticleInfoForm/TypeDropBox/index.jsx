import info from "../../../../assets/svg/Polygon 3.svg";

function TypeDropBox({
  showDropBox,
  setShowDropBox,
  selectedType,
  setSelectedType,
}) {
  const selectHandler = (item) => {
    setShowDropBox(false);
    setTimeout(() => setSelectedType(item), 300);
  };

  return (
    <div
      className={`w-[200px] border border-[#D9D9D9] rounded-lg overflow-hidden transition-all duration-500 ${
        showDropBox ? "max-h-[1000px]" : "max-h-[50px]"
      }`}
    >
      <button
        className="w-full h-[50px] flex justify-between items-center py-4 px-5"
        onClick={() => setShowDropBox(!showDropBox)}
      >
        <span className="text-sm text-black">{selectedType}</span>
        <img
          src={info}
          alt="select_box"
          className={`w-2.5 h-2.5 transition-all duration-500 ${
            showDropBox ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <button
        className="w-full h-[50px] flex justify-between items-center py-4 px-5 hover:bg-skyblue"
        onClick={() => selectHandler("자유게시판")}
      >
        <span className="text-sm text-black">자유게시판</span>
      </button>
      <button
        className="w-full h-[50px] flex justify-between items-center py-4 px-5 hover:bg-skyblue"
        onClick={() => selectHandler("동행구해요")}
      >
        <span className="text-sm text-black">동행구해요</span>
      </button>
      <button
        className="w-full h-[50px] flex justify-between items-center py-4 px-5 hover:bg-skyblue"
        onClick={() => selectHandler("피드백")}
      >
        <span className="text-sm text-black">피드백</span>
      </button>
    </div>
  );
}

export default TypeDropBox;
