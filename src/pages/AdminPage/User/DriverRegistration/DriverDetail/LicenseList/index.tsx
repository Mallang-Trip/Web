import { memo } from "react";
import LicenseItem from "./LicenseItem";

interface Props {
  driverLicenceImg: string;
  taxiLicenceImg: string;
  insuranceLicenceImg: string;
}

function LicenseList({
  driverLicenceImg,
  taxiLicenceImg,
  insuranceLicenceImg,
}: Props) {
  return (
    <div className="mt-20 flex flex-col gap-10 justify-center items-center">
      <LicenseItem title="운전면허증" image={driverLicenceImg} />
      <LicenseItem title="택시운전면허증" image={taxiLicenceImg} />
      <LicenseItem title="보험증서" image={insuranceLicenceImg} />
    </div>
  );
}

export default memo(LicenseList);
