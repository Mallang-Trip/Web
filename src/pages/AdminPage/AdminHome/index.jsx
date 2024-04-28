import HomeBodyForm from "./HomeBodyForm";

function AdminHome({ menuList }) {
  return (
    <div>
      {menuList.map((item) => (
        <HomeBodyForm key={item.id} {...item} />
      ))}
    </div>
  );
}

export default AdminHome;
