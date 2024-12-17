import { memo, useEffect, useState } from "react";
import { Title } from "@/components";
import FeedbackItem from "./FeedbackItem";
import Tab from "./Tab";

export interface FeedbackType {
  id: number;
  username: string;
  intro: string;
  title: string;
  content: string;
  createdAt: string;
  commentNum: number;
  image: string;
}

function Feedback() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<FeedbackType[]>([]);

  useEffect(() => {
    setData([]);
  }, []);

  return (
    <div className="text-base font-medium">
      <Title title="피드백" />
      <Tab current={current} setCurrent={setCurrent} />
      {data.length === 0 && (
        <div className="text-center mt-10">목록이 비어있습니다.</div>
      )}
      {data.map((item) => (
        <FeedbackItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default memo(Feedback);
