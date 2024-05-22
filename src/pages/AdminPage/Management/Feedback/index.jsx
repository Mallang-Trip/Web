import { useState } from "react";
import Title from "../../../../components/Title";
import Tab from "./Tab";
import FeedbackItem from "./FeedbackItem";

function Feedback() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);

  return (
    <div className="text-base font-medium">
      <Title title="피드백" />
      <Tab current={current} setCurrent={setCurrent} />
      {data.length === 0 && (
        <div className="text-center mt-10">목록이 비어있습니다.</div>
      )}
      {data.map((item, index) => (
        <FeedbackItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default Feedback;
