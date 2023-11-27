import imageModalPagination from "../../../../assets/svg/imageModalPagination.svg";

function NextButton({ imageIdx, setImageIdx, lastIndex }) {
  return (
    <>
      <button
        className={`w-10 h-10 md:w-14 md:h-14 bg-opacity-60 rounded flex justify-center items-center z-40 absolute top-1/2 left-2 transform -translate-y-1/2 ${
          imageIdx === 0 ? "bg-darkgray" : "bg-primary"
        }`}
        onClick={() => setImageIdx(imageIdx - 1)}
        disabled={imageIdx === 0}
      >
        <img src={imageModalPagination} alt="before" className="rotate-180" />
      </button>
      <button
        className={`w-10 h-10 md:w-14 md:h-14 bg-opacity-60 rounded flex justify-center items-center z-40 absolute top-1/2 right-2 transform -translate-y-1/2 ${
          imageIdx === lastIndex ? "bg-darkgray" : "bg-primary"
        }`}
        onClick={() => setImageIdx(imageIdx + 1)}
        disabled={imageIdx === lastIndex}
      >
        <img src={imageModalPagination} alt="next" />
      </button>
    </>
  );
}

export default NextButton;
