import primaryPlus from "../../../../../assets/svg/primary_plus.svg";
import InputImage from "../../../../../components/InputImage";

function ImageInput({ vehicleImageRef, vehicleImageHandler }) {
  return (
    <div
      className="shrink-0 w-48 h-full bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
      onClick={() => vehicleImageRef.current.click()}
    >
      <img src={primaryPlus} alt="plus" className="w-4 h-4" />
      <InputImage
        id="carImage_upload"
        inputRef={vehicleImageRef}
        className="hidden"
        onChange={vehicleImageHandler}
      />
    </div>
  );
}

export default ImageInput;
