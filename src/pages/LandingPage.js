import React from "react";
import Logo from "../assets/images/logo.png";
import TestButton from "../components/LandingPage/TestButton";

function LandingPage() {
  return (
    <React.Fragment>
      <img src={Logo} alt="logo" />
      <div>말랑트립</div>
      <TestButton />
    </React.Fragment>
  );
}

export default LandingPage;
