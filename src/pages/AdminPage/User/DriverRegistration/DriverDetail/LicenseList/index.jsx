import LicenseItem from "./LicenseItem";

function LicenseList({
  driverLicenceImg,
  taxiLicenceImg,
  insuranceLicenceImg,
}) {
  return (
    <div className="mt-20 flex flex-col gap-10 justify-center items-center">
      <LicenseItem title="운전면허증" image={driverLicenceImg} />
      <LicenseItem title="택시운전면허증" image={taxiLicenceImg} />
      <LicenseItem title="보험증서" image={insuranceLicenceImg} />
    </div>
  );
}

export default LicenseList;
