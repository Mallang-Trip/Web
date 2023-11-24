function PriceInfo({ modifyMode, content, setShowModal }) {
  return (
    <div
      className={`py-4 px-6 rounded-xl whitespace-nowrap text-sm text-center ${
        modifyMode
          ? "text-primary bg-skyblue cursor-pointer"
          : "text-darkgray bg-[#F4F4F4]"
      }`}
      onClick={() => modifyMode && setShowModal(true)}
    >
      {content}
    </div>
  );
}

export default PriceInfo;
