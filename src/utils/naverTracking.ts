export const loadNaverScript = (type: string, additionalData = {}) => {
  if (window.location.origin === "https://mallangtrip.com") return;

  const script = document.createElement("script");
  script.src = "//wcs.naver.net/wcslog.js";
  script.async = true;
  script.type = "text/javascript";

  script.onload = () => {
    if (!window.wcs_add) window.wcs_add = {};
    window.wcs_add["wa"] = "s_940940fb6e3";

    const _conv = { type, ...additionalData };
    if (window.wcs) {
      window.wcs.trans(_conv); // 네이버 전환 이벤트 전송
    }
  };

  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
};
