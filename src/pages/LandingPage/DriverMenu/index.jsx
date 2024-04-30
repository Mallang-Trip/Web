import { useSelector } from "react-redux";

function DriverMenu({ driverMenu, setDriverMenu }) {
  const user = useSelector((state) => state.user);

  if (user.role !== "ROLE_DRIVER") return null;
  return (
    <div className="flex justify-start gap-6 mb-6">
      <button
        className={`text-2xl font-bold transition-all duration-500 ${driverMenu === "driver" ? "text-gray800" : "text-gray400"}`}
        onClick={() => setDriverMenu("driver")}
      >
        드라이버 홈
      </button>
      <button
        className={`text-2xl font-bold transition-all duration-500 ${driverMenu === "user" ? "text-gray800" : "text-gray400"}`}
        onClick={() => setDriverMenu("user")}
      >
        여행자 홈
      </button>
    </div>
  );
}

export default DriverMenu;
