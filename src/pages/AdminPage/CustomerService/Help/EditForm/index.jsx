import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../../../api/image";
import {
  getAnnouncementDetail,
  postAnnouncement,
  updateAnnouncement,
} from "../../../../../api/announcement";
import Title from "../../../../../components/Title";
import ImageInputBox from "../../../../CommunityPostPage/ArticleInfoForm/ImageInputBox";

function EditForm({
  mode,
  helpType,
  announcementId,
  setMessage,
  setShowMessageModal,
  setHelpType,
}) {
  const navigation = useNavigate();
  const textareaRef = useRef();
  const [images, setImages] = useState([undefined, undefined, undefined]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const imagesURL = await Promise.all(
        images
          .filter((image) => image)
          .map(async (image) =>
            typeof image === "string" ? image : await uploadImage(image)
          )
      );
      const body = {
        title: title,
        content: content,
        images: imagesURL,
        type: helpType,
      };
      const result =
        announcementId === "new"
          ? await postAnnouncement(body)
          : await updateAnnouncement(announcementId, body);
      setMessage(
        announcementId === "new"
          ? "공지사항이 등록되었습니다."
          : "공지사항이 수정되었습니다."
      );
      navigation(
        `/admin/help?mode=detail&announcement_id=${result.payload?.announcementId || announcementId}`,
        { replace: true }
      );
    } catch (e) {
      console.log(e);
      setMessage("공지사항 등록에 실패했습니다.");
    } finally {
      setLoading(false);
      setShowMessageModal(true);
    }
  };

  const contentHandler = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setContent(e.target.value);
  };

  const getAnnouncementDetailFunc = async () => {
    try {
      const { payload } = await getAnnouncementDetail(announcementId);
      setImages(payload.images);
      setTitle(payload.title);
      setContent(payload.content);
      setHelpType(payload.type);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!announcementId || mode !== "edit" || announcementId === "new") return;
    getAnnouncementDetailFunc();
  }, [announcementId, mode]);

  if (mode !== "edit") return null;
  return (
    <div>
      <Title title="공지사항 글 작성" />
      <div className="mt-10">
        <ImageInputBox
          showImageInput={true}
          images={images}
          setImages={setImages}
        />
      </div>
      <form className="mt-10 font-medium" onSubmit={submitHandler}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          className="w-full text-2xl text-black placeholder:text-darkgray focus:outline-none"
        />
        <hr className="bg-mediumgray mt-4 mb-8 h-px border-0" />
        <textarea
          ref={textareaRef}
          value={content}
          onChange={contentHandler}
          placeholder="내용을 작성해주세요."
          className="w-full min-h-[320px] text-sm text-boldgray placeholder:text-darkgray focus:outline-none resize-none noScrollBar"
        />
        <div className="flex justify-center items-center mt-[70px]">
          <button
            type="submit"
            className="h-14 text-lg text-white font-bold rounded-full text-md w-64 md:w-80 bg-primary"
          >
            {announcementId === "new" ? "게시하기" : "수정하기"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
