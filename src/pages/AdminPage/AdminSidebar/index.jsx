import ButtonItem from "./ButtonItem";

function AdminSideBar({ menuList }) {
  return (
    <div className="fixed top-0 left-0 w-60 h-full overflow-y-auto scrollbar-hide py-28 bg-[#F8FBFF]">
      {menuList.map((item) => (
        <ButtonItem key={item.id} {...item} />
      ))}
    </div>
  );
}

export default AdminSideBar;
