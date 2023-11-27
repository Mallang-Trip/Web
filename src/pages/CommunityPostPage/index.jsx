import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import Title from "./Title";
import ArticleInfoForm from "./ArticleInfoForm";
import ArticleBodyForm from "./ArticleBodyForm";

function CommunityPostPage() {
  const { id } = useParams();
  const [selectedType, setSelectedType] = useState("선택해주세요.");
  const [selectedParty, setSelectedParty] = useState("선택해주세요.");
  const [images, setImages] = useState([undefined, undefined, undefined]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    alert("게시글 업로드 API 연결 예정");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [id]);

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
    </PageContainer>
  );
}

export default CommunityPostPage;
