import React from "react";
import TabItem from "./TabItem";
import { useNavigate } from "react-router-dom";
const tabList = [
  "기본 페이지 전환",
  "신고 내역",
  "피드백",
  "커뮤니티",
  "KPI",
  "결제 내역 확인",
  "파티 관리",
  "고객센터 문의",
  "여행지 관리",
  "고객센터 글 작성/수정/삭제",
  "여행자 회원 정보",
  "드라이버 회원 정보",
  "가고 싶은 지역 편집",
  "알림 내역 관리",
  "드라이버 등록 심사",
  "총 수익",
  "관리자 권한 부여",
  "약관 수정 및 전체 메일 알림",
];

function Tab({ category, setCategory }) {
  const onClickCategoryHandler = (e) => {
    setCategory(e.currentTarget.innerText);
    console.log(e.target.innerText);
  };
  return (
    <div className="mt-3">
      {tabList.map((items) => (
        <TabItem
          items={items}
          category={category}
          onClickCategoryHandler={onClickCategoryHandler}
          key={items}
        />
      ))}
    </div>
  );
}

export default Tab;
