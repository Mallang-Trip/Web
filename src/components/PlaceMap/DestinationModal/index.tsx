import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Destination, Review } from "@/types";
import {
  deleteUnLikeDestination,
  getDestinationDetail,
  postLikeDestination,
} from "@/api/destination";
import {
  CheckModal,
  Loading,
  CommentList,
  AddComment,
  ConfirmModal,
  ImageBox,
} from "@/components";
import star from "@/assets/svg/star.svg";
import FillHeart from "@/assets/svg/FillHeart.svg";
import EmptyHeart from "@/assets/svg/EmptyHeart.svg";
import shareIcon from "@/assets/svg/share.svg";
import ShareModal from "./ShareModal";
import clsx from "clsx";

interface DestinationInfo {
  name: string;
  views: number;
  avgRate: number;
  address: string;
  images: string[];
  content: string;
  reviews: Review[];
}

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  searchPage: boolean;
  courseData?: Destination[];
  setCourseData?: Dispatch<SetStateAction<Destination[]>>;
  clickedData?: Destination;
}

function DestinationModal({
  showModal,
  setShowModal,
  searchPage,
  courseData,
  setCourseData,
  clickedData,
}: Props) {
  const navigation = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [heart, setHeart] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [destinationInfo, setDestinationInfo] = useState<DestinationInfo>({
    name: "",
    views: 0,
    avgRate: 0,
    address: "",
    images: [],
    content: "",
    reviews: [],
  });
  const [message, setMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  const addCourseHandler = useCallback(() => {
    setShowAddModal(false);
    setMessage("여행 일정에 추가되었습니다.");
    setShowMessageModal(true);
    if (courseData && setCourseData && clickedData)
      setCourseData([...courseData, clickedData]);
  }, [courseData, clickedData]);

  const heartClickHandler = useCallback(async () => {
    if (!clickedData?.destinationId) return;
    if (!user.auth) return setShowLoginModal(true);

    try {
      heart
        ? await deleteUnLikeDestination(clickedData?.destinationId)
        : await postLikeDestination(clickedData?.destinationId);
      setHeart(!heart);
    } catch (e) {
      console.log(e);
    }
  }, [user, heart, clickedData]);

  const getDestinationInfo = useCallback(async () => {
    if (!clickedData?.destinationId || clickedData.destinationId < 0) return;

    try {
      const result = await getDestinationDetail(clickedData.destinationId);
      setDestinationInfo(result.payload);
      setHeart(result.payload.dibs);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [clickedData]);

  const closeModal = useCallback(() => setShowModal(false), []);

  const modalOutSideClick = useCallback(
    ({ target }: MouseEvent) => {
      if (modalRef.current === target) closeModal();
    },
    [modalRef]
  );

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setLoading(true);
    getDestinationInfo();
  }, [showModal]);

  return createPortal(
    <>
      <div
        className={clsx(
          "modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex",
          showModal && "active"
        )}
        ref={modalRef}
        onClick={modalOutSideClick}
      >
        <div
          className={clsx(
            "mx-auto mt-auto md:my-auto shadow w-full max-w-[700px] rounded-xl md:translate-y-0 duration-700",
            showModal ? "translate-y-16" : "translate-y-full"
          )}
        >
          <div className="h-full bg-white rounded-t-xl max-h-[600px] relative">
            <div className="px-6 py-5">
              {!loading && (
                <>
                  <div className="mb-1 flex">
                    <p className="text-2xl font-bold text-black">
                      {destinationInfo.name}
                    </p>
                    <div className="flex gap-1 items-center m-2 mt-3 text-xs">
                      <span>조회수 {destinationInfo.views}회</span>
                      <span>|</span>
                      <img src={star} />
                      <span>
                        {destinationInfo.avgRate
                          ? destinationInfo.avgRate.toFixed(1)
                          : "0.0"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-boldgray">
                    {destinationInfo.address.replace("()", "")}
                  </p>
                </>
              )}
            </div>
            <button
              type="button"
              className="absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="px-6 pb-6 mx-auto h-full bg-white max-h-[400px] md:max-h-[500px] custom-scrollbar">
              {loading ? (
                <div className="h-[400px] flex items-center">
                  <Loading full={false} />
                </div>
              ) : (
                <>
                  <ImageBox
                    images={destinationInfo.images}
                    name={destinationInfo.name}
                  />
                  <div className="flex gap-2 justify-end mt-2 mb-4">
                    <img
                      className="cursor-pointer"
                      src={heart ? FillHeart : EmptyHeart}
                      onClick={heartClickHandler}
                    />
                    <img
                      className="cursor-pointer"
                      src={shareIcon}
                      onClick={() => setShowShareModal(true)}
                    />
                  </div>
                  <div className="flex flex-col gap-1 my-7">
                    <p className="text-lg text-black font-bold">상세설명</p>
                    <div className="text-sm text-darkgray font-medium">
                      {destinationInfo.content}
                    </div>
                  </div>
                  <CommentList
                    reviews={destinationInfo.reviews || []}
                    isDriver={false}
                    reloadData={getDestinationInfo}
                  />
                  <AddComment
                    id={clickedData?.destinationId || 0}
                    isDriver={false}
                    reloadData={getDestinationInfo}
                  />
                </>
              )}
            </div>
            <div className="block md:hidden w-full p-5">
              <button
                className="w-full h-12 bg-primary text-white text-sm text-bold rounded-lg"
                onClick={() =>
                  searchPage ? closeModal() : setShowAddModal(true)
                }
              >
                {searchPage ? "닫기" : "여행 일정에 추가하기"}
              </button>
            </div>
          </div>
          <button
            className="w-full h-16 text-lg text-center text-white rounded-b-xl bg-primary"
            onClick={() => (searchPage ? closeModal() : setShowAddModal(true))}
          >
            {searchPage ? "닫기" : "여행 일정에 추가하기"}
          </button>
        </div>
      </div>

      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText="취소"
        yesText="확인"
        yesHandler={() => navigation("/login")}
      />
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        images={destinationInfo.images}
        name={destinationInfo.name}
        destinationId={clickedData?.destinationId}
      />
      <CheckModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        message={
          <div>
            <span className="text-primary text-lg">{clickedData?.name}</span>
            <br />
            <br />
            여행 일정에 추가하시겠습니까?
          </div>
        }
        noText="아니요"
        yesText="네"
        yesHandler={() => addCourseHandler()}
      />
      <ConfirmModal
        showModal={showMessageModal}
        setShowModal={setShowMessageModal}
        message={message}
      />
    </>,
    document.body
  );
}

export default memo(DestinationModal);
