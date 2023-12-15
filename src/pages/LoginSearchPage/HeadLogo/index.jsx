import Logo from "../../../assets/images/logo.png";

function HeadLogo() {
  return (
    <div className="flex justify-center mt-48 mb-12">
      <img src={Logo} className="h-9" alt="말랑트립" />
    </div>
  );
}

export default HeadLogo;
