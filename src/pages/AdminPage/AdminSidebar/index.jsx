import ButtonItem from "./ButtonItem";

function AdminSideBar({ buttonList, current }) {
  return (
    <div className="fixed top-0 left-0 w-60 h-full overflow-y-auto scrollbar-hide py-28 bg-[#F8FBFF]">
      {buttonList.map((item, index) => (
        <ButtonItem key={index} current={current} {...item} />
      ))}
    </div>
  );
}

export default AdminSideBar;
