import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getPartyRegionList } from "../../../api/region";
import { DriverInfo, RegionData, Review } from "../../../types";
import CheckModal from "../../../components/CheckModal";
import Title from "../../../components/Title";
import RegionButton from "./RegionButton";

interface DriverInfoType extends DriverInfo {
  driverId: number;
  reservationCount: number;
  avgRate: number | null;
  reviews: Review[];
}

interface Props {
  setRegion: Dispatch<SetStateAction<string>>;
  member: number;
  driverId: string | number;
  date: string;
  driverInfo: DriverInfoType;
}

function Region({ setRegion, member, driverId, date, driverInfo }: Props) {
  const [regionData, setRegionData] = useState<RegionData[]>([]);
  const [showKakaoChatModal, setShowKakaoChatModal] = useState(false);

  const kakaoChatHandler = useCallback(() => {
    const newWindow = window.open(
      "http://pf.kakao.com/_tfMxaG/chat",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
    setShowKakaoChatModal(false);
  }, []);

  const getPartyRegionListFunc = useCallback(async () => {
    try {
      const result = await getPartyRegionList();
      const lastItem = result.payload.filter((item: RegionData) =>
        item.name.includes("그 외")
      );
      const otherItems = result.payload.filter(
        (item: RegionData) => !item.name.includes("그 외")
      );
      if (
        (typeof driverId === "number" && driverId === 0) ||
        driverId === "null"
      )
        setRegionData([...otherItems, ...lastItem]);
      else if (driverInfo.driverId === 0) {
        setRegionData(
          result.payload.filter((item: DriverInfoType) =>
            driverInfo.region.includes(item.name)
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, [driverId, driverInfo]);

  useEffect(() => {
    getPartyRegionListFunc();
  }, [driverInfo]);

  return (
    <>
      <Title title="출발지 선택하기" />
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

export default memo(Region);
