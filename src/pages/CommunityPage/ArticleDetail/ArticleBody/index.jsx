import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  deleteMyArticle,
  likeArticle,
  unLikeArticle,
} from "../../../../api/article";
import { dateToGapKorean } from "../../../../utils";
import ImageModal from "../../../../components/PartyImageBox/ImageModal";
import ShareModal from "../../../../components/PartyIconBox/ShareModal";
import FillHeart from "../../../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../../../assets/svg/EmptyHeart.svg";
import shareIcon from "../../../../assets/svg/share.svg";
import MoreDot from "../../../../assets/svg/MoreDot.svg";
import CheckModal from "../../../../components/CheckModal";

function ArticleBody({
  articleId,
  profileImg,
  nickname,
  updatedAt,
  title,
  content,
  images,
  dibs,
  partyName,
  partyId,
  userId,
}) {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const [imageIdx, setImageIdx] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [heart, setHeart] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const imageClickHandler = (idx) => {
    setImageIdx(idx);
    setShowImageModal(true);
  };

  const heartClickHandler = async () => {
    if (!user.auth) return setShowLoginModal(true);

    try {
      heart ? await unLikeArticle(articleId) : await likeArticle(articleId);
      setHeart(!heart);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteArticleHandler = async () => {
    try {
      await deleteMyArticle(articleId);
      document.body.classList.remove("overflow-hidden");
      navigation("/community/main", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setHeart(dibs);
  }, [dibs]);

  return (
    <>
      <div className="w-full pt-5 pb-8 border-b border-[#D9D9D9]">
        <div className="flex justify-between mb-3">
          <div className="flex gap-2.5">
            <img
              src={profileImg}
              alt="profile_image"
              className="w-10 h-10 rounded-full"
            />
            <div className="h-10 flex flex-col justify-center">
              <p className="text-sm text-black font-bold">{nickname}</p>
              <p className="text-sm text-[#3E3E3E] font-medium">
                {dateToGapKorean(updatedAt, true)}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center relative">
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
            {user.userId === userId && (
              <img
                className="cursor-pointer"
                src={MoreDot}
                onClick={() => setShowMore(!showMore)}
              />
            )}
            <div
              className={`w-[100px] absolute top-11 right-2 z-10 rounded-lg bg-white text-sm shadow-sm transition-all duration-500 overflow-hidden ${
                showMore ? "max-h-[100px] border border-[#D9D9D9]" : "max-h-0"
              }`}
            >
              <button
                className={`w-full h-[50px] rounded-t-lg text-black hover:bg-skyblue`}
                onClick={() => navigation(`/community/post/${articleId}`)}
              >
                <span>수정하기</span>
              </button>
              <button
                className={`w-full h-[50px] rounded-b-lg text-[#FF0000] hover:bg-skyblue`}
                onClick={() => setShowDeleteModal(true)}
              >
                <span>삭제하기</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xl text-black font-bold">{title}</p>
          <div className="w-full flex rounded-lg overflow-hidden mt-5 mb-8">
            {images[0] && (
              <div className="w-full overflow-hidden max-h-[500px]">
                <img
                  className="object-cover w-full h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                  src={images[0]}
                  alt="article_image"
                  onClick={() => imageClickHandler(0)}
                />
              </div>
            )}
            {images[1] && (
              <div className="w-full flex flex-col overflow-hidden max-h-[500px]">
                <div className="overflow-hidden">
                  <img
                    className="object-cover w-full h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                    src={images[1]}
                    alt="article_image"
                    onClick={() => imageClickHandler(1)}
                  />
                </div>
                {images[2] && (
                  <div className="overflow-hidden">
                    <img
                      className="object-cover w-full h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                      src={images[2]}
                      alt="article_image"
                      onClick={() => imageClickHandler(2)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="w-full text-base text-[#3E3E3E] font-medium whitespace-pre-wrap mt-3 mb-4">
            {content}
          </p>
          {partyId && (
            <button
              className="w-80 text-white rounded-full text-sm font-bold bg-primary py-2.5 px-10 mx-auto mt-12"
              onClick={() => navigation(`/party/${partyId}`)}
            >
              {`${partyName} 구경하기`}
            </button>
          )}
        </div>
      </div>

      <ImageModal
        showModal={showImageModal}
        setShowModal={setShowImageModal}
        images={images}
        imageIdx={imageIdx}
        setImageIdx={setImageIdx}
        name={title}
      />
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        partyImages={images}
        partyName={title}
      />
      <CheckModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        message={"삭제하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => deleteArticleHandler()}
      />
      <CheckModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
        message={"로그인이 필요합니다.\n로그인 하시겠습니까?"}
        noText={"취소"}
        yesText={"확인"}
        yesHandler={() => navigation("/login")}
      />
    </>
  );
}

export default ArticleBody;
