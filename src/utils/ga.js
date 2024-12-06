const GTM_ID = import.meta.env.VITE_GTM_ID;
const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
const META_PIXEL_TRACKING_ID = import.meta.env.VITE_META_PIXEL_TRACKING_ID;

export const isGAlive = () => {
  return (
    GA_TRACKING_ID &&
    META_PIXEL_TRACKING_ID &&
    !window.location.href.includes("localhost")
  );
};

export { GTM_ID, GA_TRACKING_ID, META_PIXEL_TRACKING_ID };
