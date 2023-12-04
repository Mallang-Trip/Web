function PartyModalTab({ isTabHeart, setIsTabHeart }) {
  return (
    <div className="flex gap-2 mt-5 mb-9">
      <button
        className={`${
          isTabHeart
            ? "bg-primary text-white border-primary"
            : "bg-white text-darkgray border-darkgray"
        } border text-sm px-5 py-1.5 rounded-full`}
        onClick={() => setIsTabHeart(true)}
      >
        찜 목록
      </button>
      <button
        className={`${
          !isTabHeart
            ? "bg-primary text-white border-primary"
            : "bg-white text-darkgray border-darkgray"
        } border text-sm px-5 py-1.5 rounded-full`}
        onClick={() => setIsTabHeart(false)}
      >
        예약 내역
      </button>
    </div>
  );
}

export default PartyModalTab;
