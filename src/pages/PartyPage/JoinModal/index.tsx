import {
  Dispatch,
  memo,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postPartyJoin } from "@/api/party";
import { priceToString } from "@/utils";
import { isGAlive } from "@/utils/ga";
import ReactGA from "react-ga4";
import clsx from "clsx";

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  content: string;
  memberCount: number;
  companions: {
    name: string;
    phoneNumber: string;
  }[];
  getPartyData: (toScrollTop?: boolean) => void;
  capacity: number;
  headcount: number;
  totalPrice: number;
  partyName: string;
  promotionId: number;
}

function JoinModal({
  showModal,
  setShowModal,
  content,
  memberCount,
  companions,
  getPartyData,
  capacity,
  headcount,
  totalPrice,
  partyName,
  promotionId,
}: Props) {
  const navigation = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { partyId } = useParams();
  const [message, setMessage] = useState<string | ReactNode>("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const isMemberFull = useMemo(
    () => headcount + memberCount === capacity,
    [headcount, memberCount, capacity]
  );

  const joinPartyHandler = useCallback(async () => {
    if (loading || !partyId) return;

    try {
      setLoading(true);

      const body = {
        changeCourse: false,
        content: content,
        headcount: memberCount,
        companions: companions.slice(0, memberCount - 1).map((member) => {
          return {
            ...member,
            phoneNumber: member.phoneNumber.replace(/-/g, ""),
          };
        }),
        usePromotionCodeId: promotionId,
      };

      const result = await postPartyJoin(partyId, body);

      if (result.statusCode === 403)
        setMessage(
          "제재 상태에서는 파티 가입이 불가능합니다.\n자세한 내용은 고객센터에 문의해주세요."
        );
      else if (isMemberFull)
        setMessage(
          <div>
            <span className="text-primary">파티 가입 및 예약금 결제</span>가
            완료되었습니다!
          </div>
        );
      else
        setMessage(
          <div>
            <span className="text-primary">파티 가입이 완료</span>되었습니다!
            <br />
            <br />
            4명이 파티에 가입한 순간
            <br />
            예약이 확정되고 예약금 결제가 자동으로 진행됩니다.
            <br />
            <br />
            또는 파티원 모두와 말랑레디를 ON으로 설정하여
            <br />
            남은 인원들과 예약을 확정시킬 수 있습니다.
          </div>
        );
      setComplete(true);

      if (isGAlive()) {
        ReactGA.event({
          category: "기존 파티 참여",
          action: "15_exsting_suggestionsent_participated",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    partyId,
    isMemberFull,
    content,
    memberCount,
    companions,
    promotionId,
  ]);

  const closeModal = useCallback(() => {
    if (complete) {
      navigation(-1);
      getPartyData(true);
    }
    setShowModal(false);
  }, [complete]);

  const modalOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current === event.target) closeModal();
    },
    [modalRef]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") closeModal();
  }, []);

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setComplete(false);

    if (isMemberFull)
      setMessage(
        <div>
          파티에 가입하는 즉시
          <br />
          <span className="text-primary">
            {priceToString(
              Math.floor((memberCount * totalPrice) / (headcount + memberCount))
            )}
          </span>
          원 예약금 결제가 진행되며
          <br />
          파티원 모두 예약이 확정됩니다.
          <br />
          <br />
          파티에 가입하여 예약을 확정하겠습니까?
        </div>
      );
    else
      setMessage(
        <div>
          <span className="text-primary">[{partyName}]</span>
          <br />
          <br />위 파티에 가입하시겠습니까?
        </div>
      );

    if (isGAlive()) {
      ReactGA.event({
        category: "기존 파티 참여",
        action: "14_exsting_joinsuggestion_participated",
      });
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showModal]);

  return (
    <div
      className={clsx(
        "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
        showModal && "active"
      )}
      ref={modalRef}
      onClick={modalOutSideClick}
    >
      <div className="m-auto shadow w-96 rounded-xl">
        <div className="flex flex-col justify-center h-64 text-center text-black whitespace-pre bg-white rounded-t-xl">
          {message}
        </div>
        {!complete ? (
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-darkgray rounded-bl-xl bg-lightgray"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-primary"
              onClick={joinPartyHandler}
            >
              확인
            </button>
          </div>
        ) : (
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={closeModal}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(JoinModal);
