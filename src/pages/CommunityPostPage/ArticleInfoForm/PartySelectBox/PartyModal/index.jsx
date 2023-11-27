import { useEffect, useRef, useState } from "react";
import { getLikeDestination } from "../../../../../api/destination";
import PartyModalTab from "./PartyModalTab";
import HeartList from "./HeartList";
import NoPartyButton from "./NoPartyButton";
import ReservationList from "./ReservationList";
import closeIcon from "../../../../../assets/svg/close_x_primary.svg";

import jeju from "../../../../../assets/images/제주도 이미지 3.jpg";
import ohshullok from "../../../../../assets/images/오설록 티 뮤지엄.jpg";
import ulung from "../../../../../assets/images/울릉도 이미지.jpg";

function PartyModal({ showModal, setShowModal, setSelectedParty }) {
  const modalRef = useRef();
  const [isTabHeart, setIsTabHeart] = useState(true);
  const [myHeartData, setMyHeartData] = useState([]);
  const [myReservationData, setMyReservationData] = useState([
    {
      image: jeju,
      name: "제주의 봄 파티",
      date: "2023-11-28",
      headcount: 4,
      capacity: 4,
      price: 100000,
      driverName: "김기사",
    },
    {
      image: ohshullok,
      name: "제주도 박물관 파티",
      date: "2023-11-05",
      headcount: 3,
      capacity: 4,
      price: 200000,
      driverName: "박기사",
    },
    {
      image: ulung,
      name: "울릉도 섬 파티",
      date: "2023-10-18",
      headcount: 4,
      capacity: 4,
      price: 150000,
      driverName: "이기사",
    },
  ]);

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

  const selectPartyHandler = (name) => {
    setSelectedParty(name);
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("overflow-hidden");
      getMyHeartData();
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
