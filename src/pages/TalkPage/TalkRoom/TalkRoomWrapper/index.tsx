import { useState, useEffect, memo, ReactNode, useMemo } from "react";

interface Props {
  children: ReactNode;
}

function TalkRoomWrapper({ children }: Props) {
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );
  const [heightMargin, setHeightMargin] = useState<number>(0);

  const styleHeight = useMemo(
    () => `${viewportHeight - heightMargin}px`,
    [viewportHeight, heightMargin]
  );

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;
      setViewportHeight(newHeight);
      setHeightMargin(window.innerWidth < 768 ? 24 : 90);
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.visualViewport?.removeEventListener("resize", handleResize);
      };
    } else {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      className="flex flex-col justify-between gap-3 h-full pb-3 px-1 bg-white rounded-lg border border-mediumgray m-3 z-50 relative"
      style={{
        height: styleHeight,
      }}
    >
      {children}
    </div>
  );
}

export default memo(TalkRoomWrapper);
