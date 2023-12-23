import { useEffect, useRef, useState } from "react";

function TalkMenu({ showMenu, setShowMenu }) {
  const modalRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [openMenuAnimation, setOpenMenuAnimation] = useState(false);

  const closeMenuHandler = () => {
    setOpenMenuAnimation(false);
    setTimeout(() => setOpenMenu(false), 550);
  };

  const openMenuHandler = () => {
    setOpenMenu(true);
    setTimeout(() => setOpenMenuAnimation(true), 50);
  };

  const modalOutSideClick = (e) => {
    if (modalRef.current === e.target) setShowMenu(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape") setShowMenu(false);
  };

  useEffect(() => {
    if (showMenu) openMenuHandler();
    else closeMenuHandler();

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [showMenu]);

  if (!openMenu) return null;
  return (
    <div
      className={`fixed top-0 left-0 z-50 md:z-20 md:pt-16 w-full h-screen bg-darkgray transition-all duration-700 ${
        openMenuAnimation ? "bg-opacity-50" : "bg-opacity-0"
      }`}
      ref={modalRef}
      onClick={(e) => modalOutSideClick(e)}
    >
      <div
        className={`w-80 h-full ml-auto bg-white transition-transform duration-500 ${
          openMenuAnimation ? "translate-x-0" : "translate-x-full"
        }`}
      >
        TalkMenu
      </div>
    </div>
  );
}

export default TalkMenu;
