declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.png" {
  const content: any;
  export default content;
}
declare module "*.jpg" {
  const content: any;
  export default content;
}
declare module "*.gif" {
  const content: any;
  export default content;
}
declare module "*.js" {
  const content: any;
  export default content;
}
declare module "*.jsx" {
  const content: any;
  export default content;
}
declare module "swiper/css";
declare module "swiper/css/zoom";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "react-datepicker";
declare module "date-fns/locale/ko";
declare module "sockjs-client/dist/sockjs" {
  import SockJS from "sockjs-client";
  export default SockJS;
}

interface Window {
  wcs?: {
    trans: (conversion: { type: string }) => void;
  };
  wcs_add?: Record<string, any>;
}
