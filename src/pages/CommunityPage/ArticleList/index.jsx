import basicProfileImage from "../../../assets/images/profileImage.png";
import articleImage from "../../../assets/images/제주도 이미지.jpg";
import ArticleItem from "./ArticleItem";

const articleData = [
  {
    id: 1,
    profileImage: basicProfileImage,
    userName: "haribo22",
    introduction: "한줄소개",
    title: "여름 제주도 2박3일 같이 갈 동행자 구해요",
    content:
      "어쩌고 저쩌고 블라블라 함께 스쿠버 다이빙을 가고 싶은 사람을 찾고 있는데요...\n블라블라\n3줄 까지만 표현하며 넘길 시 ...으로 표현",
    time: 59,
    comment: 57,
    articleImage: articleImage,
  },
  {
    id: 2,
    profileImage: basicProfileImage,
    userName: "haribo22",
    introduction: "한줄소개",
    title: "여름 제주도 2박3일 같이 갈 동행자 구해요",
    content:
      "어쩌고 저쩌고 블라블라 함께 스쿠버 다이빙을 가고 싶은 사람을 찾고 있는데요...\n블라블라\n3줄 까지만 표현하며 넘길 시 ...으로 표현",
    time: 59,
    comment: 57,
    articleImage: articleImage,
  },
  {
    id: 3,
    profileImage: basicProfileImage,
    userName: "haribo22",
    introduction: "한줄소개",
    title: "여름 제주도 2박3일 같이 갈 동행자 구해요",
    content:
      "어쩌고 저쩌고 블라블라 함께 스쿠버 다이빙을 가고 싶은 사람을 찾고 있는데요...\n블라블라\n3줄 까지만 표현하며 넘길 시 ...으로 표현",
    time: 59,
    comment: 57,
    articleImage: articleImage,
  },
];

function ArticleList() {
  return (
    <div>
      {articleData.map((article) => (
        <ArticleItem key={article.id} {...article} />
      ))}
    </div>
  );
}

export default ArticleList;
