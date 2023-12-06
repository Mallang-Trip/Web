import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "./UserService";
import UserPrivacy from "./UserPrivacy";
import UserLocation from "./UserLocation";
import DriverService from "./DriverService";
import DriverPrivacy from "./DriverPrivacy";

function PolicyPage() {
  const { category, type } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [category, type]);

  if (category === "user" && type === "service") return <UserService />;
  if (category === "user" && type === "privacy") return <UserPrivacy />;
  if (category === "user" && type === "location") return <UserLocation />;
  if (category === "driver" && type === "service") return <DriverService />;
  if (category === "driver" && type === "privacy") return <DriverPrivacy />;
  return <div>PolicyPage</div>;
}

export default PolicyPage;
