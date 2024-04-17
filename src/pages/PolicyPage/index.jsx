import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "./UserService";
import UserPrivacy from "./UserPrivacy";
import UserLocation from "./UserLocation";
import UserRefund from "./UserRefund";
import DriverService from "./DriverService";
import DriverPrivacy from "./DriverPrivacy";
import DriverLocation from "./DriverLocation";
import DriverRefund from "./DriverRefund";

function PolicyPage() {
  const { category, type } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [category, type]);

  if (category === "user") {
    if (type === "service") return <UserService />;
    if (type === "privacy") return <UserPrivacy />;
    if (type === "location") return <UserLocation />;
    if (type === "refund") return <UserRefund />;
  }
  if (category === "driver") {
    if (type === "service") return <DriverService />;
    if (type === "privacy") return <DriverPrivacy />;
    if (type === "location") return <DriverLocation />;
    if (type === "refund") return <DriverRefund />;
  }
  return navigation("/", { replace: true });
}

export default PolicyPage;
