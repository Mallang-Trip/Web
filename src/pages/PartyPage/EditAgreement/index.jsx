import { useEffect, useState } from "react";
import { numberTo00 } from "../../../utils";
import AcceptModal from "./AcceptModal";

function EditAgreement({ myParty, createdAt, getPartyData }) {
  const [diffMinute, setDiffMinute] = useState(0);
  const [accept, setAccept] = useState(true);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const diffMinuteHandler = () => setDiffMinute((diffMinute) => diffMinute - 1);

  useEffect(() => {
    if (!myParty) return;

    const now = new Date();
    const end = new Date(createdAt);
    end.setDate(end.getDate() + 1);

    setDiffMinute(Math.floor((end - now) / (1000 * 60)));
    setInterval(() => diffMinuteHandler(), 60000);
  }, []);

  return (
    <>
      <div className="my-7">
        <div className="flex gap-5">
          {myParty && (
            <button
              className="h-12 text-darkgray rounded-full text-base font-bold w-full sm:w-80 bg-white border border-darkgray"
              onClick={() => {
                setAccept(false);
                setShowAcceptModal(true);
              }}
            >
              제안 거절
            </button>
          )}
          <button
            className="h-12 text-white rounded-full text-base font-bold w-full sm:w-80 bg-primary border border-primary"
            onClick={() => {
              setAccept(true);
              setShowAcceptModal(true);
            }}
          >
            {myParty ? "제안 승인" : "제안 취소하기"}
          </button>
        </div>
        {myParty && (
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
              <span className="text-primary">승인을 만장일치하면</span> 코스가
              변경되며 제안자가 파티에 가입하게 됩니다.
              <br />
              <span className="text-primary">한 명이라도 거절하면</span> 제안은
              취소되고 원래 코스대로 복구됩니다.
            </p>
          </div>
        )}
      </div>

      <AcceptModal
        showModal={showAcceptModal}
        setShowModal={setShowAcceptModal}
        getPartyData={getPartyData}
        accept={accept}
      />
    </>
  );
}

export default EditAgreement;
