import { memo } from "react";
import { PageContainer } from "@/components";
import Logo from "@/assets/images/logo.png";
import LoginForm from "./LoginForm";
import Searchbuttons from "./Searchbuttons";

function LoginPage() {
  return (
    <PageContainer>
      <div className="flex flex-col justify-center h-real-screen absolute top-0 left-0 w-full">
        <div className="flex justify-center mb-8">
          <img src={Logo} className="h-9" alt="Mallang_Trip_Logo" />
        </div>
        <LoginForm />
        <Searchbuttons />
      </div>
    </PageContainer>
  );
}

export default memo(LoginPage);
