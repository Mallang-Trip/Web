import { useEffect } from "react";
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
  const imageHandler = (inputId) => {
    const imageFile = document.getElementById(inputId).files[0];

    if (inputId === "driverLicense") setDriverLicense(imageFile || undefined);
    if (inputId === "taxiLicense") setTaxiLicense(imageFile || undefined);
    if (inputId === "insurance") setInsurance(imageFile || undefined);
  };

  useEffect(() => {
    if (driverLicense && taxiLicense && insurance) setActiveNext(true);
    else setActiveNext(false);
  }, [driverLicense, taxiLicense, insurance]);

  return (
    <div className="mx-10">
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
