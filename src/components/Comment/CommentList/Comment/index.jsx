import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { putComment } from "../../../../api/driver";
import { putDestinationComment } from "../../../../api/destination";
import basicProfileImage from "../../../../assets/images/profileImage.png";
import Star from "../../../../assets/svg/star.svg";
import { CONSTANT } from "../../../../utils/data";
import { uploadImage } from "../../../../api/image";
import CommentImage from "./CommentImage";

function Comment({
  profileImg,
  nickname,
  rate,
  content,
  isMyComment,
  reviewId,
  images,
  isDriver,
  reloadData,
  setShowDeleteModal,
  setDeleteTargetId,
}) {
  const user = useSelector((state) => state.user);
  const [modifyMode, setModifyMode] = useState(false);
  const [newStar, setNewStar] = useState(rate.toFixed(1));
  const [newContent, setNewContent] = useState(content);
  const [newImages, setNewImages] = useState(images || []);

  const commentImageRef = useRef();
  const textareaRef = useRef();

  const starHandler = ({ target }) => {
    const value = target.value;
    const regex = /^\d*\.?\d{0,1}$/;

    if (regex.test(value)) {
      setNewStar(value);
    }
    if (value > 5) alert("평점은 최대 5점까지 입력 가능합니다.");
  };

  const leftButtonHandler = () => {
    if (!modifyMode) return setModifyMode(true);

    setNewContent(content);
    setNewStar(rate.toFixed(1));
    setNewImages(images || []);
    setModifyMode(false);
  };

  const rightButtonHandler = async () => {
    // 댓글 삭제
    if (!modifyMode) {
      setDeleteTargetId(reviewId);
      setShowDeleteModal(true);
      return;
    }

    // 댓글 수정
    if (!newStar || newStar < 0 || newStar > 5 || newContent === "") return;

    const commentImageURL =
      newImages.length > 0
        ? await Promise.all(
            newImages.map((image) =>
              typeof image === "string" ? image : uploadImage(image)
            )
          )
        : [];

    const body = {
      content: newContent,
      images: commentImageURL,
      rate: newStar,
    };

    try {
      if (isDriver) await putComment(body, reviewId);
      else await putDestinationComment(body, reviewId);

      reloadData();
      setModifyMode(false);
    } catch (e) {
      console.log(e);
    }
  };

  const modifyImageHandler = async () => {
    const imageFile = commentImageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setNewImages([imageFile]);
  };

  const handleChange = (e) => {
    setNewContent(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  };

  return (
    <div className="mt-3">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src={profileImg || basicProfileImage}
        />
        <div className="text-sm font-bold px-2.5">{nickname}</div>
        <div className="ml-2.5 flex items-center gap-1">
          <img src={Star} alt="star" />
          <input
            type="number"
            max={5}
            placeholder="0"
            className={`text-sm bg-white focus:outline-none w-10 ${
              modifyMode && "text-primary"
            }`}
            value={newStar}
            onChange={starHandler}
            disabled={!modifyMode}
          />
        </div>
        {isMyComment && (
          <div className="flex gap-1 text-xs text-darkgray">
            <button
              className="hover:border-b hover:border-primary"
              onClick={leftButtonHandler}
            >
              {modifyMode ? "취소" : "수정하기"}
            </button>
            <span>|</span>
            <button
              className="hover:border-b hover:border-primary"
              onClick={rightButtonHandler}
            >
              {modifyMode ? "확인" : "삭제하기"}
            </button>
          </div>
        )}
        {!isMyComment && user.role === "ROLE_ADMIN" && (
          <div className="flex gap-1 text-xs text-[#ff0000] font-bold">
            <button
              className="hover:border-b hover:border-[#ff0000]"
              onClick={rightButtonHandler}
            >
              {modifyMode ? "확인" : "삭제하기"}
            </button>
          </div>
        )}
      </div>
      <textarea
        ref={textareaRef}
        className={`w-4/5 text-sm ml-12 mt-2 bg-white focus:outline-none custom-scrollbar resize-none ${
          modifyMode && "text-primary"
        }`}
        value={newContent}
        onChange={handleChange}
        disabled={!modifyMode}
        placeholder="댓글을 입력해주세요."
      />
      <div className="relative w-fit ml-12 mt-2">
        {newImages.length > 0 &&
          newImages.map((image, index) => (
            <CommentImage
              key={index}
              modifyMode={modifyMode}
              image={image}
              commentImageRef={commentImageRef}
              modifyImageHandler={modifyImageHandler}
            />
          ))}
      </div>
    </div>
  );
}

export default Comment;
