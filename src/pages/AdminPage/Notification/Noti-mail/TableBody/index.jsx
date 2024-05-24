import NotiMailItem from "./NotiMailsItem";

function TableBody({ current, data }) {
  const setWidth = (index) => {
    if (current === 0) {
      if (index === 2) return "flex-1";
      else if (index === columns.length - 1) return "w-12";
      else return "w-[20%]";
    } else {
      if (index === 1) return "flex-1";
      else if (index === columns.length - 1) return "w-12";
      else return "w-[20%]";
    }
  };

  if (data.length === 0)
    return <div className="mt-20 text-center">목록이 비어있습니다.</div>;
  return (
    <div>
      {data.map((item) => (
        <NotiMailItem key={item.contentId} current={current} {...item} />
      ))}
    </div>
  );
}

export default TableBody;
