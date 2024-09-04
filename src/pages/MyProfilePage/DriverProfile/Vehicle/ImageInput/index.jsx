import primaryPlus from "../../../../../assets/svg/primary_plus.svg";

function ImageInput({ vehicleImageRef, vehicleImageHandler }) {
  return (
    <div
      className="shrink-0 w-1/4 h-full bg-skyblue border border-dashed border-primary rounded-lg cursor-pointer flex justify-center items-center"
      onClick={() => vehicleImageRef.current.click()}
    >
      <img src={primaryPlus} alt="plus" className="w-4 h-4" />
      <input
        ref={vehicleImageRef}
        className="hidden"
        id="carImage_upload"
        type="file"
        accept="image/*"
        onChange={vehicleImageHandler}
      />
    </div>
  );
}

export default ImageInput;
