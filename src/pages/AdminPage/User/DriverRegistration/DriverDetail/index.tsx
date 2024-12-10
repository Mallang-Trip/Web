import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewDriverInfo } from "../../../../../types";
import Loading from "../../../../../components/Loading";
import AcceptButton from "./AcceptButton";
import BasicInfo from "./BasicInfo";
import Introduction from "./Introduction";
import LicenseList from "./LicenseList";
import Price from "./Price";
import ProfileImage from "./ProfileImage";
import Vehicle from "./Vehicle";

interface Props {
  driverInfo: NewDriverInfo;
  getDriverApplyAdminFunc: () => void;
}

function DriverDetail({ driverInfo, getDriverApplyAdminFunc }: Props) {
  const navigation = useNavigate();

  useEffect(() => {
    if (!driverInfo?.driverId)
      navigation("/admin/driver-registration", { replace: true });
  }, []);

  if (!driverInfo?.driverId) return <Loading full={true} />;
  return (
    <div className="w-full text-base text-black font-medium">
      <ProfileImage name={driverInfo.accountHolder} />
      <BasicInfo {...driverInfo} />
      <Introduction introduction={driverInfo.introduction} />
      <Vehicle {...driverInfo} />
      <Price prices={driverInfo.prices} />
      <LicenseList {...driverInfo} />
      <AcceptButton getDriverApplyAdminFunc={getDriverApplyAdminFunc} />
    </div>
  );
}

export default memo(DriverDetail);
