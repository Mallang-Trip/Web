function PriceInfo({ modifyMode, content }) {
  return (
    <div
      className={`py-4 px-6 rounded-xl whitespace-nowrap text-sm text-center ${
        modifyMode ? "text-primary bg-skyblue" : "text-darkgray bg-[#F4F4F4]"
      }`}
    >
      {content}
    </div>
  );
}

export default PriceInfo;
