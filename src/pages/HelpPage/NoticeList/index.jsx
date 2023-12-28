import Head from "./Head";
import Notice from "./Notice";

function NoticeList({ notice, page }) {
  const isShow = (index) => {
    return index >= page * 10 && index < (page + 1) * 10;
  };

  return (
    <div className="w-full whitespace-nowrap">
      <Head />
      {notice.map(
        (item, index) =>
          isShow(index) && (
            <Notice
              key={item.noticeId}
              index={notice.length - index}
              {...item}
            />
          )
      )}
    </div>
  );
}

export default NoticeList;
