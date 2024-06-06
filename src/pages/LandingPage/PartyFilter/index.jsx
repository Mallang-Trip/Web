import { useState } from "react";
import CheckModal from "../../../components/CheckModal";
import Loading from "../../../components/Loading";
import Filter from "./Filter";
import RegionModal from "./RegionModal";
import DateModal from "./DateModal";
import PeopleModal from "./PeopleModal";
import PriceModal from "./PriceModal";

function PartyFilter() {
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showKakaoChatModal, setShowKakaoChatModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);

  const kakaoChatHandler = () => {
    const newWindow = window.open(
      "http://pf.kakao.com/_tfMxaG/chat",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
    setShowKakaoChatModal(false);
  };

  return (
    <div className="mt-3 mb-10">
      <Filter
        setShowRegionModal={setShowRegionModal}
        setShowDateModal={setShowDateModal}
        setShowPeopleModal={setShowPeopleModal}
        setShowPriceModal={setShowPriceModal}
      />

      <RegionModal
        showModal={showRegionModal}
        setShowModal={setShowRegionModal}
        setShowKakaoChatModal={setShowKakaoChatModal}
      />
      <CheckModal
        showModal={showKakaoChatModal}
        setShowModal={setShowKakaoChatModal}
        message={
          showKakaoChatModal ? (
            "여행을 희망하시는 지역을\n말랑트립 카카오톡으로 알려주세요.\n\n카카오톡 1:1 상담으로 이동하시겠습니까?"
          ) : (
            <Loading />
          )
        }
        noText="아니오"
        yesText="예"
        yesHandler={kakaoChatHandler}
      />
      <DateModal showModal={showDateModal} setShowModal={setShowDateModal} />
      <PeopleModal
        showModal={showPeopleModal}
        setShowModal={setShowPeopleModal}
      />
      <PriceModal showModal={showPriceModal} setShowModal={setShowPriceModal} />
    </div>
  );
}

export default PartyFilter;
