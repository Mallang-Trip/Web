export const isGAlive = () => {
  const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;
  const META_PIXEL_TRACKING_ID = import.meta.env.VITE_META_PIXEL_TRACKING_ID;

  return (
    GA_TRACKING_ID &&
    META_PIXEL_TRACKING_ID &&
    !window.location.href.includes("localhost")
  );
};
