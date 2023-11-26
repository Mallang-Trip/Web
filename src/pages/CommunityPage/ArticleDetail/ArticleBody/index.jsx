import { useState } from "react";
import ImageModal from "../../../../components/PartyImageBox/ImageModal";
import ShareModal from "../../../../components/PartyIconBox/ShareModal";
import FillHeart from "../../../../assets/svg/FillHeart.svg";
import EmptyHeart from "../../../../assets/svg/EmptyHeart.svg";
import shareIcon from "../../../../assets/svg/share.svg";
import MoreDot from "../../../../assets/svg/MoreDot.svg";

function ArticleBody({ article }) {
  const [imageIdx, setImageIdx] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [heart, setHeart] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const imageClickHandler = (idx) => {
    setImageIdx(idx);
    setShowImageModal(true);
  };

  const heartClickHandler = () => {
    setHeart(!heart);
  };

  return (
    <>
      <div className="w-full pt-5 pb-8 border-b border-[#D9D9D9]">
        <div className="flex justify-between mb-3">
          <div className="flex gap-2.5">
            <img
              src={article.profileImage}
              alt="profile_image"
              className="w-10 h-10 rounded-full"
            />
            <div className="h-10 flex flex-col justify-center">
              <p className="text-sm text-black font-bold">{article.userName}</p>
              <p className="text-sm text-[#3E3E3E] font-medium">{`${article.time}분 전`}</p>
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
            <img
              className="cursor-pointer px-2"
              src={MoreDot}
              onClick={() => setShowMore(!showMore)}
            />
            <div
              className={`w-[100px] absolute top-11 right-0 z-10 rounded-lg bg-white text-sm shadow-sm transition-all duration-500 overflow-hidden ${
                showMore ? "max-h-[100px] border border-[#D9D9D9]" : "max-h-0"
              }`}
            >
              <button
                className={`w-full h-[50px] rounded-t-lg text-black hover:bg-skyblue`}
                onClick={() => console.log("수정")}
              >
                <span>수정하기</span>
              </button>
              <button
                className={`w-full h-[50px] rounded-b-lg text-[#FF0000] hover:bg-skyblue`}
                onClick={() => console.log("삭제")}
              >
                <span>삭제하기</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xl text-black font-bold">{article.title}</p>
          <div className="w-ful grid grid-cols-2 rounded-lg overflow-hidden mt-5 mb-8">
            <div className="overflow-hidden max-h-[500px]">
              <img
                className="object-cover w-full h-full rounded-l-lg transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                src={article.articleImage}
                alt="article_image"
                onClick={() => imageClickHandler(0)}
              />
            </div>
            <div className="grid grid-cols-1 overflow-hidden max-h-[500px]">
              <div className="overflow-hidden">
                <img
                  className="object-cover w-full h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                  src={article.articleImage}
                  alt="article_image"
                  onClick={() => imageClickHandler(1)}
                />
              </div>
              <div className="overflow-hidden">
                <img
                  className="rounded-br-lg object-cover w-full h-full transition duration-300 ease-in-out hover:scale-110 cursor-pointer"
                  src={article.articleImage}
                  alt="article_image"
                  onClick={() => imageClickHandler(2)}
                />
              </div>
            </div>
          </div>
          <p className="w-full text-base text-[#3E3E3E] font-medium whitespace-pre-wrap mt-3 mb-4">
            {article.content}
          </p>
          <button className="w-80 text-white rounded-full text-sm font-bold bg-primary py-2.5 px-10 mx-auto mt-12">
            제주의 봄파티 구경하기
          </button>
        </div>
      </div>

      <ImageModal
        showModal={showImageModal}
        setShowModal={setShowImageModal}
        images={[
          article.articleImage,
          article.articleImage,
          article.articleImage,
        ]}
        imageIdx={imageIdx}
        setImageIdx={setImageIdx}
        name={article.title}
      />
      <ShareModal
        showModal={showShareModal}
        setShowModal={setShowShareModal}
        partyImages={[
          article.articleImage,
          article.articleImage,
          article.articleImage,
        ]}
        partyName={article.title}
      />
    </>
  );
}

export default ArticleBody;
