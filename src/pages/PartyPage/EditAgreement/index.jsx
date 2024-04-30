import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { numberTo00 } from "../../../utils";
import AcceptModal from "./AcceptModal";
import CancelModal from "./CancelModal";

function EditAgreement({
  myParty,
  partyStatus,
  createdAt,
  getPartyData,
  proposalId,
  agreement,
}) {
  const user = useSelector((state) => state.user);
  const [diffMinute, setDiffMinute] = useState(0);
  const [accept, setAccept] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const showButton =
    agreement.find((item) => item.userId === user.userId)?.status === "WAITING"
      ? "block"
      : "hidden";

  const diffMinuteHandler = () => setDiffMinute((diffMinute) => diffMinute - 1);

  useEffect(() => {
    const now = new Date();
    const end = new Date(createdAt);
    end.setDate(end.getDate() + 1);

    setDiffMinute(Math.floor((end - now) / (1000 * 60)));
    setInterval(() => diffMinuteHandler(), 60000);
  }, []);

  return (
    <>
      <div className="my-7">
        <div
          className={`flex gap-5 ml-0 ${
            myParty ? `sm:ml-10 ${showButton}` : "sm:ml-24"
          }`}
        >
          {myParty && (
            <button
              className="h-12 text-darkgray rounded-full text-base font-bold w-full sm:w-80 bg-white border border-darkgray"
              onClick={() => {
                setAccept(false);
                setShowModal(true);
              }}
            >
              제안 거절
            </button>
          )}
          <button
            className="h-12 text-white rounded-full text-base font-bold w-full sm:w-80 bg-primary border border-primary"
            onClick={() => {
              setAccept(true);
              setShowModal(true);
            }}
          >
            {myParty ? "제안 승인" : "제안 취소하기"}
          </button>
        </div>
        <div className="mt-7">
          <p className="mb-1 text-lg text-black font-bold">
            승인 및 거절 남은 시간
          </p>
          <p className="text-sm text-black font-medium">
            <span className="text-darkgray">
              {`${numberTo00(Math.floor(diffMinute / 60))}시간 ${numberTo00(
                Math.floor(diffMinute % 60)
              )}분 남음`}
            </span>
            <br />
            시간을 초과하면 제안은 취소되고 원래 코스대로 복구됩니다.
            <br />그 전에 파티원 전원이{" "}
            <span className="text-primary">승인을 만장일치하면</span>
            {partyStatus === "WAITING_JOIN_APPROVAL"
              ? " 코스가 변경되며 제안자가 파티에 가입하게 됩니다."
              : " 코스가 변경됩니다."}
            <br />
            <span className="text-primary">한 명이라도 거절하면</span> 제안은
            취소되고 원래 코스대로 복구됩니다.
          </p>
        </div>
      </div>
      {myParty ? (
        <AcceptModal
          showModal={showModal}
          setShowModal={setShowModal}
          getPartyData={getPartyData}
          accept={accept}
          proposalId={proposalId}
        />
      ) : (
        <CancelModal
          showModal={showModal}
          setShowModal={setShowModal}
          getPartyData={getPartyData}
          proposalId={proposalId}
        />
      )}
    </>
  );
}

export default EditAgreement;
