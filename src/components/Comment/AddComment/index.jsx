import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../api/image";
import { postComment } from "../../../api/driver";
import { postDestinationComment } from "../../../api/destination";
import { CONSTANT } from "../../../utils/data";
import cameraIcon from "../../../assets/svg/camera.svg";
import CheckModal from "../../CheckModal";
import ConfirmModal from "../../ConfirmModal";

function AddComment({ id, isDriver, reloadData }) {
  const imageRef = useRef();
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [star, setStar] = useState("");
  const [comment, setComment] = useState("");
  const [commentImage, setCommentImage] = useState(undefined);
  const [isAbleSubmit, setIsAbleSubmit] = useState(false);

  const starHandler = ({ target }) => {
    const value = target.value;
    const regex = /^\d*\.?\d{0,1}$/;

    if (regex.test(value)) {
      setStar(value);
    }
    if (value > 5) {
      setConfirmMessage("평점은 최대 5점까지 입력 가능합니다.");
      setShowConfirmModal(true);
      return;
    }
    setIsAbleSubmit(true);
  };

  const imageHandler = () => {
    const imageFile = imageRef.current.files[0];
    if (imageFile.size > CONSTANT.MAX_SIZE_IMAGE)
      return alert("이미지의 용량이 너무 커서 업로드 할 수 없습니다.");
    setCommentImage(imageFile || undefined);
  };

  const sumbitHandler = async () => {
    if (!user.auth) return setShowModal(true);

    if (star <= 0) {
      setConfirmMessage("평점을 입력해주세요.");
      setShowConfirmModal(true);
      return;
    }
    if (comment === "") {
      setConfirmMessage("댓글을 입력해주세요.");
      setShowConfirmModal(true);
      return;
    }

    const imageURL = commentImage ? await uploadImage(commentImage) : null;
    const body = {
      content: comment,
      images: [imageURL],
      rate: star,
    };

    try {
      const result = isDriver
        ? await postComment(body, id)
        : await postDestinationComment(body, id);

      if (result.statusCode === 409) {
        setConfirmMessage("이미 등록된 댓글이 있습니다.");
        setShowConfirmModal(true);
      } else {
        reloadData();
        setStar("");
        setComment("");
      }
    } catch (e) {
      setConfirmMessage("댓글 전송에 실패했습니다.");
      setShowConfirmModal(true);
    }
  };

  useEffect(() => {
    if (star > 0 && star <= 5 && comment !== "") {
      setIsAbleSubmit(true);
    } else {
      setIsAbleSubmit(false);
    }
  }, [star, comment]);

  return (
    <>
      <div className="w-full min-h-48 border-2 border-primary rounded-[20px] p-3 relative">
        <div className="flex gap-2 mb-3">
          <div className="text-lg font-bold">{user.nickname}</div>
          <div className="flex gap-1 text-sm items-center">
            <div>평점: </div>
            <input
              type="number"
              max={5}
              placeholder="0"
              className="text-primary placeholder:text-primary w-6 focus:outline-none"
              value={star}
              onChange={starHandler}
            />
            <div>/ 5.0</div>
          </div>
        </div>
        <div className="mb-3 border-b border-primary">
          <textarea
            className="w-full h-20 text-black text-sm placeholder:text-darkgray focus:outline-none resize-none overflow-hidden"
            placeholder="댓글 작성하기"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
        </div>
        <label htmlFor="commentImage_input">
          <button
            className="absolute top-2 right-2"
            onClick={() => imageRef.current.click()}
          >
            <img src={cameraIcon} alt="image" />
          </button>
        </label>
        <input
          ref={imageRef}
          className="hidden"
          id="commentImage_input"
          type="file"
          accept="image/*"
          onChange={imageHandler}
        />
        {commentImage && (
          <img
            className="object-cover max-w-xs mx-auto rounded-2xl"
            src={URL.createObjectURL(commentImage)}
            alt="Comment_Image"
          />
        )}

        <div className="flex justify-end mt-1">
          <button
            className={`w-[86px] h-[30px] text-white  rounded-full text-sm ${
              isAbleSubmit ? "bg-primary " : "bg-gray-400"
            }`}
            onClick={sumbitHandler}
            disabled={!isAbleSubmit}
          >
            등록
          </button>
        </div>
      </div>
      <CheckModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={"로그인이 필요한 서비스입니다.\n로그인 화면으로 이동할까요?"}
        noText="아니요"
        yesText="네"
        yesHandler={() => navigation("/login")}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        setShowModal={setShowConfirmModal}
        message={confirmMessage}
      />
    </>
  );
}

export default AddComment;
