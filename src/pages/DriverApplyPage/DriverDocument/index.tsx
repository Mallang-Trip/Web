import { Dispatch, memo, SetStateAction, useCallback, useEffect } from "react";
import { uploadImage } from "../../../api/image";
import ImageInput from "./ImageInput";

interface Props {
  setActiveNext: Dispatch<SetStateAction<boolean>>;
  driverLicense: string | undefined;
  setDriverLicense: Dispatch<SetStateAction<string | undefined>>;
  taxiLicense: string | undefined;
  setTaxiLicense: Dispatch<SetStateAction<string | undefined>>;
  insurance: string | undefined;
  setInsurance: Dispatch<SetStateAction<string | undefined>>;
}

function DriverDocument({
  setActiveNext,
  driverLicense,
  setDriverLicense,
  taxiLicense,
  setTaxiLicense,
  insurance,
  setInsurance,
}: Props) {
  const imageHandler = useCallback(async (inputId: string) => {
    const imageFile = (document.getElementById(inputId) as HTMLInputElement)
      ?.files?.[0];

    if (inputId === "driverLicense") {
      if (!imageFile) setDriverLicense(undefined);
      else setDriverLicense(await uploadImage(imageFile));
    }
    if (inputId === "taxiLicense") {
      if (!imageFile) setTaxiLicense(undefined);
      else setTaxiLicense(await uploadImage(imageFile));
    }
    if (inputId === "insurance") {
      if (!imageFile) setInsurance(undefined);
      else setInsurance(await uploadImage(imageFile));
    }
  }, []);

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

export default memo(DriverDocument);
