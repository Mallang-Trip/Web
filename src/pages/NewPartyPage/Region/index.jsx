import { useEffect, useState } from "react";
import { getPartyRegionList } from "../../../api/region";
import CheckModal from "../../../components/CheckModal";
import RegionButton from "./RegionButton";

function Region({ setRegion, member, driverId, date, driverInfo }) {
  const [regionData, setRegionData] = useState([]);
  const [showKakaoChatModal, setShowKakaoChatModal] = useState(false);

  const kakaoChatHandler = () => {
    const newWindow = window.open(
      "http://pf.kakao.com/_tfMxaG/chat",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
    setShowKakaoChatModal(false);
  };

  const getPartyRegionListFunc = async () => {
    try {
      const result = await getPartyRegionList();
      const lastItem = result.payload.filter((item) =>
        item.name.includes("그 외")
      );
      const otherItems = result.payload.filter(
        (item) => !item.name.includes("그 외")
      );
      if (driverId === "null" || driverId === 0)
        setRegionData([...otherItems, ...lastItem]);
      else if (JSON.stringify(driverInfo) !== "{}") {
        setRegionData(
          result.payload.filter((item) => driverInfo.region.includes(item.name))
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPartyRegionListFunc();
  }, [driverInfo]);

  return (
    <>
      <div className="pl-6 mx-auto text-2xl text-black font-bold">
        가고 싶은 여행지를 찾아요
      </div>
      <div className="grid grid-cols-1 gap-10 px-6 mx-auto py-8 lg:grid-cols-3 xl:grid-cols-4 overflow-auto">
        {regionData.map((item) => (
          <RegionButton
            {...item}
            key={item.regionId}
            setRegion={setRegion}
            member={member}
            driverId={driverId}
            date={date}
            setShowKakaoChatModal={setShowKakaoChatModal}
          />
        ))}
      </div>
      <CheckModal
        showModal={showKakaoChatModal}
        setShowModal={setShowKakaoChatModal}
        message={`여행을 희망하시는 지역을\n말랑트립 카카오톡으로 알려주세요.\n\n카카오톡 1:1 상담으로 이동하시겠습니까?`}
        noText="아니오"
        yesText="예"
        yesHandler={kakaoChatHandler}
      />
    </>
  );
}

export default Region;
