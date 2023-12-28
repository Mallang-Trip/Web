import { useState } from "react";
import NotifyItem from "./NotifyItem";
import EmptyNotify from "./EmptyNotify";

function NotifyList() {
  const [notify, setNotify] = useState([
    {
      id: 1,
      content: "결제가 완료되었습니다.",
      date: "8월 9일",
      read: false,
    },
    {
      id: 2,
      content: "2023.07.14일까지 결제 바랍니다.",
      date: "8월 9일",
      read: false,
    },
    {
      id: 3,
      content: "김제윤 드라이버가 예약을 승인하였습니다.",
      date: "8월 8일",
      read: false,
    },
    {
      id: 4,
      content: "김제윤 드라이버의 승인 확인 대기 중입니다.",
      date: "8월 8일",
      read: false,
    },
    {
      id: 5,
      content: "코스가 수정되었습니다.",
      date: "8월 7일",
      read: false,
    },
    {
      id: 6,
      content: "인원이 모두 모였습니다. (4/4)",
      date: "8월 7일",
      read: false,
    },
    {
      id: 7,
      content: "코스가 수정되었습니다.",
      date: "8월 6일",
      read: false,
    },
    {
      id: 8,
      content: "인원이 추가되었습니다. (3/4)",
      date: "8월 5일",
      read: false,
    },
    {
      id: 9,
      content: "코스가 수정되었습니다.",
      date: "8월 5일",
      read: true,
    },
    {
      id: 10,
      content: "코스가 수정되었습니다.",
      date: "8월 5일",
      read: true,
    },
    {
      id: 11,
      content: "인원이 추가되었습니다. (2/4)",
      date: "8월 4일",
      read: true,
    },
    {
      id: 12,
      content: "인원이 추가되었습니다. (1/4)",
      date: "8월 4일",
      read: true,
    },
  ]);

  const deleteNotifyHandler = (id) => {
    setNotify(notify.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full">
      {notify.length === 0 ? (
        <EmptyNotify />
      ) : (
        notify.map((item) => (
          <NotifyItem
            key={item.id}
            {...item}
            deleteNotifyHandler={deleteNotifyHandler}
          />
        ))
      )}
    </div>
  );
}

export default NotifyList;
