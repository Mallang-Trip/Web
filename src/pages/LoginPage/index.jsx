import PageContainer from "../../components/PageContainer";
import Logo from "../../assets/images/logo.png";
import LoginForm from "./LoginForm";
import Searchbuttons from "./Searchbuttons";

function LoginPage() {
  return (
    <PageContainer>
      <div className="flex flex-col justify-center h-real-screen">
        <div className="flex justify-center mb-8">
          <img src={Logo} className="h-9" alt="Mallang_Trip_Logo" />
        </div>
        <LoginForm />
        <Searchbuttons />
      </div>
    </PageContainer>
  );
}

export default LoginPage;
