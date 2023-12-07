import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "./UserService";
import UserPrivacy from "./UserPrivacy";
import UserLocation from "./UserLocation";
import DriverService from "./DriverService";
import DriverPrivacy from "./DriverPrivacy";
import DriverLocation from "./DriverLocation";

function PolicyPage() {
  const { category, type } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [category, type]);

  if (category === "user") {
    if (type === "service") return <UserService />;
    if (type === "privacy") return <UserPrivacy />;
    if (type === "location") return <UserLocation />;
  }
  if (category === "driver") {
    if (type === "service") return <DriverService />;
    if (type === "privacy") return <DriverPrivacy />;
    if (type === "location") return <DriverLocation />;
  }
  return navigation("/", { replace: true });
}

export default PolicyPage;
