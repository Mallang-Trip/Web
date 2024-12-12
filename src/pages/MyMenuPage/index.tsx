import { memo } from "react";
import PageContainer from "../../components/PageContainer";
import Profile from "./Profile";
import Menu from "./Menu";

function MyMenuPage() {
  return (
    <PageContainer>
      <Profile />
      <Menu />
    </PageContainer>
  );
}

export default memo(MyMenuPage);
