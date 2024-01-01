import mallangTripIcon from "../../../assets/images/intro_icon.png";

function BlankSpace() {
  return (
    <div className="z-10 md:pt-16 w-full h-real-screen pl-0 md:pl-[450px]">
      <img
        src={mallangTripIcon}
        alt="말랑트립"
        className="mx-auto"
        style={{ marginTop: `${window.screen.height / 2 - 346}px` }}
      />
    </div>
  );
}

export default BlankSpace;
