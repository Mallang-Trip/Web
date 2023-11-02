import DotButton from "./DotButton";

function Pagination({ images, imageIdx, setImageIdx }) {
  return (
    <div className="flex justify-center mt-5 gap-2">
      {images.map((_, index) => (
        <DotButton
          imageIdx={imageIdx}
          setImageIdx={setImageIdx}
          thisIdx={index}
          key={index}
        />
      ))}
    </div>
  );
}

export default Pagination;
