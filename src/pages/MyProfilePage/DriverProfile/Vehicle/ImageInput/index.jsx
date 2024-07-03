import primaryPlus from "../../../../../assets/svg/primary_plus.svg";
function ImageInput() {
  return (
    <div className="w-48 bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center">
      <img src={primaryPlus} alt="plus" className="w-4 h-4" />
    </div>
  );
}

export default ImageInput;
