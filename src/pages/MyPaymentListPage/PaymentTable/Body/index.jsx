import { useNavigate } from "react-router-dom";

function Body({
  userId,
  userNickname,
  driverRegion,
  loginId,
  suspensionDuration,
  createdAt,
  setProfileId,
  setShowProfileModal,
}) {
  const navigation = useNavigate();

  return (
    <div className="w-full py-3 grid grid-cols-6 items-center text-center bg-white border border-gray300 rounded-xl">
      <button className="px-1 text-primary font-medium">{"울릉도 파티"}</button>
      <p className="px-1 text-gray500 font-medium">{"2024.05.11"}</p>
      <p className="px-1 text-gray500 font-medium">{"2024.05.11 13:00:00"}</p>
      <p className="px-1 text-gray700 font-medium">{"25,000원"}</p>
      <p className="px-1 text-gray700 font-medium">{"결제 완료"}</p>
      <button
        className="px-1 text-[#3F8EE6] font-medium"
        onClick={() => console.log("first")}
      >
        {"영수증"}
      </button>
    </div>
  );
}

export default Body;
