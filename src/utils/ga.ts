import { GTM_ID, GA_TRACKING_ID, META_PIXEL_TRACKING_ID } from "./env";

export const isGAlive = () => {
  return (
    GA_TRACKING_ID &&
    META_PIXEL_TRACKING_ID &&
    !window.location.href.includes("localhost")
  );
};

export { GTM_ID, GA_TRACKING_ID, META_PIXEL_TRACKING_ID };
