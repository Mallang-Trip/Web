import { useState } from "react";
import ProfileModal from "./ProfileModal";

function Members() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  const clickHandler = (e) => {
    setName(e.target.innerHTML.replace(" 드라이버", ""));
    setShowModal(true);
  };

  return (
    <>
      <div className="mb-5">
        <p className="text-lg font-bold">참여 승인 현황</p>
        <div className="text-sm text-darkgray flex gap-2">
          <span
            className="hover:underline hover:underline-offset-2 cursor-pointer"
            onClick={clickHandler}
          >
            김제윤 드라이버
          </span>
          <span>|</span>
          <span
            className="hover:underline hover:underline-offset-2 cursor-pointer"
            onClick={clickHandler}
          >
            PrMinister
          </span>
          <span>|</span>
          <span
            className="hover:underline hover:underline-offset-2 cursor-pointer text-primary"
            onClick={clickHandler}
          >
            헬로헬룽
          </span>
        </div>
      </div>

      <ProfileModal
        showModal={showModal}
        setShowModal={setShowModal}
        name={name}
      />
    </>
  );
}

export default Members;
