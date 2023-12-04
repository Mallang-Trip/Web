import { useEffect, useRef, useState } from "react";
import { getLikeDestination } from "../../../../../api/destination";
import { getPartyList } from "../../../../../api/party";
import PartyModalTab from "./PartyModalTab";
import HeartList from "./HeartList";
import NoPartyButton from "./NoPartyButton";
import ReservationList from "./ReservationList";
import closeIcon from "../../../../../assets/svg/close_x_primary.svg";

function PartyModal({ showModal, setShowModal, setSelectedParty }) {
  const modalRef = useRef();
  const [isTabHeart, setIsTabHeart] = useState(true);
  const [myHeartData, setMyHeartData] = useState([]);
  const [myReservationData, setMyReservationData] = useState([]);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) setShowModal(false);
  };

  const getMyHeartData = async () => {
    try {
      const result = await getLikeDestination();
      setMyHeartData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  const getReservationData = async () => {
    try {
      const result = await getPartyList("all", ["all", "all"], 1, 1010000);
      setMyReservationData(result.payload);
    } catch (e) {
      console.log(e);
    }
  };

  const selectPartyHandler = (party) => {
    setSelectedParty(party);
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
      getMyHeartData();
      getReservationData();
      setIsTabHeart(true);
    } else document.body.classList.remove("overflow-hidden");
  }, [showModal]);

  return (
    <div
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
      className={`modal-container fixed top-0 left-0 z-50 w-screen h-screen bg-darkgray bg-opacity-50 scale-100 flex ${
        showModal ? "active" : ""
      }`}
    >
      <div className="m-auto shadow w-full max-w-[800px] h-[700px] px-8 py-9 bg-white rounded-lg relative">
        <p className="text-xl text-black font-bold">파티 선택</p>
        <img
          src={closeIcon}
          alt="close"
          className="absolute top-6 right-6 rounded-full hover:bg-skyblue cursor-pointer"
          onClick={() => setShowModal(false)}
        />
        <PartyModalTab isTabHeart={isTabHeart} setIsTabHeart={setIsTabHeart} />
        {isTabHeart ? (
          <HeartList
            myHeartData={myHeartData}
            selectPartyHandler={selectPartyHandler}
          />
        ) : (
          <ReservationList
            myReservationData={myReservationData}
            selectPartyHandler={selectPartyHandler}
          />
        )}
        <NoPartyButton selectPartyHandler={selectPartyHandler} />
      </div>
    </div>
  );
}

export default PartyModal;
