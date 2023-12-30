import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getArticleDetail,
  postNewArticle,
  updateMyArticle,
} from "../../api/article";
import { uploadImage } from "../../api/image";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import ArticleInfoForm from "./ArticleInfoForm";
import ArticleBodyForm from "./ArticleBodyForm";
import ConfirmModal from "../../components/ConfirmModal";

const articleType = {
  전체: "all",
  자유게시판: "FREE_BOARD",
  동행구해요: "FIND_PARTNER",
  피드백: "FEEDBACK",
};

function CommunityPostPage() {
  const { articleId } = useParams();
  const navigation = useNavigate();
  const [selectedType, setSelectedType] = useState("선택해주세요.");
  const [selectedParty, setSelectedParty] = useState({
    name: "선택해주세요.",
    partyId: -1,
  });
  const [images, setImages] = useState([undefined, undefined, undefined]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModalHandler = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (selectedType === "선택해주세요.")
      return showModalHandler("게시판을 선택해주세요.");
    if (title === "") return showModalHandler("제목을 입력해주세요.");
    if (content === "") return showModalHandler("내용을 작성해주세요.");

    try {
      const imagesURL = [];
      imagesURL[0] = !images[0]
        ? null
        : typeof images[0] === "string"
        ? images[0]
        : await uploadImage(images[0]);
      imagesURL[1] = !images[1]
        ? null
        : typeof images[1] === "string"
        ? images[1]
        : await uploadImage(images[1]);
      imagesURL[2] = !images[2]
        ? null
        : typeof images[2] === "string"
        ? images[2]
        : await uploadImage(images[2]);

      const body = {
        type: articleType[selectedType],
        title: title,
        content: content,
        partyId: selectedParty.partyId > 0 ? selectedParty.partyId : null,
        images: imagesURL,
      };

      const result =
        articleId === "new"
          ? await postNewArticle(body)
          : await updateMyArticle(articleId, body);
      navigation(`/community/${result.payload.articleId || articleId}`, {
        replace: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getArticleData = async () => {
    try {
      const result = await getArticleDetail(articleId);

      setSelectedType(
        Object.entries(articleType).find(
          ([, val]) => val === result.payload.type
        )[0]
      );
      setTitle(result.payload.title);
      setContent(result.payload.content);
      setImages(result.payload.images);
      if (result.payload.partyId)
        setSelectedParty({
          name: result.payload.partyName,
          partyId: result.payload.partyId,
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (articleId === "new") return;
    getArticleData();
  }, [articleId]);

  return (
    <PageContainer>
      <Title />
      <ArticleInfoForm
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedParty={selectedParty}
        setSelectedParty={setSelectedParty}
        images={images}
        setImages={setImages}
      />
      <ArticleBodyForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        submitHandler={submitHandler}
      />

      <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        message={modalMessage}
      />
    </PageContainer>
  );
}

export default CommunityPostPage;
