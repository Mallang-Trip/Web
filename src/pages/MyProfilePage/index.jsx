import Header from "./Header";
import UserProfile from "./UserProfile";
import DriverProfile from "./DriverProfile";

function MyProfilePage() {
  return (
    <div className="max-w-screen-xl px-5 mb-24">
      <Header />
      <UserProfile />
      {/* <DriverProfile /> */}
    </div>
  );
}

export default MyProfilePage;
