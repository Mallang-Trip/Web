import { useEffect } from "react";
import { uploadImage } from "../../../api/image";
import ImageInput from "./ImageInput";

function DriverDocument({
  setActiveNext,
  driverLicense,
  setDriverLicense,
  taxiLicense,
  setTaxiLicense,
  insurance,
  setInsurance,
}) {
  const imageHandler = async (inputId) => {
    const imageFile = document.getElementById(inputId).files[0];

    if (inputId === "driverLicense") {
      if (!imageFile) setDriverLicense(null);
      else setDriverLicense(await uploadImage(imageFile));
    }
    if (inputId === "taxiLicense") {
      if (!imageFile) setTaxiLicense(null);
      else setTaxiLicense(await uploadImage(imageFile));
    }
    if (inputId === "insurance") {
      if (!imageFile) setInsurance(null);
      else setInsurance(await uploadImage(imageFile));
    }
  };

  useEffect(() => {
    if (driverLicense && taxiLicense && insurance) setActiveNext(true);
    else setActiveNext(false);
  }, [driverLicense, taxiLicense, insurance]);

  return (
    <div className="w-full md:w-3/4 mx-auto flex flex-col gap-8">
      <ImageInput
        title="운전면허증"
        image={driverLicense}
        name="driverLicense"
        imageHandler={imageHandler}
      />
      <ImageInput
        title="택시운전면허증"
        image={taxiLicense}
        name="taxiLicense"
        imageHandler={imageHandler}
      />
      <ImageInput
        title="보험증서"
        image={insurance}
        name="insurance"
        imageHandler={imageHandler}
      />
    </div>
  );
}

export default DriverDocument;
