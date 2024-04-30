import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import {
  deleteDestinationAdmin,
  deleteUnLikeDestination,
  getDestinationDetail,
  postLikeDestination,
} from "../../../../../api/destination";
import star from "../../../../../assets/svg/star.svg";
import FillHeart from "../../../../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../../../../assets/svg/EmptyHeart.svg";
import shareIcon from "../../../../../assets/svg/share.svg";
import ShareModal from "./ShareModal";
import EditPlaceModal from "./EditPlaceModal";
import CheckModal from "../../../../../components/CheckModal";
import Loading from "../../../../../components/Loading";
import CommentList from "../../../../../components/Comment/CommentList";
import AddComment from "../../../../../components/Comment/AddComment";
import ImageBox from "../../../../../components/ImageBox";

function DestinationModal({
  showModal,
  setShowModal,
  destinationId,
  placeData,
  setPlaceData,
}) {
  const modalRef = useRef();
  const user = useSelector((state) => state.user);
  const [heart, setHeart] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [destinationInfo, setDestinationInfo] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteHandler = async () => {
    try {
      const result = await deleteDestinationAdmin(destinationId);
      setShowDeleteModal(false);
      setShowModal(false);
      setPlaceData(
        placeData.filter(
          (destination) => destination.destinationId !== destinationId
        )
      );
      alert("여행지 삭제가 완료되었습니다.");
      console.log(result);
    } catch (e) {
      alert("여행지 삭제에 실패했습니다.");
      console.log(e);
    }
  };

  const heartClickHandler = async () => {
    if (!user.auth) return setShowLoginModal(true);

    try {
      heart
        ? await deleteUnLikeDestination(destinationId)
        : await postLikeDestination(destinationId);
      setHeart(!heart);
    } catch (e) {
      console.log(e);
    }
  };

  const getDestinationInfo = async () => {
    if (destinationId < 0) return;

    try {
      const result = await getDestinationDetail(destinationId);
      setDestinationInfo(result.payload);
      setHeart(result.payload.dibs);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowModal(false);

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) closeModal();
  };

  useEffect(() => {
    if (!showModal) return document.body.classList.remove("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    setLoading(true);
    getDestinationInfo();
  }, [showModal]);

  return createPortal(
    <>
      <div
        className={`modal-container fixed top-0 left-0 z-50 w-screen h-real-screen bg-darkgray bg-opacity-50 scale-100 flex ${
          showModal ? "active" : ""
        }`}
        ref={modalRef}
        onClick={(e) => modalOutSideClick(e)}
      >
        <div
          className={`mx-auto mt-auto md:my-auto shadow w-full max-w-[700px] rounded-xl md:translate-y-0 duration-700 ${
            showModal ? "translate-y-16" : "translate-y-full"
          }`}
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
                      <span>{`조회수 ${destinationInfo.views}회`}</span>
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
                    {destinationInfo.address}
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
            <div className="px-6 pb-6 mx-auto h-full bg-white max-h-[400px] md:max-h-[500px] overflow-auto noScrollBar">
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
                    id={destinationId}
                    isDriver={false}
                    reloadData={getDestinationInfo}
                  />
                </>
              )}
            </div>
            <div className="flex md:hidden w-full p-5 gap-3">
              <button
                className="w-full h-12 text-sm text-center text-white rounded-lg bg-primary"
                onClick={() => setShowEditModal(true)}
              >
                여행지 수정
              </button>
              <button
                className="w-full h-12 text-sm text-center text-white rounded-lg bg-red-500"
                onClick={() => setShowDeleteModal(true)}
              >
                여행지 삭제
              </button>
            </div>
          </div>
          <div className="flex">
            <button
              className="w-full h-16 text-lg text-center text-white rounded-bl-xl bg-primary"
              onClick={() => setShowEditModal(true)}
            >
              여행지 수정
            </button>
            <button
              className="w-full h-16 text-lg text-center text-white rounded-br-xl bg-red-500"
              onClick={() => setShowDeleteModal(true)}
            >
              여행지 삭제
            </button>
          </div>
        </div>
      </div>

      <EditPlaceModal
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        placeData={destinationInfo}
        getDestinationInfo={getDestinationInfo}
        destinationId={destinationId}
      />
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message={"여행지를 삭제하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => deleteHandler()}
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => navigation("/login")}
      />
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        images={destinationInfo.images}
        name={destinationInfo.name}
        destinationId={destinationId}
      />
    </>,
    document.body
  );
}

export default DestinationModal;
